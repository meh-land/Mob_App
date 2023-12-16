import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Context from "../../Context";
import axios from "axios";

function ChangePasswordScreen({ navigation }) {
  const { userData, setUserData } = useContext(Context);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isCurrentPasswordWrong, setIsCurrentPasswordWrong] = useState(false);
  const [isNewPasswordWrong, setIsNewPasswordWrong] = useState(false);
  const [errortext, setErrorText] = useState("");

  const handlePasswordChange = () => {
    if (currentPassword != userData.password) {
      setIsCurrentPasswordWrong(true);
    } else {
      setIsCurrentPasswordWrong(false);
    }

    if (newPassword != confirmPassword) {
      setIsNewPasswordWrong(true);
    } else {
      setIsNewPasswordWrong(false);
    }

    if (isCurrentPasswordWrong === false && isNewPasswordWrong === false) {
      setIsCurrentPasswordWrong(false);
      setIsNewPasswordWrong(false);
      ChangePassword();
    }
  };

  const ChangePassword = async () => {
    try {
      const response = await axios.post(
        "http://192.168.8.104/apicrud/changePassword.php",
        {
          password: newPassword,
          user_id: userData.user_id,
        }
      );
      console.log(newPassword);
      if (response.data.status == true) {
        console.log("edited Sucessfully");
        setUserData({ ...userData, password: newPassword });
        setTimeout(() => {
          Alert.alert(
            "",
            "Changed sucessfully",
            [{ text: "OK", onPress: () => {} }],
            {
              cancelable: true,
            }
          );
        }, 2000);
      } else {
        setErrorText(response.data.msg);
        console.log(response.data.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Text style={EditProfile.header}>Change Password</Text>
      <View style={EditProfile.Box}>
        <View style={EditProfile.inputBox}>
          <Text style={EditProfile.label}>Current Password</Text>
          <TextInput
            placeholder="Enter Current Password"
            onChangeText={(e) => setCurrentPassword(e)}
            inputStyle={EditProfile.input}
            secureTextEntry={true}
            activeUnderlineColor="green"
          />
          {isCurrentPasswordWrong && (
            <Text style={EditProfile.errorText}>
              Current password is incorrect.
            </Text>
          )}
        </View>
        <View style={EditProfile.inputBox}>
          <Text style={EditProfile.label}>New Password</Text>
          <TextInput
            placeholder="Enter New Password"
            onChangeText={(e) => setNewPassword(e)}
            inputStyle={EditProfile.input}
            secureTextEntry={true}
            activeUnderlineColor="green"
          />
        </View>
        <View style={EditProfile.inputBox}>
          <Text style={EditProfile.label}>Confirm New Password</Text>
          <TextInput
            placeholder="Confirm New Password"
            onChangeText={(e) => setConfirmPassword(e)}
            inputStyle={EditProfile.input}
            secureTextEntry={true}
            activeUnderlineColor="green"
          />
          {isNewPasswordWrong && (
            <Text style={EditProfile.errorText}>New Password is wrong</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={EditProfile.buttonStyle}
        activeOpacity={0.5}
        onPress={handlePasswordChange}
      >
        <Text style={EditProfile.buttonTextStyle}>Change Password</Text>
      </TouchableOpacity>
    </>
  );
}

export default ChangePasswordScreen;

const EditProfile = StyleSheet.create({
  header: {
    fontSize: 15,
    color: "gray",
    marginLeft: 20,
    marginTop: 15,
  },
  Box: {
    margin: 20,
    borderRadius: 25,
    padding: 20,
    backgroundColor: "white",
  },
  inputBox: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: "lightgray",
    color: "black",
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#2d6250",
  },
  label: {
    color: "lightgray",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
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
});
