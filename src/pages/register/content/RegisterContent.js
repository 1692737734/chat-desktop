/**
 * Created by admin on 2019/8/31.
 */
import React,{Component} from 'react';
import { Input, Tooltip, Icon,Button,AutoComplete,Row, Col,message   } from 'antd';
import ajax from "../../common/api/ajacFunction";
import apiConfig from '../../common/api/apiConfig'
import './RegisterContent.css';

function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}
const ipc = window.electron.ipcRenderer;

function checkEmail(email){
    var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if(myReg.test(email)){
        return true;
    }else{
        return false;
    }
}
class RegisterContent extends Component{
    constructor(props){
        super(props)
        this.state ={
            loading:false,
            eMail:"",
            loadingCode:false,
            codeMsg:"获取验证码",
            codeTimer:0,

            code:"",
            password:"",
            rePassword:"",
            token:""
        }
    }
    createAccount(){
        //判断一下条件是否符合
        let eMail = this.state.eMail;
        let code = this.state.code;
        let password = this.state.password;
        let rePassword = this.state.rePassword;
        if(eMail == ""||code == "" || password == ""||rePassword == ""){
            message.error("请完善信息再提交")
        }else if(password!=rePassword){
            message.error("两次输入的密码不一致")
        } else {
            this.setState({
                loading:true
            })
            let token = this.state.token;
            let deviceId = window.localStorage.getItem("deviceId");
            let url = apiConfig.apiDomain+"user/createAccount";
            let header = {
                token:token,
                deviceId:deviceId
            }
            let data = {
                eMail:eMail,
                code:code,
                password:password
            }
            let _this = this
            ajax.post(url,data,function (obj) {
                if(obj.code == 200) {
                    message.success('创建成功，请完善信息');
                    _this.props.toNext(obj.data)
                }
            },header)

        }

    }
    toRegister(){
        ipc.send("toRegister")
    }

    handleChangeEmail = value => {
        console.log(value)
        this.setState({
            dataSource:
                !value || value.indexOf('@') >= 0
                    ? []
                    : [ `${value}@163.com`, `${value}@qq.com`],
            eMail:value
        });
    };
    enterCode(){

        //判断一下邮箱对不对
        let email = this.state.eMail;
        if(!checkEmail(email)){
            message.error('邮箱错误');
        }else {
            this.setState({
                loadingCode:true,
                codeMsg:"获取中..."
            })
            let deviceId = window.localStorage.getItem("deviceId");
            let url = apiConfig.apiDomain+"code/getRegisterEmailCode";
            let header = {
                deviceId:deviceId
            }
            let data = {
                eMail:email
            }
            let _this = this
            ajax.post(url,data,function (obj) {
                if(obj.code == 200){
                    message.success('验证码发送成功');
                    _this.setState({
                        codeTimer:60,
                        token:obj.data
                    })
                    //设置定时器可以继续获取
                    window.codeTimer = setInterval(function () {
                        let codeTimer = _this.state.codeTimer;
                        codeTimer = codeTimer -1;
                        if(codeTimer<=0){
                            //结束定时器
                            _this.setState({
                                codeTimer:codeTimer,
                                loadingCode:false,
                                codeMsg:"获取验证码",
                            })
                            clearInterval(window.codeTimer)
                        }else {
                            let msg = codeTimer+"秒后获取"
                            //执行
                            _this.setState({
                                codeTimer:codeTimer,
                                codeMsg:msg,
                            })
                        }
                    },1000)
                }else {
                    message.error(obj.msg);
                    _this.setState({
                        codeTimer:0,
                        codeMsg:"获取验证码",
                        loadingCode:false,
                    })
                }
            },header)
        }
    }

    changeCode(e){
        let code = e.target.value;
        this.setState({
            code:code
        })
    }
    changePass(e){
        let pass = e.target.value;
        this.setState({
            password:pass
        })
    }

    changeRePass(e){
        let pass = e.target.value;
        this.setState({
            rePassword:pass
        })
    }
    render(){
        let codeButton = "";
        if(this.state.loadingCode == true&&this.state.codeTimer != 0){
            codeButton = <Button type="primary" disabled>{this.state.codeMsg}</Button>
        }else {
            codeButton = <Button type="primary" loading={this.state.loadingCode} onClick={this.enterCode.bind(this)} block>{this.state.codeMsg}</Button>
        }
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
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <Input placeholder="输入验证码" onChange={this.changeCode.bind(this)} value={this.state.code}/>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        {codeButton}
                    </Col>
                </Row>
                <br/>
                <Input.Password
                    prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="输入密码" onChange={this.changePass.bind(this)} value={this.state.password}/>
                <br/><br/>
                <Input.Password
                    prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="确认密码" onChange={this.changeRePass.bind(this)} value={this.state.rePassword}/>
                <br/><br/>
                <Button type="primary" loading={this.state.loading} onClick={this.createAccount.bind(this)} block>
                    创建账号
                </Button>
                <br/><br/>
                <div className="login-password-content-remember"></div>
                <div className="login-password-content-other">已有账号：<span onClick={this.toRegister.bind(this)}>去登录</span></div>
            </div>


        )
    }
}
export default RegisterContent