import type { TechnologyDefinition } from '../../types';

export const priviqTechnologyDefinition = {
	id: "priviq",
	name: "privIQ",
	website: "https://www.priviq.com",
	description: "privIQ is a platform that provides customized solutions for data privacy, operational risk, and regulatory compliance, including GDPR and CCPA, to support structured risk management.",
	icon: "privIQ.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "priviq:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.priviq\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
