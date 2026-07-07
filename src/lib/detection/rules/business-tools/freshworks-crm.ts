import type { TechnologyDefinition } from '../../types';

export const freshworksCrmTechnologyDefinition = {
	id: "freshworks-crm",
	name: "Freshworks CRM",
	website: "https://www.freshworks.com/crm",
	description: "Freshworks CRM is a cloud-based customer relationship management (CRM) solution. Key features include one-click phone, sales lead tracking, sales management, event tracking and more.",
	icon: "Freshworks CRM.svg",
	categories: [
		"business-tools",
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "freshworks-crm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.freshmarketer\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "freshworks-crm:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.zarget\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "freshworks-crm:jsGlobal:2",
			kind: "jsGlobal",
			property: "ZargetForm",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "freshworks-crm:jsGlobal:3",
			kind: "jsGlobal",
			property: "zarget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "freshworks-crm:jsGlobal:4",
			kind: "jsGlobal",
			property: "zargetAPI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "freshworks-crm:dom:5",
			kind: "dom",
			selector: "div[class*='Footer-PoweredBy'] > span > a[href*='www.freshworks.com/']",
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
