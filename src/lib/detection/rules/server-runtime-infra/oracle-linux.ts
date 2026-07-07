import type { TechnologyDefinition } from '../../types';

export const oracleLinuxTechnologyDefinition = {
	id: "oracle-linux",
	name: "Oracle Linux",
	website: "https://www.oracle.com/linux/",
	description: "Oracle Linux is an enterprise Linux distribution by Oracle, designed for cloud and on-premises workloads.",
	icon: "Oracle.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "oracle-linux:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("\\(Oracle Linux(?: Server)?\\)", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:o:oracle:linux:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
