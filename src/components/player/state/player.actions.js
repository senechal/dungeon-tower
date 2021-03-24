import {
    CLOSE_STATUS_WINDOW,
    DRINK_POTION,
    EQUIP_ITEM,
    OPEN_STATUS_WINDOW,
    UNEQUIP_ITEM,
    MOVE_INVENTORY_ITEM
} from "./actionTypes"

export const openStatus = () => {
    return { type: OPEN_STATUS_WINDOW };
};

export const closeStatus = () => {
    return { type: CLOSE_STATUS_WINDOW };
};

export const drinkPotion = (index) => {
    return {type: DRINK_POTION, index };
};

export const equipItem = (index) => {
    return {type: EQUIP_ITEM, index };
};
export const unequipItem = (position, index = null) => {
    return {type: UNEQUIP_ITEM, position, index };
};


export const moveInventoryItem = (from, to) => {
    return {
        type: MOVE_INVENTORY_ITEM,
        from, to,
    }
};