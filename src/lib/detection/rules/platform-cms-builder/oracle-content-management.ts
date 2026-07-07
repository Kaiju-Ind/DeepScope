import type { TechnologyDefinition } from '../../types';

export const oracleContentManagementTechnologyDefinition = {
	id: "oracle-content-management",
	name: "Oracle Content Management",
	website: "https://www.oracle.com/content-management",
	description: "Oracle Content Management is a cloud-based platform designed for organisations to create, store, manage, and deliver digital content while supporting structured content organisation, collaboration, and seamless integration with other applications.",
	icon: "Oracle.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "oracle-content-management:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/_sitesclouddelivery\\/renderer\\/renderer\\.js"),
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
