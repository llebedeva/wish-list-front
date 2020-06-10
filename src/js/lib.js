const serialize = obj => {
    let str = [];
    for (let p in obj)
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};

export {serialize};
