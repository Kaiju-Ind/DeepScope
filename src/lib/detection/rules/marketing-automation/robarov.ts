import type { TechnologyDefinition } from '../../types';

export const robarovTechnologyDefinition = {
	id: "robarov",
	name: "Robarov",
	website: "https://robarov.be",
	description: "Robarov is an online marketing platform that delivers customized online strategies designed to attract and engage new customers.",
	icon: "Robarov.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "robarov:jsGlobal:0",
			kind: "jsGlobal",
			property: "ROBAROV_CSRF_TOKEN",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
