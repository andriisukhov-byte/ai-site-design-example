import type { SourceBlock } from "./source-utils";

export function isUseCaseAcf(acf: Record<string, unknown>): boolean {
  return Boolean(acf.hero_settings || acf.returns_problem_settings || acf.how_it_works_settings);
}

export function useCaseAcfToSourceBlocks(acf: Record<string, unknown>): SourceBlock[] {
  const blocks: SourceBlock[] = [];
  const hero = asRecord(acf.hero_settings);
  const features = asRecord(acf.features_settings);
  const problem = asRecord(acf.returns_problem_settings);
  const howItWorks = asRecord(acf.how_it_works_settings);
  const impact = asRecord(acf.ecommerce_impact_settings);
  const onboarding = asRecord(acf.onboarding_timeline_settings);
  const cta = asRecord(acf.cta_settings);
  const faq = asRecord(acf.faq_settings);

  if (isEnabled(hero)) {
    const visualVariant = cleanSnapshotText(hero.visual_variant);
    const isChatProductAvailability = visualVariant === "chat-product-availability";
    const heroMedia = normalizeSnapshotValue(hero.video) || normalizeSnapshotValue(hero.image);
    const hasVisual = Boolean(heroMedia || isChatProductAvailability);

    blocks.push(sourceBlock("hero", {
      eyebrow: richTextMarkers(hero.top_text),
      title: richTextMarkers(hero.title),
      description: richTextMarkers(hero.subtitle),
      primary_button: {
        title: "Get Started Free",
        url: "https://app.acme.example/signup",
        target: "",
      },
      primary_note: hero.subtext_1,
      secondary_note: hero.subtext_2,
      image: heroMedia,
    }, {
      className: [
        "uc-hero",
        hasVisual ? "uc-hero--has-visual" : "uc-hero--centered",
        isChatProductAvailability && "uc-hero--chat-product-availability",
      ].filter(Boolean).join(" "),
    }));
  }

  if (isEnabled(features)) {
    const items = asArray(features.items);
    const data: Record<string, unknown> = {
      title: highlightedTitle(features.title, 2),
      background: "white",
      columns: items.length >= 4 ? "4" : "3",
      cards: items.length,
    };

    items.forEach((item, index) => {
      const record = asRecord(item);
      data[`cards_${index}_title`] = cleanSnapshotText(record.title);
      data[`cards_${index}_custom_icon`] = normalizeSnapshotValue(record.icon);
    });

    blocks.push(sourceBlock("feature-grid", data, { className: "uc-features" }));
  }

  if (isEnabled(problem)) {
    const items = asArray(problem.items);
    const data: Record<string, unknown> = {
      title: highlightedTitle(problem.title, 1),
      background: "gray",
      columns: items.length >= 4 ? "4" : "3",
      cards: items.length,
    };

    items.forEach((item, index) => {
      const record = asRecord(item);
      data[`cards_${index}_title`] = cleanSnapshotText(record.subtitle);
      data[`cards_${index}_description`] = cleanSnapshotText(record.text);
      data[`cards_${index}_custom_icon`] = normalizeSnapshotValue(record.icon);
    });

    blocks.push(sourceBlock("feature-grid", data, { className: "uc-problem" }));
  }

  if (isEnabled(howItWorks)) {
    const steps = asArray(howItWorks.info_blocks);
    const data: Record<string, unknown> = {
      title: highlightedTitle(howItWorks.title, 1),
      background: "white",
      media_side: "left",
      image: normalizeSnapshotValue(howItWorks.image),
      bullets: steps.length,
    };

    steps.forEach((step, index) => {
      const record = asRecord(step);
      data[`bullets_${index}_title`] = cleanSnapshotText(record.title);
      data[`bullets_${index}_description`] = cleanSnapshotText(record.text);
    });

    blocks.push(sourceBlock("side-by-side", data, { className: "uc-hiw" }));
  }

  if (isEnabled(impact)) {
    const columns = asArray(impact.table);
    const rowCount = Math.max(...columns.map((column) => asArray(asRecord(column).items).length), 0);
    const data: Record<string, unknown> = {
      title: highlightedTitle(impact.title, 3),
      background: "gray",
      variant: "comparison",
      headers: columns.length,
      rows: rowCount,
    };

    columns.forEach((column, columnIndex) => {
      const record = asRecord(column);
      data[`headers_${columnIndex}_text`] = cleanSnapshotText(record.title);
    });

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      data[`rows_${rowIndex}_cells`] = columns.length;

      columns.forEach((column, columnIndex) => {
        const cell = asRecord(asArray(asRecord(column).items)[rowIndex]);
        data[`rows_${rowIndex}_cells_${columnIndex}_text`] = cleanSnapshotText(cell.item);
      });
    }

    blocks.push(sourceBlock("pricing-details", data, { className: "uc-impact" }));
  }

  if (isEnabled(onboarding)) {
    const steps = asArray(onboarding.steps);
    const data: Record<string, unknown> = {
      title: highlightedTitle(onboarding.title, 1),
      background: "white",
      hide_subtitle: true,
      show_step_numbers: false,
      steps: steps.length,
    };

    steps.forEach((step, index) => {
      const record = asRecord(step);
      data[`steps_${index}_label`] = cleanSnapshotText(record.title) || `Step ${index + 1}`;
      data[`steps_${index}_description`] = cleanSnapshotText(record.text);
    });

    blocks.push(sourceBlock("how-it-works", data, { className: "uc-onboarding" }));
  }

  if (isEnabled(cta)) {
    blocks.push(sourceBlock("cta", {
      title: richTextMarkers(cta.title),
      description: richTextMarkers(cta.text),
      secondary_button: normalizeSnapshotLink(cta.link),
    }));
  }

  blocks.push(sourceBlock("news-insights", {
    title: "AI Industry {{ News }} and {{ Insights }}",
    posts_count: "3",
  }));

  if (isEnabled(faq)) {
    const items = asArray(faq.list);
    const data: Record<string, unknown> = {
      title: richTextMarkers(faq.title),
      manual_items: items.length,
    };

    items.forEach((item, index) => {
      const record = asRecord(item);
      data[`manual_items_${index}_question`] = cleanSnapshotText(record.question);
      data[`manual_items_${index}_answer`] = cleanSnapshotText(record.answer);
    });

    blocks.push(sourceBlock("faq", data));
  }

  return blocks.filter((block) => Object.keys(block.data).length > 0);
}

