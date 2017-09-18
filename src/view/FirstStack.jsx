import React from 'react';
import StackView from '../component/StackView.jsx';
import AlgorithmView from './AlgorithmView.jsx';

class FirstStack extends StackView{
    constructor(props){
        super(props);
    }

    baseView(){
        return (<AlgorithmView container={this}></AlgorithmView>);
    }

}

export default FirstStack;