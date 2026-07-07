import type { TechnologyDefinition } from '../../types';

export const chameleonPowerTechnologyDefinition = {
	id: "chameleon-power",
	name: "Chameleon Power",
	website: "https://chameleonpower.com",
	description: "Chameleon Power is a software platform that enables visualization, design, decoration, and selection of digital images and materials.",
	icon: "ChameleonPower.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "chameleon-power:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.chameleonpower\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chameleon-power:jsGlobal:1",
			kind: "jsGlobal",
			property: "ChamStats.addEvent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:hyphensolutions:chameleon_power:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
