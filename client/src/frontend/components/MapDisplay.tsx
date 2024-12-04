import React, { useEffect, useState } from "react";
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";

const ViewSurcharges: React.FC = () => {
    const position = { lat: 53.54, lang: 10};
    const [open, setOpen] = useState(false);

    return(
        <APIProvider apiKey="AIzaSyAbc89aJw4wXcxpKxkBBg_RBYIdBIBMPQ4">
            <div style = {{height: '80%', width: '100%'}}>
                <Map
                    zoom={9}
                    center={{ lat: position.lat, lng: position.lang }}
                    mapId="2f3599562737e50d"
                >
                    <AdvancedMarker
                        key = "marker"
                        position = {{ lat: position.lat, lng: position.lang }}
                        // offsetTop = {-20}
                        // offsetLeft = {-10}
                        // draggable
                        // onDragEnd = {({x, y}) => {
                        //     console.log(x, y);
                        // }}
                        onClick={() => setOpen(true)}
                    >
                        <Pin background = {'grey'} borderColor={'green'} glyphColor={'purple'} />
                    </AdvancedMarker>
                    {open && (
                            <InfoWindow position = {{ lat: position.lat, lng: position.lang }} onClose = {() => setOpen(false)}>
                                <div>Restaurant Name</div>
                            </InfoWindow>
                    )}
                </Map>
            </div>
        </APIProvider>
    );
};

export default ViewSurcharges;