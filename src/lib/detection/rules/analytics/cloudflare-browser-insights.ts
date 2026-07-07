import type { TechnologyDefinition } from '../../types';

export const cloudflareBrowserInsightsTechnologyDefinition = {
	id: "cloudflare-browser-insights",
	name: "Cloudflare Browser Insights",
	website: "https://www.cloudflare.com",
	description: "Cloudflare Browser Insights is a tool tool that measures the performance of websites from the perspective of users.",
	icon: "CloudFlare.svg",
	categories: [
		"analytics",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "cloudflare-browser-insights:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.cloudflareinsights\\.com\\/beacon(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cloudflare-browser-insights:jsGlobal:1",
			kind: "jsGlobal",
			property: "__cfBeaconCustomTag",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
