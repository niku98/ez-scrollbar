import {
	VerticalScrollBarInstance,
	type ScrollBarOptions,
} from "@niku/ez-scrollbar-core";
import { createEffect, onCleanup, type JSX } from "solid-js";

export interface VerticalScrollBarProps
	extends Omit<ScrollBarOptions, "scrollBar">,
		JSX.HTMLAttributes<HTMLDivElement> {
	style?: JSX.CSSProperties;
}

export const VerticalScrollBar = (props: VerticalScrollBarProps) => {
	let scrollBarRef: HTMLDivElement | undefined;

	const scrollBarInstance = new VerticalScrollBarInstance({
		container: props.container,
		autoHide: props.autoHide,
		modifier: props.modifier,
		updateStyle: props.updateStyle,
		scrollBar: scrollBarRef,
	});

	createEffect(() => {
		scrollBarInstance.updateOptions({
			container: props.container,
			autoHide: props.autoHide,
			modifier: props.modifier,
			updateStyle: props.updateStyle,
			scrollBar: scrollBarRef,
		});

		onCleanup(() => {
			scrollBarInstance.unmount();
		});
	});

	return <div {...props} ref={scrollBarRef}></div>;
};
