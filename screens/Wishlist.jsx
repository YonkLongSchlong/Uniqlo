import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { WishlistCard, WishlistHeader } from "../components";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { useIsFocused } from "@react-navigation/native";

const Wishlist = ({ navigation }) => {
  const [wishList, setWishList] = useState([]);
  const [forcedUpdate, setForcedUpdate] = useState(false);
  const isFocused = useIsFocused();

  const forcedUpdateFunction = () => {
    setForcedUpdate(!forcedUpdate);
  };
  useEffect(() => {
    fetch("http://192.168.1.11:3000/wishlist")
      .then((res) => res.json())
      .then((data) => setWishList(data));
  }, [forcedUpdate, isFocused]);

  return (
    <View>
      <TouchableOpacity
        style={styles.cartContainer}
        onPress={() => {
          navigation.navigate("Cart");
        }}
      >
        <Ionicons name="md-cart-outline" size={24} color={Colors.white} />
      </TouchableOpacity>
      <View
        style={{
          width: Dimensions.get("window").width,
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <View style={styles.scrollView}>
          <FlashList
            renderItem={({ item }) => (
              <WishlistCard
                item={item}
                forcedUpdateFunction={forcedUpdateFunction}
              />
            )}
            estimatedItemSize={50}
            data={wishList}
          />
        </View>
      </View>
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  cartContainer: {
    position: "absolute",
    bottom: 25,
    right: 20,
    zIndex: 100,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#ed475e",
  },
});
