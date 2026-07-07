import type { TechnologyDefinition } from '../../types';

export const addiTechnologyDefinition = {
	id: "addi",
	name: "Addi",
	website: "https://co.addi.com/",
	description: "Addi is a service that allows users to make purchases and pay for them in installments over time.",
	icon: "addi.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "addi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("s3\\.amazonaws\\.com\\/widgets\\.addi\\.com\\/bundle\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
