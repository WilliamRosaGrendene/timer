import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
} from "./styles";

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCycleForm } from "./components/Countdown/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

//controled = mantém sempre atualizado o status dos inputs conforme a mudança que o usuário faz
//uncontroled = mantém atualizado a informação do input somente quando for necessário

/*
    function register(name:string){
        return(
            onChange: () => void,
            onBlur: () => void,
            onFocus: () => void,
            ENTRE OUTROS...
        )
    } 
*/

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "informe a tarefa."),
    minutesAmount: zod.number()
    .min(5, "O ciclo precisa ter no mínimo 5 minutos")
    .max(60, "o ciclo precisa ser de no máximo 60 minutos."),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //sempre que for referenciar uma variável JS no TS tem que usar o typeof

export function Home() {
    
    const { activeCycle, createNewCycle, InterruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({  //constante do validador zod
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    })  //register adiciona um input no formulário

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) { //função de evento de criar novo ciclo 
        createNewCycle(data);
        reset();  
    }

    const task = watch('task') //observando o campo de task, se for diferente de vazio habilita o botão
    const isSubmitDisabled = !task

    return (
        <HomeContainer>  {/* puxando as tags com os styles */}
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                    <FormProvider {...newCycleForm} >
                        <NewCycleForm /> 
                    </FormProvider>
                    <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={InterruptCurrentCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}