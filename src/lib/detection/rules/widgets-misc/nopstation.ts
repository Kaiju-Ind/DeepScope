import type { TechnologyDefinition } from '../../types';

export const nopstationTechnologyDefinition = {
	id: "nopstation",
	name: "nopStation",
	website: "https://www.nop-station.com",
	description: "nopStation is an one stop ecommerce solution with custom integrations and custom built plugins based on custom tailored requirements on top of nopCommerce.",
	icon: "nopStation.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "nopstation:dom:0",
			kind: "dom",
			selector: "a[href*='.nop-station.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"microsoft-asp-net",
	],
	requires: [
		"nopcommerce",
	],
} as const satisfies TechnologyDefinition;
