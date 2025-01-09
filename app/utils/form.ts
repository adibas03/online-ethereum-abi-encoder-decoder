import type { HTMLFormMethod } from "react-router";
import validTypes, { suffixed } from "app/config/types"
import { testRegExp } from "app/utils/string";
import { parseForEncode, parseTypes } from "app/utils/eth"
import { suffixeRegex, suffixCount } from "app/config/types"

interface MethodObject {
    [index: string]: HTMLFormMethod
}

export const Methods: MethodObject = {
    POST: "POST",
    PUT: "PUT"
}

export const isvalidationSubmission = (method: string) => method === Methods.PUT;

export const revalidateForm = (e: any, fetcher: any) =>
    fetcher.submit(e.currentTarget.form, { method: Methods.PUT });


export function validateType(types: string) {
    if (!types || types.length < 1) {
        return
    }

    let clean = true
    let vals = parseTypes(types)
    let array = validTypes.map(function (t) {
        t = suffixed.indexOf(t) > -1 ? `^${t}${suffixeRegex}` : t;
        return t;
    });


    vals.forEach(function (v, id) {
        if (id === vals.length - 1 && v === "") {
            return;
        } else {
            const matched = testRegExp(v, array)

            if (!matched) {
                clean = false;
            } else {
                const matchedCount = (v.match(new RegExp(matched)) || [])[1];

                if (!!matchedCount && (+matchedCount < suffixCount.min || +matchedCount > suffixCount.max)) {
                    clean = false;
                }
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