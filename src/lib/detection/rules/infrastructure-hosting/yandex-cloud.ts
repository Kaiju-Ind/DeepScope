import type { TechnologyDefinition } from '../../types';

export const yandexCloudTechnologyDefinition = {
	id: "yandex-cloud",
	name: "Yandex.Cloud",
	website: "https://cloud.yandex.com/en/",
	description: "Yandex. Cloud is a public cloud platform where companies can create and develop projects using Yandex's scalable computing power, advanced technologies, and infrastructure.",
	icon: "Yandex.Cloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
	metadata: {
		saas: false,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
