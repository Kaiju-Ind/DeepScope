import type { TechnologyDefinition } from '../../types';

export const webStoriesForWordpressTechnologyDefinition = {
	id: "web-stories-for-wordpress",
	name: "Web Stories for WordPress",
	website: "https://wp.stories.google",
	description: "Web Stories for WordPress is a visual editor for creating Web Stories.",
	icon: "Web-Stories.svg",
	categories: [
		"rich-text-editors",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "web-stories-for-wordpress:meta:0",
			kind: "meta",
			key: "amp-story-generator-name",
			valuePattern: new RegExp("^Web Stories for WordPress$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "web-stories-for-wordpress:meta:1",
			kind: "meta",
			key: "amp-story-generator-version",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "web-stories-for-wordpress:meta:2",
			kind: "meta",
			key: "amp-story-generator-name",
			valuePattern: new RegExp("^web stories for wordpress$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"web-stories",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
