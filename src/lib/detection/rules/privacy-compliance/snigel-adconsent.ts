import type { TechnologyDefinition } from '../../types';

export const snigelAdconsentTechnologyDefinition = {
	id: "snigel-adconsent",
	name: "snigel AdConsent",
	website: "https://www.snigel.com/adconsent/",
	description: "snigel AdConsent is an IAB-registered consent management platfrom (CMP) which help keep sites speed intact while remaining compliant with GDPR and CCPA.",
	icon: "snigel.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "snigel-adconsent:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:staging-)?cdn\\.snigelweb\\.com\\/(?:snhb|adconsent)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snigel-adconsent:jsGlobal:1",
			kind: "jsGlobal",
			property: "adconsent.version",
			valuePattern: new RegExp("^([\\d.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "snigel-adconsent:jsGlobal:2",
			kind: "jsGlobal",
			property: "snhb.baseSettings",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "snigel-adconsent:jsGlobal:3",
			kind: "jsGlobal",
			property: "snhb.info.cmpVersion",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
