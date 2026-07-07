import type { TechnologyDefinition } from '../../types';

export const altchaTechnologyDefinition = {
	id: "altcha",
	name: "Altcha",
	website: "https://altcha.org",
	description: "Altcha is a spam and abuse protection solution for websites and apps, offering a privacy-friendly Captcha and other tools designed with GDPR compliance to provide strong security while safeguarding user privacy.",
	icon: "Altcha.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "altcha:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("altcha\\.(org|js)"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "altcha:jsGlobal:1",
			kind: "jsGlobal",
			property: "ALTCHA_WIDGET_ATTRS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "altcha:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("altcha\\.(org|js)"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
