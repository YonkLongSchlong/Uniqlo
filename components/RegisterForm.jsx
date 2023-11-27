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
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import validateEmail from "../validations/validateEmail";
import validatePassword from "../validations/validatePassword";

const RegisterForm = () => {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState("");

  const toastInvalidCredentials = () => {
    ToastAndroid.show("Invalid email or password", ToastAndroid.SHORT);
  };

  const toastLoginFail = () => {
    ToastAndroid.show("Email is already registered", ToastAndroid.SHORT);
  };

  useEffect(() => {
    fetch("http://192.168.1.11:3000/user")
      .then((res) => res.json())
      .then((data) => setUserList(data))
      .catch((error) => {
        throw error;
      });
  }, []);

  const handleRegister = () => {
    if (validateEmail(email) !== null && validatePassword(password) !== null) {
      userList.forEach((user) => {
        if (email !== user.email) {
          fetch("http://192.168.1.11:3000/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: userName,
              email: email,
              password: password,
            }),
          });
          navigation.goBack();
        } else {
          toastLoginFail();
        }
      });
    } else {
      toastInvalidCredentials();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You will receive the confirmation mail to your email address associated
        with account. Please make sure to check your incoming email from us.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>USERNAME*</Text>
        <TextInput
          style={styles.usernameInput}
          placeholder="Enter your username"
          placeholderTextColor={Colors["light-grey"]}
          onChangeText={setUsername}
        />

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
      <View style={styles.separator}></View>
      <View style={styles.termContainer}>
        <Text style={styles.header}>MEMBERSHIP AGREEMENT*</Text>

        <Text style={[{ color: Colors["light-grey"] }, styles.text]}>
          By creating an account you agree to UNIQLO's privacy policy and term
          of use
        </Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#4630EB" : undefined}
          />
          <Text style={[{ color: Colors["light-grey"] }, styles.text]}>
            I agree to the UNIQLO's TERMS OF USE and PRIVACY POLICY
          </Text>
        </View>
        <Text
          style={[
            { textDecorationLine: "underline", marginTop: 20 },
            styles.header,
          ]}
        >
          TERMS OF USE
        </Text>
        <Text style={[{ textDecorationLine: "underline" }, styles.header]}>
          PRIVACY POLICY
        </Text>
      </View>
      <View style={styles.registerBtnContainer}>
        <TouchableOpacity
          style={styles.btn}
          disabled={isChecked ? false : true}
          onPress={() => {
            handleRegister();
          }}
        >
          <Text
            style={{
              fontFamily: "semibold",
              fontSize: 14,
              color: Colors.white,
            }}
          >
            REGISTER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text
            style={[
              {
                textDecorationLine: "underline",
                textAlign: "right",
                fontSize: 12,
                fontFamily: "semibold",
              },
            ]}
          >
            HAVE AN ACCOUNT ? LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },

  text: {
    fontFamily: "regular",
    fontSize: 12,
    textAlign: "left",
    flexShrink: 1,
  },
  inputContainer: {
    marginVertical: 15,
    gap: 2,
  },
  header: {
    fontFamily: "semibold",
    fontSize: 13,
  },
  usernameInput: {
    backgroundColor: Colors["super-light-grey"],
    color: Colors.primary,
    fontSize: 12,
    padding: 7,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderColor: Colors["light-grey"],
    marginBottom: 20,
  },
  emailInput: {
    backgroundColor: Colors["super-light-grey"],
    color: Colors.primary,
    fontSize: 12,
    padding: 7,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderColor: Colors["light-grey"],
    marginBottom: 20,
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
  separator: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
    backgroundColor: Colors["light-grey"],
    marginBottom: 20,
  },
  termContainer: {
    marginBottom: 15,
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
    alignItems: "center",
    flexShrink: 1,
    flex: 1,
  },
  checkbox: {
    padding: 7,
  },
  registerBtnContainer: {
    marginBottom: 15,
  },
  btn: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 8,
    marginBottom: 10,
  },
});
