import styled from 'styled-components'

export const HistoryContainer = styled.main `
    flex: 1;
    padding: 3.5rem;
    display: flex;
    flex-direction: column;
    
    h1{
        font-size: 1.5rem;
        color: ${props => props.theme['gray-100']};
    }
`;

export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem; 

    table{
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;

        th{
            background-color: ${props => props.theme['gray-600']};
            padding: 1rem;
            text-align: left;
            color: ${props => props.theme['gray-100']};
            font-size: 0.875;
            line-height: 1.6;

            &:first-child {
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }

            &:last-child {
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }
        }

        td {
            background-color: ${props => props.theme['gray-700']};
            border-top: 4px solid ${props => props.theme['gray-800']};
            padding: 1rem;
            line-height: 1.6;
            font-size: 0.875rem;

            &:first-child {
                width: 50%;
                padding-left: 1.5rem;
            }

            &:last-child {
                padding-right: 1.5rem;
            }
        }
    }
`;

const STATUS_COLORS = {        //criando um objeto com as cores que serão usadas na tabela 
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500',
} as const      // eu falei que eu quero que meus objetos sejam literalmente oque eu escrevi para cada um deles 
                //assim puxando eles lá do meu array de cores

interface StatusProps {
    statusColor: keyof typeof STATUS_COLORS;  //interface recebe as keys(keyof) do tipo(typeof) STATUS_COLORS
}

export const Status = styled.span<StatusProps> `  //meus styles.span recebe a tipagem StatusProps para o before
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: ${props => props.theme[STATUS_COLORS[props.statusColor]]};
    }
`;