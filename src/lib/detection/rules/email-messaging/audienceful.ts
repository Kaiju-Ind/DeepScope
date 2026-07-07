import type { TechnologyDefinition } from '../../types';

export const audiencefulTechnologyDefinition = {
	id: "audienceful",
	name: "Audienceful",
	website: "https://www.audienceful.com",
	description: "Audienceful is an email marketing software platform used to create, manage, send, and analyze email campaigns.",
	icon: "Audienceful.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "audienceful:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.audienceful\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "audienceful:dom:1",
			kind: "dom",
			selector: "form[action*='app.audienceful.com/']",
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
