import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadAddress = createAsyncThunk(
    'routing/loadAddress',
    async ({value, type}, thunkAPI) => {
        const cityCode = thunkAPI.getState().app.cityCode;
        const data = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}&citycode=${cityCode}&limit=3&type=housenumber`);
        const json = await data.json();
        return {json, type};
    }
)

export const routingSlice = createSlice({
    name:'routing',
    initialState: {
        starting: {
            input: "",
            point: undefined,
            list: [],
            station: undefined
        },
        arrival: {
            input: "",
            point: undefined,
            list: [],
            station: undefined
        },
        isLoading: false,
        hasError: false
    },
    reducers: {
        updateValue: (state, action) => {
            const type = action.payload.type; 
            const input = action.payload.input; 
            const value = action.payload.value; 
            state[type][input] = value;
        },
        clear: (state, action) => {
            state[action.payload.type] = {
                input: "",
                point: undefined,
                list: [],
                station: undefined
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAddress.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadAddress.fulfilled, (state, action) => {
                let array = [];
                const type = action.payload.type;
                action.payload.json.features.forEach((elem, idx) => {
                    array.push({
                        index: idx,
                        address: elem.properties.label,
                        postcode: elem.properties.postcode,
                        citycode: elem.properties.citycode,
                        long: elem.geometry.coordinates[0],
                        lat: elem.geometry.coordinates[1],
                        type: "walker"
                    })
                })
                state[type].list = array;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadAddress.rejected, (state, action) => {
                const type = action.payload.type;
                state[type].list = [];
                state.isLoading = false;
                state.hasError = true;
            })
        }
});


export const {updateValue, clear} = routingSlice.actions;

export const selectStarting = (state) => state.routing.starting;
export const selectArrival = (state) => state.routing.arrival;

export default routingSlice.reducer;


