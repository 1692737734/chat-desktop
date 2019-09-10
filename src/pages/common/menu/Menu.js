import React,{Component} from 'react';
import { Icon,Tooltip,Avatar,Popover,Row,Col, Divider } from 'antd';
import './Menu.css'
const ipc = window.electron.ipcRenderer;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1390831_pbyaxd8j1hi.js',
});
class Menu extends Component{
    constructor(props){
        super(props)
        this.state={
            menuList:[
                {name:"消息",icon:"icon-icon_message_fill",router:"#/home/chat"},
                {name:"通讯录",icon:"icon-icon_addresslist_fil",router:"#/home/address"},
                {name:"应用",icon:"icon-icon_work_fill",router:"#/home/work"}
            ],
            user:{
                name:"盛佳栋",
                nickname:"鲁班",
                sex:1,
                eMail:"1692737734@qq.com",
                telephone:"18358587522",
                headPortraits:"http://live-develop.oss-cn-hangzhou.aliyuncs.com/img/2019-09-05/123_3f5bdc14c0194adcab3aa408004b480d.jpg?Expires=1883044726&OSSAccessKeyId=LTAIlteGNiLFLomK&Signature=7Jl252RYzguLK6zr6o49wOnRWLs%3D"
            }
        }
    }
    componentWillMount(){

    }
    toPage(router){
        window.location.replace(router)
    }
    render(){
        let sexdoc = "";
        if(this.state.user.sex == 0){

        }
        if(this.state.user.sex == 1){
            sexdoc = <Icon type="man" style={{color:"#0099CC"}}/>
        }
        if(this.state.user.sex == 2){
            sexdoc = <Icon type="woman" style={{color:"#FF9999"}}/>
        }
        return(
            <div className="menu-all">
                <div className="menu-part">
                    <Popover placement="rightTop" content={
                        <div className="pop_all">
                            <Row gutter={16}>
                                <Col className="gutter-row" span={18}>
                                    <div className="menu-nickname">{this.state.user.nickname}&nbsp;<span className="menu-sex">{sexdoc}</span></div>
                                    <div className="gutter-box">
                                        姓名：{this.state.user.name}
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Avatar shape="square" size={44} src={this.state.user.headPortraits} />
                                </Col>
                            </Row>
                            <Divider />
                            <div>邮箱：{this.state.user.eMail}</div>
                            <div>手机：{this.state.user.telephone}</div>
                        </div>
                    } trigger="click">
                        <Avatar shape="square" size={38} src={this.state.user.headPortraits} />
                    </Popover>
                </div>
                {this.state.menuList.map((item,index)=>{
                    return(
                        <div className="menu-part" onClick={(router)=>this.toPage(item.router)}><Tooltip placement="right" title={item.name}><IconFont type={item.icon} /></Tooltip></div>
                    )
                })}
            </div>
        )
    }
}
export default Menu