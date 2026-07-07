import type { TechnologyDefinition } from '../../types';

export const vocalreferencesTechnologyDefinition = {
	id: "vocalreferences",
	name: "VocalReferences",
	website: "https://www.vocalreferences.com",
	description: "VocalReferences is a platform offering testimonial, review, and rating tools designed to help online businesses collect and display customer feedback.",
	icon: "VocalReferences.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "vocalreferences:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("widgets\\.vocalreferences\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
