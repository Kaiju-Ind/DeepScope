import type { TechnologyDefinition } from '../../types';

export const roadrunnerTechnologyDefinition = {
	id: "roadrunner",
	name: "RoadRunner",
	website: "https://roadrunner.dev",
	description: "RoadRunner is a high-performance PHP application server, load balancer, and process manager written in Golang.",
	icon: "RoadRunner.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "roadrunner:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("RoadRunner", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "roadrunner:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("roadrunner", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
