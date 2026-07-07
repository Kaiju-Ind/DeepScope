import type { TechnologyDefinition } from '../../types';

export const kamarTechnologyDefinition = {
	id: "kamar",
	name: "KAMAR",
	website: "https://kamar.nz",
	description: "KAMAR is a Student Management System utilised by secondary schools.",
	icon: "KAMAR.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "kamar:jsGlobal:0",
			kind: "jsGlobal",
			property: "KAMAR.has_address_ben_found",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
