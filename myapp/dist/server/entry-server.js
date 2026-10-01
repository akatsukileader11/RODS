import { StrictMode, useState } from "react";
import { renderToString } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/assets/react.svg
var react_default = "/assets/react-CHdo91hT.svg";
//#endregion
//#region src/assets/vite.svg
var vite_default = "/assets/vite-BF8QNONU.svg";
//#endregion
//#region src/assets/hero.png
var hero_default = "/assets/hero-CLDdwZDr.png";
//#endregion
//#region src/App.tsx
function App() {
	const [count, setCount] = useState(0);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			id: "center",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "hero",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: hero_default,
							className: "base",
							width: "170",
							height: "179",
							alt: ""
						}),
						/* @__PURE__ */ jsx("img", {
							src: react_default,
							className: "framework",
							alt: "React logo"
						}),
						/* @__PURE__ */ jsx("img", {
							src: vite_default,
							className: "vite",
							alt: "Vite logo"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", { children: "Hello everyone" }), /* @__PURE__ */ jsxs("p", { children: [
					"Edit ",
					/* @__PURE__ */ jsx("code", { children: "src/App.tsx" }),
					" and save to test ",
					/* @__PURE__ */ jsx("code", { children: "HMR" })
				] })] }),
				/* @__PURE__ */ jsxs("button", {
					className: "counter",
					onClick: () => setCount((count) => count + 1),
					children: ["Count is ", count]
				})
			]
		}),
		/* @__PURE__ */ jsx("div", { className: "ticks" }),
		/* @__PURE__ */ jsxs("section", {
			id: "next-steps",
			children: [/* @__PURE__ */ jsxs("div", {
				id: "docs",
				children: [
					/* @__PURE__ */ jsx("svg", {
						className: "icon",
						role: "presentation",
						"aria-hidden": "true",
						children: /* @__PURE__ */ jsx("use", { href: "/icons.svg#documentation-icon" })
					}),
					/* @__PURE__ */ jsx("h2", { children: "Documentation" }),
					/* @__PURE__ */ jsx("p", { children: "Your questions, answered" }),
					/* @__PURE__ */ jsxs("ul", { children: [/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
						href: "https://vite.dev/",
						target: "_blank",
						children: [/* @__PURE__ */ jsx("img", {
							className: "logo",
							src: vite_default,
							alt: ""
						}), "Explore Vite"]
					}) }), /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
						href: "https://react.dev/",
						target: "_blank",
						children: [/* @__PURE__ */ jsx("img", {
							className: "button-icon",
							src: react_default,
							alt: ""
						}), "Learn more"]
					}) })] })
				]
			}), /* @__PURE__ */ jsxs("div", {
				id: "social",
				children: [
					/* @__PURE__ */ jsx("svg", {
						className: "icon",
						role: "presentation",
						"aria-hidden": "true",
						children: /* @__PURE__ */ jsx("use", { href: "/icons.svg#social-icon" })
					}),
					/* @__PURE__ */ jsx("h2", { children: "Connect with us" }),
					/* @__PURE__ */ jsx("p", { children: "Join the Vite community" }),
					/* @__PURE__ */ jsxs("ul", { children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
							href: "https://github.com/vitejs/vite",
							target: "_blank",
							children: [/* @__PURE__ */ jsx("svg", {
								className: "button-icon",
								role: "presentation",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("use", { href: "/icons.svg#github-icon" })
							}), "GitHub"]
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
							href: "https://chat.vite.dev/",
							target: "_blank",
							children: [/* @__PURE__ */ jsx("svg", {
								className: "button-icon",
								role: "presentation",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("use", { href: "/icons.svg#discord-icon" })
							}), "Discord"]
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
							href: "https://x.com/vite_js",
							target: "_blank",
							children: [/* @__PURE__ */ jsx("svg", {
								className: "button-icon",
								role: "presentation",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("use", { href: "/icons.svg#x-icon" })
							}), "X.com"]
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
							href: "https://bsky.app/profile/vite.dev",
							target: "_blank",
							children: [/* @__PURE__ */ jsx("svg", {
								className: "button-icon",
								role: "presentation",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("use", { href: "/icons.svg#bluesky-icon" })
							}), "Bluesky"]
						}) })
					] })
				]
			})]
		}),
		/* @__PURE__ */ jsx("div", { className: "ticks" }),
		/* @__PURE__ */ jsx("section", { id: "spacer" })
	] });
}
//#endregion
//#region src/entry-server.tsx
function render(_url) {
	return { html: renderToString(/* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(App, {}) })) };
}
//#endregion
export { render };
