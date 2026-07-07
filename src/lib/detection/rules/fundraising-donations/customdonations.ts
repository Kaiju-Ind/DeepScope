import type { TechnologyDefinition } from '../../types';

export const customdonationsTechnologyDefinition = {
	id: "customdonations",
	name: "CustomDonations",
	website: "https://customdonations.com",
	description: "CustomDonations is a cloud-based service providing nonprofits with tools to create and manage online donation forms.",
	icon: "CustomDonations.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "customdonations:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.customdonations\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "customdonations:jsGlobal:1",
			kind: "jsGlobal",
			property: "CustomDonations.BuildForm",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
