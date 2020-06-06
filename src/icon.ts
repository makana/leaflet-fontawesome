import { DivIcon, DivIconOptions, point } from 'leaflet';
import { icon, parse, config, Icon as FontawesomeIcon, FontawesomeObject } from '@fortawesome/fontawesome-svg-core';
import { castArray, classList } from './util';
import { FaIconOptions, IconOptions, LeafletIconOptions } from './options';
import { defaults } from './defaults';

/**
 * The type of icon produced by the library.
 */
export type Icon = DivIcon;

type FaIcon = new (options: DivIconOptions) => Icon;
const FaIcon: FaIcon = DivIcon.extend({
  options: {
    ...defaults,
  },
  _setIconStyles(this: InstanceType<FaIcon>, el: HTMLElement, name: 'icon' | 'shadow') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (DivIcon.prototype as any)._setIconStyles.call(this, el, name);

    if (name === 'icon') {
      let { iconSize } = this.options;

      if (iconSize) {
        if (typeof iconSize === 'number') {
          iconSize = [iconSize, iconSize];
        }

        iconSize = point(iconSize);

        el.style.fontSize = `${Math.min(iconSize.x, iconSize.y)}px`;
        el.style.lineHeight = `${iconSize.y}px`;
      }

      el.style.textAlign = 'center';
    }
  },
  createShadow(oldIcon?: HTMLElement) {
    return this._createIcon('shadow', oldIcon);
  },
});

/**
 * Creates a FontAwesome icon object using the given options.
 * @param options The icon creation options.
 */
export function createFaIcon(options: FaIconOptions | FaIconOptions['icon']): FontawesomeIcon {
  if (typeof options === 'string' || 'iconName' in options) {
    options = {
      icon: options,
    };
  }

  const { familyPrefix } = config;
  const { mask, maskId, symbol, title, titleId, attributes, styles, icon: faIcon } = options;

  return icon(typeof faIcon === 'string' ? { prefix: defaults.faPrefix, iconName: faIcon } : faIcon, {
    mask,
    maskId,
    symbol,
    title,
    titleId,
    attributes,
    styles,
    transform: typeof options.transform === 'string' ? parse.transform(options.transform) : options.transform,
    classes: [
      ...classList({
        [`${familyPrefix}-spin`]: !!options.spin,
        [`${familyPrefix}-pulse`]: !!options.pulse,
        [`${familyPrefix}-border`]: !!options.border,
        [`${familyPrefix}-inverse`]: !!options.inverse,
        [`${familyPrefix}-flip-horizontal`]: options.flip === 'horizontal' || options.flip === 'both',
        [`${familyPrefix}-flip-vertical`]: options.flip === 'vertical' || options.flip === 'both',
        [`${familyPrefix}-${options.size}`]: !!options.size,
        [`${familyPrefix}-rotate-${options.rotation}`]: options.rotation != null,
        [`${familyPrefix}-swap-opacity`]: !!options.swapOpacity,
      }),
      ...castArray(options.classes || []),
    ],
  });
}

/**
 * Creates a leaflet icon using the given FontAwesome icon object.
 *
 * Those objects can be created with the FontAwesome SVG library.
 * @param obj The FontAwesome icon object.
 * @param options The leaflet options for the icon object.
 */
export function faIcon(obj: FontawesomeObject, options?: LeafletIconOptions): Icon;
/**
 * Creates a leaflet icon using the given icon options.
 * @param options The icon creation options.
 */
export function faIcon(options: IconOptions | IconOptions['icon']): Icon;
export function faIcon(options: IconOptions | IconOptions['icon'] | FontawesomeObject, leafletOptions?: LeafletIconOptions): Icon {

  if (typeof options === 'string' || 'iconName' in options) {
    options = {
      icon: options,
    };
  }

  leafletOptions = leafletOptions || {};

  if (!('html' in options)) {
    Object.assign(leafletOptions, options);
    options = createFaIcon(options) as FontawesomeObject;
  }

  return new FaIcon({
    ...defaults,
    ...leafletOptions,
    html: options.html.join(' '),
  });
}
