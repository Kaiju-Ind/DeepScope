import type { Adapter, Message, MessageMeta, OnMessage, SendMessage } from 'comctx';
import { browser, type Browser } from 'wxt/browser';

export const BACKGROUND_RPC_NAMESPACE = 'kaiju-site-scope.background-rpc.v1';
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

export function createBackgroundClientAdapter(
  clientKind: BackgroundClientKind,
  options?: { href?: string },
): Adapter<BackgroundRpcMeta> {
  const clientId = crypto.randomUUID();

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

  const onMessage: OnMessage<BackgroundRpcMeta> = (callback) => {
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

export function createBackgroundServerAdapter(): Adapter<BackgroundRpcMeta> {
  const sendMessage: SendMessage<BackgroundRpcMeta> = async (message) => {
    const tabId = message.meta.tab_id;
    const frameId = message.meta.frame_id;

    if (typeof tabId === 'number') {
      await browser.tabs.sendMessage(
        tabId,
        message,
        typeof frameId === 'number' ? { frameId } : undefined,
      );
      return;
    }

    await browser.runtime.sendMessage(message);
  };

  const onMessage: OnMessage<BackgroundRpcMeta> = (callback) => {
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