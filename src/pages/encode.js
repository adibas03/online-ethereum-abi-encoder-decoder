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

  typeUpdated = name => event => {
    const val = event.target.value;
    this.handleChange(name)(event);
    var array = ValidTypes.map(function(t){
      return t+'*';
    })
    var that = this,clean = true;
    val.split(',').forEach(function(v){
        if(that.testRegExp(v,array) < 1){
          clean = false;
          var error = {};error[name] = true;
          var state = {error:Object.assign(that.state.error,error)};
          return that.setState(state);
        }
    })
    if(clean){
      var error = {};error[name] = false;
      var state = {error:Object.assign(that.state.error,error)};
      return that.setState(state);
    }
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
                onChange={this.typeUpdated('types')}
                helperText="Add the value types, each seperated by a comma"
                fullWidth
                margin="normal"
              />
            </FormControl>
          </div>
      </Card>
    )
  }
}

Encoder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Encoder;
