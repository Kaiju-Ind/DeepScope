import type { TechnologyDefinition } from '../../types';

export const oracleApplicationExpressTechnologyDefinition = {
	id: "oracle-application-express",
	name: "Oracle Application Express",
	website: "https://apex.oracle.com",
	description: "Oracle Application Express (APEX) is an enterprise low-code development platform from Oracle Corporation. APEX is a fully supported no-cost feature of Oracle Database.",
	icon: "Oracle.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "oracle-application-express:jsGlobal:0",
			kind: "jsGlobal",
			property: "apex.libVersions",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oracle-application-express:jsGlobal:1",
			kind: "jsGlobal",
			property: "apex_img_dir",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
