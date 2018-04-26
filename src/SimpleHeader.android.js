import React, { Component } from "react";
import { Animated, StatusBar, Dimensions, StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from "react-native";
import PropTypes from "prop-types";
import { material } from "react-native-typography";
import { Ionicons } from "@expo/vector-icons";
import Menu from "./Menu";

const HEADER_HEIGHT = 56;
const APP_BAR_ELEVATION = 4;

const BUTTON_SHAPE = {
  icon: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired
};

export default class SimpleHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    leftButton: PropTypes.shape(BUTTON_SHAPE),
    rightButtons: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      ...BUTTON_SHAPE,
      title: PropTypes.string,
      showAsAction: PropTypes.string.isRequired
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
    const { title, color, backgroundColor, leftButton, rightButtons } = this.props;
    const { menuVisible, position } = this.state;

    return (
      <View style={[styles.header, { backgroundColor }]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={backgroundColor} />

        <View style={styles.iconContainer}>
          {leftButton ?
            <TouchableOpacity style={styles.btn} onPress={leftButton.onPress}>
              {leftButton.icon}
            </TouchableOpacity>
            : null}
        </View>

        <Text style={[material.title, { color: color, flexGrow: 1 }]}>{title}</Text>

        <View style={styles.iconContainer}>
          <FlatList
            data={rightButtons.filter(btn => btn.showAsAction === 'ifRoom')}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.btn} onPress={item.onPress}>
                {item.icon}
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
            horizontal
            inverted
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
          />

          {rightButtons.filter(btn => btn.showAsAction === "never").length > 0 ? 
            <TouchableOpacity style={styles.btn} onPress={e => this.showMenu({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY })}>
              <Ionicons name="md-more" size={28} color={color} />
            </TouchableOpacity> : null}
        </View>

        <Menu visible={menuVisible}
              position={position} 
              items={rightButtons.filter(btn => btn.showAsAction === "never")}
              onRequestClose={this.hideMenu} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    elevation: APP_BAR_ELEVATION,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  iconContainer: {
    marginHorizontal: 8,
    flexShrink: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  btn: {
    padding: 8
  }
});
