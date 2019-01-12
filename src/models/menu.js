
//将routes转换为menu数据结构
function convertMenu(data) {
    return data
      .map(item => {
        if (!item.name || !item.path) {
          return null;
        }
        const result = {
          ...item,
          name: item.name
        };
        if (item.routes) {
          const children = convertMenu(item.routes);
          // Reduce memory usage
          result.children = children;
        }
        delete result.routes;
        return result;
      })
      .filter(item => item);
  }


/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 * 去除隐藏元素
 * 
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item=>item.name && !item.hideInMenu)
    .map(item =>  getSubMenu(item))
    .filter(item => item);
};

const getFlatMenuKeys = (menuData, keys = []) => {
    menuData.forEach(item => {
        keys.push(item.path);
        if (item.children) {
            getFlatMenuKeys(item.children, keys);
        }
    });
    return keys;
};


export default {
  namespace: 'menu',

  state: {
    menuData: [],
    flatMenuKeys:[]
  },

  effects: {
    *getMenuData({ payload }, { put }) {
      const { routes } = payload;
      const  menuData= filterMenuData(convertMenu(routes));
      const  flatMenuKeys = getFlatMenuKeys(menuData);
      yield put({
        type: 'save',
        payload: { menuData,flatMenuKeys },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
