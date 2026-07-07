import type { TechnologyDefinition } from '../../types';

export const wordpressComStatsTechnologyDefinition = {
	id: 'wordpress-com-stats',
	name: 'WordPress.com Stats',
	website: 'https://wordpress.com/support/stats/',
	description: 'WordPress.com Stats measures page views and events through Automattic-hosted tracking endpoints.',
	icon: 'WordPress.svg',
	categories: ['analytics'],
	rules: [
		{
			id: 'wordpress-com-stats:requestUrl:0',
			kind: 'requestUrl',
			pattern: /(?:stats|pixel)\.wp\.com\/(?:g|boom)\.(?:gif|js)|pixel\.wp\.com\/boom\.gif/i,
			confidence: 100,
			description: 'Network activity reaches WordPress.com Stats or Pixel tracking endpoints.',
		},
		{
			id: 'wordpress-com-stats:resourceUrl:1',
			kind: 'resourceUrl',
			pattern: /(?:stats|pixel)\.wp\.com\/(?:g|boom)\.(?:gif|js)|pixel\.wp\.com\/boom\.gif/i,
			confidence: 100,
			description: 'Loaded resources include WordPress.com Stats or Pixel tracking endpoints.',
		},
		{
			id: 'wordpress-com-stats:html:2',
			kind: 'html',
			pattern: /(?:stats|pixel)\.wp\.com\/(?:g|boom)\.(?:gif|js)|bilmur=1|_tkq/i,
			confidence: 95,
			description: 'Document markup references WordPress.com Stats tracking markers.',
		},
		{
			id: 'wordpress-com-stats:jsGlobal:3',
			kind: 'jsGlobal',
			property: '_tkq.push',
			confidence: 90,
			description: 'Page global exposes the WordPress.com Stats tracking queue.',
		},
	],
	requires: ['wordpress-com'],
} as const satisfies TechnologyDefinition;
