import type { TechnologyDefinition } from '../../types';

export const livejournalTechnologyDefinition = {
	id: "livejournal",
	name: "LiveJournal",
	website: "https://www.livejournal.com",
	description: "LiveJournal is a social networking service where users can keep a blog, journal or diary.",
	icon: "LiveJournal.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "livejournal:url:0",
			kind: "url",
			pattern: new RegExp("\\.livejournal\\.com"),
			description: "Page URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
