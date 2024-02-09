import { BaseScrollBarInstance } from "src/BaseScrollBarInstance";

export class VerticalScrollBarInstance extends BaseScrollBarInstance {
	update() {
		this.store.setState((state) => {
			return {
				...state,
				size:
					(this.containerEl.clientHeight / this.containerEl.scrollHeight) *
					this.containerEl.clientHeight,
				offset:
					(this.containerEl.scrollTop / this.containerEl.scrollHeight) *
						this.containerEl.clientHeight +
					this.containerEl.scrollTop,
				crossOffset: this.containerEl.scrollLeft,
				containerSize: this.containerEl.clientHeight,
			};
		});
	}
}
