import type { TechnologyDefinition } from '@/lib/detection/types';

export const sensorTowerTechnologyDefinition: TechnologyDefinition = {
	id: 'sensor-tower',
	name: 'Sensor Tower',
	website: 'https://sensortower.com',
	description:
		'Sensor Tower is a mobile app store marketing intelligence platform that provides data and insights on app performance, user acquisition, and market trends.',
	icon: 'SensorTower.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'sensor-tower:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/\\/sensortower\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
