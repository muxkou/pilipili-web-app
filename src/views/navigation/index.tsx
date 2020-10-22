import React, { Fragment, useState } from 'react';
import Link from 'umi/link';
import { Button, Input, Popover } from 'antd';
import './index.scss';
import { local, EStorageKey } from '@/common/utils/storage.util';
import _ from 'lodash';
import { connect } from 'dva';
import { IGloablStore } from '@/common/interfaces/store.interface';

const _navs = [
  { label: '番剧', to: '/' },
  { label: '游戏中心', to: '/' },
  { label: '直播', to: '/' },
  { label: '会员购', to: '/' },
  { label: '漫画', to: '/' },
  { label: '赛事', to: '/' },
];

// interface INavigationProps {
//   isSubHeader: boolean,
//   pId: string
// }

interface ISearchHistoryProps {
  data: Array<String>
  selectHandler?: Function
  removeHistoryHandler?: Function
}

const pop = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const SearchHistoryList: React.FC<ISearchHistoryProps> = ({ data, selectHandler, removeHistoryHandler }) => {
  
  return (
    <Fragment>
      {
        data.map((item, index) => 
        (<div onClick={() => { selectHandler ? selectHandler(item) : null }} key={`search-list-${index}`} className="search-history-item">
          <div>{item}</div>
          <i onClick={(event) => { removeHistoryHandler ? removeHistoryHandler(item, event) : null }} className="iconfont icon-close"></i>
        </div>))
      }
    </Fragment>
  );
}

// interface INavigation {
//   pId: string
// }

const Navigation: React.FC<any> = (props: any) => {

  const [keyword, setKeword] = useState<string>('');
  const [recentSearch, setRecentSearch] = useState<Array<string>>(local.get(EStorageKey.HistorySearch) || []);

  const { isSubHeader, pId } = props;

  const selectHistoryHandler = async (item: string) => {
    window.open(`/#/search?keyword=${item}`);
    setKeword(item);
    const updatedHistory = insertHistory(item);
    setRecentSearch(updatedHistory);
    local.save(updatedHistory, EStorageKey.HistorySearch);
  };

  const removeHistoryHandler = (item: string, event?: Event) => {
    if (event) {
      event.stopPropagation();
    }
    const updatedHistory = removeHistory(item);
    setRecentSearch(updatedHistory);
    local.save(updatedHistory, EStorageKey.HistorySearch);
  };

  const search: Function = async () => {
    window.open(`/#/search?keyword=${keyword}`);
    const updatedHistory = insertHistory(keyword);
    setRecentSearch(updatedHistory);
    local.save(updatedHistory, EStorageKey.HistorySearch);
  };

  const insertHistory = (text: string): Array<string> => {
    const updatedHistory = removeHistory(text);
    updatedHistory.unshift(text);
    if (updatedHistory.length >= 10) {
      updatedHistory.splice(9, updatedHistory.length - 9);
    }
    return updatedHistory;
  };

  const removeHistory = (text: string): Array<string> => {
    const updatedHistory = _.cloneDeep(recentSearch);
    const index = updatedHistory.findIndex((uh: string) => uh === text);
    if (index >= 0) {
      updatedHistory.splice(index, 1);
    }
    return updatedHistory;
  };

  return (
    <div className={`bar-wrapper ${isSubHeader ? 'sub' : 'main'}`}>
      {/* Left section */}
      <div className="bar-navs">
        <Link to="/"><i className="iconfont icon-bilibili" /></Link>
        {
          _navs.map((nav, index) => {
            return <Link key={`nav-item-${index}`} to={nav.to}><div className="nav-item">{nav.label}</div></Link>
          })
        }
      </div>
      {/* middle search */}
      <div className="bar-search-wrapper">
        <div style={{ width: '100%' }}>
          <Popover
            overlayClassName={`pili-header-search ${recentSearch.length === 0 ? 'hide' : ''}`}
            content={
              <SearchHistoryList
                removeHistoryHandler={(item: string, event: Event) => removeHistoryHandler(item, event)}
                selectHandler={(item: string) => selectHistoryHandler(item)}
                data={recentSearch} />
            }
            trigger="click">
            <Input
              value={keyword}
              onChange={(event) => setKeword(event.target.value)}
              onPressEnter={() => search()}
              addonAfter={<i onClick={() => search()} className="iconfont icon-search" />} />
          </Popover>
        </div>
      </div>
      {/* right section */}
      {
        pId
          ? (
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
              <Button >投稿</Button>
          </div>
          )
          : (
          <div>
            <div className="bar-mine">
              <div className="mine-item">登陆</div>
              <div className="mine-item">注册</div>
                <Button >投稿</Button>
            </div>
          </div>
          )
      }
    </div>
  )
}

const mapStateToProps = (state: IGloablStore) => {
  return {
    pId: state.user.pId
  };
};

export default connect(mapStateToProps)(Navigation);