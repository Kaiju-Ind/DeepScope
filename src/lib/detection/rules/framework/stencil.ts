import type { TechnologyDefinition } from '../../types';

export const stencilTechnologyDefinition = {
	id: "stencil",
	name: "Stencil",
	website: "https://stenciljs.com",
	description: "Stenciljs is an open-source web component compiler that enables developers to create reusable, interoperable UI components that can work across different frameworks and platforms.",
	icon: "Stencil.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "stencil:dom:0",
			kind: "dom",
			selector: "html[data-stencil-build][class*='hydrated'], stencil-router, stencil-route-link",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "stencil:jsGlobal:1",
			kind: "jsGlobal",
			property: "stencil.inspect",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
