import { LeafletIconOptions } from './options';
import { IconPrefix, IconName, IconLookup } from '@fortawesome/fontawesome-svg-core';

export interface DefaultOptions extends LeafletIconOptions
{
  /**
   * The default icon prefix to use when specifying icon names.
   */
  faPrefix: IconPrefix;
  /**
   * The dafault marker color.
   */
  markerColor?: string;
  /**
   * The default marker symbol.
   */
  marker?: IconName | IconLookup;
}

/**
 * Default icon options.
 */
export interface Defaults extends Readonly<DefaultOptions> {
  /**
   * Overrides default options.
   */
  (options?: Partial<DefaultOptions>): DefaultOptions;
}

/**
 * The default options.
 */
const _defaults: DefaultOptions = {
  iconSize: [32, 32],
  className: 'leaflet-fontawesome-icon',
  faPrefix: 'fas',
  markerColor: '#1976D2',
  marker: 'map-marker',
};

/**
 * Returns or modifies the default options.
 */
export const defaults: Defaults = Object.assign(
  (options?: Partial<DefaultOptions>): DefaultOptions => Object.assign(defaults, options || {}),
  _defaults,
);
