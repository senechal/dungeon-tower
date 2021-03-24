import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'
import { encodeCoordinates } from '@components/grid';
import { showDialog } from '@components/dialog/state/dialog.actions';
import { useMovementArray, useInterval } from '@hooks';
import { Character } from '../game.styles';
import { getRandonPoint } from './utils';

const NPC = (props) => {
    const {
        imageSrc,
        size,
        offset,
        position,
        name,
        messages,
        randomMovement
    } = props;
    const {
        blockSize,
        show: displayingDialog,
    } = useSelector(state => ({...state.game, ...state.dialog}));
    const dispatch = useDispatch();

    const {
        moveTo,
        character: movementCharacter,
    } = useMovementArray({
        initialPosition: position,
        speed: 60,
        blockSize,
    });

    useInterval((run) => {
        if(run && randomMovement && !displayingDialog){
            const encoded = encodeCoordinates(movementCharacter.coordinates, blockSize, window.pixelSize)
            const newPos = getRandonPoint(encoded, 1);
            moveTo(newPos);
        }
    }, 2000);

    const handleClick = () => {
        dispatch(showDialog(name, messages));
    }

    return (
        <Character
            onClick={Boolean(messages) ? handleClick : undefined}
            hasAction={Boolean(messages)}
            coordinates={movementCharacter.coordinates}
            data-facing={movementCharacter.facing}
            data-walking={movementCharacter.walking}
            offset={offset}
            imageSrc={imageSrc}
            size={size}
        />
    );
};

NPC.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }).isRequired,
    direction: PropTypes.string,
    size: PropTypes.number,
    offset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),

    messages: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    randomMovement: PropTypes.bool,
};

NPC.defaultProsp = {
    direction:'down',
    size: 1,
    offset: {x: 0, y: 0},
    messages: null,
    name: '',
    randomMovement: false,
};


export default NPC;