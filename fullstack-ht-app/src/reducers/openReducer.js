const openReducer = (state = '', action) => {
    switch(action.type) {
      case 'OPEN_MENY':
        return action.data;
      default:
        return state;
    }
  };

export const openMenu = open => {
    return {
        type: 'OPEN_MENU',
        data: open
    };
};


export default openReducer;