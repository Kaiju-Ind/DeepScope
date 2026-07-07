import type { TechnologyDefinition } from '../../types';

export const bloggerTechnologyDefinition = {
	id: "blogger",
	name: "Blogger",
	website: "https://www.blogger.com",
	description: "Blogger is a blog-publishing service that allows multi-user blogs with time-stamped entries.",
	icon: "Blogger.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "blogger:url:0",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/[^/]+\\.(?:blogspot|blogger)\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "blogger:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Blogger$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "blogger:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("blogger\\.googleusercontent\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "blogger:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^blogger$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
