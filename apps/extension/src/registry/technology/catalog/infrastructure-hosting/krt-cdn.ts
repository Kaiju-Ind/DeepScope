import type { TechnologyDefinition } from '@/lib/detection/types';

export const krtCdnTechnologyDefinition: TechnologyDefinition = {
	id: 'krt-cdn',
	name: 'KRT CDN',
	website: 'https://krajtilak.in',
	description: 'KRT CDN is a content delivery network operated on the cdn.krajtilak.in origin.',
	icon: 'KRT CDN.svg',
	categories: ['infrastructure-hosting'],
	rules: [
		{
			id: 'krt-cdn:resourceUrl:origin',
			kind: 'resourceUrl',
			pattern: /^https?:\/\/cdn\.krajtilak\.in(?:[/:?#]|$)/i,
			confidence: 100,
			description: 'Captured resource is served from the KRT CDN origin.',
		},
		{
			id: 'krt-cdn:requestUrl:origin',
			kind: 'requestUrl',
			pattern: /^https?:\/\/cdn\.krajtilak\.in(?:[/:?#]|$)/i,
			confidence: 100,
			description: 'Observed network request targets the KRT CDN origin.',
		},
	],
} as const satisfies TechnologyDefinition;
