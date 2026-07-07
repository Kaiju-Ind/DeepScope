import type { TechnologyDefinition } from '../../types';

export const benchmarkTechnologyDefinition = {
	id: "benchmark",
	name: "Benchmark",
	website: "https://www.benchmarkemail.com",
	description: "Benchmark is an email marketing tool used to create, send, and manage email campaigns, track performance metrics, and support audience communication through automated and scheduled messaging.",
	icon: "Benchmark.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "benchmark:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.benchmarkemail\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "benchmark:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.benchmarkemail\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
