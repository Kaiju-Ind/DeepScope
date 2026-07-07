import type { TechnologyDefinition } from '../../types';

export const yandexCloudCdnTechnologyDefinition = {
	id: "yandex-cloud-cdn",
	name: "Yandex.Cloud CDN",
	website: "https://cloud.yandex.com/en/services/cdn",
	description: "Yandex. Cloud CDN helps you streamline static content delivery for your web service.",
	icon: "Yandex.Cloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "yandex-cloud-cdn:dom:0",
			kind: "dom",
			selector: "[href*='storage.yandexcloud.net'], [src*='storage.yandexcloud.net']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"yandex-cloud",
	],
} as const satisfies TechnologyDefinition;
