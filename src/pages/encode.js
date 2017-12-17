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

class Encoder extends Component{
  constructor(props) {
    super(props);

    //Hanle binds
    this.handleChange = this.handleChange.bind(this);
    this.typeUpdated = this.typeUpdated.bind(this);

    this.state = {
      types : '',
      values: '',
      encoded: '',
      error:{}
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
      that.setState(state);
    }
    return this.encodeData();
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
    this.setState(state);
    return this.encodeData();
  }

  encodeData = ()=>{
    if(!this.formFilled() || this.errorExists() )
      return;
    try{
      var types = this.state.types.split(',');
      var values = this.state.values.split(',');
      if(types.length !== values.length)
        return console.error('Types/values mismatch');
      var encoded = ethers.Interface.encodeParams(types, values)
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
    this.setState({ [name]: event.target.value });
  };

  render(){
    const { classes } = this.props

    return(
      <div>
        <Card raised={true} className={classes.topMargin+' '+classes.leftPadding+' '+classes.width95} >

            <div className={classes.topPadding+' '+classes.bottomMargin} >
              <FormControl className = {classes.formControl+' '+classes.actionFormControl} >
                <TextField
                  id="full-width"
                  label="Argument Types"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.types}
                  error={this.state.error.types}
                  onChange={this.typeUpdated}
                  helperText="Add the value types, each seperated by a comma"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="full-width"
                  label="Argument values"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.values}
                  error={this.state.error.values}
                  onChange={this.valueUpdated}
                  helperText="Add the values to match the number of types indicated above, each seperated by a comma"
                  fullWidth
                  margin="normal"
                />
              </FormControl>
            </div>
        </Card>
        {this.formFilled() && !this.errorExists() &&
            <Card raised={true} className={classes.topMargin+' '+classes.leftPadding+' '+classes.width95} >
              <TextField
                id="full-width"
                multiline
                label="Encoded"
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.encoded}
                disabled
                helperText="Abi encoded arguments"
                fullWidth
                margin="normal"
              />
        </Card>}
      </div>
    )
  }
}

Encoder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Encoder;
