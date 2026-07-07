import type { TechnologyDefinition } from '../../types';

export const affirmTechnologyDefinition = {
	id: "affirm",
	name: "Affirm",
	website: "https://www.affirm.com",
	description: "Affirm is a loan company that allows users to buy goods or services offered by online merchants and pay off those purchases in fixed monthly payments.",
	icon: "Affirm.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "affirm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.affirm\\.com\\/js\\/v([\\d\\.]+)\\/affirm\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "affirm:dom:1",
			kind: "dom",
			selector: "link[href*='.affirm.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "affirm:jsGlobal:2",
			kind: "jsGlobal",
			property: "_affirm_config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "affirm:jsGlobal:3",
			kind: "jsGlobal",
			property: "affirm.Rollbar",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
