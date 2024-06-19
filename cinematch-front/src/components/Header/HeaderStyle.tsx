import styled from "styled-components";

const Container = styled.div`
    background-color: #BBE1FA;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
`;

const Logo = styled.div`
    font-size: 2.5rem;
`;

const MenuItems = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
`;

const Item = styled.div`
    padding: 5px;
    margin: 0 3px;
    
    &:hover{
        cursor: pointer;
        transform: scale(1.1);
    }
`;

const UserIcon = styled.div`
    font-size: 1.5rem;

    &:hover{
        cursor: pointer;
    }
`;

export {Container, Logo, MenuItems, UserIcon, Item}