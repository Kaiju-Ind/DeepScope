import type { TechnologyDefinition } from '../../types';

export const glpiTechnologyDefinition = {
	id: "glpi",
	name: "GLPI",
	website: "https://glpi-project.org",
	description: "GLPI is an open-source IT Asset Management, issue tracking and service desk system.",
	icon: "GLPI.png",
	categories: [
		"framework",
		"business-tools",
	],
	rules: [
		{
			id: "glpi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/.*glpi.+common\\.min\\.js\\?v=(\\d+\\.\\d+\\.\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "glpi:dom:1",
			kind: "dom",
			selector: "div[id*='footer-login'] > a",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "glpi:text:2",
			kind: "text",
			pattern: new RegExp("GLPI\\s+version\\s+([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page text contains a known technology marker.",
		},
		{
			id: "glpi:dom:3",
			kind: "dom",
			selector: "input[name='_glpi_csrf_token']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "glpi:jsGlobal:4",
			kind: "jsGlobal",
			property: "glpiUnsavedFormChanges",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"mid",
			"recurring",
		],
		cpe: "cpe:2.3:a:glpi-project:glpi:*:*:*:*:*:*:*:* ",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
