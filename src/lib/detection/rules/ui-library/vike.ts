import type { TechnologyDefinition } from '../../types';

export const vikeTechnologyDefinition = {
	id: "vike",
	name: "Vike",
	website: "https://vike.dev",
	description: "Vike is a framework that enhances Vite applications with server-side rendering (SSR) and static site generation (SSG) capabilities, allowing for flexible integration and progressive enhancement​.",
	icon: "Vike.svg",
	categories: [
		"ui-library",
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
		oss: true,
	},
	implies: [
		"typescript",
		"vite",
	],
} as const satisfies TechnologyDefinition;
