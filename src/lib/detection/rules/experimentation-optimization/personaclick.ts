import type { TechnologyDefinition } from '../../types';

export const personaclickTechnologyDefinition = {
	id: "personaclick",
	name: "PersonaClick",
	website: "https://www.personaclick.com",
	description: "PersonaClick is a provide personalisation, recommandation and multi channel services.",
	icon: "PersonaClick.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "personaclick:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.personaclick\\.com\\/v([\\d.]+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "personaclick:jsGlobal:1",
			kind: "jsGlobal",
			property: "personaclick",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "personaclick:jsGlobal:2",
			kind: "jsGlobal",
			property: "personaclick_callback",
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
