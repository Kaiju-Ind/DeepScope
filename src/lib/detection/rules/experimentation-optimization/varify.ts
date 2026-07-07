import type { TechnologyDefinition } from '../../types';

export const varifyTechnologyDefinition = {
	id: "varify",
	name: "Varify",
	website: "https://varify.io",
	description: "Varify is an A/B testing platform that provides traffic flat rates for data-driven web page optimization aimed at increasing conversions.",
	icon: "Varify.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "varify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.varify\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "varify:jsGlobal:1",
			kind: "jsGlobal",
			property: "varify.debug",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "varify:jsGlobal:2",
			kind: "jsGlobal",
			property: "webpackChunkvarify_io",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
