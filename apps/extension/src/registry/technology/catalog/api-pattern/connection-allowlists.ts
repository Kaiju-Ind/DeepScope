import type { TechnologyDefinition } from '@/lib/detection/types';

/** Detects authored use of the Connection Allowlists response headers shipped in Chrome 152. */
export const connectionAllowlistsTechnologyDefinition: TechnologyDefinition = {
	id: 'connection-allowlists',
	name: 'Connection Allowlists',
	website: 'https://wicg.github.io/connection-allowlists/',
	description:
		'Connection Allowlists restrict the network endpoints a document or worker can contact using response-delivered policies.',
	categories: ['api-pattern'],
	rules: [
		{
			id: 'connection-allowlists:responseHeader:enforce',
			kind: 'responseHeader',
			key: 'connection-allowlist',
			confidence: 100,
			description: 'Response carries an enforcing Connection Allowlist policy.',
		},
		{
			id: 'connection-allowlists:responseHeader:report-only',
			kind: 'responseHeader',
			key: 'connection-allowlist-report-only',
			confidence: 100,
			description: 'Response carries a report-only Connection Allowlist policy.',
		},
	],
} as const satisfies TechnologyDefinition;
