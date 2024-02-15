import { BaseScrollBarInstance } from "src/BaseScrollBarInstance";

export class VerticalScrollBarInstance extends BaseScrollBarInstance {
	private oldOffset: number = 0;

	protected onMount(): void {
		const { scrollBar } = this.options;
		if (!scrollBar) {
			return;
		}

		scrollBar.style.position = "absolute";
		scrollBar.style.top = "0px";
		scrollBar.style.right = "0px";
	}

	protected updateStore() {
		const { container, modifier } = this.options;
		if (!container) {
			return;
		}

		this.oldOffset = this.store.state.offset;

		this.store.setState((state) => {
			const newStoreState = {
				...state,
				size:
					(container.clientHeight / container.scrollHeight) *
					container.clientHeight,
				offset:
					(container.scrollTop / container.scrollHeight) *
						container.clientHeight +
					container.scrollTop,
				crossOffset: container.scrollLeft,
				containerSize: container.clientHeight,
			};

			return modifier ? modifier(newStoreState, container) : newStoreState;
		});
	}

	protected updateScrollBarStyle(): void {
		const { scrollBar } = this.options;
		const { size, offset, crossOffset } = this.store.state;

		if (!scrollBar) {
			return;
		}

		const show = this.shouldShowScrollBar();

		// scrollBar.style.position = "absolute";
		// scrollBar.style.top = "0px";
		// scrollBar.style.right = "0px";
		scrollBar.style.opacity = show ? "1" : "0";
		scrollBar.style.visibility = show ? "visible" : "hidden";
		scrollBar.style.height = `${size}px`;
		scrollBar.style.transform = `translate3d(${crossOffset}px, ${offset}px, 0)`;
	}

	protected onAutoHide(): void {
		const { scrollBar } = this.options;

		if (!scrollBar) {
			return;
		}

		scrollBar.style.opacity = "0";
		scrollBar.style.visibility = "hidden";
	}

	protected shouldShowScrollBar(): boolean {
		const { containerSize, size, offset } = this.store.state;

		if (offset === this.oldOffset) {
			return false;
		}

		return size < containerSize;
	}
}
