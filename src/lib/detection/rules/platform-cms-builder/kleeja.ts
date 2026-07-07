import type { TechnologyDefinition } from '../../types';

export const kleejaTechnologyDefinition = {
	id: "kleeja",
	name: "Kleeja",
	website: "https://kleeja.net",
	description: "Kleeja is a PHP-based solution for managing file upload services on websites.",
	icon: "Kleeja.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kleeja:jsGlobal:0",
			kind: "jsGlobal",
			property: "update_kleeja_captcha",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kleeja:dom:1",
			kind: "dom",
			selector: "a[href*='go.php?go=rules']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kleeja:dom:2",
			kind: "dom",
			selector: "a[href*='ucp.php?go=login']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
