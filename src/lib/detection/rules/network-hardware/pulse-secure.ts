import type { TechnologyDefinition } from '../../types';

export const pulseSecureTechnologyDefinition = {
	id: "pulse-secure",
	name: "Pulse Secure",
	website: "https://www.pulsesecure.net/products/remote-access-overview/",
	description: "Pulse Secure allows users to deploy VPNs to securely to your internal resources.",
	icon: "PulseSecure.png",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "pulse-secure:url:0",
			kind: "url",
			pattern: new RegExp("\\/dana-na\\/auth\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "pulse-secure:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^DSSIGNIN$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "pulse-secure:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^dssignin$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:pulsesecure:pulse_connect_secure:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
