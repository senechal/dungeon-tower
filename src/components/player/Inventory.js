import { useRef } from 'react';
import useDoubleClick from 'use-double-click';
import { useDispatch, useSelector } from 'react-redux';
import {
    drinkPotion,
    equipItem,
    unequipItem,
    moveInventoryItem,
} from './state/player.actions';
import { StatusContent, TabContent, ItemGrid, ItemCell, IconSmall, EquipCell, EquipGrid, Icon} from './player.styles';

const Inventory = () => {
    const {
        inventory,
        gold,
        equipment: {
            head,
            chest,
            leftHand,
            rightHand,
            legs,
            feet,
            accessory,
        }
    } = useSelector(state => state.player);
    const dispatch = useDispatch();

    const equipRef = useRef();
    const itemRef = useRef();


    const handleConsumeItem = (event) => {
        const { index, type } = event.target.dataset;
        if(type === 'potion'){
            dispatch(drinkPotion(index));
        }
        if(type === 'equipment'){
            dispatch(equipItem(index))
        }
    };

    const handleUnequipItem = (event) => {
        const { pos } = event.target.dataset;
        if(pos){
            dispatch(unequipItem(pos));
        }
    }

    useDoubleClick({
        onSingleClick: e => console.log(e, 'single click'),
        onDoubleClick: handleConsumeItem,
        ref: itemRef,
        latency: 250
    });
    useDoubleClick({
        onSingleClick: e => console.log(e, 'single click'),
        onDoubleClick: handleUnequipItem,
        ref: equipRef,
        latency: 250
    });

    const handleDragStart = (event) => {
        event.stopPropagation();
        const { index: from, pos: equipPosition } = event.target.dataset;

        if(from){
            event.dataTransfer.setData('from', from);
        }
        if(equipPosition){
            event.dataTransfer.setData('equipPosition', equipPosition);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault()
        return null;
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const from = event.dataTransfer.getData('from');
        const equipPosition = event.dataTransfer.getData('equipPosition');
        const { index: to, slot } = event.target.dataset;

        if(from && to){
            dispatch(moveInventoryItem(from, to));
        } else if(equipPosition && to){
            dispatch(unequipItem(equipPosition, to));
        } else if(from && !to){
            const item = inventory[from];
            if(item.position === slot){
                dispatch(equipItem(from));
            }
        }
    };

    const draggable = {
        draggable:true,
        onDragStart:handleDragStart
    };

    const dropable = {
        onDragOver:handleDragOver,
        onDrop:handleDrop
    };


    return (
        <TabContent>
            <StatusContent>
                <EquipGrid ref={equipRef}>
                    <div>
                        <EquipCell data-slot="accessory" {...dropable}>{accessory && <Icon {...draggable} x={accessory.img?.[0]} y={accessory.img?.[1]} data-pos={accessory.position} />}</EquipCell>
                        <EquipCell data-slot="head" {...dropable}>{head && <Icon {...draggable} x={head.img?.[0]} y={head.img?.[1]} data-pos={head.position} />}</EquipCell>
                    </div>
                    <div>
                        <EquipCell data-slot="right-hand" {...dropable}>{leftHand && <Icon {...draggable} x={leftHand.img?.[0]} y={leftHand.img?.[1]} data-pos={leftHand.position} />}</EquipCell>
                        <EquipCell data-slot="chest" {...dropable}>{chest && <Icon {...draggable} x={chest.img?.[0]} y={chest.img?.[1]} data-pos={chest.position}  />}</EquipCell>
                        <EquipCell data-slot="left-hand" {...dropable}>{rightHand && <Icon {...draggable} x={rightHand.img?.[0]} y={rightHand.img?.[1]} data-pos={rightHand.position} />}</EquipCell>
                    </div>
                    <div>
                        <EquipCell data-slot="feet" {...dropable}>{feet && <Icon {...draggable} x={feet.img?.[0]} y={feet.img?.[1]} data-pos={feet.position} />}</EquipCell>
                        <EquipCell data-slot="legs" {...dropable}>{legs && <Icon {...draggable} x={legs.img?.[0]} y={legs.img?.[1]} data-pos={legs.position} />}</EquipCell>
                    </div>
                </EquipGrid>
            </StatusContent>
            <StatusContent>
                <ItemGrid ref={itemRef}>
                    { inventory.map((item, index) => {
                        if(item === null) return <ItemCell key={`empty_${index}`} data-index={index} {...dropable}/>;
                        const {
                            id,
                            quantity,
                            img,
                            type,
                        } = item;
                        const [x, y] = img;
                        return (
                            <ItemCell key={`${id}_${index}`} quantity={quantity}>
                                <IconSmall x={x} y={y} data-index={index} data-type={type} {...draggable}/>
                            </ItemCell>
                        );
                    })}
                </ItemGrid>
                <h3>Gold: {gold}</h3>
            </StatusContent>
        </TabContent>
    );
}


export default Inventory;