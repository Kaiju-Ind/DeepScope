import type { TechnologyDefinition } from '../../types';

export const oracleInfinityTechnologyDefinition = {
	id: "oracle-infinity",
	name: "Oracle Infinity",
	website: "https://www.oracle.com/cx/marketing/digital-intelligence/",
	description: "Oracle Infinity is a digital analytics platform for tracking, measuring, and optimizing the performance and visitor behavior of enterprise websites and mobile apps.",
	icon: "Oracle.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "oracle-infinity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("c\\.oracleinfinity\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
