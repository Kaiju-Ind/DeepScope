import type { TechnologyDefinition } from '../../types';

export const youtrackTechnologyDefinition = {
	id: "youtrack",
	name: "YouTrack",
	website: "https://www.jetbrains.com/youtrack/",
	description: "YouTrack is a browser-based bug tracker, issue tracking system and project management software.",
	icon: "YouTrack.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "youtrack:html:0",
			kind: "html",
			pattern: new RegExp("no-title=\"YouTrack\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "youtrack:html:1",
			kind: "html",
			pattern: new RegExp("data-reactid=\"[^\"]+\">youTrack ([0-9.]+)<"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "youtrack:html:2",
			kind: "html",
			pattern: new RegExp("type=\"application\\/opensearchdescription\\+xml\" title=\"YouTrack\"\\/>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "youtrack:dom:3",
			kind: "dom",
			selector: "[no-title='YouTrack'], link[type='application/opensearchdescription+xml'][title='YouTrack']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "youtrack:html:4",
			kind: "html",
			pattern: new RegExp("data-reactid=\"[^\"]+\">youtrack ([0-9.]+)<"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "youtrack:html:5",
			kind: "html",
			pattern: new RegExp("no-title=\"youtrack\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "youtrack:html:6",
			kind: "html",
			pattern: new RegExp("type=\"application\\/opensearchdescription\\+xml\" title=\"youtrack\"\\/>"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:jetbrains:youtrack:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
