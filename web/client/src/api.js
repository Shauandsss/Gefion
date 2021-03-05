/* eslint-disable import/no-anonymous-default-export */
const API_KEY = '9c6e4d77b3d0768fce07b04d97c4f858';
const API_BASE = 'http://localhost:3001/api/get'

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`)
    const json = await req.json();
    return json;
}

export default {
    getFullFunds: async () => {
        let Funds = await basicFetch(`/dev/list`);
        let fullList = [{}]
        for (let i=0;i < Funds.length; i++){
            fullList.push({
                slug: Funds[i].GROUP_ID,
                items: await basicFetch(`/index/${Funds[i].GROUP_ID}`)
            })  
        }
        fullList = fullList.slice(1, fullList.length)
        return fullList
    },
    getFullValues: async () => {
        let Funds = await basicFetch(`/dev/list`);
        let fullList = [{}]
        for (let i=0;i < Funds.length; i++){
            fullList.push({
                slug: Funds[i].GROUP_ID,
                items: await basicFetch(`/values/${Funds[i].GROUP_ID}`)
            })  
        }
        //fullList = fullList.slice(1, fullList.length)
        return fullList
    },
    getFullList: async () => {
        let Funds = await basicFetch(`/dev/list`);
        return Funds
    },
    getNews: async () => {
        let News = await basicFetch(`/dev/news`);
        return News
    },
    getNewsContent: async (Id) => {
        let News = await basicFetch(`/dev/news/content/${Id}`);
        return News
    }
}