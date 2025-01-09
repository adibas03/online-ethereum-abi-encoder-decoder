const suffixed = ["uint", "int", "bytes", "fixed", "ufixed"];
const notSuffixed = ["address", "string", "bool"];

export const suffixeRegex = "([0-9]*)(\[[0-9]*\])?$"

export const suffixCount = {
    min: 1,
    max: 256
}

export default [...suffixed, ...notSuffixed];

export { suffixed };
