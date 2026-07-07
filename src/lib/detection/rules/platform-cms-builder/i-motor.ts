import type { TechnologyDefinition } from '../../types';

export const iMotorTechnologyDefinition = {
	id: "i-motor",
	name: "i-motor",
	website: "https://www.i-motor.com.au",
	description: "i-motor is a platform that enhances automotive dealer websites by providing innovative, connected solutions to improve the online experience.",
	icon: "i-motor.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "i-motor:dom:0",
			kind: "dom",
			selector: "link[href*='.i-motor.com.au/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
