import styles from './index.less';
import Login from "@/pages/login";
import React from "react";
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import SideMenu from "./SideMenu";

const { Header, Sider, Content } = Layout;

 class BasicLayout extends React.Component {
  state = {
    collapsed: false,
    mode:"inline"
  };
  //控制菜单显示
  onCollapse = () => {
    const {collapsed}=this.state;
    this.setState({
      collapsed:!collapsed,
      mode: !collapsed ? 'vertical' : 'inline',
    });
  }

  componentDidMount() {
    const {
      dispatch,
      route: { routes },
    } = this.props;
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes },
    });
  }

  render() {
    const {
      login,
      children,
      menu:{
        menuData,
        flatMenuKeys
      }
    } = this.props;
    const {mode}=this.state;
    // if(!login){    
    //  return <Login/> 
    // }
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <SideMenu
            mode={mode}
            flatMenuKeys={flatMenuKeys}
            menuData={menuData}
            {...this.props}
          />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.onCollapse}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default connect(({ menu }) => ({ menu }))(BasicLayout)