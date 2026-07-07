import type { TechnologyDefinition } from '../../types';

export const hoiioTechnologyDefinition = {
	id: "hoiio",
	name: "Hoiio",
	website: "https://www.hoiio.com",
	description: "Hoiio is a cloud communications platform that simplifies the setup of messaging, voice, and other communication services.",
	icon: "Hoiio.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "hoiio:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("hoiio\\.notifyEmpty"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "hoiio:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("hoiio\\.notifyempty"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
