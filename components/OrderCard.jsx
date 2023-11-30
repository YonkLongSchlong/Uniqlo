import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const OrderCard = ({ order }) => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 3,
  });
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.orderContainer}>
          <View style={styles.orderInfoContainer}>
            <Text style={styles.text}>{order.fullname}</Text>
            <Text style={styles.text}>Address: {order.address}</Text>
            <Text style={styles.text}>Order date: {order.createdDate}</Text>

            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>SUBTOTAL:</Text>
              <Text style={styles.subtotal}>
                {formatter.format(order.order_total)} VND
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  orderContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    gap: 15,
  },
  orderInfoContainer: { width: 0, flexGrow: 1, flex: 1 },
  text: { fontFamily: "semibold", fontSize: 12 },
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
});
