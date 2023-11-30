import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 3,
  });
  const uri = process.env.EXPO_PUBLIC_API_URL;
  const route = useRoute();
  const user = useSelector((state) => state.auth.value);
  const { product } = route.params;
  const [size, setSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  const handleSize = (string) => {
    setSize(string);
  };

  const handleQuantity = (num) => {
    setQuantity(num);
  };

  const handleAddToCart = async () => {
    try {
      await fetch(uri + "/cart_items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          product_name: product.product_name,
          product_size: size,
          product_color: product.color,
          product_gender: product.gender,
          product_category: product.category,
          product_price: product.price,
          product_image: product.image,
          quantity: quantity,
        }),
      });
      ToastAndroid.show("Added to cart", ToastAndroid.SHORT);
    } catch (error) {
      throw error;
    }
  };

  const handleAddToWishList = async () => {
    try {
      await fetch(uri + "/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          product_name: product.product_name,
          size: ["S", "M", "L", "XL"],
          color: product.color,
          gender: product.gender,
          category: product.category,
          price: product.price,
          image: product.image,
        }),
      });
      ToastAndroid.show("Added to wishlist", ToastAndroid.SHORT);
    } catch (error) {
      throw error;
    }
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.white }}>
      <View style={styles.container}>
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName}>{product.product_name}</Text>
          <Text style={styles.productDescription}>
            Easy yet elegant. Versatile pants for any occasion
          </Text>
          <Text style={styles.productId}>Prduct ID: {product.id}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: product.image }} />
        </View>

        <View style={styles.colorContainer}>
          <Text style={{ fontFamily: "regular" }}>Color: {product.color}</Text>
          {/* <TouchableOpacity style={styles.colorPallet}>
            <View
              style={{
                backgroundColor: "brown",
                width: "100%",
                height: "100%",
              }}
            ></View>
          </TouchableOpacity> */}
        </View>

        <View style={styles.sizeContainer}>
          <Text style={{ fontFamily: "regular" }}>
            Size: {product.gender} {size}
          </Text>
          <View style={styles.sizeBtnContainer}>
            {product.size.map((productSize, index) => (
              <TouchableOpacity
                onPress={() => {
                  handleSize(productSize);
                }}
                style={styles.sizeBtn}
                key={index}
              >
                <Text style={size === productSize ? styles.textActive : ""}>
                  {productSize}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.priceQuanContainer}>
          <View>
            <Text style={styles.productPrice}>
              {formatter.format(product.price)} VND
            </Text>
            <Text style={{ fontFamily: "regular", fontSize: 12 }}>
              Made with Recycle Materials
            </Text>
          </View>
          <View style={styles.productQuantitySection}>
            <TouchableOpacity
              onPress={() => {
                if (quantity >= 2) {
                  handleQuantity(quantity - 1);
                }
              }}
            >
              <Text style={{ fontFamily: "medium", fontSize: 18 }}>-</Text>
            </TouchableOpacity>
            <Text style={{ fontFamily: "medium", fontSize: 18 }}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleQuantity(quantity + 1);
              }}
            >
              <Text style={{ fontFamily: "medium", fontSize: 18 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => {
              handleAddToCart();
            }}
          >
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 16,
                color: Colors.white,
              }}
            >
              ADD TO CART
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLike}
            onPress={() => {
              handleAddToWishList();
            }}
          >
            <Ionicons name="heart-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 50,
  },
  productInfoContainer: {
    padding: 20,
    gap: 10,
  },
  productName: {
    fontFamily: "semibold",
    fontSize: 14,
  },
  productDescription: {
    fontFamily: "regular",
    fontSize: 12,
  },
  productId: {
    fontFamily: "regular",
    fontSize: 12,
    textAlign: "right",
  },
  imageContainer: {
    width: "100%",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 400,
    resizeMode: "cover",
  },
  colorContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  colorPallet: {
    marginTop: 5,
    padding: 2,
    width: 35,
    height: 35,
    borderWidth: 1,
  },
  sizeContainer: {
    paddingHorizontal: 20,
  },
  sizeBtnContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },
  sizeBtn: {
    marginTop: 5,
    padding: 2,
    width: 35,
    height: 35,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textActive: {
    textAlign: "center",
    textAlignVertical: "center",
    width: 30,
    height: 30,
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
  priceQuanContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  productPrice: {
    fontFamily: "bold",
    fontSize: 20,
    marginBottom: -5,
  },
  productQuantitySection: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  btnContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
  },
  btnAdd: {
    backgroundColor: "#ed475e",
    padding: 5,
    alignItems: "center",
    width: "85%",
  },
  btnLike: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
