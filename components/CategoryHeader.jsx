import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import { useDispatch } from "react-redux";
import { setGender } from "../features/gender/genderReducer";

const CategoryHeader = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(1);
  const dispatch = useDispatch();

  const genderCategories = [
    { id: 1, name: "Women" },
    { id: 2, name: "Men" },
    { id: 3, name: "Kids" },
    { id: 4, name: "Baby" },
  ];

  const selectCategory = (index, gender) => {
    setActiveIndex(index);
    dispatch(setGender(gender));
  };
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
          <TextInput style={styles.textInput} placeholder="Search by keyword" />
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
      <View style={styles.categoriesContainer}>
        {genderCategories.map((category) => (
          <TouchableOpacity
            onPress={() => {
              selectCategory(category.id, category.name);
            }}
            key={category.id}
            style={
              activeIndex === category.id
                ? styles.categoryBtnActive
                : styles.categoryBtn
            }
          >
            <Text
              style={
                activeIndex === category.id
                  ? styles.categoryTextActive
                  : styles.categoryText
              }
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginBottom: 30,
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginTop: 63,
    marginBottom: 12,
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
  categoriesContainer: {
    marginTop: 20,
    marginBottom: 0,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryBtn: {
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoryBtnActive: {
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 4,
    paddingBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: Colors["light-grey"],
    fontFamily: "semibold",
    textTransform: "uppercase",
  },
  categoryTextActive: {
    fontSize: 14,
    color: "#000",
    fontFamily: "semibold",
    textTransform: "uppercase",
  },
});
