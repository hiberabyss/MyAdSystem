import { useState } from 'react';
import { Layout, Menu } from '@arco-design/web-react';
import { IconHome, IconCalendar } from '@arco-design/web-react/icon';
import {
  useNavigate,
  Routes,
  Route,
} from 'react-router-dom';

import AdList from './page/adlist';
import Home from './page/home';

const MenuItem = Menu.Item;
const Sider = Layout.Sider;
const Content = Layout.Content;
const collapsedWidth = 60;
const normalWidth = 220;

const menuItems = [
  {
    key: "/",
    title: "首页",
    icon: <IconHome />,
  },
  {
    key: "/ad",
    title: "广告",
    icon: <IconCalendar />,
  },
]

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [siderWidth, setSiderWidth] = useState(normalWidth);

  const navigate = useNavigate()

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
    setSiderWidth(collapsed ? collapsedWidth : normalWidth);
  };

  const handleMoving = (_: MouseEvent, { width }: any) => {
    if (width > collapsedWidth) {
      setSiderWidth(width);
      setCollapsed(!(width > collapsedWidth + 20));
    } else {
      setSiderWidth(collapsedWidth);
      setCollapsed(true);
    }
  };

  function handleMenuClick(key: string) {
    navigate(key)
  }

  return (
      <Layout className='byte-layout-collapse-demo' style={{ height: '100%' }}>
        <Sider
          collapsible
          theme='dark'
          onCollapse={onCollapse}
          collapsed={collapsed}
          width={siderWidth}
          resizeBoxProps={{
            directions: ['right'],
            onMoving: handleMoving,
          }}
        >
          <div className='logo' />
          <Menu
            theme='dark'
            autoOpen
            onClickMenuItem={handleMenuClick}
            style={{ width: '100%' }}
          >
            {
              menuItems.map((item) => (
                <MenuItem key={item.key}>
                  {item.icon}
                  {item.title}
                </MenuItem>
              ))
            }
          </Menu>
        </Sider>
        <Content style={{
          background: 'rgb(240,255,255)',
          textAlign: 'center',
          padding: '30px',
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ad" element={<AdList />} />
          </Routes>
        </Content>
      </Layout>
  );
}

export default App;
