import styled, { createGlobalStyle, keyframes } from 'styled-components/macro';
import shadow from '@images/shadow.png';

const walk=  keyframes`
    0% {
        transform: translate3d(-33%,-2px,0);
    }
    25% {
        transform: translate3d(-66%,-2px,0);
    }
    50% {
        transform: translate3d(-33%,-2px,0);
    }
    75% {
        transform: translate3d(-0%,-2px,0);
    }
    100% {
        transform: translate3d(-33%,-2px,0);
    }
`;

const walkShadow =  keyframes`
    0% {
        transform: translate3d(-33%,12px,0);
    }
    25% {
        transform: translate3d(-66%,12px,0);
    }
    50% {
        transform: translate3d(-33%,12px,0);
    }
    75% {
        transform: translate3d(-0%,12px,0);
    }
    100% {
        transform: translate3d(-33%,12px,0);
    }
`;

export const BaseStyles = createGlobalStyle`
    :root {
        --cell-size: ${({blockSize}) => blockSize ?? '16'};
        --grid-cell: calc( var(--pixel-size) * var(--cell-size));


        --viewport-border: #6f78b2;
        --viewport-bg-color: #d1d8ff;
        --dialog-text-color: #535a83;
        --dialog-button-hover-bg-color: #9fa7e4;
        --bg: #9fa7e4;
        font-family: '04b_03',Lato,LatoExtended,sans-serif;
    }

    html, body {
        height: 100%;
    }

    body {
        background: var(--bg);
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const PixelArt = styled.div`
    image-rendering: crisp-edges;
    image-rendering: pixelated;

    &::after{
        image-rendering: crisp-edges;
        image-rendering: pixelated;
    }
`;

export const handleMovement = (isCharacter) => ({ coordinates={x: 0, y:0}, offset={x: 0, y:0}}) => {
    const x = coordinates.x + (offset.x * window.pixelSize);
    const y = coordinates.y + (offset.y * window.pixelSize);
    return {
        style:{
            transform: `translate3d(${x}px, ${y}px, 0)`,
            zIndex: (isCharacter) ? y || 1 : undefined,
        }
    }
}

export const Viewport = styled.div`
    --viewport-width: calc(var(--pixel-size) * ${({width}) => width ?? '160'});
    --viewport-height: calc(var(--pixel-size) * ${({height}) => height ?? '144'});
    width: var(--viewport-width);
    height: var(--viewport-height);
    overflow: hidden;
    position: relative;
    border: 4px solid var(--viewport-border);
    border-radius: 4px;
    background-color: var(--viewport-bg-color);
`;

export const Character = styled(PixelArt).attrs(handleMovement(true))`
    --char-size: ${({size}) => size ?? '2'};
    --tile-width: calc(var(--char-size) * 3);
    --tile-height: calc(var(--char-size) * 4);
    width: calc( var(--grid-cell) * var(--char-size));
    height: calc( var(--grid-cell) * var(--char-size));
    position: absolute;
    overflow:hidden;
    cursor: ${({hasAction}) => (hasAction ? 'pointer': null)};

    &[data-walking="true"]::after{
        animation: ${walk} 0.6s steps(1) infinite;
    }
    &[data-walking="true"]::before{
        animation: ${walkShadow} 0.6s steps(1) infinite;
    }
    &[data-facing="left"]::after {
        background-position-y: calc( var(--pixel-size) * calc(var(--cell-size) * calc(var(--char-size) * -1)));
    }
    &[data-facing="left"]::before {
        background-position-y: calc( var(--pixel-size) * calc(var(--cell-size) * calc(var(--char-size) * -1)));
    }
    &[data-facing="right"]::after {
        background-position-y: calc( var(--pixel-size) * calc(var(--cell-size) * calc(var(--char-size) * -2)) );
    }
    &[data-facing="right"]::before {
        background-position-y: calc( var(--pixel-size) * calc(var(--cell-size) * calc(var(--char-size) * -2)) );
    }
    &[data-facing="up"]::after {
        background-position-y: calc( var(--pixel-size) * calc(var(--cell-size) * calc(var(--char-size) * -3)) );
    }
    &[data-facing="up"]::before {
        background-position-y: calc( var(--pixel-size) * calc(var(--cell-size) * calc(var(--char-size) * -3)) );
    }

    &::before {
        content: "";
        width: calc( var(--grid-cell) * var(--tile-width));
        height: calc( var(--grid-cell) * var(--tile-height));
        position: absolute;
        left:0;
        top:-10px;
        background: url(${shadow}) no-repeat no-repeat;
        background-size: 100%;
        opacity: 0.8;
        transform: translate3d(-33%,12px,0);
    }
    &::after {
        content: "";
        position: absolute;
        background: url("${({imageSrc}) => imageSrc}") no-repeat no-repeat;
        background-size: 100%;
        width: calc( var(--grid-cell) * var(--tile-width) );
        height: calc( var(--grid-cell) * var(--tile-height) );
        transform: translate3d(-33%,-2px,0);

    }
`;

Character.defaultProps = {
    'data-character': 'true',
};