import type { TechnologyDefinition } from '../../types';

export const bonfireTechnologyDefinition = {
	id: "bonfire",
	name: "Bonfire",
	website: "https://cibonfire.com",
	icon: "Bonfire.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "bonfire:html:0",
			kind: "html",
			pattern: new RegExp("Powered by <a[^>]+href=\"https?:\\/\\/(?:www\\.)?cibonfire\\.com[^>]*>Bonfire v([^<]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "bonfire:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^bf_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "bonfire:html:2",
			kind: "html",
			pattern: new RegExp("powered by <a[^>]+href=\"https?:\\/\\/(?:www\\.)?cibonfire\\.com[^>]*>bonfire v([^<]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"codeigniter",
	],
} as const satisfies TechnologyDefinition;
