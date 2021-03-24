import { Random, MersenneTwister19937 } from "random-js";

export const getRandonPoint = (coordinates, distance = 1) => {
    const random = new Random(MersenneTwister19937.autoSeed());
    const x = Math.abs(random.integer(coordinates.x - distance, coordinates.x + distance));
    const y =  Math.abs(random.integer(coordinates.y - distance, coordinates.y + distance));
    return {x, y};
};