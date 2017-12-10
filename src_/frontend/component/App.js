import  React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Web3 from 'web3';
import { abi, address} from '../config/contract';
import endpoint,{} from '../config/network';

import AlertContainer from 'react-alert'

import SuccessButton from './SuccessButton.js';    // A button with complex overrides
import Body, {Maincard, Textfield, TopBar, Insidebox} from '../css';
import { FontIcon } from 'react-toolbox/lib/font_icon'; // Bundled component import
import { Avatar } from 'react-toolbox/lib/avatar';
import { Button, IconButton } from 'react-toolbox/lib/button'; // Bundled component import
import { Input } from 'react-toolbox/lib/input';
//import { Link } from 'react-toolbox/lib/link';
import Card, { CardActions, CardMedia, CardText, CardTitle } from 'react-toolbox/lib/card';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Layout, Panel } from 'react-toolbox/lib/layout';

const AppBars = (config)=>(
    <AppBar theme={TopBar} title={config.title} >
      {config.lefticon}
      [{config.user}]
      <Avatar image='http://www.superdao.io/assets/images/SuperdaoLogo.png' alt='logo' />
      {config.children}
    </AppBar>
);

const HomeIcon =  (
    <IconButton icon='home' style={{ color: 'white',order:-1 }}
    href='#/'
    />
);

const Welcomemsg =  (<p>Welcome to Online Ethereum encoder page.<br></br> 
                     </p> );

class App extends React.Component {
  constructor(props) {
    super(props);

    //Hanle binds
    this.web3State = this.web3State.bind(this);

    this.state = {
      username: '',
      email: '',
      github: '',
      bitcointalk: '',
      web3: web3,
      userAddress: user,
      abi: '',
      address: '',
      //contract: contract
    }
  }

  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  }

  componentDidMount() {
    //this.web3State();
  }

  handleChange (value, ev) {
    this.setState({[ev.target.name]: value });
  };

  web3State (a,b,c,d){
    
      //web3 = window.web3 || global.web3;
      //web3 = web3? new Web3(Web3.givenProvider || web3.currentProvider) : null;
      //web3 = enpoint ? new Web3(new Web3.providers.HttpProvider(endpoint)) : web3;
      //var user = web3.eth.accounts? web3.eth.accounts[0]:null;
      //var contract = abi && typeof abi == 'object' && abi.length>1 && address?web3.eth.contract(abi).at(address):null;

  /*  if(typeof this.state.web3 == 'undefined' || !web3)
      this.showAlert({type:'error',msg:'Web3 is Undefined, Can not proceed.'});
    if(!this.isAddressReady())
      this.showAlert({type:'warning',msg:'Ethereum address Unavailable'});
    if(!this.isContractReady())
      this.showAlert({type:'error',msg:'Invalid Contract'});
      */
  }

  showAlert = (config) => {
    this.msg.show(config.msg, {
      time: 3000,
      type: config.type,
      position: config.position || 'top right'
    })
  }

  isRegistered (v,e) {
    if(typeof this.state.web3 === 'undefined' || !this.state.web3 || !this.state.contract)
      return false;
    return this.state.contract.isRegistered(this.userAddress);
  }

  isContractReady (){
    return true//TODO remove once connected to the contract
    return this.state.contract && this.state.contract.address;
  }

  isAddressReady(){
    //return true//TODO remove once connected to the contract
    return this.state.userAddress && this.state.web3.isAddress(this.state.userAddress);
  }

  submitDetails (value, ev) {
    console.log(this.state.web3, window.web3, global.web3);
    console.log('User', this.state);
  }

  render(){
    //const regEnabled = this.state.username.length>0 && this.state.email.length>0 && new RegExp('.+@.+').test(this.state.email);
    const regEnabled = true;
    return (
      <div>
        <Panel className={Body.app}>
          <AppBars {...{user:this.state.userAddress,title:'SuperDao Backers', lefticon:HomeIcon }}/>
          <Switch>
           <Route exact path='/'>
              <Card  theme={Maincard} >
                <CardActions style={{ justifyContent: 'flex-end' }}>
                  <Button icon='chevron_right' label='Continue' disabled={!this.isAddressReady() || !this.isContractReady()} href='#/admin' />
                  {!this.isRegistered() &&
                  <Button icon='assignment' label='Register' href='#/register' />
                  }
                </CardActions>
              </Card>
                  
              <Card  theme={Maincard} >
                <CardTitle>
                  <p> How To</p>
                </CardTitle>
                <CardText>{Welcomemsg}</CardText>
              </Card>
           </Route>
           <Route path='/register'>
              <Card  theme={Maincard} >
                <p style={{alignSelf:'center',textAlign:'center'}} >Registering provides us a way to communicate to you latest updates and receive your votes. Your Ethereum address will be used to confirm your registration</p>
                <SuccessButton type='submit' disabled={!this.isAddressReady() || !this.isContractReady() || !regEnabled} label='Register' style={{width:100,alignSelf:'center'}} primary raised onClick={this.submitDetails} />
              </Card>
           </Route>
          </Switch>
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        </Panel>
      </div>
    );
  }
}

export default App;
