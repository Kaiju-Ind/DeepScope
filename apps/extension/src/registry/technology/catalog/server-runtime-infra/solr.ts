import type { TechnologyDefinition } from '@/lib/detection/types';

export const solrTechnologyDefinition: TechnologyDefinition = {
	id: 'solr',
	name: 'Solr',
	website: 'https://lucene.apache.org/solr/',
	description:
		'Solr is an open-source search platform built on Apache Lucene, used for indexing and searching large-scale datasets.',
	icon: 'Solr.png',
	categories: [
		'server-runtime-infra',
	],
	rules: [],
	metadata: {
		oss: true,
		cpe: 'cpe:2.3:a:apache:solr:*:*:*:*:*:*:*:*',
	},
	implies: [
		'lucene',
	],
} as const satisfies TechnologyDefinition;
