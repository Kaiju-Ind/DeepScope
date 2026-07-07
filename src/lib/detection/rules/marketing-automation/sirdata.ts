import type { TechnologyDefinition } from '../../types';

export const sirdataTechnologyDefinition = {
	id: "sirdata",
	name: "Sirdata",
	website: "https://www.sirdata.com",
	description: "Sirdata is a self-service, third party data-collecting platform that specialises in the collection of behavioural data, predictive targeting and selling of audience segments.",
	icon: "Sirdata.svg",
	categories: [
		"marketing-automation",
		"privacy-compliance",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "sirdata:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:choices|cache)\\.consentframework\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sirdata:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.sddan\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sirdata:jsGlobal:2",
			kind: "jsGlobal",
			property: "SDDAN.cmp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sirdata:jsGlobal:3",
			kind: "jsGlobal",
			property: "Sddan.cmpLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
