import type { TechnologyDefinition } from '../../types';

export const godaddyDomainParkingTechnologyDefinition = {
	id: "godaddy-domain-parking",
	name: "GoDaddy Domain Parking",
	website: "https://www.godaddy.com",
	description: "GoDaddy is used as a web host and domain registrar.",
	icon: "GoDaddy.svg",
	categories: [
		"domain-parking",
	],
	rules: [
		{
			id: "godaddy-domain-parking:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("wsimg\\.com\\/parking-lander"),
			description: "Script content contains a bounded technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
