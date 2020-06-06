# leaflet-fontawesome

Small library to use FontAwesome 5 SVG icons as Leaflet markers.

![Screenshot](/screenshots/example.png)

## Usage

```typescript
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarker, faTrain, faTheaterMasks, faSquare, faLandmark, faWater, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faIcon, faLayer, faMarker, defaults } from 'leaflet-fontawesome';

// add the default marker to the library!
library.add(faMapMarker);

// or add it as default
defaults({
  marker: faMapMarker,
  markerColor: 'chocolate',
});

// Create a simple colored marker with inverted symbol
L.marker(latLng, {
  icon: faMarker(faTrain),
}).addTo(map);

// Create a colored marker with custom options
L.marker(latLng, {
  icon: faMarker({
    icon: faTheaterMasks,
    markerColor: 'darkgreen',
  }),
}).addTo(map);

// Create a layered icon with text
L.marker(latLng, {
  icon: faLayer({
    iconSize: [24, 24],
    layers: [
      {
        icon: faSquare,
        styles: {
          color: 'royalblue',
        },
      },
      // Text
      {
        text: 'P',
        styles: {
          color: 'white',
          'font-weight': '900',
        },
        transform: {
          size: 12,
        },
      },
      // Counter
      {
        text: 20,
        position: 'top-right',
      },
    ],
  }),
}).addTo(map);

// Create a custom icon
L.marker(latLng, {
  icon: faIcon({
    iconSize: [32, 32],
    icon: faLandmark,
    styles: {
      color: 'purple',
    },
  }),
}).addTo(map);

// Create a marker with custom options
L.marker(latLng, {
  icon: faMarker({
    markerColor: 'ivory',
    icon: faWater,
    styles: {
      color: 'dodgerblue'
    },
  }),
}).addTo(map);

// Create a custom marker without symbol
L.marker(latLng, {
  icon: faMarker({
    iconSize: [24, 24],
    marker: faMapMarkerAlt,
    markerColor: 'crimson',
  }),
}).addTo(map);

// Create a custom marker
L.marker(latLng, {
  icon: faLayer({
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    layers: [
      {
        icon: faMapMarker,
        styles: {
          color: 'chocolate',
        },
      },
      {
        icon: faTrain,
        inverse: true,
        transform: {
          size: 7,
          y: -2,
        },
      },
    ],
  }),
}).addTo(map);
```

## Fix CSS

If you are using FontAwesome Layers with text, it will happen that the text is behind the marker.
This is due to CSS from Leaflet that sets the z-index of all SVG elements within the map to 200.
To fix this, include the following CSS into your document.

```css
.leaflet-map-pane .leaflet-fontawesome-icon svg {
  z-index: unset;
}
```
