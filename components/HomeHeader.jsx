import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";

const HomeHeader = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.value.username);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={24}
            color={Colors["light-grey"]}
          />

          <TextInput
            onFocus={() => {
              navigation.navigate("Category");
            }}
            style={styles.textInput}
            placeholder="Search by keyword"
            showSoftInputOnFocus={false}
          />
        </View>

        <MaterialCommunityIcons
          name="barcode-scan"
          size={22}
          color={Colors.primary}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Ionicons name="md-cart-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.greetingContainer}>
        <Text style={styles.text}>Have a great day {username}</Text>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginTop: 40,
  },
  searchBar: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  textInput: {
    paddingHorizontal: 50,
    padding: 8,
    backgroundColor: Colors.grey,
    borderRadius: 10,
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    left: 15,
    zIndex: 2,
  },
  greetingContainer: {
    marginTop: 20,
    marginBottom: 0,
    alignItems: "center",
  },
  text: {
    fontFamily: "semibold",
    fontSize: 12,
    textAlign: "center",
  },
});
