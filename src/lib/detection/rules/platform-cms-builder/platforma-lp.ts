import type { TechnologyDefinition } from '../../types';

export const platformaLpTechnologyDefinition = {
	id: "platforma-lp",
	name: "Platforma LP",
	website: "https://platformalp.ru",
	description: "Platforma LP is a web design and development platform that provides ready-to-use website templates for various industries and purposes. It is a collection of over 500 website templates that can be customised and edited according to user needs.",
	icon: "Platforma LP.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "platforma-lp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lpcdn\\.site\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
