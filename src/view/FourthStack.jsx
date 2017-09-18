import React from 'react';
import StackView from '../component/StackView.jsx';

class FourthStack extends StackView{
    constructor(props){
        super(props);
    }

    baseView(){
        return (<section>Fourth</section>);
    }

}

export default FourthStack;