import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { customerDisplay } from "../pages";
import _ from 'lodash';

function useKeepTrack(trackingValue:customerDisplay,setTrackingValue:  Dispatch<SetStateAction<customerDisplay>> ) {
  const trackRecord = useRef<customerDisplay[]>([]);
  const currentIndex = useRef(-1);
  const justUndo = useRef(false);
  const justRedo = useRef(false);
  function undo(){
    currentIndex.current--;
    if(currentIndex.current < 0) { /* can not undo further */
      currentIndex.current = 0
      return;
    }  
    setTrackingValue(trackRecord.current[currentIndex.current])
    justUndo.current = true;
  }

  function redo(){
    currentIndex.current++;
    if(currentIndex.current === trackRecord.current.length){
      currentIndex.current = trackRecord.current.length-1;
      return;
    }
    setTrackingValue(trackRecord.current[currentIndex.current]);
    justRedo.current = true;
  }

  function recordChange(){
    trackRecord.current = [...trackRecord.current.slice(0,currentIndex.current+1)];
    trackRecord.current[trackRecord.current.length] = trackingValue;
    currentIndex.current = trackRecord.current.length - 1;
  }
  
  function updateTrackRecord(){
    if(currentIndex.current !== (trackRecord.current.length-1) && (!_.isEqual(trackingValue,trackRecord.current[currentIndex.current])) &&  (!_.isEqual(trackingValue,trackRecord.current[currentIndex.current + 1]))){
      /* if a user undo and does not redo but instead make a new change */
      recordChange()
      return;
    }

    if(justUndo.current || justRedo.current ){ /* dont need to update Record if just undo or redo */
      justUndo.current = false;
      justRedo.current = false;
      return;
    }
    
    trackRecord.current[trackRecord.current.length] = trackingValue;
    currentIndex.current++
  }

  useEffect(()=>{
    updateTrackRecord()
  },[trackingValue])
  return { undo,redo }; 
}

export default useKeepTrack;