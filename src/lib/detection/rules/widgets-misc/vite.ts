import type { TechnologyDefinition } from '../../types';

export const viteTechnologyDefinition = {
	id: "vite",
	name: "Vite",
	website: "https://vitejs.dev",
	description: "Vite is a frontend build tool and dev server for modern web applications.",
	icon: "vite.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "vite:dom:0",
			kind: "dom",
			selector: "script#vite-legacy-polyfill, script#vite-legacy-entry",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vite:jsGlobal:1",
			kind: "jsGlobal",
			property: "__vite_is_modern_browser",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vite:dom:2",
			kind: "dom",
			selector: "script#vite-legacy-polyfill",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vite:dom:3",
			kind: "dom",
			selector: "script#vite-legacy-entry",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vite:dom:4",
			kind: "dom",
			selector: "link[href*='vite.svg'][rel='icon']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vite:dom:5",
			kind: "dom",
			selector: "script[id^='vite-plugin-']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vite:dom:6",
			kind: "dom",
			selector: "script#vite-legacy-polyfill, script#vite-legacy-entry, link[href*='vite.svg'][rel='icon'], script[id^='vite-plugin-']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
