import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";


import ValidTypes from "../config/types";
import { suffixed } from "../config/types";
const Log = window.console.log;

class Encoder extends Component{
  constructor(props) {
    super(props);

    //Handle binds
    this.encodeData = this.encodeData.bind(this);

    this.typeUpdated = this.typeUpdated.bind(this);
    this.valueUpdated = this.valueUpdated.bind(this);

    this.state = {
      types : "",
      values: "",
      encoded: "",
      error:{},
      submitted:false
      };

    const { eth } = this.props;
    this.web3AbiCoder = eth.abi;
  }

  parseForEncode (values) {
    const matched = this.matchRegExpValues(values);
    
    return matched ?
      matched.map((val) => {
        let overlook = false;
        let snoop = false;

        if (!val || val === ",") {
          return "";
        }
        if (val[val.length-1] === ",") {
          val = val.substring(0, val.length-1);
        }
        if (val &&  this.testArrayRegExpValues(val)) {
          val = this.stripArray(val);
          snoop = true;
        }
        if (this.testStringRegExpValues(val)) {
          val = val.substring(1, val.length-1);
          overlook = true;
        }
        if (snoop || (!overlook && this.testRegExpValues(val))) {
          val = this.parseForEncode(val);
        }
        return val;
      }) : [];
  }

  validateType (self) {
    if(!self && this.state.values.length === 0 && !this.state.submitted)
      return;
    let that = this,clean = true,
    vals = this.state.types.split(","),
    array = ValidTypes.map(function(t){
      t = suffixed.indexOf(t) > -1? t+".*":t;
      return t;
    });

    vals.forEach(function(v,id){
      if(id === vals.length-1 && v === "") {
        return;
      } else {
        if(that.testRegExp(v,array) < 1){
          clean = false;
          let error = {};error["types"] = true;
          let state = {error:Object.assign(that.state.error,error)};
          return that.setState(state);
        }
      }
    });
    if(clean){
      let error = {};error["types"] = false;
      let state = {error:Object.assign(this.state.error,error)};
      return this.setState(state);
    }
  }

  validateValue (self) {
    if(!self && this.state.values.length === 0 && !this.state.submitted)
      return;

    const types = this.state.types.split(",");
    const arrayregex = new RegExp(/(\[.*\])/);
    let error = {};

    const matchedValues = this.parseForEncode(this.state.values) || [];
    const unsetArray = matchedValues.length && matchedValues.some((val, index) =>
      (arrayregex.test(types[index]) && (typeof val !== "object" || typeof val.length === "undefined")) ||
      (!arrayregex.test(types[index]) && (typeof val === "object"))
    );

    if(types.length !== matchedValues.length || unsetArray)
      error["values"] = true;
    else
      error["values"] = false;

    let state = {error:Object.assign(this.state.error,error)};
    return this.setState(state);
  }

  stripArray(value) {
    const regEx = new RegExp(/^\[|\]$/gi);
    return value.replace(regEx,"");
  }

  matchRegExpValues (values) {
    const regEx = new RegExp(/(\[[0-9a-z\s:!@#'",$%^&?*)(\\+=._-]+,?\],?|("[0-9a-z\s:!@#'$%^&?*)(\\+=.,_-]+",?|"",?)|([0-9a-z\s:!@#'$%^&?*)(\\/+=._-]+,?|,))/gi);
    const matched = values.match(regEx);

    if (values[values.length-1] === ",") {
      matched.push("");
    }
    return matched;
  }

  testRegExp (search, array) {
    let found = 0;
    array.forEach(function(a){
      if(new RegExp(a).test(search) && search.trim().match(new RegExp(a)).index === 0)
      found++;
    });
    return found;
  }

  testRegExpValues (values) {
    const regEx = new RegExp(/(,+)/gi);
    return regEx.test(values);
  }

  testArrayRegExpValues (values) {
    const regEx = new RegExp(/\[.*\]/gi);
    return regEx.test(values);
  }

  testStringRegExpValues (values) {
    const regEx = new RegExp(/^".*"$/gi);
    return regEx.test(values);
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

  typeUpdated (event)  {
    this.handleChange("types", event);
    this.validateType(true);
    return this.validateValue();
  }

  valueUpdated (event)  {
    this.typesSet();
    this.validateType();
    this.handleChange("values", event);
    return this.validateValue(true);
  }

  async encodeData (){
    this.setState({ submitted: true });
    await this.typesSet();
    this.validateType();
    this.validateValue();

    if(!this.formFilled() || this.errorExists() )
      return;
    try{
      let types = this.state.types.split(",");
      let values = this.parseForEncode(this.state.values);

      Log(types,values);

      if(types.length !== values.length)
        throw new Error("Types/values mismatch");

      let encoded = this.web3AbiCoder.encodeParameters(types, values);
      Log(encoded);

      this.setState({ encoded: encoded.substring(2) });
    }
    catch(e){
      throw new Error(e);
    }
  }

  formFilled () {
    return this.state.types && this.state.values;
  }

  errorExists () {
    for(let i in this.state.error){
      if(this.state.error[i])
        return true;
    }
    return false;
  }

  handleChange (name,  event)  {
    this.setState({ [name]: event.target.value,submitted: false });
  }

  selectTarget (clickEvent) {
    clickEvent.target.select();
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
                  label="Argument values"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.values}
                  error={this.state.error.values}
                  onChange={this.valueUpdated}
                  onKeyUp={this.valueUpdated}
                  helperText={`Add the values to match the number of types indicated above, each seperated by a comma (No spaces), use [ ] to wrap array, use " " to wrap values containing comma${""}`}
                  fullWidth
                  margin="normal"
                />
              <div className={classes.topPadding}>
                <Button variant="contained" color="primary" className={classes.button+" "+classes.right} onClick={this.encodeData}>
                  Encode
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
                  label="Encoded"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.encoded}
                  helperText="Abi encoded arguments"
                  fullWidth
                  margin="normal"
                  variant="filled"
                  readOnly={true}
                  onClick={this.selectTarget}
                  onFocus={this.selectTarget}
                />
            </FormControl>
        </Card>}
      </div>
    );
  }
}

Encoder.propTypes = {
  classes: PropTypes.object.isRequired,
  eth: PropTypes.object
};

export default Encoder;
