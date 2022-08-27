import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import SearchList from './SearchList';
import App from '../../app/App';

describe('SearchList component testing', () => {
    test('it renders', async () => {
        const station = {
            index: 2,
            number: "034",
            name: "Gare Nord",
            address: "24 avenue des trains",
            available_bike_stands: 2,
            available_bikes: 10,
            status: "Ouverte" ,
            banking: true,
            long: 47.12,
            lat: -1.5,
            type: "bike"
        };

        const searchListSlice = createSlice({
            name:'searchList',
            initialState: {
                stationsFiltered: [station],
                searchTerm: "",
                filter: "all"
            }
        });

        const appSlice = createSlice({
            name:'app',
            initialState: {
                stations: [station],
                isLoadingStations: false,
                hasError: false,
                city: "Nantes",
                cityCode: "44109",
                position: [47.218, -1.549],
                bounds: [[47.100, -1.700], [47.400, -1.400]],
                }
        });


        const store = configureStore({
            reducer: {
              searchList: searchListSlice.reducer,
              app: appSlice.reducer
            }
          });

        const user = userEvent.setup();

        const {getByText, getByTestId} = render(
            <Provider store={store}>
                <App>
                    <SearchList />
                </App>
            </Provider>
        );

        await user.click(getByTestId('btn-lateral'));
        expect(getByText(/gare/i)).toBeInTheDocument();
    })


});