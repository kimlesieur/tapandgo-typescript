//App slice
interface Data {
    number: number;
    contract_name: string;
    name: string;
    address: string;
    position: {lat: number, lng: number};
    banking: boolean;
    bonus: boolean;
    bike_stands: number;
    available_bike_stands: number;
    available_bikes: number;
    status: "OPEN" | "FALSE";
    last_update: number;
};

interface Station {
    index: number;
    number: number;
    name: string;
    address: string;
    available_bike_stands: number;
    available_bikes: number;
    status: "Ouverte" | "Fermée";
    banking: boolean;
    long: number;
    lat: number;
    type: string;
};


interface AppState {
    stations: (Station | Address)[];
    isLoadingStations: boolean;
    hasError: boolean;
    error: string | unknown;
    city: string;
    cityCode: string;
    position: [number, number] ;
    geolocation: [number, number] | [];
};


//Routing slice
interface Address {
    index: number;
    address: string;
    postcode: string;
    citycode: string;
    long: number;
    lat: number;
    type: string;
};

interface AdresseApi {
    type: string;
    version: string;
    features: AdresseApiElement[];
};

interface AdresseApiElement {
    type: string;
    geometry: {
        type: string;
        coordinates: [number, number];
    };
    properties: {
        label: string;
        score: number;
        id: string;
        name: string;
        postcode: string;
        citycode: string;
        x: number;
        y: number;
        city: string;
        context: string;
        type: string;
        importance: number;
    };
};

interface RoutingState {
    starting: {
        input: string;
        point: Address | undefined;
        list: Address[];
        station: Station | undefined;
    };
    arrival: {
        input: string;
        point: Address | undefined;
        list: Address[];
        station: Station | undefined;
    };
    isLoading: boolean;
    hasError: boolean;
    error: string | unknown;
};

//Search slice
interface SearchState {
    stationsFiltered: Station[];
    searchTerm: string;
    filter: string;
}

//config

interface DefaultCity {
    city: string;
    cityCode: string;
    position: [number, number];
}