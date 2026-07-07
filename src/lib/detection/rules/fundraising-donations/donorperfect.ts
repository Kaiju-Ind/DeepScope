import type { TechnologyDefinition } from '../../types';

export const donorperfectTechnologyDefinition = {
	id: "donorperfect",
	name: "DonorPerfect",
	website: "https://www.donorperfect.com",
	description: "DonorPerfect is a fundraising management software.",
	icon: "DonorPerfect.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "donorperfect:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.donorperfect\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "donorperfect:dom:1",
			kind: "dom",
			selector: "a[href*='.donorperfect.']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
