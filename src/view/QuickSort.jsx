import React from 'react';

import Util from '../Util';

const Type = {
    "setPivot"  :   1,
    "compare"   :   2,
    "swap"      :   3,
    "swapPivot" :   4,
    "searchFromRight" : 5,
    "searchFromLeft" : 6
}

export default class QuickSort extends React.Component{
    constructor(props){
        super(props);
        this.state = this.randomGene(props.data);
    }

    swap(array, a, b){
        const temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    }

    qsort(array, start, end){
        if(start >= end) return;
        let last = {
            type:   Type.setPivot,
            data:   Util.clone(array),
            start:  start,
            end:    end,
            pivot:  start
        };
        this.state.steps.push(last);
        
        
        for(start++; start<end;){
           
            if(array[end] > array[last.pivot]){
                end--;
                this.state.steps.push({
                    type:   Type.searchFromRight,
                    start:  start,
                    data:   Util.clone(array),                    
                    end:    last.end,
                    pivot:  last.pivot
                });
                continue;
            }

            if(array[start] < array[last.pivot]){
                start++;
                this.state.steps.push({
                    type:   Type.searchFromLeft,
                    data:   Util.clone(array),                    
                    start:  start,
                    end:    end,
                    pivot:  last.pivot
                });
                continue;
            }

            this.state.steps.push({
                type: Type.swap,
                data:   Util.clone(array),                
                start:  start,
                end:    end,
                pivot:  last.pivot
            });
            this.swap(array, start++, end--);
            
        }

        if(array[last.pivot] > array[end]){
            this.swap(array, last.pivot, end);   
            this.state.steps.push({
                type:   Type.swapPivot,
                data:   Util.clone(array),
                start:  start,
                end:    end,
                pivot:  last.pivot
            }); 
        }
        
        
        this.qsort(array, last.start, end - 1);
        this.qsort(array, end , last.end);
    }

    next(offset){
        let p = this.state.current + offset;
        if(p<0) p = 0;
        if(p>=this.state.steps.length) p = this.state.steps.length-1;
        this.setState({
            current: p
        });
    }

    randomGene(data){
        if(this.state && this.state.timer_player){
            window.clearInterval(this.state.timer_player);            
        }

        let state = {
            origin : data || Array.from({length:this.props.size|| 10}, ()=>{
                return parseInt( Math.random() * 100 );
            } ),
            steps:[],
            current:-1,
            autoplay:false,
            timer_player: 0
        };
        state.data = Util.clone(state.origin);   
        return state;
    }

    stepIcon(type){
        switch(type){
            case Type.searchFromRight:
                return "从右向左查找";
            case Type.searchFromLeft:
                return "从左向右查找";
            case Type.setPivot:
                return "更新支点元素";
            case Type.swap:
                return "交换位置";
            case Type.swapPivot:
                return "更新支点位置";
        }
    }

    navigator(size){
        return (<section className="inline-block nav">
            <header>All Steps ({this.state.current+1}/{size})</header>
            <ul ref="nav">
                {new Array(size).fill(0).map( (item, index)=>{
                    return (<li key={index} className={this.state.current==index?"active":""} onClick={ ()=>{
                            this.setState({
                                current: index
                            });
                        } }>Step {index+1} - {this.stepIcon(this.state.steps[index].type)}</li>);
                } )}
            </ul>
        </section>);
    }

    componentDidUpdate(){
        const scrollHeight = this.refs.nav.scrollHeight;
        const itemHeight = scrollHeight / this.state.steps.length;

        const aCount = Math.round(this.refs.nav.offsetHeight / itemHeight);
        
        if(this.state.current > aCount/2 ){
            this.refs.nav.scrollTop =  itemHeight * (this.state.current - aCount/2);         
        }
    }

    sorted(data){
        return (<ul>
            {data.map((item, index)=>{
                return (<li key={index}>{item}</li>);
            })}
        </ul>);
    }

    currentItemClass(step, index){
        if(step.start == index) return "leftItem";
        else if(step.end == index) return "rightItem";
        else if(step.pivot == index) return "pivot";
        else return "";
    }

    currentStep(step){
        return (<ul>
            {step.data.map((item, index)=>{
                return (<li key={index} className={this.currentItemClass(step, index)}>{item}</li>);
            })}
        </ul>);
    }

    action(step){
        switch(step.type){
            case Type.searchFromRight:
                return (<span>比较array[pivot:{step.pivot}]={step.data[step.pivot]}和array[{step.end}]={step.data[step.end]}和两个元素</span>);
            case Type.searchFromLeft:
                return (<span>比较array[pivot:{step.pivot}]={step.data[step.pivot]}和array[{step.start}]={step.data[step.start]}和两个元素</span>);
            case Type.setPivot:
                return (<span>设置Pivot为array[{step.pivot}]={step.data[step.pivot]}</span>);
            case Type.swap:
                return (<span>交换array[{step.start}]={step.data[step.start]}和array[{step.end}]={step.data[step.end]}</span>);
            case Type.swapPivot:
                return (<span>交换array[pivot:{step.pivot}]={step.data[step.pivot]}和array[{step.end}]={step.data[step.end]}</span>)
        }
    }

    render(){
        if(this.state.current < 0){
            this.qsort(this.state.data, 0, this.state.data.length - 1);    
            this.state.current = 0;        
        }
        let step = this.state.steps[this.state.current];
        return (<section className="qsort">
            <header>
                <section>
                    <i className="fa fa-step-backward" aria-hidden="true" onClick={()=>{this.next(-1);}}></i>
                    <i className={this.state.autoplay?"fa fa-stop-circle-o":"fa fa-play"} aria-hidden="true" onClick={()=>{
                            if(this.state.autoplay){
                                window.clearInterval(this.state.timer_player);
                                this.setState({
                                    autoplay:false,
                                    timer_player:0
                                });
                            }else{
                                this.setState({
                                    autoplay:true,
                                    timer_player: window.setInterval((function($this){
                                        return ()=>{
                                            $this.next(1);
                                        };
                                    })(this), 1000)
                                });
                            }
                        }}></i>
                    <i className="fa fa-step-forward" aria-hidden="true" onClick={()=>{this.next(1);}}></i>
                    <i className="fa fa-refresh" aria-hidden="true" onClick={()=>{this.setState(this.randomGene());}}></i>
                </section>
                <section>{this.action(step)}</section>
            </header>
            <section>
                {this.navigator(this.state.steps.length)}
                <section className="inline-block"><header>Current</header>{ this.currentStep(step) }</section>
                <section className="inline-block"><header>Origin</header>{ this.sorted(this.state.origin)}</section>
                <section className="inline-block"><header>Final</header>{ this.sorted(this.state.steps[this.state.steps.length - 1].data)}</section>
            </section>
        </section>);
    }
}