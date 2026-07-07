import type { TechnologyDefinition } from '../../types';

export const dashiconsTechnologyDefinition = {
	id: 'dashicons',
	name: 'Dashicons',
	website: 'https://developer.wordpress.org/resource/dashicons/',
	description: 'Dashicons is the icon font used by WordPress admin and related WordPress interfaces.',
	icon: 'WordPress.svg',
	categories: ['widgets-misc'],
	rules: [
		{
			id: 'dashicons:stylesheetHref:0',
			kind: 'stylesheetHref',
			pattern: /dashicons(?:\.min)?\.css/i,
			confidence: 100,
			description: 'Stylesheet URL loads the WordPress Dashicons icon font styles.',
		},
		{
			id: 'dashicons:resourceUrl:1',
			kind: 'resourceUrl',
			pattern: /dashicons(?:\.min)?\.css/i,
			confidence: 100,
			description: 'Loaded resource URL references the WordPress Dashicons stylesheet.',
		},
		{
			id: 'dashicons:html:2',
			kind: 'html',
			pattern: /dashicons(?:\.min)?\.css|\bdashicons\b/i,
			confidence: 85,
			description: 'Document contains WordPress Dashicons references.',
		},
	],
	requires: ['wordpress'],
} as const satisfies TechnologyDefinition;
