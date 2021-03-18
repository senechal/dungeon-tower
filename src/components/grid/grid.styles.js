import styled from 'styled-components/macro';
import { PixelArt, handleMovement} from '../game/game.styles';

export const Map = styled(PixelArt).attrs(handleMovement())`
    background-image: url(${({img}) => img});
    background-size: 100%;
    width: calc(${({x}) => x ?? '13'} * var(--grid-cell));
    height: calc(${({y}) => y ?? '10'} * var(--grid-cell));
    position: relative;
`;

export const CharacterInfo = styled.span`
    position: absolute;
    display: block;
    width: 100%;
    background-color: red;
    top: 20px;
    left: 0px;
    z-index: 3;
    color: #fff;
    text-align: center;
`;


export const Indicator = styled.span.attrs(handleMovement(true))`
    width: var(--grid-cell);
    height: var(--grid-cell);
    position: absolute;
    overflow: hidden;
    opacity: 0.3;
    pointer-events: none;
    &::after{
        --diameter: 30%;
        content: "";
        width: var(--diameter);
        height: var(--diameter);
        position: absolute;
        border: 5px solid blue;
        border-radius: 50%;
        top: calc(50% - var(--diameter)/2);
        left: calc(50% - var(--diameter)/2);
        box-sizing: border-box;
    }
`;