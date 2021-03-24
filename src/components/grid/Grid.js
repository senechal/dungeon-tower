import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { encodeCoordinates, decodeCoordinates } from './utils';
import { Map, Indicator } from './grid.styles';

const Grid = ({children, ...props}) => {
    const {
        imageSrc,
        coordinates,
        offset,
        grid,
        blockSize,
        moving,
        onBlockClick,
    } = props;

    const [indicator, setIndicator] = useState({x: 0, y: 3});

    const handleClick = useCallback((event) => {
        if(event.target.dataset.map){
            const [{left: mapOffsetX, top:mapOffsetY}] = event.target.getClientRects();
            const { clientX, clientY } = event;
            const x = clientX - mapOffsetX;
            const y = clientY - mapOffsetY;
            const gridCoordinates = encodeCoordinates(
                {x, y},
                blockSize,
                window.pixelSize,
            );
            setIndicator(gridCoordinates);
            onBlockClick(gridCoordinates);
        }

    }, [blockSize, onBlockClick]);

    return (
        <Map
            data-map
            {...grid}
            img={imageSrc}
            coordinates={coordinates}
            offset={offset}
            onClick={handleClick}
        >
            { moving && <Indicator coordinates={decodeCoordinates(indicator, blockSize, window.pixelSize)} />}
            {children}
        </Map>
    )
};


Grid.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    blockSize: PropTypes.number.isRequired,
    coordinates: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    offset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    grid: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    moving: PropTypes.bool,
    onBlockClick: PropTypes.func,
};

Grid.defaultProps = {

    coordinates: {x: 0, y: 0},
    offset: {x: 0, y: 0},
    grid: {x: 0, y: 0},
    moving: false,
    onBlockClick: Function.prototype,
}


export default Grid