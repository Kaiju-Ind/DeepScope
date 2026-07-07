import type { TechnologyDefinition } from '../../types';

export const vostVeterTechnologyDefinition = {
	id: "vost-veter",
	name: "Vost Veter",
	website: "https://vostveter.ru",
	description: "Vost Veter is an automotive dealership platform that provides vehicle sales, maintenance, and repair services.",
	icon: "VostVeter.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vost-veter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.vostveter\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vost-veter:jsGlobal:1",
			kind: "jsGlobal",
			property: "vostveter_callback",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vost-veter:jsGlobal:2",
			kind: "jsGlobal",
			property: "vostveter_pixel",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
