import React,{Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register'

const electron = window.electron;

function randomString(length) {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
class App extends Component{
    componentWillMount(){
        let deviceId = window.localStorage.getItem("deviceId");
        if(deviceId == null || deviceId == undefined){
            deviceId = randomString(10);
            window.localStorage.setItem("deviceId",deviceId)
        }
    }
    render(){
        return (
            <HashRouter>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route exact component={Home} />
                </Switch>
            </HashRouter>
        );
    }

}

export default App;
