import type { TechnologyDefinition } from '../../types';

export const frederickTechnologyDefinition = {
	id: "frederick",
	name: "Frederick",
	website: "https://hirefrederick.com",
	description: "Frederick is an automated marketing software solution developed by MindBody to streamline and optimize marketing tasks for businesses.",
	icon: "Frederick.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "frederick:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("hirefrederick\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
