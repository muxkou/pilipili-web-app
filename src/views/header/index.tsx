import React from 'react';
import './index.scss';
// import _ from 'lodash';
import Navigation from '../navigation/index';
import { useHistory } from 'dva';

const _sub_header_path = [
  'passport'
]

const Header: React.FC = () => {
  
  const history = useHistory();
  const isHome = history.location.pathname === '/';
  const isSubHeader = _sub_header_path.findIndex(path => history.location.pathname.includes(path)) >= 0;

  return (
    <div className={`pili-header ${isHome ? 'home' : ''}`}>
      {
        isHome
          ? <div className="gradient-wrapper"></div>
          : null
      }
      <Navigation isSubHeader={isSubHeader} />
      {
        isSubHeader
          ? <div className="sub-header-banner">
            <img src="http://localhost:8081/resouces/pili/sub_banner.png" />
          </div>
          : null
      }
    </div>
  );
};

export default Header;
