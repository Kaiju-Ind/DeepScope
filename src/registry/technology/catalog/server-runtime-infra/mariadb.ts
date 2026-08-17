import type { TechnologyDefinition } from '@/lib/detection/types';

export const mariadbTechnologyDefinition: TechnologyDefinition = {
	id: 'mariadb',
	name: 'MariaDB',
	website: 'https://mariadb.org',
	description: 'MariaDB is an open-source relational database management system compatible with MySQL.',
	icon: 'mariadb.svg',
	categories: [
		'server-runtime-infra',
	],
	rules: [],
	metadata: {
		cpe: 'cpe:2.3:a:mariadb_project:mariadb:*:*:*:*:*:*:*:*',
	},
} as const satisfies TechnologyDefinition;
