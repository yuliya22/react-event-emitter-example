import React from 'react'
import Emitter from '../services/emitter';


import '../styles/Main.css';
import {stateSetter} from '../services/stateService';
class Main extends React.Component {
    
    constructor(props) {
        super(props);
        const time=(new Date).getTime();
        this.state = { air_condition: '',
        air_condition_time:time,
        humidity:'',
        humidity_time:time,
        temperature:'',
        temperature_time:time,
        time:0,
        status:0
        };
        this.setter = stateSetter(this);
        setTimeout(this.temperature_na,1000);
        setTimeout(this.air_condition_na,1000);
        setTimeout(this.humidity_na,1000);
    }
    componentWillUnmount() {
        this.setter.cancel();
    }
    componentDidMount() {
        Emitter.on('air_pressure',(newValue)=> this.pre_emit(1,newValue));
        Emitter.on('humidity', (newValue)=> this.pre_emit(2,newValue));
        Emitter.on('temperature', (newValue)=> this.pre_emit(0,newValue));
    }
    temperature_na=()=>{
        if((new Date()).getTime()-this.state.temperature_time>=1000)
            this.setter.setState({temperature:'N/A'});
    }
    air_condition_na=()=>{
        if((new Date()).getTime()-this.state.air_condition_time>=1000)
            this.setter.setState({air_condition:'N/A'});
    }
    humidity_na=()=>{
        if((new Date()).getTime()-this.state.humidity_time>=1000)
            this.setter.setState({humidity:'N/A'});
    }
    pre_emit=(item,newValue)=>{
        // console.log(this.state);
        const time=(new Date).getTime();
        switch(item){
            case 0:{
                this.setter.setState({...this.state,temperature:newValue,temperature_time:time});
                setTimeout(this.temperature_na,1000);
                break;
            }
            case 1:{
                this.setter.setState({...this.state,air_condition:newValue,air_condition_time:time});
                setTimeout(this.air_condition_na,1000);
                break;
            }
            case 2:{                
                this.setter.setState({...this.state,humidity:newValue,humidity_time:time});
                setTimeout(this.humidity_na,1000);

                break;
            }
        }
        
        if(time-this.state.time<100 && this.state.status===0){
            setTimeout(this.emitOut,100-time+this.state.time);
            this.setter.setState({statue:1});
        }
        this.setter.setState({
            time:time
        });
      
    }
    emitOut=()=>{
        Emitter.emit('display', {temperature:this.state.temperature,
            air_condition:this.state.air_condition,
            humidity:this.state.humidity
        });
        
        this.setter.setState({
            status:0
        })
    }
 
    
    render() {
        return (
            <div className="main">
                <h3>Main content</h3>
                <h5>Temperature:{this.state.temperature}</h5>
                <h5>Air Pressure:{this.state.air_condition}</h5>
                <h5>Humidity:{this.state.humidity}</h5>
            </div>
        )
    } 
}

export default Main