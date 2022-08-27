import React from 'react';
import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';



describe('ListItem component testing', () => {

    test('it renders', () => {
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

        const { getByText } = render(<ListItem station={station} />);
        expect(getByText(/Gare/i)).toBeInTheDocument();
    });





})