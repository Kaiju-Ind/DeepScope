import type { TechnologyDefinition } from '../../types';

export const paybrightTechnologyDefinition = {
	id: "paybright",
	name: "PayBright",
	website: "https://paybright.com",
	description: "PayBright is a Canadian fintech company that offers short-term interest-free installment loans for online shopping to consumers at checkout.",
	icon: "PayBright.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paybright:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.paybright\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "paybright:dom:1",
			kind: "dom",
			selector: "link[href*='app.paybright.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "paybright:jsGlobal:2",
			kind: "jsGlobal",
			property: "_paybright_config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
