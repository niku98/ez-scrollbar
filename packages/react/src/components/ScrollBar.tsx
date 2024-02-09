import { useState, type HTMLAttributes } from "react";
import {
	HorizontalScrollBar,
	type HorizontalScrollBarProps,
} from "./HorizontalScrollBar";
import {
	VerticalScrollBar,
	type VerticalScrollBarProps,
} from "./VerticalScrollBar";

export interface ScrollBarProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Horizontal scrollbar props
	 * @default true
	 */
	horizontal?: boolean | Omit<HorizontalScrollBarProps, "container">;

	/**
	 * Vertical scrollbar props
	 * @default true
	 */
	vertical?: boolean | Omit<VerticalScrollBarProps, "container">;
}

export const ScrollBar = ({
	children,
	vertical = true,
	horizontal = true,
	...props
}: ScrollBarProps) => {
	const [container, setContainer] = useState<HTMLDivElement>();

	return (
		<div
			{...props}
			ref={(el) => {
				if (container !== el) {
					setContainer(el || undefined);
				}
			}}
		>
			{children}
			{horizontal ? (
				<HorizontalScrollBar
					container={container}
					{...(typeof horizontal === "object" ? horizontal : {})}
				/>
			) : null}
			{vertical ? (
				<VerticalScrollBar
					container={container}
					{...(typeof vertical === "object" ? vertical : {})}
				/>
			) : null}
		</div>
	);
};
