import type { TechnologyDefinition } from '../../types';

export const redditTechnologyDefinition = {
	id: "reddit",
	name: "Reddit",
	website: "https://code.reddit.com",
	icon: "Reddit.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "reddit:html:0",
			kind: "html",
			pattern: new RegExp("(?:<a[^>]+Powered by Reddit|powered by <a[^>]+>reddit<)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "reddit:url:1",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/(?:www\\.)?reddit\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "reddit:jsGlobal:2",
			kind: "jsGlobal",
			property: "reddit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "reddit:html:3",
			kind: "html",
			pattern: new RegExp("(?:<a[^>]+powered by reddit|powered by <a[^>]+>reddit<)"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
