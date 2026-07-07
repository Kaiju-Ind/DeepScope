import type { TechnologyDefinition } from '../../types';

export const getsitecontrolTechnologyDefinition = {
	id: "getsitecontrol",
	name: "Getsitecontrol",
	website: "https://getsitecontrol.com",
	description: "Getsitecontrol is a form and popup builder.",
	icon: "Getsitecontrol.svg",
	categories: [
		"widgets-misc",
		"surveys-feedback",
	],
	rules: [
		{
			id: "getsitecontrol:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getsitecontrol\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
