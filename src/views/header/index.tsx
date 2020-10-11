import React from 'react';
import { Button, Popover } from 'antd';
import './index.scss';
import { send } from '../../services/user.service';
import { useHistory } from "react-router-dom";
import Link from 'umi/link';

const _navs = [
  { label: '番剧', to: '/' },
  { label: '游戏中心', to: '/' },
  { label: '直播', to: '/' },
  { label: '会员购', to: '/' },
  { label: '漫画', to: '/' },
  { label: '赛事', to: '/' },
];

const pop = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const Header: React.FC = () => {

  const test: Function = async () => {
    const res = await send("13276789887");
    console.log(res);
  };

  // const history = useHistory();

  return (
    <div className="pili-header">
      <div className="gradient-wrapper"></div>
      <div className="bar-wrapper">
        <div className="bar-navs">
          <Link to="/"><i className="iconfont icon-bilibili" /></Link>
          {
            _navs.map((nav, index) => {
              return <Link key={`nav-item-${index}`} to={nav.to}><div className="nav-item">{nav.label}</div></Link>
            })
          }
        </div>
        <div className="bar-search-wrapper">
          
        </div>
        <div className="bar-mine">
          <Popover content={pop} title="大会员">
            <div className="mine-item">大会员</div>
          </Popover>
          <Popover content={pop} title="消息">
            <div className="mine-item">消息</div>
          </Popover>
          <Popover content={pop} title="动态">
            <div className="mine-item">动态</div>
          </Popover>
          <Popover content={pop} title="历史">
            <div className="mine-item">历史</div>
          </Popover>
          <Popover content={pop} title="收藏">
            <div className="mine-item">收藏</div>
          </Popover>
          <Popover content={pop} title="创作中心">
            <div className="mine-item">创作中心</div>
          </Popover>
          <Button type="primary">投稿</Button>
        </div>
      </div>  
    </div>
  );
};

export default Header;
