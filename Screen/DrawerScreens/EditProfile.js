import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Context from "../../Context";

function EditProfileScreen({ navigation }) {
  const { userData, setUserData, isInputDisabled } = useContext(Context);

  return (
    <>
      <Text style={EditProfile.header}>Edit Personal Data</Text>
      <View style={EditProfile.Box}>
        <View style={EditProfile.inputBox}>
          <Text style={EditProfile.label}>Name</Text>
          <TextInput
            value={userData.name}
            onChangeText={(e) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                name: e, // Replace with new Name
              }))
            }
            editable={isInputDisabled}
            inputStyle={EditProfile.input}
          />
        </View>
        <View style={EditProfile.inputBox}>
          <Text style={EditProfile.label}>Email</Text>
          <TextInput
            value={userData.email}
            onChangeText={(e) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                email: e, // Replace with new mail
              }))
            }
            editable={isInputDisabled}
            inputStyle={EditProfile.input}
          />
        </View>
      </View>
    </>
  );
}

export default EditProfileScreen;

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
});
