import { ScrollBar } from "@niku/ez-scrollbar-solid";

const App = () => {
	return (
		<ScrollBar
			style={{
				height: "100vh",
				width: "100vw",
				overflow: "auto",
				position: "relative",
			}}
			vertical={{
				class: "vertical-scrollbar",
				style: {
					"background-color": "black",
					width: "5px",
				},
				modifier: (store, container) => {
					const containerSize = container.clientHeight - 100;
					return {
						...store,
						containerSize,
						size:
							(container.clientHeight / container.scrollHeight) * store.size,
						offset:
							(container.scrollTop / container.scrollHeight) * containerSize +
							container.scrollTop,
					};
				},
			}}
			horizontal={{
				class: "vertical-scrollbar",
				style: {
					"background-color": "black",
					height: "5px",
					"z-index": "10",
				},
			}}
		>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
			<p
				style={{
					"white-space": "nowrap",
				}}
			>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae! Lorem ipsum dolor sit amet,
				consectetur adipisicing elit. Reiciendis, nulla. Dolore esse tempora
				reprehenderit soluta, iste fugit atque! Fugit accusantium laudantium,
				voluptas totam dolor itaque aut quo similique! Ullam, quidem.
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
			<p
				style={{
					position: "sticky",
					"z-index": 10,
					bottom: 0,
					left: 0,
					background: "gray",
					height: "100px",
					"margin-bottom": "0px",
				}}
			>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				tempore doloribus numquam? Maiores nostrum quisquam officia modi quis,
				dolore dignissimos provident consequatur explicabo dicta pariatur
				assumenda ullam dolor vero repudiandae!
			</p>
		</ScrollBar>
	);
};

export default App;
