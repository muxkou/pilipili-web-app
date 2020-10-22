// import 'index.scss';
import React from 'react';
import { Input, Form} from 'antd';
import { Fragment } from 'react';
import { isPureNumber, isStrongPassword } from '../../common/utils/reg.util';
import './index.scss';

export enum EStrongLevel {
  weak = 0,
  middle = 1,
  strong = 2
};

const PasswordStrongValidation: React.FC = props => {

  const [show, setShow] = React.useState(false);
  const [level, setLevel] = React.useState<EStrongLevel>(EStrongLevel.weak);

  const onValueChange = (event) => {
    const value = event.target.value;
    const length = value.length;
    if (length > 0 && !show) setShow(true);
    if (length < 6 || isPureNumber(value)) {
      setLevel(EStrongLevel.weak);
    } else if (isStrongPassword(value)) {
      setLevel(EStrongLevel.strong);
    } else {
      setLevel(EStrongLevel.middle);
    }
  };

  // const _level_text = () => {
  //   switch (level) {
  //     case EStrongLevel.weak:
  //       return '弱';
  //     case EStrongLevel.middle:
  //       return '中';
  //     case EStrongLevel.strong:
  //       return '安全';
  //     default:
  //       return '弱';
  //   }
  // };

  return (
    <Fragment>
      { 
        show
        ? <div className="strong-wrapper">
            <div className="title">安全系数:</div>
            <div className="level-block week" />
            {level >= 1 ? <div className="level-block middle" /> : null}
            {level >= 2 ? <div className="level-block strong" /> : null}
            {/* <div className="mark">{_level_text()}</div> */}
          </div>
        : null 
      }
      <Form.Item name="password" label="" rules={[
        { required: true, message: '密码不能小于6个字符' },
        { max: 16, message: '密码不能大于6个字符' },
        { min: 6, message: '密码不能小于6个字符' }
      ]} >
        <Input.Password onChange={onValueChange} placeholder="密码(6至16个字符组成，区分大小写)" autoComplete="new-password" />
      </Form.Item>
    </Fragment>
  )
}

export default PasswordStrongValidation;
