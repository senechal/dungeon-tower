import styled from 'styled-components';
import { PixelArt } from '../game/game.styles';
import dialogBg from '@images/dialog.png'


export const DialogContainer = styled.div`
    width: 100%;
    height: calc(var(--grid-cell) * 2);
    position: absolute;
    bottom: var(--grid-cell);
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
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

export const DialogBox = styled(PixelArt)`
    display: flex;
    flex-direction: column;
    background: url(${dialogBg}) no-repeat no-repeat;
    background-size: 100% 100%;
    height: 100%;
    width: calc(var(--viewport-width) * 0.8);
    font-family: '04b_03',Lato,LatoExtended,sans-serif;
    color: var(--dialog-text-color);
    padding: 24px;
    box-sizing: border-box;


    & > h1 {
        margin-top: 0px;
        margin-bottom: 8px;

    }

    & > p {
        margin-top: 0px;
        margin-bottom: 8px;
        flex-grow: 1;
    }
`;

export const DialogButton = styled.button`
    border: 0px;
    display: inline-block;
    background-color: unset;
    color: var(--dialog-text-color);
    padding: 8px 16px;
    margin-left: auto;
    font-family: '04b_03',Lato,LatoExtended,sans-serif;
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