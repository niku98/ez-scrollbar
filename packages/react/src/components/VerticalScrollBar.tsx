import { VerticalScrollBarInstance } from "@niku/ez-scrollbar-core";
import { useEffect, useRef, type HTMLAttributes } from "react";

export interface VerticalScrollBarProps extends HTMLAttributes<HTMLDivElement> {
	container?: HTMLElement;
	autoHide?: boolean;
}

export const VerticalScrollBar = ({
	container,
	style,
	autoHide = true,
	...props
}: VerticalScrollBarProps) => {
	const scrollBarRef = useRef<HTMLDivElement>(null);
	const autoHideRef = useRef(autoHide);
	autoHideRef.current = autoHide;
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (!container) {
			return undefined;
		}

		const scrollBar = new VerticalScrollBarInstance(container);
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
					scrollBarRef.current.style.height = `${size}px`;
					scrollBarRef.current.style.transform = `translate3d(${crossOffset}px, ${offset}px, 0)`;
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
				width: 5,
				transition: "opacity 0.3s",
				background: "#eeeeee",
				willChange: "transform",
				right: 0,
				top: 0,
				...style,
			}}
		></div>
	);
};
