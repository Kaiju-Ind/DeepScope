import type { TechnologyDefinition } from '@/lib/detection/types';

export const clickioTechnologyDefinition: TechnologyDefinition = {
	id: 'clickio',
	name: 'clickio',
	website: 'https://www.gdpr.clickio.com/',
	description:
		'Clickio Consent Tool collects and communicates consent both to IAB Framework vendors and to Google Ads products.',
	icon: 'clickio.png',
	categories: [
		'privacy-compliance',
	],
	rules: [
		{
			id: 'clickio:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('clickio\\.mgr\\.consensu\\.org\\/t\\/consent_[0-9]+\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
