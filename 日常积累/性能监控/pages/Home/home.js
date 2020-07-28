import React from 'react';
import NavLink from 'umi/navlink';
import { Layout, Tooltip, Menu, Icon } from 'antd'
import classNames from 'classnames'
import Link from 'umi/link';
import CheckUserAction from '@/utils/checkUserAction';
import { changeColor } from '@/utils/utils';
import { getMenuMapArrData } from '@/utils/formatMenu';
import HomeSvg from '@/assets/home.svg'
import menuDatas from './menus';
import styles from './index.less'

const { Header, Content, Sider } = Layout;

class HomeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: getMenuMapArrData(menuDatas),
      navMenu: [],
      collapsed: false,
    }
    changeColor();
  }

  static getDerivedStateFromProps(props, state) {
    const { location: { pathname } } = props;
    const { menus } = state;
    const navMenu = menus.find(m => pathname.startsWith(m.path));
    return {
      navMenu,
    };
  }

  componentDidMount () {
    const { history, location: { pathname } } = this.props;
    /**此处为重点 */
    this.checkUser = new CheckUserAction(() => {
      console.log('doen');
    });
    this.checkUser.init();
    /**-------- */
    setTimeout(() => {
      history.push(pathname);
    }, 16);
  }

  // 侧边栏收起事件
  toggle = () => {
    this.setState(preState => (
      { collapsed: !preState.collapsed }
    ));
  };

  // 头部
  getHeader = () => (
    <Header className={styles.header}>
      <div>
        <Icon className={styles.trigger} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
      </div>
      <div className={styles.headerRight}>
        <div className={styles.navMenu}>
          {
            this.state.menus.map(item => (
              <NavLink
                key={item.path}
                to={item.children.length ? item.children[0].path : item.path}
                isActive={() => this.state.navMenu === item}
                className={styles.navMenuItem}
                activeClassName={styles.navMenuItemActive}
              >
                {item.name}
              </NavLink>
            ))
          }
        </div>
        <div className={styles.Tooltips}>
          <Tooltip placement="bottom" title="回到首页" className={styles.Tooltip}>
            <img src={HomeSvg} alt=""/>
          </Tooltip>
        </div>
      </div>
    </Header>
  )

  // 侧边栏
  getMenu = () => {
    const {
      location,
    } = this.props;
    const { navMenu } = this.state;
    if (!navMenu || navMenu.children.length === 0) {
      return null;
    }

    const sideMenus = navMenu.children.map(item => (
      <Menu.Item key={item.path} className={styles.siderMenuItem}>
        <Link to={item.path} className={styles.siderMenuLink}>
          <span className={classNames(styles.siderMenuIcon, 'iconfont', 'icondictionary')}></span>
          <span className={styles.siderMenuText}>{item.name}</span>
        </Link>
      </Menu.Item>
    ))

    return (
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ flex: 1 }}
      >
        {sideMenus}
      </Menu>
    );
  }

  render () {
    const { children } = this.props;
    return (
      <>
        <Layout style={{ height: '100%' }}>
          <Sider
            className={styles.sider}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className={styles.siderLogo} >
              <div className={styles.logo}></div>
            </div>
            {this.getMenu()}
          </Sider>
          <Layout>
            {this.getHeader()}
            <Content className={styles.mainContent}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </>
    )
  }
}

export default HomeLayout;
