import type { TechnologyDefinition } from '../../types';

export const fortinetFortigateTechnologyDefinition = {
	id: "fortinet-fortigate",
	name: "Fortinet FortiGate",
	website: "https://www.fortinet.com/products/next-generation-firewall",
	description: "Fortinet FortiGate is a family of network security appliances that provide firewall, VPN, intrusion prevention, antivirus, web filtering, and other security features to protect and secure networks and data.",
	icon: "Fortinet.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "fortinet-fortigate:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^FGTServer$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "fortinet-fortigate:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^fgtserver$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
