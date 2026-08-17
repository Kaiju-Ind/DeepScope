import type { TechnologyDefinition } from '@/lib/detection/types';

export const opensearchTechnologyDefinition: TechnologyDefinition = {
	id: 'opensearch',
	name: 'OpenSearch Description',
	website: 'https://developer.mozilla.org/en-US/docs/Web/XML/Guides/OpenSearch',
	description: 'Declares an OpenSearch description document.',
	categories: [
		'search',
	],
	rules: [
		{
			id: 'opensearch:link:0',
			kind: 'link',
			rel: 'search',
			typePattern: new RegExp('application/opensearchdescription\\+xml', 'i'),
			confidence: 100,
			description: 'Document links to an OpenSearch description.',
		},
	],
} as const satisfies TechnologyDefinition;
