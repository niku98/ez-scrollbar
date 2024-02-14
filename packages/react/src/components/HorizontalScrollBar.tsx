import {
	HorizontalScrollBarInstance,
	type ScrollBarOptions,
} from "@niku/ez-scrollbar-core";
import { useEffect, useRef, useState, type HTMLAttributes } from "react";

export interface HorizontalScrollBarProps
	extends Omit<ScrollBarOptions, "scrollBar">,
		HTMLAttributes<HTMLDivElement> {}

export const HorizontalScrollBar = ({
	container,
	autoHide = true,
	modifier,
	updateStyle,
	style,
	...props
}: HorizontalScrollBarProps) => {
	const scrollBarRef = useRef<HTMLDivElement>(null);

	const [scrollBarInstance] = useState(
		() =>
			new HorizontalScrollBarInstance({
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

	return <div {...props} ref={scrollBarRef} />;
};
