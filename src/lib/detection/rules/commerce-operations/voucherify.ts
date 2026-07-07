import type { TechnologyDefinition } from '../../types';

export const voucherifyTechnologyDefinition = {
	id: "voucherify",
	name: "Voucherify",
	website: "https://www.voucherify.io",
	description: "Voucherify is an incentive optimization engine designed for high-frequency commerce.",
	icon: "Voucherify.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "voucherify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.voucherify\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
