import type { TechnologyDefinition } from '../../types';

export const tanxTechnologyDefinition = {
	id: "tanx",
	name: "Tanx",
	website: "https://tanx.com",
	description: "Tanx is a platform for media resource management and business-cooperation workflows.",
	icon: "Tanx.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "tanx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tanx\\.co."),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tanx:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.tanx\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
