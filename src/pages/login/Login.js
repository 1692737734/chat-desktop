/**
 * Created by admin on 2019/8/31.
 */
import React,{Component} from 'react';
import LoginOperate from '../common/operate/LoginOperate'
import { Tabs } from 'antd';
import PasswordLogin from './content/PasswordLogin'
import '../common/frame/LoginFrame.css';
import './Login.css';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}
class Login extends Component{
    render(){
        return(
            <div className="login-frame-all">
                <div className="login-header">
                    <LoginOperate/>
                    <div className="login-header-drag"></div>
                </div>
                <div className="login-content">
                    <div className="login-content-tab">
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="密码登录" key="1">
                                <PasswordLogin/>
                            </TabPane>
                            <TabPane tab="验证码登录" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                        </Tabs>
                    </div>

                </div>
            </div>
        )
    }
}
export default Login