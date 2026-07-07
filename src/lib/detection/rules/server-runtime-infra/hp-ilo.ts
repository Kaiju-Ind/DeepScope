import type { TechnologyDefinition } from '../../types';

export const hpIloTechnologyDefinition = {
	id: "hp-ilo",
	name: "HP iLO",
	website: "https://hp.com",
	description: "HP iLO is a tool that provides multiple ways to configure, update, monitor, and run servers remotely.",
	icon: "HP.svg",
	categories: [
		"server-runtime-infra",
		"network-hardware",
	],
	rules: [
		{
			id: "hp-ilo:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("HP-iLO-Server(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hp-ilo:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("hp-ilo-server(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:h:hp:integrated_lights-out:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
