import {createSlice} from '@reduxjs/toolkit';
import { arrayFilter } from '../../utils/utils';

export const handleChangeValue = (payload) => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(updateSearch({type: "searchTerm", input: payload.value}));
        const stations = state.app.stations;
        if (state.searchList.searchTerm.length > 2) {
            let search = arrayFilter(stations, state.searchList.searchTerm);
            dispatch(updateSearch({type: "stationsFiltered", input: search}));
        } else {
            dispatch(updateSearch({type: "stationsFiltered", input: stations}));
        }
    }
};

export const handleSelectionValue = (payload) => {
    return(dispatch, getState) => {
        const state = getState();
        const stations = state.app.stations;
        dispatch(updateSearch({type: "filter", input: payload.filter}))
        switch(payload.filter){
            case 'all':
                dispatch(updateSearch({type: "stationsFiltered", input: stations}));
                break;
            case 'open':
                dispatch(updateSearch({type: "stationsFiltered", input: stations.filter(elem => elem.status === "Ouverte")}));
                break;
            case 'closed':
                dispatch(updateSearch({type: "stationsFiltered", input: stations.filter(elem => elem.status === "Fermée")}));
                break;
            default:
                dispatch(updateSearch({type: "stationsFiltered", input: stations}));
                break;
            }
    }
}


export const searchListSlice = createSlice({
    name:'searchList',
    initialState: {
        stationsFiltered: [],
        searchTerm: "",
        filter: "all"
    },
    reducers: {
        updateSearch: (state, action) => {
            const type = action.payload.type;
            state[type] = action.payload.input;
        }
    }
});

export const {updateSearch, updateSelection} = searchListSlice.actions;
export const selectStationsFiltered = (state) => state.searchList.stationsFiltered;
export const selectSearchTerm = (state) => state.searchList.searchTerm;
export const selectFilter = (state) => state.searchList.filter;

export default searchListSlice.reducer;