import type { TechnologyDefinition } from '@/lib/detection/types';

/** OpenSearch search and analytics platform identity used by ecosystem and publisher-text linking. */
export const opensearchPlatformTechnologyDefinition: TechnologyDefinition = {
	id: 'opensearch',
	name: 'OpenSearch',
	website: 'https://opensearch.org',
	description:
		'OpenSearch is an Apache 2.0-licensed open-source search, analytics, observability, and vector-search suite.',
	categories: ['search'],
	rules: [],
	versioning: { scheme: 'semver' },
	metadata: { oss: true },
} as const satisfies TechnologyDefinition;
