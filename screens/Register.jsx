import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import React from "react";
import {} from "react-native-safe-area-context";
import { RegisterForm } from "../components";

const Register = () => {
  return (
    <SafeAreaView style={{}}>
      <View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.registerHeaderContainer}>
            <Text style={styles.registerHeader}>CREATE AN ACCOUNT</Text>
          </View>
          <RegisterForm />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  scrollView: {
    width: Dimensions.get("window").width,
  },
  logoContainer: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    width: "100%",
    height: 64,
    alignItems: "center",
    paddingLeft: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
  },
  registerHeaderContainer: {
    width: "100%",
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  registerHeader: {
    fontFamily: "bold",
    fontSize: 16,
  },
});
