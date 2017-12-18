import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types';

import Card, { CardActions, CardContent } from 'material-ui/Card';

import { FormControl, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import Typography from 'material-ui/Typography';

import ethers from 'ethers';
import ValidTypes from '../config/types';

class Decoder extends Component{
  constructor(props) {
    super(props);

    //Hanle binds
    this.handleChange = this.handleChange.bind(this);
    this.typeUpdated = this.typeUpdated.bind(this);

    this.state = {
      types : '',
      values: '',
      encoded: '',
      error:{},
      submitted:false
      };
  }

  interface = new ethers.Interface([]);

  testRegExp = (search, array)=>{
    let found = 0;
    array.forEach(function(a){
      if(new RegExp(a).test(search) && search.trim().match(new RegExp(a)).index == 0)
      found++;
    })
    return found;
  }

  validateType = (self) =>{
    if(!self && this.state.values.length == 0 && !this.state.submitted)
      return;
    let that = this,clean = true,
    vals = this.state.types.split(','),
    suffixed = ['uint','int','bytes','fixed','ufixed'],
    array = ValidTypes.map(function(t){
      t = suffixed.indexOf(t) > -1? t+'.*':t;
      return t;
    })

    vals.forEach(function(v,id){
      if(!(id == vals.length-1 && v == '' ))
        if(that.testRegExp(v,array) < 1){
          clean = false;
          let error = {};error['types'] = true;
          let state = {error:Object.assign(that.state.error,error)};
          return that.setState(state);
        }
    })
    if(clean){
      let error = {};error['types'] = false;
      let state = {error:Object.assign(this.state.error,error)};
      return this.setState(state);
    }
  }

  validateValue = (self) =>{
    if(!self && this.state.values.length == 0 && !this.state.submitted)
      return;
    let vals = this.state.values.split(','),error = {};
    if(vals.length !== this.state.types.split(',').length )
      error['values'] = true;
    else
      error['values'] = false;

    let state = {error:Object.assign(this.state.error,error)};
    return this.setState(state);
  }

  typesSet = () =>{
    let types = this.state.types;
    types= types.replace(/ /g,"").split(',');
    for (let t=types.length;t>0;t--){
      if(!types[t] )
        types.splice(t,1);
    }
    return this.setState({types:types.join(',')});
  }

  typeUpdated = event => {
    const val = event.target.value;
    this.handleChange('types')(event);
    this.validateType(true);
    return this.validateValue();
  }

  valueUpdated = event => {
    this.typesSet()
    this.validateType();
    const val = event.target.value;
    this.handleChange('values')(event);
    return this.validateValue(true);
  }

  encodeData = ()=>{
    this.setState({ submitted: true });
    this.typesSet();
    this.validateType();
    this.validateValue();

    if(!this.formFilled() || this.errorExists() )
      return;
    try{
      let types = this.state.types.split(',');
      let values = this.state.values.split(',');

      console.log(types,values);

      if(types.length !== values.length)
        return console.error('Types/values mismatch');
      let encoded = ethers.Interface.encodeParams(types, values)
      this.setState({ encoded: encoded.substring(2) });
    }
    catch(e){
      console.error(e);
    }
  }

  formFilled = () =>{
    return this.state.types && this.state.values;
  }

  errorExists = () =>{
    for(let i in this.state.errors){
      if(this.state.errorsp[i])
        return true;
    }
    return false;
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value,submitted: false });
  };

  render(){
    const { classes } = this.props

    return(
      <div>
        
      </div>
    )
  }
}

Decoder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Decoder;
