import { Cycle } from "./reducer";

export enum ActionType {       //dicionário criado para as actions 
    ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
    INTERRUPT_CYCLE = "INTERRUPT_CYCLE",
    MARK_CURREND_CYCLE_AS_FINISHED = "MARK_CURREND_CYCLE_AS_FINISHED",
}

export function addNewCycleAction(newCycles: Cycle){
    return {
        type: ActionType.ADD_NEW_CYCLE,
        payLoad: {
            newCycles,
        },
    }    
}

export function markCurrendCycleAction(){
    return {
        type: ActionType.MARK_CURREND_CYCLE_AS_FINISHED 
    }
}

export function interruptDateAction(){
    return {
        type: ActionType.INTERRUPT_CYCLE
    }
}
