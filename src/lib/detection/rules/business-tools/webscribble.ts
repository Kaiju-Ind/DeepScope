import type { TechnologyDefinition } from '../../types';

export const webscribbleTechnologyDefinition = {
	id: "webscribble",
	name: "Webscribble",
	website: "https://www.webscribble.com",
	description: "Webscribble is a career platform for associations that enhances member engagement and drives revenue growth through innovative solutions.",
	icon: "Webscribble.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "webscribble:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.webscribble\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
