import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import validateEmail from "../validations/validateEmail";
import validatePassword from "../validations/validatePassword";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/login/loginReducer";

const EditProfile = () => {
  const uri = process.env.EXPO_PUBLIC_API_URL;
  const user = useSelector((state) => state.auth.value);
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [userName, setUsername] = useState(user.username);
  const [address, setAddress] = useState(user.address);
  const [password, setPassword] = useState(user.password);
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(uri + "/user")
      .then((res) => res.json())
      .then((data) => setUserList(data))
      .catch((error) => {
        throw error;
      });
  }, []);

  const updateUserWithChecked = async () => {
    try {
      fetch(uri + "/user/" + user.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          email: email,
          address: address,
          password: password,
          avatar: user.avarta,
        }),
      });
    } catch (error) {
      throw error;
    }
  };

  const updateUserWithUnchecked = async () => {
    try {
      fetch(uri + "/user/" + user.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          email: user.email,
          address: address,
          password: password,
          avatar: user.avarta,
        }),
      });
    } catch (error) {
      throw error;
    }
  };

  const checkEmailAndUpdate = (userList) => {
    let check = false;
    userList.forEach((user) => {
      if (email !== user.email) {
        check = true;
      }
      if (check) {
        updateUserWithChecked();
        dispatch(
          login({
            id: user.id,
            username: userName,
            email: email,
            password: password,
            address: address,
            avatar: user.avatar,
          })
        );
        navigation.navigate("Member");
      } else {
        ToastAndroid.show("Email is already registered", ToastAndroid.SHORT);
      }
    });
  };

  const handleUpdate = () => {
    if (
      validateEmail(email) !== null &&
      validatePassword(password) !== null &&
      address !== "" &&
      userName !== null
    ) {
      if (isChecked) {
        checkEmailAndUpdate(userList);
      } else {
        updateUserWithUnchecked();
        dispatch(
          login({
            id: user.id,
            username: userName,
            email: user.email,
            password: password,
            address: address,
            avatar: user.avatar,
          })
        );
        navigation.goBack();
      }
    } else {
      ToastAndroid.show("Invalid credentials", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/Rectangle4213.png")} />
        <Image source={require("../assets/Rectangle4214.png")} />
      </View>
      <Text
        style={{
          fontFamily: "bold",
          fontSize: 16,
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        EDIT PROFILE
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>USERNAME*</Text>
        <TextInput
          style={styles.usernameInput}
          placeholder="Enter your username"
          placeholderTextColor={Colors["light-grey"]}
          value={userName}
          onChangeText={setUsername}
        />

        <Text style={styles.header}>EMAIL ADDRESS*</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="Enter a valid email"
          placeholderTextColor={Colors["light-grey"]}
          value={email}
          editable={isChecked ? true : false}
          onChangeText={setEmail}
        />
        <View style={{ flexDirection: "row", marginBottom: 20, gap: 10 }}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#4630EB" : undefined}
          />
          <Text style={[{ color: Colors["light-grey"] }, styles.text]}>
            Change email ?
          </Text>
        </View>

        <Text style={styles.header}>ADDRESS*</Text>
        <TextInput
          style={styles.addressInput}
          placeholder="Enter your address"
          placeholderTextColor={Colors["light-grey"]}
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.header}>PASSWORD*</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="****************"
          placeholderTextColor={Colors["light-grey"]}
          textContentType="password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />

        <Text style={[{ color: Colors["light-grey"] }, styles.text]}>
          Password must be at least 8 characters, and contain both letters and
          numbers. Only these symbols can be used -_.@
        </Text>
      </View>
      <View style={styles.separator}></View>

      <View style={styles.registerBtnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleUpdate();
          }}
        >
          <Text
            style={{
              fontFamily: "semibold",
              fontSize: 14,
              color: Colors.white,
            }}
          >
            UPDATE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  text: {
    fontFamily: "regular",
    fontSize: 12,
    textAlign: "left",
    flexShrink: 1,
  },
  inputContainer: {
    marginVertical: 15,
    gap: 2,
    paddingHorizontal: 20,
    padding: 20,
    backgroundColor: "#fff",
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
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    padding: 7,
  },
  addressInput: {
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
    width: "90%",
    backgroundColor: Colors["light-grey"],
    marginBottom: 20,
    marginHorizontal: 20,
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
    paddingHorizontal: 20,
  },
  btn: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 8,
    marginBottom: 10,
  },
});
