import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { DocumentCreationInputProps } from './DocumentCreationInputProps';
import tw from 'twin.macro';
import MapboxMap from '../MapboxMap';

/**
 * The form screen where a user can place a marker, selecting a location for a region
 * @param documentBuilder the DocumentBuilder that will be written to and ultimately built after the
 * article is completed.
 * @param done the function that notifies the surrounding form that the necessary requirements for
 * this page have been completed.
 */
const PlaceMarker = ({documentBuilder, done}: DocumentCreationInputProps) => {
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(() => {
    if (documentBuilder.coords) {
      const lat = documentBuilder.coords.lat;
      const lng = documentBuilder.coords.lng;
      return new mapboxgl.Marker().setLngLat([lng, lat]);
    } else {
      return null;
    }
  });

  const onInitMapRender = (map: mapboxgl.Map): void => {
    map.on("load", () => {
      if (marker) {
        marker.addTo(map);
        done(true);
      }
    });

    map.on("click", (ev) => {
      done(true);
      // Using callback inside setMarker because otherwise, this closure is stale and marker will
      // always have its initial value: undefined. Using a callback ensures a fresh value is used.
      setMarker(marker => {
        if (marker) marker.remove();
        documentBuilder.coords = {lng: ev.lngLat.lng, lat: ev.lngLat.lat};

        return new mapboxgl.Marker()
          .setLngLat([ev.lngLat.lng, ev.lngLat.lat])
          .addTo(map)
      })
    });
  }

  return (
    <div style={tw`flex flex-col items-center h-full w-full`}>
      <div style={tw`text-center`}>
        <h1>Choose a location for your article</h1>
        <h2>Click anywhere on the map to place a marker. Click again to re-place your marker.</h2>
      </div>
      <MapboxMap handleInitialRender={onInitMapRender} />
    </div>
  );
}

export default PlaceMarker;