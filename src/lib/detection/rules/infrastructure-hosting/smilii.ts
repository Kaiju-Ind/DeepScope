import type { TechnologyDefinition } from '../../types';

export const smiliiTechnologyDefinition = {
	id: "smilii",
	name: "Smilii",
	website: "https://smilii.net",
	description: "Smilii is a family-owned web hosting provider and internet domain registrar offering domain registration and website hosting services.",
	icon: "Smilii.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "smilii:header:0",
			kind: "header",
			key: "Platform",
			valuePattern: new RegExp("^Smilii$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "smilii:header:1",
			kind: "header",
			key: "platform",
			valuePattern: new RegExp("^smilii$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
