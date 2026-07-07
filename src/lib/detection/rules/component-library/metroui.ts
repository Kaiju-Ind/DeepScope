import type { TechnologyDefinition } from '../../types';

export const metrouiTechnologyDefinition = {
	id: "metroui",
	name: "MetroUI",
	website: "https://github.com/olton/Metro-UI-CSS",
	description: "MetroUI is an open-source frontend toolkit inspired by Microsoft Fluent (former Metro) design principles.",
	icon: "default.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "metroui:dom:0",
			kind: "dom",
			selector: "link[href*='//cdn.metroui.org.ua/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "metroui:jsGlobal:1",
			kind: "jsGlobal",
			property: "Metro.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:metroui:metro_ui:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
