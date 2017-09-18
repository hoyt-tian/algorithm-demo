import React from 'react';
import { connect } from 'react-redux';
import {changeView} from '../action';


class Menubar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const dispatch = this.props.dispatch;
        
        const buttons = [
            {key:'经典算法', icon:'fa icon algorithm'},
            {key:'数据结构', icon:'fa icon data-struct'},            
            {key:'实战训练', icon:'fa icon practice'},      
            {key:'关于', icon:'fa fa-info-circle'}            
        ];
       
        return (<section className="Menubar">
            {
                buttons.map( (button, i) => {
                    return (<span  
                    className={this.props.currentView === i?"active":""} 
                    key={button.key} 
                    onClick={ ()=>{ dispatch(changeView(i)) } }>
                            <i className={button.icon} aria-hidden="true"></i>
                            <label>{button.key}</label>
                            </span>);
                })
            }
        </section>);
    }
}


const select = (state)=>{
    return {
        currentView:state.currentView
    };
};

export default connect(select)(Menubar);