/**
 * Created by admin on 2019/8/31.
 */
import React,{Component} from 'react';
import { Input, Upload, Icon,Button,Tooltip,Row, Col,message   } from 'antd';
import ajax from "../../common/api/ajacFunction";
import apiConfig from '../../common/api/apiConfig'
import './RegisterContent.css';

const ipc = window.electron.ipcRenderer;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class EditContent extends Component{
    constructor(props){
        super(props)
        this.state={
            imageUrl:"",
            loading:false,
            name:"",
            registerLoad:false
        }
    }
    beforeUpload(file){
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    handleChange(info){
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            console.log(info.file.response.data)
            this.setState({
                imageUrl:info.file.response.data
            })
            // Get this url from response in real world.
        }
    }
    changeName(e){
        this.setState({
            name:e.target.value

        })
    }
    finishRegister(){
        let name = this.state.name;
        let imageUrl = this.state.imageUrl;
        if(name == ""){
            message.error("姓名必须填写")
        }else {
            this.setState({
                registerLoad:true
            })
            let token = this.props.token;
            let deviceId = window.localStorage.getItem("deviceId");
            let url = apiConfig.apiDomain+"user/completeInfo";
            let header = {
                token:token,
                deviceId:deviceId
            }
            let data = {
                name:name,
                headPortraits:imageUrl
            }
            let _this = this
            ajax.post(url,data,function (obj) {
                if(obj.code == 200) {
                    message.success('用户创建成功，现在你可以去登录');
                    _this.props.toLogin(obj.data)
                }else {
                    message.error(obj.msg)
                    _this.setState({
                        registerLoad:false
                    })
                }
            },header)
        }

    }
    render(){
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">头像</div>
            </div>
        );
        let url = apiConfig.apiDomain + "upload/uploadImgForCreate";
        let header = {
            // token:this.props.token,
            token:"eyJhbGciOiJIUzI1NiJ9.eyJwaXgiOiI2MTk3ODgxYS1kMmJmLTQ1NWUtOTQ2OC1jNTIzM2Y2NTYzYzMiLCJlTWFpbCI6IjE2OTI3Mzc3MzRAcXEuY29tIiwiY29kZSI6IjEwOTA2OSIsInBhc3N3b3JkIjoiMTIzNDU2QWEifQ.MPHzwsy3G_JH2rAQNHZjTIf4VkECuDZqfLbAOBElpKU"
        }
        return(
            <div className="login-password-content-all">
               <div>
                   <Upload
                       name="file"
                       listType="picture-card"
                       className="avatar-uploader"
                       showUploadList={false}
                       action={url}
                       beforeUpload={this.beforeUpload.bind(this)}
                       onChange={this.handleChange.bind(this)}
                       headers={header}
                   >
                       {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                   </Upload>

                   <Input
                       placeholder="输入姓名"
                       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                       suffix={
                           <Tooltip title="请谨慎填写姓名，一经联系不可修改">
                               <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                           </Tooltip>
                       }
                       onChange={this.changeName.bind(this)}
                   />
                   <br/><br/>
                   <Button type="primary" loading={this.state.registerLoad} onClick={this.finishRegister.bind(this)} block>
                       完成注册并提交
                   </Button>
               </div>
            </div>


        )
    }
}
export default EditContent