/**
 * Created by admin on 2019/9/9.
 */
import React,{Component} from 'react';
import { Icon,Tooltip,Avatar,Popover,Row,Col, Input,message } from 'antd';
import './Head.css'
const ipc = window.electron.ipcRenderer;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1390831_pbyaxd8j1hi.js',
});
const { Search } = Input;
class Head extends Component{
    constructor(props){
        super(props)
        this.state= {
            
        }
    }
    componentWillMount(){

    }
    render(){
        return(
            <div className="head-all">
                <div className="head-drag"></div>
                <div className="head-search">
                    <Popover placement="bottomLeft" content={111} trigger="click">
                        <Search
                            placeholder="搜索"
                            onSearch={value => console.log(value)}
                        />
                    </Popover>
                </div>
                <div className="head-op">
                    <div className="head-op-info"><Icon type="minus" /></div>
                    <div className="head-op-info"><Icon type="border" /></div>
                    <div className="head-op-info"><Icon type="close" /></div>
                </div>
            </div>
        )
    }
}
export default Head