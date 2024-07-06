/**
 * Fit text to the width of the page by adjusting font size.
 *
 * @param element Element containing text to fit.
 * @param minFontSizePx Minimum font size, in pixels.
 * @param maxFontSizePx Maximum font size, in pixels.
 */
export function fitText(
	element: HTMLElement,
	minFontSizePx?: number,
	maxFontSizePx?: number,
): void {
	const compressor = 1;
	const minFontSize =
		minFontSizePx !== undefined ? minFontSizePx : Number.NEGATIVE_INFINITY;
	const maxFontSize =
		maxFontSizePx !== undefined ? maxFontSizePx : Number.POSITIVE_INFINITY;

	const resize = () => {
		const newFontSize = Math.max(
			Math.min(element.offsetWidth / (compressor * 10), maxFontSize),
			minFontSize,
		);
		element.style.fontSize = `${newFontSize}px`;
	};

	resize();

	window.addEventListener("resize", resize);
	window.addEventListener("orientationchange", resize);
}
