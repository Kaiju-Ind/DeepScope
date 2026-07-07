import type { TechnologyDefinition } from '../../types';

export const fohrTechnologyDefinition = {
	id: "fohr",
	name: "Fohr",
	website: "https://www.fohr.co",
	description: "Fohr is a platform that improves collaboration between brands and influencers, focusing on building brands through influencer marketing.",
	icon: "Fohr.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "fohr:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.fohr\\.co", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "fohr:meta:1",
			kind: "meta",
			key: "name",
			valuePattern: new RegExp("^Fohr$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "fohr:meta:2",
			kind: "meta",
			key: "title",
			valuePattern: new RegExp("^Fohr$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "fohr:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.fohr\\.co", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "fohr:meta:4",
			kind: "meta",
			key: "name",
			valuePattern: new RegExp("^fohr$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "fohr:meta:5",
			kind: "meta",
			key: "title",
			valuePattern: new RegExp("^fohr$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
