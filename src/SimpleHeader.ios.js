import React, { Component } from "react";
import { StatusBar, StyleSheet, Text, SafeAreaView, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { human } from "react-native-typography";
import { Ionicons } from "@expo/vector-icons";

const HEADER_HEIGHT = 90;

const BUTTON_SHAPE = {
  icon: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired
};

const Header = ({ title, color, backgroundColor, rightButton, leftButton }) => (
  <SafeAreaView style={[styles.container, { backgroundColor }]}>
    <StatusBar
      translucent
      barStyle="dark-content"
      backgroundColor="rgba(0, 0, 0, 0.251)" />

    {leftButton ? 
      <TouchableOpacity style={styles.btn} onPress={leftButton.onPress}>
        {leftButton.icon}
      </TouchableOpacity> : <View />}

    <Text style={[styles.title, human.title3, { color }]}>{title}</Text>

    {rightButton ? 
      <TouchableOpacity style={styles.btn} onPress={rightButton.onPress}>
        {rightButton.icon}
      </TouchableOpacity> : <View />}
  </SafeAreaView>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  rightButton: PropTypes.shape(BUTTON_SHAPE),
  leftButton: PropTypes.shape(BUTTON_SHAPE)
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    zIndex: 2, 
    shadowColor: "#666",
    shadowOpacity: 0.4,
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 2,
    height: HEADER_HEIGHT
  },
  title: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    paddingBottom: 12,
    textAlign: "center"
  },
  btn: {
    zIndex: 4,
    padding: 8,
    marginHorizontal: 8
  }
});
