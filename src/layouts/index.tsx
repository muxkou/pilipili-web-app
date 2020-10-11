import React from 'react';
import Header from '../views/header/index';
import './index.scss';
import '../common/styles/icon.css';

const BasicLayout: React.FC = props => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default BasicLayout;
