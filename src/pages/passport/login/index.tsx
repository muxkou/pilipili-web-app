import React from 'react';
import './index.scss';
import '../index.scss';
import { IGloablStore } from '@/common/interfaces/store.interface';
import { connect, useHistory } from 'dva';
import { Tabs, Form, Input, Button, message, Checkbox } from 'antd';
import { isEmpty } from 'lodash';
import { send, login } from '@/services/user.service';
import { local, EStorageKey } from '@/common/utils/storage.util';

const { TabPane } = Tabs;

enum LoginType {
  sms, password
}

const Login: React.FC<any> = props => {
  
  const history = useHistory();
  const { dispatch } = props;
  const [form] = Form.useForm();
  const [loginType, setLoginType] = React.useState<LoginType>(LoginType.sms);
  const [encryptedCode, setEncryptedCode] = React.useState<string>(null);
  const [isRemeberMe, setIsRemeberMe] = React.useState(local.get(EStorageKey.IsRememberMe) || false);
  const [lastUserPhone, setLastUserPhone] = React.useState(local.get(EStorageKey.LastUserPhone));

  const sendButtonHandler: Function = async () => {
    const phone = form.getFieldValue('phone');
    if (isEmpty(phone)) {
      form.setFields([{ name: 'phone', errors: ['请输入手机号码'] }]);
    } else {
      try {
        const { data } = await send(phone);
        if (data.encryptedCode) {
          setEncryptedCode(data.encryptedCode);
          message.success('验证码发送成功');
        } else {  
          throw new Error('获取encryptedCode失败 ');
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.statusCode === 601) {
          form.setFields([{ name: 'phone', errors: ['请输入正确格式的手机号'] }]);
        } else {
          message.error('发送验证码失败');
        }
      }
    }
  }

  const focusPhoneInputHandler: Function = async () => {
    form.setFields([{ name: 'phone', errors: [] }]);
  };

  const onRememberMeChanged: Function = (checked: boolean) => {
    setIsRemeberMe(checked);
    local.save(checked, EStorageKey.IsRememberMe);
  };

  const loginHandler: Function = async () => {
    try {
      let params = await form.validateFields();
      const { data } = await login({ ...params, encryptedCode });
      if (data.Authorization) {
        local.save(data.Authorization, EStorageKey.Authorization);
        window.location.href = '/';
      } else {
        throw new Error('获取token失败');
      }
      debugger
    } catch (error) {
      console.log(error);
      message.error('登录失败');
    }
  };

  const registerHandler: Function = () => {
    history.push('/passport/register');
  };

  return (
    <div className="pili-login-wrapper">
      <div className="pili-passport-title-line">
        <span className="title">登录</span>
      </div>
      <div className="login-box">
        <div className="section left">
          <div className="tv-wrapper">
            <i className="iconfont icon-tv"></i>
          </div>
          <div className="qr-wrapper">
            <img src="http://localhost:8081/resouces/pili/qr.png" />
          </div>
          <div className="qr-footer-wrapper">
            <p className="status-txt">扫描二维码登录</p>
            <p className="app-link">
              请使用 
              <a href="//app.bilibili.com/" target="_blank">哔哩哔哩客户端</a>
              <br />扫码登录<br />或扫码下载APP</p>
          </div>
        </div>
        <div className="section line">
        </div>
        <div className="section right">
          <div className="login-form">
            <div className="tabs-wrapper">
              <div onClick={() => setLoginType(LoginType.sms)} className={`tab ${loginType === LoginType.sms ? 'current' : ''}`}>短信登录</div>
              <div onClick={() => setLoginType(LoginType.password)} className={`tab ${loginType === LoginType.password ? 'current' : ''}`}>密码登录</div>
            </div>
            {
              loginType === LoginType.sms
              ? (
              <div className="form-wrapper sms">
                <Form form={form} >
                  <Form.Item name="phone">
                        <Input onFocus={() => focusPhoneInputHandler()} placeholder="填写常用手机号" />
                  </Form.Item>
                  <Form.Item name="code" label="" rules={[
                    { required: true, message: '请输入短信验证码' },
                  ]}>
                    <div className="code-wrapper">
                      <Input placeholder="请输入短信验证码" />
                      <Button onClick={() => sendButtonHandler()} type="primary">点击获取</Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>)
              : (
                <div className="form-wrapper password">
                  施工中(懒得做......)
                </div>
              )
            }
            <div className="operation-wrapper">
              <div className="remmeber-me">
                <Checkbox defaultChecked={isRemeberMe} onChange={(e) => onRememberMeChanged(e.target.checked)} />
                <span className="remember-text">记住我</span>
                <span className="suggestion">不是自己的电脑上不要勾选此项</span>
              </div>
            </div>
            <div className="login-buttons-wrapper">
              <Button onClick={() => loginHandler()} type="primary">登录</Button>
              <Button onClick={() => registerHandler()}>注册</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state: IGloablStore) => {
  return {
    pId: state.user.pId,
  };
};



export default connect(mapStateToProps)(Login);