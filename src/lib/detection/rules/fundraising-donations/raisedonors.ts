import type { TechnologyDefinition } from '../../types';

export const raisedonorsTechnologyDefinition = {
	id: "raisedonors",
	name: "RaiseDonors",
	website: "https://explore.raisedonors.com",
	description: "RaiseDonors is for anyone raising money and cultivating donor relationships online.",
	icon: "RaiseDonors.png",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "raisedonors:dom:0",
			kind: "dom",
			selector: "a[href*='//raisedonors.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "raisedonors:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^RaiseDonors$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "raisedonors:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^raisedonors$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
