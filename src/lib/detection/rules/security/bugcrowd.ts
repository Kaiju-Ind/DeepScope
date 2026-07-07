import type { TechnologyDefinition } from '../../types';

export const bugcrowdTechnologyDefinition = {
	id: "bugcrowd",
	name: "Bugcrowd",
	website: "https://www.bugcrowd.com",
	description: "Bugcrowd is a crowdsourced cybersecurity platform for bug bounties, pentesting, and vulnerability disclosure.",
	icon: "Bugcrowd.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "bugcrowd:dns:0",
			kind: "dns",
			valuePattern: new RegExp("bugcrowd-verification", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
