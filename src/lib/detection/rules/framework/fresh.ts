import type { TechnologyDefinition } from '../../types';

export const freshTechnologyDefinition = {
	id: "fresh",
	name: "Fresh",
	website: "https://fresh.deno.dev",
	description: "Fresh is a full stack modern web framework for JavaScript and TypeScript developers, designed to make it trivial to create high-quality, performant, and personalized web applications.",
	icon: "Fresh.svg",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "fresh:dom:0",
			kind: "dom",
			selector: "style[id='__FRSH_TWIND']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fresh:dom:1",
			kind: "dom",
			selector: "style[id='__FRSH_STYLE']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fresh:dom:2",
			kind: "dom",
			selector: "script[id='__FRSH_STATE']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fresh:dom:3",
			kind: "dom",
			selector: "link[href*='?__frsh_c=']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"deno",
		"preact",
	],
} as const satisfies TechnologyDefinition;
