import type { TechnologyDefinition } from '../../types';

export const akinonTechnologyDefinition = {
	id: "akinon",
	name: "Akinon",
	website: "https://www.akinon.com/",
	description: "Akinon is a cloud-based headless commerce platform with an integrated application suite including omnichannel and marketplace capabilities, mobile and in-store solutions, and an OMS.",
	icon: "akinon.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "akinon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-mgsm\\.akinon\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "akinon:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.akinoncloud\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
