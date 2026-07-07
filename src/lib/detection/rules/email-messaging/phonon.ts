import type { TechnologyDefinition } from '../../types';

export const phononTechnologyDefinition = {
	id: "phonon",
	name: "Phonon",
	website: "https://www.phonon.io",
	description: "Phonon is a communication automation platform that supports voice, chat, SMS, and email channels.",
	icon: "Phonon.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "phonon:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("c4c\\.phonon\\.in"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
