import type { TechnologyDefinition } from '../../types';

export const viziumTechnologyDefinition = {
	id: "vizium",
	name: "Vizium",
	website: "https://www.vizium.com/products/patient-surveying",
	description: "Vizium is a platform that aggregates and analyzes patient reviews to support healthcare quality assessment.",
	icon: "Vizium.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "vizium:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("portal\\.vizium\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
