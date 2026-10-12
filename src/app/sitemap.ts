import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { posts } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = [
    ["", 1],
    ["/produits", 0.9],
    ["/categories", 0.8],
    ["/promotions", 0.8],
    ["/devis", 0.8],
    ["/installation-sav", 0.7],
    ["/magasins", 0.7],
    ["/contact", 0.7],
    ["/marques", 0.6],
    ["/a-propos", 0.6],
    ["/blog", 0.6],
    ["/faq", 0.6],
    ["/telechargements", 0.5],
    ["/comparateur", 0.3],
    ["/politique-de-livraison", 0.3],
    ["/politique-de-confidentialite", 0.2],
    ["/conditions-generales", 0.2],
    ["/mentions-legales", 0.2],
  ] as const;
  return [
    ...statics.map(([path, priority]) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency: "weekly" as const, priority })),
    ...categories.map((c) => ({ url: `${site.url}/categories/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((p) => ({ url: `${site.url}/produits/${p.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7, images: [`${site.url}${p.image}`] })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
