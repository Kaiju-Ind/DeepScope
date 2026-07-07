import type { TechnologyDefinition } from '../../types';

export const microcmsTechnologyDefinition = {
	id: "microcms",
	name: "microCMS",
	website: "https://microcms.io",
	description: "microCMS is a Japan-based headless CMS that enables editors and developers to build delicate sites and apps.",
	icon: "microCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "microcms:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.microcms\\.io"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "microcms:dom:1",
			kind: "dom",
			selector: "img[src*='.microcms-assets.io/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "microcms:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("microCMS:"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "microcms:dom:3",
			kind: "dom",
			selector: "img[src*='.microcms-assets.io/'], link[href*='.microcms-assets.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
