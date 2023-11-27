import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../constants/Colors";
import { logout } from "../features/login/loginReducer";
import { API_URI } from "@env";

const Member = () => {
  const uri = process.env.API_URI;
  const user = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  const clearWishlist = () => {
    fetch(uri + "/wishlist", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) =>
        data.forEach((product) => {
          fetch(uri + "/wishlist/" + product.id, {
            method: "DELETE",
          }).catch((error) => {
            throw error;
          });
        })
      )
      .catch((error) => {
        throw error;
      });
  };

  const clearCart = () => {
    fetch(uri + "/cart_items", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) =>
        data.forEach((product) => {
          fetch(uri + "/cart_items/" + product.id, {
            method: "DELETE",
          }).catch((error) => {
            throw error;
          });
        })
      )
      .catch((error) => {
        throw error;
      });
  };

  const handleLogout = () => {
    clearWishlist();
    clearCart();
    dispatch(logout());
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User: {user.username}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            handleLogout();
          }}
        >
          <Text style={styles.btnText}>LOGOUT</Text>
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
  },
  btnContainer: {
    width: "80%",
    padding: 20,
  },
  logoutBtn: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
  },
  btnText: {
    color: Colors.white,
    fontFamily: "bold",
    fontSize: 16,
  },
  text: {
    fontFamily: "medium",
    fontSize: 14,
  },
});
