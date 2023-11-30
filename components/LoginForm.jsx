import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import { useDispatch } from "react-redux";
import { login } from "../features/login/loginReducer";
import validateEmail from "../validations/validateEmail";
import validatePassword from "../validations/validatePassword";

const LoginForm = ({ isFocused }) => {
  const uri = process.env.EXPO_PUBLIC_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();

  const toastInvalidCredentials = () => {
    ToastAndroid.show("Invalid email or password", ToastAndroid.SHORT);
  };

  const toastLoginFail = () => {
    ToastAndroid.show(
      "Wrong incredentials. Please try again",
      ToastAndroid.SHORT
    );
  };

  const handleLogin = () => {
    if (validateEmail(email) !== null && validatePassword(password) !== null) {
      userList.forEach((user) => {
        if (user.email === email && user.password === password) {
          dispatch(
            login({
              id: user.id,
              username: user.username,
              email: email,
              password: password,
              address: user.address,
              avatar: user.avatar,
            })
          );
        }
      });
    } else {
      toastInvalidCredentials();
    }
  };

  useEffect(() => {
    fetch(uri + "/user")
      .then((res) => res.json())
      .then((data) => setUserList(data))
      .catch((error) => {
        throw error;
      });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Log in with your email address and password
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>EMAIL ADDRESS*</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="Enter a valid email"
          placeholderTextColor={Colors["light-grey"]}
          onChangeText={setEmail}
        />

        <Text style={styles.header}>PASSWORD*</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="****************"
          placeholderTextColor={Colors["light-grey"]}
          textContentType="password"
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Text style={[{ color: Colors["light-grey"] }, styles.text]}>
          Password must be at least 8 characters, and contain both letters and
          numbers. Only these symbols can be used -_.@
        </Text>
      </View>
      <View style={styles.termContainer}>
        <Text
          style={[
            { textDecorationLine: "underline", marginBottom: 5 },
            styles.header,
          ]}
        >
          TERMS OF USE
        </Text>
        <Text
          style={[
            { textDecorationLine: "underline", marginBottom: 5 },
            styles.header,
          ]}
        >
          PRIVACY POLICY
        </Text>
      </View>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleLogin();
          }}
        >
          <Text
            style={{ color: Colors.white, fontSize: 14, fontFamily: "bold" }}
          >
            LOG IN
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text
          style={[
            { textDecorationLine: "underline", textAlign: "right" },
            styles.header,
          ]}
        >
          FORGOT YOUR PASSWORD ?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    height: 420,
    backgroundColor: "#fff",
    padding: 20,
  },
  text: {
    fontFamily: "regular",
    fontSize: 12,
    textAlign: "left",
  },
  inputContainer: {
    marginVertical: 15,
    gap: 2,
  },
  header: {
    fontFamily: "semibold",
    fontSize: 12,
  },
  emailInput: {
    backgroundColor: Colors["super-light-grey"],
    color: Colors.primary,
    fontSize: 12,
    padding: 7,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderColor: Colors["light-grey"],
    marginBottom: 10,
  },
  passwordInput: {
    backgroundColor: Colors["super-light-grey"],
    color: Colors.primary,
    fontSize: 12,
    padding: 7,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderColor: Colors["light-grey"],
    marginBottom: 10,
  },
  termContainer: {
    marginBottom: 10,
  },
  loginBtnContainer: {
    marginBottom: 15,
  },
  btn: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 8,
  },
});
