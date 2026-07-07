import type { TechnologyDefinition } from '../../types';

export const mindbodyTechnologyDefinition = {
	id: "mindbody",
	name: "MindBody",
	website: "https://www.mindbodyonline.com",
	description: "Mindbody is a (SaaS) company that provides cloud-based online scheduling and other business management software for the wellness services industry.",
	icon: "MindBody.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "mindbody:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\w+\\.healcode\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mindbody:jsGlobal:1",
			kind: "jsGlobal",
			property: "HealcodeWidget",
			description: "Page-owned global matches a known technology marker.",
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
