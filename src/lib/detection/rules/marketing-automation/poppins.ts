import type { TechnologyDefinition } from '../../types';

export const poppinsTechnologyDefinition = {
	id: "poppins",
	name: "Poppins",
	website: "https://poppins.so",
	description: "Poppins is a tool that enables notifications on websites, ranging from video alerts to informational popups.",
	icon: "Poppins.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "poppins:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/poppins\\.so\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
