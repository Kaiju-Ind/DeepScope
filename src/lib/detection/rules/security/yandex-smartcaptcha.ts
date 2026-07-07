import type { TechnologyDefinition } from '../../types';

export const yandexSmartcaptchaTechnologyDefinition = {
	id: "yandex-smartcaptcha",
	name: "Yandex SmartCaptcha",
	website: "https://cloud.yandex.com/en/services/smartcaptcha",
	description: "Yandex SmartCaptcha is a service for verifying queries to identify user requests and block bots.",
	icon: "yandex_smartcaptcha.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "yandex-smartcaptcha:dom:0",
			kind: "dom",
			selector: "div#smartcaptcha-status",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "yandex-smartcaptcha:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("Yandex SmartCaptcha"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "yandex-smartcaptcha:jsGlobal:2",
			kind: "jsGlobal",
			property: "smartCaptcha",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
