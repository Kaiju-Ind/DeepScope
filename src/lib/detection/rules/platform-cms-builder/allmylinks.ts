import type { TechnologyDefinition } from '../../types';

export const allmylinksTechnologyDefinition = {
	id: "allmylinks",
	name: "AllMyLinks",
	website: "https://allmylinks.com",
	description: "AllMyLinks is a personal bio link page that consolidates multiple social media profiles, websites, and contact links into a single shareable online hub.",
	icon: "AllMyLinks.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "allmylinks:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("allmylinks\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "allmylinks:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^AllMyLinks$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "allmylinks:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^allmylinks$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
