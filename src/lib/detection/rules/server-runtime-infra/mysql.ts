import type { TechnologyDefinition } from '../../types';

export const mysqlTechnologyDefinition = {
	id: "mysql",
	name: "MySQL",
	website: "https://mysql.com",
	description: "MySQL is an open-source relational database management system.",
	icon: "MySQL.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [],
	metadata: {
		cpe: "cpe:2.3:a:mysql:mysql:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
