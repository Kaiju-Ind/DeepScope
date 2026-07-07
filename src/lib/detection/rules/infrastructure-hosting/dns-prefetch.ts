import type { TechnologyDefinition } from '../../types';

export const dnsPrefetchTechnologyDefinition = {
	id: "dns-prefetch",
	name: "DNS Prefetch",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/dns-prefetch",
	description: "Hints that the browser should resolve DNS for another origin ahead of time.",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "dns-prefetch:link:0",
			kind: "link",
			rel: "dns-prefetch",
			confidence: 100,
			description: "Document uses rel=dns-prefetch.",
		},
	],
} as const satisfies TechnologyDefinition;
