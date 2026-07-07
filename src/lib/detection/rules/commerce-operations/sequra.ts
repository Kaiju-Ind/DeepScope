import type { TechnologyDefinition } from '../../types';

export const sequraTechnologyDefinition = {
	id: "sequra",
	name: "SeQura",
	website: "https://www.sequra.es",
	description: "SeQura is a FinTech company based in Barcelona, providing digital flexible payment solutions, with a geographical focus on Southern Europe and Latin America.",
	icon: "SeQura.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "sequra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("live\\.sequracdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sequra:jsGlobal:1",
			kind: "jsGlobal",
			property: "Sequra",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sequra:jsGlobal:2",
			kind: "jsGlobal",
			property: "SequraConfiguration",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sequra:jsGlobal:3",
			kind: "jsGlobal",
			property: "sequraProducts",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
