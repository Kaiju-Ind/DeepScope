import type { TechnologyDefinition } from '../../types';

export const webinarisTechnologyDefinition = {
	id: "webinaris",
	name: "Webinaris",
	website: "https://www.webinaris.com",
	description: "Webinaris is a platform that automates customer acquisition, allowing businesses to attract more customers with significantly reduced effort.",
	icon: "Webinaris.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "webinaris:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("webinaris_load"),
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
