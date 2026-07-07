import type { TechnologyDefinition } from '../../types';

export const centraTechnologyDefinition = {
	id: "centra",
	name: "Centra",
	website: "https://centra.com",
	description: "Centra is the headless ecommerce platform.",
	icon: "Centra.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "centra:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("centraCheckoutScript"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "centra:dom:1",
			kind: "dom",
			selector: "img[src*='.centracdn.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "centra:jsGlobal:2",
			kind: "jsGlobal",
			property: "CENTRA_IMAGE_SIZES",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "centra:header:3",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.centra(?:cdn)?\\.(?:com|net)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "centra:scriptContent:4",
			kind: "scriptContent",
			pattern: new RegExp("centracheckoutscript"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "centra:header:5",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.centra(?:cdn)?\\.(?:com|net)", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
	excludes: [
		"magento",
	],
} as const satisfies TechnologyDefinition;
