import type { TechnologyDefinition } from '../../types';

export const perfexCrmTechnologyDefinition = {
	id: "perfex-crm",
	name: "Perfex CRM",
	website: "https://www.perfexcrm.com",
	description: "Perfex CRM is self hosted customer relationship management software that is a great fit for almost any company, freelancer or many other uses.",
	icon: "Perfex CRM.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "perfex-crm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/assets\\/themes\\/perfex\\/js\\/global\\.min\\.js(?:\\?v=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "perfex-crm:dom:1",
			kind: "dom",
			selector: "link[href*='perfexcrm.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
		],
		cpe: "cpe:2.3:a:perfexcrm:perfex_crm:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
