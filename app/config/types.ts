const notSuffixed = ["address", "string", "bool"];

export const numberSuffixed = ["uint", "int"]

export const suffixed = [...numberSuffixed, "bytes"];

export const suffixeRegex = "([0-9]*)(\[[0-9]*\])?$"

export const suffixCount = {
    min: 1,
    max: 256
}

export const numberSuffixedDivisor = 8

export default [...suffixed, ...notSuffixed];

