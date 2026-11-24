import type { TechnologyDefinition } from '@/lib/detection/types';

export const liferayTechnologyDefinition: TechnologyDefinition = {
	id: 'liferay',
	name: 'Liferay',
	website: 'https://www.liferay.com/',
	description:
		'Liferay is an open-source company that provides free documentation and paid professional service to users of its software.',
	icon: 'Liferay.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'liferay:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'Liferay',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'liferay:header:1',
			kind: 'header',
			key: 'Liferay-Portal',
			valuePattern: new RegExp('[a-z\\s]{1,60}([\\d.]{1,20})', 'i'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Response header matches a known technology marker.',
		},
		{
			id: 'liferay:header:2',
			kind: 'header',
			key: 'liferay-portal',
			valuePattern: new RegExp('[a-z\\s]{1,60}([\\d.]{1,20})', 'i'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Response header matches a known technology marker.',
		},

		{
			id: 'liferay:cookie:guest-language',
			kind: 'cookie',
			keyPattern: /^GUEST_LANGUAGE_ID$/i,
			confidence: 80,
			description: 'Cookie name matches Liferay guest-language state.',
		},
		{
			id: 'liferay:html:api-global',
			kind: 'html',
			pattern: /Liferay\.(?:Util|Language|ThemeDisplay|AUI)/,
			confidence: 90,
			description: 'HTML references a Liferay client API namespace.',
		},
		{
			id: 'liferay:html:portlet-id',
			kind: 'html',
			pattern: /id=["']_com_liferay_/i,
			confidence: 90,
			description: 'HTML contains a Liferay portlet identifier.',
		},
	],
	metadata: {
		oss: true,
		pricing: [
			'poa',
		],
		cpe: 'cpe:2.3:a:liferay:liferay_portal:*:*:*:*:*:*:*:*',
	},
	implies: [
		'java',
	],
} as const satisfies TechnologyDefinition;
