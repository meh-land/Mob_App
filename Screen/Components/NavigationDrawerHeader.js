import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

const NavigationDrawerHeader = (props) => {
  const { navigationProps, isBackScreen } = props;

  const toggleDrawer = () => {
    navigationProps.toggleDrawer();
  };

  const goBack = () => {
    navigationProps.goBack();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {isBackScreen ? ( // Check if it's a back screen or drawer screen
        <TouchableOpacity onPress={goBack}>
          <Image
            source={require("../../Image/back.png")} // Back arrow image
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toggleDrawer}>
          <Image
            source={require("../../Image/menuDrawer.png")} // Drawer icon image
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NavigationDrawerHeader;
