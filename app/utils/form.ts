import validTypes, { suffixed } from "app/config/types"
import { testRegExp } from "app/utils/string";
import { parseForEncode, parseTypes } from "app/utils/eth"

export function validateType(types: string) {
    if (!types || types.length < 1) {
        return
    }

    let clean = true
    let vals = types.split(",")
    let array = validTypes.map(function (t) {
        t = suffixed.indexOf(t) > -1 ? t + ".*" : t;
        return t;
    });

    vals.forEach(function (v, id) {
        if (id === vals.length - 1 && v === "") {
            return;
        } else {
            if (testRegExp(v, array) < 1) {
                clean = false;
            }
        }
    });

    return clean
}

export function validateValueForEncode(values: string, types: string) {
    if (values.length === 0) {
        return;
    }

    const typesList = parseTypes(types);
    const arrayregex = new RegExp(/(\[.*\])/);

    const matchedValues = parseForEncode(values) || [];

    if (typesList.length !== matchedValues.length) {
        return
    }

    const unsetArray = matchedValues.length && matchedValues.some((val: any, index: number) =>
        (arrayregex.test(typesList[index]) && (typeof val !== "object" || typeof val.length === "undefined")) ||
        (!arrayregex.test(typesList[index]) && (typeof val === "object"))
    );

    return !unsetArray
}