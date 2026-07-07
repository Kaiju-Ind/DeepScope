import type { TechnologyDefinition } from '../../types';

export const wordpressComHelpCenterTechnologyDefinition = {
	id: 'wordpress-com-help-center',
	name: 'WordPress.com Help Center',
	website: 'https://wordpress.com/support/',
	description: 'WordPress.com Help Center loads Automattic support UI assets and a floating help launcher.',
	icon: 'WordPress.svg',
	categories: ['widgets-misc'],
	rules: [
		{
			id: 'wordpress-com-help-center:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: /widgets\.wp\.com\/help-center\/help-center-logged-out\.min\.js/i,
			confidence: 100,
			description: 'Script URL loads the WordPress.com logged-out help center bundle.',
		},
		{
			id: 'wordpress-com-help-center:stylesheetHref:1',
			kind: 'stylesheetHref',
			pattern: /widgets\.wp\.com\/help-center\/help-center-logged-out\.css/i,
			confidence: 100,
			description: 'Stylesheet URL loads the WordPress.com help center styles.',
		},
		{
			id: 'wordpress-com-help-center:html:2',
			kind: 'html',
			pattern: /wpcom-help-center-fab|help-center-logged-out|wpcom-help-center-launcher-style/i,
			confidence: 100,
			description: 'Document markup contains WordPress.com help center launcher markers.',
		},
		{
			id: 'wordpress-com-help-center:dom:3',
			kind: 'dom',
			selector: '.wpcom-help-center-fab, [id="wpcom-help-center-launcher-style"], .help-center__container',
			confidence: 100,
			description: 'DOM contains WordPress.com help center UI markers.',
		},
	],
	requires: ['wordpress-com'],
} as const satisfies TechnologyDefinition;
