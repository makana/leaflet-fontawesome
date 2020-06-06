import { text, parse, Text } from '@fortawesome/fontawesome-svg-core';
import { castArray } from './util';
import { FaTextOptions } from './options';

/**
 * Creates a FontAwesome text object using the given options.
 * @param options The text creation options.
 */
export function createFaText(options: FaTextOptions | FaTextOptions['text']): Text {
  if (typeof options === 'string') {
    options = {
      text: options,
    };
  }

  const { title, titleId, attributes, styles } = options;

  return text(options.text, {
    title,
    titleId,
    attributes,
    styles,
    transform: typeof options.transform === 'string' ? parse.transform(options.transform) : options.transform,
    classes: [
      ...castArray(options.classes || []),
    ],
  });
}
