import type { TechnologyDefinition } from '../../types';

export const yalinhostTechnologyDefinition = {
	id: "yalinhost",
	name: "YalinHost",
	website: "https://yalinhost.com",
	description: "YalinHost is a web hosting service provider.",
	icon: "YalinHost.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "yalinhost:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.yalinhost\\.com", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "yalinhost:dns:1",
			kind: "dns",
			valuePattern: new RegExp("\\.yalinhost\\.com", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
