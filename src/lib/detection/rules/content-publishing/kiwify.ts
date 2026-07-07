import type { TechnologyDefinition } from '../../types';

export const kiwifyTechnologyDefinition = {
	id: "kiwify",
	name: "Kiwify",
	website: "https://kiwify.com.br",
	description: "Kiwify is an AI-powered platform for creators and students that provides smart tools to support teaching, learning, and content creation.",
	icon: "Kiwify.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "kiwify:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.kiwify\\.com\\.br"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
