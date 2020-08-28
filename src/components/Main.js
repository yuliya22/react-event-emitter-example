import React,{useState,useLayoutEffect } from 'react'
import Emitter from '../services/emitter';
import conditionObserver from './conditionObserver';

import '../styles/Main.css';
import {stateSetter} from '../services/stateService';
const Main=()=> {
    const [condition, setCondition] = useState(conditionObserver.initialState);
    conditionObserver.init();
    useLayoutEffect(()=> {
        conditionObserver.subscribe(setCondition);
        
      },[]);
    
    return (
        <div className="main">
            <h3>Main content</h3>
            <h5>Temperature:{condition.temperature}</h5>
            <h5>Air Pressure:{condition.air_condition}</h5>
            <h5>Humidity:{condition.humidity}</h5>
        </div>
    )

};

export default Main