import type { TechnologyDefinition } from '../../types';

export const reOsComTechnologyDefinition = {
	id: "re-os-com",
	name: "RE-OS.com",
	website: "https://re-os.com",
	description: "RE-OS.com is a platform providing multiple listing service (MLS) functionality and customer relationship management (CRM) tools for managing real estate data and client interactions.",
	icon: "RE-OS.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "re-os-com:dom:0",
			kind: "dom",
			selector: "link[href*='cdnc.re-os.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
