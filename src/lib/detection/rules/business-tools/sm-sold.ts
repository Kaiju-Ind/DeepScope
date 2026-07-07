import type { TechnologyDefinition } from '../../types';

export const smSoldTechnologyDefinition = {
	id: "sm-sold",
	name: "SM Sold",
	website: "https://smsold.com",
	description: "SM Sold is a platform providing integrated solutions for real estate agents and brokers to manage listings, client interactions, and transactions.",
	icon: "SMSold.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "sm-sold:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.smsold\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "sm-sold:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^SMSold$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sm-sold:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^smsold$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
