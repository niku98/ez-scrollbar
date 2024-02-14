import { HorizontalScrollBarInstance } from "@niku/ez-scrollbar-core";
import { axisScrollBarProps } from "src/components/utils";
import { defineComponent, h, onBeforeUnmount, ref, watch } from "vue";

export const HorizontalScrollBar = defineComponent({
	inheritAttrs: true,
	props: axisScrollBarProps(),
	setup(props) {
		const scrollBarRef = ref<HTMLDivElement>();

		const scrollBar = new HorizontalScrollBarInstance({
			...props,
			scrollBar: scrollBarRef.value,
		});
		scrollBar.mount();

		watch(
			() => [
				props.container,
				props.autoHide,
				props.modifier,
				props.updateStyle,
				scrollBarRef.value,
			],
			() => {
				scrollBar.updateOptions({
					...props,
					scrollBar: scrollBarRef.value,
				});
			}
		);

		onBeforeUnmount(() => {
			scrollBar.unmount();
		});

		return () =>
			h("div", {
				ref: scrollBarRef,
				class: props.class,
				style: props.style,
			});
	},
});
