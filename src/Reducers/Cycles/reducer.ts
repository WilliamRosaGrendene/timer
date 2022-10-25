import { ActionType } from "./action";

import { produce } from "immer"

export interface Cycle {  //interface dos ciclos 
    id: string;  //id do ciclo
    task: string; //nome do ciclo
    minutesAmount: number;  //tempo de duração do ciclo
    startDate: Date;    //começo do countdown
    interrupteDate?: Date;  //interrupção do ciclo
    finishedDate?: Date;    //finalização do ciclo
}


interface CyclesState {  //tipagem do estado dos ciclos
    cycles: Cycle[]
    activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any){ 
    switch (action.type) {  // switch é tipo um while, percorre as cases dependendo da ação(action)selecionada
        case ActionType.ADD_NEW_CYCLE:
            return produce(state, draft => {
                draft.cycles.push(action.payLoad.newCycles)
                draft.activeCycleId = action.payLoad.newCycles.id
            })
        case ActionType.INTERRUPT_CYCLE:{

            const currentCycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId
            })

            if(currentCycleIndex < 0){
                return state
            }

            return produce(state, (draft) => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].interrupteDate = new Date()
            })
        } 
        case ActionType.MARK_CURREND_CYCLE_AS_FINISHED:
            const currentCycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId
            })

            if(currentCycleIndex < 0){
                return state
            }

            return produce(state, (draft) => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].finishedDate = new Date()
            })
        } 

    return state
}