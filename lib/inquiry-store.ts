"use client";

import { useState, useEffect, useCallback } from "react";
import { type InquiryItem } from "./parts-types";

const STORAGE_KEY = "bk_inquiry_list";

function getStoredItems(): InquiryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setStoredItems(items: InquiryItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("inquiry-update"));
}

export function addToInquiry(item: Omit<InquiryItem, "quantity" | "note" | "addedAt">) {
  const items = getStoredItems();
  if (items.some((i) => i.code === item.code)) return;
  items.push({ ...item, quantity: 1, note: "", addedAt: Date.now() });
  setStoredItems(items);
}

export function removeFromInquiry(code: string) {
  const items = getStoredItems().filter((i) => i.code !== code);
  setStoredItems(items);
}

export function updateInquiryItem(code: string, updates: Partial<Pick<InquiryItem, "quantity" | "note">>) {
  const items = getStoredItems();
  const idx = items.findIndex((i) => i.code === code);
  if (idx >= 0) {
    items[idx] = { ...items[idx], ...updates };
    setStoredItems(items);
  }
}

export function clearInquiry() {
  setStoredItems([]);
}

export function getInquiryList(): InquiryItem[] {
  return getStoredItems();
}

export function isInInquiry(code: string): boolean {
  return getStoredItems().some((i) => i.code === code);
}

export function getInquiryCount(): number {
  return getStoredItems().length;
}

// React hook for reactive inquiry state
export function useInquiry() {
  const [items, setItems] = useState<InquiryItem[]>([]);

  useEffect(() => {
    setItems(getStoredItems());

    const handler = () => setItems(getStoredItems());
    window.addEventListener("inquiry-update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("inquiry-update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const add = useCallback((item: Omit<InquiryItem, "quantity" | "note" | "addedAt">) => {
    addToInquiry(item);
    setItems(getStoredItems());
  }, []);

  const remove = useCallback((code: string) => {
    removeFromInquiry(code);
    setItems(getStoredItems());
  }, []);

  const update = useCallback((code: string, updates: Partial<Pick<InquiryItem, "quantity" | "note">>) => {
    updateInquiryItem(code, updates);
    setItems(getStoredItems());
  }, []);

  const clear = useCallback(() => {
    clearInquiry();
    setItems([]);
  }, []);

  const isAdded = useCallback((code: string) => {
    return items.some((i) => i.code === code);
  }, [items]);

  return { items, add, remove, update, clear, isAdded, count: items.length };
}

// ─── Drawer State Management ───

export function openInquiryDrawer(highlightCode?: string) {
  window.dispatchEvent(new CustomEvent("inquiry-drawer-toggle", { detail: { open: true, highlightCode: highlightCode ?? null } }));
}

export function closeInquiryDrawer() {
  window.dispatchEvent(new CustomEvent("inquiry-drawer-toggle", { detail: { open: false } }));
}

export function useInquiryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightCode, setHighlightCode] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setIsOpen(detail.open);
      if (detail.highlightCode) setHighlightCode(detail.highlightCode);
    };
    window.addEventListener("inquiry-drawer-toggle", handler);
    return () => window.removeEventListener("inquiry-drawer-toggle", handler);
  }, []);

  const open = useCallback((code?: string) => openInquiryDrawer(code), []);
  const close = useCallback(() => closeInquiryDrawer(), []);
  const clearHighlight = useCallback(() => setHighlightCode(null), []);

  return { isOpen, open, close, highlightCode, clearHighlight };
}

// Generate WhatsApp message from inquiry list
export function generateWhatsAppMessage(items: InquiryItem[]): string {
  if (items.length === 0) return "";
  let msg = "Hello, I would like to request a quote for the following Sandvik spare parts:\n\n";
  items.forEach((item, idx) => {
    msg += `${idx + 1}. ${item.codeFormatted} - ${item.name} (${item.model})`;
    if (item.quantity > 1) msg += ` x${item.quantity}`;
    if (item.note) msg += ` [Note: ${item.note}]`;
    msg += "\n";
  });
  msg += "\nPlease advise on price and availability.\nThank you.";
  return msg;
}

// Generate email body from inquiry list
export function generateEmailBody(items: InquiryItem[]): string {
  if (items.length === 0) return "";
  let body = "Hello,%0A%0AI would like to request a quote for the following Sandvik spare parts:%0A%0A";
  items.forEach((item, idx) => {
    body += `${idx + 1}. ${item.codeFormatted} - ${item.name} (${item.model})`;
    if (item.quantity > 1) body += ` x${item.quantity}`;
    if (item.note) body += ` [Note: ${item.note}]`;
    body += "%0A";
  });
  body += "%0APlease advise on price and availability.%0A%0AThank you.";
  return body;
}
