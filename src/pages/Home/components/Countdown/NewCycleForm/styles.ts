import styled from 'styled-components';

export const FormContainer = styled.div `
    width: 100%;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme['gray-100']};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`;

const BaseInput = styled.input`  //criando uma constante com os styles gerais de um input
    background: transparent;
    height: 2.5rem;
    border: none;
    border-bottom: 2px solid ${props => props.theme['gray-500']};
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    color: ${props => props.theme['gray-100']};
`;

export const TaskInput = styled(BaseInput)`
    flex: 1;

    &::-webkit-calendar-picker-indicator{
        display: none !important;
    }
`;

export const MinuteAmountInput = styled(BaseInput)`
    width: 4rem;
`;
