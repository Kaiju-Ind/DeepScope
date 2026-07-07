import type { TechnologyDefinition } from '../../types';

export const coolTimelineTechnologyDefinition = {
	id: "cool-timeline",
	name: "Cool Timeline",
	website: "https://wordpress.org/plugins/cool-timeline",
	description: "Creates vertical and horizontal history timeline blocks.",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "cool-timeline:dom:0",
			kind: "dom",
			selector: "link[href*='/plugins/cool-timeline/'], script[src*='/cool-timeline/'], .cooltimeline-body",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
