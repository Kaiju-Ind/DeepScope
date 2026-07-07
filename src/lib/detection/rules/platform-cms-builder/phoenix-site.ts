import type { TechnologyDefinition } from '../../types';

export const phoenixSiteTechnologyDefinition = {
	id: "phoenix-site",
	name: "Phoenix Site",
	website: "https://phoenixsite.nl",
	description: "Phoenix Site software has been developed by the Internet Marketing Union and is especially intended for entrepreneurs (without technical knowledge) who want to score better in Google (SEO) and get more leads and customers (conversion) from their website.",
	icon: "Phoenix Site.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "phoenix-site:jsGlobal:0",
			kind: "jsGlobal",
			property: "phxsite.pages_version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "phoenix-site:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^phoenix_p_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
