import type { TechnologyDefinition } from '../../types';

export const proxmoxMailGatewayTechnologyDefinition = {
	id: "proxmox-mail-gateway",
	name: "Proxmox Mail Gateway",
	website: "https://proxmox.com/en/proxmox-mail-gateway",
	description: "Proxmox Mail Gateway is a mail security and anti-spam solution designed to protect email servers and ensure secure and reliable email communication.",
	icon: "Proxmox.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "proxmox-mail-gateway:jsGlobal:0",
			kind: "jsGlobal",
			property: "pmg-mail-tracker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "proxmox-mail-gateway:jsGlobal:1",
			kind: "jsGlobal",
			property: "pmg-spam-archive",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:proxmox:proxmox_mail_gateway:*:*:*:*:*:*:*:*",
	},
	requires: [
		"proxmox-ve",
	],
} as const satisfies TechnologyDefinition;
