import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import {JCDECAUX, DEFAULT_CITY} from '../config';
import { formatName } from '../utils/utils';
import { RootState } from './store';

if(!JCDECAUX){
    console.log("You must have a valid API key in your environment variable");
}

const initialState: AppState = {
    stations: [],
    isLoadingStations: false,
    hasError: false,
    error: "",
    city: DEFAULT_CITY.city,
    cityCode: DEFAULT_CITY.cityCode,
    position: DEFAULT_CITY.position,
    geolocation: []
};

//search how to correctly type the async thunk
//error message must be typed at least as ..|undefined in case if error it'll be undefined
//in function declaration type argument and return value = array of Station

type AsyncThunkConfig = {
    state: RootState,
    rejectValue: string | unknown,
};

export const loadStations = createAsyncThunk<(Station | Address)[], void, AsyncThunkConfig>(
    'app/loadStations',
    async (_, {rejectWithValue, getState}) => {
        const state = getState();
        const starting = state.routing.starting;
        const arrival = state.routing.arrival;
        if(starting.station && arrival.station && starting.point && arrival.point){
            return [starting.station, arrival.station, starting.point, arrival.point];
        }

        try {
            const data = await fetch(JCDECAUX.URL+ 'stations?contract=' + state.app.city + '&apiKey=' + JCDECAUX.KEY).then(r => r.json());
            let array: Station[] = [];
            data.forEach((elem: Data, idx: number) => {
                array.push({
                    index: idx,
                    number: elem.number,
                    name: formatName(elem.name),
                    address: elem.address,
                    available_bike_stands: elem.available_bike_stands,
                    available_bikes: elem.available_bikes,
                    status: elem.status === "OPEN" ? "Ouverte" : "Fermée",
                    banking: elem.banking,
                    long: elem.position.lng,
                    lat: elem.position.lat,
                    type: "bike"
                })
            })
            return array;
        } catch {
            let err = "There was a server error";
            return rejectWithValue(err);
        }

        
    }
)

export const appSlice = createSlice({
    name:'app',
    initialState,
    reducers: {
        updateGeo: (state, action: PayloadAction<{coord: [number, number]}>) => {
            state.geolocation = action.payload.coord;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadStations.pending, (state) => {
                state.isLoadingStations = true;
                state.hasError = false;
            })
            .addCase(loadStations.fulfilled, (state, action) => {
                state.stations = action.payload;
                state.isLoadingStations = false;
                state.hasError = false;
            })
            .addCase(loadStations.rejected, (state, action) => {
                state.stations = [];
                state.isLoadingStations = false;
                state.hasError = true;
                if (action.payload) {
                    state.error = action.payload;
                  } else {
                    state.error = action.error.message;
                  }
            })
    }
});

export const {updateGeo} = appSlice.actions;
export const selectStations = (state: RootState) => state.app.stations;
export const isLoadingStations = (state: RootState) => state.app.isLoadingStations;
export const hasErrorStations = (state: RootState) => state.app.hasError;
export const selectPosition = (state: RootState) => state.app.position;
export const selectGeolocation = (state: RootState) => state.app.geolocation;

export default appSlice.reducer;