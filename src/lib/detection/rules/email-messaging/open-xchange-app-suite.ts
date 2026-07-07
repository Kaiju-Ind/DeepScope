import type { TechnologyDefinition } from '../../types';

export const openXchangeAppSuiteTechnologyDefinition = {
	id: "open-xchange-app-suite",
	name: "Open-Xchange App Suite",
	website: "https://www.open-xchange.com/",
	description: "Open-Xchange is a web-based communication, collaboration and office productivity software suite.",
	icon: "openxchange.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "open-xchange-app-suite:dom:0",
			kind: "dom",
			selector: "#io-ox-core, form > input[value='open-xchange-appsuite']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "open-xchange-app-suite:jsGlobal:1",
			kind: "jsGlobal",
			property: "ox.version",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:open-xchange:app_suite:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
