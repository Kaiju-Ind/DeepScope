import type { TechnologyDefinition } from '../../types';

export const uniconsentTechnologyDefinition = {
	id: "uniconsent",
	name: "Uniconsent",
	website: "https://www.uniconsent.com/",
	description: "Uniconsent is a Consent Management Platform.",
	icon: "Uniconsent.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "uniconsent:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cmp\\.uniconsent\\.mgr\\.consensu\\.org\\/dfp\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "uniconsent:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cmp\\.uniconsent\\.mgr\\.consensu\\.org\\/"),
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
