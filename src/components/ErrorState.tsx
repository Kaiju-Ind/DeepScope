/** Props for the popup error message component. */
export type ErrorStateProps = {
	/** Recovery-oriented error text shown to the user. */
	message: string;
};

/**
 * Render a popup error message that assistive technology announces promptly.
 *
 * The popup uses this for recoverable background or content-script failures,
 * such as unsupported URLs or unavailable content scripts. `role="alert"` keeps
 * those failures visible to screen-reader users without adding a separate toast
 * system.
 */
export function ErrorState(props: ErrorStateProps) {
	return <p class="status-message warning" role="alert">{props.message}</p>;
}

export default ErrorState;
