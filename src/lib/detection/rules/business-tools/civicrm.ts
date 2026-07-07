import type { TechnologyDefinition } from '../../types';

export const civicrmTechnologyDefinition = {
	id: "civicrm",
	name: "CiviCRM",
	website: "https://civicrm.org",
	description: "CiviCRM is a web-based suite of internationalised open-source software for constituency relationship management.",
	icon: "CiviCRM.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "civicrm:dom:0",
			kind: "dom",
			selector: "a[href*='/civicrm/contribute/transact'], link[href*='/com_civicrm/civicrm/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:civicrm:civicrm:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
