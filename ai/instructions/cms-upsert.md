# CMS Upsert

Generated content is pushed with one reusable command:

```sh
npm run cms:upsert -- --file path/to/page.json --target dev
```

Do not create page-specific scripts. The input JSON must be product-native and pass schema validation before any CMS write.
