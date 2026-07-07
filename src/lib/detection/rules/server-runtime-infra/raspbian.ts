import type { TechnologyDefinition } from '../../types';

export const raspbianTechnologyDefinition = {
	id: "raspbian",
	name: "Raspbian",
	website: "https://www.raspbian.org/",
	description: "Raspbian is a free operating system for the Raspberry Pi hardware.",
	icon: "Raspbian.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "raspbian:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Raspbian", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "raspbian:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Raspbian", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "raspbian:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("raspbian", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "raspbian:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("raspbian", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
