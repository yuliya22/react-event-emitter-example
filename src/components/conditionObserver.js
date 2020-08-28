import Emitter from '../services/emitter';
import '../services/emitterService';
import { Subject } from 'rxjs';
const subject = new Subject();
let time=(new Date).getTime();
const initialState = {
    air_condition: '',
    air_condition_time:time,
    humidity:'',
    humidity_time:time,
    temperature:'',
    temperature_time:time,
    time:0,
    status:0
  };
let state = initialState;
const temperature_na=()=>{
    if((new Date()).getTime()-state.temperature_time>=1000)
        state.temperature='N/A';
};
const air_condition_na=()=>{
    if((new Date()).getTime()-state.air_condition_time>=1000)
        state.air_condition='N/A';
};
const humidity_na=()=>{
    if((new Date()).getTime()-state.humidity_time>=1000)
        state.humidity='N/A';
};
const pre_emit=(item,newValue)=>{
    const time=(new Date).getTime();
    switch(item){
        case 0:{
            state.temperature=newValue;
            state.temperature_time=time;
            setTimeout(temperature_na,1000);
            break;
        }
        case 1:{
            state.air_condition=newValue;
            state.air_condition_time=time;
            setTimeout(air_condition_na,1000);
            break;
        }
        case 2:{  
            state.humidity=newValue;
            state.humidity_time=time;              
            setTimeout(humidity_na,1000);

            break;
        }
    }
    
    if(time-state.time<100 && state.status===0){
        setTimeout(emitOut,100-time+state.time);
        state.status=1;
    }
    state.time=time;        
  
};
var emitOut=()=>{
    state.status=0;
    subject.next(state);
};
const conditionObserver= {

   
    subscribe: setState =>{     

        return subject.subscribe(setState);
    } ,
    
    init: () => {
        state = {
            air_condition: '',
            air_condition_time:time,
            humidity:'',
            humidity_time:time,
            temperature:'',
            temperature_time:time,
            time:0,
            status:0};
            subject.next(state);
            setTimeout(temperature_na,1000);
            setTimeout(air_condition_na,1000);
            setTimeout(humidity_na,1000);
            Emitter.on('air_pressure',(newValue)=> pre_emit(1,newValue));
            Emitter.on('humidity', (newValue)=> pre_emit(2,newValue));
            Emitter.on('temperature', (newValue)=> pre_emit(0,newValue));
        },  
    

    initialState
    
    
}

export default conditionObserver;