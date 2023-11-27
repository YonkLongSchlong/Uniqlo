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
  // sumSubTotal,
  forcedUpdateFunction,
  setSubTotal,
}) => {
  // FORMAT CURRENCY
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 3,
  });

  const [quantity, setQuantity] = useState(product.quantity);

  function showToastDelCart() {
    ToastAndroid.show("Deleted from cart", ToastAndroid.SHORT);
  }

  const sumSubTotal = () => {
    fetch("http://192.168.1.11:3000/cart_items")
      .then((res) => res.json())
      .then((data) => {
        let sum = 0;
        data.forEach((product) => {
          sum = sum + product.product_price * product.quantity;
          setSubTotal(sum);
        });
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleQuantity = (num) => {
    fetch("http://192.168.1.11:3000/cart_items/" + cartItemId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: num,
      }),
    })
      .then(setQuantity(num))
      .then(sumSubTotal())
      .catch((error) => {
        throw error;
      });
  };

  const handleDelete = () => {
    fetch("http://192.168.1.11:3000/cart_items/" + cartItemId, {
      method: "DELETE",
    }).catch((error) => {
      throw error;
    });
    showToastDelCart();
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
  productInfoContainer: {},
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
