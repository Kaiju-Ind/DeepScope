import type { TechnologyDefinition } from '../../types';

export const openJournalSystemsTechnologyDefinition = {
	id: "open-journal-systems",
	name: "Open Journal Systems",
	website: "https://pkp.sfu.ca/ojs",
	description: "Open Journal Systems (OJS) is an open-source software application for managing and publishing scholarly journals.",
	icon: "Open Journal Systems.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "open-journal-systems:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^OJSSID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "open-journal-systems:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Open Journal Systems(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "open-journal-systems:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^ojssid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "open-journal-systems:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("open journal systems(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:public_knowledge_project:open_journal_systems:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
