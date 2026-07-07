import type { TechnologyDefinition } from '../../types';

export const postgresqlTechnologyDefinition = {
	id: "postgresql",
	name: "PostgreSQL",
	website: "https://www.postgresql.org/",
	description: "PostgreSQL, also known as Postgres, is a free and open-source relational database management system emphasizing extensibility and SQL compliance.",
	icon: "PostgreSQL.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:postgresql:postgresql:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
