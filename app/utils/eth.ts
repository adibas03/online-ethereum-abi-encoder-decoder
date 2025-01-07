import Eth from "web3-eth";
import endpoint, { fallbackEndpoints, wsEndpoint } from "app/config/network"

let instance: any;

export function loadEth() {
    try {
        // if (window.ethereum) {
        //   this.eth = new Eth(window.ethereum);
        // } else {
        //   this.eth = new Eth(Eth.givenProvider || "http://localhost:8545");
        // }
        console.log(Eth)
    } catch (e) {
        // this.eth = new Eth("wss://mainnet.infura.io/ws");
    }
}


export function getEth() {
    if (!instance) {
        loadEth()
    }

    return instance
}