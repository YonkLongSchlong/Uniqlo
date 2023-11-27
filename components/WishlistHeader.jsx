import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const WishlistHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wishlist</Text>
      <Ionicons name="ios-cart-outline" size={24} color="black" />
    </View>
  );
};

export default WishlistHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 7,
  },
  text: {
    fontFamily: "medium",
    fontSize: 16,
  },
});
