import { CLOSE_DIALOG, OPEN_DIALOG } from "./ActionTypes"

export const showDialog = (npcName, messages) => {
    return {
        type: OPEN_DIALOG,
        messages,
        npcName,
    }
};

export const closeDialog = () => {
    return {
        type: CLOSE_DIALOG,
    }
}