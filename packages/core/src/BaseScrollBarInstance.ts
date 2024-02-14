import { Store } from "@tanstack/store";
import { ScrollBarOptions, ScrollBarStore } from "src/types";

export abstract class BaseScrollBarInstance {
	protected options: ScrollBarOptions;
	protected resizeObserver?: ResizeObserver;
	protected storeUnSubscriber?: () => void;
	private autoHideTimeout?: NodeJS.Timeout;
	store: Store<ScrollBarStore>;

	constructor(options: ScrollBarOptions) {
		this.options = {
			updateStyle: true,
			...options,
		};
		this.store = new Store<ScrollBarStore>({
			size: 0,
			offset: 0,
			crossOffset: 0,
			containerSize: 0,
		});
	}

	updateOptions(options: ScrollBarOptions) {
		this.options = {
			...options,
			updateStyle: options.updateStyle ?? true,
			autoHide: options.autoHide ?? true,
		};
		this.unmount();
		this.mount();
	}

	mount() {
		this.addListeners();
		this.options.container &&
			this.resizeObserver?.observe(this.options.container);

		this.onMount();

		return () => {
			this.unmount();
		};
	}

	unmount() {
		this.removeListeners();
		this.options.container &&
			this.resizeObserver?.unobserve(this.options.container);
		this.resizeObserver?.disconnect();
	}

	addListeners() {
		const { container } = this.options;
		container && container.addEventListener("scroll", this.handleScroll);
		this.resizeObserver = new ResizeObserver(() => {
			this.updateStore();
		});

		this.storeUnSubscriber = this.store.subscribe(() => {
			clearTimeout(this.autoHideTimeout);
			const { scrollBar, updateStyle } = this.options;
			const { containerSize, size, offset, crossOffset } = this.store.state;

			if (!scrollBar) {
				return;
			}

			const show = size < containerSize;

			scrollBar.setAttribute("data-visible", show ? "true" : "false");
			scrollBar.setAttribute("data-size", `${size}px`);
			scrollBar.setAttribute("data-offset", `${offset}px`);
			scrollBar.setAttribute("data-cross-offset", `${crossOffset}px`);

			if (updateStyle) {
				this.updateScrollBarStyle();
			}

			this.autoHideTimeout = setTimeout(() => {
				if (scrollBar) {
					scrollBar.setAttribute("data-visible", "false");
				}

				if (updateStyle) {
					this.onAutoHide();
				}
			}, 500);
		});
	}

	removeListeners() {
		const { container } = this.options;
		container && container.removeEventListener("scroll", this.handleScroll);
		this.storeUnSubscriber?.();
	}

	handleScroll = (e: Event) => {
		this.updateStore();
	};

	protected abstract onMount(): void;
	protected abstract updateStore(): void;
	protected abstract updateScrollBarStyle(): void;
	protected abstract onAutoHide(): void;
}
