/**
 * Created by admin on 2019/9/3.
 */
function post(url,params,callback,headers) {
    // console.log('post-请求接口:' + url);
    // console.log('请求参数:' + JSON.stringify(params));
    if (!headers) {
        headers={
            'Accept': 'application/json', // 通过头指定，获取的数据类型是JSON
            'Content-Type': 'application/json',
        }
    }
    headers=Object.assign({
        'Accept': 'application/json', // 通过头指定，获取的数据类型是JSON
        'Content-Type': 'application/json',
    },headers);
    let fetchOptions = {
        method:"POST",
        headers: headers,
        body:JSON.stringify(params)
    };

    fetch(url,fetchOptions).then((response)=>response.json()).then((obj)=>{
            callback(obj);
    })

}

/**
 * Get请求方式
 * @param {Object} url,请求路径						例:http://192.168.1.53:8040/qrcode/login
 * @param {Object} successCallBack，成功返回回调函数		例:function(){}
 */
function get(url,callback,headers) {
    // console.log('get-请求接口:' + url);
    if (!headers) {
        headers={
            'Accept': 'application/json', // 通过头指定，获取的数据类型是JSON
            'Content-Type': 'application/json',
        }
    }
    let fetchOptions = {
        method:"GET",
        headers: headers,
    };

    fetch(url,fetchOptions).then((response) => response.json())
        .then((obj)=>{
            if(obj.code === 200){
                let total=obj.total||0;
                callback(obj.data,total);//回调total值
            }else{
            }
        })

}
export default {
    get:get,
    post:post,


};