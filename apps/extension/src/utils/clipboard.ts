/**
 * Copy text through the Clipboard API with an extension-safe DOM fallback.
 *
 * The fallback is kept here because both the normal diagnostics UI and the
 * minimal crash UI must be able to copy support data without depending on one
 * another.
 */
export async function copy(text: string): Promise<void> {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text);
		return;
	}

	const textarea = document.createElement('textarea');
	textarea.value = text;
	textarea.style.position = 'fixed';
	textarea.style.opacity = '0';
	document.body.append(textarea);
	textarea.select();

	const copied = document.execCommand('copy');
	textarea.remove();
	if (!copied) throw new Error('Browser clipboard access is unavailable.');
}
