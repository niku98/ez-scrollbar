import { VerticalScrollBarInstance } from "@niku/ez-scrollbar-core";
import {
	defineComponent,
	h,
	ref,
	watch,
	type PropType,
	type StyleValue,
} from "vue";

type ClassValue = string | Record<string, boolean>;

export const VerticalScrollBar = defineComponent({
	inheritAttrs: true,
	props: {
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
		style: {
			type: [String, Object, Array] as PropType<StyleValue>,
			required: false,
			default: true,
		},
	},
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

				const scrollBar = new VerticalScrollBarInstance(containerEl);
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
							scrollBarRef.value.style.height = `${size}px`;
							scrollBarRef.value.style.transform = `translate3d(${crossOffset}px, ${offset}px, 0)`;
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
						width: 5,
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
