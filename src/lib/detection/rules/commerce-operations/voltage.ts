import type { TechnologyDefinition } from '../../types';

export const voltageTechnologyDefinition = {
	id: "voltage",
	name: "Voltage",
	website: "https://www.voltage.cloud",
	description: "Voltage is a payments platform that enables users to send bitcoin globally through a secure network.",
	icon: "Voltage.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "voltage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("btcpay0\\.voltageapp\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
