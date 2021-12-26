/**
 * Fit text to the width of the page by adjusting font size.
 *
 * @param {HTMLElement} element Element containing text to fit.
 * @param {{minFontSize: string, maxFontSize: string}} options Options for
 *     fitting text.
 */
export function fitText(element, options) {
  const compressor = options.compressor || 1;
  const minFontSize =
      parseFloat(options.minFontSize) || Number.NEGATIVE_INFINITY;
  const maxFontSize =
      parseFloat(options.maxFontSize) || Number.POSITIVE_INFINITY;

  const resize = () => {
    const newFontSize = Math.max(
        Math.min(element.offsetWidth / (compressor * 10), maxFontSize),
        minFontSize);
    element.style.fontSize = `${newFontSize}px`;
  };

  resize();

  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', resize);
}
