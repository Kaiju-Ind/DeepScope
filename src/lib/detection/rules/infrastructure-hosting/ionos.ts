import type { TechnologyDefinition } from '../../types';

export const ionosTechnologyDefinition = {
	id: "ionos",
	name: "IONOS",
	website: "https://www.ionos.com",
	description: "IONOS is the web hosting and cloud partner for small and medium-sized businesses.",
	icon: "IONOS.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "ionos:dns:0",
			kind: "dns",
			valuePattern: new RegExp("ns1\\d+\\.ui-dns\\.(?:de|org|biz|com)", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
