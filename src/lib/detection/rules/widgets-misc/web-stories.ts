import type { TechnologyDefinition } from '../../types';

export const webStoriesTechnologyDefinition = {
	id: "web-stories",
	name: "Web Stories",
	website: "https://amp.dev/about/stories/",
	description: "Web Stories is a format for visual storytelling for the open web.",
	icon: "Web-Stories.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "web-stories:dom:0",
			kind: "dom",
			selector: "amp-story",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"amp",
	],
} as const satisfies TechnologyDefinition;
