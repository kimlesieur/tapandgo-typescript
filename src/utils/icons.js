import { Icon } from "leaflet";

export const iconBike = new Icon({
    iconUrl: "/assets/icons/bike.svg",
    iconSize: [25, 25],
    popupAnchor:  [0, -10]
});

export const iconPlace = new Icon({
    iconUrl: "/assets/icons/location.png",
    iconSize: [35, 35],
    popupAnchor:  [0, -10]
});

export const iconUser = new Icon({
    iconUrl: "/assets/icons/user.png",
    iconSize: [35, 35],
    popupAnchor:  [0, -10]
})