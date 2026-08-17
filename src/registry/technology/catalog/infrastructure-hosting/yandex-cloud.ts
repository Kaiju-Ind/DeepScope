import type { TechnologyDefinition } from '@/lib/detection/types';

export const yandexCloudTechnologyDefinition: TechnologyDefinition = {
	id: 'yandex-cloud',
	name: 'Yandex.Cloud',
	website: 'https://cloud.yandex.com/en/',
	description:
		"Yandex. Cloud is a public cloud platform where companies can create and develop projects using Yandex's scalable computing power, advanced technologies, and infrastructure.",
	icon: 'Yandex.Cloud.svg',
	categories: [
		'infrastructure-hosting',
	],
	rules: [],
	metadata: {
		saas: false,
		pricing: [
			'payg',
		],
	},
} as const satisfies TechnologyDefinition;
