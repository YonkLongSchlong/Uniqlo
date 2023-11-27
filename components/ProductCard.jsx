import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const ProductCard = ({ navigation, item }) => {
  // FORMAT CURRENCY
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 3,
  });
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProductDetail", {
          product: item,
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageCotainer}>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productCategory}>{item.gender}</Text>
          <Text style={styles.productName}>{item.product_name}</Text>
          <Text style={styles.productPrice}>
            {formatter.format(item.price)} VND
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: Dimensions.get("window").width / 2,
    height: 330,
  },
  imageCotainer: {
    width: "100%",
    height: 210,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  productInfo: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  productCategory: {
    fontFamily: "regular",
    fontSize: 10,
  },
  productName: {
    fontFamily: "semibold",
    fontSize: 12,
  },
  productPrice: {
    marginTop: 3,
    fontFamily: "bold",
    fontSize: 14,
  },
});
