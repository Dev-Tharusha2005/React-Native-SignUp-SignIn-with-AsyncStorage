import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const Home = () => {
  const { container } = styles;
  return (
    <View style={container}>
      <Image source={require("./assets/logo-img-1.png")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Home