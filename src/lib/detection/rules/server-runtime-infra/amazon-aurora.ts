import type { TechnologyDefinition } from '../../types';

export const amazonAuroraTechnologyDefinition = {
	id: "amazon-aurora",
	name: "Amazon Aurora",
	website: "https://aws.amazon.com/rds/aurora",
	description: "Amazon Aurora is a relational database service developed and offered by Amazon Web Services.",
	icon: "Amazon Aurora.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [],
	implies: [
		"amazon-web-services",
	],
} as const satisfies TechnologyDefinition;
