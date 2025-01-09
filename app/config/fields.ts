import types from "./types";

export const FIELDS = {
    types: "types",
    encoded: "encoded",
    decoded: "decoded",
    button: "button",
};

export const Labels = {
    [FIELDS.types]: "Argument Types",
    [FIELDS.encoded]: "Encoded data",
    [FIELDS.decoded]: "Argument Values",
};

export const Descriptions = {
    [FIELDS.types]: `Add the value types, each seperated by a comma: ${types.slice(0, 2).join(",")}...`,
    [FIELDS.encoded]: "Add the encoded data for decoding",
    [FIELDS.decoded]: `Add the values to match the number of types indicated above, each seperated by a comma (No spaces), use [ ] to wrap array, use " " to wrap values containing comma`,
}

export const Results = {
    [FIELDS.encoded]: "Encoded data",
    [FIELDS.decoded]: "Decoded Values",
};