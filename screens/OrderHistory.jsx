import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import { OrderCard } from "../components";

const OrderHistory = () => {
  const uri = process.env.EXPO_PUBLIC_API_URL;
  const user = useSelector((state) => state.auth.value);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(uri + "/orders?user_id=" + user.id);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <View style={styles.container}>
      <FlashList
        data={orders}
        estimatedItemSize={50}
        renderItem={({ item }) => <OrderCard order={item} />}
      />
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    padding: 20,
  },
});
