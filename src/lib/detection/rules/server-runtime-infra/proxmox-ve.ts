import type { TechnologyDefinition } from '../../types';

export const proxmoxVeTechnologyDefinition = {
	id: "proxmox-ve",
	name: "Proxmox VE",
	website: "https://proxmox.com/en/proxmox-ve",
	description: "Proxmox VE is an open-source virtualisation and containerisation platform that provides a web-based management interface to manage virtual machines, containers, storage, and networking.",
	icon: "Proxmox.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "proxmox-ve:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("pve-api-daemon\\/[\\d\\.]+", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "proxmox-ve:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("pve-api-daemon\\/[\\d\\.]+", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
