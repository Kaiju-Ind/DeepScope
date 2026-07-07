import type { TechnologyDefinition } from '../../types';

export const sidepandaTechnologyDefinition = {
	id: "sidepanda",
	name: "SidePanda",
	website: "https://www.sidepanda.com/depo",
	description: "SidePanda is a security deposit management solution for Shopify merchants, consolidating all deposit tracking, collection, and reconciliation processes in a single platform.",
	icon: "SidePanda.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sidepanda:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("depo\\.sidepanda\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
