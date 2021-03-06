import React from 'react';
import Dialog from '../component/Dialog.jsx';
import QuickSort from './QuickSort.jsx';


class AlgorithmView extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
    
        return (
            <article className={this.props.className}>

                <section>
                    <header>排序算法</header>
                    <ul>
                        <li onClick={()=>{
                            this.props.container.pushView(<Dialog container={this.props.container}>
                                <QuickSort />
                            </Dialog>)
                            }}>快速排序</li>
                    </ul>
                </section>

            </article>
       );
    }
}


export default AlgorithmView;
