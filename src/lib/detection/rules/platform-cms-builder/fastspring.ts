import type { TechnologyDefinition } from '../../types';

export const fastspringTechnologyDefinition = {
	id: "fastspring",
	name: "FastSpring",
	website: "https://fastspring.com",
	description: "FastSpring is a digital ecommerce platform that helps software and SaaS companies manage payments, subscriptions, tax compliance, and fraud prevention globally.",
	icon: "fastspring.png",
	categories: [
		"platform-cms-builder",
		"commerce-operations",
	],
	rules: [
		{
			id: "fastspring:html:0",
			kind: "html",
			pattern: new RegExp("<a [^>]*href=\"https?:\\/\\/sites\\.fastspring\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "fastspring:html:1",
			kind: "html",
			pattern: new RegExp("<form [^>]*action=\"https?:\\/\\/sites\\.fastspring\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "fastspring:dom:2",
			kind: "dom",
			selector: "form[action*='sites.fastspring.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fastspring:jsGlobal:3",
			kind: "jsGlobal",
			property: "fastspring",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fastspring:jsGlobal:4",
			kind: "jsGlobal",
			property: "fastspringAfterMarkupCallback",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
