import type { TechnologyDefinition } from '../../types';

export const webWizForumsTechnologyDefinition = {
	id: "web-wiz-forums",
	name: "Web Wiz Forums",
	website: "https://www.webwizforums.com",
	description: "Web Wiz Forums is a web-based forum software that enables developers to create and manage online discussion boards or forums for engaging user interactions and community building.",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "web-wiz-forums:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Web\\sWiz\\sForums(?:\\s([\\d\\.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "web-wiz-forums:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^web\\swiz\\sforums(?:\\s([\\d\\.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
