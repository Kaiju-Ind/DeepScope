import type { TechnologyDefinition } from '@/lib/detection/types';

/** Detects x402 from protocol-owned HTTP payment headers and SDK source identities. */
export const x402TechnologyDefinition: TechnologyDefinition = {
	id: 'x402',
	name: 'x402',
	website: 'https://www.x402.org/',
	description:
		'x402 is an open payment protocol that carries payment requirements, authorization, and settlement over HTTP.',
	categories: ['api-pattern'],
	rules: [
		{
			id: 'x402:responseHeader:payment-required',
			kind: 'responseHeader',
			key: 'payment-required',
			confidence: 100,
			description: 'Response carries the x402 PaymentRequired payload header.',
		},
		{
			id: 'x402:requestHeader:payment-signature',
			kind: 'requestHeader',
			key: 'payment-signature',
			confidence: 100,
			description: 'Request carries the x402 signed payment payload header.',
		},
		{
			id: 'x402:responseHeader:payment-response',
			kind: 'responseHeader',
			key: 'payment-response',
			confidence: 100,
			description: 'Response carries the x402 settlement response header.',
		},
		{
			id: 'x402:scriptContent:sdk',
			kind: 'scriptContent',
			pattern: /["']@x402\/(?:core|fetch|axios|evm|svm|hono|express)["']/i,
			confidence: 95,
			description: 'Bundled script references an official x402 JavaScript package.',
		},
	],
} as const satisfies TechnologyDefinition;
