import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type AsyncThunkConfig = {
    state: RootState, 
    rejectValue: string
};

export const loadAddress = createAsyncThunk<{json: AdresseApi, type: "starting" | "arrival"}, {value: string, type: "starting" | "arrival"}, AsyncThunkConfig>(
    'routing/loadAddress',
    async ({value, type}, {rejectWithValue, getState}) => {
        const state = getState();
        const cityCode = state.app.cityCode;
        try {
            const data = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}&citycode=${cityCode}&limit=3&type=housenumber`);
            const json = await data.json();
            return {json, type};
        } catch {
            let err = "There was a server error";
            return rejectWithValue(err);
        }
    }
)

const initialState: RoutingState = {
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
    hasError: false,
    error: ""
};

//TODO = correctly type "value" in updateValue reducer -> no use of any, find how to match types for value variable
//value can be : string | [] | Address | Address[] | Station | undefined

export const routingSlice = createSlice({
    name:'routing',
    initialState,
    reducers: {
        updateValue: (state, action: PayloadAction<{type: "starting" | "arrival", input: "input" | "point" | "list" | "station", value: any}>) => {
            const type = action.payload.type; 
            const input = action.payload.input; 
            const value = action.payload.value; 
            state[type][input] = value;
        },
        clear: (state, action: PayloadAction<{type: "starting" | "arrival"}>) => {
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
            .addCase(loadAddress.fulfilled, (state, action: PayloadAction<{json: AdresseApi, type: "starting" | "arrival"}>) => {
                let array: Address[] = [];
                const type = action.payload.type;
                action.payload.json.features.forEach((elem: AdresseApiElement, idx: number) => {
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
                const {type} = action.meta.arg;
                if(action.payload){
                    state[type].list = [];
                    state.error = action.payload;
                } else {
                    state.error = action.error.message;
                }
                state.isLoading = false;
                state.hasError = true;
            })
        }
});


export const {updateValue, clear} = routingSlice.actions;

export const selectStarting = (state: RootState) => state.routing.starting;
export const selectArrival = (state: RootState) => state.routing.arrival;

export default routingSlice.reducer;


