import { useMemo } from 'react';
import Grid, { encodeCoordinates, decodeCoordinates } from '../grid';
import { BaseStyles, Viewport, Character } from './game.styles';
import { useMovementArray } from '../../utils/hooks';
import  { getPath, getObstacleMatrix } from './utils';
import areaImage from '../../assets/img/map.png';
import mainCharImg from '../../assets/img/c2.png'
import c1 from '../../assets/img/c1.png';

const blockSize = 16;
const pixelSize = 5;

const Game = () => {
    const viewport = {width: 176, height: 144};
    const viewportCharacterOffset = { x: 80, y: 64 };
    const {
        setMovements,
        character: movementCharacter,
        grid: movementGrid,
    } = useMovementArray(pixelSize, blockSize, viewportCharacterOffset);


    const mainCharacter = {
        imageSrc: mainCharImg,
        size: 1,
        offset: {x: 0, y: -30},
    }

    const area = {
        imageSrc: areaImage,
        grid: { x: 13, y: 10},
        walls: [
            { pos: [0, 0], size: [13, 3]},
            { pos: [2, 3], size: [1, 1]},
            { pos: [3, 6], size: [1, 1]},
            { pos: [11, 6], size: [1, 1]},
        ],
        characters: [
            {
                id: 1,
                imageSrc: c1,
                size: 1,
                direction: 'down',
                offset: {x: 0, y: -30},
                x: 3,
                y: 6,
            },
        ]
    };

    const gridMatrix = useMemo(() => getObstacleMatrix(area.grid, area.walls), [area.grid, area.walls]);


    const handleTargetClick = (clickCoordinates) => {
        const {x, y} = movementCharacter.coordinates;
        const charCoordinates = encodeCoordinates(x, y, blockSize, pixelSize);
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
                    imageSrc={area.imageSrc}
                    grid={area.grid}
                    blockSize={blockSize}
                    pixelSize={pixelSize}
                >
                    {
                        area.characters.map((char) => {
                            const {id, imageSrc, size, offset, direction, x, y} = char;
                            const coordinates = decodeCoordinates(x, y, blockSize, pixelSize);
                            return (
                                <Character
                                    key={id}
                                    coordinates={coordinates}
                                    data-facing={direction}
                                    offset={offset}
                                    imageSrc={imageSrc}
                                    size={size}
                                />
                            )
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
            </Viewport>
        </>
    );
};

export default Game;
