import type { TechnologyDefinition } from '../../types';

export const voetbalassistTechnologyDefinition = {
	id: "voetbalassist",
	name: "VoetbalAssist",
	website: "https://www.voetbalassist.nl",
	description: "VoetbalAssist is a club management software platform that supports administrative tasks, member registration, scheduling, communication, and performance tracking for sports organizations.",
	icon: "VoetbalAssist.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "voetbalassist:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cache\\.voetbalassist\\.nl\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
