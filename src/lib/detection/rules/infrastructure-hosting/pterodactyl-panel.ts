import type { TechnologyDefinition } from '../../types';

export const pterodactylPanelTechnologyDefinition = {
	id: "pterodactyl-panel",
	name: "Pterodactyl Panel",
	website: "https://pterodactyl.io",
	description: "Pterodactyl Panel is a free, open-source game server management panel built with PHP, React, and Go.",
	icon: "Pterodactyl Panel.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "pterodactyl-panel:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^pterodactyl_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"go",
		"laravel",
		"php",
		"react",
	],
} as const satisfies TechnologyDefinition;
