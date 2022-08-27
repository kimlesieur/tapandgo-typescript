import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {JCDECAUX, DEFAULT_CITY} from '../config';
import { formatName } from '../utils/utils';

if(!JCDECAUX){
    console.log("You must have a valid API key in your environment variable");
}

export const loadStations = createAsyncThunk(
    'app/loadStations',
    async (args, thunkAPI) => {
        const state = thunkAPI.getState();
        const starting = state.routing.starting;
        const arrival = state.routing.arrival;
        if(starting.station && arrival.station){
            return [starting.station, arrival.station, starting.point, arrival.point];
        }
        const data = await fetch(JCDECAUX.URL+ 'stations?contract=' + state.app.city + '&apiKey=' + JCDECAUX.KEY).then(r => r.json());
        let array = [];
        data.forEach((elem, idx) => {
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
    }
)

export const appSlice = createSlice({
    name:'app',
    initialState: {
        stations: [],
        isLoadingStations: false,
        hasError: false,
        city: DEFAULT_CITY.city,
        cityCode: DEFAULT_CITY.cityCode,
        position: DEFAULT_CITY.position,
        geolocation: []
        },
    reducers: {
        updateGeo: (state, action) => {
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
            .addCase(loadStations.rejected, (state) => {
                state.stations = [];
                state.isLoadingStations = false;
                state.hasError = true;
            })
    }
});

export const {updateGeo} = appSlice.actions;
export const selectStations = (state) => state.app.stations;
export const isLoadingStations = (state) => state.app.isLoadingStations;
export const hasErrorStations = (state) => state.app.hasError;
export const selectPosition = (state) => state.app.position;
export const selectGeolocation = (state) => state.app.geolocation;

export default appSlice.reducer;