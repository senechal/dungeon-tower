import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getArea } from "@components/game/utils";
import { initArea } from '@components/grid/state/grid.actions';

export const useMatrixArea = (areaId) => {
    const area = getArea(areaId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initArea(area));
    }, [area, dispatch]);

    return area;
};