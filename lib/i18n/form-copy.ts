import type { Dictionary } from '@/lib/i18n/dictionaries/en';
import { getProducts } from '@/lib/products';

/** The slice of the dictionary the inquiry form needs on the client. */
export function inquiryFormCopy(dict: Dictionary) {
  return {
    ...dict.form,
    productOptions: getProducts(dict).map((product) => ({
      // English names are submitted so the inbox reads the same in every language.
      value: product.name,
      label: product.displayName,
    })),
  };
}

export type InquiryFormCopy = ReturnType<typeof inquiryFormCopy>;
