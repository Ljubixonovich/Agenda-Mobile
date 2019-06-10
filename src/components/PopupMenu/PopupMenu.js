import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UIManager, findNodeHandle, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ICON_SIZE = 30;

export default class PopupMenu extends Component {
  static propTypes = {
    // array of strings, will be list items of Menu
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPress: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      icon: null
    };
  }

  onError() {
    console.log('Popup Error');
  }

  onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress
      )
    }
  }


  onRef = icon => {
    if (!this.state.icon) {
      this.setState({ icon });
    }
  }


  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Icon
          name='md-more'
          size={ICON_SIZE}
          color={'#000'}
          ref={this.onRef} />
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
   button: {
      overflow: 'hidden',
      marginTop: 8,
      width: 34,
      height: 34,
      borderRadius: 34 / 2,
      justifyContent: 'center',
      alignItems: 'center',
   }
})