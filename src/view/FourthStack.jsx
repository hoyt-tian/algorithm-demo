import React from 'react';
import StackView from '../component/StackView.jsx';

class FourthStack extends StackView{
    constructor(props){
        super(props);
    }

    baseView(){
        return (<section>
            <p>Github: <a href="https://github.com/hoyt-tian/algorithm-demo" target="_blank">https://github.com/hoyt-tian/algorithm-demo</a></p>
            <p>博客: <a href="https://www.hoyt-tian.com/" target="_blank">https://www.hoyt-tian.com/</a></p>
        </section>);
    }

}

export default FourthStack;