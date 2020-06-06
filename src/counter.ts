import { counter, config, Counter } from '@fortawesome/fontawesome-svg-core';
import { castArray, classList } from './util';
import { FaCounterOptions } from './options';

/**
 * Creates a FontAwesome counter object using the given options.
 * @param options The counter creation options.
 */
export function createFaCounter(options: FaCounterOptions | FaCounterOptions['text']): Counter {
  if (typeof options === 'string' || typeof options === 'number') {
    options = {
      text: options,
    };
  }

  const { familyPrefix } = config;
  const { title, titleId, attributes, styles } = options;

  return counter(options.text, {
    title,
    titleId,
    attributes,
    styles,
    classes: [
      ...classList({
        [`${familyPrefix}-layers-${options.position}`]: !!options.position,
      }),
      ...castArray(options.classes || []),
    ],
  });
}
