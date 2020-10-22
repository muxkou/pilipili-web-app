import React from 'react';
import Header from '../views/header/index';
import './index.scss';
import '../common/styles/icon.css';
import { useHistory } from 'dva';

const BasicLayout: React.FC = props => {

  const history = useHistory();

  console.log(history);

  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default BasicLayout;
