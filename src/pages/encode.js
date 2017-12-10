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

class Encoder extends Component{
  constructor(props) {
    super(props);

    //Hanle binds
    this.handleChange = this.handleChange.bind(this);
    this.typeUpdated = this.typeUpdated.bind(this);

    this.state = {
      types : '',
      };
  }

  interface = new ethers.Interface([]);

  typeUpdated = name => event => {
    console.log(event.target,Object.keys(event.target), name)
    const val = event.target.value;
    this.handleChange(this,event);


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
    console.log(name,event)
    this.setState({ [name]: event.target.value });
  };

  render(){
    const { classes } = this.props
    console.log(this)

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
