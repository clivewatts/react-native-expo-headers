import React, { Component } from "react";
import { Animated, Dimensions, StatusBar, StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { iOSUIKit } from "react-native-typography";
import { Ionicons } from "@expo/vector-icons";

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 90;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const SCREEN_WIDTH = Dimensions.get("window").width;

const BUTTON_SHAPE = {
  icon: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired
};

export default class Header extends Component {
  static propTypes = {
    offset: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    leftButton: PropTypes.shape(BUTTON_SHAPE),
    rightButton: PropTypes.shape(BUTTON_SHAPE)
  };

  static defaultProps = {
    backgroundColor: "#E8E8E8",
  };

  state = {
    horizontalTitleOffset: 56
  };

  setOffset = offset => this.setState({ horizontalTitleOffset: offset });

  render = () => {
    const { offset, title, color, backgroundColor, leftButton, rightButton } = this.props;
    const { horizontalTitleOffset } = this.state;

    const headerTranslate = offset.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp",
    });

    const titleScale = offset.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: "clamp",
    });
    const titleTranslateX = offset.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [-SCREEN_WIDTH / 2 + horizontalTitleOffset, 0],
      extrapolate: "clamp"
    });
    const titleTranslateY = offset.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [44, -8],
      extrapolate: "clamp"
    });

    return (
      <View style={[styles.container, { backgroundColor }]}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="rgba(0, 0, 0, 0.251)" />

        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }],
              backgroundColor },
          ]}/>
        <SafeAreaView style={styles.btnContainer}>
          {leftButton ? 
            <TouchableOpacity style={styles.btn} onPress={leftButton.onPress}>
              {leftButton.icon}
            </TouchableOpacity> : <View />}
          
          {rightButton ? 
            <TouchableOpacity style={styles.btn} onPress={rightButton.onPress}>
              {rightButton.icon}
            </TouchableOpacity> : <View />}
        </SafeAreaView>
        <Animated.View style={[styles.bar, { transform: [{ scale: titleScale }, { translateX: titleTranslateX }, { translateY: titleTranslateY }] }]}>
          <SafeAreaView>
            <Text onLayout={e => this.setOffset(e.nativeEvent.layout.width / 2)}
                  style={[iOSUIKit.largeTitleEmphasized, { paddingLeft: 16, color }]}>{title}</Text>
          </SafeAreaView>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column", 
    justifyContent: "flex-start", 
    zIndex: 2, 
    shadowColor: "#666",
    shadowOpacity: 0.4,
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 2,
    height: HEADER_MIN_HEIGHT
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },
  btnContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  btn: {
    padding: 8
  },
  bar: {
    backgroundColor: "transparent",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  }
});
