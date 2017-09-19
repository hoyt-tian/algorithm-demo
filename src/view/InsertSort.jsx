import React from 'react';

import Util from '../Util';

const Type = {
    "setSentry"     :   1,
    "findPos"       :   2,
    "insertSentry"  :   3
}

export default class InsertSort extends React.Component{
    constructor(props){
        super(props);
        this.state = this.randomGene(props.data);
    }

    sort(array){
        for(let i = 1, j; i<array.length; i++){
           
            let j = i;
            const sentry = array[i];
            this.state.steps.push({
                type: Type.setSentry,
                sentry: sentry,
                i:      i,
                j:      j,
                data: Util.clone(array)
            });
            while(j>0){
                if(array[j-1] > sentry){
                    array[j] = array[j-1];
                    j--;

                    this.state.steps.push({
                        type: Type.findPos,
                        sentry: sentry,
                        i:      i,
                        j:      j,
                        data: Util.clone(array)
                    });
                }else{
                    break;
                }
            }
            array[j] = sentry;  
            this.state.steps.push({
                type: Type.insertSentry,
                sentry: sentry,
                i:      i,
                j:      j,
                data: Util.clone(array)
            });          
        }
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
            case Type.setSentry:
                return "设置哨兵";
            case Type.findPos:
                return "寻找插入位";
            case Type.insertSentry:
                return "插入哨兵";
            case Type.insertDirect:
                return "直插队尾";
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
        if(step.i == index) return "leftItem";
        else if(step.j == index) return "rightItem";
        else return "";
    }

    currentStep(step){
        return (<ul> {step.hasOwnProperty("sentry")?(<li key="sentry">哨兵：{step.sentry}</li>):""}
            {step.data.map((item, index)=>{
                return (<li key={index} className={this.currentItemClass(step, index)}>{item}</li>);
            })}
        </ul>);
    }

    action(step){
        switch(step.type){
            case Type.setSentry:
                return (<span>设置第{step.i}个元素为哨兵, array[{step.i}] = {step.data[step.i]}</span>);
            case Type.findPos:
                return (<span>比较array[哨兵:{step.i}]={step.data[step.i]}和array[{step.j}]={step.data[step.j]}和两个元素</span>);
            case Type.insertSentry:
                return (<span>插入哨兵到array[{step.j}]={step.data[step.j]}</span>);
            case Type.insertDirect:
                return (<span>新元素array[{step.i}]={step.data[step.i]}直接插入队尾</span>);
        }
    }

    render(){
        if(this.state.current < 0){
            this.sort(this.state.data, 0, this.state.data.length - 1);    
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