import type { TechnologyDefinition } from '../../types';

export const ibmDatapowerTechnologyDefinition = {
	id: "ibm-datapower",
	name: "IBM DataPower",
	website: "https://www.ibm.com/products/datapower-gateway",
	description: "IBM DataPower Gateway is a single multi-channel gateway designed to help provide security, control, integration and optimized access to a full range of mobile, web, application programming interface (API), service-oriented architecture (SOA), B2B and cloud workloads.",
	icon: "DataPower.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [],
	metadata: {
		cpe: "cpe:2.3:a:ibm:datapower_gateway:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
