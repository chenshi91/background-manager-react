import React from 'react';
import {  Layout, Menu, theme,Tabs } from 'antd';
import { Outlet } from 'react-router-dom';
import Msg from '../../components/msg'
import {useHooks} from "./hooks"
import "./index.css"


const { Header, Content, Footer, Sider } = Layout;


const App: React.FC = () => {

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const {collapsed,setCollapsed,menuSelectedKey,menuOnSelect,items,openKeys,onOpenChange,
    tabsItems,tabsActiveKey,tabsOnTabClick
  }=useHooks()

  

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor:'pink'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} collapsedWidth={40} width={120} >
        <Menu theme="dark" selectedKeys={menuSelectedKey} mode="inline" items={items}  onSelect={menuOnSelect} openKeys={openKeys} onOpenChange ={onOpenChange}/>
      </Sider>
      
      <Layout style={{border:"1px solid pink",paddingBottom:0, marginBottom:0}}>
        <Header style={{ padding: 0, background: colorBgContainer ,height:'30px'}} >
          <Tabs items={tabsItems} type='editable-card' size='small' hideAdd={true} activeKey={tabsActiveKey} onTabClick={tabsOnTabClick} tabBarGutter={10}></Tabs>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          
          <div
            style={{
              padding: 24,
              minHeight: 360,
              maxHeight:500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
            
          </div>
        </Content>
        <Footer style={{ textAlign: 'center',backgroundColor:'guy',height:48 }}>
          blog-admin-manager-system developed by chenshi at 2026
        </Footer>

        <Msg sendMsg={()=>console.info("home sendMsg")}></Msg>
      </Layout>
    </Layout>
  );
};

export default App;