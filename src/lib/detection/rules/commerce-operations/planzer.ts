import type { TechnologyDefinition } from '../../types';

export const planzerTechnologyDefinition = {
	id: "planzer",
	name: "Planzer",
	website: "https://www.planzer.ch",
	description: "Planzer is a provider of transport and warehouse logistics services, specializing in efficient and reliable solutions for supply chain management across various industries.",
	icon: "Planzer.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "planzer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/planzer-jobs\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
