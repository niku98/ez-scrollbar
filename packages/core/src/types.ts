export interface ScrollBarStore {
	/**
	 * Size of scrollbar.
	 * Is height with Vertical Scrollbar and width with Horizontal ScrollBar
	 */
	size: number;
	offset: number;
	crossOffset: number;
	containerSize: number;
}
