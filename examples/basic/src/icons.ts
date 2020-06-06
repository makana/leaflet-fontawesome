import { Dictionary } from 'ts-essentials';

import { faMapMarker, faTrain, faTheaterMasks, faLandmark, faSquare, faWater, faMapMarkerAlt, faBeer } from '@fortawesome/free-solid-svg-icons';

import * as LFA from 'leaflet-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faMapMarker);

export default {
  stations: LFA.faLayer({
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
  stages: LFA.faMarker({
    markerColor: 'darkgreen',
    icon: faTheaterMasks,
  }),
  parking: LFA.faLayer({
    iconSize: [24, 24],
    layers: [
      {
        icon: faSquare,
        styles: {
          color: 'royalblue',
        },
      },
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
      {
        text: 20,
        position: 'top-right',
      },
    ],
  }),
  palais: LFA.faIcon({
    iconSize: [32, 32],
    icon: faLandmark,
    styles: {
      color: 'purple',
    },
  }),
  water: LFA.faMarker({
    markerColor: 'ivory',
    icon: faWater,
    styles: {
      color: 'dodgerblue'
    },
  }),
  views: LFA.faMarker({
    iconSize: [24, 24],
    marker: faMapMarkerAlt,
    markerColor: 'crimson',
  }),
  beer: LFA.faIcon({
    iconSize: [12, 12],
    icon: faBeer,
    styles: {
      color: 'saddlebrown',
    },
  }),
} as Dictionary<LFA.Icon>;
