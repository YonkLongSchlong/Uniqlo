import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./navigation/BottomTab";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import {
  Cart,
  Login,
  Order,
  ProductDetail,
  Register,
  Store,
  EditProfile,
  OrderHistory,
} from "./screens";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./constants/Colors";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/login/loginReducer";
import { Provider, useSelector } from "react-redux";
import genderReducer from "./features/gender/genderReducer";

function App() {
  const user = useSelector((state) => state.auth.value);
  const Stack = createNativeStackNavigator();
  const [fontLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      {user.id !== "" ? (
        <Stack.Navigator initialRouteName="BottomTab">
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={({ navigation }) => ({
              headerBackVisible: true,
              headerTitle: "",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Cart");
                  }}
                >
                  <Ionicons
                    name="md-cart-outline"
                    size={24}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Store"
            component={Store}
            options={({ navigation, route }) => ({
              headerBackVisible: true,
              headerTitle: "Store",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Cart");
                  }}
                >
                  <Ionicons
                    name="md-cart-outline"
                    size={24}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
              headerTitleStyle: { fontFamily: "medium", fontSize: 16 },
            })}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{
              headerBackVisible: true,
              headerTitle: "Cart",
              headerTitleStyle: { fontFamily: "medium", fontSize: 16 },
            }}
          />
          <Stack.Screen
            name="Order"
            component={Order}
            options={{
              headerBackVisible: true,
              headerTitle: "Order",
              headerTitleStyle: { fontFamily: "medium", fontSize: 16 },
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerBackVisible: true,
              headerTitle: "Edit Profile",
              headerTitleStyle: { fontFamily: "medium", fontSize: 16 },
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="OrderHistory"
            component={OrderHistory}
            options={{
              headerBackVisible: true,
              headerTitle: "Order History",
              headerTitleStyle: { fontFamily: "medium", fontSize: 16 },
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              tabBarIcon: ({ size, focused }) => (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={24}
                  color={Colors.primary}
                />
              ),
              headerTitle: "Login",
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
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              tabBarIcon: ({ size, focused }) => (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={24}
                  color={Colors.primary}
                />
              ),
              headerTitle: "Register",
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function AppWrapper() {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      gender: genderReducer,
    },
  });
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
