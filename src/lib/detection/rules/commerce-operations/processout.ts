import type { TechnologyDefinition } from '../../types';

export const processoutTechnologyDefinition = {
	id: "processout",
	name: "ProcessOut",
	website: "https://www.processout.com",
	description: "ProcessOut is a payment infrastructure platform that provides payment analytics to analyze and report on an entire payment ecosystem.",
	icon: "ProcessOut.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "processout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.processout\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "processout:jsGlobal:1",
			kind: "jsGlobal",
			property: "ProcessOut.ActionFlow",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
