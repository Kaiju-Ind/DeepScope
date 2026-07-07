import type { TechnologyDefinition } from '../../types';

export const morevagoTechnologyDefinition = {
	id: "morevago",
	name: "MoreVago",
	website: "https://www.morevago.com",
	description: "MoreVago is a platform that displays customer testimonials and reviews to help businesses increase conversions and sales.",
	icon: "MoreVago.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "morevago:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.morevago\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "morevago:jsGlobal:1",
			kind: "jsGlobal",
			property: "morevagoOptions",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "morevago:jsGlobal:2",
			kind: "jsGlobal",
			property: "objMorevago",
			description: "Page-owned global matches a known technology marker.",
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
