import { Menu, Dropdown, Icon } from 'antd';
import {  Link } from 'dva/router'

const userImg = require("../assets/yay.jpg");
const menu = (
  <Menu>
    <Menu.Item>
        <Link to={'/login'}>退出</Link>  
    </Menu.Item>
    <Menu.Item>
        <Link to={'/profile'}>个人中心</Link>  
    </Menu.Item>
  </Menu>
);


const UserSetting = (props => {

  return (
    <Dropdown overlay={menu}>
      <div>
        <img src={userImg} width={42} height={42} />
        <a className="ant-dropdown-link" href="#">
          yuandapeng
          </a>
      </div>

    </Dropdown>
  )

})

export default UserSetting