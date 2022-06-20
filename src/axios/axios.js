const axios = require('axios');

export async function getAll(url) {
    const config = {
        method: 'get',
        url: `${url}`
    };
    let res = await axios(config);
    return res;
}

export async function insert(url, id, username, email, password, fiscalCode, city, region) {
    const config = {
        method: 'post',
        url: `${url}`,
        data: {
            _id: `${id}`,
            username: `${username}`,
            email: `${email}`,
            password: `${password}`,
            fiscalCode: `${fiscalCode}`,
            city: `${city}`,
            region: `${region}`
        }
    };
    let res = await axios(config);
    return res
}

export async function get(url) {
    const config = {
        method: 'get',
        url: `${url}`
    };
    let res = await axios(config);
    return res;
}

export async function deleteId(url, id) {
    const config = {
        method: 'delete',
        url: `${url}`,
        params: {
            id: `${id}`
        }
    };
    let res = await axios(config);
    return res;
}

export async function insertElectricUsage(url, usage, insertionDate, cost) {
    const config = {
        method: 'put',
        url: `${url}`,
        data: {
            electricUsage: {
                usage: `${usage}`,
                insertionDate: `${insertionDate}`,
                cost: `${cost}`
            }
        }
    };
    let res = await axios(config);
    return res;
}

export async function insertHeatUsage(url, usage, insertionDate, cost) {
    const config = {
        method: 'put',
        url: `${url}`,
        data: {
            heatUsage: {
                usage: `${usage}`,
                insertionDate: `${insertionDate}`,
                cost: `${cost}`
            }
        }
    };
    let res = await axios(config);
    return res;
}

export async function insertWaterUsage(url, usage, insertionDate, cost) {
    const config = {
        method: 'put',
        url: `${url}`,
        data: {                        
            waterUsage: {
                usage: `${usage}`,
                insertionDate: `${insertionDate}`,
                cost: `${cost}`
            }
        }
    };
    let res = await axios(config);
    return res;
}

export async function getByCity(url, city) {    
    const config = {
        method: 'get',
        url: `${url}`,
        data: {
            city: `${city}`
        }
    };
    let res = await axios(config);
    return res;
}

export async function getByRegion(url, region) {
    const config = {
        method: 'get',
        url: `${url}`,
        data: {
            region: `${region}`
        }
    };
    let res = await axios(config);
    return res;
}