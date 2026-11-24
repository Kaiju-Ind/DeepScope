import type { TechnologyDefinition } from '@/lib/detection/types';

export const googleFontsTechnologyDefinition: TechnologyDefinition = {
	id: 'google-fonts',
	name: 'Google Fonts',
	website: 'https://fonts.google.com/',
	description: 'Google Fonts is a library of open-source font families served from Google infrastructure.',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'google-fonts:stylesheetHref:0',
			kind: 'stylesheetHref',
			pattern: new RegExp('fonts\\.googleapis\\.com\\/(?:css|earlyaccess|icon)'),
			description: 'Stylesheet served from the Google Fonts CSS API.',
		},
		{
			id: 'google-fonts:resourceUrl:1',
			kind: 'resourceUrl',
			pattern: new RegExp('fonts\\.gstatic\\.com\\/'),
			description: 'Font files served from the Google Fonts static host.',
		},
		{
			id: 'google-fonts:html:2',
			kind: 'html',
			pattern: new RegExp('rel="preconnect"[^>]+href="https:\\/\\/fonts\\.g(?:oogleapis|static)\\.com'),
			description: 'Preconnect hint to the Google Fonts origins.',
		},
	],
};
