import type { TechnologyDefinition } from '../../types';

export const astraWidgetsTechnologyDefinition = {
	id: "astra-widgets",
	name: "Astra Widgets",
	website: "https://wpastra.com/did-you-know-astra-is-widget-ready",
	description: "Astra Widgets is a handy little free plugin that lets you display address, list icons or social profiles within the Astra Theme.",
	icon: "Astra.svg",
	categories: [
		"wordpress-ecosystem",
		"widgets-misc",
	],
	rules: [
		{
			id: "astra-widgets:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/astra-widgets/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"astra",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
