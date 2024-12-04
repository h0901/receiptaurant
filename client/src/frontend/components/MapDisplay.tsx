import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import "../styles/MapDisplay.css";

const MapDisplay: React.FC = () => {
    const position = { lat: 53.54, lng: 10 }; 
    const [open, setOpen] = useState(false);

    return (
        <div style={{ position: "absolute", top: 300, left: 0, width: "100vw", height: "100%", zIndex: 1 }}>
            <APIProvider apiKey="AIzaSyBaS0jphBt4LprEgnnoH5XU10iyhTPqrU0">
                <div style={{ width: "100%", height: "100%" }}>
                    <Map
                        zoom={9}
                        center={{ lat: position.lat, lng: position.lng }}
                        mapId="fa2cd7e520ce242f"
                        style={{ width: "100%", height: "100%" }}
                    >
                        <AdvancedMarker
                            key="marker"
                            position={{ lat: position.lat, lng: position.lng }}
                            onClick={() => setOpen(true)}
                        >
                            <Pin background={"grey"} borderColor={"green"} glyphColor={"purple"} />
                        </AdvancedMarker>
                        {open && (
                            <InfoWindow
                                position={{ lat: position.lat, lng: position.lng }}
                                onCloseClick={() => setOpen(false)}
                            >
                                <div>Restaurant Name</div>
                            </InfoWindow>
                        )}
                    </Map>
                </div>
            </APIProvider>
        </div>
    );
};

export default MapDisplay;