import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LoginForm } from "../components";
import { Colors } from "../constants/Colors";
import { useIsFocused } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const isFocused = useIsFocused();
  return (
    <SafeAreaView style={{}}>
      <View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/Rectangle4213.png")} />
            <Image source={require("../assets/Rectangle4214.png")} />
          </View>
          <View style={styles.loginHeaderContainer}>
            <Text style={styles.loginHeader}>LOGIN</Text>
            <Pressable onPress={() => {}}>
              <Text style={styles.createAccountHeader}>CREATE AN ACCOUNT</Text>
            </Pressable>
          </View>
          <LoginForm isFocused={isFocused} />
          <View style={styles.newHeaderContainer}>
            <Text style={styles.loginHeader}>CREATE AN ACCOUNT</Text>
          </View>
          <View style={styles.btnContainer}>
            <Text style={styles.text}>
              If you create an account, you can get personalized services like
              checking purchase history and getting discount coupons with your
              membership. Register today for free!
            </Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text
                style={{
                  fontFamily: "semibold",
                  fontSize: 14,
                  color: Colors.white,
                }}
              >
                CREATE AN ACCOUNT
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
  loginHeaderContainer: {
    width: "100%",
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  loginHeader: {
    fontFamily: "bold",
    fontSize: 16,
  },
  createAccountHeader: {
    fontFamily: "semibold",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  newHeaderContainer: {
    width: "100%",
    height: 64,
    justifyContent: "center",
    padding: 20,
  },
  btnContainer: {
    backgroundColor: Colors.white,
    height: 190,
    padding: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  text: {
    fontFamily: "regular",
    fontSize: 12,
  },
  btn: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 8,
    marginVertical: 15,
  },
});
