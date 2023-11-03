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
import DialogInput from "react-native-dialog-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function DeleteAccount() {
  const navigation = useNavigation();
  const [errortext, setErrorText] = useState("");
  const [visible, setVisible] = useState(false);
  const { userData } = useContext(Context);

  const Delete = async (e) => {
    if (e == userData.password) {
      console.log("true");
      try {
        const response = await axios.post(
          "http://192.168.8.104/apicrud/deleteusers.php",
          {
            user_id: userData.user_id,
          }
        );
        if (response.data.status == true) {
          AsyncStorage.clear();
          navigation.replace("Auth");
        } else {
          setErrorText(response.data.msg);
          console.log(response.data.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Text style={EditProfile.header}>Delete Account</Text>
      <View style={EditProfile.Box}>
        <Text style={EditProfile.txt}>
          Are you sure you want to delete your account?
        </Text>
        <Text>
          This action is irreversible and will result in the permanent loss of
          all your data, including:
        </Text>
        <Text style={EditProfile.dataList}>
          - Your profile information
          {"\n"}- Created Maps
          {"\n"}- Created Tasks
        </Text>
        <Text style={EditProfile.txt}>
          Please consider the following before proceeding:
        </Text>
        <Text style={EditProfile.dataList}>
          1. Data Loss: You will lose access to all your data associated with
          this account, and we won't be able to recover it.
          {"\n"}2. Re-registration: If you change your mind later, you will need
          to create a new account from scratch, and any content or actions
          cannot be restored.
        </Text>
      </View>
      <DialogInput
        isDialogVisible={visible}
        title={"Delete Account"}
        message={
          "To confirm your account deletion, please enter your password below:"
        }
        hintInput={"Enter Password"}
        submitInput={(inputText) => {
          setVisible(false), Delete(inputText);
        }}
        textInputProps={{
          secureTextEntry: true,
        }}
        closeDialog={() => setVisible(false)}
      ></DialogInput>
      <TouchableOpacity
        style={EditProfile.buttonStyle}
        activeOpacity={0.5}
        onPress={() => setVisible(true)}
      >
        <Text style={EditProfile.buttonTextStyle}>Delete Account</Text>
      </TouchableOpacity>
    </>
  );
}

export default DeleteAccount;

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
  buttonStyle: {
    backgroundColor: "red",
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
  dataList: {
    marginBottom: 20,
    lineHeight: 30,
  },
  txt: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
});
