import type { TechnologyDefinition } from '../../types';

export const rapidsecTechnologyDefinition = {
	id: "rapidsec",
	name: "RapidSec",
	website: "https://rapidsec.com",
	description: "RapidSec offers automated client-side security and monitoring.",
	icon: "RapidSec.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "rapidsec:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.rapidsec\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "rapidsec:header:1",
			kind: "header",
			key: "Content-Security-Policy-Report-Only",
			valuePattern: new RegExp("\\.rapidsec\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "rapidsec:header:2",
			kind: "header",
			key: "report-to",
			valuePattern: new RegExp("\\.rapidsec\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "rapidsec:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.rapidsec\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "rapidsec:header:4",
			kind: "header",
			key: "content-security-policy-report-only",
			valuePattern: new RegExp("\\.rapidsec\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
