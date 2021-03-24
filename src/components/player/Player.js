import { useDispatch, useSelector } from 'react-redux';
import { StatusIcon } from './player.styles';
import { openStatus } from './state/player.actions';
import Status from './Status';

const Player = () => {
    const showStatus = useSelector(state => state.player.showStatus);
    const dispatch = useDispatch();

    const handleStatusClick = () => {
        dispatch(openStatus());
    };

    return (
        <>
            <StatusIcon  onClick={handleStatusClick} />
            {showStatus && <Status />}
        </>
    );
};

export default Player;