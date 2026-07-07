import type { TechnologyDefinition } from '../../types';

export const helhostTechnologyDefinition = {
	id: "helhost",
	name: "Helhost",
	website: "https://www.helhost.com",
	description: "Helhost is a web hosting provider and internet domain registrar from Democratic Republic of Congo.",
	icon: "Helhost.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "helhost:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("Helhost", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "helhost:dns:1",
			kind: "dns",
			valuePattern: new RegExp("\\.helhost\\.com", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "helhost:dns:2",
			kind: "dns",
			valuePattern: new RegExp("\\.helhost\\.com", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "helhost:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("\\.helhost\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "helhost:header:4",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("helhost", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
