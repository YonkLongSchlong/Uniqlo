import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  TextInput,
} from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import CartProductCard from "../components/CartProductCard";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Cart = () => {
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 3,
  });
  const uri = process.env.EXPO_PUBLIC_API_URL;
  const user = useSelector((state) => state.auth.value);
  const navigation = useNavigation();
  const [productList, setProductList] = useState([]);
  const [shipping, setShipping] = useState(100);
  const [address, setAddress] = useState(user.address);
  const [fullName, setFullNam] = useState("");
  const [phone, setPhone] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [forcedUpdate, setForcedUpdate] = useState(false);

  const forcedUpdateFunction = () => {
    setForcedUpdate(!forcedUpdate);
  };

  const addOrder = async () => {
    try {
      await fetch(uri + "/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          product_list: productList,
          address: address,
          fullname: fullName,
          phone: phone,
          order_total: subTotal + shipping,
          createdDate: new Date().toString(),
        }),
      });
    } catch (error) {
      throw error;
    }
  };

  const fetchItemsAndUpdateSubTotal = async () => {
    const res = await fetch(uri + "/cart_items");
    const data = await res.json();
    if (data.length > 0) {
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
    } else {
      setSubTotal(0);
    }
    setProductList(data);
  };

  const handleOrder = () => {
    if (productList.length > 0) {
      if (address != "" && fullName != "" && phone != "") {
        addOrder();
        navigation.navigate("Order", {
          productList: productList,
        });
      } else {
        ToastAndroid.show(
          "Please fill in all informations",
          ToastAndroid.SHORT
        );
      }
    } else {
      ToastAndroid.show(
        "There are no products in your cart",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    fetchItemsAndUpdateSubTotal();
  }, [forcedUpdate]);

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>SHOPPING CART</Text>
      <ScrollView>
        {productList &&
          productList.map((product) => (
            <CartProductCard
              product={product}
              cartItemId={product.id}
              key={product.id}
              setSubTotal={setSubTotal}
              forcedUpdateFunction={forcedUpdateFunction}
              setShipping={setShipping}
            />
          ))}
        <View style={styles.cartInfoContainer}>
          <Text
            style={{ fontFamily: "semibold", fontSize: 12, marginBottom: 10 }}
          >
            ORDER SUMARY | {productList.length} Item(s)
          </Text>
          {/* <CheckoutCard productList={productList} /> */}
          <View style={styles.container}>
            <View style={styles.lineContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text style={styles.subtotalText}>
                {formatter.format(subTotal)} VND
              </Text>
            </View>
            <View style={styles.separator}></View>
            <View>
              <Text style={styles.shippingText}>Your adress:</Text>
              <TextInput
                style={{
                  fontFamily: "regular",
                  fontSize: 12,
                  paddingTop: 5,
                }}
                placeholder="Provide your address"
                onChangeText={setAddress}
                defaultValue={user.address}
              />
            </View>
            <View style={styles.separator}></View>
            <View>
              <Text style={styles.shippingText}>Buyer name:</Text>
              <TextInput
                style={{ fontFamily: "regular", fontSize: 12, paddingTop: 5 }}
                placeholder="Provide your full name"
                onChangeText={setFullNam}
              />
            </View>
            <View style={styles.separator}></View>
            <View>
              <Text style={styles.shippingText}>Phone:</Text>
              <TextInput
                style={{ fontFamily: "regular", fontSize: 12, paddingTop: 5 }}
                placeholder="Provide your phone number"
                onChangeText={setPhone}
              />
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
        </View>
      </ScrollView>
      <View style={styles.checkOutBtnContainer}>
        <TouchableOpacity
          style={styles.checkOutBtn}
          onPress={() => {
            handleOrder();
          }}
        >
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 14,
              color: Colors.white,
            }}
          >
            CHECKOUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  boldText: {
    fontFamily: "bold",
    fontSize: 16,
    textAlign: "left",
    padding: 20,
  },
  cartInfoContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowOpacity: 1.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  checkOutBtnContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
    gap: 10,
  },
  checkOutBtn: {
    backgroundColor: "#ed475e",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 10,
  },
  calBtn: {
    backgroundColor: "#ed475e",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 10,
  },
  lineContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressCOntainer: {
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
