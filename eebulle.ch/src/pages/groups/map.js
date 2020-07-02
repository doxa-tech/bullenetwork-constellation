/*

Create a Swiss Topo Map

Few changes were made to make it working with Gatsby:

GeoAdmin provides one script to rule them all, swisstopo.loader.js. 
This file originally configure settings and include others scripts: 
Proj4.js, Proj4 definitions, OpenLayer mixed with GeoAdmin intergration and a stylesheet
We modified the loader and removed those scripts to include them ourself in the <head>: see <Helmet> in the component

React Hooks were used to create the map. We have to wait that the scripts are loaded before taking action: 
see if (window.ga !== undefined)
The global variables (ol, ga) are availables in the window object.

*/

import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"

const createMap = () => {
  var ga = window.ga;
  var ol = window.ol;

  // proj4 definition
  window.proj4.defs("EPSG:2056","+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs");

  //
  // Create a GeoAdmin Map
  //
  var layer = ga.layer.create('ch.swisstopo.pixelkarte-farbe');
  var map = new ga.Map({

    // Define the div where the map is placed
    target: 'map',
    layers: [layer],
    // Create a view
    view: new ol.View({

      // Define the default resolution
      // 10 means that one pixel is 10m width and height
      // List of resolution of the WMTS layers:
      // 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5, 0.25, 0.1
      resolution: 50,

      // Define a coordinate CH1903+ (EPSG:2056) for the center of the view
      center: [2572802.34, 1171059.25]
    })
  });

  //
  // Create Markers
  //

  // Create the marker style
  var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
      anchor: [0.5, 54],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 1,
      src: '/marker.png'
    }))
  });


  // Fetching the Gdms from diretctus. Directus saves the coorinates in the
  // standard form, but here we need to convert them to the EPSG:2056 format. We
  // then create a new layer that contains all the markers and add this layer to
  // the map.
  fetch(`https://panda.bullenetwork.ch/directus/items/eebulle_gdms`)
    .then(response => response.json())
    .then(resultData => {

      // features will contain the marker
      var features = []

      resultData.data.forEach(gdm => {

        // Convert the coordinate to the right format for swisstopo
        const coordinate = ol.proj.fromLonLat(
          [gdm.location_map.lng, gdm.location_map.lat],
          "EPSG:2056"
        )

        // Create a new feature, ie. a marker, and add it to the list
        features.push(
          new ol.Feature({
            geometry: new ol.geom.Point(coordinate),
            desc: `À ${gdm.location} avec ${gdm.leader}`
          })
        );
      });

      // Create a new layer that contains our features, ie. markers
      var markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: features,
        }),
        style: iconStyle
      });

      // Add the maker layer to the map
      map.addLayer(markerLayer);
    }
  )

  //
  // Create the Popup
  //

  var container = document.getElementById('popup');
  var content = document.getElementById('popup-content');
  var closer = document.getElementById('popup-closer');

  // Add the popup to the map
  var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    },
    offset: [0.5, -40]
  });
  map.addOverlay(overlay);

  // Set the close button on the popup
  closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };

  // Set the click listener: if the user clicks on the map where there is a
  // marker, we open the popup at the marker's location and set the popup content
  // from the "desc" attribute of the marker.
  map.on("singleclick", function (event) {
    map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
      content.innerHTML = feature.getProperties().desc;
      overlay.setPosition(feature.getGeometry().getCoordinates());
    })
  });

  // to get a coordinate:
  // http://epsg.io/map#srs=2056&x=2572802.34&y=1171059.25&z=12&layer=streets
}

const Map = () => {
  
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.ga !== undefined && !active) {
      createMap();
      setActive(true);
    }
  });

  return (
    <div className="map-wrapper">

      <Helmet>
        <link rel="stylesheet" type="text/css" href="https://public.geo.admin.ch/resources/api/4.4.2/ga.css" />
        <script src="swisstopo.loader.js" />
        <script src="//cdnjs.cloudflare.com/ajax/libs/proj4js/2.2.1/proj4.js" />
        <script src="ga.js" />
      </Helmet>

      <div id="map" className="map"></div>
      <div id="popup" className="ol-popup">
        <a href="#" id="popup-closer" className="ol-popup-closer"></a>
        <div id="popup-content"></div>
      </div>
    </div>
  )
}

export default Map