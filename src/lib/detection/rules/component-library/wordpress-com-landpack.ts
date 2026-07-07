import type { TechnologyDefinition } from '../../types';

export const wordpressComLandpackTechnologyDefinition = {
	id: 'wordpress-com-landpack',
	name: 'WordPress.com Landpack',
	website: 'https://wordpress.com/',
	description: 'WordPress.com Landpack provides landing-page blocks, layout classes, and animations for WordPress.com marketing pages.',
	icon: 'WordPress.svg',
	categories: ['component-library'],
	rules: [
		{
			id: 'wordpress-com-landpack:html:0',
			kind: 'html',
			pattern: /landpack-style-inline-css|\blp-(?:hero|section|content|form|typed|button|image)\b/i,
			confidence: 100,
			description: 'Document contains WordPress.com Landpack block and layout markers.',
		},
		{
			id: 'wordpress-com-landpack:dom:1',
			kind: 'dom',
			selector: '[id="landpack-style-inline-css"], [class*="lp-hero"], [class*="lp-section"], [class*="lp-form"]',
			confidence: 100,
			description: 'DOM contains WordPress.com Landpack layout markers.',
		},
		{
			id: 'wordpress-com-landpack:stylesheetContent:2',
			kind: 'stylesheetContent',
			pattern: /\blp-(?:hero|section|content|form|typed|button|image)\b/i,
			confidence: 90,
			description: 'Captured stylesheet content contains WordPress.com Landpack classes.',
		},
	],
	requires: ['wordpress-com'],
} as const satisfies TechnologyDefinition;
