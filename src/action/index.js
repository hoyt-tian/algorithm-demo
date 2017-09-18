import map from './map';

let changeView = (viewIndex)=>{
    return {
        type:map.ChangeView,
        viewIndex: viewIndex
    };
};

export {changeView};