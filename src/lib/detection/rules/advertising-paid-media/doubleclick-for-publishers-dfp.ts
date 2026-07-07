import type { TechnologyDefinition } from '../../types';

export const doubleclickForPublishersDfpTechnologyDefinition = {
	id: "doubleclick-for-publishers-dfp",
	name: "DoubleClick for Publishers (DFP)",
	website: "https://www.google.com/dfp",
	description: "DoubleClick for Publishers (DFP) is a hosted ad serving platform that streamlines your ad management.",
	icon: "DoubleClick.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "doubleclick-for-publishers-dfp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("googletagservices\\.com\\/tag\\/js\\/gpt(?:_mobile)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
