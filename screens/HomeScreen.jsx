import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { CarouselComponent, HomeHeader } from "../components/index";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <ScrollView>
        <CarouselComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
