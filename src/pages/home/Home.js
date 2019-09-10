/**
 * Created by admin on 2019/8/31.
 */
/**
 * Created by admin on 2019/8/31.
 */
import React,{Component} from 'react';
import Menu from '../common/menu/Menu';
import Head from '../common/head/Head'
import {HashRouter, Route, Switch} from 'react-router-dom';
import Chat from './chat/Chat';
import Address from './address/Address';
import Work from './work/Work'

import './Home.css'
const ipc = window.electron.ipcRenderer;
class Home extends Component{
    componentWillMount(){
        this.isLogin()
    }
    isLogin(){
        let accessToken = window.localStorage.getItem("accessToken");
        if(accessToken == null || accessToken == undefined){
            ipc.send("toLogin")
        }
    }

    render(){
        return(
            <div className="home-all">
                <div className="home-menu"><Menu/></div>
                <div className="home-head"><Head/></div>
                <div className="home-content">
                    <HashRouter>
                        <Switch>
                            <Route  path="/home/chat" component={Chat}/>
                            <Route  path="/home/address" component={Address}/>
                            <Route  path="/home/work" component={Work}/>
                            <Route exact component={Address} />
                        </Switch>
                    </HashRouter>
                </div>
            </div>
        )
    }
}
export default Home