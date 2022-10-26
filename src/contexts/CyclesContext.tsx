import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../Reducers/Cycles/reducer"
import { addNewCycleAction, interruptDateAction, markCurrendCycleAction } from "../Reducers/Cycles/action"
import { differenceInSeconds } from "date-fns";


interface CreateCycleData {     // interface para criar um novo ciclo
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {                
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrendCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    InterruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesProps) {

    const [CyclesState, dispatch] = useReducer(cyclesReducer,
        {
            cycles: [],             // aqui se coloca o estado atual das propriedades
            activeCycleId: null,
        }, () => {

            const storageStateAsJSON = localStorage.getItem("@ignite-timer:cycles-state-1.0.0"); //puxando o localstorage

            if (storageStateAsJSON) {
                return JSON.parse(storageStateAsJSON) //se ele enconstrar um localstorage com o mesmo nome retorna oque estava antes
            }
        })

    const { cycles, activeCycleId } = CyclesState  //entrando na tipagem CyclesState e puxando os ciclos e id
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); //percorre os ciclos e encontra um ciclo que o id seja igual ao id do ciclo ativo

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle){
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    })  //estado do countdown para setar os minutos e segundos

    useEffect(() => {            //use effect criado para que quando o CyclesState mudar ele salve no localstorage
        const stateJSON = JSON.stringify(CyclesState)   

        localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON)  //nome e o valor que deseja salvar
    }, [CyclesState])

    function createNewCycle(data: CreateCycleData) {  //função para criar novo ciclo
        const id = String(new Date().getTime());

        const newCycles: Cycle = {              //constante de novo ciclo            
            id,                                     //adicionar id do cicli
            task: data.task,                        //adiciona o nome do ciclo
            minutesAmount: data.minutesAmount,      //adiciona o tempo do ciclo
            startDate: new Date(),                  //adiciona o estado do ciclo
        }

        dispatch(addNewCycleAction(newCycles))

        setAmountSecondsPassed(0)   //sempre que mudar o ciclo o countdown começa do zero
    }

    function markCurrendCycleAsFinished() {
        dispatch(markCurrendCycleAction())
    }

    function InterruptCurrentCycle() {  //função de interromper o ciclo 

        dispatch(interruptDateAction())
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    return (
        <CyclesContext.Provider  //contexto que vai por fora do children aplicando todas as propriedades
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrendCycleAsFinished,
                setSecondsPassed,
                amountSecondsPassed,
                createNewCycle,
                InterruptCurrentCycle,
            }}>
            {children}          
        </CyclesContext.Provider>
    )
}
