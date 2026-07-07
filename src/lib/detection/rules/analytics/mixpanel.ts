import type { TechnologyDefinition } from '../../types';

export const mixpanelTechnologyDefinition = {
	id: "mixpanel",
	name: "Mixpanel",
	website: "https://mixpanel.com",
	description: "Mixpanel provides a business analytics service. It tracks user interactions with web and mobile applications and provides tools for targeted communication with them. Its toolset contains in-app A/B tests and user survey forms.",
	icon: "Mixpanel.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "mixpanel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.mxpnl\\.com\\/libs\\/mixpanel\\-([0-9.]+)\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mixpanel:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.mixpanel\\.com\\/track"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mixpanel:jsGlobal:2",
			kind: "jsGlobal",
			property: "mixpanel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mixpanel:dns:3",
			kind: "dns",
			valuePattern: new RegExp("mixpanel-domain-verify", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "mixpanel:scriptContent:4",
			kind: "scriptContent",
			pattern: new RegExp("VITE_MIXPANEL_KEY"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "mixpanel:dom:5",
			kind: "dom",
			selector: "meta[http-equiv='Content-Security-Policy'][content*='api.mixpanel.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mixpanel:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("Ensure you are using the latest version of the Mixpanel JS Library along with the snippet we provide"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "mixpanel:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("cdn\\.mxpnl\\.com"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
