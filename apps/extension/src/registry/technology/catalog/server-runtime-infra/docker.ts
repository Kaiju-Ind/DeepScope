import type { TechnologyDefinition } from '@/lib/detection/types';

export const dockerTechnologyDefinition: TechnologyDefinition = {
	id: 'docker',
	name: 'Docker',
	website: 'https://www.docker.com/',
	description:
		'Docker is a tool designed to make it easier to create, deploy, and run applications by using containers.',
	icon: 'Docker.svg',
	categories: [
		'server-runtime-infra',
	],
	rules: [
		{
			id: 'docker:html:0',
			kind: 'html',
			pattern: new RegExp('<!-- This comment is expected by the docker HEALTHCHECK {2}-->'),
			description: 'HTML contains a known technology signature.',
		},
		{
			id: 'docker:html:1',
			kind: 'html',
			pattern: new RegExp('<!-- this comment is expected by the docker healthcheck {2}-->'),
			description: 'HTML contains a known technology signature.',
		},
	],
	metadata: {
		cpe: 'cpe:2.3:a:docker:engine:*:*:*:*:*:*:*:*',
	},
} as const satisfies TechnologyDefinition;
