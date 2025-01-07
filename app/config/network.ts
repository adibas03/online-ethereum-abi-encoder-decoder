//const endpoint = "http://localhost:8545"; //Http endpoint optional to metamask
// const endpoint = "http://localhost:8545";
const endpoint = "https://rpc.sepolia.dev";

const fallbackEndpoints = ["https://rpc.sepolia.online", "https://www.sepoliarpc.space", "https://rpc.sepolia.org", "http://localhost:8545"]
const wsEndpoint = "wss://mainnet.infura.io/ws"


export default endpoint;
export {
    fallbackEndpoints, wsEndpoint
}
