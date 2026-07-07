import type { TechnologyDefinition } from '../../types';

export const sendxTechnologyDefinition = {
	id: "sendx",
	name: "SendX",
	website: "https://www.sendx.io",
	description: "SendX is an email marketing software designed to help users send campaigns, build mailing lists, and automate marketing.",
	icon: "SendX.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sendx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sendx\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sendx:jsGlobal:1",
			kind: "jsGlobal",
			property: "_sendx",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
