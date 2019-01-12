import { Menu, Icon } from 'antd';
import { PureComponent } from "react";
import { isUrl, urlToList } from "@/utils/util";
import Link from 'umi/link';
import pathToRegexp from 'path-to-regexp';
const { SubMenu } = Menu;
const getFlatMenuKeys = (menuData, keys = []) => {
    menuData.forEach(item => {
        keys.push(item.path);
        if (item.children) {
            getFlatMenuKeys(item.children, keys);
        }
    });
    return keys;
};


/**
 * 获得菜单子节点
 * @memberof SiderMenu
 */
export const getDefaultCollapsedSubMenus = props => {
    const {
      location: { pathname },
      flatMenuKeys,
    } = props;
    return urlToList(pathname)
      .map(item => getMenuMatches(flatMenuKeys, item)[0])
      .filter(item => item);
  };
  


// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
    if (typeof icon === 'string' && isUrl(icon)) {
        // return <img src={icon} alt="icon" className={styles.icon} />;
        return <img src={icon} alt="icon"  />;
    }
    if (typeof icon === 'string') {
        return <Icon type={icon} />;
    }
    return icon;
};
// Get the currently selected menu
const getSelectedMenuKeys = (pathname, flatMenuKeys) => {
    return urlToList(pathname)
        .map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
};
//过滤出合法的url
const getMenuMatches = (flatMenuKeys, path) =>
    flatMenuKeys.filter(item => {
        if (item) {
            return pathToRegexp(item).test(path);
        }
        return false;
    });


export default class SideMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: []
        }
    }
    //控制菜单展开收起
    handleOpenChange = openKeys => {
        this.setState({
          openKeys
        });
    };
    
    /**
     * 渲染菜单
     */
    renderNavMenuItems = (menuData) => {
        if (!menuData) {
            return [];
        }
        return menuData
            .map(item => this.getSubMenuOrItem(item))
            .filter(item => item);
    }
    
    /**
     * 从props获取openKeys
     * @param {*} props 
     * @param {*} state 
     */
    static getDerivedStateFromProps(props, state) {
        if((props.flatMenuKeys != state.flatMenuKeys) || (props.location.pathname != state.pathname)){
            return {
                flatMenuKeys:props.flatMenuKeys,
                pathname:props.location.pathname,
                openKeys: getDefaultCollapsedSubMenus(props),
            };    
        }
         return state
    }

    //获取子菜单
    getSubMenuOrItem = (item) => {
        if (item.children && item.children.some(child => child.name)) {
            const { name } = item;
            return (
                <SubMenu
                    title={
                        item.icon ? (
                            <span>
                                {getIcon(item.icon)}
                                <span>{name}</span>
                            </span>
                        ) : (
                                name
                            )
                    }
                    key={item.path}
                >
                    {this.renderNavMenuItems(item.children)}
                </SubMenu>
            );
        }

        return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
    }

    conversionPath = path => {
        if (path && path.indexOf('http') === 0) {
            return path;
        }
        return `/${path || ''}`.replace(/\/+/g, '/');
    };
    /**
     * 判断是否是http链接.返回 Link 或 a
     * Judge whether it is http link.return a or Link
     * @memberof SiderMenu
     */
    getMenuItemPath = item => {
        const { name } = item;
        const itemPath = this.conversionPath(item.path);
        const icon = getIcon(item.icon);
        const { target } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                    {icon}
                    <span>{name}</span>
                </a>
            );
        }
        const { location, isMobile, onCollapse } = this.props;
        return (
            <Link
                to={itemPath}
                target={target}
                replace={itemPath === location.pathname}
                onClick={
                    isMobile
                        ? () => {
                            onCollapse(true);
                        }
                        : undefined
                }
            >
                {icon}
                <span>{name}</span>
            </Link>
        );
    };


    render() {
        const  {
            mode,
            flatMenuKeys,
            location:{pathname}
        }=this.props;
        let selectedKeys = getSelectedMenuKeys(pathname,flatMenuKeys);
        return (
            <Menu
                mode={mode}
                selectedKeys={selectedKeys}
                onOpenChange={this.handleOpenChange}
                theme="dark"
                openKeys={this.state.openKeys}
            >
                {this.renderNavMenuItems(this.props.menuData)}
            </Menu>
        )
    }
}