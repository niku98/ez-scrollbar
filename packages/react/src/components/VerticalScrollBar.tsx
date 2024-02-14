import {
	VerticalScrollBarInstance,
	type ScrollBarOptions,
} from "@niku/ez-scrollbar-core";
import { useEffect, useRef, useState, type HTMLAttributes } from "react";

export interface VerticalScrollBarProps
	extends Omit<ScrollBarOptions, "scrollBar">,
		HTMLAttributes<HTMLDivElement> {
	container?: HTMLElement;
	autoHide?: boolean;
}

export const VerticalScrollBar = ({
	container,
	modifier,
	autoHide = true,
	updateStyle,
	style,
	...props
}: VerticalScrollBarProps) => {
	const scrollBarRef = useRef<HTMLDivElement>(null);

	const [scrollBarInstance] = useState(
		() =>
			new VerticalScrollBarInstance({
				container,
				scrollBar: scrollBarRef.current || undefined,
				modifier,
				autoHide,
				updateStyle,
			})
	);

	useEffect(() => {
		scrollBarInstance.updateOptions({
			container,
			scrollBar: scrollBarRef.current || undefined,
			modifier,
			autoHide,
			updateStyle,
		});

		return () => {
			scrollBarInstance.unmount();
		};
	}, [container, autoHide, modifier, updateStyle]);

	return <div {...props} ref={scrollBarRef}></div>;
};
