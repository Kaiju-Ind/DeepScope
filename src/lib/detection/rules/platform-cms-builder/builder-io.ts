import type { TechnologyDefinition } from '../../types';

export const builderIoTechnologyDefinition = {
	id: "builder-io",
	name: "Builder.io",
	website: "https://builder.io",
	description: "Builder.io is a headless CMS with a powerful drag-and-drop visual editor that lets you build and optimize digital experiences with speed and flexibility.",
	icon: "Builder.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "builder-io:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("cdn\\.builder\\.io"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "builder-io:dom:1",
			kind: "dom",
			selector: "[data-builder-content-id], img[src*='cdn.builder.io']",
			description: "DOM selector matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;
