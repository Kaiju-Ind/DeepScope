import type { TechnologyDefinition } from '../../types';

export const noticeableTechnologyDefinition = {
	id: "noticeable",
	name: "Noticeable",
	website: "https://noticeable.io",
	description: "Noticeable is a platform that simplifies product updates and company announcements while enhancing user communication and feedback analysis.",
	icon: "Noticeable.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "noticeable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.noticeable\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "noticeable:jsGlobal:1",
			kind: "jsGlobal",
			property: "noticeable",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
