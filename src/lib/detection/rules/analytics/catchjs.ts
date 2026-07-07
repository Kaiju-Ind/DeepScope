import type { TechnologyDefinition } from '../../types';

export const catchjsTechnologyDefinition = {
	id: "catchjs",
	name: "CatchJS",
	website: "https://catchjs.com",
	description: "CatchJS is a JavaScript error-logging tool that captures runtime errors and generates detailed reports for diagnostic analysis.",
	icon: "CatchJS.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "catchjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.catchjs\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "catchjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "catchjs.log",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "catchjs:jsGlobal:2",
			kind: "jsGlobal",
			property: "catchjs_config.clicks",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
