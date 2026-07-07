import type { TechnologyDefinition } from '../../types';

export const espocrmTechnologyDefinition = {
	id: "espocrm",
	name: "EspoCRM",
	website: "https://www.espocrm.com",
	description: "EspoCRM is an open-source CRM software solution designed for businesses of all sizes.",
	icon: "EspoCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "espocrm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("espo(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "espocrm:dom:1",
			kind: "dom",
			selector: "meta[content*='EspoCRM'], link[href*='/espo/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "espocrm:jsGlobal:2",
			kind: "jsGlobal",
			property: "Espo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:espocrm:espocrm:*:*:*:*:*:*:*:*",
	},
	implies: [
		"backbone-js",
		"handlebars",
	],
} as const satisfies TechnologyDefinition;
