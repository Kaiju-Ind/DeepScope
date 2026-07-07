import type { TechnologyDefinition } from '../../types';

export const liveinternetTechnologyDefinition = {
	id: "liveinternet",
	name: "Liveinternet",
	website: "https://liveinternet.ru/rating/",
	description: "LiveInternet is a website analytics service that provides traffic statistics and performance rankings for various websites.",
	icon: "Liveinternet.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "liveinternet:html:0",
			kind: "html",
			pattern: new RegExp("<script [^>]*>[\\s\\S]*\\/\\/counter\\.yadro\\.ru\\/hit"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "liveinternet:html:1",
			kind: "html",
			pattern: new RegExp("<!--LiveInternet counter-->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "liveinternet:html:2",
			kind: "html",
			pattern: new RegExp("<!--\\/LiveInternet-->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "liveinternet:html:3",
			kind: "html",
			pattern: new RegExp("<a href=\"http:\\/\\/www\\.liveinternet\\.ru\\/click\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "liveinternet:dom:4",
			kind: "dom",
			selector: "a[href*='/www.liveinternet.ru/click'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "liveinternet:html:5",
			kind: "html",
			pattern: new RegExp("<!--\\/liveinternet-->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "liveinternet:html:6",
			kind: "html",
			pattern: new RegExp("<!--liveinternet counter-->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "liveinternet:html:7",
			kind: "html",
			pattern: new RegExp("<script [^>]*>[\\s\\s]*\\/\\/counter\\.yadro\\.ru\\/hit"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
