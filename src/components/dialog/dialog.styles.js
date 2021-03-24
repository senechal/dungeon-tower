import styled from 'styled-components';
import { PixelArt } from '../game/game.styles';
import dialog from '@images/dialog.png'
import dialogBig from '@images/dialog-big.png'


export const DialogBox = styled(PixelArt)`
    position: relative;
    display: flex;
    flex-direction: column;

    height: 100%;
    width: calc(var(--viewport-width) * 0.8);
    color: var(--dialog-text-color);
    padding: 1.5rem;
    box-sizing: border-box;

    & h1 {
        margin-top: 0px;
        margin-bottom: 0.5rem;
        font-size: 1.7rem;
    }
    & h2 {
        margin-top: 0px;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
    }
    & h3 {
        margin-top: 0px;
        margin-bottom: 0.5rem;
        font-size: 1.3rem;
    }

    & p {
        margin-top: 0px;
        margin-bottom: 0.5rem;
        flex-grow: 1;
        font-size: 1rem;
    }
`;

export const DialogContainer = styled.div`
    width: 100%;
    height: calc(var(--grid-cell) * 2);
    position: absolute;
    bottom: var(--grid-cell);
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;

    & ${DialogBox}{
        background: url(${dialog}) no-repeat no-repeat;
        background-size: 100% 100%;
    }
`;

export const CenterContainer = styled.div`
    --container-size: calc(var(--grid-cell) * 4.8);
    width: 100%;
    height: var(--container-size);
    position: absolute;
    top: var(--grid-cell);
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;

    & ${DialogBox}{
        background: url(${dialogBig}) no-repeat no-repeat;
        background-size: 100% 100%;
    }
`;

export const Overlay = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.5;
    position: absolute;
    top:0;
    bottom:0;
`;

export const DialogButton = styled.button`
    border: 0px;
    display: inline-block;
    background-color: unset;
    color: var(--dialog-text-color);
    padding: 0.3rem 1rem;
    margin-left: auto;
    font-family: '04b_03',Lato,LatoExtended,sans-serif;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 8px;
    border: 2px solid transparent;

    &:hover{
        background-color: var(--dialog-button-hover-bg-color);
    }

    &:focus {
        outline-offset: 0px !important;
        outline: none !important;
        border: 2px solid var(--viewport-border);
    }
`;