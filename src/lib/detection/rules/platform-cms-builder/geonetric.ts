import type { TechnologyDefinition } from '../../types';

export const geonetricTechnologyDefinition = {
	id: "geonetric",
	name: "Geonetric",
	website: "https://www.geonetric.com",
	description: "Geonetric is a provider of website solutions tailored to the healthcare industry.",
	icon: "Geonetric.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "geonetric:jsGlobal:0",
			kind: "jsGlobal",
			property: "Geonetric.DOM",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "geonetric:jsGlobal:1",
			kind: "jsGlobal",
			property: "Geonetric_DoPostBack",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
