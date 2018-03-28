import React, { Component } from "react";
import { Animated, StatusBar, Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { material } from "react-native-typography";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Menu from "./Menu";

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 56;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const APP_BAR_ELEVATION = 4;

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
    image: PropTypes.shape({
      preview: PropTypes.string,
      uri: PropTypes.string.isRequired
    }),
    leftButton: PropTypes.shape(BUTTON_SHAPE),
    rightButtons: PropTypes.arrayOf(PropTypes.shape({
      ...BUTTON_SHAPE,
      title: PropTypes.string,
      showAsAction: PropTypes.bool.isRequired
    }))
  };

  static defaultProps = {
    rightButtons: []
  };

  state = {
    menuVisible: false,
    position: { x: 0, y: 0 }
  };

  showMenu = position => this.setState({ position, menuVisible: true });

  hideMenu = () => this.setState({ menuVisible: false });

  render = () => {
    const { offset, title, color, backgroundColor, image, leftButton, rightButtons } = this.props;
    const { menuVisible, position } = this.state;

    const headerTranslate = offset.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp",
    });

    const imageOpacity = offset.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });
    const imageTranslate = offset.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    const iconBarTranslate = offset.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });

    const titleScale = offset.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.6],
      extrapolate: "clamp",
    });
    const titleTranslate = offset.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -90],
      extrapolate: "clamp"
    });

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={color} />

        <Animated.View style={[styles.header, { backgroundColor: backgroundColor, transform: [{ translateY: headerTranslate }] }]}>
          <AnimatedImage style={[styles.backgroundImage, { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] }]} 
                         preview={{ uri: image.preview }} 
                         uri={image.uri} />

          <Animated.View style={[styles.bar, { transform: [{ scale: titleScale }, { translateX: titleTranslate }] }]}>
            <Text style={[material.display1, { color, marginLeft: 32 }]}>{title}</Text>
          </Animated.View>

          <Animated.View style={[styles.iconBar, { transform: [{ translateY: iconBarTranslate }] }]}>
            <View style={styles.iconContainer}>
              {leftButton ?
                <TouchableOpacity onPress={leftButton.onPress}>
                  {leftButton.icon}
                </TouchableOpacity>
                : null}
            </View>

            <View style={styles.iconContainer}>
              {rightButtons.map(btn => btn.showAsAction === "ifRoom" ?
                <TouchableOpacity onPress={btn.onPress}>
                  {btn.icon}
                </TouchableOpacity> : null)}

              {rightButtons.filter(btn => btn.showAsAction === "never").length > 0 ? 
                <TouchableOpacity onPress={e => this.showMenu({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY })}>
                  <Ionicons style={styles.icon} name="md-more" size={28} color={color} />
                </TouchableOpacity> : null}
            </View>
          </Animated.View>
        </Animated.View>

        <Menu visible={menuVisible}
              position={position} 
              items={rightButtons.filter(btn => btn.showAsAction === "never")}
              onRequestClose={this.hideMenu} />
      </View>
    );
  }
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

const styles = StyleSheet.create({
  container: {
    position: "absolute", 
    top: 0, 
    left: 0, 
    right: 0
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT,
    elevation: APP_BAR_ELEVATION
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT
  },
  bar: {
    backgroundColor: "transparent",
    height: HEADER_MIN_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  iconBar: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MIN_HEIGHT
  },
  iconContainer: {
    marginLeft: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  icon: {
    padding: 8,
    marginRight: 8,
    width: 38
  }
});
