import type { TechnologyDefinition } from '../../types';

export const id5TechnologyDefinition = {
	id: "id5",
	name: "ID5",
	website: "https://id5.io/",
	description: "ID5 is a company that offers an identity solution for digital advertising, providing a Universal ID that enables privacy-compliant user recognition and tracking across websites without relying on personal information or third-party cookies.",
	icon: "ID5.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "id5:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https:\\/\\/(?:cdn\\.)?id5-sync\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "id5:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp(".*id5-sync\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "id5:jsGlobal:2",
			kind: "jsGlobal",
			property: "ID5._version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "id5:jsGlobal:3",
			kind: "jsGlobal",
			property: "__id5_instances",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "id5:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^id5$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
