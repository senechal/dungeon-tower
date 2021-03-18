import { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {CLOSE_STRING, NEXT_STRING} from './constants';
import { closeDialog } from './state/dialog.actions';
import { Overlay, DialogContainer, DialogBox, DialogButton } from './dialog.styles';

const Dialog = () => {
    const [index, setIndex] = useState(0);
    const { show, messages, npcName } = useSelector(state=> state.dialog);
    const dispatch = useDispatch();

    useEffect(() => {
        if(show){
            setIndex(0);
        }
    }, [show, messages]);

    if(!show){
        return null;
    }

    const handleClick = () => {
        if(!messages[index + 1] ){
            dispatch(closeDialog())
        } else {
            setIndex(i => i +1);
        }
    }

    return (
        <>
            <Overlay />
            <DialogContainer>
                <DialogBox>
                    <h1>{npcName}</h1>
                    <p>{messages[index]}</p>
                    <DialogButton
                        onClick={handleClick}
                    >
                        {!messages[index + 1] ? CLOSE_STRING : NEXT_STRING}
                    </DialogButton>
                </DialogBox>
            </DialogContainer>
        </>
    )
};

export default Dialog;
