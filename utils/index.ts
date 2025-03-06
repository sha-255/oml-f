export const removeItemOnce = (arr: any[], value: any) => {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

export const removeItemAll = (arr: any[], value: any) => {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

export const getId = (value: string): number => {
    return Number.parseInt(value.replace(/.+\[/gm, "").replace(/]/gm, ""));
};