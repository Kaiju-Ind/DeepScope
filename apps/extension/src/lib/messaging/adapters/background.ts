import type { Adapter, Message, MessageMeta, OnMessage, SendMessage } from 'comctx';
import { browser, type Browser } from 'wxt/browser';

export const BACKGROUND_RPC_NAMESPACE = 'kaiju-deepscope.background-rpc.v1';
export const BACKGROUND_RPC_CHANNEL = 'background-rpc';

export type BackgroundClientKind = 'content' | 'options' | 'sidepanel' | 'devtools';

export type BackgroundRpcMeta = MessageMeta & {
  channel: typeof BACKGROUND_RPC_CHANNEL;
  client_id: string;
  client_kind?: BackgroundClientKind;
  href?: string;
  tab_id?: number;
  frame_id?: number;
  sender_url?: string;
};

/** Give one panel or extension client a unique reply identity; the RPC owner must dispose subscriptions returned by the adapter. */
export function createBackgroundClientAdapter(
  clientKind: BackgroundClientKind,
  options?: { href?: string },
): Adapter<BackgroundRpcMeta> {
  const clientId = crypto.randomUUID();

  /** Attach the client's channel, identity and surface metadata before forwarding a request to the background. */
  const sendMessage: SendMessage<BackgroundRpcMeta> = async (message) => {
    await browser.runtime.sendMessage({
      ...message,
      meta: {
        ...message.meta,
        channel: BACKGROUND_RPC_CHANNEL,
        client_id: clientId,
        client_kind: clientKind,
        href: options?.href,
      },
    });
  };

  /** Subscribe this client to matching replies and return the exact listener's removal function. */
  const onMessage: OnMessage<BackgroundRpcMeta> = (callback) => {
    /** Accept only replies in this RPC namespace and channel that carry this client's generated identity. */
    const listener = (rawMessage: unknown) => {
      const message = rawMessage as Partial<Message<BackgroundRpcMeta>>;

      if (message.namespace !== BACKGROUND_RPC_NAMESPACE) {
        return;
      }

      if (message.meta?.channel !== BACKGROUND_RPC_CHANNEL) {
        return;
      }

      if (message.meta?.client_id !== clientId) {
        return;
      }

      callback(message);
    };

    browser.runtime.onMessage.addListener(listener);
    return () => browser.runtime.onMessage.removeListener(listener);
  };

  return { sendMessage, onMessage };
}

/** Route background replies to their originating tab or extension surface and attach browser-supplied sender metadata. */
export function createBackgroundServerAdapter(): Adapter<BackgroundRpcMeta> {
  /** Reply to the recorded tab and frame when present; a receiver that disappeared during the request is an expected delivery failure. */
  const sendMessage: SendMessage<BackgroundRpcMeta> = async (message) => {
    const tabId = message.meta.tab_id;
    const frameId = message.meta.frame_id;

    try {
      if (typeof tabId === 'number') {
        await browser.tabs.sendMessage(
          tabId,
          message,
          typeof frameId === 'number' ? { frameId } : undefined,
        );
        return;
      }

      await browser.runtime.sendMessage(message);
    } catch (error) {
      if (!isMissingReceiver(error)) throw error;
    }
  };

  /** Install one background request listener and return its disposer to the RPC server owner. */
  const onMessage: OnMessage<BackgroundRpcMeta> = (callback) => {
    /** Filter the RPC namespace and channel, then replace tab, frame and URL metadata with the browser's sender values. */
    const listener = (rawMessage: unknown, sender: Browser.runtime.MessageSender) => {
      const message = rawMessage as Partial<Message<BackgroundRpcMeta>>;

      if (message.namespace !== BACKGROUND_RPC_NAMESPACE) {
        return;
      }

      if (message.meta?.channel !== BACKGROUND_RPC_CHANNEL) {
        return;
      }

      callback({
        ...message,
        meta: {
          ...message.meta,
          tab_id: sender.tab?.id,
          frame_id: sender.frameId,
          sender_url: sender.url,
        },
      });
    };

    browser.runtime.onMessage.addListener(listener);
    return () => browser.runtime.onMessage.removeListener(listener);
  };

  return { sendMessage, onMessage };
}

/** Return whether an RPC response lost the extension context that requested it. */
function isMissingReceiver(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes('Receiving end does not exist') || message.includes('Could not establish connection');
}
