import type { TechnologyDefinition } from '../../types';

export const clouderaTechnologyDefinition = {
	id: "cloudera",
	name: "Cloudera",
	website: "https://www.cloudera.com",
	description: "Cloudera is a software platform for data engineering, data warehousing, machine learning and analytics that runs in the cloud or on-premises.",
	icon: "Cloudera.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "cloudera:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("cloudera", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cloudera:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("cloudera", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
