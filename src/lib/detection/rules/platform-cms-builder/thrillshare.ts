import type { TechnologyDefinition } from '../../types';

export const thrillshareTechnologyDefinition = {
	id: "thrillshare",
	name: "Thrillshare",
	website: "https://thrillshare.com",
	description: "Thrillshare is a management software designed for schools to streamline communication and engagement across various platforms.",
	icon: "Thrillshare.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "thrillshare:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.thrillshare\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
