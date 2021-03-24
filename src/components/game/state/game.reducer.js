const initialState = {
    blockSize: 16,
    viewport: {width: 176, height: 144},
    charOffset: { x: 80, y: 64 },
}

export default function gameReducer(state=initialState, action){
    switch(action.type){
        default:
            return state;
    }
};