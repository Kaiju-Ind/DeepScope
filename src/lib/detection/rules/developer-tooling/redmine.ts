import type { TechnologyDefinition } from '../../types';

export const redmineTechnologyDefinition = {
	id: "redmine",
	name: "Redmine",
	website: "https://www.redmine.org",
	description: "Redmine is a free and open-source, web-based project management and issue tracking tool.",
	icon: "Redmine.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "redmine:html:0",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"[^>]+Redmine"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "redmine:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_redmine_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "redmine:meta:2",
			kind: "meta",
			key: "description",
			valuePattern: new RegExp("Redmine", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "redmine:html:3",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"[^>]+redmine"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "redmine:meta:4",
			kind: "meta",
			key: "description",
			valuePattern: new RegExp("redmine", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:redmine:redmine:*:*:*:*:*:*:*:*",
	},
	implies: [
		"ruby-on-rails",
	],
} as const satisfies TechnologyDefinition;
