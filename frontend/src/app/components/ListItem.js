import React from 'react';
import {ListItem, CheckBox} from 'react-native-elements';
import {Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';

import {numberToReal} from '../../utils/NumberToString';
import {connect} from 'react-redux';
import {selectItem} from '../../actions/ListItemsActions';

const styles = StyleSheet.create({
  priceText: {
    fontSize: 16,
    color: 'grey',
  },
  quantityText: {
    fontSize: 14,
    color: 'grey',
  },
  checkView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const renderCheckBox = props => {
  const isSelected = _.isNull(props.selectedItem) ? false : _.isEqual(props.item, props.selectedItem);
  
  return (
    <CheckBox
      center
      checked={isSelected}
      onPress={() => props.selectItem(props.item, props.selectedItem)}
    />
  );
};

const Item = props => (
  <ListItem
    key={props.item.id}
    title={props.item.name}
    onPress={() => props.selectItem(props.item, props.selectedItem)}
    subtitle={
      <View>
        <Text style={styles.priceText}>{`Valor: ${numberToReal(props.item.value)}`}</Text>
        <Text style={styles.quantityText}>{`Quantidade: ${props.item.quantity}`}</Text>
      </View>
    }
    rightSubtitle={
      <View style={styles.checkView}>
        {renderCheckBox(props)}
      </View>
    }
    bottomDivider
  />
);

const mapStateToProps = state => ({
  selectedItem: state.ListItemsReducer.selectedItem,
});

export default connect(mapStateToProps, {selectItem})(Item);