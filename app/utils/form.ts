import validTypes, { suffixed } from "app/config/types"
import { testRegExp } from "app/utils/string";

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