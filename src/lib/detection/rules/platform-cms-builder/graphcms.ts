import type { TechnologyDefinition } from '../../types';

export const graphcmsTechnologyDefinition = {
	id: "graphcms",
	name: "GraphCMS",
	website: "https://graphcms.com",
	description: "GraphCMS is a GraphQL headless CMS for content federation and omnichannel headless content management.",
	icon: "GraphCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "graphcms:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.graphcms\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "graphcms:dom:1",
			kind: "dom",
			selector: ".graphcms-image-wrapper",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "graphcms:dom:2",
			kind: "dom",
			selector: "img[src*='media.graphcms.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	implies: [
		"go",
		"graphql",
		"postgresql",
		"typescript",
	],
} as const satisfies TechnologyDefinition;
