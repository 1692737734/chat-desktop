/**
 * Created by admin on 2019/8/31.
 */
import React,{Component} from 'react';
import RegisterOperate from '../common/operate/RegisterOperate'
import { Tabs,Steps,Icon } from 'antd';
import '../common/frame/LoginFrame.css';
import './Register.css';
import RegisterContent from './content/RegisterContent';
import EditContent from './content/EditContent'
const { TabPane } = Tabs;
const { Step } = Steps;

const ipc = window.electron.ipcRenderer;
class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            pageIndex:1,
            token:""
        }
    }
    toNext(token){
        this.setState({
            pageIndex:2,
            token:token
        })
    }
    toLogin(){
        ipc.send("toLogin")
    }
    render(){
        return(
            <div className="register-frame-all">
                <div className="register-header">
                    <RegisterOperate/>
                    <div className="login-header-drag"></div>
                </div>
                <div className="login-content">
                    <div style={{width:'100%',height:'20px'}}></div>
                    <Steps size="small" labelPlacement="vertical">
                        <Step status={this.state.pageIndex == 1?"process":"finish"} title="账号信息" icon={<Icon type="user" />} />
                        <Step status={this.state.pageIndex == 2?"process":"wait"} title="个人信息" icon={<Icon type="solution" />} />
                    </Steps>
                    {this.state.pageIndex == 1?<RegisterContent toNext={(token)=>this.toNext(token)}/>:<EditContent token={this.state.token} toLogin={()=>this.toLogin()}/>}

                </div>
            </div>
        )
    }
}
export default Register