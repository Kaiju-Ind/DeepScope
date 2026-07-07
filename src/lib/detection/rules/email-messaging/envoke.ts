import type { TechnologyDefinition } from '../../types';

export const envokeTechnologyDefinition = {
	id: "envoke",
	name: "Envoke",
	website: "https://envoke.com/",
	description: "Envoke is a CASL-compliant email marketing software designed for communications professionals in business, education, and the public sector, with a focus on security and compliance.",
	icon: "Envoke.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "envoke:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.envoke\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
