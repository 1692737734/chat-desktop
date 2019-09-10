import React,{Component} from 'react';
import { Icon,Row,Col,Avatar } from 'antd';
import './Address.css'
const ipc = window.electron.ipcRenderer;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1390831_955q70dvx7.js',
});
class Address extends Component{
    constructor(props){
        super(props)
        this.state={
            baseOp:[
                {key:"my_friend",name:"我的朋友",icon:"icon-icon_people_fill",bg:""},
                {key:"my_friend",name:"新的朋友",icon:"icon-icon_newapplication_",bg:""},
                {key:"my_friend",name:"我的群组",icon:"icon-icon_meeting_fill",bg:""}
            ]
        }
    }
    componentWillMount(){
    }
    render(){
        return(
            <div className="address-all">
                <div className="address-left">
                    {this.state.baseOp.map((item,index)=>{
                        return(
                            <div className="op-info">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <IconFont type={item.icon} />
                                    </Col>
                                    <Col className="gutter-row" span={18}>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default Address
