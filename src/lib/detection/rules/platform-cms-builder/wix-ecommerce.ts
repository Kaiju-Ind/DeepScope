import type { TechnologyDefinition } from '../../types';

export const wixEcommerceTechnologyDefinition = {
	id: "wix-ecommerce",
	name: "Wix eCommerce",
	website: "https://www.wix.com/freesitebuilder/tae-store",
	icon: "Wix.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wix-ecommerce:dom:0",
			kind: "dom",
			selector: "#wix-viewer-model",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "wix-ecommerce:text:1",
			kind: "text",
			pattern: new RegExp("wixstores"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "wix-ecommerce:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("static\\.wixstatic\\.com"),
			description: "Script content contains a bounded technology signature.",
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
		"wix",
	],
} as const satisfies TechnologyDefinition;
