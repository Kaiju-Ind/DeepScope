import type { TechnologyDefinition } from '../../types';

export const instanaTechnologyDefinition = {
	id: "instana",
	name: "Instana",
	website: "https://www.instana.com",
	description: "Instana is a Kubernetes-native APM tool which is built for new-stack including Microservices and lately Serverless but also supports the existing VM based stacks  including several supported technologies.",
	icon: "Instana.svg",
	categories: [
		"analytics",
		"developer-tooling",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "instana:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("eum\\.instana\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "instana:jsGlobal:1",
			kind: "jsGlobal",
			property: "ineum",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
