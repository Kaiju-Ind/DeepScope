import type { TechnologyDefinition } from '../../types';

export const myesalonTechnologyDefinition = {
	id: "myesalon",
	name: "MyEsalon",
	website: "https://myesalon.com",
	description: "MyEsalon is a platform that provides marketing solutions for nail salons, beauty salons, hair salons, and spas, helping businesses enhance visibility and attract clients.",
	icon: "MyEsalon.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "myesalon:header:0",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("myesalon\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "myesalon:header:1",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("myesalon\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
