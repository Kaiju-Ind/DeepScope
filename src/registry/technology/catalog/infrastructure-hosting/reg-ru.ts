import type { TechnologyDefinition } from '@/lib/detection/types';

export const regRuTechnologyDefinition: TechnologyDefinition = {
	id: 'reg-ru',
	name: 'REG.RU',
	website: 'https://www.reg.ru',
	description: 'REG. RU is a web hosting provider and internet domain registrar.',
	icon: 'REG.RU.svg',
	categories: [
		'infrastructure-hosting',
	],
	rules: [
		{
			id: 'reg-ru:dns:0',
			kind: 'dns',
			valuePattern: new RegExp('(?:\\.hosting)?\\.reg\\.ru', 'i'),
			recordType: 'SOA',
			description: 'DNS record matches a known technology marker.',
		},
	],
	metadata: {
		pricing: [
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
