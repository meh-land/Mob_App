import React, { useState, createRef, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loader from "./Components/Loader";
import Context from "../Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData, setUserData } = useContext(Context);

  const passwordInputRef = createRef();
  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitPress = async () => {
    setErrorText("");
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.8.104/apicrud/getuser.php",
        {
          email: userEmail,
          password: userPassword,
        }
      );

      setLoading(false);
      if (response.data.status == true) {
        await AsyncStorage.setItem("user_id", response.data.user.email);
        const user = response.data.user;
        setUserData(user);
        console.log("userData");
        console.log(userData);
        navigation.replace("DrawerNavigationRoutes");
      } else {
        setErrorText(response.data.msg);
        console.log(response.data.status);
        console.log("Please check your email id or password");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
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
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => {
                  setUserEmail(UserEmail);
                }}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={!showPassword}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
                style={styles.icon}
                onPress={toggleShowPassword}
              />
            </View>
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ddd",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    height: 50,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#2d6250",
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
    marginBottom: 25,
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
  },
  registerTextStyle: {
    color: "#2d6250",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
