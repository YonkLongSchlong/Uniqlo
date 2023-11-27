import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";

const CarouselComponent = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const image = [
    "https://source.unsplash.com/assorted-color-shirt-lot-2I0e38YkR1A",
    "https://source.unsplash.com/red-and-white-long-sleeve-shirt-mwa_nzFpnJw",
    "https://source.unsplash.com/white-crew-neck-t-shirt-and-brown-leather-boots-gUPiTDBdRe4",
    "https://source.unsplash.com/gray-cardigan-blue-jeans-and-pair-of-brown-chunky-heeled-shoes-5gkYsrH_ebY",
    "https://source.unsplash.com/white-long-sleeve-shirt-on-white-clothes-hanger-jYz3EGBhDpk",
  ];

  return (
    <View>
      <Carousel
        loop
        width={width}
        height={height - 165}
        autoPlay={true}
        data={image}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                resizeMode: "cover",
                width: width,
                height: height - 165,
              }}
              source={{ uri: item }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({});
