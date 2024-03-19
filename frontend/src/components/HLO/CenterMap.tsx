import { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import { cities } from "./Data/cities";

const CenterMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDG_cI9vDGPPL7ThflQznqYx_mjyDp9Ncc",
  });

  const [emaLocation, setEmaLocation] = useState([]);
  const [accLocation, setAccLocation] = useState([]);
  const [adcLocations, setAdcLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Ankara");

  const isDarkMode = useDarkMode();

  function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(({ target }) => {
          const { className } = target as HTMLBodyElement;
          setIsDarkMode(className.includes('dark'));
        });
      });

      observer.observe(document.body, { attributes: true });

      return () => {
        observer.disconnect();
      };
    }, []);

    return isDarkMode;
  }

  const darkModeMapStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ]

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const adcResponse = await axios.get("http://localhost:8000/api/adc/");
        setAdcLocations(adcResponse.data.map((loc) => ({
          ...loc,
          lng: parseFloat(loc.location.split(",")[1]),
          lat: parseFloat(loc.location.split(",")[0]),
        })));

        const emaResponse = await axios.get("http://localhost:8000/api/ema/");
        setEmaLocation(emaResponse.data.map((loc) => ({
          ...loc,
          lng: parseFloat(loc.location.split(",")[1]),
          lat: parseFloat(loc.location.split(",")[0]),
        })));

        const accResponse = await axios.get("http://localhost:8000/api/acc/");
        setAccLocation(accResponse.data.map((loc) => ({
          ...loc,
          lng: parseFloat(loc.location.split(",")[1]),
          lat: parseFloat(loc.location.split(",")[0]),
        })));

      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const [locationsArray, setLocationsArray] = useState([]);

  // const mapRef = useRef(null);

  // const onMapLoad = useCallback((map) => {
  //   mapRef.current = map;
  // }, []);

  const mapRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const resetCenter = () => {
    if (mapRef.current) {
      mapRef.current.panTo(cities[selectedCity]);
    }
  };

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
    <div className="w-full">
      <div className="flex flex-col gap-6 xl:flex-row items-end mx-3 mb-3">
        <div className="w-full xl:w-1/3">
          <label className="mb-0.5 block text-lg text-black dark:text-white">
            City
          </label>

          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${selectedCity ? 'text-black dark:text-white' : ''
                }`}
            >
              <option value="" disabled className="text-body dark:text-bodydark">
                Select a city
              </option>
              {Object.keys(cities).map(city => (
                <option value={city} className="text-body dark:text-bodydark">
                  {city}
                </option>
              ))}
            </select>

            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill=""
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>
        <button
          onClick={resetCenter}
          className="bg-primary text-white font-semibold p-2 mb-1.5 rounded-lg "
        >
          Go to City
        </button>
      </div>
      <GoogleMap
        mapContainerStyle={{
          height: "88vh",
        }}
        center={(emaLocation && emaLocation[0]) || (adcLocations && adcLocations[0]) || (accLocation && accLocation[0])}
        zoom={13}
        onLoad={onMapLoad}
        options={{
          styles: isDarkMode ? darkModeMapStyles : undefined,
        }}
      >
        {emaLocation.map((location, index) => (
          <MarkerF
            key={index}
            position={location}
            // Blue marker for EMA
            icon={'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
            onClick={() => setSelectedLocation({ ...location, id: `ema-${index}` })}
          />
        ))}
        {accLocation.map((location, index) => (
          <MarkerF
            key={index}
            position={location}
            // Red marker for ACC
            icon={'https://maps.google.com/mapfiles/ms/icons/red-dot.png'}
            onClick={() => setSelectedLocation({ ...location, id: `acc-${index}` })}
          />
        ))}
        {adcLocations.map((location, index) => (
          <MarkerF
            key={index}
            position={location}
            // Green marker for ADC
            icon={'https://maps.google.com/mapfiles/ms/icons/green-dot.png'}
            onClick={() => setSelectedLocation({ ...location, id: `adc-${index}` })}
          />
        ))}
        {selectedLocation && selectedLocation.name && selectedLocation.address && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h2>{selectedLocation.name}</h2>
              <p>{selectedLocation.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default CenterMap;
