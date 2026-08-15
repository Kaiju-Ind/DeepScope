import type { TechnologyDefinition } from '../../types';

export const teamcityTechnologyDefinition: TechnologyDefinition = {
	id: 'teamcity',
	name: 'TeamCity',
	website: 'https://www.jetbrains.com/teamcity/',
	description: 'TeamCity is a build management and continuous integration server from JetBrains.',
	icon: 'TeamCity.svg',
	categories: [
		'developer-tooling',
	],
	rules: [
		{
			id: 'teamcity:html:0',
			kind: 'html',
			pattern: new RegExp('<span class="versionTag"><span class="vWord">Version<\\/span> ([\\d\\.]+)', 'i'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'HTML contains a known technology signature.',
		},
		{
			id: 'teamcity:meta:1',
			kind: 'meta',
			key: 'application-name',
			valuePattern: new RegExp('TeamCity', 'i'),
			description: 'Meta tag matches a known technology marker.',
		},
	],
	metadata: {
		cpe: 'cpe:2.3:a:jetbrains:teamcity:*:*:*:*:*:*:*:*',
	},
	implies: [
		'apache-tomcat',
		'java',
		'jquery',
		'moment-js',
		'prototype',
		'react',
		'underscore-js',
	],
} as const satisfies TechnologyDefinition;
