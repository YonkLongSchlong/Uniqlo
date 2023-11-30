import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../constants/Colors";
import { login, logout } from "../features/login/loginReducer";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const Member = () => {
  const uri = process.env.EXPO_PUBLIC_API_URL;
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.auth.value);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const clearWishlist = async () => {
    const res = await fetch(uri + "/wishlist", {
      method: "GET",
    });
    const data = await res.json();
    data.forEach((product) => {
      fetch(uri + "/wishlist/" + product.id, {
        method: "DELETE",
      }).catch((error) => {
        throw error;
      });
    });
  };

  const clearCart = async () => {
    const res = await fetch(uri + "/cart_items", {
      method: "GET",
    });
    const data = await res.json();
    data.forEach((product) => {
      fetch(uri + "/cart_items/" + product.id, {
        method: "DELETE",
      }).catch((error) => {
        throw error;
      });
    });
  };

  const handleLogout = () => {
    clearWishlist();
    clearCart();
    dispatch(logout());
  };

  const patchUserAvatar = async (image) => {
    try {
      await fetch(uri + "/user/" + user.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar: image,
        }),
      });
      dispatch(
        login({
          id: user.id,
          username: user.username,
          email: user.email,
          address: user.address,
          avatar: image,
          password: user.password,
        })
      );
      console.log(user);
    } catch (error) {
      throw error;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      await saveImage(result.assets[0].uri);
    }
  };
  const saveImage = async (image) => {
    try {
      setImage(image);
      patchUserAvatar(image);
    } catch (error) {
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avartarContainer}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => pickImage()}>
          <Feather name="camera" size={18} color={Colors.primary} />
        </TouchableOpacity>
        {user.avatar && (
          <Image
            source={{ uri: user.avatar }}
            style={{
              width: 150,
              height: 150,
              borderWidth: 0,
              resizeMode: "contain",
              borderRadius: 75,
            }}
          />
        )}
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Personal info</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>User: {user.username}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.text}>Email: {user.email}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.text}>Address: {user.address}</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Utilities</Text>
      </View>
      <View style={styles.utilityBtnContainer}>
        <TouchableOpacity
          style={styles.utilityBtn}
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        >
          <Text style={styles.btnText}>Update profile</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity
          style={styles.utilityBtn}
          onPress={() => {
            navigation.navigate("OrderHistory");
          }}
        >
          <Text style={styles.btnText}>Order History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            handleLogout();
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontFamily: "bold",
              fontSize: 14,
            }}
          >
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Member;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  headerContainer: {
    width: "80%",
    alignItems: "flex-start",
    marginVertical: 15,
  },
  header: {
    fontFamily: "medium",
    fontSize: 12,
  },
  avartarContainer: {
    width: 150,
    height: 150,
    backgroundColor: Colors.white,
    marginBottom: 10,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: "#ECECED",
    alignItems: "center",
  },
  iconBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "#ECECED",
    padding: 10,
    borderRadius: 75,
  },
  infoContainer: {
    backgroundColor: "#ECECED",
    alignItems: "flex-start",
    width: "80%",
    paddingHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
  utilityBtnContainer: {
    backgroundColor: "#ECECED",
    alignItems: "flex-start",
    width: "80%",
    paddingHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
  utilityBtn: {
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
  },
  btnContainer: {
    width: "80%",
    marginTop: 30,
    gap: 20,
  },
  logoutBtn: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
  },
  btnText: {
    fontFamily: "regular",
    fontSize: 12,
  },
  text: {
    fontFamily: "regular",
    fontSize: 12,
  },
  separator: {
    height: 3,
    width: "100%",
    backgroundColor: Colors.white,
    marginVertical: 10,
  },
});
