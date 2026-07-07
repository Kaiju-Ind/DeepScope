import type { TechnologyDefinition } from '../../types';

export const usablenetTechnologyDefinition = {
	id: "usablenet",
	name: "UsableNet",
	website: "https://usablenet.com",
	description: "UsableNet is a technology for web accessibility and digital transformation, providing end-to-end services.",
	icon: "UsableNet.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "usablenet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.usablenet\\.com\\/pt\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "usablenet:dom:1",
			kind: "dom",
			selector: "iframe[src*='.usablenet.com/pt/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "usablenet:jsGlobal:2",
			kind: "jsGlobal",
			property: "enableUsableNetAssistive",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
