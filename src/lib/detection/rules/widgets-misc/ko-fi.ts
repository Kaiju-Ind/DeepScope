import type { TechnologyDefinition } from '../../types';

export const koFiTechnologyDefinition = {
	id: "ko-fi",
	name: "Ko-fi",
	website: "https://ko-fi.com",
	description: "Ko-fi is an online platform that helps content creators get the financial support.",
	icon: "Ko-fi.svg",
	categories: [
		"widgets-misc",
		"fundraising-donations",
	],
	rules: [
		{
			id: "ko-fi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ko-fi\\.com\\/widgets"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ko-fi:dom:1",
			kind: "dom",
			selector: "a[href*='ko-fi.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ko-fi:jsGlobal:2",
			kind: "jsGlobal",
			property: "kofiwidget2",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
