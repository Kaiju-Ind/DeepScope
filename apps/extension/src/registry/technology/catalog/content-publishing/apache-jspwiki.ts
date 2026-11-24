import type { TechnologyDefinition } from '@/lib/detection/types';

export const apacheJspwikiTechnologyDefinition: TechnologyDefinition = {
	id: 'apache-jspwiki',
	name: 'Apache JSPWiki',
	website: 'https://jspwiki.org',
	description:
		'Apache JSPWiki is an open-source Wiki engine, built around standard JEE components (Java, servlets, JSP).',
	icon: 'Apache.svg',
	categories: [
		'content-publishing',
	],
	rules: [
		{
			id: 'apache-jspwiki:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('jspwiki'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'apache-jspwiki:html:1',
			kind: 'html',
			pattern: new RegExp('<html[^>]* xmlns:jspwiki='),
			description: 'HTML contains a known technology signature.',
		},
		{
			id: 'apache-jspwiki:url:2',
			kind: 'url',
			confidence: 40,
			pattern: new RegExp('(?:^|\\/)Wiki\\.jsp\\?page=', 'i'),
			description: 'Page URL matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
		cpe: 'cpe:2.3:a:apache:jspwiki:*:*:*:*:*:*:*:*',
	},
	implies: [
		'apache-tomcat',
	],
} as const satisfies TechnologyDefinition;
