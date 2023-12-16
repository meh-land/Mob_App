import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Context from "./Context.js";
import axios from "axios";
// For handling gestures and touch interactions.
import "react-native-gesture-handler";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
// Import Screens
import SplashScreen from "./Screen/SplashScreen";
import LoginScreen from "./Screen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen";
import DrawerNavigationRoutes from "./Screen/DrawerNavigationRoutes";
import EditProfileScreen from "./Screen/DrawerScreens/EditProfile";
import ChangePasswordScreen from "./Screen/DrawerScreens/ChangePassword";
import DeleteAccount from "./Screen/DrawerScreens/DeleteAccount";

const Stack = createStackNavigator();

function SubmenuNavigator() {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [errortext, setErrorText] = useState("");
  const { userData, isInputDisabled, setInputDisabled } = useContext(Context);

  const handleEditPress = async () => {
    if (isEditing) {
      try {
        const response = await axios.post(
          "http://192.168.8.104/apicrud/editusers.php",
          {
            fullname: userData.name,
            email: userData.email,
            user_id: userData.user_id,
          }
        );

        if (response.data.status == true) {
          console.log("edited Sucessfully");
        } else {
          setErrorText(response.data.msg);
          console.log(response.data.status);
        }
      } catch (error) {
        console.error(error);
      }

      setIsEditing(false);
      setInputDisabled(false);
    } else {
      setIsEditing(!isEditing);
      setInputDisabled(true);
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                source={require("./Image/back.png")} // Back arrow image
                style={{ width: 25, height: 25, marginLeft: 5 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleEditPress}>
              <Text
                style={{
                  marginRight: 20,
                  fontSize: 15,
                  textDecorationLine: "underline",
                  color: "#2D6250",
                }}
              >
                {isEditing ? "Save" : "Edit"}
              </Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#ddd", //Set Header color
          },
          headerTintColor: "#2d6250", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: "Change Password",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                source={require("./Image/back.png")} // Back arrow image
                style={{ width: 25, height: 25, marginLeft: 5 }}
              />
            </TouchableOpacity>
          ),

          headerStyle: {
            backgroundColor: "#ddd", //Set Header color
          },
          headerTintColor: "#2d6250", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          title: "Delete Account",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                source={require("./Image/back.png")} // Back arrow image
                style={{ width: 25, height: 25, marginLeft: 5 }}
              />
            </TouchableOpacity>
          ),

          headerStyle: {
            backgroundColor: "#ddd", //Set Header color
          },
          headerTintColor: "#2d6250", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}
const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register", //Set Header Title
          headerStyle: {
            backgroundColor: "#ddd", //Set Header color
          },
          headerTintColor: "#2d6250", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [userData, setUserData] = useState({
    user_id: "",
    name: "",
    email: "",
    password: "",
  });
  const [isInputDisabled, setInputDisabled] = useState(false);

  return (
    <Context.Provider
      value={{ userData, setUserData, isInputDisabled, setInputDisabled }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            // Hiding header for Splash Screen
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DrawerNavigationRoutes"
            component={DrawerNavigationRoutes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SubmenuNavigator"
            component={SubmenuNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
