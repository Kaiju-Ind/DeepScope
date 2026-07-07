import type { TechnologyDefinition } from '../../types';

export const macroactiveTechnologyDefinition = {
	id: "macroactive",
	name: "MacroActive",
	website: "https://macroactive.com",
	description: "MacroActive is a customizable coaching platform designed to help professionals build and manage their own branded programs and client communities.",
	icon: "MacroActive.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "macroactive:dom:0",
			kind: "dom",
			selector: "link[href*='.macroactivemvp.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "macroactive:jsGlobal:1",
			kind: "jsGlobal",
			property: "MA.customerToken",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "macroactive:jsGlobal:2",
			kind: "jsGlobal",
			property: "MAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
