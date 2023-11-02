import React, { useState } from "react";

// Import Navigators from React Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Screens
import HomeScreen from "./DrawerScreens/HomeScreen";
import CustomSidebarMenu from "./Components/CustomSidebarMenu";
import NavigationDrawerHeader from "./Components/NavigationDrawerHeader";
import TestScreen from "./DrawerScreens/TestScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader
              navigationProps={navigation}
              isBackScreen={false}
            />
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
};

const TestScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="TestingScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader
            navigationProps={navigation}
            isBackScreen={false}
          />
        ),
        headerStyle: {
          backgroundColor: "#ddd", //Set Header color
        },
        headerTintColor: "#2d6250", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="TestingScreen"
        component={TestScreen}
        options={{
          title: "Testing", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: "#2d6250",
        color: "#2d6250",
        itemStyle: { marginVertical: 5, color: "#2d6250" },
        labelStyle: {
          color: "#2d6250",
        },
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={CustomSidebarMenu}
    >
      <Drawer.Screen
        name="HomeScreenStack"
        options={{ drawerLabel: "Home Screen" }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="testingScreenStack"
        options={{ drawerLabel: "Testing Screen" }}
        component={TestScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
