import {ryn} from '../../npc';
import areaImage from '@images/map.png';

const config = {
    id: 'village',
    name: 'Village',
    imageSrc: areaImage,
    grid: { x: 13, y: 10},
    walls: [
        { pos: [0, 0], size: [13, 3]},
        { pos: [2, 3], size: [1, 1]},
        { pos: [11, 6], size: [1, 1]},
        { pos: [0, 9], size: [13, 1]},
    ],

    dificultyLevel: 0, //will not respown any monsters.
    monsters: {
        options: [], // list of possible monster that respown on that area.
        quantity: []// min, max quantity of monsters in the area.
    },
    tresureChest: false, // Cans spawn a tresure chest?
    npcs: [
        {
            ...ryn,
            position: { x: 4, y: 4}
        }
    ], // list npcs in that area,
    pathWays: {
        'top': {
            position: {x: 6, y: 3},
            size: {x: 1, y: 1},
            area: 'village', // area to change to
            path: 'bottom', // location in the new area,
            imageSrc: false, // you can identify a imagen to be placed here if needed, the image will be placed on the initial position
        },
        'bottom': {
            position: {x: 6, y: 8},
            size: {x: 1, y: 1},
            area: 'village', // area to change to
            path: 'bottom', // location in the new area,
            imageSrc: false, // you can identify a imagen to be placed here if needed, the image will be placed on the initial position
        },
    },
};

export default config;