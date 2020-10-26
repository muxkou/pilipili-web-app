import React from 'react';
import './index.scss';
// import _ from 'lodash';
import Navigation from '../navigation/index';
import { useHistory } from 'dva';
import { connect } from 'dva'
import { IGloablStore } from '@/common/interfaces/store.interface';


const _sub_header_path = [
  'passport'
]

connect(() => ({}))
const Header: React.FC<any> = (props: any) => {

  const { dispatch } = props;
  const history = useHistory();
  const isHome = history.location.pathname === '/';
  const isSubHeader = _sub_header_path.findIndex(path => history.location.pathname.includes(path)) >= 0;

  React.useEffect(() => {
    const authUser = () => {
      dispatch({ type: 'user/profile' });
    };
    authUser();
  }, []);
  // dispatch

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

export default connect(() => { return {} })(Header);