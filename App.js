import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SignUp from "./SignUp";
import Home from "./Home";

const Stack = createStackNavigator();

function SignIn({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const { container, logo, headerText, formContainer, formController, signinButton, signinText, linkText } = styles;



  const handleSignin = async ()=>{

    if (!mobile || !password) {
      Alert.alert("Warning", "All fields required !");
    } else {
      try {
        
        const storedUsers = await AsyncStorage.getItem("users");
        let user = storedUsers?JSON.parse(storedUsers):[];

        const validUsers = user.some((u)=> u.mobile===mobile && u.password===password);

        if (validUsers) {
          navigation.navigate(Home);
        } else {
          Alert.alert("Warning", "Invalid details");
        }

      } catch (error) {
        console.log(error)
      }
    }

  }

  return (
    <View style={container}>
      <Image source={require("./assets/logo-img-1.png")} style={logo} />
      <Text style={headerText}>Async Auth</Text>

      <View style={formContainer}>
        <TextInput
          style={formController}
          placeholder="Mobile Number"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={mobile}
          onChangeText={setMobile}
        />
        <TextInput
          style={formController}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={signinButton} onPress={handleSignin}>
          <Text style={signinText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 20,
  },
  headerText: {
    color: "#ffdf00",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  formController: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffdf00",
    paddingHorizontal: 15,
    color: "black",
  },
  formContainer: {
    width: "100%",
    gap: 20,
  },
  signinButton: {
    backgroundColor: "#ffdf00",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  signinText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#263238",
  },
  linkText: {
    marginTop: 15,
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
