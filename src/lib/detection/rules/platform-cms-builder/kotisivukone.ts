import type { TechnologyDefinition } from '../../types';

export const kotisivukoneTechnologyDefinition = {
	id: "kotisivukone",
	name: "Kotisivukone",
	website: "https://www.kotisivukone.fi",
	description: "Kotisivukone is a Finnish website builder platform.",
	icon: "Kotisivukone.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kotisivukone:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("kotisivukone(?:\\.min)?\\.js"),
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
