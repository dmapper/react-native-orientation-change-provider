import React, { Component } from "react";
import { Dimensions, View } from "react-native";

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

export class OrientationChangeProvider extends Component {
  constructor() {
    super();

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape"
    };

    this.onChangeDimensions = () => {
      if (isPortrait()) {
        if (this.state.orientation !== "portrait") {
          this.setState({orientation: "portrait"});
        }
      } else {
        if (this.state.orientation !== "landscape") {
          this.setState({orientation: "landscape"});
        }
      }
    };

    Dimensions.addEventListener("change", this.onChangeDimensions);
  }

  componentWillUnmount () {
    Dimensions.removeEventListener("change", this.onChangeDimensions);
  }

  render() {
    const {orientation, className, style, children, ...props} = this.props;
    return (
      <View
        key={orientation}
        className={className}
        style={[{ display: "flex", flexGrow: 1 }, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
}
