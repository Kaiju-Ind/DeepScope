import type { TechnologyDefinition } from '../../types';

export const najvaTechnologyDefinition = {
	id: "najva",
	name: "Najva",
	website: "https://www.najva.com",
	description: "Najva is a retention marketing solution that offers push notification and email marketing.",
	icon: "Najva.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "najva:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.najva\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "najva:jsGlobal:1",
			kind: "jsGlobal",
			property: "Najva.identifyEmailSubscriber",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
