import type { TechnologyDefinition } from '../../types';

export const vultrTechnologyDefinition = {
	id: "vultr",
	name: "Vultr",
	website: "https://www.vultr.com",
	description: "Vultr is a cloud computing service provider.",
	icon: "Vultr.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "vultr:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.vultr\\.com", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
