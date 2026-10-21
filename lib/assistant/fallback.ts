import type { Dictionary } from '@/lib/i18n/dictionaries/en';

type Intent = keyof Dictionary['nusa']['fallback'];

// Keyword hints across the site's main languages. Used only when no model is
// configured, so the widget still gives a useful, verified answer.
const intents: Array<[Intent, RegExp]> = [
  ['pricing', /price|cost|moq|minimum|capacity|lead ?time|harga|biaya|kapasitas|价格|価格|가격|سعر|preis|prix|precio|preço|fiyat|цена|कीमत/i],
  ['status', /status|pending|verif|on request|confirm|konfirmasi|状态|ステータス|상태|حالة|statut|estado|durum|статус/i],
  ['inquiry', /inquir|enquir|contact|order|quote|start|reach|kontak|hubungi|pesan|penawaran|询价|联系|問い合わせ|문의|اتصال|kontakt|anfrage|devis|cotiza|contato|iletişim|связ|संपर्क/i],
  ['process', /process|sourcing|how does|step|stage|phase|proses|alur|tahap|流程|プロセス|절차|عملية|prozess|processus|proceso|processo|süreç|процесс|प्रक्रिया/i],
  ['products', /product|patchouli|kratom|source|offer|catalog|produk|nilam|产品|製品|제품|منتج|produkt|produit|producto|produto|ürün|продукт|उत्पाद/i],
];

export function fallbackReply(question: string, dict: Dictionary) {
  const match = intents.find(([, pattern]) => pattern.test(question));
  return dict.nusa.fallback[match ? match[0] : 'default'];
}
