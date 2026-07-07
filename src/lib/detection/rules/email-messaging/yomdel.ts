import type { TechnologyDefinition } from '../../types';

export const yomdelTechnologyDefinition = {
	id: "yomdel",
	name: "Yomdel",
	website: "https://www.yomdel.com",
	description: "Yomdel is a fully managed live chat service that handles website conversations and delivers qualified sales leads directly to businesses.",
	icon: "Yomdel.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "yomdel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("clients\\.yomdel\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yomdel:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("clients\\.yomdel\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
