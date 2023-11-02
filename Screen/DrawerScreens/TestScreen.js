import React, { useState, createRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Loader from "../Components/Loader";
import axios from "axios";

const TestScreen = ({ navigation }) => {
  const [status, setStatus] = useState("");
  const [errortext, setErrorText] = useState("");

  const handleClick = (state) => {
    setStatus(state);
    test();
  };

  const test = () => {
    axios
      .post(`http://192.168.8.104/apicrud/test.php`, {
        status: status,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.mainBody}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => handleClick("forward")}
          >
            <Text style={styles.buttonTextStyle}>Forward</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => handleClick("backward")}
          >
            <Text style={styles.buttonTextStyle}>Backward</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => handleClick("right")}
          >
            <Text style={styles.buttonTextStyle}>Right</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => handleClick("left")}
          >
            <Text style={styles.buttonTextStyle}>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => handleClick("stop")}
          >
            <Text style={styles.buttonTextStyle}>Stop</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default TestScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ddd",
    alignContent: "center",
  },
  buttonStyle: {
    backgroundColor: "#2d6250",
    borderWidth: 0,
    color: "#2d6250",
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
    paddingVertical: 10,
    fontSize: 16,
  },
});
