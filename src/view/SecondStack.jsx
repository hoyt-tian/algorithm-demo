import React from 'react';
import StackView from '../component/StackView.jsx';


class SecondStack extends StackView{
    constructor(props){
        super(props);
    }

    baseView(){
        return (<section>SecondStack</section>);
    }

}

export default SecondStack;