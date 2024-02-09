import { HorizontalScrollBarInstance } from "@niku/ez-scrollbar-core";
import { createEffect, createMemo, onCleanup, type JSX } from "solid-js";

export interface HorizontalScrollBarProps
	extends JSX.HTMLAttributes<HTMLDivElement> {
	container?: HTMLElement;
	autoHide?: boolean;
	style?: JSX.CSSProperties;
}

export const HorizontalScrollBar = (props: HorizontalScrollBarProps) => {
	let scrollBarRef: HTMLDivElement | undefined;
	let timeout: NodeJS.Timeout;

	const scrollBar = createMemo(() => {
		const containerEl = props.container;
		if (!containerEl) {
			return undefined;
		}

		return new HorizontalScrollBarInstance(containerEl);
	});

	createEffect(() => {
		const scrollBarInstance = scrollBar();
		if (!scrollBarInstance) {
			return;
		}

		scrollBarInstance.mount();

		const unSubscribe = scrollBarInstance.store.subscribe(() => {
			requestAnimationFrame(() => {
				if (scrollBarRef) {
					clearTimeout(timeout);
					const { size, offset, crossOffset, containerSize } =
						scrollBarInstance.store.state;
					const show = size < containerSize;

					scrollBarRef.style.opacity = show ? "1" : "0";
					scrollBarRef.style.visibility = show ? "visible" : "hidden";
					scrollBarRef.style.width = `${size}px`;
					scrollBarRef.style.transform = `translate3d(${offset}px, ${crossOffset}px, 0)`;
				}

				if (props.autoHide) {
					timeout = setTimeout(() => {
						if (scrollBarRef) {
							scrollBarRef.style.opacity = "0";
							scrollBarRef.style.visibility = "hidden";
						}
					}, 500);
				}
			});
		});

		onCleanup(() => {
			scrollBarInstance.unmount();
			unSubscribe();
		});
	});

	const mergedStyle = createMemo(
		(): JSX.CSSProperties => ({
			position: "absolute",
			height: "5px",
			transition: "opacity 0.3s",
			background: "#eeeeee",
			"will-change": "transform, opacity",
			bottom: 0,
			left: 0,
			...props.style,
		})
	);

	return <div {...props} ref={scrollBarRef} style={mergedStyle()}></div>;
};
