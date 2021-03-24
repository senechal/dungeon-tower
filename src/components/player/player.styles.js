import styled from 'styled-components';

import icons from '@images/icons.png';
import { PixelArt } from '@components/game/game.styles';
import { CenterContainer, DialogButton } from '@components/dialog/dialog.styles';
export { Overlay, DialogBox as Window, DialogContainer }  from '@components/dialog/dialog.styles';


export const StatusContainer = styled(CenterContainer)`
    & .react-tabs__tab--selected {
        background-color: var(--viewport-bg-color);
        color: var(--dialog-button-hover-bg-color);
        border-color: var(--dialog-text-color);
    }

    & .react-tabs__tab-list{
        border-color: var(--dialog-text-color);
        color: var(--dialog-button-hover-bg-color);
    }
    & .react-tabs__tab:focus:after{
        background-color: var(--viewport-bg-color);
    }
`;

export const Icon = styled(PixelArt)`
    --icon-grid-cell: var(--grid-cell);
    --x-pos: calc(var(--icon-grid-cell) * -${({x}) => x });
    --y-pos: calc(var(--icon-grid-cell) * -${({y}) => y });
    width: var(--icon-grid-cell);
    height: var(--icon-grid-cell);
    position: relative;
    overflow:hidden;
    &::after {
        content: "";
        position: absolute;
        background: url(${icons}) var(--x-pos) var(--y-pos) no-repeat;
        background-size: calc( var(--icon-grid-cell) * 16 );
        width: calc( var(--icon-grid-cell) * 1 );
        height: calc( var(--icon-grid-cell) * 1 );
    }
`;

export const IconSmall = styled(Icon)`
    --icon-grid-cell: calc(var(--grid-cell) * 0.5);
`;


export const StatusIcon = styled(Icon)`
    position: absolute;
    --x-pos: calc(var(--grid-cell) * -10);
    --y-pos: calc(var(--grid-cell) * -13);
    bottom: 0;
    left: 0;
    cursor: pointer;
`;


export const CloseButton = styled(DialogButton)`
    position: absolute;
    padding: 0.3rem 0.5rem;
    right: 1.5rem;
    top: 1.4rem;
`;

export const TabContent = styled.div`
    display: flex;
    justify-content: center;
    height: calc(var(--container-size) - 6rem);
`

export const StatusContent = styled.section`
    flex-basis: 50%;
    padding: 0.5rem;
    max-height: 100%;
    overflow: auto;
    &:last-of-type{
        border-left: 1px dashed var(--dialog-text-color);
    }
`;

export const ItemCell = styled.div`
    position: relative;
    width: calc(var(--grid-cell) * 0.5);
    height: calc(var(--grid-cell) * 0.5);
    background-color: var(--dialog-text-color);
    margin: calc(1rem / 8);
    &::after {
        content: "${({quantity}) => quantity}";
        position: absolute;
        display: block;
        color: #fff;
        bottom: 0;
        right: 0;
    }
`;

export const EquipCell = styled(ItemCell)`
    width: var(--grid-cell);
    height: var(--grid-cell);
    &::after {
        content: attr(data-slot);
        right: unset;
        width: 100%;
        text-align:center;
        pointer-events: none;
        font-size: 0.8rem;
`

export const ItemGrid = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom 0.5rem;
`;

export const barProps = {
    strokeWidth: '4',
    strokeLinecap: 'square',
    trailWidth: '4',
    trailColor: '#fff',
};


export const EquipGrid = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    & > div{
        display: flex;
    }
`;