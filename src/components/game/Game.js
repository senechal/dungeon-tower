import { useSelector } from 'react-redux'
import { useMovementArray, usePixelSize, useMatrixArea} from '@hooks';
import Dialog from '../dialog';
import Player from '../player';
import Grid from '../grid';
import { BaseStyles, Viewport, Character } from './game.styles';
import Npc from './npc';

const Game = () => {
    usePixelSize();

    const {
        game: {
            blockSize,
            viewport,
            charOffset,
        },
        player,
    } = useSelector(state => state);

    const area = useMatrixArea('village');

    const {
        moveTo,
        character: movementCharacter,
        grid: movementGrid,
    } = useMovementArray({
        speed: 60,
        blockSize,
        offset: charOffset,
    });

    return (
        <>
            <BaseStyles blockSize={blockSize} />
            <Viewport {...viewport} >
                <Grid
                    onBlockClick={moveTo}
                    coordinates={movementGrid.coordinates}
                    moving={movementGrid.moving}
                    imageSrc={area.imageSrc}
                    grid={area.grid}
                    blockSize={blockSize}
                >
                    {
                        area.npcs.map((npc) => {
                            const {id} = npc;
                            return  <Npc key={id} {...npc} />

                        })
                    }
                    <Character
                        coordinates={movementCharacter.coordinates}
                        data-facing={movementCharacter.facing}
                        data-walking={movementCharacter.walking}
                        offset={player.appearance.offset}
                        imageSrc={player.appearance.imageSrc}
                        size={player.appearance.size}
                    />
                </Grid>
                <Player />
                <Dialog />
            </Viewport>
        </>
    );
};

export default Game;
