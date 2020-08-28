import Emitter from './emitter';
var duration=parseInt(100+1900*Math.random());
const tmp_emitter1=()=>{
     duration=parseInt(100+1900*Math.random());     
     setTimeout(tmp_emitter1,duration);
     Emitter.emit('air_pressure', parseInt(100*Math.random()));
};
setTimeout(tmp_emitter1,duration);


duration=parseInt(100+1900*Math.random());
const tmp_emitter2=()=>{
     duration=parseInt(100+1900*Math.random());
     
     setTimeout(tmp_emitter2,duration);

     Emitter.emit('humidity', parseInt(100*Math.random()));
};
setTimeout(tmp_emitter2,duration);


duration=parseInt(100+1900*Math.random());
const tmp_emitter0=()=>{
     duration=parseInt(100+1900*Math.random());
     
     setTimeout(tmp_emitter0,duration);

     Emitter.emit('temperature', parseInt(30*Math.random()));
};
setTimeout(tmp_emitter0,duration);