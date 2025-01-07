import Eth from "web3-eth";
import * as EthAbi from "web3-eth-abi";
import endpoint, { fallbackEndpoints, wsEndpoint } from "app/config/network"
import { matchRegExpValues, testArrayRegExpValues, testRegExpValues, testStringRegExpValues, stripArray } from "app/utils/string"

let instance: any;

export function loadEth(attempt?: number) {
    const list = [endpoint, ...fallbackEndpoints, wsEndpoint]
    attempt = attempt || 0

    try {
        // if (window.ethereum) {
        //   this.eth = new Eth(window.ethereum);
        // } else {
        instance = new Eth(Eth.givenProvider || list[attempt]);
        // }
    } catch (e) {
        return loadEth(++attempt)
    }
}


export function getEth() {
    if (!instance) {
        loadEth()
    }

    return instance
}

interface Parsable {
    [index: string]: string | any;
}

export function parseForEncode(values: string): any {
    const matched = matchRegExpValues(values);

    return matched ?
        matched.map((val) => {
            let overlook = false;
            let snoop = false;
            let parsedVal

            if (!val || val === ",") {
                return "";
            }
            if (val[val.length - 1] === ",") {
                val = val.substring(0, val.length - 1);
            }
            if (val && testArrayRegExpValues(val)) {
                val = stripArray(val);
                snoop = true;
            }
            if (testStringRegExpValues(val)) {
                val = val.substring(1, val.length - 1);
                overlook = true;
            }
            if (snoop || (!overlook && testRegExpValues(val))) {
                parsedVal = parseForEncode(val);
            }
            return parsedVal || val;
        }) : [];
}

export function encodeData(types: string, values: string) {
    try {

        let typesList = types.split(",");
        let parsedValues = parseForEncode(values)

        if (typesList.length !== parsedValues.length)
            throw new Error("Types/values mismatch");

        let encoded = EthAbi.encodeParameters(typesList, parsedValues);

        return encoded.substring(2);
    }
    catch (e: any) {
        throw new Error(e);
    }
}


export function parseDecoded(toParse: Parsable, types?: string[]) {
    const typeLength = (types || []).length;
    const parsed: string[] = Object.keys(toParse).map(function (id: string) {
        const d: any = toParse[id];
        return (typeof d === "object" && d.length !== undefined) ?
            JSON.stringify(parseDecoded(d)).replace(/"/g, "")
            :
            d.toString();
    });
    //Quick fix to hide array length
    //TODO write more elegant solution
    if (parsed.length > typeLength && !!parsed[parsed.length - 1] && Number(parsed[parsed.length - 1]).toString() === parsed[parsed.length - 1]) {
        parsed.splice(parsed.length - 1, 1);
    }
    return parsed;
}

export function decodeData(types: string, value: string) {
    try {
        let typesList = types.split(",");

        if (value.indexOf("0x") !== 0)
            value = "0x" + value;

        console.log(types, value, typesList);

        let decoded = EthAbi.decodeParameters(typesList, value);
        console.log("pre--", decoded);

        const parsed = parseDecoded(decoded, typesList);
        console.log(decoded);

        return parsed.join(",")
    }
    catch (e: any) {
        throw new Error(e);
    }
}