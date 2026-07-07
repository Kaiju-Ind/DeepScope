import type { TechnologyDefinition } from '../../types';

export const angularNotitiaTechnologyDefinition = {
	id: "angular-notitia",
	name: "Angular Notitia",
	website: "https://ngx-notitia.vercel.app",
	description: "Easy, flexible toast notification library for Angular applications.",
	icon: "AngularNotitia.svg",
	categories: [
		"ui-library",
		"widgets-misc",
		"component-library",
	],
	rules: [
		{
			id: "angular-notitia:jsGlobal:0",
			kind: "jsGlobal",
			property: "ngxNotitia",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"angular",
	],
} as const satisfies TechnologyDefinition;
