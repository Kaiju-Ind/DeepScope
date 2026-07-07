import type { TechnologyDefinition } from '../../types';

export const guideitTechnologyDefinition = {
	id: "guideit",
	name: "GuideIT",
	website: "https://guideit.uk",
	description: "GuideIT is a cloud hosting provider.",
	icon: "GuideIT.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "guideit:header:0",
			kind: "header",
			key: "platform",
			valuePattern: new RegExp("^GuideIT$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "guideit:header:1",
			kind: "header",
			key: "platform",
			valuePattern: new RegExp("^guideit$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
