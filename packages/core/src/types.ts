export interface ScrollBarStore {
	/**
	 * Size of scrollbar.
	 * Is height with Vertical Scrollbar and width with Horizontal ScrollBar
	 */
	size: number;
	/**
	 * Offset of scrollbar.
	 * Is offset top with Vertical Scrollbar and offset left with Horizontal ScrollBar
	 */
	offset: number;
	/**
	 * Cross offset of scrollbar.
	 * Is offset left with Vertical Scrollbar and offset top with Horizontal ScrollBar
	 */
	crossOffset: number;
	/**
	 * Size of container.
	 * Is height with Vertical Scrollbar and width with Horizontal ScrollBar
	 */
	containerSize: number;
}

export interface ScrollBarOptions {
	/**
	 * Container element, which will be scrollable
	 */
	container?: HTMLElement;

	/**
	 * Scrollbar element
	 */
	scrollBar?: HTMLElement;

	/**
	 * Should update scrollbar style
	 */
	updateStyle?: boolean;

	/**
	 * Should scrollbar automatically hide
	 */
	autoHide?: boolean;

	/**
	 * Modify scrollbar store, useful when need to change size or offset of scrollbar
	 */
	modifier?: (store: ScrollBarStore, container: HTMLElement) => ScrollBarStore;
}
