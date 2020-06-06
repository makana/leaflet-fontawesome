import * as L from 'leaflet';

import positions from './positions';
import icons from './icons';

document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').fitBounds([[51.0300212, 13.7471477], [51.0438397, 13.7778928]]);

  map.on('click', (e: L.LeafletMouseEvent) => console.log(`${e.latlng.lat}, ${e.latlng.lng}`));

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  for (const type in positions)
  {
    const icon = icons[type] as any;
    for (const c of positions[type])
    {
      L.marker(c, {
        icon,
      }).addTo(map);
    }
  }
});
