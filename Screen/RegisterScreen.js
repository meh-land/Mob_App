import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import Loader from "./Components/Loader";

const RegisterScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrorText] = useState("");
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = async () => {
    setErrorText("");

    if (!userName || !userEmail || !userPassword) {
      console.log(userEmail);
      console.log(userName);
      console.log(userPassword);

      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.8.104/apicrud/addusers.php",
        {
          fullname: userName,
          email: userEmail,
          password: userPassword,
        }
      );

      setLoading(false);
      console.log(response.data);

      if (response.data.status == true) {
        setIsRegistrationSuccess(true);
        console.log("Registration Successful. Please Login to proceed");
      } else {
        setErrorText(response.data.msg);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  if (isRegistrationSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ddd",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../Image/success.png")}
          style={{
            height: 150,
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
        <Text style={styles.successTextStyle}>Registration Successful</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ddd" }}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../Image/Logo.png")}
            style={{
              width: "50%",
              height: 100,
              resizeMode: "contain",
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => {
                setUserEmail(UserEmail);
              }}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

          {errortext != "" ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}
          >
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#2d6250",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 5,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "#2d6250",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#2d6250",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "#2d6250",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
});
