/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom'

import PropTypes from 'prop-types';

import { title,description,author } from '../config/app'

import Encoder from './encode'
import Decoder from './decode'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import Card, { CardActions, CardContent } from 'material-ui/Card';

import { FormControl, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from 'material-ui/Dialog';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import withRoot from '../components/withRoot';

import styles from '../styles/pages';

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
          <a href="https://github.com/adibas03/online-ethereum-abi-encoder" >
          https://github.com/adibas03/online-ethereum-abi-encoder
          </a>
    </Typography>
  </div>

);

const allowedActions = [
  'encode',
  'decode'
]

const BuildMenu = (list)=>{
  var menu = list.menus.map(function(item,index) {
    return (
      <MenuItem value={item} key={item}>
      {item}
      </MenuItem>
    );
  });
  menu.unshift(
    <MenuItem value='' key=''>
      <em>None</em>
    </MenuItem>
  );
return menu;
}

const ActionChooser = (data) =>{
  var found =  withRouter(({history})=>{
    var action = data.state.action == ''?'/':'/'+data.state.action;
    if(typeof action === 'undefined' || history.location.pathname == action)
      return '';
    else{
      return <Redirect to={ {pathname:action}} />
    }
  })(<div></div>)
  return found;
}

class Index extends Component {
  constructor(props) {
    super(props);

    //Hanle binds
    this.handleChange = this.handleChange.bind(this);

    this.state = {
        action:'',
        open: false,
      };
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

  render() {
    const { classes } = this.props

    return (
      <div>
        <TopAppBar />
          <div className={classes.root}>
            <Card raised={true} className={classes.topMargin+' '+classes.bottomMargin+' '+classes.leftPadding+' '+classes.width95} >
              <div className={classes.topPadding}>{introMsg}</div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="action-simple">Action</InputLabel>
                <Select
                value={this.state.action}
                onChange={this.handleChange('action')}>
                  <MenuItem value='' key=''>
                    <em>-- choose --</em>
                  </MenuItem>
                  <MenuItem value={allowedActions[0]} >
                  {allowedActions[0]}
                  </MenuItem>
                  <MenuItem value={allowedActions[1]} >
                  {allowedActions[1]}
                  </MenuItem>
                </Select>
                <ActionChooser {...{state:this.state}} />
              </FormControl>
            </Card>

            <Switch>
              <Route path="/" strict exact>
              </Route>
              <Route path="/encode">
                  <Encoder {...this.props}/>
              </Route>
              <Route path="/decode">
                  <Decoder{...this.props}/>
              </Route>
            </Switch>
          </div>
        </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles( styles )(Index));
