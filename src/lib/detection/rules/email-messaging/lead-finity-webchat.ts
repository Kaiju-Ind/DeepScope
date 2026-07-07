import type { TechnologyDefinition } from '../../types';

export const leadFinityWebchatTechnologyDefinition = {
	id: "lead-finity-webchat",
	name: "Lead-Finity Webchat",
	website: "https://lead-finity.com",
	description: "Lead-Finity Webchat is a platform that converts website visitors into leads and facilitates sales conversations.",
	icon: "LeadFinity.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "lead-finity-webchat:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.lead-finity\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
