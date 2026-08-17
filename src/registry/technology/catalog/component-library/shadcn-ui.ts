import type { TechnologyDefinition } from '@/lib/detection/types';

export const shadcnUiTechnologyDefinition: TechnologyDefinition = {
	id: 'shadcn-ui',
	name: 'shadcn/ui',
	website: 'https://ui.shadcn.com',
	description: 'shadcn/ui is a component system built with Radix UI and Tailwind CSS.',
	icon: 'shadcn-ui.svg',
	categories: [
		'component-library',
	],
	rules: [
		{
			id: 'shadcn-ui:stylesheetContent:0',
			kind: 'stylesheetContent',
			pattern: new RegExp('--destructive-foreground'),
			description: 'Stylesheet content contains a bounded technology signature.',
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		'radix-ui',
		'tailwind-css',
	],
} as const satisfies TechnologyDefinition;
