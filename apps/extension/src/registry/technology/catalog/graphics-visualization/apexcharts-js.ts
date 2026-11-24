import type { TechnologyDefinition } from '@/lib/detection/types';

export const apexchartsJsTechnologyDefinition: TechnologyDefinition = {
	id: 'apexcharts-js',
	name: 'ApexCharts.js',
	website: 'https://apexcharts.com',
	description:
		'ApexCharts is a modern JavaScript charting library that empowers developers to build interactive data visualizations for commercial and non-commercial projects.',
	icon: 'apexcharts.svg',
	categories: [
		'graphics-visualization',
	],
	rules: [
		{
			id: 'apexcharts-js:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'ApexCharts',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
