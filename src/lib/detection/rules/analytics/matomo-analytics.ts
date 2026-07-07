import type { TechnologyDefinition } from '../../types';

export const matomoAnalyticsTechnologyDefinition = {
	id: "matomo-analytics",
	name: "Matomo Analytics",
	website: "https://matomo.org",
	description: "Matomo Analytics is a free and open-source web analytics application, that runs on a PHP/MySQL web-server.",
	icon: "Matomo.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "matomo-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("piwik\\.js|piwik\\.php"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "matomo-analytics:jsGlobal:1",
			kind: "jsGlobal",
			property: "Matomo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "matomo-analytics:jsGlobal:2",
			kind: "jsGlobal",
			property: "Piwik",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "matomo-analytics:jsGlobal:3",
			kind: "jsGlobal",
			property: "_paq",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "matomo-analytics:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^PIWIK_SESSID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "matomo-analytics:meta:5",
			kind: "meta",
			key: "apple-itunes-app",
			valuePattern: new RegExp("app-id=737216887", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "matomo-analytics:meta:6",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("(?:Matomo|Piwik) - Open Source Web Analytics", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "matomo-analytics:meta:7",
			kind: "meta",
			key: "google-play-app",
			valuePattern: new RegExp("app-id=org\\.piwik\\.mobile2", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "matomo-analytics:scriptContent:8",
			kind: "scriptContent",
			pattern: new RegExp("matomo(?:\\.min)?\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "matomo-analytics:jsGlobal:9",
			kind: "jsGlobal",
			property: "matomoSitesIDS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "matomo-analytics:jsGlobal:10",
			kind: "jsGlobal",
			property: "matomoTrackPage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "matomo-analytics:cookie:11",
			kind: "cookie",
			keyPattern: new RegExp("^piwik_sessid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "matomo-analytics:meta:12",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("(?:matomo|piwik) - open source web analytics", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "matomo-analytics:scriptContent:13",
			kind: "scriptContent",
			pattern: new RegExp("matomo\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "matomo-analytics:scriptContent:14",
			kind: "scriptContent",
			pattern: new RegExp("(?:^|\\/)matomo(?:\\.min)?\\.js(?:\\?|$)"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"payg",
		],
		cpe: "cpe:2.3:a:matomo:matomo:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
