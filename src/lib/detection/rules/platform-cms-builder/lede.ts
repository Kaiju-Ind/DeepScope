import type { TechnologyDefinition } from '../../types';

export const ledeTechnologyDefinition = {
	id: "lede",
	name: "Lede",
	website: "https://joinlede.com/",
	description: "Lede is a publishing platform and growth program designed to support journalism startups and news media.",
	icon: "lede.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lede:html:0",
			kind: "html",
			pattern: new RegExp("<a [^>]*href=\"[^\"]+joinlede.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "lede:jsGlobal:1",
			kind: "jsGlobal",
			property: "ledeChartbeatViews",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lede:jsGlobal:2",
			kind: "jsGlobal",
			property: "ledeEngagement",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lede:jsGlobal:3",
			kind: "jsGlobal",
			property: "ledeEngagementReset",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lede:meta:4",
			kind: "meta",
			key: "og:image",
			valuePattern: new RegExp("https?\\:\\/\\/lede-admin", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"wordpress",
		"wordpress-vip",
	],
} as const satisfies TechnologyDefinition;
