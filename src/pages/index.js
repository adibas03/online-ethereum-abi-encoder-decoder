import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import PropTypes from "prop-types";

import Eth from "web3-eth";

import { title } from "../config/app";

import Encoder from "./encode";
import Decoder from "./decode";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Card from "@material-ui/core/Card";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import withRoot from "../components/withRoot";
import allowedActions from "../config/actions";

import styles from "../styles/pages";

const TopAppBar = () => (
  <AppBar position="static" >
    <Toolbar>
      <Typography type="title" color="inherit">
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
  /*<AppBar
    title= "this Title"
  />*/
);

const introMsg = (
  <div>
    <Typography type="title" gutterBottom>
          Welcome to the Online Ethereum Abi encoder and decoder
    </Typography>
    <hr/>
    <Typography type="body2" gutterBottom>
          The tool was designed to make easy encoding and decoding of
          Ethereum solidity abi data.<br/>
          Github:
          <a href="https://github.com/adibas03/online-ethereum-abi-encoder-decoder" >
          https://github.com/adibas03/online-ethereum-abi-encoder-decoder
        </a><br/><br/>
      Buy me a Coffe or a Beer  <br/>
          Ethereum: <b>0x965D1C9987BD2c34e151E63d60AFf8E9dB6b1561</b>
    </Typography>
  </div>

);

const ActionChooser = (data) =>{
  var found =  withRouter(({history})=>{
    var action = data.state.action === ""?"/":"/"+data.state.action;
    if(typeof action === "undefined" || history.location.pathname === action)
      return "";
    else{
      return <Redirect to={{ pathname:action }} />;
    }
  })(<div></div>);
  return found;
};

class Index extends Component {
  constructor(props) {
    super(props);

    try {
      this.eth = new Eth(Eth.givenProvider || "http://localhost:8545");
    } catch (e) {
      this.eth = new Eth("wss://mainnet.infura.io/ws");
    }

    //Hanle binds
    this.handleActionChange = this.handleActionChange.bind(this);
    this.handleChange = this.handleChange.bind(this);

    const history = createBrowserHistory();
    const hash = history.location.hash;
    const action = hash && hash.substring(hash.indexOf("/")+1, hash.length);

    if (hash !== "#/" && allowedActions.includes(action)) {
      this.state = {
          action
        };
    } else {
      this.state = {
          action: ""
        };
    }
  }

  handleActionChange (event) {
    this.handleChange("action", event);
  }

  handleChange (name, event) {
    this.setState({ [name]: event.target.value });
  }

  render() {
    const { classes } = this.props;
    const props = { eth: this.eth };

    return (
      <div>
        <TopAppBar />
          <div className={classes.root}>
            <Card raised={true} className={classes.topMargin+" "+classes.bottomMargin+" "+classes.leftPadding+" "+classes.width95} >
              <div className={classes.topPadding}>{introMsg}</div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="action-simple">Action</InputLabel>
                <Select
                value={this.state.action}
                onChange={this.handleActionChange}>
                  <MenuItem value="" key="">
                    <em>-- choose --</em>
                  </MenuItem>
                  <MenuItem value={allowedActions[0]} >
                  {allowedActions[0]}
                  </MenuItem>
                  <MenuItem value={allowedActions[1]} >
                  {allowedActions[1]}
                  </MenuItem>
                </Select>
                <ActionChooser {...{state: this.state}} />
              </FormControl>
            </Card>

            <Switch>
              <Route path="/" strict exact>
              </Route>
              <Route path={`/${allowedActions[0]}`}>
                  <Encoder {...Object.assign({}, props, this.props)}/>
              </Route>
              <Route path={`/${allowedActions[1]}`}>
                  <Decoder {...Object.assign({}, props, this.props)}/>
              </Route>
            </Switch>
          </div>
        </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  eth: PropTypes.any
};

export default withRoot(withStyles( styles )(Index));
