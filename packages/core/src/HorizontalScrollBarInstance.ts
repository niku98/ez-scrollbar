import { BaseScrollBarInstance } from "src/BaseScrollBarInstance";

export class HorizontalScrollBarInstance extends BaseScrollBarInstance {
	protected onMount(): void {
		const { scrollBar } = this.options;
		if (!scrollBar) {
			return;
		}

		scrollBar.style.position = "absolute";
		scrollBar.style.left = "0px";
		scrollBar.style.bottom = "0px";
	}

	protected updateStore() {
		const { container, modifier } = this.options;
		if (!container) {
			return;
		}

		this.store.setState(() => {
			const newStoreState = {
				size:
					(container.clientWidth / container.scrollWidth) *
					container.clientWidth,
				offset:
					(container.scrollLeft / container.scrollWidth) *
						container.clientWidth +
					container.scrollLeft,
				containerSize: container.clientWidth,
				crossOffset: container.scrollTop,
			};

			return modifier ? modifier(newStoreState, container) : newStoreState;
		});
	}

	protected updateScrollBarStyle(): void {
		const { scrollBar } = this.options;
		const { containerSize, size, offset, crossOffset } = this.store.state;

		if (!scrollBar) {
			return;
		}

		const show = size < containerSize;

		scrollBar.style.opacity = show ? "1" : "0";
		scrollBar.style.visibility = show ? "visible" : "hidden";
		scrollBar.style.width = `${size}px`;
		scrollBar.style.transform = `translate3d(${offset}px, ${crossOffset}px, 0)`;
	}

	protected onAutoHide(): void {
		const { scrollBar } = this.options;

		if (!scrollBar) {
			return;
		}

		scrollBar.style.opacity = "1";
		scrollBar.style.visibility = "visible";
	}
}
