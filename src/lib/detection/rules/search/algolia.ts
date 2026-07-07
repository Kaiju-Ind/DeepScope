import type { TechnologyDefinition } from '../../types';

export const algoliaTechnologyDefinition = {
	id: "algolia",
	name: "Algolia",
	website: "https://www.algolia.com",
	description: "Algolia offers a hosted web search product delivering real-time results.",
	icon: "Algolia.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "algolia:jsGlobal:0",
			kind: "jsGlobal",
			property: "ALGOLIA_INSIGHTS_SRC",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "algolia:jsGlobal:1",
			kind: "jsGlobal",
			property: "AlgoliaSearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "algolia:jsGlobal:2",
			kind: "jsGlobal",
			property: "__GLOBAL__.algolia",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "algolia:jsGlobal:3",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.appSettings.ALGOLIA_APP_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "algolia:jsGlobal:4",
			kind: "jsGlobal",
			property: "__algolia",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "algolia:jsGlobal:5",
			kind: "jsGlobal",
			property: "algoliasearch.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "algolia:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^_ALGOLIA$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "algolia:header:7",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.algolia", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "algolia:scriptContent:8",
			kind: "scriptContent",
			pattern: new RegExp("algoliasearch"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "algolia:jsGlobal:9",
			kind: "jsGlobal",
			property: "__algolia.algoliasearch.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "algolia:jsGlobal:10",
			kind: "jsGlobal",
			property: "_didomi_vendors_consent",
			valuePattern: new RegExp("\\balgolia\\b"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "algolia:jsGlobal:11",
			kind: "jsGlobal",
			property: "didomiState.didomiVendorsConsent",
			valuePattern: new RegExp("\\balgolia\\b"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "algolia:cookie:12",
			kind: "cookie",
			keyPattern: new RegExp("^didomiVendorsConsent$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "algolia:cookie:13",
			kind: "cookie",
			keyPattern: new RegExp("^_algolia$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "algolia:header:14",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.algolia", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
