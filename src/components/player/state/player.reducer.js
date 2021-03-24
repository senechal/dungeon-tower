import mainCharImg from '@images/hero.png'
import cloneDeep from 'lodash/cloneDeep';
import items from '../items';
import { CLOSE_STATUS_WINDOW, OPEN_STATUS_WINDOW, DRINK_POTION, EQUIP_ITEM, UNEQUIP_ITEM, MOVE_INVENTORY_ITEM } from "./actionTypes";



const initialState = {
    name: 'Pumba',
    appearance:{
        sex: 'male',
        imageSrc: mainCharImg,
        size: 1,
        offset: { x: 0, y: -6},
    },
    title: 'Adventurer',
    level: 1,
    strength: 10,
    dexterity: 10,
    inteligence: 10,
    health: 10,
    experience: [200, 0],
    healthPoints: [100, 55],
    magicPoints: [100, 100],
    effects: {},
    skills: [],
    inventory: [
        {...items['hp-1'], quantity: 5},
        {...items['brown-pants'], quantity: 1},
        ...Array(33).fill(null)
    ],
    equipment: {
        head: null,
        chest: {...items['green-shirt'], quantity: 1},
        leftHand: null,
        rightHand: null,
        legs: null,
        feet: null,
        accessory: null,
    },
    gold: 0,
    showStatus: false,
};

const updateQuantity = (item) => {
    let newItem = {...item};
    newItem.quantity -= 1;
    if (newItem.quantity <= 0){
        newItem = null
    };
    return newItem;
};

const addToInventory = (item, inventory, definedIndex) => {
    const newInventory = cloneDeep(inventory);
    const index = definedIndex ?? newInventory.findIndex(
        (inventoryItem) => inventoryItem && item.id === inventoryItem.id && inventoryItem.quantity < inventoryItem.maxQuanity
    );
    if (index >= 0){
        if(!newInventory[index]) {
            newInventory[index] = {...item, quantity: 0};
        }
        newInventory[index].quantity += 1;
    } else {
        const emptyIndex = newInventory.findIndex((inventoryItem) => inventoryItem === null);
        newInventory[emptyIndex] = {...item, quantity: 1};
    }
    return newInventory;
}

export default function playerReducer(state=initialState, action){
    switch(action.type){
        case OPEN_STATUS_WINDOW:
            return {
                ...state,
                showStatus: true,
            }
        case CLOSE_STATUS_WINDOW:
            return {
                ...state,
                showStatus: false,
            }
        case DRINK_POTION: {
            const inventory = cloneDeep(state.inventory);
            const potion = inventory[action.index];
            const {target, value } = potion.effect;
            const {[target]: [max, curr]} = state;
            inventory[action.index] = updateQuantity(potion);

            return {
                ...state,
                inventory,
                [target]: [
                    max, curr+value > max ? max : curr+value,
                ],
            }
        }
        case EQUIP_ITEM: {
            const inventory = cloneDeep(state.inventory);
            const equip = inventory[action.index];
            const {position} = equip;
            inventory[action.index] = updateQuantity(equip);

            return {
                ...state,
                inventory,
                equipment: {
                    ...state.equipment,
                    [position]: equip,
                },
            }
        }
        case UNEQUIP_ITEM:{
            const item = state.equipment[action.position];
            return {
                ...state,
                inventory: addToInventory(item, state.inventory, action.index),
                equipment: {
                    ...state.equipment,
                    [action.position]: null,
                }
            }
        }
        case MOVE_INVENTORY_ITEM:{
            const inventory = cloneDeep(state.inventory);
            inventory[action.to] = inventory[action.from];
            inventory[action.from] = null;
            return {
                ...state,
                inventory,
            }
        }
        default:
            return state;
    }
};
