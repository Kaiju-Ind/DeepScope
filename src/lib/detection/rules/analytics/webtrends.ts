import type { TechnologyDefinition } from '../../types';

export const webtrendsTechnologyDefinition = {
	id: "webtrends",
	name: "Webtrends",
	website: "https://worldwide.webtrends.com",
	icon: "Webtrends.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "webtrends:html:0",
			kind: "html",
			pattern: new RegExp("<img[^>]+id=\"DCSIMG\"[^>]+webtrends"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "webtrends:jsGlobal:1",
			kind: "jsGlobal",
			property: "WTOptimize",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webtrends:jsGlobal:2",
			kind: "jsGlobal",
			property: "WebTrends",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webtrends:html:3",
			kind: "html",
			pattern: new RegExp("<img[^>]+id=\"dcsimg\"[^>]+webtrends"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
