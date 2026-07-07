import type { TechnologyDefinition } from '../../types';

export const developingAzerbaijanTechnologyDefinition = {
	id: "developing-azerbaijan",
	name: "Developing Azerbaijan",
	website: "https://www.developing.az/",
	description: "Developing Azerbaijan is a provider of services including website creation, optimization, technical support, and hosting.",
	icon: "DevelopingAzerbaijan.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "developing-azerbaijan:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Developing.az", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "developing-azerbaijan:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("developing.az", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
