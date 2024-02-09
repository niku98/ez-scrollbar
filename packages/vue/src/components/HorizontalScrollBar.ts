import { HorizontalScrollBarInstance } from "@niku/ez-scrollbar-core";
import { axisScrollBarProps } from "src/components/utils";
import { defineComponent, h, ref, watch } from "vue";

export const HorizontalScrollBar = defineComponent({
	inheritAttrs: true,
	props: axisScrollBarProps(),
	setup(props) {
		const scrollBarRef = ref<HTMLDivElement>();
		const timeout = ref<NodeJS.Timeout>();

		watch(
			() => props.container,
			(_, __, onCleanup) => {
				const containerEl = props.container;
				if (!containerEl) {
					return undefined;
				}

				const scrollBar = new HorizontalScrollBarInstance(containerEl);
				scrollBar.mount();

				const unSubscribe = scrollBar.store.subscribe(() => {
					requestAnimationFrame(() => {
						if (scrollBarRef.value) {
							clearTimeout(timeout.value);
							const { size, offset, crossOffset, containerSize } =
								scrollBar.store.state;
							const show = size < containerSize;

							scrollBarRef.value.style.opacity = show ? "1" : "0";
							scrollBarRef.value.style.visibility = show ? "visible" : "hidden";
							scrollBarRef.value.style.width = `${size}px`;
							scrollBarRef.value.style.transform = `translate3d(${offset}px, ${crossOffset}px, 0)`;
						}

						if (props.autoHide) {
							timeout.value = setTimeout(() => {
								if (scrollBarRef.value) {
									scrollBarRef.value.style.opacity = "0";
									scrollBarRef.value.style.visibility = "hidden";
								}
							}, 500);
						}
					});
				});

				onCleanup(() => {
					scrollBar.unmount();
					unSubscribe();
				});
			},
			{
				immediate: true,
			}
		);

		return () =>
			h("div", {
				ref: scrollBarRef,
				class: props.class,
				style: [
					{
						position: "absolute",
						height: 5,
						transition: "opacity 0.3s",
						background: "#eeeeee",
						willChange: "transform, opacity",
						bottom: 0,
						left: 0,
					},
					...(Array.isArray(props.style) ? props.style : [props.style]),
				],
			});
	},
});
