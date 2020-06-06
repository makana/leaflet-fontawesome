import { layer, Layer, FontawesomeObject } from '@fortawesome/fontawesome-svg-core';
import { castArray } from './util';
import { FaLayerOptions, FaTextOptions, LayerOptions } from './options';
import { createFaIcon, faIcon, Icon } from './icon';
import { createFaCounter } from './counter';
import { createFaText } from './text';

/**
 * Evaluates the options for one layer and creates the FontAwesome object.
 * @param options The options for one layer
 */
function createLayerObject(options: FaLayerOptions['layers'][0]): FontawesomeObject
{
  if (typeof options === 'string' || 'iconName' in options)
  {
    return createFaIcon(options);
  }

  if ('html' in options)
  {
    return options;
  }

  if ('text' in options)
  {
    if (typeof options.text === 'number' || 'position' in options)
    {
      return createFaCounter(options);
    }

    return createFaText(options as FaTextOptions);
  }

  return createFaIcon(options);
}

/**
 * Creates a FontAwesome layer icon object using the given options.
 * @param options The layer icon creation options.
 */
export function createFaLayer(options: FaLayerOptions): Layer {
  // This is icon or text, but counter can be added as well
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return layer(add => add(options.layers.map(createLayerObject) as any[]), {
    classes: [
      ...castArray(options.classes || []),
    ],
  });
}

/**
 * Creates a leaflet icon using the given layer icon options.
 * @param options The icon creation options.
 */
export function faLayer(options: LayerOptions): Icon
{
  return faIcon(createFaLayer(options), options);
}
