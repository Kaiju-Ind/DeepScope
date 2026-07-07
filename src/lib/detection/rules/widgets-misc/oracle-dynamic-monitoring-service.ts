import type { TechnologyDefinition } from '../../types';

export const oracleDynamicMonitoringServiceTechnologyDefinition = {
	id: "oracle-dynamic-monitoring-service",
	name: "Oracle Dynamic Monitoring Service",
	website: "https://oracle.com",
	description: "Oracle Dynamic Monitoring Service is a feature of Oracle WebLogic Server that provides real-time monitoring and diagnostic capabilities for Java applications running on the WebLogic Server.",
	icon: "Oracle.svg",
	categories: [
		"widgets-misc",
	],
	rules: [],
	implies: [
		"oracle-weblogic-server",
	],
} as const satisfies TechnologyDefinition;
