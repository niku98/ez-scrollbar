import type { ScrollBarOptions } from "@niku/ez-scrollbar-core";
import type { PropType, StyleValue } from "vue";

type ClassValue = string | Record<string, boolean>;

export interface AxisScrollBarProps {
	class?: ClassValue | ClassValue[];
	container?: HTMLElement;
	autoHide?: boolean;
	style?: StyleValue;
}

export function axisScrollBarProps() {
	return {
		class: {
			type: [String, Object, Array] as PropType<ClassValue | ClassValue[]>,
			required: false,
		},
		container: {
			type: Object as PropType<HTMLElement>,
			required: false,
		},
		autoHide: {
			type: Boolean as PropType<boolean>,
			required: false,
			default: true,
		},
		updateStyle: {
			type: Boolean as PropType<boolean>,
			required: false,
			default: true,
		},
		modifier: {
			type: Function as PropType<ScrollBarOptions["modifier"]>,
			required: false,
		},
		style: {
			type: [String, Object, Array] as PropType<StyleValue>,
			required: false,
			default: true,
		},
	};
}
