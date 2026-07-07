import type { TechnologyDefinition } from '../../types';

export const yandexMetrikaTechnologyDefinition = {
	id: "yandex-metrika",
	name: "Yandex.Metrika",
	website: "https://metrika.yandex.com",
	description: "Yandex. Metrica is a free web analytics service that tracks and reports website traffic.",
	icon: "Yandex.Metrika.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "yandex-metrika:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mc\\.yandex\\.ru\\/metrika\\/(?:tag|watch)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yandex-metrika:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.jsdelivr\\.net\\/npm\\/yandex\\-metrica\\-watch\\/watch\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yandex-metrika:jsGlobal:2",
			kind: "jsGlobal",
			property: "yandex_metrika",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
