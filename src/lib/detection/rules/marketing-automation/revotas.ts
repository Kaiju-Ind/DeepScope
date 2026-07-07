import type { TechnologyDefinition } from '../../types';

export const revotasTechnologyDefinition = {
	id: "revotas",
	name: "Revotas",
	website: "https://www.revotas.com",
	description: "Revotas is a digital marketing platform based in Turkey.",
	icon: "Revotas.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "revotas:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.revotas\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
