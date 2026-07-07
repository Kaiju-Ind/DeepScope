import type { TechnologyDefinition } from '../../types';

export const cartrocketTechnologyDefinition = {
	id: "cartrocket",
	name: "CartRocket",
	website: "https://cartrocket.com",
	description: "CartRocket is a tool for cart abandonment analytics, providing insights into dropped transactions to improve recovery strategies.",
	icon: "CartRocket.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "cartrocket:dom:0",
			kind: "dom",
			selector: "iframe[src*='cartrocket.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cartrocket:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^crt_conv_cp_vtr$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
