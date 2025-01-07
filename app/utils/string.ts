export function capitalize(s: string) {
    return `${s.slice(0, 1).toUpperCase()}${s.slice(1)}`
}

export function stripArray(value: string) {
    const regEx = new RegExp(/^\[|\]$/gi);
    return value.replace(regEx, "");
}

export function matchRegExpValues(values: string) {
    const regEx = new RegExp(/(\[[0-9a-z\s:!@#'",$%^&?*)(\\+=._-]+,?\],?|("[0-9a-z\s:!@#'$%^&?*)(\\+=.,_-]+",?|"",?)|([0-9a-z\s:!@#'$%^&?*)(\\/+=._-]+,?|,))/gi);
    const matched: string[] = values.match(regEx) || [];

    if (values[values.length - 1] === ",") {
        matched.push("");
    }
    return matched;
}

export function testRegExp(search: string = "", array: string[]) {
    let found = 0;
    array.forEach(function (a) {
        const regA = new RegExp(a)
        if (!!regA.test(search) && (search.trim().match(regA) || {}).index === 0) {
            found++;
        }
    });
    return found;
}


export function testRegExpValues(values: string) {
    const regEx = new RegExp(/(,+)/gi);
    return regEx.test(values);
}

export function testArrayRegExpValues(values: string) {
    const regEx = new RegExp(/\[.*\]/gi);
    return regEx.test(values);
}

export function testStringRegExpValues(values: string) {
    const regEx = new RegExp(/^".*"$/gi);
    return regEx.test(values);
}