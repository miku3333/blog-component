import axios from "axios";
export const getChildren = (father) => {
    if (!father) {
        return []
    }
    console.log([].concat(father.props.children));
    return [].concat(father.props.children)
}

export const divideData = (data, each = 2) => {
    if (Array.isArray(data)) {
        const result = [];
        while (data.length) {
            result.push(data.splice(0, each));
        }
        return result;
    }
    else {
        return [[data]];
    }
}

export const getData = async (initData, setData, config = {}, handleData = data => data) => {
    const { api, method = 'get', params = {}, userProcess = data => data } = config;
    if (api) {
        const data = await axios[method](api, { params })
        console.log(data.data);
        setData(handleData(userProcess(data.data)))
    }
    else {
        setData(handleData(initData))
    }
}