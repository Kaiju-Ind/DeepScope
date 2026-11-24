import type { TechnologyDefinition } from '@/lib/detection/types';

export const artifactoryTechnologyDefinition: TechnologyDefinition = {
	id: 'artifactory',
	name: 'Artifactory',
	website: 'https://jfrog.com/artifactory/',
	description:
		'JFrog Artifactory is a universal artifact repository for managing software packages, binaries, containers, AI/ML models, build artifacts, and release metadata.',
	icon: 'Artifactory.svg',
	categories: [
		'developer-tooling',
	],
	rules: [
		{
			id: 'artifactory:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('wicket\\/resource\\/org\\.artifactory\\.'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'artifactory:html:1',
			kind: 'html',
			pattern: new RegExp('<span class="version">Artifactory(?: Pro)?(?: Power Pack)?(?: ([\\d.]+))?'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'HTML contains a known technology signature.',
		},
		{
			id: 'artifactory:jsGlobal:2',
			kind: 'jsGlobal',
			property: 'ArtifactoryUpdates',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'artifactory:html:3',
			kind: 'html',
			pattern: new RegExp('<span class="version">artifactory(?: pro)?(?: power pack)?(?: ([\\d.]+))?'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'HTML contains a known technology signature.',
		},
	],
	metadata: {
		cpe: 'cpe:2.3:a:jfrog:artifactory:*:*:*:*:*:*:*:*',
	},
} as const satisfies TechnologyDefinition;
