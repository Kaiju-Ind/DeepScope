import type { TechnologyDefinition } from '../../types';

export const thingparkEnterpriseTechnologyDefinition = {
	id: "thingpark-enterprise",
	name: "ThingPark Enterprise",
	website: "https://www.thingpark.com/thingpark-enterprise",
	description: "ThingPark Enterprise is an enterprise IoT connectivity solution designed with a strong focus on security.",
	icon: "ThingPark.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "thingpark-enterprise:dom:0",
			kind: "dom",
			selector: "input[value*='.thingpark.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
