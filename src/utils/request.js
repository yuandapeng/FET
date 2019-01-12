import { PRIFIX } from "./const";

import  axios from "axios";


const  sendRequest = (method,url,data={},params={})=>{
    return new Promise((resolve,reject) => {
        axios.request({
            method,
            url:PRIFIX+url,
            data,
            params,
        }).then(response => {
          resolve(response.data.result);
        })
        .catch(err => {
          reject(err)
        })
      })
     
}

export default {

    post:(url,data,params)=>{
        return sendRequest("post",url,data,params);
     },
     get:(url,params)=>{
        return sendRequest("get",url,{},params);              
    },

    delete: (url,data,params)=>{
        return sendRequest("delete",url,data,params);
    },
    put:(url,data,params)=>{
        return sendRequest("put",url,data,params);
    } 
}







