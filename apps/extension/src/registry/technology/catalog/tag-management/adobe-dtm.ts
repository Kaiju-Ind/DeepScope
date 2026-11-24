import type { TechnologyDefinition } from '@/lib/detection/types';

export const adobeDtmTechnologyDefinition: TechnologyDefinition = {
	id: 'adobe-dtm',
	name: 'Adobe DTM',
	website: 'https://marketing.adobe.com/resources/help/en_US/dtm/c_overview.html',
	description:
		'Dynamic Tag Management (DTM) is a tag management solution for Adobe Experience Cloud applications and others.',
	icon: 'adobedtm.png',
	categories: [
		'tag-management',
	],
	rules: [
		{
			id: 'adobe-dtm:scriptSrc:gap0',
			kind: 'scriptSrc',
			pattern: new RegExp('assets\\.adobedtm\\.com\\/[0-9a-f]+\\/[0-9a-f]+\\/launch-'),
			description: 'Capture Adobe DTM script source URL for tag management.',
		},
		{
			id: 'adobe-dtm:jsGlobal:0',
			kind: 'jsGlobal',
			property: '_satellite.buildDate',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
