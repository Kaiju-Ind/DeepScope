import type { TechnologyDefinition } from '../../types';

export const agillicTechnologyDefinition = {
	id: "agillic",
	name: "Agillic",
	website: "https://agillic.com",
	description: "Agillic is a Nordic marketing automation platform that delivers scalable, personalized campaigns while ensuring operational efficiency and full GDPR compliance.",
	icon: "Agillic.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "agillic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.agilliccdn\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "agillic:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.agillic\\.eu"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
