import map from '../action/map';

let currentView = (state, action)=>{
    if(action.type === map.ChangeView){
        return action.viewIndex;
    }
    return state || 0;
};


export {currentView};