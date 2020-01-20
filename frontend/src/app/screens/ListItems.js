import React, {Component} from 'react';
import {View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  BackHandler,
  Platform,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { withNavigation } from 'react-navigation';

import * as DISPATCHES from '../../actions/ListItemsActions';
import ListItem from '../components/ListItem';

class ListItems extends Component {

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.fetchData();
    });

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
    }
    
  }

  componentDidMount() {
    this.props.fetchData();
  }

  componentWillUnmount() {
    this.props.cleanData();
    this.focusListener.remove();
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this._handleBackButton,
      );
    }
  }

  _handleBackButton = () => {
    if (Actions.products.name === Actions.currentScene.replace('_', '')) {
      Alert.alert(
        'Sair',
        'Você deseja sair?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancelado')},
          {
            text: 'Ok',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ],
        {cancelable: false},
      );
      return true;
    }
    return false;
  };

  _deleteItem = () => {
    const {selectedItem, deleteItem} = this.props;
    if(selectedItem) {
      deleteItem(selectedItem);
    } else {
      Alert.alert(
        'Nenhum item selecionado',
        'Selecione um item para efetuar a exclusão',
        [{text: 'OK', onPress: () => false}],
      );
    }
  }

  _updateItem = () => {
    const {selectedItem} = this.props;
    if(selectedItem) {
      Actions.managerItems({selectedItem})
    } else {
      Alert.alert(
        'Nenhum item selecionado',
        'Selecione um item para efetuar a edição',
        [{text: 'OK', onPress: () => false}],
      );
    }
  }

  _renderList = () => (
      <FlatList
        style={styles.container}
        data={this.props.products}
        keyExtractor={item => item.id}
        renderItem= {({item}) => (
          <ListItem
            item={item}
          />
        )}
      />
  );

  _renderLoading = () => (
    <View style={styles.loadingView}>
      <ActivityIndicator />
    </View>
  );

  render() {
    return(
      <View style={styles.container}>
      <View style={styles.buttonsView}>
        <TouchableOpacity style={styles.deleteStyle} onPress={() => this._deleteItem()}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateStyle} onPress={() => this._updateItem()}>
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
      </View>
      { this.props.loading ? this._renderLoading() : this._renderList() }
      { this.props.error && <Text style={styles.errorText}>{this.props.error}</Text>}
      <ActionButton
        offsetY={10}
        position="center"
        buttonColor="rgba(0,150,0,1)"
        onPress={() => Actions.managerItems()}
      />
    </View>
    );// 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  loadingView: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 16,
  },
  deleteStyle: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 12,
    margin: 5, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  updateStyle: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 12,
    margin: 5, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginStart: 5,
  },
});

const mapDipatchesToProps = {...DISPATCHES};

const mapStateToProps = state => ({
  ...state.ListItemsReducer
});

export default connect(mapStateToProps, mapDipatchesToProps)(withNavigation(ListItems));