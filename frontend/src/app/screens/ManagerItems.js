import React, {Component} from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import {connect} from 'react-redux';
import { withFormik } from 'formik';
import * as yup from 'yup'
import {numberToReal} from '../../utils/NumberToString';

import * as DISPATCHES from '../../actions/ManagerItemsActions';

class ManagerItems extends Component {

  componentDidMount() {
    const {selectedItem, values} = this.props;
    
    if (selectedItem) {
      this.props.setValues({
        ...selectedItem
      });
    }
    
  }

  componentWillUnmount() {
    this.props.cleanData();
  }

  _moneyFielManipulator = text => {
    this.props.setFieldValue('value', parseFloat(text.replace('R$', '').replace(',', '.')));
  };

  _renderLoading = () => (
    <View style={styles.loadingView}>
      <ActivityIndicator />
    </View>
  );

  _renderButton = () => (
    <TouchableOpacity style={styles.buttonStyle} onPress={this.props.handleSubmit}>
      <Text style={styles.buttonText}>{this.props.selectedItem ? 'Atualizar' : 'Registrar'}</Text>
    </TouchableOpacity>
  );

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          style={styles.inputStyle}
          value={this.props.values.name}
          onChangeText={text => this.props.setFieldValue('name', text)}
          placeholder="Insira o nome do produto"
        />
        { this.props.errors.name && <Text style={styles.errorText}>{this.props.errors.name}</Text> }
        <Text style={styles.title}>Quantidade</Text>
        <TextInput
          style={styles.inputStyle}
          value={String(this.props.values.quantity)}
          onChangeText={text => this.props.setFieldValue('quantity', parseInt(text))}
          placeholder="10"
          keyboardType="numeric"
        />
        { this.props.errors.quantity && <Text style={styles.errorText}>{this.props.errors.quantity}</Text> }
        <Text style={styles.title}>Preço</Text>
        <TextInputMask
          style={styles.inputStyle}
          placeholder="R$100,00"
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$',
            suffixUnit: ''
          }}
          value={numberToReal(this.props.values.value)}
          onChangeText={text => this._moneyFielManipulator(text)}
          ref={(ref) => this.moneyField = ref}
        />
        { this.props.errors.value && <Text style={styles.errorText}>{this.props.errors.value}</Text> }
        { this.props.loading ? this._renderLoading() : this._renderButton() }
        { this.props.requestError && <Text style={styles.errorText}>{this.props.requestError}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginStart: 5,
    marginTop: 10,
    color: 'blue',
  },
  loadingView: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1,
    margin: 5,
    marginVertical: 10,
    padding: 10,
  },
  buttonStyle: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 15,
    margin: 5, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    elevation: 3,
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
  }
});

const EnhacedForm = withFormik({
  mapPropsToValues: () => ({ name: '', quantity: '', value: '' }),
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .min(3, 'Minimo 3 caracteres')
      .required('Insira um nome'),
    quantity: yup
      .number()
      .integer()
      .required('Insira uma quantidade'),
    value: yup
      .number()
      .positive('Deve ser um valor maior que zero')
      .required('Insira um valor'),
  }),
  handleSubmit: (payload, { props, setSubmitting, resetForm }) => {

    if (props.selectedItem) {
      props.updateItem(payload);
    } else {
      props.createItem(payload);
      resetForm();
    }
   
    setSubmitting(false);
  }
})(ManagerItems);

const mapDispatchesToProps = {...DISPATCHES};

const mapStateToProps = state => ({...state.ManagerItemsReducer});

export default connect(mapStateToProps, mapDispatchesToProps)(EnhacedForm);