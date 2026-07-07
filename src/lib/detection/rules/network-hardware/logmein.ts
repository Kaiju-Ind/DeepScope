import type { TechnologyDefinition } from '../../types';

export const logmeinTechnologyDefinition = {
	id: "logmein",
	name: "LogMeIn",
	website: "https://www.logmein.com",
	description: "LogMeIn (now part of GoTo) provides remote access, remote support, and identity and collaboration software for individuals and businesses.",
	icon: "LogMeIn.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "logmein:dns:0",
			kind: "dns",
			valuePattern: new RegExp("logmein-verification-code=", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
