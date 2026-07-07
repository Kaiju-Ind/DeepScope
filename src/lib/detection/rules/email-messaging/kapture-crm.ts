import type { TechnologyDefinition } from '../../types';

export const kaptureCrmTechnologyDefinition = {
	id: "kapture-crm",
	name: "Kapture CRM",
	website: "https://www.kapturecrm.com",
	description: "Kapture CRM is an enterprise-grade SaaS-based customer support automation platform.",
	icon: "Kapture CRM.png",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "kapture-crm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.kapturecrm\\.com\\/.+\\?ver=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kapture-crm:jsGlobal:1",
			kind: "jsGlobal",
			property: "Kapchat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kapture-crm:jsGlobal:2",
			kind: "jsGlobal",
			property: "kap_chat_js",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
