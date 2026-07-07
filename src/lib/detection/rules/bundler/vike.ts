import type { TechnologyDefinition } from '../../types';

export const vikeTechnologyDefinition = {
	id: "vike",
	name: "Vike",
	website: "https://vike.dev",
	description: "Vike is a framework that enhances Vite applications with server-side rendering (SSR) and static site generation (SSG) capabilities, allowing for flexible integration and progressive enhancement​.",
	icon: "Vike.svg",
	categories: [
		"bundler",
		"ui-library",
		"framework",
	],
	rules: [
		{
			id: "vike:dom:0",
			kind: "dom",
			selector: "script#vike_pageContext",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vike:jsGlobal:1",
			kind: "jsGlobal",
			property: "__vike",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
	},
	implies: [
		"vite",
		"typescript",
	],
} as const satisfies TechnologyDefinition;
