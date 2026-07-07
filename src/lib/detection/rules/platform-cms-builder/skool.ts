import type { TechnologyDefinition } from '../../types';

export const skoolTechnologyDefinition = {
	id: "skool",
	name: "Skool",
	website: "https://www.skool.com",
	description: "Stool is a community platform that integrates elements of gaming, business, and learning into a single interactive environment.",
	icon: "Skool.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "skool:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("skool\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
