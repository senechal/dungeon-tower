import styled, { createGlobalStyle, keyframes } from 'styled-components/macro';

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
        --pixel-size: 1px;
        --cell-size: ${({blockSize}) => blockSize ?? '16'};
        --grid-cell: calc( var(--pixel-size) * var(--cell-size));
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
            zIndex: (isCharacter) ? y : undefined,
        }
    }
}

export const Viewport = styled.div`
    width: calc(var(--pixel-size) * ${({width}) => width ?? '160'});
    height: calc(var(--pixel-size) * ${({height}) => height ?? '144'});
    overflow: hidden;
    position:relative;
    border: 4px solid #6f78b2;
    border-radius: 4px;
    background-color: #d1d8ff;
`;

export const Character = styled(PixelArt).attrs(handleMovement(true))`
    --char-size: ${({size}) => size ?? '2'};
    --tile-size: calc(var(--char-size) * 4);
    width: calc( var(--grid-cell) * var(--char-size));
    height: calc( var(--grid-cell) * var(--char-size));
    position: absolute;
    overflow:hidden;

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