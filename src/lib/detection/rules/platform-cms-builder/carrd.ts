import type { TechnologyDefinition } from '../../types';

export const carrdTechnologyDefinition = {
	id: "carrd",
	name: "Carrd",
	website: "https://carrd.co",
	description: "Carrd is a platform for building simple, responsive, one-page sites.",
	icon: "Carrd.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "carrd:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\(\\!section\\s\\|\\|\\ssection\\.tagName\\s\\!\\=\\s\\'SECTION\\'\\)"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "carrd:dom:1",
			kind: "dom",
			selector: "link[href*='.carrd.co'][rel='canonical']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "carrd:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("\\(\\!section\\s\\|\\|\\ssection\\.tagname\\s\\!\\=\\s\\'section\\'\\)"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"apache-http-server",
	],
} as const satisfies TechnologyDefinition;
