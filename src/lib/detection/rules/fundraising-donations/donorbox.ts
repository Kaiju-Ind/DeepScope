import type { TechnologyDefinition } from '../../types';

export const donorboxTechnologyDefinition = {
	id: "donorbox",
	name: "Donorbox",
	website: "https://donorbox.org",
	description: "Donorbox is a US-based technology company. It offers an online fundraising software that allows individuals and nonprofit organisations to receive donations over the Internet.",
	icon: "Donorbox.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "donorbox:dom:0",
			kind: "dom",
			selector: "a[href*='//donorbox.org/'], iframe[src*='//donorbox.org/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "donorbox:jsGlobal:1",
			kind: "jsGlobal",
			property: "DONORBOX",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "donorbox:jsGlobal:2",
			kind: "jsGlobal",
			property: "DonorBox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "donorbox:jsGlobal:3",
			kind: "jsGlobal",
			property: "donorbox_check_donation_period",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
