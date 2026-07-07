import type { TechnologyDefinition } from '../../types';

export const recaptchaTechnologyDefinition = {
	id: "recaptcha",
	name: "reCAPTCHA",
	website: "https://www.google.com/recaptcha/",
	description: "reCAPTCHA is a free service from Google that helps protect websites from spam and abuse.",
	icon: "reCAPTCHA.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "recaptcha:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api-secure\\.recaptcha\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "recaptcha:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("recaptcha_ajax\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "recaptcha:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/recaptcha\\/(?:api|enterprise)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "recaptcha:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("\\/recaptcha\\/api\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "recaptcha:dom:4",
			kind: "dom",
			selector: "#recaptcha_image, iframe[src*='.google.com/recaptcha/'], div.g-recaptcha",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "recaptcha:jsGlobal:5",
			kind: "jsGlobal",
			property: "Recaptcha",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "recaptcha:jsGlobal:6",
			kind: "jsGlobal",
			property: "recaptcha",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
