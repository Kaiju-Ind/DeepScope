import type { TechnologyDefinition } from '../../types';

export const givecampusTechnologyDefinition = {
	id: "givecampus",
	name: "GiveCampus",
	website: "https://go.givecampus.com",
	description: "GiveCampus is a fundraising platform for nonprofit educational institutions.",
	icon: "GiveCampus.png",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "givecampus:dom:0",
			kind: "dom",
			selector: "a[href*='.givecampus.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "givecampus:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^GiveCampus$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "givecampus:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^givecampus$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
