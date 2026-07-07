import type { TechnologyDefinition } from '../../types';

export const envoyTechnologyDefinition = {
	id: "envoy",
	name: "Envoy",
	website: "https://www.envoyproxy.io/",
	description: "Envoy is an open-source edge and service proxy, designed for cloud-native applications.",
	icon: "Envoy.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "envoy:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^envoy$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "envoy:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^envoy$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:envoyproxy:envoy:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
