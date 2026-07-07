import type { TechnologyDefinition } from '../../types';

export const yandexDirectTechnologyDefinition = {
	id: "yandex-direct",
	name: "Yandex.Direct",
	website: "https://ads.yandex.com",
	description: "Yandex Direct is the platform designed for sponsored ad management.",
	icon: "Yandex.Direct.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "yandex-direct:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/an\\.yandex\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yandex-direct:html:1",
			kind: "html",
			pattern: new RegExp("<yatag class=\"ya-partner__ads\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yandex-direct:jsGlobal:2",
			kind: "jsGlobal",
			property: "yandex_ad_format",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yandex-direct:jsGlobal:3",
			kind: "jsGlobal",
			property: "yandex_partner_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yandex-direct:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/an\\.yandex\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yandex-direct:dom:5",
			kind: "dom",
			selector: "yatag[class*='ya-partner__ads']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
