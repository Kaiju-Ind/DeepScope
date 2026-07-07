import type { TechnologyDefinition } from '../../types';

export const returnflowsTechnologyDefinition = {
	id: "returnflows",
	name: "Returnflows",
	website: "https://www.returnflows.com",
	description: "Returnflows is a platform that supports businesses in managing product returns and reducing revenue loss associated with refunds.",
	icon: "Returnflows.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "returnflows:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.returnflows\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
