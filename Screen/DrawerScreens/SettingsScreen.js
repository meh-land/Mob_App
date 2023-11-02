import React from "react";
import { View, Text, Button } from "react-native";

function SettingsScreen({ navigation }) {
  // Add your settings UI elements here
  return (
    <View>
      <Text>Settings</Text>
      <Button
        title="Save Settings"
        onPress={() => {
          /* Handle settings changes */
        }}
      />
    </View>
  );
}

export default SettingsScreen;
