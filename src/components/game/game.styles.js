import styled, { createGlobalStyle, keyframes } from 'styled-components/macro';
import ttf from '@fonts/04B_03.ttf';
import woff from '@fonts/04B_03.woff';

const walk =  keyframes`
    from {
        transform: translate3d(0%,0%,0);
    }
    to {
        transform: translate3d(-100%,0%,0);
    }
`;

export const BaseStyles = createGlobalStyle`
    :root {
        --pixel-size: 2px;
        --cell-size: ${({blockSize}) => blockSize ?? '16'};
        --grid-cell: calc( var(--pixel-size) * var(--cell-size));


        --viewport-border: #6f78b2;
        --viewport-bg-color: #d1d8ff;
        --dialog-text-color: #535a83;
        --dialog-button-hover-bg-color: #9fa7e4;
        --bg: #9fa7e4;
    }
    @media( min-width: 700px ) {
        :root {
        --pixel-size: 3px;
        }
    }
    @media( min-width: 1000px ) {
        :root {
        --pixel-size: 4px;
        }
    }
    @media( min-width: 1000px ) {
        :root {
        --pixel-size: 5px;
        }
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

    @font-face{
        font-family: '04B_03';
        src: url(${woff}) format('woff'),
             url(${ttf}) format('truetype');
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
    const x = coordinates.x + offset.x;
    const y = coordinates.y + offset.y;
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
    --tile-size: calc(var(--char-size) * 4);
    width: calc( var(--grid-cell) * var(--char-size));
    height: calc( var(--grid-cell) * var(--char-size));
    position: absolute;
    overflow:hidden;
    cursor: ${({hasAction}) => (hasAction ? 'pointer': null)};

    &[data-walking="true"]::after{
        animation: ${walk} 0.4s steps(4) infinite;
    }
    &[data-facing="right"]::after {
        background-position-y: calc( var(--pixel-size) * calc(var(--cell-size) * calc(var(--char-size) * -1)));
    }
    &[data-facing="up"]::after {
        background-position-y: calc( var(--pixel-size) * calc(var(--cell-size) * calc(var(--char-size) * -2)) );
    }
    &[data-facing="left"]::after {
        background-position-y: calc( var(--pixel-size) * calc(var(--cell-size) * calc(var(--char-size) * -3)) );
    }

    &::before {
        content: "";
        width: calc( var(--grid-cell) * var(--char-size));
        height: calc( var(--grid-cell) * var(--char-size));
        position: absolute;
        left:0;
        top:0;
        background: url("https://assets.codepen.io/21542/DemoRpgCharacterShadow.png") no-repeat no-repeat;
        background-size: 100%;
    }
    &::after {
        content: "";
        position: absolute;
        background: url("${({imageSrc}) => imageSrc}") no-repeat no-repeat;
        background-size: 100%;
        width: calc( var(--grid-cell) * var(--tile-size) );
        height: calc( var(--grid-cell) * var(--tile-size) );
    }
`;

Character.defaultProps = {
    'data-character': 'true',
};