import type { TechnologyDefinition } from '../../types';

export const givingfuelTechnologyDefinition = {
	id: "givingfuel",
	name: "GivingFuel",
	website: "https://www.givingfuel.com",
	description: "GivingFuel is a fundraising software solution.",
	icon: "GivingFuel.png",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "givingfuel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.givingfuel\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "givingfuel:dom:1",
			kind: "dom",
			selector: "a[href*='.givingfuel.com/']",
			description: "DOM selector matches a known technology marker.",
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
