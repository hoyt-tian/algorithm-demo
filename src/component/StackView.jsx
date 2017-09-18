import React from 'react';
import Util from '../Util';


class StackView extends React.Component{
    constructor(props){

        super(props);

        let views = this.props.children || [];
        this.state = {
            views : views instanceof Array ? views : [views]
        };
    }

    render(){
        let children = [];

       this.state.views.forEach( (child, idx)=>{
            children.push(React.cloneElement(child, {
                key:idx,
                className : Util.addClass(Util.removeClass(Util.removeClass(child.props.className, "display"), "hide"), idx == this.state.views.length -1  ? "display":"hide")
            }) )
            ;
        } );
        
        return React.createElement('section', {
            className : this.props.className
        }, children);
    }

    pushView(view){
        this.setState({
            views : this.state.views.concat(view)
        });
    }

    popView(){
        if(this.state.views.length){
            let view = this.state.views[this.state.views.length - 1];
            this.setState({
                views: Array.prototype.slice.call(this.state.views, 0, this.state.views.length -1)
            });
            return view;
        }
        return null;
    }

    baseView(){
        return null;
    }
    componentWillMount(){
        let baseView = this.baseView();
        if(baseView){
            this.pushView(baseView);
        }
    }
}

export default StackView;