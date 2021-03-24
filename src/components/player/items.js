const DEFAULT_MAX_QUANTITY = 64;

const potions  = {
    'hp-1': {
        id: 'hp-1',
        name: 'Health Potion',
        effect: {
            target: 'healthPoints',
            value: 20,
        },
        img: [0,9],
        type: 'potion',
        maxQuantity: DEFAULT_MAX_QUANTITY,
    },
};

const chest = {
    'green-shirt': {
        id: 'green-shirt',
        name: 'Green Shirt',
        type: 'equipment',
        position: 'chest',
        effect: {
            defence: 1,
        },
        img: [9, 7],
        maxQuantity: 1,
    },
};

const legs = {
    'brown-pants': {
        id: 'brown-pants',
        name: 'Brown Pants',
        type: 'equipment',
        position: 'legs',
        effect: {
            defence: 1,
        },
        img: [10, 7],
        maxQuantity: 1,
    }
}

const equipament = {
    ...chest,
    ...legs,
}


const items = {
    ...potions,
    ...equipament,
};

export default items;