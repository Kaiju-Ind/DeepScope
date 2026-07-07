import type { RulePerformanceFixture } from '@/lib/detection/rule-performance-profile';
import {
	DEFAULT_RULE_PROFILE_PAYLOAD_CHARS,
	RULE_PROFILE_TARGET,
	makeNextHydrationPayload,
	makeReactRouterHydrationPayload,
	makeRuleProfileObservation,
} from '@/lib/detection/rule-performance-profile';

export type { RulePerformanceFixture } from '@/lib/detection/rule-performance-profile';
export {
	DEFAULT_RULE_PROFILE_PAYLOAD_CHARS as DEFAULT_HYDRATION_PAYLOAD_CHARS,
	RULE_PROFILE_TARGET as RULE_PERFORMANCE_TARGET,
	makeNextHydrationPayload,
	makeReactRouterHydrationPayload,
	makeRuleProfileObservation as makeRulePerformanceObservation,
};

/** Large hydration blob reused by curated rule misses so vendor rules prove they fail cheaply. */
const REACT_ROUTER_HYDRATION_MISS = makeReactRouterHydrationPayload();

export const RULE_PERFORMANCE_FIXTURES: readonly RulePerformanceFixture[] = [
	{
		technologyId: 'grafana',
		ruleId: 'grafana:scriptContent:1',
		kind: 'scriptContent',
		passValue: 'window.grafanaBootData={settings:{"buildInfo":{"latestVersion":"10.0.0","version":"9.5.1"}}};',
		failValue: `${REACT_ROUTER_HYDRATION_MISS}window.otherBootData={"buildInfo":{"latestVersion":"10.0.0","version":"9.5.1"}};`,
		note: 'Grafana boot-data version detector, mixed-case key',
	},
	{
		technologyId: 'grafana',
		ruleId: 'grafana:scriptContent:3',
		kind: 'scriptContent',
		passValue: 'window.grafanaBootData={settings:{}};',
		failValue: `${REACT_ROUTER_HYDRATION_MISS}window.otherBootData={settings:{}};`,
		note: 'Grafana boot-data assignment detector',
	},
	{
		technologyId: 'grafana',
		ruleId: 'grafana:scriptContent:4',
		kind: 'scriptContent',
		passValue: 'window.grafanaBootData={settings:{"buildInfo":{"latestversion":"10.0.0","version":"9.5.1"}}};',
		failValue: `${REACT_ROUTER_HYDRATION_MISS}window.otherBootData={"buildInfo":{"latestversion":"10.0.0","version":"9.5.1"}};`,
		note: 'Grafana boot-data version detector, lower-case key',
	},
	{
		technologyId: 'altcha',
		ruleId: 'altcha:scriptContent:0',
		kind: 'scriptContent',
		passValue: 'import "https://cdn.example/altcha.js";',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		note: 'Altcha control detector without leading wildcard',
	},
	{
		technologyId: 'altcha',
		ruleId: 'altcha:scriptContent:2',
		kind: 'scriptContent',
		passValue: 'import "https://cdn.example/altcha.js";',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		note: 'Altcha detector without a leading wildcard',
	},
	{
		technologyId: 'datadog',
		ruleId: 'datadog:scriptContent:modern:4',
		kind: 'scriptContent',
		passValue: 'logger.warn("PCI compliance for Logs is only available for Datadog organizations in the US1 site. Default intake will be used.")',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{
				label: 'near-datadog-copy',
				value: 'const message = "PCI compliance for Logs is available for another observability product.";',
			},
		],
		note: 'Datadog browser logs PCI intake warning',
	},
	{
		technologyId: 'atatus',
		ruleId: 'atatus:scriptContent:modern:2',
		kind: 'scriptContent',
		passValue: 'logger.log("Atatus: Caught unhandled promise rejection:", reason)',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'generic-promise-rejection', value: 'logger.log("Caught unhandled promise rejection:", reason)' },
		],
		note: 'Atatus unhandled promise rejection log marker',
	},
	{
		technologyId: 'atatus',
		ruleId: 'atatus:scriptContent:modern:5',
		kind: 'scriptContent',
		passValue: 'endsWith(item.url, "/atatus.js")',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'plain-atatus-url-string', value: 'const script = "/atatus.js";' },
		],
		note: 'Atatus loader URL suffix check',
	},
	{
		technologyId: 'atatus',
		ruleId: 'atatus:scriptContent:modern:8',
		kind: 'scriptContent',
		passValue: 'frame.postMessage("RUM_EPISODES:done", targetOrigin)',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'plain-rum-episodes-string', value: 'const eventName = "RUM_EPISODES:done";' },
		],
		note: 'Atatus RUM episode completion message',
	},
	{
		technologyId: 'appdynamics',
		ruleId: 'appdynamics:scriptContent:modern:0',
		kind: 'scriptContent',
		passValue: 'logger.log("AppDynamics EUM cloud application key missing. Please specify window[\'adrum-app-key\']")',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'plain-app-key-string', value: 'const message = "AppDynamics EUM cloud application key missing. Please specify window[\'adrum-app-key\']";' },
		],
		note: 'AppDynamics browser EUM app-key warning',
	},
	{
		technologyId: 'appdynamics',
		ruleId: 'appdynamics:scriptContent:modern:1',
		kind: 'scriptContent',
		passValue: 'ADRUM.EventType.ADRUM_XHR = 101;',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'bare-adrum-xhr-token', value: 'const ADRUM_XHR = "not an enum member";' },
		],
		note: 'AppDynamics ADRUM XHR event enum marker',
	},
	{
		technologyId: 'appdynamics',
		ruleId: 'appdynamics:scriptContent:modern:2',
		kind: 'scriptContent',
		passValue: 'window[key].adrumArgs = args;',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'bare-adrum-args-token', value: 'const adrumArgs = [];' },
		],
		note: 'AppDynamics adrumArgs bootstrap marker',
	},
	{
		technologyId: 'appdynamics',
		ruleId: 'appdynamics:scriptContent:modern:3',
		kind: 'scriptContent',
		passValue: 'config.userConf.adrumExtUrlHttps = "https://cdn.example/adrum-ext.js";',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'bare-adrum-ext-url-token', value: 'const adrumExtUrlHttps = "https://cdn.example/other.js";' },
		],
		note: 'AppDynamics userConf extension URL marker',
	},
	{
		technologyId: 'heap',
		ruleId: 'heap:scriptContent:modern:2',
		kind: 'scriptContent',
		passValue: 'heap.makeHeapIgnoreSelector("[data-redacted]")',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'generic-ignore-selector', value: 'makeIgnoreSelector("[data-redacted]")' },
		],
		note: 'Heap ignore-selector helper marker',
	},
	{
		technologyId: 'honeybadger',
		ruleId: 'honeybadger:scriptContent:modern:1',
		kind: 'scriptContent',
		passValue: 'prefixes.unshift("[Honeybadger]")',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'plain-honeybadger-prefix', value: 'const prefix = "[Honeybadger]";' },
		],
		note: 'Honeybadger logger prefix insertion marker',
	},
	{
		technologyId: 'raygun',
		ruleId: 'raygun:scriptContent:modern:1',
		kind: 'scriptContent',
		passValue: 'var userIdKey = "raygun4js-userid";',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'near-raygun-user-key', value: 'var userIdKey = "raygun-userid";' },
		],
		note: 'Raygun4JS user id storage key marker',
	},
	{
		technologyId: 'tanstack-start',
		ruleId: 'tanstack-start:scriptContent:modern:1',
		kind: 'scriptContent',
		passValue: 'match.__beforeLoadContext = router.ssr.serializer.parse(match.__beforeLoadContext)',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'plain-before-load-context', value: 'const __beforeLoadContext = {};' },
		],
		note: 'TanStack Start beforeLoad SSR serializer marker',
	},
	{
		technologyId: 'tanstack-start',
		ruleId: 'tanstack-start:scriptContent:modern:3',
		kind: 'scriptContent',
		passValue: 'router.clientSsr = { getStreamedValue: function () { return window.__TSR_SSR__.streamedValues[id].serializer.parse(value) } }',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'partial-client-ssr-shape', value: 'router.clientSsr = { getStreamedValue: function () { return streamedValues[id] } }' },
		],
		note: 'TanStack Start streamed SSR serializer marker',
	},
	{
		technologyId: 'stylus',
		ruleId: 'stylus:stylesheetContent:modern:4',
		kind: 'stylesheetContent',
		passValue: 'primary-color ?= #f00',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'css-custom-property', value: '--primary-color: #f00;' },
		],
		note: 'Stylus default assignment operator marker',
	},
	{
		technologyId: 'preact',
		ruleId: 'preact:scriptContent:modern:4',
		kind: 'scriptContent',
		passValue: 'name.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s")',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'partial-preact-replace-chain', value: 'name.replace(/xlink(H|:h)/, "h")' },
		],
		note: 'Preact DOM attribute normalization replace chain',
	},
	{
		technologyId: 'radix-ui',
		ruleId: 'radix-ui:scriptContent:modern:20',
		kind: 'scriptContent',
		passValue: 'guard.setAttribute("data-radix-focus-guard", "")',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'generic-focus-guard-attribute', value: 'guard.setAttribute("data-focus-guard", "")' },
		],
		note: 'Radix focus guard attribute assignment marker',
	},
	{
		technologyId: 'amd',
		ruleId: 'amd:scriptContent:modern:27',
		kind: 'scriptContent',
		passValue: 'define(["exports"], function (exports) { exports.value = 1 })',
		failValue: REACT_ROUTER_HYDRATION_MISS,
		additionalFailValues: [
			{ label: 'commonjs-exports-only', value: 'module.exports.value = 1;' },
		],
		note: 'AMD define call with exports dependency marker',
	},
] as const;
