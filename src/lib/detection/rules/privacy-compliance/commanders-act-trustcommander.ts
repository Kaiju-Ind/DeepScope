import type { TechnologyDefinition } from '../../types';

export const commandersActTrustcommanderTechnologyDefinition = {
	id: "commanders-act-trustcommander",
	name: "Commanders Act TrustCommander",
	website: "https://www.commandersact.com/en/solutions/trustcommander/",
	description: "Commanders Act TrustCommander is a consent management platform (CMP) which allows you to comply with the general data protection regulation (GDPR) regulation in terms of collecting consent.",
	icon: "Commanders Act.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "commanders-act-trustcommander:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.trustcommander\\.net\\/privacy\\/.+_v([\\d]+)_([\\d]+)\\.js"),
			version: {
				source: "match",
				template: "$1.$2",
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
