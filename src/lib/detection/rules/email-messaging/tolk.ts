import type { TechnologyDefinition } from '../../types';

export const tolkTechnologyDefinition = {
	id: "tolk",
	name: "Tolk",
	website: "https://www.tolk.ai",
	description: "Tolk is a platform that provides AI-powered live chat and chatbot solutions designed to enhance customer relations and support interactions.",
	icon: "Tolk.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "tolk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.tolk\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tolk:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("script\\.tolk\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
