import { FormContainer, MinuteAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../../../../contexts/CyclesContext";


export function NewCycleForm() {

    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()


    return (
        <FormContainer>
            <label htmlFor="">Vou trabalhar em</label>
            <TaskInput
                id="task"
                placeholder="Dê um nome para o seu projeto"
                list="task-suggestions"
                disabled={!!activeCycle}
                {...register('task')}  //os 3 pontos pega tudo oque retorna do register e acopla como propriedades na tag
            />

            <datalist id="task-suggestions">
                <option value="sim" />
                <option value="não" />
            </datalist>

            <label htmlFor="">Durante</label>
            <MinuteAmountInput
                type="number"
                id="minutesAmount"
                placeholder="00"
                step={5}
                min={5}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />
            <span>minutos.</span>
        </FormContainer>
    );
}