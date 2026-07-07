import type { TechnologyDefinition } from '../../types';

export const mintpayTechnologyDefinition = {
	id: "mintpay",
	name: "Mintpay",
	website: "https://mintpay.lk",
	description: "Mintpay is a system that allows purchases to be made immediately and paid for later in installments.",
	icon: "Mintpay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "mintpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/mintpay\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
