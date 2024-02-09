import { HorizontalScrollBarInstance } from "@niku/ez-scrollbar-core";
import { useEffect, useRef, type HTMLAttributes } from "react";

export interface HorizontalScrollBarProps
	extends HTMLAttributes<HTMLDivElement> {
	container?: HTMLElement;
	autoHide?: boolean;
}

export const HorizontalScrollBar = ({
	container,
	style,
	autoHide = true,
	...props
}: HorizontalScrollBarProps) => {
	const scrollBarRef = useRef<HTMLDivElement>(null);
	const autoHideRef = useRef(autoHide);
	autoHideRef.current = autoHide;
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (!container) {
			return undefined;
		}

		const scrollBar = new HorizontalScrollBarInstance(container);
		scrollBar.mount();

		const unSubscribe = scrollBar.store.subscribe(() => {
			requestAnimationFrame(() => {
				if (scrollBarRef.current) {
					clearTimeout(timeoutRef.current);
					const { size, offset, crossOffset, containerSize } =
						scrollBar.store.state;
					const show = size < containerSize;

					scrollBarRef.current.style.opacity = show ? "1" : "0";
					scrollBarRef.current.style.visibility = show ? "visible" : "hidden";
					scrollBarRef.current.style.width = `${size}px`;
					scrollBarRef.current.style.transform = `translate3d(${offset}px, ${crossOffset}px, 0)`;
				}

				if (autoHide) {
					timeoutRef.current = setTimeout(() => {
						if (scrollBarRef.current) {
							scrollBarRef.current.style.opacity = "0";
							scrollBarRef.current.style.visibility = "hidden";
						}
					}, 500);
				}
			});
		});

		return () => {
			scrollBar.unmount();
			unSubscribe();
		};
	}, [container]);

	return (
		<div
			{...props}
			ref={scrollBarRef}
			style={{
				position: "absolute",
				height: 5,
				transition: "opacity 0.3s",
				background: "#eeeeee",
				willChange: "transform, opacity",
				bottom: 0,
				left: 0,
				...style,
			}}
		></div>
	);
};
