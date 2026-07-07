import type { TechnologyDefinition } from '../../types';

export const perconaTechnologyDefinition = {
	id: "percona",
	name: "Percona",
	website: "https://www.percona.com",
	description: "Percona server is an opensource, fully compatible, enhanced drop-in replacement for MySQL, providing superior performance, scalability, and instrumentation.",
	icon: "percona.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [],
} as const satisfies TechnologyDefinition;
