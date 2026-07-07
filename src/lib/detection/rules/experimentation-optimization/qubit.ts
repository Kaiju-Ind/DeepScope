import type { TechnologyDefinition } from '../../types';

export const qubitTechnologyDefinition = {
	id: "qubit",
	name: "Qubit",
	website: "https://www.qubit.com",
	description: "Qubit is a platform that enables personalized ecommerce experiences through data-driven insights and intelligent automation.",
	icon: "Qubit.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "qubit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.goqubit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qubit:jsGlobal:1",
			kind: "jsGlobal",
			property: "__qubit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "qubit:jsGlobal:2",
			kind: "jsGlobal",
			property: "onQubitReady",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "qubit:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("\\.goqubit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qubit:jsGlobal:4",
			kind: "jsGlobal",
			property: "QUBIT_WORKER",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
