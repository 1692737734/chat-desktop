/**
 * Created by admin on 2019/8/31.
 */
/**
 * Created by admin on 2019/8/31.
 */
import React,{Component} from 'react';
import { Icon } from 'antd';

import './LoginOperate.css'

const ipc = window.electron.ipcRenderer;
class LoginOperate extends Component{
    close(){
        ipc.send("close-register")
    }

    render(){
        return(
            <div className="login-operate-all">
                <div className="login-operate-info"><Icon type="minus" /></div>
                <div className="login-operate-info"><Icon type="close" onClick={this.close.bind(this)}/></div>
            </div>
        )
    }
}
export default LoginOperate