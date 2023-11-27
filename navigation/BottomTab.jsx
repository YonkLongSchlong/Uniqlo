import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { HomeScreen, Category, Member, WishList, Login } from "../screens";
import Wishlist from "../screens/Wishlist";

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: { height: 50 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home-variant" : "home-variant-outline"}
              size={24}
              color={Colors.primary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "text-box-search" : "text-box-search-outline"}
              size={24}
              color={Colors.primary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          headerTitle: "Wishlist",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "heart-sharp" : "heart-outline"}
              size={24}
              color={Colors.primary}
            />
          ),
          headerTitleStyle: { fontFamily: "medium", fontSize: 16 },
          headerStyle: {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.22,
            shadowRadius: 3.22,

            elevation: 5,
          },
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Member"
        component={Member}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={Colors.primary}
            />
          ),
          headerTitle: "Member",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "medium", fontSize: 16 },
          headerStyle: {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.22,
            shadowRadius: 3.22,

            elevation: 5,
          },
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
