import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { Colors } from "../constants/Colors";

const Order = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/Animation/Animation.json")}
        autoPlay={true}
        loop={true}
        resizeMode="contain"
        style={{ height: 400, flex: 3 }}
      />
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("BottomTab");
          }}
        >
          <Text style={styles.text}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    borderRadius: 5,
    backgroundColor: "#ed475e",
    padding: 10,
  },
  text: {
    fontFamily: "bold",
    color: Colors.white,
  },
});
