import type { TechnologyDefinition } from '../../types';

export const jettabsTechnologyDefinition = {
	id: "jettabs",
	name: "JetTabs",
	website: "https://crocoblock.com/plugins/jettabs",
	description: "JetTabs is a plugin for Elementor that enables the creation of customizable tabs and accordion widgets for organizing content within web pages.",
	icon: "JetTabs.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "jettabs:jsGlobal:0",
			kind: "jsGlobal",
			property: "JetTabs.accordionInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jettabs:jsGlobal:1",
			kind: "jsGlobal",
			property: "JetTabsSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"elementor",
	],
} as const satisfies TechnologyDefinition;
