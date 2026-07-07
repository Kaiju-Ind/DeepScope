import type { TechnologyDefinition } from '../../types';

export const contentfulTechnologyDefinition = {
	id: "contentful",
	name: "Contentful",
	website: "https://www.contentful.com",
	description: "Contentful is an API-first content management platform to create, manage and publish content on any digital channel.",
	icon: "Contentful.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "contentful:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+(?:https?:)?\\/\\/(?:assets|downloads|images|videos)\\.(?:ct?fassets\\.net|contentful\\.com)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "contentful:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("(?:cdn|graphql)\\.contentful\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "contentful:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("\\.ctfassets\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "contentful:html:3",
			kind: "html",
			pattern: new RegExp("<[^>]+(?:assets|downloads|images|videos)\\.(?:ct?fassets\\.net|contentful\\.com)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "contentful:header:4",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Contentful Images API$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "contentful:scriptContent:5",
			kind: "scriptContent",
			pattern: new RegExp("www.contentful.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "contentful:header:6",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("(?:contentful\\.com|ctfassets\\.net)", "i"),
			confidence: 60,
			description: "Content Security Policy allows Contentful API or asset hosts.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
