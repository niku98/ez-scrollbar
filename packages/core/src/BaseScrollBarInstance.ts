import { Store } from "@tanstack/store";
import { ScrollBarStore } from "src/types";

export abstract class BaseScrollBarInstance {
	protected resizeObserver: ResizeObserver;
	store: Store<ScrollBarStore>;

	constructor(protected containerEl: HTMLElement) {
		this.resizeObserver = new ResizeObserver(() => {
			this.update();
		});
		this.store = new Store<ScrollBarStore>({
			size: 0,
			offset: 0,
			crossOffset: 0,
			containerSize: 0,
		});
	}

	mount() {
		this.addListeners();
		this.resizeObserver.observe(this.containerEl);

		return () => {
			this.removeListeners();
		};
	}

	unmount() {
		this.removeListeners();
	}

	addListeners() {
		this.containerEl.addEventListener("scroll", this.handleScroll);
	}

	removeListeners() {
		this.containerEl.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll = (e: Event) => {
		this.update();
	};

	abstract update(): void;
}
