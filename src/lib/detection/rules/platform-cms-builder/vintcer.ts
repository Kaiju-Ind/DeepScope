import type { TechnologyDefinition } from '../../types';

export const vintcerTechnologyDefinition = {
	id: "vintcer",
	name: "Vintcer",
	website: "https://vintcer.com",
	description: "Vintcer is a drag-and-drop website builder that includes a built-in page manager, hosting, and email services.",
	icon: "Vintcer.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vintcer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.vintcer\\.com\\/"),
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
