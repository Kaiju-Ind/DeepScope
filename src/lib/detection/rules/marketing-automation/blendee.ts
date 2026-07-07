import type { TechnologyDefinition } from '../../types';

export const blendeeTechnologyDefinition = {
	id: "blendee",
	name: "Blendee",
	website: "https://www.blendee.com",
	description: "Blendee is a marketing automation platform that streamlines campaign management and performance tracking across digital channels.",
	icon: "Blendee.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "blendee:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.blendee\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
