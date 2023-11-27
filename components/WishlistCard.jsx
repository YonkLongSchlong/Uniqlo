import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const WishlistCard = ({ item, forcedUpdateFunction }) => {
  // FORMAT CURRENCY
  const formatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 3,
  });
  const navigation = useNavigation();

  function showToastDelWishList() {
    ToastAndroid.show("Deleted from wishlist", ToastAndroid.SHORT);
  }

  const handleDelete = () => {
    fetch("http://192.168.1.11:3000/wishlist/" + item.id, {
      method: "DELETE",
    });
    showToastDelWishList();
    forcedUpdateFunction();
  };
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProductDetail", {
          product: item,
        });
      }}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Image
            style={{ width: 130, height: 175, borderRadius: 5 }}
            source={{ uri: item.image }}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.product_name}</Text>
            <Text style={styles.productId}>Product id: {item.id}</Text>
            <Text style={styles.productColor}>Color: {item.color}</Text>
            <Text style={styles.productPrice}>
              {formatter.format(item.price)} VND
            </Text>
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
    </TouchableOpacity>
  );
};

export default WishlistCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: Colors.white,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors["super-light-grey"],
    marginTop: 10,
  },
  productInfo: {
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  productName: {
    fontFamily: "semibold",
    fontSize: 14,
  },
  productId: {
    fontFamily: "regular",
    fontSize: 12,
  },
  productColor: {
    fontFamily: "regular",
    fontSize: 12,
  },
  productPrice: {
    fontFamily: "bold",
    fontSize: 16,
  },
  iconBtn: {
    position: "absolute",
    right: 0,
    bottom: 10,
  },
});
