import React, { Component } from 'react';

export const mapNavigationStateParamsToProps = ScreenComponent => {
  return class extends Component {
    static navigationOptions = ScreenComponent.navigationOptions;
    render() {
      const { params } = this.props.navigation.state;
      return <ScreenComponent {...this.props} {...params} />;
    }
  };
};
