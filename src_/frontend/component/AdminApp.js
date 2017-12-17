import  React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import { abi, address} from '../config/contract';

import SuccessButton from './SuccessButton.js';    // A button with complex overrides
import Body, {Maincard, Textfield, TopBar, Insidebox} from '../css';
import { FontIcon } from 'react-toolbox/lib/font_icon'; // Bundled component import
import { Avatar } from 'react-toolbox/lib/avatar';
import { Button, IconButton } from 'react-toolbox/lib/button'; // Bundled component import
import { Input } from 'react-toolbox/lib/input';
import { Dropdown } from 'react-toolbox/lib/dropdown';
import Card, { CardActions, CardMedia, CardText, CardTitle } from 'react-toolbox/lib/card';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Layout, Panel } from 'react-toolbox/lib/layout';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';

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
    href='#/admin'
    />
);

const functionList = [
    {label:'Add User',value:'add_user'},
    {label:'Remove User',value:'rem_user'},
]


class App extends React.Component {
    constructor(props) {
      super(props);

      web3 = window.web3 || global.web3;
      var user = web3.eth.accounts? web3.eth.accounts[0]:null;
      var contract = abi && typeof abi == 'object' && abi.length>1 && address?web3.eth.contract(abi).at(address):null;

      this.state = {
        username: '',
        email: '',
        github: '',
        bitcointalk: '',
        web3: web3,
        userAddress: user,
        abi: '',
        address: '',
        contract: contract,
        action:''
      };
    }

    handleChange (value, ev) {
      console.log(value,ev)
      this.setState({[ev.target.name]: value });
    }

    handleDropdownChange = (dropdown, value) => {
    const newState = {};
    newState[dropdown] = value;
    console.log('selected', value);
    this.setState(newState);
  };

    web3State (a,b,c,d){
      if(typeof this.state.web3 == 'undefined' || !web3)
        this.showAlert({type:'error',msg:'Web3 is Undefined, Can not proceed.'});
      if(!this.isAddressReady())
        this.showAlert({type:'warning',msg:'Ethereum address Unavailable'});
      if(!this.isContractReady())
        this.showAlert({type:'error',msg:'Invalid Contract'});
    }

    showAlert = (config) => {
      this.msg.show(config.msg, {
        time: 3000,
        type: config.type,
        position: config.position || 'top right'
        //icon: <img src="path/to/some/img/32x32.png" />
      })
    }

    isRegistered (v,e) {
      return true//TODO remove once connected to the contract
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

    isFormReady(){
      switch (this.state.action){
        case 'add_user':
          return true;
          break;
        default:
          return false;
          break;
      }
    }

    customDropdownItem(data) {
      return (
        <div>
            <strong>{data.label}</strong>
            [<small>{data.value}</small>]
        </div>
      );
    }

    render(){
      return (
        <div>
          <Panel className={Body.app}>
            {!this.isRegistered() &&
            <Redirect to='/' />
            }
            <AppBars {...{user:this.state.userAddress,title:'SuperDao Backers', lefticon:HomeIcon }}/>
              <Switch>
                <Route exact path='/admin/'>
                  <div>
                    <Card theme={Maincard} className={Maincard.noheightcard}>
                      <CardTitle
                        title='Choose action'
                      />
                      <CardText>
                        <Dropdown
                          label="Action"
                          onChange={this.handleDropdownChange.bind(this, 'action')}
                          source={functionList}
                          template={this.customDropdownItem}
                          value={this.state.action}
                        />
                      </CardText>



                      { this.state.action == 'add_user' &&
                      <CardText>
                      <Input
                        type='text'
                        name='bitcointalk'
                        icon='forum'
                        hint='Bitcoin.org Username'
                        value={this.state.bitcointalk}
                        label='Bitcointalk' onChange={this.handleChange}
                      />
                      </CardText>
                      }

                      <CardActions style={{ justifyContent: 'flex-end' }}>
                        <Button icon='chevron_right' label='Submit' raised disabled={!this.isAddressReady() || !this.isContractReady() ||!this.isFormReady()} href='#/admin' />
                      </CardActions>

                    </Card>

                    <Card theme={Maincard}>
                      <CardTitle
                        subtitle='Logs && Data'
                      />
                      <hr/>
                    </Card>
                  </div>
                </Route>
              </Switch>
              <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          </Panel>
        </div>
      );
    }

}

export default App;
