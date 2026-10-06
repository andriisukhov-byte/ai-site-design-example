import * as migration_20260730_004130_initial_schema from './20260730_004130_initial_schema';
import * as migration_20260731_095926_versioned_content_collections from './20260731_095926_versioned_content_collections';

export const migrations = [
  {
    up: migration_20260730_004130_initial_schema.up,
    down: migration_20260730_004130_initial_schema.down,
    name: '20260730_004130_initial_schema',
  },
  {
    up: migration_20260731_095926_versioned_content_collections.up,
    down: migration_20260731_095926_versioned_content_collections.down,
    name: '20260731_095926_versioned_content_collections',
  },
];
