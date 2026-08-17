import type { TechnologyDefinition } from '@/lib/detection/types';

export const leasewebTechnologyDefinition: TechnologyDefinition = {
	id: 'leaseweb',
	name: 'Leaseweb',
	website: 'https://www.leaseweb.com',
	description:
		'Leaseweb is an Infrastructure-as-a-Service (IaaS) provider offering dedicated servers, CDN, cloud hosting and hybrid cloud on a global network.',
	icon: 'Leaseweb.svg',
	categories: [
		'infrastructure-hosting',
	],
	rules: [
		{
			id: 'leaseweb:dns:0',
			kind: 'dns',
			valuePattern: new RegExp('\\.leaseweb\\.nl', 'i'),
			recordType: 'SOA',
			description: 'DNS record matches a known technology marker.',
		},
	],
	metadata: {
		pricing: [
			'payg',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
