import { BaseScrollBarInstance } from "src/BaseScrollBarInstance";

export class HorizontalScrollBarInstance extends BaseScrollBarInstance {
	update() {
		this.store.setState(() => {
			return {
				size:
					(this.containerEl.clientWidth / this.containerEl.scrollWidth) *
					this.containerEl.clientWidth,
				offset:
					(this.containerEl.scrollLeft / this.containerEl.scrollWidth) *
						this.containerEl.clientWidth +
					this.containerEl.scrollLeft,
				containerSize: this.containerEl.clientWidth,
				crossOffset: this.containerEl.scrollTop,
			};
		});
	}
}
