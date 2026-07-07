import type { TechnologyDefinition } from '../../types';

export const openWebAnalyticsTechnologyDefinition = {
	id: "open-web-analytics",
	name: "Open Web Analytics",
	website: "https://www.openwebanalytics.com",
	description: "Open Web Analytics is an open-source web analytics tool that provides self-hosted, customizable tracking and reporting of website traffic and user behavior.",
	icon: "Open Web Analytics.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "open-web-analytics:html:0",
			kind: "html",
			pattern: new RegExp("<!-- (?:Start|End) Open Web Analytics Tracker -->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "open-web-analytics:jsGlobal:1",
			kind: "jsGlobal",
			property: "OWA.config.baseUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "open-web-analytics:jsGlobal:2",
			kind: "jsGlobal",
			property: "owa_baseUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "open-web-analytics:jsGlobal:3",
			kind: "jsGlobal",
			property: "owa_cmds",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "open-web-analytics:html:4",
			kind: "html",
			pattern: new RegExp("<!-- (?:start|end) open web analytics tracker -->"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:openwebanalytics:open_web_analytics:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
