import React from 'react';

class Dialog extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (<section className="dialog">
            <header><i className="fa fa-window-close" aria-hidden="true" onClick={ ()=>{this.props.container.popView()}} ></i></header>
            {this.props.children}
        </section>);
    }
}

export default Dialog;