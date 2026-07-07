import type { VersionExtraction } from './types';

export function extractVersion(
	extraction: VersionExtraction | undefined,
	match: RegExpMatchArray,
	matchedValue = match[0] ?? '',
): string | undefined {
	if (!extraction) {
		return undefined;
	}

	if (extraction.source === 'static') {
		return cleanVersion(extraction.value);
	}

	const sourceMatch =
		extraction.source === 'matchedValue'
			? matchedValue.match(extraction.pattern)
			: match;

	if (!sourceMatch) {
		return undefined;
	}

	if (extraction.template) {
		return cleanVersion(applyTemplate(extraction.template, sourceMatch));
	}

	const group = extraction.group ?? firstCapturingGroup(sourceMatch);
	if (group === undefined) {
		return undefined;
	}

	const value = typeof group === 'number'
		? sourceMatch[group]
		: sourceMatch.groups?.[group];

	return cleanVersion(value);
}

function applyTemplate(template: string, match: RegExpMatchArray): string {
	return template.replace(/\$(\d+)|\$<([A-Za-z_$][\w$]*)>/g, (_, index: string | undefined, name: string | undefined) => {
		if (index) {
			return match[Number(index)] ?? '';
		}
		return name ? match.groups?.[name] ?? '' : '';
	});
}

function firstCapturingGroup(match: RegExpMatchArray): number | undefined {
	for (let index = 1; index < match.length; index += 1) {
		if (match[index] !== undefined) {
			return index;
		}
	}
	return undefined;
}

function cleanVersion(value: string | undefined): string | undefined {
	const version = value?.trim();
	return version || undefined;
}
