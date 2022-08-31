import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { useMap } from 'react-leaflet';
import { updateGeo } from '../../app/appSlice';


const Geolocation = () => {
    const map = useMap();
    const dispatch = useAppDispatch();

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const coord: [number, number] = [position.coords.latitude, position.coords.longitude];
            dispatch(updateGeo({coord}));
            map.setView(coord, 14);
        });      
    } else {   
        return null;
    }
    
    return null;
}


export default Geolocation;