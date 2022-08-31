import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { arrayFilter } from '../../utils/utils';
import { RootState, AppDispatch } from '../../app/store';
import { StatOptions } from 'fs';

export const handleChangeValue = ({value}: {value: string}) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const state = getState();
        dispatch(updateSearch({type: "searchTerm", input: value}));
        const stations = state.app.stations;
        if (state.searchList.searchTerm) {
            let search: Station[] = arrayFilter(stations, state.searchList.searchTerm);
            dispatch(updateSearch({type: "stationsFiltered", input: search}));
        } else {
            dispatch(updateSearch({type: "stationsFiltered", input: stations}));
        }
    }
};

//TODO = solve typing problem on stations.filter(elem => elem.status === "Ouverte") 
// Should create another separated state "pointsToDisplay" with data from both stations and Address and use that one to display points on map ? 
// state.app.stations will stay safe with only Station[] type.
// Solution found : pass the type of state.app.stations as Station[] in this function because it should always be Station passed inside -> correct to write this ? 

export const handleSelectionValue = ({filter}: {filter: string}) => {
    return(dispatch: AppDispatch, getState: () => RootState) => {
        const state = getState();
        const stations = state.app.stations as Station[];
        dispatch(updateSearch({type: "filter", input: filter}));
        switch(filter){
            case 'all':
                dispatch(updateSearch({type: "stationsFiltered", input: stations}));
                break;
            case 'open':
                dispatch(updateSearch({type: "stationsFiltered", input: stations.filter(elem => {elem.status === "Ouverte"}
                )}));
                break;
            case 'closed':
                dispatch(updateSearch({type: "stationsFiltered", input: stations.filter(elem => elem.status === "Fermée")}));
                break;
            default:
                dispatch(updateSearch({type: "stationsFiltered", input: stations}));
                break;
        };
    }
}

const initialState: SearchState = {
    stationsFiltered: [],
    searchTerm: "",
    filter: "all"
};

//TODO find a way to refactor type choice in updateSearch reducer 
//how efficiently choose type based on variable ? Review grafikart lesson with exercise "Conditional format" in Notion

export const searchListSlice = createSlice({
    name:'searchList',
    initialState,
    reducers: {
        updateSearch: (state, action: PayloadAction<{type: "stationsFiltered" | "searchTerm" | "filter", input: string | Station[] | (Station | Address)[]}>) => {
            const type = action.payload.type;
            const input = action.payload.input;
            if(typeof input === 'object'){
                state.stationsFiltered = action.payload.input as Station[];
            } else if (typeof input === 'string') {
                state.searchTerm = action.payload.input as string;
            } else {
                state.filter = action.payload.input as string;
            }

        }
    }
});

export const {updateSearch} = searchListSlice.actions;
export const selectStationsFiltered = (state: RootState) => state.searchList.stationsFiltered;
export const selectSearchTerm = (state: RootState) => state.searchList.searchTerm;
export const selectFilter = (state: RootState) => state.searchList.filter;

export default searchListSlice.reducer;