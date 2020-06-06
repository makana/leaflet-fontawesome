import { point } from 'leaflet';
import { MarkerOptions, FaIconOptions } from './options';
import { defaults } from './defaults';
import { faLayer } from './layer';
import { Icon, faIcon } from './icon';
import { findIconDefinition, IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Returns the Fontawesome width factor of the given icon. This is equivalent to the `fa-w-XXX`-class.
 * @param icon The icon definition or name.
 */
function getWidthFactor(icon: FaIconOptions['icon']): number {
  icon = typeof icon === 'string' ? { prefix: defaults.faPrefix, iconName: icon } : icon;
  const iconDef = (('icon' in icon) ? icon as IconDefinition : findIconDefinition(icon));

  if (!iconDef?.icon)
  {
    return Number.NaN;
  }
  return Math.ceil(iconDef.icon[0] / iconDef.icon[1] * 16);
}

/**
 * Creates a leaflet icon using a default marker with an inner icon.
 * @param options The icon creation options.
 */
export function faMarker(options: MarkerOptions | FaIconOptions['icon']): Icon {

  if (typeof options === 'string' || 'iconName' in options) {
    options = {
      icon: options,
    };
  }

  const { icon, marker } = options;
  let { iconSize, iconAnchor } = options;
  let x = 0;
  iconSize = iconSize || defaults.iconSize;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerIcon: FaIconOptions['icon'] = marker as any || defaults.marker || 'map-marker'
  const markerWidth = getWidthFactor(markerIcon);

  if (isNaN(markerWidth)) {
    console.error(`Marker icon ${markerIcon} not found. Make sure it is added to the Fontawesome Library.`);
  }

  if (iconSize)
  {
    if (typeof iconSize === 'number') {
      iconSize = [iconSize, iconSize];
    }
    iconSize = point(iconSize);

    if (!iconAnchor) {
      iconAnchor = [iconSize.x / 2, iconSize.y];
    }

    if (!options.transform && icon)
    {
      const iconWidth = Math.ceil(iconSize.x / iconSize.y * 16);
      const symbolWidth = getWidthFactor(icon);
      if (symbolWidth > iconWidth)
      {
        x = (iconWidth - symbolWidth) / 2;
      }
    }
  }

  if (icon)
  {
    return faLayer({
      iconSize,
      iconAnchor,
      ...options,
      layers: [
        {
          icon: markerIcon,
          styles: {
            color: options.markerColor ?? defaults.markerColor ?? '',
          },
        },
        {
          ...defaults,
          inverse: true,
          transform: {
            size: 7,
            y: -2,
            x,
          },
          icon,
          ...options,
        },
      ],
    });
  }

  return faIcon({
    iconSize,
    iconAnchor,
    ...options,
    icon: markerIcon,
    styles: {
      color: options.markerColor ?? defaults.markerColor ?? '',
    },
  });
}
