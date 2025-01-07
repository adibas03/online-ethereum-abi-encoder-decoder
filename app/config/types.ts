const suffixed = ["uint", "int", "bytes", "fixed", "ufixed"];
const notSuffixed = ["address", "string", "bool"];

export default [...suffixed, ...notSuffixed];

export { suffixed };
