import type { TechnologyDefinition } from '../../types';

export const tdoSoftwareTechnologyDefinition = {
	id: "tdo-software",
	name: "TDO Software",
	website: "https://wwww.tdo4endo.com",
	description: "TDO is a practice management software designed for endodontists to build a modern office environment.",
	icon: "TDOSoftware.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "tdo-software:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tdosites\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tdo-software:dom:1",
			kind: "dom",
			selector: "link[href*='//tdosites.com'][rel='dns-prefetch']",
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
