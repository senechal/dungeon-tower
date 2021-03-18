import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'
import { decodeCoordinates } from '@components/grid';
import { Character } from '../game.styles';
import { showDialog } from '../../dialog/state/dialog.actions';

const NPC = (props) => {
    const {
        imageSrc,
        size,
        offset,
        direction,
        position,
        name,
        messages} = props;

    const {
        blockSize,
    } = useSelector(state => state.game);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(showDialog(name, messages));
    }

    const coordinates = decodeCoordinates(position, blockSize, window.pixelSize);
    return (
        <Character
            onClick={Boolean(messages) ? handleClick : undefined}
            hasAction={Boolean(messages)}
            coordinates={coordinates}
            data-facing={direction}
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
};

NPC.defaultProsp = {
    direction:'down',
    size: 1,
    offset: {x: 0, y: 0},
    messages: null,
    name: '',
};


export default NPC;