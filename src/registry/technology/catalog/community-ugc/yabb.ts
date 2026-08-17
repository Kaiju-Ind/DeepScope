import type { TechnologyDefinition } from '@/lib/detection/types';

export const yabbTechnologyDefinition: TechnologyDefinition = {
	id: 'yabb',
	name: 'YaBB',
	website: 'https://www.yabbforum.com',
	icon: 'YaBB.png',
	categories: [
		'community-ugc',
	],
	rules: [
		{
			id: 'yabb:html:0',
			kind: 'html',
			pattern: new RegExp('Powered by <a href="[^>]+yabbforum'),
			description: 'HTML contains a known technology signature.',
		},
		{
			id: 'yabb:html:1',
			kind: 'html',
			pattern: new RegExp('powered by <a href="[^>]+yabbforum'),
			description: 'HTML contains a known technology signature.',
		},
	],
	metadata: {
		cpe: 'cpe:2.3:a:yabb:yabb:*:*:*:*:*:*:*:*',
	},
} as const satisfies TechnologyDefinition;
