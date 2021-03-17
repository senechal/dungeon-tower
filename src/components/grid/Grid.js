import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { encodeCoordinates } from './utils';
import { Map } from './grid.styles';

const Grid = ({children, ...props}) => {
    const {
        imageSrc,
        coordinates,
        offset,
        grid,
        blockSize,
        pixelSize,
        onBlockClick,
    } = props;

    const handleClick = useCallback((event) => {
        // Get Map Offset Values;
        const [{left: mapOffsetX, top:mapOffsetY}] = event.target.getClientRects();
        // Get Click coordinates;
        const { clientX, clientY } = event;

        // Return Calculated coordinates inside the grid;
        onBlockClick(encodeCoordinates(
            clientX - mapOffsetX,
            clientY - mapOffsetY,
            blockSize,
            pixelSize
        ))

    }, [blockSize, pixelSize, onBlockClick]);

    return (
        <Map
            {...grid}
            img={imageSrc}
            coordinates={coordinates}
            offset={offset}
            onClick={handleClick}>
            {children}
        </Map>
    )
};


Grid.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    blockSize: PropTypes.number.isRequired,
    pixelSize: PropTypes.number.isRequired,
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
    onBlockClick: PropTypes.func,
};

Grid.defaultProps = {

    coordinates: {x: 0, y: 0},
    offset: {x: 0, y: 0},
    grid: {x: 0, y: 0},
    onBlockClick: Function.prototype,
}


export default Grid