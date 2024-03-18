import { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "axios";
import {Marker} from '@googlemaps/adv-markers-utils';
import { classNames } from "primereact/utils";
import emaLogo from "../../images/HLO/ema.svg"

const CenterMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDG_cI9vDGPPL7ThflQznqYx_mjyDp9Ncc",
  });

  const [emaLocation, setEmaLocation] = useState({ lng: 32.7471554, lat: 39.8740773 });
  const [adcLocation, setAdcLocation] = useState({ lng: 32.7471554, lat: 39.8740773 });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/ema/");
        const locationArray = response.data["0"].location.split(",");
        setEmaLocation({ lng: parseFloat(locationArray[1]), lat: parseFloat(locationArray[0]) });
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    };
    
    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/acc/");
        const locationArray = response.data["0"].location.split(",");
        setAdcLocation({ lng: parseFloat(locationArray[1]), lat: parseFloat(locationArray[0]) });
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    };
    
    fetchLocation();
  }, []);

  const [locationsArray, setLocationsArray] = useState([]);

//   const mapRef = useRef(null);

//   const onMapLoad = useCallback((map) => {
//     mapRef.current = map;
//   }, []);

const mapRef = useRef(null);

const onMapLoad = useCallback((map) => {
  mapRef.current = map;
}, []);

useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/adc/");
        // Correctly update the state with the fetched data
        setLocationsArray(response.data.map((loc) => ({
          ...loc,
          lng: parseFloat(loc.location.split(",")[1]),
          lat: parseFloat(loc.location.split(",")[0]),
        })));
        console.log(response.data);
        
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };
    
    fetchLocations();
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps...";

  return (
    <DefaultLayout>
      <div className="w-full">
        <GoogleMap
          mapContainerStyle={{
            height: "88vh",
          }}
          center={emaLocation}
          zoom={13}
          onLoad={onMapLoad}
        >
          <MarkerF
            position={emaLocation}
            // MAVİ RENK EMA
            icon={'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
          />
          <MarkerF
          position={adcLocation}
          // KIRMIZI RENK ACC
          icon={'https://maps.google.com/mapfiles/ms/icons/red-dot.png'}
          />
          {locationsArray.map((location, index) => (
            <MarkerF
              key={index}
              position={{ lng: parseFloat(location.lng), lat: parseFloat(location.lat) }}
              // YEŞİL RENK ADC
              icon={'https://maps.google.com/mapfiles/ms/icons/green-dot.png'}
            />
          ))}
        </GoogleMap>
      </div>
    </DefaultLayout>
  );
};

export default CenterMap;
