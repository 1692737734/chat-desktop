/**
 * Created by admin on 2019/8/31.
 */
import React,{Component} from 'react';
import { Input, Tooltip, Icon,Button,Checkbox,Divider,AutoComplete,message   } from 'antd';
import ajax from "../../common/api/ajacFunction";
import apiConfig from '../../common/api/apiConfig'
import './PasswordLogin.css';

function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}
const ipc = window.electron.ipcRenderer;
class PasswordLogin extends Component{
    constructor(props){
        super(props)
        this.state ={
            loading:false,
            eMail:"",
            password:""
        }
    }
    toLogin(){
        let eMail = this.state.eMail;
        let password = this.state.password;
        if(eMail == ""|| password == ""){
            message.error("你还有未填项")
        }else {
            this.setState({
                loading:true
            })
            let deviceId = window.localStorage.getItem("deviceId");
            let url = apiConfig.apiDomain+"user/loginByPass";
            let header = {
                deviceId:deviceId
            }
            let data = {
                eMail:eMail,
                password:password
            }

            let _this = this
            ajax.post(url,data,function (obj) {
                if(obj.code == 200){
                    message.success('登录成功');
                    let data =  obj.data;
                    let accessToken = data.accessToken;
                    let refreshToken = data.refreshToken;
                    window.localStorage.setItem("accessToken",accessToken)
                    window.localStorage.setItem("refreshToken",refreshToken)
                    //设置定时器可以继续获取
                    window.tokenTimer = setInterval(function () {
                        //
                        let refreshData = {
                            accessToken: window.localStorage.getItem("accessToken"),
                            refreshToken:window.localStorage.getItem("refreshToken")
                        }
                        let header = {
                            deviceId:window.localStorage.getItem("deviceId")
                        }
                        let url = apiConfig.apiDomain+"user/refresh";
                        ajax.post(url,refreshData,function (tokenObj) {
                            let tokenData =  tokenObj.data;
                            let accessToken = tokenData.accessToken;
                            let refreshToken = tokenData.refreshToken;
                            window.localStorage.setItem("accessToken",accessToken)
                            window.localStorage.setItem("refreshToken",refreshToken)
                        },header)
                    },1000*60*25)
                    //跳转到首页
                    ipc.send("toHome")
                }else {
                    message.error(obj.msg);
                    _this.setState({
                        loading:false,
                    })
                }
            },header)
        }

    }
    toRegister(){
        ipc.send("toRegister")
    }
    handleChangeEmail(value){
        console.log(value)
        this.setState({
            dataSource:
                !value || value.indexOf('@') >= 0
                    ? []
                    : [ `${value}@163.com`, `${value}@qq.com`],
            eMail:value
        });
    }
    changePass(e){
        this.setState({
            password:e.target.value
        })
    }
    render(){
        return(
            <div className="login-password-content-all">
                <AutoComplete
                    prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    dataSource={this.state.dataSource}
                    style={{ width: '100%' }}
                    onChange={this.handleChangeEmail.bind(this)}
                    block
                >
                    <Input
                        placeholder="输入邮箱"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={
                            <Tooltip title="请输入邮箱">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                </AutoComplete>
                <br/><br/>
                <Input.Password
                    prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="输入密码"
                    onChange={this.changePass.bind(this)}
                />
                <br/><br/>
                <Button type="primary" loading={this.state.loading} onClick={this.toLogin.bind(this)} block>
                    登录
                </Button>
                <br/><br/>
                <div className="login-password-content-remember"><Checkbox onChange={onChange}>自动登录</Checkbox></div>
                <div className="login-password-content-other"><span>忘记密码</span><Divider type="vertical" /><span onClick={this.toRegister.bind(this)} className="to-name">用户注册</span></div>
            </div>


        )
    }
}
export default PasswordLogin