import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";7

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from "date-fns/locale";


export function History() {

    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <th>Tarefa</th>
                        <th>Duração</th>
                        <th>Início</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {cycles.map(cycle => {
                            return (
                                <tr key={cycle.id}>           {/*retorna o id do ciclo */}
                                    <td>{cycle.task}</td>      {/*retorna o nome do ciclo */}
                                    <td>{cycle.minutesAmount} minutos</td>        {/*retorna o tempo do ciclo */}
                                    <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                        addSuffix: true,
                                        locale: ptBR,
                                    })}</td>
                                    <td>
                                        {cycle.finishedDate && (<Status statusColor='green'>Concluído</Status>)}
                                        {cycle.interrupteDate && (<Status statusColor='red'>Interrompido</Status>)}
                                        {!cycle.finishedDate && !cycle.interrupteDate && (<Status statusColor='yellow'>Em andamento</Status>)}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}