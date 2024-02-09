import {
	axisScrollBarProps,
	type AxisScrollBarProps,
} from "src/components/utils";
import { defineComponent, h, ref, type PropType } from "vue";
import { HorizontalScrollBar } from "./HorizontalScrollBar";
import { VerticalScrollBar } from "./VerticalScrollBar";

export const ScrollBar = defineComponent({
	inheritAttrs: true,
	props: {
		horizontal: {
			type: [Boolean, axisScrollBarProps()] as PropType<
				boolean | AxisScrollBarProps
			>,
			required: true,
			default: () => true,
		},
		vertical: {
			type: [Boolean, axisScrollBarProps()] as PropType<
				boolean | AxisScrollBarProps
			>,
			required: true,
			default: () => true,
		},
	},
	setup(props) {
		const containerRef = ref<HTMLDivElement>();
		return () =>
			h(
				"div",
				{
					ref: containerRef,
				},
				[
					props.vertical
						? h(VerticalScrollBar, {
								container: containerRef.value,
								...(typeof props.vertical === "object" ? props.vertical : {}),
						  })
						: null,
					props.horizontal
						? h(HorizontalScrollBar, {
								container: containerRef.value,
								...(typeof props.horizontal === "object"
									? props.horizontal
									: {}),
						  })
						: null,
				]
			);
	},
});
