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
    //this.handleChange = this.handleChange.bind(this);
    //this.typeUpdated = this.typeUpdated.bind(this);

    this.state = {
      types : '',
      values: '',
      decoded: '',
      error:{},
      submitted:false
      };
  }

  interface = new ethers.Interface([]);

  testRegExp = (search, array)=>{
    var found = 0;
    array.forEach(function(a){
      if(new RegExp(a).test(search))
      found++;
    })
    return found;
  }

  typesSet = () =>{
    let types = this.state.types;
    types= types.split(',');
    for (var t=types.length;t>0;t--){
      if(!types[t])
        types.splice(t,1);
    }
    return this.setState({types:types.join(',')});
  }

  typeUpdated = event => {
    const val = event.target.value;
    this.handleChange('types')(event);
    var array = ValidTypes.map(function(t){
      return t+'*';
    })
    var that = this,clean = true;
    var vals = val.split(',');
    vals.forEach(function(v,id){
      if(!(id == vals.length-1 && v == '' ))
        if(that.testRegExp(v,array) < 1){
          clean = false;
          var error = {};error['types'] = true;
          var state = {error:Object.assign(that.state.error,error)};
          return that.setState(state);
        }
    })
    if(clean){
      var error = {};error['types'] = false;
      var state = {error:Object.assign(that.state.error,error)};
      return that.setState(state);
    }
  }

  valueUpdated = event => {
    this.typesSet()
    const val = event.target.value;
    this.handleChange('values')(event);

    var vals = val.split(','),error = {};
    if(vals.length !== this.state.types.split(',').length )
      error['values'] = true;
    else
      error['values'] = false;

    var state = {error:Object.assign(this.state.error,error)};
    return this.setState(state);
  }

  encodeData = ()=>{
    if(!this.formFilled() || this.errorExists() )
      return;
      this.setState({ submitted: true });
    try{
      var types = this.state.types.split(',');
      var values = this.state.values.split(',');
      if(types.length !== values.length)
        return console.error('Types/values mismatch');
      var decoded = ethers.Interface.encodeParams(types, values)
      this.setState({ decoded: decoded.substring(2) });
    }
    catch(e){
      console.error(e);
    }
  }

  formFilled = () =>{
    return this.state.types && this.state.values;
  }

  errorExists = () =>{
    for(var i in this.state.errors){
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
