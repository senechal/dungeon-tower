import { useMemo } from 'react';
import { useSelector } from 'react-redux'
import { useMovementArray, usePixelSize } from '@hooks';
import mainCharImg from '@images/c2.png'
import Dialog from '../dialog';
import Grid, { encodeCoordinates } from '../grid';
import { BaseStyles, Viewport, Character } from './game.styles';
import  { getArea, getPath, getObstacleMatrix } from './utils';
import Npc from './npc';

const Game = () => {
    usePixelSize();

    const {
        blockSize,
        viewport,
    } = useSelector(state => state.game);

    const viewportCharacterOffset = { x: 80, y: 64 };
    const mainCharacter = {
        imageSrc: mainCharImg,
        size: 1,
        offset: {x: 0, y: -6*window.pixelSize},
        speed: 60,
    }

    const area = getArea('village');

    const {
        setMovements,
        character: movementCharacter,
        grid: movementGrid,
    } = useMovementArray(mainCharacter.speed, blockSize, viewportCharacterOffset);

    const gridMatrix = useMemo(() => getObstacleMatrix(area.grid, area.walls), [area.grid, area.walls]);

    const handleTargetClick = (clickCoordinates) => {
        const {x, y} = movementCharacter.coordinates;
        const charCoordinates = encodeCoordinates({x, y}, blockSize, window.pixelSize);
        const path = getPath(charCoordinates, clickCoordinates, gridMatrix);
        setMovements(path);
    };


    return (
        <>
            <BaseStyles blockSize={blockSize} />
            <Viewport {...viewport} >
                <Grid
                    onBlockClick={handleTargetClick}
                    coordinates={movementGrid.coordinates}
                    moving={movementGrid.moving}
                    imageSrc={area.imageSrc}
                    grid={area.grid}
                    blockSize={blockSize}
                >
                    {
                        area.npcs.map((npc) => {
                            const {id} = npc;
                            return  <Npc key={id} {...npc}/>

                        })
                    }
                    <Character
                        coordinates={movementCharacter.coordinates}
                        data-facing={movementCharacter.facing}
                        data-walking={movementCharacter.walking}
                        offset={mainCharacter.offset}
                        imageSrc={mainCharacter.imageSrc}
                        size={mainCharacter.size}
                    />
                </Grid>
                <Dialog />
            </Viewport>
        </>
    );
};

export default Game;
