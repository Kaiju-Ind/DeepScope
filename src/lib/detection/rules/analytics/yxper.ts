import type { TechnologyDefinition } from '../../types';

export const yxperTechnologyDefinition = {
	id: "yxper",
	name: "Yxper",
	website: "https://yxper.com",
	description: "Yxper is a platform that delivers real-time business analytics and insights to help organizations monitor performance, optimize operations, and enhance customer experience.",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "yxper:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("analytics\\.yxper\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
