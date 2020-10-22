import React from 'react';
import './index.scss';
import { Form, Input, Button, Select, message } from 'antd';
// import { Rule } from 'antd/lib/form';
import { exit, send, register } from '../../../services/user.service';
import PasswordStrongValidation from '../../../components/PasswordStrongValidation/index';
import { isEmpty } from 'lodash';
import { useHistory } from 'dva';

const { Option } = Select;

const _contries = ['中国大陆', '测试1', '测试2', '测试3', '测试测试4'];

const Register: React.FC = props => {

  const [form] = Form.useForm();
  const history = useHistory();
  const [encryptedCode, setEncryptedCode] = React.useState<string>(null);

  const nickNameChecker = async () => {
    const value = form.getFieldValue('nickName');
    if (!value) return;
    try {
      const { data } = await exit(value);
      if (data) {
        form.setFields([{ name: 'nickName', errors: ['昵称已存在'] }]); 
      }
    } catch (error) {
      // TODO: - handler server error when check user nick name exit
      console.log(error);
    }
  }

  const selectBefore = (
    <Select defaultValue={_contries[0]} className="select-before" dropdownClassName="register-contry-selector">
      { _contries.map(contry => <Option value={contry} key={`optino-${contry}`} >{contry}</Option>) }
    </Select>
  );

  const focusPhoneInputHandler = () => {
    form.setFields([{ name: 'phone', errors: [] }]);
  };

  const sendButtonHandler = async () => {
    const phone = form.getFieldValue('phone');
    if (isEmpty(phone)) {
      form.setFields([{ name: 'phone', errors: ['请输入手机号码'] }]);
    } else {
      try {
        const { data } = await send(phone);
        if (data.encryptedCode) {
          setEncryptedCode(data.encryptedCode);
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
  };

  const onSubmitHandler = async () => {
    try {
      let params = await form.validateFields();
      const { data } = await register({ ...params, encryptedCode });
      if (data.uuid){
        message.success('注册成功');
        history.replace('/passport/login');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      message.error('注册失败')
    }
  };

  return (
    <div className="pili-register-wrapper">
      <div className="title-line">
        <span className="title">注册</span>
      </div>
      <div className="register-box">
        <Form form={form} autoComplete="new-password">
          <Form.Item name="nickName" label="" rules={[
            { required: true, message: '请告诉我你的昵称吧' },
            { max: 12, message: '昵称过长' },
            { min: 2, message: '昵称过短' }
          ]} >
            <Input onBlur={nickNameChecker} placeholder="昵称" className="second" autoComplete="off" />
          </Form.Item>
          <PasswordStrongValidation />
          <Form.Item name="phone" label="">
            <Input onFocus={focusPhoneInputHandler} addonBefore={selectBefore} placeholder="填写常用手机号" />
          </Form.Item>
          <Form.Item name="code" label="" rules={[
            { required: true, message: '请输入短信验证码' },
          ]}>
            <div className="code-wrapper">
              <Input placeholder="请输入短信验证码" />
              <Button onClick={sendButtonHandler} type="primary">点击获取</Button>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="submit-wrapper">
              <Button disabled={encryptedCode === null} onClick={onSubmitHandler} type="primary">注册</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
