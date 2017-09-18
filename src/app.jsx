import React from 'react';
import './style.scss';
import { combineReducers } from 'redux'
import * as reducers from './reducer';
import * as actions from './action';
import dispatch from 'redux';
import { connect } from 'react-redux';
import ViewContainer from './component/ViewContainer';
import Menubar from './component/Menubar';
import FirstStack from './view/FirstStack.jsx';
import SecondStack from './view/SecondStack.jsx';
import ThirdStack from './view/ThirdStack.jsx';
import FourthStack from './view/FourthStack.jsx';



const Reducer = combineReducers(reducers);

class WechatApp extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { dispatch } = this.props;
        return (
            <section className="WechatApp">
                <ViewContainer>
                    <FirstStack className="StackView"/>
                    <SecondStack />
                    <ThirdStack />
                    <FourthStack />
                </ViewContainer>
                <Menubar />
            </section>
        );
    }
}

const select = (state)=>{
    return {
        currentView:state.currentView
    };
};

export default connect(select)(WechatApp);