import type { TechnologyDefinition } from '../../types';

export const wheelOfPopupsTechnologyDefinition = {
	id: "wheel-of-popups",
	name: "Wheel of Popups",
	website: "https://wheelofpopups.com",
	description: "Wheel of Popups is a tool that triggers an exit-intent popup designed to capture leaving visitors and support conversion optimization.",
	icon: "WheelOfPopups.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "wheel-of-popups:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.wheelofpopups\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wheel-of-popups:jsGlobal:1",
			kind: "jsGlobal",
			property: "initWheelOfPopups",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
