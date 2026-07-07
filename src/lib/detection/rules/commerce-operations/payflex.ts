import type { TechnologyDefinition } from '../../types';

export const payflexTechnologyDefinition = {
	id: "payflex",
	name: "Payflex",
	website: "https://payflex.co.za/",
	description: "Payflex offers an online payment gateway solution to South African merchants that allows shoppers to pay over 6 weeks, interest-free.",
	icon: "Payflex.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "payflex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("partpayassets\\.blob\\.core\\.windows\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "payflex:dom:1",
			kind: "dom",
			selector: "[aria-labelledby='pi-payflex']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
