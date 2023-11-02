import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomSidebarMenu = (props) => {
  const [isSubmenuExpanded, setIsSubmenuExpanded] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuExpanded(!isSubmenuExpanded);
  };

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{ fontSize: 25, color: "#307ecc" }}>
            {"About React".charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>AboutReact</Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={() => (
            <View style={stylesSidebar.dropdownItem}>
              <Text style={{ color: "gray", flex: 1 }}>Setting Screen</Text>
              <Text style={{ color: "gray" }}>
                {isSubmenuExpanded ? "-" : "+"}
              </Text>
            </View>
          )}
          onPress={toggleSubmenu}
        />
        {isSubmenuExpanded && (
          <>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("SubmenuNavigator", {
                  screen: "EditProfile",
                });
              }}
            >
              <Text style={stylesSidebar.submenuItem}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("SubmenuNavigator", {
                  screen: "ChangePassword",
                });
              }}
            >
              <Text style={stylesSidebar.submenuItem}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("ChangePasswordScreen");
              }}
            >
              <Text style={stylesSidebar.submenuItem}>Delete Account</Text>
            </TouchableOpacity>
          </>
        )}

        <DrawerItem
          label={({ color }) => <Text style={{ color: "red" }}>Logout</Text>}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              "Logout",
              "Are you sure? You want to logout?",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: "Confirm",
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace("Auth");
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ddd",
    paddingTop: 40,
    color: "white",
  },
  profileHeader: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    padding: 15,
    textAlign: "center",
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: "white",
    backgroundColor: " #ddd",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    color: "white",
    alignSelf: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: " #ddd",
    marginTop: 15,
  },
  submenuItem: {
    marginLeft: 50,
    marginTop: 8,
    padding: 10,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  submenuItemText: {
    marginLeft: 50,
    padding: 10,
    color: "#ddd",
  },
});
