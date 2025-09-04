import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Home";

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!firstName || !lastName || !mobile || !password || !confirmPassword) {
      Alert.alert("Warning", "All fields required !");
    } else if (password !== confirmPassword) {
      Alert.alert("Warning", "Password should be same")
    } else {
      try {

        const storedUsers = await AsyncStorage.getItem("users");
        let users = storedUsers ? JSON.parse(storedUsers) : [];

        const userExists = users.some((u) => u.mobile === mobile);
        if (userExists) {
          Alert.alert("User exits with provided mobile");
          return;
        } else {

          const newUser = { firstName, lastName, mobile, password }
          users.push(newUser);

          await AsyncStorage.setItem("users", JSON.stringify(users));

          Alert.alert("Signup success!");
          return;

        }
      } catch (error) {
        console.log(error);
      }
    }
  }


  const { container, logo, headerText, formContainer, formController, signupButton, signupText, linkText } = styles;

  return (
    <ScrollView contentContainerStyle={container}>
      <Image source={require("./assets/logo-img-1.png")} style={logo} />
      <Text style={headerText}>Create Account</Text>

      <View style={formContainer}>
        <TextInput
          style={formController}
          placeholder="First Name"
          placeholderTextColor="#999"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={formController}
          placeholder="Last Name"
          placeholderTextColor="#999"
          value={lastName}
          onChangeText={setLastName}
        />
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
        <TextInput
          style={formController}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={signupButton} onPress={handleSignUp}>
          <Text style={signupText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={linkText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },
  formContainer: {
    width: "100%",
    gap: 15,
  },
  formController: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffdf00",
    paddingHorizontal: 15,
    color: "black",
  },
  signupButton: {
    backgroundColor: "#ffdf00",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signupText: {
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
