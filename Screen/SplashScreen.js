import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native"; // ActivityIndicator: This component is used to display a loading spinner
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem("user_id").then((value) =>
        navigation.replace(value === null ? "Auth" : "DrawerNavigationRoutes")
      );
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../Image/loader.gif")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
  },
});
