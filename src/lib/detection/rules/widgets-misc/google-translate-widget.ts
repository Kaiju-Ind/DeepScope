import type { TechnologyDefinition } from '../../types';

export const googleTranslateWidgetTechnologyDefinition: TechnologyDefinition = {
	id: 'google-translate-widget',
	name: 'Google Translate Widget',
	website: 'https://translate.google.com/',
	description: 'Embeddable Google Website Translator widget that adds machine translation to a site.',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'google-translate-widget:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('translate\\.google\\.com\\/translate_a\\/element\\.js'),
			description: 'Google Website Translator element loader.',
		},
	],
};
