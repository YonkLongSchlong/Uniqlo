import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ProductCard } from "../components";
import { FlashList } from "@shopify/flash-list";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Store = ({ navigation }) => {
  const route = useRoute();
  const { category } = route.params;
  const [product, setProduct] = useState([]);
  const gender = useSelector((state) => state.gender.value);

  useEffect(() => {
    fetch("http://192.168.1.11:3000/product?gender=" + gender)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const productList = data.filter((product) => {
          return product.category === category;
        });
        setProduct(productList);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.filterCotainer}>
        {product && (
          <Text style={styles.textCounter}>{product.length} item(s)</Text>
        )}
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.textSort}>Sort by</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollView}>
        {product && (
          <FlashList
            data={product}
            renderItem={({ item }) => (
              <ProductCard navigation={navigation} item={item} />
            )}
            estimatedItemSize={10}
            numColumns={2}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  filterCotainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  textCounter: {
    fontFamily: "regular",
    fontSize: 12,
  },
  textSort: {
    fontFamily: "medium",
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
});
