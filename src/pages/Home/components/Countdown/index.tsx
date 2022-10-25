import { useContext, useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from "../../../../contexts/CyclesContext";


export function Countdown() {

    const { activeCycle, activeCycleId, markCurrendCycleAsFinished, amountSecondsPassed, setSecondsPassed } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(() => { //efeito para mudar o estado do contador   
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), new Date(activeCycle.startDate))

                if (secondsDifference >= totalSeconds) {
                    markCurrendCycleAsFinished()
                    setSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondsPassed(secondsDifference)
                }
            }, 1000)
        }
        return () => {
            clearInterval(interval);
        }
    }, [activeCycle, totalSeconds, activeCycleId, markCurrendCycleAsFinished, setSecondsPassed])

    const currendSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minuesAmount = Math.floor(currendSeconds / 60)
    const secondsAmount = currendSeconds % 60

    const minutes = String(minuesAmount).padStart(2, "0")
    const seconds = String(secondsAmount).padStart(2, "0")

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}