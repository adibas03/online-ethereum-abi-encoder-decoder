import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import ethers from "ethers";
import ValidTypes from "../config/types";
import { suffixed } from "../config/types";
const Log = window.console.log;

class Decoder extends Component{
  constructor(props) {
    super(props);

    //Hanle binds
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.decodeData = this.decodeData.bind(this);

    this.testRegExp = this.testRegExp.bind(this);
    this.validateType = this.validateType.bind(this);
    this.typesSet = this.typesSet.bind(this);
    this.typeUpdated = this.typeUpdated.bind(this);
    this.valueUpdated = this.valueUpdated.bind(this);
    this.formFilled = this.formFilled.bind(this);
    this.errorExists = this.errorExists.bind(this);

    this.state = {
      types : "",
      value: "",
      decoded: "",
      error:{},
      submitted:false
      };

    this.abiCoder = new ethers.utils.AbiCoder();
  }

  testRegExp (search, array) {
    let found = 0;
    array.forEach(function(a){
      if(new RegExp(a).test(search) && search.trim().match(new RegExp(a)).index === 0)
      found++;
    });
    return found;
  }

  validateType (self) {
    if(!self && this.state.value.length === 0 && !this.state.submitted)
      return;
    let that = this,clean = true,
    vals = this.state.types.split(","),
    array = ValidTypes.map(function(t){
      t = suffixed.indexOf(t) > -1? t+".*":t;
      return t;
    });

    vals.forEach(function(v,id){
      if(!(id === vals.length-1 && v === "" ))
        if(that.testRegExp(v,array) < 1){
          clean = false;
          let error = {};error["types"] = true;
          let state = {error:Object.assign(that.state.error,error)};
          return that.setState(state);
        }
    });

    if(clean){
      let error = {};error["types"] = false;
      let state = {error:Object.assign(this.state.error,error)};
      return this.setState(state);
    }
  }

  typesSet () {
    let types = this.state.types;
    if(!types || types.length<1)
      return;

    types= types.replace(/ /g,"").split(",");
    for (let t=types.length;t>0;t--){
      if(!types[t] )
        types.splice(t,1);
    }
    this.setState({types:types.join(",")});
    return true;
  }

  typeUpdated (event) {
    this.handleChange("types", event);
    return this.validateType(true);
  }

  valueUpdated (event) {
    this.typesSet();
    this.validateType();
    return this.handleChange("value", event);
  }

  async decodeData (){
    this.setState({ submitted: true });
    await this.typesSet();
    this.validateType();

    if(!this.formFilled() || this.errorExists() )
      return;
    try{
      let types = this.state.types.split(",");
      let value = this.state.value;

      if(value.indexOf("0x") !== 0)
        value = "0x"+value;

      Log(types,value);

      let decoded = this.abiCoder.decode(types, value);
      decoded = decoded.map(function(d){
          return d.toString();
      });
      Log(decoded);
      this.setState({ decoded: decoded.join(",") });
    }
    catch(e){
      throw new Error(e);
    }
  }

  formFilled () {
    return this.state.types && this.state.value;
  }

  errorExists () {
    for(let i in this.state.error){
      if(this.state.error[i])
        return true;
    }
    return false;
  }

  handleRequestClose () {
    this.setState({
      open: false,
    });
  }

  handleClick () {
    this.setState({
      open: true,
    });
  }

  handleChange (name, event) {
    this.setState({ [name]: event.target.value,submitted: false });
  }

  render(){
    const { classes } = this.props;

    return(
      <div>
        <Card raised={true} className={classes.topMargin+" "+classes.leftPadding+" "+classes.width95} >

            <div className={classes.topPadding+" "+classes.bottomMargin} >
              <FormControl className = {classes.formControl+" "+classes.actionFormControl} >
                <TextField
                  id="full-width"
                  label="Argument Types"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.types}
                  error={this.state.error.types}
                  onChange={this.typeUpdated}
                  onKeyUp={this.typeUpdated}
                  helperText="Add the value types, each seperated by a comma"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="full-width"
                  label="Encoded data"
                  multiline
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.value}
                  error={this.state.error.value}
                  onChange={this.valueUpdated}
                  onKeyUp={this.valueUpdated}
                  helperText="Add the encoded data to be decoded"
                  fullWidth
                  margin="normal"
                />
              <div className={classes.topPadding}>
                <Button variant="contained" color="primary" className={classes.button+" "+classes.right} onClick={this.decodeData}>
                  Decode
                </Button>
              </div>
              </FormControl>
            </div>
        </Card>
        {this.formFilled() && !this.errorExists() && this.state.submitted &&
            <Card raised={true} className={classes.topMargin+" "+classes.leftPadding+" "+classes.width95} >
              <FormControl className = {classes.formControl+" "+classes.actionFormControl} >
                <TextField
                  id="full-width"
                  multiline
                  label="Decoded"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.decoded}
                  disabled
                  helperText="Decodecoded Abi arguments"
                  fullWidth
                  margin="normal"
                />
            </FormControl>
        </Card>}
      </div>
    );
  }
}

Decoder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Decoder;
