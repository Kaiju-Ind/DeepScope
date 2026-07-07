import type { TechnologyDefinition } from '../../types';

export const rubedoTechnologyDefinition = {
	id: "rubedo",
	name: "Rubedo",
	website: "https://github.com/WebTales/rubedo",
	description: "Rubedo is an open-source PHP CMS powered by the Zend Framework, NoSQL MongoDB, Elasticsearch, and AngularJS, offering advanced features for content management and development.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rubedo:jsGlobal:0",
			kind: "jsGlobal",
			property: "rubedoConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:rubedo_project:rubedo:*:*:*:*:*:*:*:*",
	},
	implies: [
		"elasticsearch",
		"mongodb",
		"php",
	],
} as const satisfies TechnologyDefinition;