function sourceBlock(name: string, data: Record<string, unknown>, root?: SourceBlock["root"]): SourceBlock {
  return {
    name,
    sourceName: `acme/${name}`,
    root,
    data: sanitizeSnapshotRecord(data),
  };
}

function sanitizeSnapshotRecord(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(data)
      .map(([key, value]) => [key, normalizeSnapshotValue(value)] as const)
      .filter(([, value]) => value !== undefined && value !== "" && value !== null),
  );
}

function normalizeSnapshotValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeSnapshotValue).filter((item) => item !== undefined && item !== "");
  }

  if (value && typeof value === "object") {
    return sanitizeSnapshotRecord(value as Record<string, unknown>);
  }

  if (typeof value === "string") {
    return cleanSnapshotText(value);
  }

  return value ?? undefined;
}

function normalizeSnapshotLink(value: unknown): unknown {
  const link = asRecord(value);
  const title = cleanSnapshotText(link.title);
  const url = cleanSnapshotText(link.url);

  if (!title || !url || url === "#") {
    return {
      title: "Get Started Free",
      url: "https://app.acme.example/signup",
      target: "",
    };
  }

  return {
    title,
    url: normalizeSnapshotUrl(url),
    target: cleanSnapshotText(link.target),
  };
}

function normalizeSnapshotUrl(url: string): string {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "app.dev.acme.example") {
      parsed.hostname = "app.acme.example";
      return parsed.toString();
    }
  } catch {
    return url;
  }

  return url;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function isEnabled(section: Record<string, unknown>): boolean {
  return section.show_section === true || section.show_section === 1 || section.show_section === "1";
}

function richTextMarkers(value: unknown): string {
  return cleanSnapshotText(value).replace(/<span>(.*?)<\/span>/gi, "{{ $1 }}");
}

function highlightedTitle(value: unknown, highlightedWordCount: number): string {
  const title = richTextMarkers(value);

  if (!title || title.includes("{{")) {
    return title;
  }

  const words = title.split(/\s+/);
  const splitAt = Math.max(0, words.length - highlightedWordCount);
  const prefix = words.slice(0, splitAt).join(" ");
  const highlight = words.slice(splitAt).join(" ");

  return prefix ? `${prefix} {{ ${highlight} }}` : `{{ ${highlight} }}`;
}

function cleanSnapshotText(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") {
    return "";
  }

  return repairMojibake(String(value))
    .replace(/\r\n/g, "\n")
    .replace(/\0/g, "")
    .trim();
}

function repairMojibake(value: string): string {
  return value
    .replace(/â€”/g, "—")
    .replace(/â€“/g, "–")
    .replace(/â€˜/g, "‘")
    .replace(/â€™/g, "’")
    .replace(/â€œ/g, "“")
    .replace(/â€�/g, "”")
    .replace(/â€¦/g, "…")
    .replace(/Â·/g, "·")
    .replace(/Â /g, " ")
    .replace(/Â/g, "");
}
