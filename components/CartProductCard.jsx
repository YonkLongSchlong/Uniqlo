import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { Colors } from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";

const CartProductCard = ({
  product,
  cartItemId,
  forcedUpdateFunction,
  setSubTotal,
  setShipping,
}) => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 3,
  });
  const uri = process.env.EXPO_PUBLIC_API_URL;
  const [quantity, setQuantity] = useState(product.quantity);

  const sumSubTotal = async () => {
    try {
      const res = await fetch(uri + "/cart_items", {
        method: "GET",
      });
      const data = await res.json();
      let sum = 0;
      data.forEach((product) => {
        sum = sum + product.product_price * product.quantity;
      });
      if (sum > 1000) {
        setShipping(0);
      } else {
        setShipping(100);
      }
      setSubTotal(sum);
    } catch (error) {
      throw error;
    }
  };

  const handleQuantity = async (num) => {
    try {
      await fetch(uri + "/cart_items/" + cartItemId, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: num,
        }),
      });
      setQuantity(num);
      sumSubTotal();
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(uri + "/cart_items/" + cartItemId, {
        method: "DELETE",
      });
    } catch (error) {
      throw error;
    }
    ToastAndroid.show("Deleted from cart", ToastAndroid.SHORT);
    sumSubTotal();
    forcedUpdateFunction();
  };

  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <Image style={styles.image} source={{ uri: product.product_image }} />
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName}>{product.product_name}</Text>
          <Text style={styles.productId}>Product ID: {product.product_id}</Text>
          <Text style={styles.productColor}>
            Color: {product.product_color}
          </Text>
          <Text style={styles.productSize}>Size: {product.product_size}</Text>
          <Text style={styles.productPrice}>
            {formatter.format(product.product_price)} VND
          </Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => {
                if (quantity >= 2) {
                  handleQuantity(quantity - 1, product.product_id);
                }
              }}
            >
              <Text style={{ fontFamily: "medium", fontSize: 12 }}>-</Text>
            </TouchableOpacity>
            <Text style={{ fontFamily: "medium", fontSize: 12 }}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleQuantity(quantity + 1, product.product_id);
              }}
            >
              <Text style={{ fontFamily: "medium", fontSize: 12 }}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>SUBTOTAL:</Text>
            <Text style={styles.subtotal}>
              {formatter.format(product.product_price * quantity)} VND
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => {
            handleDelete();
          }}
        >
          <MaterialCommunityIcons
            name="delete-empty-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.separator}></View>
    </View>
  );
};

export default CartProductCard;

const styles = StyleSheet.create({
  container: { flex: 1 },
  productContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    gap: 15,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: "cover",
    borderRadius: 5,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: Colors["super-light-grey"],
  },
  productInfoContainer: { width: 0, flexGrow: 1, flex: 1, paddingRight: 20 },
  productName: {
    fontFamily: "semibold",
    fontSize: 14,
  },
  productId: {
    fontFamily: "regular",
    fontSize: 12,
    color: Colors["light-grey"],
  },
  productColor: {
    fontFamily: "regular",
    fontSize: 12,
  },
  productSize: {
    fontFamily: "regular",
    fontSize: 12,
  },
  productPrice: {
    fontFamily: "bold",
    fontSize: 12,
    marginVertical: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  subtotalContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 10,
  },
  subtotalText: {
    fontFamily: "bold",
    color: Colors["light-grey"],
    fontSize: 14,
  },
  subtotal: {
    fontFamily: "bold",
    fontSize: 14,
  },
  iconBtn: {
    position: "absolute",
    right: 10,
  },
});
