import type { TechnologyDefinition } from '../../types';

export const sitevisionCmsTechnologyDefinition = {
	id: "sitevision-cms",
	name: "Sitevision CMS",
	website: "https://www.sitevision.se",
	description: "Sitevision CMS is a platform for web publishing that consists of flexible and pre-made modules. Available as self-hosed software and Cloud SaaS.",
	icon: "Sitevision CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sitevision-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sitevision\\/system-resource\\/(?:[\\w\\d]+)\\/js\\/docready-min\\.js"),
			confidence: 25,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sitevision-cms:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("sitevision\\/system-resource\\/(?:[\\w\\d]+)\\/js\\/AppRegistry\\.js"),
			confidence: 25,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sitevision-cms:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("sitevision\\/system-resource\\/(?:[\\w\\d]+)\\/webapps\\/webapp_sdk-min\\.js"),
			confidence: 50,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sitevision-cms:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("sitevision\\/system-resource\\/(?:[\\w\\d]+)\\/envision\\/envision\\.js"),
			confidence: 50,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sitevision-cms:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^SiteVisionLTM$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "sitevision-cms:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("sitevision\\/system-resource\\/(?:[\\w\\d]+)\\/js\\/appregistry\\.js"),
			confidence: 25,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sitevision-cms:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^sitevisionltm$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
