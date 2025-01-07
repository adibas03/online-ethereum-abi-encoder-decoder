const suffixed = ["uint", "int", "bytes", "fixed", "ufixed"];
const notSuffixed = ["address", "string", "bool", "function"];

export default [...suffixed, ...notSuffixed];

export { suffixed };
