import type { TechnologyDefinition } from '../../types';

export const mavrckTechnologyDefinition = {
	id: "mavrck",
	name: "Mavrck",
	website: "https://www.mavrck.co",
	description: "Mavrck is an influencer marketing platform that supports creator discovery, campaign management, content workflows, and performance measurement across social media channels.",
	icon: "Mavrck.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mavrck:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mavrck\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mavrck:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Mavrck\\.Co", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
