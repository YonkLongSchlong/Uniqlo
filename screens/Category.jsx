import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CategoryHeader } from "../components";
import { Colors } from "../constants/Colors";
import { useSelector } from "react-redux";
const Category = ({ navigation }) => {
  const uri = process.env.EXPO_PUBLIC_API_URL;
  const [productList, setProductList] = useState([]);
  const gender = useSelector((state) => state.gender.value);

  const fetchProductsByGender = async () => {
    try {
      const res = await fetch(uri + "/product?gender=" + gender);
      const data = await res.json();
      setProductList(data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchProductsByGender();
  }, [gender]);

  let categories = [];
  if (productList) {
    productList.forEach((product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <CategoryHeader />
      <ScrollView style={styles.scrollView}>
        {categories &&
          categories.map((category, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Store", {
                  category: category,
                });
              }}
              style={styles.card}
              key={index}
            >
              <Text style={styles.text}>{category}</Text>
              <View style={styles.separator}></View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  scrollView: {
    width: "90%",
    height: "100%",
  },
  text: {
    fontWeight: "500",
    textTransform: "uppercase",
    fontSize: 14,
    fontFamily: "medium",
  },
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors["light-grey"],
    marginTop: 7,
  },
  card: {
    marginTop: 20,
    width: "100%",
  },
});
