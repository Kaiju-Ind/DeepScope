import type { TechnologyDefinition } from '../../types';

export const vercelSpeedInsightsTechnologyDefinition = {
	id: "vercel-speed-insights",
	name: "Vercel Speed Insights",
	website: "https://vercel.com/docs/speed-insights",
	description: "Vercel Speed Insights provides you with a detailed view of your website's performance metrics, based on Core Web Vitals.",
	icon: "vercel.svg",
	categories: [
		"monitoring-error-tracking",
		"analytics",
	],
	rules: [
		{
			id: "vercel-speed-insights:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/_vercel\\/speed-insights\\/script\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vercel-speed-insights:dom:1",
			kind: "dom",
			selector: "script[data-sdkn='@vercel/speed-insights/next']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vercel-speed-insights:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("['\"']_vercel\\/speed-insights\\/vitals['\"']"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vercel-speed-insights:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("vitals\\.vercel-insights\\.com\\/v2\\/vitals\\?dsn="),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vercel-speed-insights:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("['\"']\\[Vercel Speed Insights] Failed to load script"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "vercel-speed-insights:resourceUrl:modern:3",
			kind: "resourceUrl",
			pattern: new RegExp("_vercel_speed_insights\\.js"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "vercel-speed-insights:resourceUrl:modern:4",
			kind: "resourceUrl",
			pattern: new RegExp("vitals\\.vercel-insights\\.com"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "vercel-speed-insights:resourceUrl:modern:5",
			kind: "resourceUrl",
			pattern: new RegExp("v1\\/speed-insights"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
	requires: [
		"vercel",
	],
} as const satisfies TechnologyDefinition;
