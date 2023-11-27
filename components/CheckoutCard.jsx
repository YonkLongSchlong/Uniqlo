import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/Colors";

const CheckoutCard = ({ productList }) => {
  // FORMAT CURRENCY
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 3,
  });

  const [shipping, setShipping] = useState(30);

  let subTotal = 0;
  productList.forEach((product) => {
    subTotal = subTotal + product.product_price * product.quantity;
  });

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <Text style={styles.subtotalText}>Subtotal</Text>
        <Text style={styles.subtotalText}>
          {formatter.format(subTotal)} VND
        </Text>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.lineContainer}>
        <Text style={styles.shippingText}>Shipping</Text>
        <Text style={styles.shippingText}>
          {formatter.format(shipping)} VND
        </Text>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.lineContainer}>
        <Text style={styles.totalText}>Order Total</Text>
        <Text style={styles.totalText}>
          {formatter.format(subTotal + shipping)} VND
        </Text>
      </View>
    </View>
  );
};

export default CheckoutCard;

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: Colors["super-light-grey"],
    marginVertical: 10,
  },
  subtotalText: {
    fontFamily: "regular",
    fontSize: 12,
    color: Colors["light-grey"],
  },
  shippingText: {
    fontFamily: "regular",
    fontSize: 12,
    color: Colors["light-grey"],
  },
  totalText: {
    fontFamily: "bold",
    fontSize: 14,
  },
});
