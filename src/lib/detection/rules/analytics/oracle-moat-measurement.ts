import type { TechnologyDefinition } from '../../types';

export const oracleMoatMeasurementTechnologyDefinition = {
	id: "oracle-moat-measurement",
	name: "Oracle Moat Measurement",
	website: "https://www.oracle.com/cx/advertising/measurement/",
	description: "Oracle Moat delivers solutions that are critical to measuring advertising effectiveness, including verification and attention, reach, and frequency as well as sales lift measurement.",
	icon: "Oracle.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "oracle-moat-measurement:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("moatads\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
