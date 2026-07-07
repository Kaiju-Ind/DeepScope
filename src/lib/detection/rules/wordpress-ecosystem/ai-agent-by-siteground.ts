import type { TechnologyDefinition } from '../../types';

export const aiAgentBySitegroundTechnologyDefinition = {
	id: "ai-agent-by-siteground",
	name: "AI Agent by SiteGround",
	website: "https://wordpress.org/plugins/ai-agent-by-siteground/",
	description: "AI Agent by SiteGround is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "ai-agent-by-siteground:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/ai\\-agent\\-by\\-siteground/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ai\\-agent\\-by\\-siteground/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/ai-agent-by-siteground/.",
		},
		{
			id: "ai-agent-by-siteground:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/ai\\-agent\\-by\\-siteground/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ai\\-agent\\-by\\-siteground/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/ai-agent-by-siteground/.",
		},
		{
			id: "ai-agent-by-siteground:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/ai\\-agent\\-by\\-siteground/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ai\\-agent\\-by\\-siteground/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/ai-agent-by-siteground/.",
		},
		{
			id: "ai-agent-by-siteground:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/ai\\-agent\\-by\\-siteground/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ai\\-agent\\-by\\-siteground/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/ai-agent-by-siteground/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
