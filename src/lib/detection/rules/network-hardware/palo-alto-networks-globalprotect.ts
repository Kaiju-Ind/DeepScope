import type { TechnologyDefinition } from '../../types';

export const paloAltoNetworksGlobalprotectTechnologyDefinition = {
	id: "palo-alto-networks-globalprotect",
	name: "Palo Alto Networks - GlobalProtect",
	website: "https://www.paloaltonetworks.com/sase/globalprotect",
	description: "GlobalProtect is a web-based portal that enables connection to a VPN, providing secure access to enterprise networks and resources.",
	icon: "GlobalProtect.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "palo-alto-networks-globalprotect:dom:0",
			kind: "dom",
			selector: "link[href*='/global-protect/portal/css/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
