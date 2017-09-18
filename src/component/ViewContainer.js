import React from 'react';
import { connect } from 'react-redux';
import Util from '../Util';

class ViewContainer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        
        const children = [];
        const active = this.props.currentView || 0;
        React.Children.forEach(this.props.children, (child, idx)=>{
            children.push(React.cloneElement(child, {
                key:idx,
                className : Util.addClass(Util.removeClass(Util.removeClass(child.props.className, "display"), "hide"), idx === active ? "display":"hide")
            }) )
            ;
        } );
        
        return React.createElement('section',{
            className:"ViewContainer"
        }, children);
    }
}

const select = (state)=>{
    return {
        currentView:state.currentView
    };
};

export default connect(select)(ViewContainer);