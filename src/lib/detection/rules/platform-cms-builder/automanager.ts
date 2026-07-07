import type { TechnologyDefinition } from '../../types';

export const automanagerTechnologyDefinition = {
	id: "automanager",
	name: "AutoManager",
	website: "https://www.automanager.io",
	description: "AutoManager is a CMS system designed specifically for automotive businesses.",
	icon: "AutoManager.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "automanager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.automanager\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "automanager:dom:1",
			kind: "dom",
			selector: "link[href*='clients.automanager.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
