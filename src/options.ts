import { BaseIconOptions } from 'leaflet';
import {
  IconName,
  IconLookup,
  IconParams,
  Transform,
  FlipProp,
  RotateProp,
  SizeProp,
  TextParams,
  CounterParams,
  LayerParams,
  Icon,
  Text,
  Counter,
} from '@fortawesome/fontawesome-svg-core';

/**
 * Options to create the leaflet icon.
 */
export type LeafletIconOptions = Omit<BaseIconOptions, 'iconUrl' | 'iconRetinaUrl'>;

/**
 * Options to create a FontAwesome icon.
 */
export interface FaIconOptions extends Omit<IconParams, 'transform'> {
  /**
   * The name or lookup of the FontAwesome icon.
   */
  icon: IconName | IconLookup;
  /**
   * Transformation to apply to the icon.
   */
  transform?: string | Transform;
  /**
   * Whether to create a bordered icon.
   */
  border?: boolean;
  /**
   * Whether to create a flipped icon.
   */
  flip?: FlipProp;
  /**
   * Whether to create a spinning icon with pulse steps.
   */
  pulse?: boolean;
  /**
   * Whether to apply a rotation to the icon.
   */
  rotation?: RotateProp;
  /**
   * Whether to swap the opacity of duotone icons.
   */
  swapOpacity?: false;
  /**
   * How to size the icon.
   */
  size?: SizeProp;
  /**
   * Whether to create a spinning icon.
   */
  spin?: boolean;
  /**
   * Whether to inverse the colors.
   */
  inverse?: boolean;
}

/**
 * The options to create a FontAwesome layered icon.
 */
export interface FaLayerOptions extends LayerParams {
  /**
   * The icons and/or texts from behind to front to add to the layered icon.
   */
  layers: (FaIconOptions | FaIconOptions['icon'] | FaTextOptions | FaCounterOptions | Icon | Text | Counter)[];
}

/**
 * The options to create FontAwesome layer text.
 */
export interface FaTextOptions extends Omit<TextParams, 'transform'> {
  /**
   * The text to display.
   */
  text: string;
  /**
   * Transformation to apply to the text.
   */
  transform?: string | Transform;
}

/**
 * The options to create FontAwesome layer counter text.
 */
export interface FaCounterOptions extends CounterParams {
  /**
   * The text/counter value to display.
   */
  text: string | number;
  /**
   * The position of the counter. Defaults to `top-right`.
   */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

/**
 * The options to create an icon marker.
 */
export interface IconOptions extends FaIconOptions, LeafletIconOptions {
}

/**
 * The options to create a layered icon marker.
 */
export interface LayerOptions extends FaLayerOptions, LeafletIconOptions {
}

/**
 * The options to create a default icon marker.
 */
export interface MarkerOptions extends Omit<FaIconOptions, 'icon'>, LeafletIconOptions {
  /**
   * The name or lookup of the marker icon.
   */
  icon?: FaIconOptions['icon'];
  /**
   * The name or lookup of the marker icon.
   */
  marker?: FaIconOptions['icon'];
  /**
   * The color of the marker.
   */
  markerColor?: string;
}
