import {formatName, arrayFilter } from './utils';

describe('utils function', () => {

    test('formatName returns a word with first letter uppercased', () => {
        const name = '012-CAMEL';
        expect(formatName(name)).toBe('Camel');
    });

    test('formatName with empty entry', () => {
        const name = '';
        expect(formatName(name)).toBe('');
    });

    test('array to be filter by value', () => {
        const array = [
            {
                number: 38,
                contract_name: "nantes",
                name: "038-RICORDEAU",
                address: "Place Alexis-Ricordeau - Chaussée de la Madeleine"

            },
            {
                number: 12,
                contract_name: "nantes",
                name: "012-PLACE TCHOU-TCHOU",
                address: "Place de la gare - Avenue de la liberté"

            },
            {
                number: 24,
                contract_name: "nantes",
                name: "024-GARE SNCF",
                address: "Rue des trains"
            }
        ];
        const searchTerm = "gAre";
        const expected = [
            {
                number: 12,
                contract_name: "nantes",
                name: "012-PLACE TCHOU-TCHOU",
                address: "Place de la gare - Avenue de la liberté"

            },
            {
                number: 24,
                contract_name: "nantes",
                name: "024-GARE SNCF",
                address: "Rue des trains"
            }
        ];
        expect(arrayFilter(array, searchTerm)).toStrictEqual(expected);
    });

})

