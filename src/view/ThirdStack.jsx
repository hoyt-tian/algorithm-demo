import React from 'react';
import StackView from '../component/StackView.jsx';

class ThirdStack extends StackView{
    constructor(props){
        super(props);
    }

    baseView(){
        return (<section>待更新</section>);
    }

}

export default ThirdStack;