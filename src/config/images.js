// ---------------------------------------------------------------------------
// PHOTOGRAPHY — every image slot on the site, and what has to go in it.
//
// Every entry is null. Each slot renders a composed placeholder until its
// entry is filled in, and the layout does not move when it is: the aspect
// ratio and size are already reserved by the component.
//
// To add a photograph:
//   1. Drop the file in public/img/
//   2. Fill in { src, alt, width, height } below
//
// `alt` is required and is not optional politeness — these are content
// images, and a slot with no alt text is a slot that fails for anyone using a
// screen reader. Write what the photograph shows, not "hero image".
//
// See OPEN-ITEMS.md for the shot list with dimensions and direction.
// ---------------------------------------------------------------------------

/**
 * @typedef {object} SiteImage
 * @property {string} src     Path under /img/.
 * @property {string} alt     What the photograph actually shows.
 * @property {number} width   Intrinsic width, to reserve layout space.
 * @property {number} height  Intrinsic height.
 * @property {boolean} [eager] Skip lazy-loading. Only for above-the-fold.
 */

/** @type {Record<string, SiteImage|null>} */
export const IMAGES = {
  /** Homepage hero, right column. Portrait 4:5. Above the fold — set eager. */
  'home-hero': null,

  /** Filing guide header. Landscape 16:9, sits full-bleed above the steps. */
  'guide-header': null,

  /** Plans page, beside the terms list. Portrait 3:4. */
  'plans-terms': null,

  /** Trust section, left of the operator statement. Square 1:1. */
  'trust-operator': null,
};
