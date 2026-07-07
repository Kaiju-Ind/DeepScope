import type { TechnologyDefinition } from '../../types';

export const evidonTechnologyDefinition = {
	id: "evidon",
	name: "Evidon",
	website: "https://www.evidon.com",
	description: "Evidon is a transparency company that helps organizations educate consumers on how and why data is collected, as well as provide consumers with the ability to give and withdraw consent to their data being used.",
	icon: "Evidon.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "evidon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.evidon\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "evidon:dom:1",
			kind: "dom",
			selector: "a[href*='info.evidon.com/pub_info/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "evidon:jsGlobal:2",
			kind: "jsGlobal",
			property: "EB.EvidonConsent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "evidon:jsGlobal:3",
			kind: "jsGlobal",
			property: "evidon",
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
