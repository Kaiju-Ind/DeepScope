import type { TechnologyDefinition } from '../../types';

export const centminmodTechnologyDefinition = {
	id: "centminmod",
	name: "Centminmod",
	website: "https://centminmod.com",
	icon: "centminmod.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "centminmod:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("centminmod", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "centminmod:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("centminmod", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"centos",
		"nginx",
		"php",
	],
} as const satisfies TechnologyDefinition;
