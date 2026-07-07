import type { TechnologyDefinition } from '../../types';

export const amocrmTechnologyDefinition = {
	id: "amocrm",
	name: "amoCRM",
	website: "https://www.amocrm.com",
	description: "amoCRM is a web-based customer relationship management software solution.",
	icon: "amoCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "amocrm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.amocrm\\.(?:ru|com)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "amocrm:jsGlobal:1",
			kind: "jsGlobal",
			property: "AMOCRM",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amocrm:jsGlobal:2",
			kind: "jsGlobal",
			property: "AMO_PIXEL_CLIENT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amocrm:jsGlobal:3",
			kind: "jsGlobal",
			property: "amoFormsWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amocrm:jsGlobal:4",
			kind: "jsGlobal",
			property: "amoSocialButton",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
