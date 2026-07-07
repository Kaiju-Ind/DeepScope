import type { TechnologyDefinition } from '../../types';

export const fitizzyTechnologyDefinition = {
	id: "fitizzy",
	name: "Fitizzy",
	website: "https://www.fitizzy.com",
	description: "Fitizzy is an omnichannel recommendation solution that assists in determining appropriate clothing sizes across various retail platforms.",
	icon: "Fitizzy.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "fitizzy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("s\\.ftz\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fitizzy:header:1",
			kind: "header",
			key: "Content-Security-Policy-Report-Only",
			valuePattern: new RegExp("\\.fitizzy\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "fitizzy:header:2",
			kind: "header",
			key: "content-security-policy-report-only",
			valuePattern: new RegExp("\\.fitizzy\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
