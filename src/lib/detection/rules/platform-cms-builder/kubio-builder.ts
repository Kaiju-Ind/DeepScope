import type { TechnologyDefinition } from '../../types';

export const kubioBuilderTechnologyDefinition = {
	id: "kubio-builder",
	name: "Kubio Builder",
	website: "https://kubiobuilder.com",
	description: "Kubio Builder is a WordPress site builder that enables editing of all site elements within a single interface.",
	icon: "KubioBuilder.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kubio-builder:jsGlobal:0",
			kind: "jsGlobal",
			property: "kubio.frontend",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kubio-builder:jsGlobal:1",
			kind: "jsGlobal",
			property: "kubioFrontendData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
