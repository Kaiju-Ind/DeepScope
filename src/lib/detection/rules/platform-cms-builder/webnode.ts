import type { TechnologyDefinition } from '../../types';

export const webnodeTechnologyDefinition = {
	id: "webnode",
	name: "WebNode",
	website: "https://www.webnode.com",
	description: "Webnode is a drag-and-drop online website builder.",
	icon: "WebNode.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webnode:jsGlobal:0",
			kind: "jsGlobal",
			property: "wnd.$system",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webnode:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_gat_wnd_header$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "webnode:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Webnode(?:\\s([\\d.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "webnode:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^webnode(?:\\s([\\d.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
