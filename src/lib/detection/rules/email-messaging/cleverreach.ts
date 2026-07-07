import type { TechnologyDefinition } from '../../types';

export const cleverreachTechnologyDefinition = {
	id: "cleverreach",
	name: "CleverReach",
	website: "https://www.cleverreach.com",
	description: "CleverReach is email marketing software featuring a web form designed for newsletter creation and distribution.",
	icon: "CleverReach.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "cleverreach:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.cleverreach\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "cleverreach:dom:1",
			kind: "dom",
			selector: "form[action*='.cleverreach.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
