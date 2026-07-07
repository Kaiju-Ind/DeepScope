import type { TechnologyDefinition } from '../../types';

export const arkoseLabsTechnologyDefinition = {
	id: "arkose-labs",
	name: "Arkose Labs",
	website: "https://www.arkoselabs.com",
	description: "Arkose Labs is a toolkit for fraud prevention that provides solutions to detect and mitigate malicious activity across digital platforms.",
	icon: "ArkoseLabs.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "arkose-labs:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.arkoselabs\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "arkose-labs:header:1",
			kind: "header",
			key: "Content-Security-Policy-Report-Only",
			valuePattern: new RegExp("\\.arkoselabs\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "arkose-labs:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.arkoselabs\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "arkose-labs:header:3",
			kind: "header",
			key: "content-security-policy-report-only",
			valuePattern: new RegExp("\\.arkoselabs\\.com", "i"),
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
