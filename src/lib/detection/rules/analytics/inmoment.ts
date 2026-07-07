import type { TechnologyDefinition } from '../../types';

export const inmomentTechnologyDefinition = {
	id: "inmoment",
	name: "InMoment",
	website: "https://inmoment.com",
	description: "InMoment provides SaaS based customer survey and enterprise feedback management solutions.",
	icon: "InMoment.svg",
	categories: [
		"analytics",
		"surveys-feedback",
	],
	rules: [
		{
			id: "inmoment:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.inmoment\\.com(?:\\.\\w+)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "inmoment:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.inmoment\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "inmoment:header:2",
			kind: "header",
			key: "Content-Security-Policy-Report-Only",
			valuePattern: new RegExp("\\.inmoment\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "inmoment:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.inmoment\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "inmoment:header:4",
			kind: "header",
			key: "content-security-policy-report-only",
			valuePattern: new RegExp("\\.inmoment\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
