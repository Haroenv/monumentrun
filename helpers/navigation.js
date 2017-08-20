import React, { Component } from 'react';

export const mapNavigationStateParamsToProps = ScreenComponent =>
  class extends Component {
    props: {
      navigation: { state: { params: Object } },
    };
    static navigationOptions = ScreenComponent.navigationOptions;
    render() {
      const { params } = this.props.navigation.state;
      return <ScreenComponent {...this.props} {...params} />;
    }
  };
