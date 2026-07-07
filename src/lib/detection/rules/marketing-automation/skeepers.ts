import type { TechnologyDefinition } from '../../types';

export const skeepersTechnologyDefinition = {
	id: "skeepers",
	name: "Skeepers",
	website: "https://skeepers.io",
	description: "Skeepers is a platform designed to improve customer satisfaction and support business growth through enhanced engagement and feedback tools.",
	icon: "Skeepers.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "skeepers:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.skeepers\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "skeepers:jsGlobal:1",
			kind: "jsGlobal",
			property: "skeepersStarsCounter",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
