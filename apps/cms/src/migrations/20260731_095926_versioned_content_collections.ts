import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum__pages_v_blocks_hero_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_extended_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_extended_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_extended_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_extended_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_extended_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_side_by_side_media_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_side_by_side_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_side_by_side_background" AS ENUM('white', 'gray', 'transparent', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_side_by_side_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_side_by_side_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_story_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_media_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_agent_capabilities_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_agent_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_agent_capabilities_content_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_agent_solutions_items_icon" AS ENUM('headset', 'connections', 'goal', 'cog', 'tag', 'phone-call', 'messages-square', 'shopping-cart');
  CREATE TYPE "public"."enum__pages_v_blocks_agent_solutions_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_us_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_concierge_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_concierge_flow_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_enterprise_upgrade_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_channels_grid_cards_icon" AS ENUM('sms', 'whatsapp', 'voice', 'chat', 'mail', 'monitor', 'network', 'clock', 'webhook');
  CREATE TYPE "public"."enum__pages_v_blocks_channels_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_stack_cards_icon" AS ENUM('network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_stack_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_coverage_grid_cards_icon" AS ENUM('flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory');
  CREATE TYPE "public"."enum__pages_v_blocks_coverage_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_rows_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_rows_variant" AS ENUM('capabilities', 'builder');
  CREATE TYPE "public"."enum__pages_v_blocks_capability_trio_cards_icon" AS ENUM('messages-square', 'orbit', 'brain-circuit');
  CREATE TYPE "public"."enum__pages_v_blocks_capability_trio_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_capability_tools_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_use_cases_grid_cards_icon" AS ENUM('shopping-cart', 'building', 'cloud-cog', 'megaphone', 'heart-handshake', 'hammer', 'shield-check', 'scroll-text', 'briefcase', 'headset', 'graduation-cap', 'truck', 'calendar-check', 'clock', 'filter', 'refresh-ccw', 'list-checks', 'file-plus', 'messages-square');
  CREATE TYPE "public"."enum__pages_v_blocks_use_cases_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_security_cards_icon" AS ENUM('database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search');
  CREATE TYPE "public"."enum__pages_v_blocks_security_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_functional_capabilities_cards_icon" AS ENUM('award', 'bell', 'calendar-check-2', 'calendar-days', 'calendar-range', 'clipboard-check', 'clock', 'database', 'file-check-2', 'file-text', 'filter', 'handshake', 'inbox', 'message-square', 'phone-incoming', 'receipt', 'repeat-2', 'send', 'shield-check', 'sliders-horizontal', 'star', 'triangle-alert', 'audio-lines', 'messages-square', 'smartphone', 'users', 'mail', 'info');
  CREATE TYPE "public"."enum__pages_v_blocks_functional_capabilities_cards_width" AS ENUM('default', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_functional_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_functional_capabilities_preset" AS ENUM('sales', 'service', 'recruiting', 'channels');
  CREATE TYPE "public"."enum__pages_v_blocks_how_it_works_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_how_it_works_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_metrics_background" AS ENUM('white', 'muted', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_results_stats_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_results_stats_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_capability_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_live_in_days_items_icon" AS ENUM('code-xml', 'layout-grid', 'bot-message-square', 'user-round-check');
  CREATE TYPE "public"."enum__pages_v_blocks_live_in_days_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_news_insights_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum__pages_v_blocks_news_insights_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_news_insights_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_content_feed_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum__pages_v_blocks_content_feed_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_content_feed_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_cards_cards_accent" AS ENUM('gradient', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_cards_cards_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_details_sections_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_details_sections_variant" AS ENUM('default', 'comparison');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_details_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_difference_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_difference_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_pain_points_comparison_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_pain_points_comparison_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_policy_callouts_icon" AS ENUM('wallet', 'infinity', 'headset', 'info');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_policy_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_industry_expertise_items_icon" AS ENUM('shopping_cart', 'headset', 'cloud_cog', 'hammer', 'heart_handshake', 'hotel', 'brain', 'layers', 'wand', 'globe', 'users', 'workflow');
  CREATE TYPE "public"."enum__pages_v_blocks_industry_expertise_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_industry_expertise_visual_type" AS ENUM('industry', 'platform', 'capabilities');
  CREATE TYPE "public"."enum__pages_v_blocks_industry_expertise_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_integrations_banner_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_anchor_nav_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_comparison_grid_cards_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_comparison_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_blocks_use_case_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_template" AS ENUM('standard', 'landing', 'document');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_extended_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_extended_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_extended_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_extended_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_extended_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_rich_text_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_side_by_side_media_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__posts_v_blocks_side_by_side_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__posts_v_blocks_side_by_side_background" AS ENUM('white', 'gray', 'transparent', 'muted', 'dark');
  CREATE TYPE "public"."enum__posts_v_blocks_side_by_side_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_side_by_side_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_story_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_media_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_feature_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_agent_capabilities_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_agent_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_agent_capabilities_content_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__posts_v_blocks_agent_solutions_items_icon" AS ENUM('headset', 'connections', 'goal', 'cog', 'tag', 'phone-call', 'messages-square', 'shopping-cart');
  CREATE TYPE "public"."enum__posts_v_blocks_agent_solutions_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_contact_us_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_concierge_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_concierge_flow_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_enterprise_upgrade_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_channels_grid_cards_icon" AS ENUM('sms', 'whatsapp', 'voice', 'chat', 'mail', 'monitor', 'network', 'clock', 'webhook');
  CREATE TYPE "public"."enum__posts_v_blocks_channels_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_feature_stack_cards_icon" AS ENUM('network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap');
  CREATE TYPE "public"."enum__posts_v_blocks_feature_stack_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_coverage_grid_cards_icon" AS ENUM('flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory');
  CREATE TYPE "public"."enum__posts_v_blocks_coverage_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_feature_rows_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_feature_rows_variant" AS ENUM('capabilities', 'builder');
  CREATE TYPE "public"."enum__posts_v_blocks_capability_trio_cards_icon" AS ENUM('messages-square', 'orbit', 'brain-circuit');
  CREATE TYPE "public"."enum__posts_v_blocks_capability_trio_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_capability_tools_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_use_cases_grid_cards_icon" AS ENUM('shopping-cart', 'building', 'cloud-cog', 'megaphone', 'heart-handshake', 'hammer', 'shield-check', 'scroll-text', 'briefcase', 'headset', 'graduation-cap', 'truck', 'calendar-check', 'clock', 'filter', 'refresh-ccw', 'list-checks', 'file-plus', 'messages-square');
  CREATE TYPE "public"."enum__posts_v_blocks_use_cases_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_security_cards_icon" AS ENUM('database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search');
  CREATE TYPE "public"."enum__posts_v_blocks_security_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_functional_capabilities_cards_icon" AS ENUM('award', 'bell', 'calendar-check-2', 'calendar-days', 'calendar-range', 'clipboard-check', 'clock', 'database', 'file-check-2', 'file-text', 'filter', 'handshake', 'inbox', 'message-square', 'phone-incoming', 'receipt', 'repeat-2', 'send', 'shield-check', 'sliders-horizontal', 'star', 'triangle-alert', 'audio-lines', 'messages-square', 'smartphone', 'users', 'mail', 'info');
  CREATE TYPE "public"."enum__posts_v_blocks_functional_capabilities_cards_width" AS ENUM('default', 'wide');
  CREATE TYPE "public"."enum__posts_v_blocks_functional_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_functional_capabilities_preset" AS ENUM('sales', 'service', 'recruiting', 'channels');
  CREATE TYPE "public"."enum__posts_v_blocks_how_it_works_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_how_it_works_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_metrics_background" AS ENUM('white', 'muted', 'dark');
  CREATE TYPE "public"."enum__posts_v_blocks_results_stats_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_results_stats_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_stats_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_capability_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_live_in_days_items_icon" AS ENUM('code-xml', 'layout-grid', 'bot-message-square', 'user-round-check');
  CREATE TYPE "public"."enum__posts_v_blocks_live_in_days_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_faq_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_news_insights_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum__posts_v_blocks_news_insights_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_news_insights_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__posts_v_blocks_content_feed_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum__posts_v_blocks_content_feed_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_content_feed_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__posts_v_blocks_pricing_cards_cards_accent" AS ENUM('gradient', 'dark');
  CREATE TYPE "public"."enum__posts_v_blocks_pricing_cards_cards_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_pricing_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_pricing_details_sections_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_pricing_details_sections_variant" AS ENUM('default', 'comparison');
  CREATE TYPE "public"."enum__posts_v_blocks_pricing_details_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_difference_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_difference_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_pain_points_comparison_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_pain_points_comparison_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_pricing_policy_callouts_icon" AS ENUM('wallet', 'infinity', 'headset', 'info');
  CREATE TYPE "public"."enum__posts_v_blocks_pricing_policy_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_industry_expertise_items_icon" AS ENUM('shopping_cart', 'headset', 'cloud_cog', 'hammer', 'heart_handshake', 'hotel', 'brain', 'layers', 'wand', 'globe', 'users', 'workflow');
  CREATE TYPE "public"."enum__posts_v_blocks_industry_expertise_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_industry_expertise_visual_type" AS ENUM('industry', 'platform', 'capabilities');
  CREATE TYPE "public"."enum__posts_v_blocks_industry_expertise_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_logo_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_integrations_banner_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_logo_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_tabs_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_anchor_nav_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_testimonials_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_comparison_grid_cards_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__posts_v_blocks_comparison_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_use_case_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_template" AS ENUM('article', 'guide');
  CREATE TYPE "public"."enum__news_v_blocks_hero_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_hero_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum__news_v_blocks_hero_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_hero_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_hero_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum__news_v_blocks_hero_extended_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_hero_extended_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum__news_v_blocks_hero_extended_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum__news_v_blocks_hero_extended_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_hero_extended_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_rich_text_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_side_by_side_media_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__news_v_blocks_side_by_side_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__news_v_blocks_side_by_side_background" AS ENUM('white', 'gray', 'transparent', 'muted', 'dark');
  CREATE TYPE "public"."enum__news_v_blocks_side_by_side_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_side_by_side_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_story_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_media_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_feature_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_agent_capabilities_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_agent_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_agent_capabilities_content_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__news_v_blocks_agent_solutions_items_icon" AS ENUM('headset', 'connections', 'goal', 'cog', 'tag', 'phone-call', 'messages-square', 'shopping-cart');
  CREATE TYPE "public"."enum__news_v_blocks_agent_solutions_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_contact_us_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_concierge_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_concierge_flow_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_enterprise_upgrade_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_channels_grid_cards_icon" AS ENUM('sms', 'whatsapp', 'voice', 'chat', 'mail', 'monitor', 'network', 'clock', 'webhook');
  CREATE TYPE "public"."enum__news_v_blocks_channels_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_feature_stack_cards_icon" AS ENUM('network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap');
  CREATE TYPE "public"."enum__news_v_blocks_feature_stack_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_coverage_grid_cards_icon" AS ENUM('flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory');
  CREATE TYPE "public"."enum__news_v_blocks_coverage_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_feature_rows_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_feature_rows_variant" AS ENUM('capabilities', 'builder');
  CREATE TYPE "public"."enum__news_v_blocks_capability_trio_cards_icon" AS ENUM('messages-square', 'orbit', 'brain-circuit');
  CREATE TYPE "public"."enum__news_v_blocks_capability_trio_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_capability_tools_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_use_cases_grid_cards_icon" AS ENUM('shopping-cart', 'building', 'cloud-cog', 'megaphone', 'heart-handshake', 'hammer', 'shield-check', 'scroll-text', 'briefcase', 'headset', 'graduation-cap', 'truck', 'calendar-check', 'clock', 'filter', 'refresh-ccw', 'list-checks', 'file-plus', 'messages-square');
  CREATE TYPE "public"."enum__news_v_blocks_use_cases_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_security_cards_icon" AS ENUM('database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search');
  CREATE TYPE "public"."enum__news_v_blocks_security_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_functional_capabilities_cards_icon" AS ENUM('award', 'bell', 'calendar-check-2', 'calendar-days', 'calendar-range', 'clipboard-check', 'clock', 'database', 'file-check-2', 'file-text', 'filter', 'handshake', 'inbox', 'message-square', 'phone-incoming', 'receipt', 'repeat-2', 'send', 'shield-check', 'sliders-horizontal', 'star', 'triangle-alert', 'audio-lines', 'messages-square', 'smartphone', 'users', 'mail', 'info');
  CREATE TYPE "public"."enum__news_v_blocks_functional_capabilities_cards_width" AS ENUM('default', 'wide');
  CREATE TYPE "public"."enum__news_v_blocks_functional_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_functional_capabilities_preset" AS ENUM('sales', 'service', 'recruiting', 'channels');
  CREATE TYPE "public"."enum__news_v_blocks_how_it_works_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_how_it_works_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_cta_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_cta_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_cta_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_metrics_background" AS ENUM('white', 'muted', 'dark');
  CREATE TYPE "public"."enum__news_v_blocks_results_stats_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_results_stats_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_stats_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_capability_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_live_in_days_items_icon" AS ENUM('code-xml', 'layout-grid', 'bot-message-square', 'user-round-check');
  CREATE TYPE "public"."enum__news_v_blocks_live_in_days_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_faq_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_news_insights_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum__news_v_blocks_news_insights_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_news_insights_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__news_v_blocks_content_feed_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum__news_v_blocks_content_feed_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_content_feed_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__news_v_blocks_pricing_cards_cards_accent" AS ENUM('gradient', 'dark');
  CREATE TYPE "public"."enum__news_v_blocks_pricing_cards_cards_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_pricing_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_pricing_details_sections_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_pricing_details_sections_variant" AS ENUM('default', 'comparison');
  CREATE TYPE "public"."enum__news_v_blocks_pricing_details_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_difference_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_difference_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_pain_points_comparison_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_pain_points_comparison_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_pricing_policy_callouts_icon" AS ENUM('wallet', 'infinity', 'headset', 'info');
  CREATE TYPE "public"."enum__news_v_blocks_pricing_policy_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_industry_expertise_items_icon" AS ENUM('shopping_cart', 'headset', 'cloud_cog', 'hammer', 'heart_handshake', 'hotel', 'brain', 'layers', 'wand', 'globe', 'users', 'workflow');
  CREATE TYPE "public"."enum__news_v_blocks_industry_expertise_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_industry_expertise_visual_type" AS ENUM('industry', 'platform', 'capabilities');
  CREATE TYPE "public"."enum__news_v_blocks_industry_expertise_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_logo_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_integrations_banner_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_logo_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_tabs_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_anchor_nav_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_testimonials_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_comparison_grid_cards_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__news_v_blocks_comparison_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_blocks_use_case_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_template" AS ENUM('news', 'article');
  CREATE TYPE "public"."enum__guides_v_blocks_hero_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_hero_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum__guides_v_blocks_hero_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_hero_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_hero_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum__guides_v_blocks_hero_extended_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_hero_extended_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum__guides_v_blocks_hero_extended_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum__guides_v_blocks_hero_extended_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_hero_extended_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_rich_text_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_side_by_side_media_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__guides_v_blocks_side_by_side_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__guides_v_blocks_side_by_side_background" AS ENUM('white', 'gray', 'transparent', 'muted', 'dark');
  CREATE TYPE "public"."enum__guides_v_blocks_side_by_side_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_side_by_side_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_story_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_media_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_feature_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_agent_capabilities_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_agent_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_agent_capabilities_content_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__guides_v_blocks_agent_solutions_items_icon" AS ENUM('headset', 'connections', 'goal', 'cog', 'tag', 'phone-call', 'messages-square', 'shopping-cart');
  CREATE TYPE "public"."enum__guides_v_blocks_agent_solutions_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_contact_us_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_concierge_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_concierge_flow_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_enterprise_upgrade_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_channels_grid_cards_icon" AS ENUM('sms', 'whatsapp', 'voice', 'chat', 'mail', 'monitor', 'network', 'clock', 'webhook');
  CREATE TYPE "public"."enum__guides_v_blocks_channels_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_feature_stack_cards_icon" AS ENUM('network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap');
  CREATE TYPE "public"."enum__guides_v_blocks_feature_stack_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_coverage_grid_cards_icon" AS ENUM('flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory');
  CREATE TYPE "public"."enum__guides_v_blocks_coverage_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_feature_rows_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_feature_rows_variant" AS ENUM('capabilities', 'builder');
  CREATE TYPE "public"."enum__guides_v_blocks_capability_trio_cards_icon" AS ENUM('messages-square', 'orbit', 'brain-circuit');
  CREATE TYPE "public"."enum__guides_v_blocks_capability_trio_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_capability_tools_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_use_cases_grid_cards_icon" AS ENUM('shopping-cart', 'building', 'cloud-cog', 'megaphone', 'heart-handshake', 'hammer', 'shield-check', 'scroll-text', 'briefcase', 'headset', 'graduation-cap', 'truck', 'calendar-check', 'clock', 'filter', 'refresh-ccw', 'list-checks', 'file-plus', 'messages-square');
  CREATE TYPE "public"."enum__guides_v_blocks_use_cases_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_security_cards_icon" AS ENUM('database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search');
  CREATE TYPE "public"."enum__guides_v_blocks_security_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_functional_capabilities_cards_icon" AS ENUM('award', 'bell', 'calendar-check-2', 'calendar-days', 'calendar-range', 'clipboard-check', 'clock', 'database', 'file-check-2', 'file-text', 'filter', 'handshake', 'inbox', 'message-square', 'phone-incoming', 'receipt', 'repeat-2', 'send', 'shield-check', 'sliders-horizontal', 'star', 'triangle-alert', 'audio-lines', 'messages-square', 'smartphone', 'users', 'mail', 'info');
  CREATE TYPE "public"."enum__guides_v_blocks_functional_capabilities_cards_width" AS ENUM('default', 'wide');
  CREATE TYPE "public"."enum__guides_v_blocks_functional_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_functional_capabilities_preset" AS ENUM('sales', 'service', 'recruiting', 'channels');
  CREATE TYPE "public"."enum__guides_v_blocks_how_it_works_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_how_it_works_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_cta_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_cta_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_cta_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_metrics_background" AS ENUM('white', 'muted', 'dark');
  CREATE TYPE "public"."enum__guides_v_blocks_results_stats_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_results_stats_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_stats_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_capability_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_live_in_days_items_icon" AS ENUM('code-xml', 'layout-grid', 'bot-message-square', 'user-round-check');
  CREATE TYPE "public"."enum__guides_v_blocks_live_in_days_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_faq_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_news_insights_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum__guides_v_blocks_news_insights_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_news_insights_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__guides_v_blocks_content_feed_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum__guides_v_blocks_content_feed_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_content_feed_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__guides_v_blocks_pricing_cards_cards_accent" AS ENUM('gradient', 'dark');
  CREATE TYPE "public"."enum__guides_v_blocks_pricing_cards_cards_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_pricing_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_pricing_details_sections_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_pricing_details_sections_variant" AS ENUM('default', 'comparison');
  CREATE TYPE "public"."enum__guides_v_blocks_pricing_details_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_difference_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_difference_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_pain_points_comparison_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_pain_points_comparison_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_pricing_policy_callouts_icon" AS ENUM('wallet', 'infinity', 'headset', 'info');
  CREATE TYPE "public"."enum__guides_v_blocks_pricing_policy_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_industry_expertise_items_icon" AS ENUM('shopping_cart', 'headset', 'cloud_cog', 'hammer', 'heart_handshake', 'hotel', 'brain', 'layers', 'wand', 'globe', 'users', 'workflow');
  CREATE TYPE "public"."enum__guides_v_blocks_industry_expertise_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_industry_expertise_visual_type" AS ENUM('industry', 'platform', 'capabilities');
  CREATE TYPE "public"."enum__guides_v_blocks_industry_expertise_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_logo_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_integrations_banner_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_logo_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_tabs_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_anchor_nav_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_testimonials_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_comparison_grid_cards_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__guides_v_blocks_comparison_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_blocks_use_case_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__guides_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__guides_v_version_template" AS ENUM('guide', 'article');
  CREATE TYPE "public"."enum__tips_v_blocks_hero_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_hero_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum__tips_v_blocks_hero_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_hero_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_hero_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum__tips_v_blocks_hero_extended_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_hero_extended_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum__tips_v_blocks_hero_extended_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum__tips_v_blocks_hero_extended_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_hero_extended_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_rich_text_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_side_by_side_media_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__tips_v_blocks_side_by_side_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__tips_v_blocks_side_by_side_background" AS ENUM('white', 'gray', 'transparent', 'muted', 'dark');
  CREATE TYPE "public"."enum__tips_v_blocks_side_by_side_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_side_by_side_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_story_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_media_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_feature_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_agent_capabilities_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_agent_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_agent_capabilities_content_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__tips_v_blocks_agent_solutions_items_icon" AS ENUM('headset', 'connections', 'goal', 'cog', 'tag', 'phone-call', 'messages-square', 'shopping-cart');
  CREATE TYPE "public"."enum__tips_v_blocks_agent_solutions_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_contact_us_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_concierge_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_concierge_flow_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_enterprise_upgrade_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_channels_grid_cards_icon" AS ENUM('sms', 'whatsapp', 'voice', 'chat', 'mail', 'monitor', 'network', 'clock', 'webhook');
  CREATE TYPE "public"."enum__tips_v_blocks_channels_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_feature_stack_cards_icon" AS ENUM('network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap');
  CREATE TYPE "public"."enum__tips_v_blocks_feature_stack_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_coverage_grid_cards_icon" AS ENUM('flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory');
  CREATE TYPE "public"."enum__tips_v_blocks_coverage_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_feature_rows_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_feature_rows_variant" AS ENUM('capabilities', 'builder');
  CREATE TYPE "public"."enum__tips_v_blocks_capability_trio_cards_icon" AS ENUM('messages-square', 'orbit', 'brain-circuit');
  CREATE TYPE "public"."enum__tips_v_blocks_capability_trio_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_capability_tools_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_use_cases_grid_cards_icon" AS ENUM('shopping-cart', 'building', 'cloud-cog', 'megaphone', 'heart-handshake', 'hammer', 'shield-check', 'scroll-text', 'briefcase', 'headset', 'graduation-cap', 'truck', 'calendar-check', 'clock', 'filter', 'refresh-ccw', 'list-checks', 'file-plus', 'messages-square');
  CREATE TYPE "public"."enum__tips_v_blocks_use_cases_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_security_cards_icon" AS ENUM('database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search');
  CREATE TYPE "public"."enum__tips_v_blocks_security_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_functional_capabilities_cards_icon" AS ENUM('award', 'bell', 'calendar-check-2', 'calendar-days', 'calendar-range', 'clipboard-check', 'clock', 'database', 'file-check-2', 'file-text', 'filter', 'handshake', 'inbox', 'message-square', 'phone-incoming', 'receipt', 'repeat-2', 'send', 'shield-check', 'sliders-horizontal', 'star', 'triangle-alert', 'audio-lines', 'messages-square', 'smartphone', 'users', 'mail', 'info');
  CREATE TYPE "public"."enum__tips_v_blocks_functional_capabilities_cards_width" AS ENUM('default', 'wide');
  CREATE TYPE "public"."enum__tips_v_blocks_functional_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_functional_capabilities_preset" AS ENUM('sales', 'service', 'recruiting', 'channels');
  CREATE TYPE "public"."enum__tips_v_blocks_how_it_works_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_how_it_works_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_cta_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_cta_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_cta_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_metrics_background" AS ENUM('white', 'muted', 'dark');
  CREATE TYPE "public"."enum__tips_v_blocks_results_stats_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_results_stats_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_stats_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_capability_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_live_in_days_items_icon" AS ENUM('code-xml', 'layout-grid', 'bot-message-square', 'user-round-check');
  CREATE TYPE "public"."enum__tips_v_blocks_live_in_days_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_faq_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_news_insights_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum__tips_v_blocks_news_insights_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_news_insights_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__tips_v_blocks_content_feed_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum__tips_v_blocks_content_feed_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_content_feed_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__tips_v_blocks_pricing_cards_cards_accent" AS ENUM('gradient', 'dark');
  CREATE TYPE "public"."enum__tips_v_blocks_pricing_cards_cards_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_pricing_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_pricing_details_sections_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_pricing_details_sections_variant" AS ENUM('default', 'comparison');
  CREATE TYPE "public"."enum__tips_v_blocks_pricing_details_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_difference_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_difference_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_pain_points_comparison_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_pain_points_comparison_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_pricing_policy_callouts_icon" AS ENUM('wallet', 'infinity', 'headset', 'info');
  CREATE TYPE "public"."enum__tips_v_blocks_pricing_policy_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_industry_expertise_items_icon" AS ENUM('shopping_cart', 'headset', 'cloud_cog', 'hammer', 'heart_handshake', 'hotel', 'brain', 'layers', 'wand', 'globe', 'users', 'workflow');
  CREATE TYPE "public"."enum__tips_v_blocks_industry_expertise_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_industry_expertise_visual_type" AS ENUM('industry', 'platform', 'capabilities');
  CREATE TYPE "public"."enum__tips_v_blocks_industry_expertise_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_logo_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_integrations_banner_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_logo_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_tabs_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_anchor_nav_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_testimonials_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_comparison_grid_cards_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__tips_v_blocks_comparison_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_blocks_use_case_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__tips_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tips_v_version_template" AS ENUM('tip', 'article');
  CREATE TYPE "public"."enum__use_cases_v_blocks_hero_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_hero_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum__use_cases_v_blocks_hero_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_hero_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_hero_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum__use_cases_v_blocks_hero_extended_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_hero_extended_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum__use_cases_v_blocks_hero_extended_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum__use_cases_v_blocks_hero_extended_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_hero_extended_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_rich_text_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_side_by_side_media_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__use_cases_v_blocks_side_by_side_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__use_cases_v_blocks_side_by_side_background" AS ENUM('white', 'gray', 'transparent', 'muted', 'dark');
  CREATE TYPE "public"."enum__use_cases_v_blocks_side_by_side_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_side_by_side_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_story_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_media_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_feature_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_agent_capabilities_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_agent_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_agent_capabilities_content_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__use_cases_v_blocks_agent_solutions_items_icon" AS ENUM('headset', 'connections', 'goal', 'cog', 'tag', 'phone-call', 'messages-square', 'shopping-cart');
  CREATE TYPE "public"."enum__use_cases_v_blocks_agent_solutions_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_contact_us_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_concierge_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_concierge_flow_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_enterprise_upgrade_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_channels_grid_cards_icon" AS ENUM('sms', 'whatsapp', 'voice', 'chat', 'mail', 'monitor', 'network', 'clock', 'webhook');
  CREATE TYPE "public"."enum__use_cases_v_blocks_channels_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_feature_stack_cards_icon" AS ENUM('network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap');
  CREATE TYPE "public"."enum__use_cases_v_blocks_feature_stack_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_coverage_grid_cards_icon" AS ENUM('flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory');
  CREATE TYPE "public"."enum__use_cases_v_blocks_coverage_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_feature_rows_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_feature_rows_variant" AS ENUM('capabilities', 'builder');
  CREATE TYPE "public"."enum__use_cases_v_blocks_capability_trio_cards_icon" AS ENUM('messages-square', 'orbit', 'brain-circuit');
  CREATE TYPE "public"."enum__use_cases_v_blocks_capability_trio_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_capability_tools_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_use_cases_grid_cards_icon" AS ENUM('shopping-cart', 'building', 'cloud-cog', 'megaphone', 'heart-handshake', 'hammer', 'shield-check', 'scroll-text', 'briefcase', 'headset', 'graduation-cap', 'truck', 'calendar-check', 'clock', 'filter', 'refresh-ccw', 'list-checks', 'file-plus', 'messages-square');
  CREATE TYPE "public"."enum__use_cases_v_blocks_use_cases_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_security_cards_icon" AS ENUM('database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search');
  CREATE TYPE "public"."enum__use_cases_v_blocks_security_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_functional_capabilities_cards_icon" AS ENUM('award', 'bell', 'calendar-check-2', 'calendar-days', 'calendar-range', 'clipboard-check', 'clock', 'database', 'file-check-2', 'file-text', 'filter', 'handshake', 'inbox', 'message-square', 'phone-incoming', 'receipt', 'repeat-2', 'send', 'shield-check', 'sliders-horizontal', 'star', 'triangle-alert', 'audio-lines', 'messages-square', 'smartphone', 'users', 'mail', 'info');
  CREATE TYPE "public"."enum__use_cases_v_blocks_functional_capabilities_cards_width" AS ENUM('default', 'wide');
  CREATE TYPE "public"."enum__use_cases_v_blocks_functional_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_functional_capabilities_preset" AS ENUM('sales', 'service', 'recruiting', 'channels');
  CREATE TYPE "public"."enum__use_cases_v_blocks_how_it_works_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_how_it_works_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_cta_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_cta_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_cta_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_metrics_background" AS ENUM('white', 'muted', 'dark');
  CREATE TYPE "public"."enum__use_cases_v_blocks_results_stats_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_results_stats_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_stats_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_capability_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_live_in_days_items_icon" AS ENUM('code-xml', 'layout-grid', 'bot-message-square', 'user-round-check');
  CREATE TYPE "public"."enum__use_cases_v_blocks_live_in_days_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_faq_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_news_insights_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum__use_cases_v_blocks_news_insights_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_news_insights_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__use_cases_v_blocks_content_feed_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum__use_cases_v_blocks_content_feed_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_content_feed_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__use_cases_v_blocks_pricing_cards_cards_accent" AS ENUM('gradient', 'dark');
  CREATE TYPE "public"."enum__use_cases_v_blocks_pricing_cards_cards_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_pricing_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_pricing_details_sections_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_pricing_details_sections_variant" AS ENUM('default', 'comparison');
  CREATE TYPE "public"."enum__use_cases_v_blocks_pricing_details_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_difference_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_difference_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_pain_points_comparison_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_pain_points_comparison_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_pricing_policy_callouts_icon" AS ENUM('wallet', 'infinity', 'headset', 'info');
  CREATE TYPE "public"."enum__use_cases_v_blocks_pricing_policy_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_industry_expertise_items_icon" AS ENUM('shopping_cart', 'headset', 'cloud_cog', 'hammer', 'heart_handshake', 'hotel', 'brain', 'layers', 'wand', 'globe', 'users', 'workflow');
  CREATE TYPE "public"."enum__use_cases_v_blocks_industry_expertise_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_industry_expertise_visual_type" AS ENUM('industry', 'platform', 'capabilities');
  CREATE TYPE "public"."enum__use_cases_v_blocks_industry_expertise_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_logo_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_integrations_banner_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_logo_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_tabs_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_anchor_nav_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_testimonials_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_comparison_grid_cards_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum__use_cases_v_blocks_comparison_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_blocks_use_case_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum__use_cases_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__use_cases_v_version_template" AS ENUM('use-case', 'industry-use-case');
  CREATE TYPE "public"."enum_forms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__forms_v_version_fields_type" AS ENUM('text', 'email', 'phone', 'url', 'textarea', 'select', 'checkbox', 'hidden');
  CREATE TYPE "public"."enum__forms_v_version_intent" AS ENUM('request-demo', 'contact', 'enterprise', 'blog-subscribe');
  CREATE TYPE "public"."enum__forms_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faq_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_media_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar NOT NULL,
  	"version_alt" varchar NOT NULL,
  	"version_description" varchar,
  	"version_source_id" numeric,
  	"version_public_path" varchar,
  	"version_storage_key" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_url" varchar,
  	"version_thumbnail_u_r_l" varchar,
  	"version_filename" varchar,
  	"version_mime_type" varchar,
  	"version_filesize" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_focal_x" numeric,
  	"version_focal_y" numeric,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_hero_background",
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__pages_v_blocks_hero_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__pages_v_blocks_hero_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"background_image_source_id" varchar,
  	"background_image_src" varchar,
  	"background_image_alt" varchar DEFAULT '',
  	"background_image_width" numeric,
  	"background_image_height" numeric,
  	"tooltip_label" varchar,
  	"tooltip_action" varchar,
  	"tooltip_title" varchar,
  	"tooltip_content" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_size" "enum__pages_v_blocks_hero_media_size" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_extended_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_extended" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_hero_extended_background",
  	"variant" "enum__pages_v_blocks_hero_extended_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"background_image_source_id" varchar,
  	"background_image_src" varchar,
  	"background_image_alt" varchar DEFAULT '',
  	"background_image_width" numeric,
  	"background_image_height" numeric,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_size" "enum__pages_v_blocks_hero_extended_media_size" DEFAULT 'wide',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__pages_v_blocks_hero_extended_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__pages_v_blocks_hero_extended_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_rich_text_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_side_by_side_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_side_by_side_small_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_side_by_side_bottom_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_side_by_side_bottom_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_side" "enum__pages_v_blocks_side_by_side_media_side" DEFAULT 'right',
  	"section_eyebrow" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"image_side" "enum__pages_v_blocks_side_by_side_image_side",
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum__pages_v_blocks_side_by_side_background" DEFAULT 'white',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__pages_v_blocks_side_by_side_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__pages_v_blocks_side_by_side_secondary_action_target" DEFAULT '_self',
  	"card_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_story_background",
  	"eyebrow" varchar,
  	"title_gradient" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"body_top" varchar,
  	"quote" varchar,
  	"body_bottom" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum__pages_v_blocks_media_showcase_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar DEFAULT 'wrench',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__pages_v_blocks_feature_grid_background" DEFAULT 'white',
  	"columns" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_agent_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"link_url" varchar,
  	"link_title" varchar,
  	"link_target" "enum__pages_v_blocks_agent_capabilities_items_link_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_agent_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_agent_capabilities_background",
  	"title" varchar,
  	"description" varchar,
  	"content_side" "enum__pages_v_blocks_agent_capabilities_content_side" DEFAULT 'left',
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"info_note" varchar,
  	"preview" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_agent_solutions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_agent_solutions_items_icon" DEFAULT 'headset',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_agent_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_agent_solutions_background",
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_contact_us_background",
  	"title_start" varchar DEFAULT 'Let''s',
  	"title_accent" varchar DEFAULT 'Connect!',
  	"description" varchar,
  	"city" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"logo_source_id" varchar,
  	"logo_src" varchar,
  	"logo_alt" varchar DEFAULT '',
  	"logo_width" numeric,
  	"logo_height" numeric,
  	"form_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_concierge_flow_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_concierge_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_concierge_flow_background",
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__pages_v_blocks_concierge_flow_button_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_enterprise_upgrade_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"included" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_enterprise_upgrade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_enterprise_upgrade_background",
  	"title" varchar,
  	"description" varchar,
  	"table_title" varchar,
  	"left_heading" varchar,
  	"right_heading" varchar,
  	"body_html" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"form_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_channels_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_channels_grid_cards_icon" DEFAULT 'sms',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"full_width" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_channels_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_channels_grid_background",
  	"title" varchar,
  	"gradient_text" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_feature_stack_cards_icon" DEFAULT 'network',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_feature_stack_background",
  	"title" varchar,
  	"description" varchar,
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_coverage_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_coverage_grid_cards_icon" DEFAULT 'flame',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_coverage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_coverage_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_rows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_feature_rows_background",
  	"variant" "enum__pages_v_blocks_feature_rows_variant" DEFAULT 'capabilities',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capability_trio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_capability_trio_cards_icon" DEFAULT 'messages-square',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capability_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_capability_trio_background",
  	"title" varchar,
  	"center_label" varchar DEFAULT 'Deterministic workflow engine',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capability_tools_cards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capability_tools_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"extra_tools" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capability_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_capability_tools_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_use_cases_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_use_cases_grid_cards_icon" DEFAULT 'shopping-cart',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_use_cases_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_use_cases_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_security_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_security_cards_icon" DEFAULT 'database_zap',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_security_background" DEFAULT 'white',
  	"title" varchar,
  	"title_gradient" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_functional_capabilities_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_functional_capabilities_cards_icon" DEFAULT 'filter',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"channels" varchar,
  	"width" "enum__pages_v_blocks_functional_capabilities_cards_width" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_functional_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_functional_capabilities_background",
  	"preset" "enum__pages_v_blocks_functional_capabilities_preset" DEFAULT 'sales',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'How it Works',
  	"gradient_text" varchar DEFAULT 'Works',
  	"subtitle" varchar DEFAULT 'From First Call to Live Agent in Days',
  	"background" "enum__pages_v_blocks_how_it_works_background" DEFAULT 'gray',
  	"open_first" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__pages_v_blocks_how_it_works_button_target" DEFAULT '_self',
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_cta_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__pages_v_blocks_cta_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__pages_v_blocks_cta_secondary_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__pages_v_blocks_metrics_background" DEFAULT 'white',
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_results_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_target" "enum__pages_v_blocks_results_stats_items_link_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_results_stats_background" DEFAULT 'white',
  	"title" varchar,
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"heading" varchar,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_stats_cards_background" DEFAULT 'white',
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capability_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capability_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__pages_v_blocks_capability_strip_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_live_in_days_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_live_in_days_items_icon" DEFAULT 'code-xml',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_live_in_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_live_in_days_background",
  	"eyebrow" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_faq_background",
  	"title" varchar,
  	"title_gradient" varchar,
  	"description" varchar,
  	"search_placeholder" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_news_insights_collections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_news_insights_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_news_insights_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_news_insights_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_news_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_news_insights_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"mode" "enum__pages_v_blocks_news_insights_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_feed_collections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_content_feed_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_content_feed_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_feed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_content_feed_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"mode" "enum__pages_v_blocks_content_feed_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_cards_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"accent" "enum__pages_v_blocks_pricing_cards_cards_accent" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__pages_v_blocks_pricing_cards_cards_button_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__pages_v_blocks_pricing_cards_background" DEFAULT 'gray',
  	"info" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_details_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_details_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"strong" boolean DEFAULT false,
  	"accent" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"stars" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_details_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_details_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__pages_v_blocks_pricing_details_sections_background" DEFAULT 'gray',
  	"variant" "enum__pages_v_blocks_pricing_details_sections_variant" DEFAULT 'default',
  	"title" varchar,
  	"info" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_pricing_details_background",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_difference_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_difference_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_difference_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"left_title" varchar,
  	"right_title" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__pages_v_blocks_difference_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pain_points_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_title" varchar,
  	"left_description" varchar,
  	"right_title" varchar,
  	"right_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pain_points_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_pain_points_comparison_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"title" varchar,
  	"show_column_headings" boolean DEFAULT false,
  	"left_heading" varchar DEFAULT 'The Challenge',
  	"right_heading" varchar DEFAULT 'Your AI Agent',
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__pages_v_blocks_pain_points_comparison_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_policy_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_pricing_policy_callouts_icon" DEFAULT 'wallet',
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_pricing_policy_background" DEFAULT 'white',
  	"title" varchar,
  	"info" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_industry_expertise_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_industry_expertise_items_icon",
  	"custom_icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_industry_expertise_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"source" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_industry_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_industry_expertise_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"visual_type" "enum__pages_v_blocks_industry_expertise_visual_type" DEFAULT 'industry',
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__pages_v_blocks_industry_expertise_button_target" DEFAULT '_self',
  	"hide_bottom_controls" boolean DEFAULT false,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_logo_strip_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_integrations_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_integrations_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_integrations_banner_background",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_grid_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"secondary_image_source_id" varchar,
  	"secondary_image_src" varchar,
  	"secondary_image_alt" varchar DEFAULT '',
  	"secondary_image_width" numeric,
  	"secondary_image_height" numeric,
  	"label" varchar,
  	"sub_label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_grid_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_logo_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_showcase_tabs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_showcase_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_tabs_showcase_background" DEFAULT 'gray',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"autoplay_seconds" numeric DEFAULT 0,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_anchor_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_anchor_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_anchor_nav_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_source_id" varchar,
  	"author_image_src" varchar,
  	"author_image_alt" varchar DEFAULT '',
  	"author_image_width" numeric,
  	"author_image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_testimonials_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__pages_v_blocks_comparison_grid_cards_action_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__pages_v_blocks_comparison_grid_background",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_use_case_flow_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_use_case_flow_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_use_case_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__pages_v_blocks_use_case_flow_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_content_key" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_published_at" varchar,
  	"version_path" varchar,
  	"version_status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"version_template" "enum__pages_v_version_template" DEFAULT 'standard',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_canonical_url" varchar,
  	"version_seo_robots" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_source_id" varchar,
  	"version_seo_og_image_src" varchar,
  	"version_seo_og_image_alt" varchar DEFAULT '',
  	"version_seo_og_image_width" numeric,
  	"version_seo_og_image_height" numeric,
  	"version_seo_twitter_title" varchar,
  	"version_seo_twitter_description" varchar,
  	"version_seo_twitter_image_source_id" varchar,
  	"version_seo_twitter_image_src" varchar,
  	"version_seo_twitter_image_alt" varchar DEFAULT '',
  	"version_seo_twitter_image_width" numeric,
  	"version_seo_twitter_image_height" numeric,
  	"version_seo_schema_json" jsonb,
  	"version_import_trace" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_blocks_hero_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_hero_background",
  	"variant" "enum__posts_v_blocks_hero_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__posts_v_blocks_hero_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__posts_v_blocks_hero_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"background_image_source_id" varchar,
  	"background_image_src" varchar,
  	"background_image_alt" varchar DEFAULT '',
  	"background_image_width" numeric,
  	"background_image_height" numeric,
  	"tooltip_label" varchar,
  	"tooltip_action" varchar,
  	"tooltip_title" varchar,
  	"tooltip_content" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_size" "enum__posts_v_blocks_hero_media_size" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hero_extended_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hero_extended" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_hero_extended_background",
  	"variant" "enum__posts_v_blocks_hero_extended_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"background_image_source_id" varchar,
  	"background_image_src" varchar,
  	"background_image_alt" varchar DEFAULT '',
  	"background_image_width" numeric,
  	"background_image_height" numeric,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_size" "enum__posts_v_blocks_hero_extended_media_size" DEFAULT 'wide',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__posts_v_blocks_hero_extended_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__posts_v_blocks_hero_extended_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_rich_text_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_side_by_side_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_side_by_side_small_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_side_by_side_bottom_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_side_by_side_bottom_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_side" "enum__posts_v_blocks_side_by_side_media_side" DEFAULT 'right',
  	"section_eyebrow" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"image_side" "enum__posts_v_blocks_side_by_side_image_side",
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum__posts_v_blocks_side_by_side_background" DEFAULT 'white',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__posts_v_blocks_side_by_side_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__posts_v_blocks_side_by_side_secondary_action_target" DEFAULT '_self',
  	"card_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_story_background",
  	"eyebrow" varchar,
  	"title_gradient" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"body_top" varchar,
  	"quote" varchar,
  	"body_bottom" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum__posts_v_blocks_media_showcase_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar DEFAULT 'wrench',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__posts_v_blocks_feature_grid_background" DEFAULT 'white',
  	"columns" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_agent_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"link_url" varchar,
  	"link_title" varchar,
  	"link_target" "enum__posts_v_blocks_agent_capabilities_items_link_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_agent_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_agent_capabilities_background",
  	"title" varchar,
  	"description" varchar,
  	"content_side" "enum__posts_v_blocks_agent_capabilities_content_side" DEFAULT 'left',
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"info_note" varchar,
  	"preview" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_agent_solutions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__posts_v_blocks_agent_solutions_items_icon" DEFAULT 'headset',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_agent_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_agent_solutions_background",
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_contact_us_background",
  	"title_start" varchar DEFAULT 'Let''s',
  	"title_accent" varchar DEFAULT 'Connect!',
  	"description" varchar,
  	"city" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"logo_source_id" varchar,
  	"logo_src" varchar,
  	"logo_alt" varchar DEFAULT '',
  	"logo_width" numeric,
  	"logo_height" numeric,
  	"form_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_concierge_flow_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_concierge_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_concierge_flow_background",
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__posts_v_blocks_concierge_flow_button_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_enterprise_upgrade_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"included" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_enterprise_upgrade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_enterprise_upgrade_background",
  	"title" varchar,
  	"description" varchar,
  	"table_title" varchar,
  	"left_heading" varchar,
  	"right_heading" varchar,
  	"body_html" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"form_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_channels_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__posts_v_blocks_channels_grid_cards_icon" DEFAULT 'sms',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"full_width" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_channels_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_channels_grid_background",
  	"title" varchar,
  	"gradient_text" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_feature_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__posts_v_blocks_feature_stack_cards_icon" DEFAULT 'network',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_feature_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_feature_stack_background",
  	"title" varchar,
  	"description" varchar,
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_coverage_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__posts_v_blocks_coverage_grid_cards_icon" DEFAULT 'flame',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_coverage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_coverage_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_feature_rows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_feature_rows_background",
  	"variant" "enum__posts_v_blocks_feature_rows_variant" DEFAULT 'capabilities',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_capability_trio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__posts_v_blocks_capability_trio_cards_icon" DEFAULT 'messages-square',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_capability_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_capability_trio_background",
  	"title" varchar,
  	"center_label" varchar DEFAULT 'Deterministic workflow engine',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_capability_tools_cards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_capability_tools_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"extra_tools" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_capability_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_capability_tools_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_use_cases_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__posts_v_blocks_use_cases_grid_cards_icon" DEFAULT 'shopping-cart',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_use_cases_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_use_cases_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_security_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__posts_v_blocks_security_cards_icon" DEFAULT 'database_zap',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_security_background" DEFAULT 'white',
  	"title" varchar,
  	"title_gradient" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_functional_capabilities_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__posts_v_blocks_functional_capabilities_cards_icon" DEFAULT 'filter',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"channels" varchar,
  	"width" "enum__posts_v_blocks_functional_capabilities_cards_width" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_functional_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_functional_capabilities_background",
  	"preset" "enum__posts_v_blocks_functional_capabilities_preset" DEFAULT 'sales',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'How it Works',
  	"gradient_text" varchar DEFAULT 'Works',
  	"subtitle" varchar DEFAULT 'From First Call to Live Agent in Days',
  	"background" "enum__posts_v_blocks_how_it_works_background" DEFAULT 'gray',
  	"open_first" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__posts_v_blocks_how_it_works_button_target" DEFAULT '_self',
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_cta_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__posts_v_blocks_cta_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__posts_v_blocks_cta_secondary_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__posts_v_blocks_metrics_background" DEFAULT 'white',
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_results_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_target" "enum__posts_v_blocks_results_stats_items_link_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_results_stats_background" DEFAULT 'white',
  	"title" varchar,
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"heading" varchar,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_stats_cards_background" DEFAULT 'white',
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_capability_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_capability_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__posts_v_blocks_capability_strip_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_live_in_days_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__posts_v_blocks_live_in_days_items_icon" DEFAULT 'code-xml',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_live_in_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_live_in_days_background",
  	"eyebrow" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_faq_background",
  	"title" varchar,
  	"title_gradient" varchar,
  	"description" varchar,
  	"search_placeholder" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_news_insights_collections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__posts_v_blocks_news_insights_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_news_insights_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_news_insights_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_news_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_news_insights_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"mode" "enum__posts_v_blocks_news_insights_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_content_feed_collections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__posts_v_blocks_content_feed_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_content_feed_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_content_feed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_content_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_content_feed_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"mode" "enum__posts_v_blocks_content_feed_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_cards_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"accent" "enum__posts_v_blocks_pricing_cards_cards_accent" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__posts_v_blocks_pricing_cards_cards_button_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__posts_v_blocks_pricing_cards_background" DEFAULT 'gray',
  	"info" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_details_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_details_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"strong" boolean DEFAULT false,
  	"accent" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"stars" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_details_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_details_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__posts_v_blocks_pricing_details_sections_background" DEFAULT 'gray',
  	"variant" "enum__posts_v_blocks_pricing_details_sections_variant" DEFAULT 'default',
  	"title" varchar,
  	"info" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_pricing_details_background",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_difference_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_difference_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_difference_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"left_title" varchar,
  	"right_title" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__posts_v_blocks_difference_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pain_points_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_title" varchar,
  	"left_description" varchar,
  	"right_title" varchar,
  	"right_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pain_points_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_pain_points_comparison_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"title" varchar,
  	"show_column_headings" boolean DEFAULT false,
  	"left_heading" varchar DEFAULT 'The Challenge',
  	"right_heading" varchar DEFAULT 'Your AI Agent',
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__posts_v_blocks_pain_points_comparison_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_policy_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__posts_v_blocks_pricing_policy_callouts_icon" DEFAULT 'wallet',
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_pricing_policy_background" DEFAULT 'white',
  	"title" varchar,
  	"info" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_industry_expertise_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__posts_v_blocks_industry_expertise_items_icon",
  	"custom_icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_industry_expertise_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"source" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_industry_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_industry_expertise_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"visual_type" "enum__posts_v_blocks_industry_expertise_visual_type" DEFAULT 'industry',
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__posts_v_blocks_industry_expertise_button_target" DEFAULT '_self',
  	"hide_bottom_controls" boolean DEFAULT false,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_logo_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_logo_strip_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_integrations_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_integrations_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_integrations_banner_background",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_logo_grid_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"secondary_image_source_id" varchar,
  	"secondary_image_src" varchar,
  	"secondary_image_alt" varchar DEFAULT '',
  	"secondary_image_width" numeric,
  	"secondary_image_height" numeric,
  	"label" varchar,
  	"sub_label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_logo_grid_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_logo_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_tabs_showcase_tabs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_tabs_showcase_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_tabs_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_tabs_showcase_background" DEFAULT 'gray',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"autoplay_seconds" numeric DEFAULT 0,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_anchor_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_anchor_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_anchor_nav_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_source_id" varchar,
  	"author_image_src" varchar,
  	"author_image_alt" varchar DEFAULT '',
  	"author_image_width" numeric,
  	"author_image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_testimonials_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_comparison_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__posts_v_blocks_comparison_grid_cards_action_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_comparison_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__posts_v_blocks_comparison_grid_background",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_use_case_flow_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_use_case_flow_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_use_case_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__posts_v_blocks_use_case_flow_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_version_article_meta_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_featured_image_id" integer,
  	"version_source_featured_image_source_id" varchar,
  	"version_source_featured_image_src" varchar,
  	"version_source_featured_image_alt" varchar,
  	"version_source_featured_image_width" numeric,
  	"version_source_featured_image_height" numeric,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_path" varchar,
  	"version_status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"version_template" "enum__posts_v_version_template" DEFAULT 'article',
  	"version_article_meta_category" varchar,
  	"version_article_meta_author_name" varchar,
  	"version_article_meta_updated_at" timestamp(3) with time zone,
  	"version_article_meta_read_time_minutes" numeric,
  	"version_article_meta_rating_average" numeric,
  	"version_article_meta_rating_count" numeric,
  	"version_article_meta_views" numeric,
  	"version_article_meta_show_table_of_contents" boolean DEFAULT true,
  	"version_article_meta_show_table_of_contents_title" boolean DEFAULT true,
  	"version_article_meta_table_of_contents_title" varchar DEFAULT 'Contents',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_canonical_url" varchar,
  	"version_seo_robots" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_source_id" varchar,
  	"version_seo_og_image_src" varchar,
  	"version_seo_og_image_alt" varchar DEFAULT '',
  	"version_seo_og_image_width" numeric,
  	"version_seo_og_image_height" numeric,
  	"version_seo_twitter_title" varchar,
  	"version_seo_twitter_description" varchar,
  	"version_seo_twitter_image_source_id" varchar,
  	"version_seo_twitter_image_src" varchar,
  	"version_seo_twitter_image_alt" varchar DEFAULT '',
  	"version_seo_twitter_image_width" numeric,
  	"version_seo_twitter_image_height" numeric,
  	"version_seo_schema_json" jsonb,
  	"version_content_key" varchar,
  	"version_import_trace" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_news_v_blocks_hero_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_hero_background",
  	"variant" "enum__news_v_blocks_hero_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__news_v_blocks_hero_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__news_v_blocks_hero_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"background_image_source_id" varchar,
  	"background_image_src" varchar,
  	"background_image_alt" varchar DEFAULT '',
  	"background_image_width" numeric,
  	"background_image_height" numeric,
  	"tooltip_label" varchar,
  	"tooltip_action" varchar,
  	"tooltip_title" varchar,
  	"tooltip_content" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_size" "enum__news_v_blocks_hero_media_size" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_hero_extended_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_hero_extended" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_hero_extended_background",
  	"variant" "enum__news_v_blocks_hero_extended_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"background_image_source_id" varchar,
  	"background_image_src" varchar,
  	"background_image_alt" varchar DEFAULT '',
  	"background_image_width" numeric,
  	"background_image_height" numeric,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_size" "enum__news_v_blocks_hero_extended_media_size" DEFAULT 'wide',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__news_v_blocks_hero_extended_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__news_v_blocks_hero_extended_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_rich_text_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_side_by_side_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_side_by_side_small_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_side_by_side_bottom_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_side_by_side_bottom_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_side" "enum__news_v_blocks_side_by_side_media_side" DEFAULT 'right',
  	"section_eyebrow" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"image_side" "enum__news_v_blocks_side_by_side_image_side",
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum__news_v_blocks_side_by_side_background" DEFAULT 'white',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__news_v_blocks_side_by_side_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__news_v_blocks_side_by_side_secondary_action_target" DEFAULT '_self',
  	"card_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_story_background",
  	"eyebrow" varchar,
  	"title_gradient" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"body_top" varchar,
  	"quote" varchar,
  	"body_bottom" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum__news_v_blocks_media_showcase_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar DEFAULT 'wrench',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__news_v_blocks_feature_grid_background" DEFAULT 'white',
  	"columns" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_agent_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"link_url" varchar,
  	"link_title" varchar,
  	"link_target" "enum__news_v_blocks_agent_capabilities_items_link_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_agent_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_agent_capabilities_background",
  	"title" varchar,
  	"description" varchar,
  	"content_side" "enum__news_v_blocks_agent_capabilities_content_side" DEFAULT 'left',
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"info_note" varchar,
  	"preview" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_agent_solutions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__news_v_blocks_agent_solutions_items_icon" DEFAULT 'headset',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_agent_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_agent_solutions_background",
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_contact_us_background",
  	"title_start" varchar DEFAULT 'Let''s',
  	"title_accent" varchar DEFAULT 'Connect!',
  	"description" varchar,
  	"city" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"logo_source_id" varchar,
  	"logo_src" varchar,
  	"logo_alt" varchar DEFAULT '',
  	"logo_width" numeric,
  	"logo_height" numeric,
  	"form_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_concierge_flow_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_concierge_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_concierge_flow_background",
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__news_v_blocks_concierge_flow_button_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_enterprise_upgrade_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"included" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_enterprise_upgrade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_enterprise_upgrade_background",
  	"title" varchar,
  	"description" varchar,
  	"table_title" varchar,
  	"left_heading" varchar,
  	"right_heading" varchar,
  	"body_html" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"form_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_channels_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__news_v_blocks_channels_grid_cards_icon" DEFAULT 'sms',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"full_width" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_channels_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_channels_grid_background",
  	"title" varchar,
  	"gradient_text" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_feature_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__news_v_blocks_feature_stack_cards_icon" DEFAULT 'network',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_feature_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_feature_stack_background",
  	"title" varchar,
  	"description" varchar,
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_coverage_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__news_v_blocks_coverage_grid_cards_icon" DEFAULT 'flame',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_coverage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_coverage_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_feature_rows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_feature_rows_background",
  	"variant" "enum__news_v_blocks_feature_rows_variant" DEFAULT 'capabilities',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_capability_trio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__news_v_blocks_capability_trio_cards_icon" DEFAULT 'messages-square',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_capability_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_capability_trio_background",
  	"title" varchar,
  	"center_label" varchar DEFAULT 'Deterministic workflow engine',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_capability_tools_cards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_capability_tools_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"extra_tools" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_capability_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_capability_tools_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_use_cases_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__news_v_blocks_use_cases_grid_cards_icon" DEFAULT 'shopping-cart',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_use_cases_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_use_cases_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_security_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__news_v_blocks_security_cards_icon" DEFAULT 'database_zap',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_security_background" DEFAULT 'white',
  	"title" varchar,
  	"title_gradient" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_functional_capabilities_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__news_v_blocks_functional_capabilities_cards_icon" DEFAULT 'filter',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"channels" varchar,
  	"width" "enum__news_v_blocks_functional_capabilities_cards_width" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_functional_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_functional_capabilities_background",
  	"preset" "enum__news_v_blocks_functional_capabilities_preset" DEFAULT 'sales',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'How it Works',
  	"gradient_text" varchar DEFAULT 'Works',
  	"subtitle" varchar DEFAULT 'From First Call to Live Agent in Days',
  	"background" "enum__news_v_blocks_how_it_works_background" DEFAULT 'gray',
  	"open_first" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__news_v_blocks_how_it_works_button_target" DEFAULT '_self',
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_cta_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__news_v_blocks_cta_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__news_v_blocks_cta_secondary_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__news_v_blocks_metrics_background" DEFAULT 'white',
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_results_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_target" "enum__news_v_blocks_results_stats_items_link_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_results_stats_background" DEFAULT 'white',
  	"title" varchar,
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"heading" varchar,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_stats_cards_background" DEFAULT 'white',
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_capability_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_capability_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__news_v_blocks_capability_strip_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_live_in_days_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__news_v_blocks_live_in_days_items_icon" DEFAULT 'code-xml',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_live_in_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_live_in_days_background",
  	"eyebrow" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_faq_background",
  	"title" varchar,
  	"title_gradient" varchar,
  	"description" varchar,
  	"search_placeholder" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_news_insights_collections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__news_v_blocks_news_insights_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_news_v_blocks_news_insights_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_news_insights_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_news_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_news_insights_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"mode" "enum__news_v_blocks_news_insights_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_content_feed_collections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__news_v_blocks_content_feed_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_news_v_blocks_content_feed_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_content_feed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_content_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_content_feed_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"mode" "enum__news_v_blocks_content_feed_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_pricing_cards_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_pricing_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"accent" "enum__news_v_blocks_pricing_cards_cards_accent" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__news_v_blocks_pricing_cards_cards_button_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__news_v_blocks_pricing_cards_background" DEFAULT 'gray',
  	"info" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_pricing_details_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_pricing_details_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"strong" boolean DEFAULT false,
  	"accent" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"stars" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_pricing_details_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_pricing_details_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__news_v_blocks_pricing_details_sections_background" DEFAULT 'gray',
  	"variant" "enum__news_v_blocks_pricing_details_sections_variant" DEFAULT 'default',
  	"title" varchar,
  	"info" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_pricing_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_pricing_details_background",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_difference_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_difference_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_difference_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"left_title" varchar,
  	"right_title" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__news_v_blocks_difference_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_pain_points_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_title" varchar,
  	"left_description" varchar,
  	"right_title" varchar,
  	"right_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_pain_points_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_pain_points_comparison_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"title" varchar,
  	"show_column_headings" boolean DEFAULT false,
  	"left_heading" varchar DEFAULT 'The Challenge',
  	"right_heading" varchar DEFAULT 'Your AI Agent',
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__news_v_blocks_pain_points_comparison_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_pricing_policy_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__news_v_blocks_pricing_policy_callouts_icon" DEFAULT 'wallet',
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_pricing_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_pricing_policy_background" DEFAULT 'white',
  	"title" varchar,
  	"info" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_industry_expertise_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__news_v_blocks_industry_expertise_items_icon",
  	"custom_icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_industry_expertise_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"source" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_industry_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_industry_expertise_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"visual_type" "enum__news_v_blocks_industry_expertise_visual_type" DEFAULT 'industry',
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__news_v_blocks_industry_expertise_button_target" DEFAULT '_self',
  	"hide_bottom_controls" boolean DEFAULT false,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_logo_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_logo_strip_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_integrations_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_integrations_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_integrations_banner_background",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_logo_grid_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"secondary_image_source_id" varchar,
  	"secondary_image_src" varchar,
  	"secondary_image_alt" varchar DEFAULT '',
  	"secondary_image_width" numeric,
  	"secondary_image_height" numeric,
  	"label" varchar,
  	"sub_label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_logo_grid_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_logo_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_tabs_showcase_tabs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_tabs_showcase_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_tabs_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_tabs_showcase_background" DEFAULT 'gray',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"autoplay_seconds" numeric DEFAULT 0,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_anchor_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_anchor_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_anchor_nav_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_source_id" varchar,
  	"author_image_src" varchar,
  	"author_image_alt" varchar DEFAULT '',
  	"author_image_width" numeric,
  	"author_image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_testimonials_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_comparison_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__news_v_blocks_comparison_grid_cards_action_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_comparison_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__news_v_blocks_comparison_grid_background",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_blocks_use_case_flow_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_use_case_flow_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v_blocks_use_case_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__news_v_blocks_use_case_flow_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_news_v_version_article_meta_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_featured_image_id" integer,
  	"version_source_featured_image_source_id" varchar,
  	"version_source_featured_image_src" varchar,
  	"version_source_featured_image_alt" varchar,
  	"version_source_featured_image_width" numeric,
  	"version_source_featured_image_height" numeric,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_path" varchar,
  	"version_status" "enum__news_v_version_status" DEFAULT 'draft',
  	"version_template" "enum__news_v_version_template" DEFAULT 'news',
  	"version_article_meta_category" varchar,
  	"version_article_meta_author_name" varchar,
  	"version_article_meta_updated_at" timestamp(3) with time zone,
  	"version_article_meta_read_time_minutes" numeric,
  	"version_article_meta_rating_average" numeric,
  	"version_article_meta_rating_count" numeric,
  	"version_article_meta_views" numeric,
  	"version_article_meta_show_table_of_contents" boolean DEFAULT true,
  	"version_article_meta_show_table_of_contents_title" boolean DEFAULT true,
  	"version_article_meta_table_of_contents_title" varchar DEFAULT 'Contents',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_canonical_url" varchar,
  	"version_seo_robots" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_source_id" varchar,
  	"version_seo_og_image_src" varchar,
  	"version_seo_og_image_alt" varchar DEFAULT '',
  	"version_seo_og_image_width" numeric,
  	"version_seo_og_image_height" numeric,
  	"version_seo_twitter_title" varchar,
  	"version_seo_twitter_description" varchar,
  	"version_seo_twitter_image_source_id" varchar,
  	"version_seo_twitter_image_src" varchar,
  	"version_seo_twitter_image_alt" varchar DEFAULT '',
  	"version_seo_twitter_image_width" numeric,
  	"version_seo_twitter_image_height" numeric,
  	"version_seo_schema_json" jsonb,
  	"version_content_key" varchar,
  	"version_import_trace" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_guides_v_blocks_hero_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_hero_background",
  	"variant" "enum__guides_v_blocks_hero_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__guides_v_blocks_hero_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__guides_v_blocks_hero_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"background_image_source_id" varchar,
  	"background_image_src" varchar,
  	"background_image_alt" varchar DEFAULT '',
  	"background_image_width" numeric,
  	"background_image_height" numeric,
  	"tooltip_label" varchar,
  	"tooltip_action" varchar,
  	"tooltip_title" varchar,
  	"tooltip_content" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_size" "enum__guides_v_blocks_hero_media_size" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_hero_extended_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_hero_extended" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_hero_extended_background",
  	"variant" "enum__guides_v_blocks_hero_extended_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"background_image_source_id" varchar,
  	"background_image_src" varchar,
  	"background_image_alt" varchar DEFAULT '',
  	"background_image_width" numeric,
  	"background_image_height" numeric,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_size" "enum__guides_v_blocks_hero_extended_media_size" DEFAULT 'wide',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__guides_v_blocks_hero_extended_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__guides_v_blocks_hero_extended_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_rich_text_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_side_by_side_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_side_by_side_small_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_side_by_side_bottom_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_side_by_side_bottom_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_side" "enum__guides_v_blocks_side_by_side_media_side" DEFAULT 'right',
  	"section_eyebrow" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"image_side" "enum__guides_v_blocks_side_by_side_image_side",
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum__guides_v_blocks_side_by_side_background" DEFAULT 'white',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__guides_v_blocks_side_by_side_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__guides_v_blocks_side_by_side_secondary_action_target" DEFAULT '_self',
  	"card_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_story_background",
  	"eyebrow" varchar,
  	"title_gradient" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"body_top" varchar,
  	"quote" varchar,
  	"body_bottom" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum__guides_v_blocks_media_showcase_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar DEFAULT 'wrench',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__guides_v_blocks_feature_grid_background" DEFAULT 'white',
  	"columns" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_agent_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"link_url" varchar,
  	"link_title" varchar,
  	"link_target" "enum__guides_v_blocks_agent_capabilities_items_link_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_agent_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_agent_capabilities_background",
  	"title" varchar,
  	"description" varchar,
  	"content_side" "enum__guides_v_blocks_agent_capabilities_content_side" DEFAULT 'left',
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"info_note" varchar,
  	"preview" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_agent_solutions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__guides_v_blocks_agent_solutions_items_icon" DEFAULT 'headset',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_agent_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_agent_solutions_background",
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_contact_us_background",
  	"title_start" varchar DEFAULT 'Let''s',
  	"title_accent" varchar DEFAULT 'Connect!',
  	"description" varchar,
  	"city" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"logo_source_id" varchar,
  	"logo_src" varchar,
  	"logo_alt" varchar DEFAULT '',
  	"logo_width" numeric,
  	"logo_height" numeric,
  	"form_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_concierge_flow_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_concierge_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_concierge_flow_background",
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__guides_v_blocks_concierge_flow_button_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_enterprise_upgrade_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"included" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_enterprise_upgrade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_enterprise_upgrade_background",
  	"title" varchar,
  	"description" varchar,
  	"table_title" varchar,
  	"left_heading" varchar,
  	"right_heading" varchar,
  	"body_html" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"form_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_channels_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__guides_v_blocks_channels_grid_cards_icon" DEFAULT 'sms',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"full_width" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_channels_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_channels_grid_background",
  	"title" varchar,
  	"gradient_text" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_feature_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__guides_v_blocks_feature_stack_cards_icon" DEFAULT 'network',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_feature_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_feature_stack_background",
  	"title" varchar,
  	"description" varchar,
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_coverage_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__guides_v_blocks_coverage_grid_cards_icon" DEFAULT 'flame',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_coverage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_coverage_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_feature_rows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_feature_rows_background",
  	"variant" "enum__guides_v_blocks_feature_rows_variant" DEFAULT 'capabilities',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_capability_trio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__guides_v_blocks_capability_trio_cards_icon" DEFAULT 'messages-square',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_capability_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_capability_trio_background",
  	"title" varchar,
  	"center_label" varchar DEFAULT 'Deterministic workflow engine',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_capability_tools_cards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_capability_tools_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"extra_tools" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_capability_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_capability_tools_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_use_cases_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__guides_v_blocks_use_cases_grid_cards_icon" DEFAULT 'shopping-cart',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_use_cases_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_use_cases_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_security_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__guides_v_blocks_security_cards_icon" DEFAULT 'database_zap',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_security_background" DEFAULT 'white',
  	"title" varchar,
  	"title_gradient" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_functional_capabilities_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__guides_v_blocks_functional_capabilities_cards_icon" DEFAULT 'filter',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"channels" varchar,
  	"width" "enum__guides_v_blocks_functional_capabilities_cards_width" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_functional_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_functional_capabilities_background",
  	"preset" "enum__guides_v_blocks_functional_capabilities_preset" DEFAULT 'sales',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'How it Works',
  	"gradient_text" varchar DEFAULT 'Works',
  	"subtitle" varchar DEFAULT 'From First Call to Live Agent in Days',
  	"background" "enum__guides_v_blocks_how_it_works_background" DEFAULT 'gray',
  	"open_first" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__guides_v_blocks_how_it_works_button_target" DEFAULT '_self',
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_cta_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__guides_v_blocks_cta_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__guides_v_blocks_cta_secondary_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__guides_v_blocks_metrics_background" DEFAULT 'white',
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_results_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_target" "enum__guides_v_blocks_results_stats_items_link_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_results_stats_background" DEFAULT 'white',
  	"title" varchar,
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"heading" varchar,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_stats_cards_background" DEFAULT 'white',
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_capability_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_capability_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__guides_v_blocks_capability_strip_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_live_in_days_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__guides_v_blocks_live_in_days_items_icon" DEFAULT 'code-xml',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_live_in_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_live_in_days_background",
  	"eyebrow" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_faq_background",
  	"title" varchar,
  	"title_gradient" varchar,
  	"description" varchar,
  	"search_placeholder" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_news_insights_collections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__guides_v_blocks_news_insights_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_guides_v_blocks_news_insights_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_news_insights_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_news_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_news_insights_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"mode" "enum__guides_v_blocks_news_insights_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_content_feed_collections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__guides_v_blocks_content_feed_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_guides_v_blocks_content_feed_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_content_feed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_content_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_content_feed_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"mode" "enum__guides_v_blocks_content_feed_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_pricing_cards_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_pricing_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"accent" "enum__guides_v_blocks_pricing_cards_cards_accent" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__guides_v_blocks_pricing_cards_cards_button_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__guides_v_blocks_pricing_cards_background" DEFAULT 'gray',
  	"info" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_pricing_details_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_pricing_details_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"strong" boolean DEFAULT false,
  	"accent" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"stars" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_pricing_details_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_pricing_details_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__guides_v_blocks_pricing_details_sections_background" DEFAULT 'gray',
  	"variant" "enum__guides_v_blocks_pricing_details_sections_variant" DEFAULT 'default',
  	"title" varchar,
  	"info" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_pricing_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_pricing_details_background",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_difference_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_difference_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_difference_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"left_title" varchar,
  	"right_title" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__guides_v_blocks_difference_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_pain_points_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_title" varchar,
  	"left_description" varchar,
  	"right_title" varchar,
  	"right_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_pain_points_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_pain_points_comparison_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"title" varchar,
  	"show_column_headings" boolean DEFAULT false,
  	"left_heading" varchar DEFAULT 'The Challenge',
  	"right_heading" varchar DEFAULT 'Your AI Agent',
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__guides_v_blocks_pain_points_comparison_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_pricing_policy_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__guides_v_blocks_pricing_policy_callouts_icon" DEFAULT 'wallet',
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_pricing_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_pricing_policy_background" DEFAULT 'white',
  	"title" varchar,
  	"info" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_industry_expertise_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__guides_v_blocks_industry_expertise_items_icon",
  	"custom_icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_industry_expertise_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"source" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_industry_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_industry_expertise_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"visual_type" "enum__guides_v_blocks_industry_expertise_visual_type" DEFAULT 'industry',
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__guides_v_blocks_industry_expertise_button_target" DEFAULT '_self',
  	"hide_bottom_controls" boolean DEFAULT false,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_logo_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_logo_strip_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_integrations_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_integrations_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_integrations_banner_background",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_logo_grid_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"secondary_image_source_id" varchar,
  	"secondary_image_src" varchar,
  	"secondary_image_alt" varchar DEFAULT '',
  	"secondary_image_width" numeric,
  	"secondary_image_height" numeric,
  	"label" varchar,
  	"sub_label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_logo_grid_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_logo_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_tabs_showcase_tabs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_tabs_showcase_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_tabs_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_tabs_showcase_background" DEFAULT 'gray',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"autoplay_seconds" numeric DEFAULT 0,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_anchor_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_anchor_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_anchor_nav_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_source_id" varchar,
  	"author_image_src" varchar,
  	"author_image_alt" varchar DEFAULT '',
  	"author_image_width" numeric,
  	"author_image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_testimonials_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_comparison_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__guides_v_blocks_comparison_grid_cards_action_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_comparison_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__guides_v_blocks_comparison_grid_background",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_use_case_flow_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_use_case_flow_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_use_case_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__guides_v_blocks_use_case_flow_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_version_article_meta_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_featured_image_id" integer,
  	"version_source_featured_image_source_id" varchar,
  	"version_source_featured_image_src" varchar,
  	"version_source_featured_image_alt" varchar,
  	"version_source_featured_image_width" numeric,
  	"version_source_featured_image_height" numeric,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_path" varchar,
  	"version_status" "enum__guides_v_version_status" DEFAULT 'draft',
  	"version_template" "enum__guides_v_version_template" DEFAULT 'guide',
  	"version_article_meta_category" varchar,
  	"version_article_meta_author_name" varchar,
  	"version_article_meta_updated_at" timestamp(3) with time zone,
  	"version_article_meta_read_time_minutes" numeric,
  	"version_article_meta_rating_average" numeric,
  	"version_article_meta_rating_count" numeric,
  	"version_article_meta_views" numeric,
  	"version_article_meta_show_table_of_contents" boolean DEFAULT true,
  	"version_article_meta_show_table_of_contents_title" boolean DEFAULT true,
  	"version_article_meta_table_of_contents_title" varchar DEFAULT 'Contents',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_canonical_url" varchar,
  	"version_seo_robots" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_source_id" varchar,
  	"version_seo_og_image_src" varchar,
  	"version_seo_og_image_alt" varchar DEFAULT '',
  	"version_seo_og_image_width" numeric,
  	"version_seo_og_image_height" numeric,
  	"version_seo_twitter_title" varchar,
  	"version_seo_twitter_description" varchar,
  	"version_seo_twitter_image_source_id" varchar,
  	"version_seo_twitter_image_src" varchar,
  	"version_seo_twitter_image_alt" varchar DEFAULT '',
  	"version_seo_twitter_image_width" numeric,
  	"version_seo_twitter_image_height" numeric,
  	"version_seo_schema_json" jsonb,
  	"version_content_key" varchar,
  	"version_import_trace" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__guides_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_tips_v_version_tip_card_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_hero_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_hero_background",
  	"variant" "enum__tips_v_blocks_hero_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__tips_v_blocks_hero_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__tips_v_blocks_hero_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"background_image_source_id" varchar,
  	"background_image_src" varchar,
  	"background_image_alt" varchar DEFAULT '',
  	"background_image_width" numeric,
  	"background_image_height" numeric,
  	"tooltip_label" varchar,
  	"tooltip_action" varchar,
  	"tooltip_title" varchar,
  	"tooltip_content" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_size" "enum__tips_v_blocks_hero_media_size" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_hero_extended_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_hero_extended" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_hero_extended_background",
  	"variant" "enum__tips_v_blocks_hero_extended_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"background_image_source_id" varchar,
  	"background_image_src" varchar,
  	"background_image_alt" varchar DEFAULT '',
  	"background_image_width" numeric,
  	"background_image_height" numeric,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_size" "enum__tips_v_blocks_hero_extended_media_size" DEFAULT 'wide',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__tips_v_blocks_hero_extended_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__tips_v_blocks_hero_extended_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_rich_text_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_side_by_side_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_side_by_side_small_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_side_by_side_bottom_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_side_by_side_bottom_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_side" "enum__tips_v_blocks_side_by_side_media_side" DEFAULT 'right',
  	"section_eyebrow" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"image_side" "enum__tips_v_blocks_side_by_side_image_side",
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum__tips_v_blocks_side_by_side_background" DEFAULT 'white',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__tips_v_blocks_side_by_side_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__tips_v_blocks_side_by_side_secondary_action_target" DEFAULT '_self',
  	"card_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_story_background",
  	"eyebrow" varchar,
  	"title_gradient" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"body_top" varchar,
  	"quote" varchar,
  	"body_bottom" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum__tips_v_blocks_media_showcase_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar DEFAULT 'wrench',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__tips_v_blocks_feature_grid_background" DEFAULT 'white',
  	"columns" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_agent_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"link_url" varchar,
  	"link_title" varchar,
  	"link_target" "enum__tips_v_blocks_agent_capabilities_items_link_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_agent_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_agent_capabilities_background",
  	"title" varchar,
  	"description" varchar,
  	"content_side" "enum__tips_v_blocks_agent_capabilities_content_side" DEFAULT 'left',
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"info_note" varchar,
  	"preview" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_agent_solutions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__tips_v_blocks_agent_solutions_items_icon" DEFAULT 'headset',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_agent_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_agent_solutions_background",
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_contact_us_background",
  	"title_start" varchar DEFAULT 'Let''s',
  	"title_accent" varchar DEFAULT 'Connect!',
  	"description" varchar,
  	"city" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"logo_source_id" varchar,
  	"logo_src" varchar,
  	"logo_alt" varchar DEFAULT '',
  	"logo_width" numeric,
  	"logo_height" numeric,
  	"form_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_concierge_flow_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_concierge_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_concierge_flow_background",
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__tips_v_blocks_concierge_flow_button_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_enterprise_upgrade_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"included" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_enterprise_upgrade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_enterprise_upgrade_background",
  	"title" varchar,
  	"description" varchar,
  	"table_title" varchar,
  	"left_heading" varchar,
  	"right_heading" varchar,
  	"body_html" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"form_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_channels_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__tips_v_blocks_channels_grid_cards_icon" DEFAULT 'sms',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"full_width" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_channels_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_channels_grid_background",
  	"title" varchar,
  	"gradient_text" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_feature_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__tips_v_blocks_feature_stack_cards_icon" DEFAULT 'network',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_feature_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_feature_stack_background",
  	"title" varchar,
  	"description" varchar,
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_coverage_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__tips_v_blocks_coverage_grid_cards_icon" DEFAULT 'flame',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_coverage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_coverage_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_feature_rows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_feature_rows_background",
  	"variant" "enum__tips_v_blocks_feature_rows_variant" DEFAULT 'capabilities',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_capability_trio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__tips_v_blocks_capability_trio_cards_icon" DEFAULT 'messages-square',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_capability_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_capability_trio_background",
  	"title" varchar,
  	"center_label" varchar DEFAULT 'Deterministic workflow engine',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_capability_tools_cards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_capability_tools_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"extra_tools" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_capability_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_capability_tools_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_use_cases_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__tips_v_blocks_use_cases_grid_cards_icon" DEFAULT 'shopping-cart',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_use_cases_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_use_cases_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_security_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__tips_v_blocks_security_cards_icon" DEFAULT 'database_zap',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_security_background" DEFAULT 'white',
  	"title" varchar,
  	"title_gradient" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_functional_capabilities_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__tips_v_blocks_functional_capabilities_cards_icon" DEFAULT 'filter',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"channels" varchar,
  	"width" "enum__tips_v_blocks_functional_capabilities_cards_width" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_functional_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_functional_capabilities_background",
  	"preset" "enum__tips_v_blocks_functional_capabilities_preset" DEFAULT 'sales',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'How it Works',
  	"gradient_text" varchar DEFAULT 'Works',
  	"subtitle" varchar DEFAULT 'From First Call to Live Agent in Days',
  	"background" "enum__tips_v_blocks_how_it_works_background" DEFAULT 'gray',
  	"open_first" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__tips_v_blocks_how_it_works_button_target" DEFAULT '_self',
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_cta_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__tips_v_blocks_cta_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__tips_v_blocks_cta_secondary_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__tips_v_blocks_metrics_background" DEFAULT 'white',
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_results_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_target" "enum__tips_v_blocks_results_stats_items_link_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_results_stats_background" DEFAULT 'white',
  	"title" varchar,
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"heading" varchar,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_stats_cards_background" DEFAULT 'white',
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_capability_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_capability_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__tips_v_blocks_capability_strip_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_live_in_days_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__tips_v_blocks_live_in_days_items_icon" DEFAULT 'code-xml',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_live_in_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_live_in_days_background",
  	"eyebrow" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_faq_background",
  	"title" varchar,
  	"title_gradient" varchar,
  	"description" varchar,
  	"search_placeholder" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_news_insights_collections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__tips_v_blocks_news_insights_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_tips_v_blocks_news_insights_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_news_insights_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_news_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_news_insights_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"mode" "enum__tips_v_blocks_news_insights_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_content_feed_collections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__tips_v_blocks_content_feed_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_tips_v_blocks_content_feed_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_content_feed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_content_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_content_feed_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"mode" "enum__tips_v_blocks_content_feed_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_pricing_cards_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_pricing_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"accent" "enum__tips_v_blocks_pricing_cards_cards_accent" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__tips_v_blocks_pricing_cards_cards_button_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__tips_v_blocks_pricing_cards_background" DEFAULT 'gray',
  	"info" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_pricing_details_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_pricing_details_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"strong" boolean DEFAULT false,
  	"accent" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"stars" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_pricing_details_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_pricing_details_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__tips_v_blocks_pricing_details_sections_background" DEFAULT 'gray',
  	"variant" "enum__tips_v_blocks_pricing_details_sections_variant" DEFAULT 'default',
  	"title" varchar,
  	"info" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_pricing_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_pricing_details_background",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_difference_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_difference_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_difference_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"left_title" varchar,
  	"right_title" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__tips_v_blocks_difference_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_pain_points_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_title" varchar,
  	"left_description" varchar,
  	"right_title" varchar,
  	"right_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_pain_points_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_pain_points_comparison_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"title" varchar,
  	"show_column_headings" boolean DEFAULT false,
  	"left_heading" varchar DEFAULT 'The Challenge',
  	"right_heading" varchar DEFAULT 'Your AI Agent',
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__tips_v_blocks_pain_points_comparison_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_pricing_policy_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__tips_v_blocks_pricing_policy_callouts_icon" DEFAULT 'wallet',
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_pricing_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_pricing_policy_background" DEFAULT 'white',
  	"title" varchar,
  	"info" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_industry_expertise_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__tips_v_blocks_industry_expertise_items_icon",
  	"custom_icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_industry_expertise_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"source" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_industry_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_industry_expertise_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"visual_type" "enum__tips_v_blocks_industry_expertise_visual_type" DEFAULT 'industry',
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__tips_v_blocks_industry_expertise_button_target" DEFAULT '_self',
  	"hide_bottom_controls" boolean DEFAULT false,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_logo_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_logo_strip_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_integrations_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_integrations_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_integrations_banner_background",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_logo_grid_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"secondary_image_source_id" varchar,
  	"secondary_image_src" varchar,
  	"secondary_image_alt" varchar DEFAULT '',
  	"secondary_image_width" numeric,
  	"secondary_image_height" numeric,
  	"label" varchar,
  	"sub_label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_logo_grid_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_logo_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_tabs_showcase_tabs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_tabs_showcase_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_tabs_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_tabs_showcase_background" DEFAULT 'gray',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"autoplay_seconds" numeric DEFAULT 0,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_anchor_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_anchor_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_anchor_nav_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_source_id" varchar,
  	"author_image_src" varchar,
  	"author_image_alt" varchar DEFAULT '',
  	"author_image_width" numeric,
  	"author_image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_testimonials_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_comparison_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__tips_v_blocks_comparison_grid_cards_action_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_comparison_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__tips_v_blocks_comparison_grid_background",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_use_case_flow_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_use_case_flow_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tips_v_blocks_use_case_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__tips_v_blocks_use_case_flow_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tips_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_content_key" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_tip_card_category" varchar,
  	"version_tip_card_archive_width" numeric DEFAULT 1,
  	"version_tip_card_source_icons" jsonb,
  	"version_published_at" varchar,
  	"version_path" varchar,
  	"version_status" "enum__tips_v_version_status" DEFAULT 'draft',
  	"version_template" "enum__tips_v_version_template" DEFAULT 'tip',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_canonical_url" varchar,
  	"version_seo_robots" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_source_id" varchar,
  	"version_seo_og_image_src" varchar,
  	"version_seo_og_image_alt" varchar DEFAULT '',
  	"version_seo_og_image_width" numeric,
  	"version_seo_og_image_height" numeric,
  	"version_seo_twitter_title" varchar,
  	"version_seo_twitter_description" varchar,
  	"version_seo_twitter_image_source_id" varchar,
  	"version_seo_twitter_image_src" varchar,
  	"version_seo_twitter_image_alt" varchar DEFAULT '',
  	"version_seo_twitter_image_width" numeric,
  	"version_seo_twitter_image_height" numeric,
  	"version_seo_schema_json" jsonb,
  	"version_import_trace" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__tips_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_use_cases_v_blocks_hero_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_hero_background",
  	"variant" "enum__use_cases_v_blocks_hero_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__use_cases_v_blocks_hero_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__use_cases_v_blocks_hero_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"background_image_source_id" varchar,
  	"background_image_src" varchar,
  	"background_image_alt" varchar DEFAULT '',
  	"background_image_width" numeric,
  	"background_image_height" numeric,
  	"tooltip_label" varchar,
  	"tooltip_action" varchar,
  	"tooltip_title" varchar,
  	"tooltip_content" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_size" "enum__use_cases_v_blocks_hero_media_size" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_hero_extended_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_hero_extended" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_hero_extended_background",
  	"variant" "enum__use_cases_v_blocks_hero_extended_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"background_image_source_id" varchar,
  	"background_image_src" varchar,
  	"background_image_alt" varchar DEFAULT '',
  	"background_image_width" numeric,
  	"background_image_height" numeric,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_size" "enum__use_cases_v_blocks_hero_extended_media_size" DEFAULT 'wide',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__use_cases_v_blocks_hero_extended_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__use_cases_v_blocks_hero_extended_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_rich_text_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_side_by_side_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_side_by_side_small_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_side_by_side_bottom_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_side_by_side_bottom_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_side" "enum__use_cases_v_blocks_side_by_side_media_side" DEFAULT 'right',
  	"section_eyebrow" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"image_side" "enum__use_cases_v_blocks_side_by_side_image_side",
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum__use_cases_v_blocks_side_by_side_background" DEFAULT 'white',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__use_cases_v_blocks_side_by_side_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__use_cases_v_blocks_side_by_side_secondary_action_target" DEFAULT '_self',
  	"card_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_story_background",
  	"eyebrow" varchar,
  	"title_gradient" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"body_top" varchar,
  	"quote" varchar,
  	"body_bottom" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum__use_cases_v_blocks_media_showcase_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar DEFAULT 'wrench',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__use_cases_v_blocks_feature_grid_background" DEFAULT 'white',
  	"columns" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_agent_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"link_url" varchar,
  	"link_title" varchar,
  	"link_target" "enum__use_cases_v_blocks_agent_capabilities_items_link_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_agent_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_agent_capabilities_background",
  	"title" varchar,
  	"description" varchar,
  	"content_side" "enum__use_cases_v_blocks_agent_capabilities_content_side" DEFAULT 'left',
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"info_note" varchar,
  	"preview" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_agent_solutions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__use_cases_v_blocks_agent_solutions_items_icon" DEFAULT 'headset',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_agent_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_agent_solutions_background",
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_contact_us_background",
  	"title_start" varchar DEFAULT 'Let''s',
  	"title_accent" varchar DEFAULT 'Connect!',
  	"description" varchar,
  	"city" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"logo_source_id" varchar,
  	"logo_src" varchar,
  	"logo_alt" varchar DEFAULT '',
  	"logo_width" numeric,
  	"logo_height" numeric,
  	"form_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_concierge_flow_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_concierge_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_concierge_flow_background",
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__use_cases_v_blocks_concierge_flow_button_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_enterprise_upgrade_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"included" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_enterprise_upgrade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_enterprise_upgrade_background",
  	"title" varchar,
  	"description" varchar,
  	"table_title" varchar,
  	"left_heading" varchar,
  	"right_heading" varchar,
  	"body_html" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"form_html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_channels_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__use_cases_v_blocks_channels_grid_cards_icon" DEFAULT 'sms',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"full_width" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_channels_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_channels_grid_background",
  	"title" varchar,
  	"gradient_text" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_feature_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__use_cases_v_blocks_feature_stack_cards_icon" DEFAULT 'network',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_feature_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_feature_stack_background",
  	"title" varchar,
  	"description" varchar,
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_coverage_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__use_cases_v_blocks_coverage_grid_cards_icon" DEFAULT 'flame',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_coverage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_coverage_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_feature_rows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_feature_rows_background",
  	"variant" "enum__use_cases_v_blocks_feature_rows_variant" DEFAULT 'capabilities',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_capability_trio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__use_cases_v_blocks_capability_trio_cards_icon" DEFAULT 'messages-square',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_capability_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_capability_trio_background",
  	"title" varchar,
  	"center_label" varchar DEFAULT 'Deterministic workflow engine',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_capability_tools_cards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_capability_tools_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"extra_tools" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_capability_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_capability_tools_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_use_cases_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__use_cases_v_blocks_use_cases_grid_cards_icon" DEFAULT 'shopping-cart',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_use_cases_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_use_cases_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_security_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__use_cases_v_blocks_security_cards_icon" DEFAULT 'database_zap',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_security_background" DEFAULT 'white',
  	"title" varchar,
  	"title_gradient" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_functional_capabilities_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__use_cases_v_blocks_functional_capabilities_cards_icon" DEFAULT 'filter',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"channels" varchar,
  	"width" "enum__use_cases_v_blocks_functional_capabilities_cards_width" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_functional_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_functional_capabilities_background",
  	"preset" "enum__use_cases_v_blocks_functional_capabilities_preset" DEFAULT 'sales',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'How it Works',
  	"gradient_text" varchar DEFAULT 'Works',
  	"subtitle" varchar DEFAULT 'From First Call to Live Agent in Days',
  	"background" "enum__use_cases_v_blocks_how_it_works_background" DEFAULT 'gray',
  	"open_first" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__use_cases_v_blocks_how_it_works_button_target" DEFAULT '_self',
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_cta_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum__use_cases_v_blocks_cta_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum__use_cases_v_blocks_cta_secondary_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__use_cases_v_blocks_metrics_background" DEFAULT 'white',
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_results_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_target" "enum__use_cases_v_blocks_results_stats_items_link_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_results_stats_background" DEFAULT 'white',
  	"title" varchar,
  	"info_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"heading" varchar,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_stats_cards_background" DEFAULT 'white',
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_capability_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_capability_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__use_cases_v_blocks_capability_strip_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_live_in_days_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__use_cases_v_blocks_live_in_days_items_icon" DEFAULT 'code-xml',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_live_in_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_live_in_days_background",
  	"eyebrow" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_faq_background",
  	"title" varchar,
  	"title_gradient" varchar,
  	"description" varchar,
  	"search_placeholder" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_news_insights_collections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__use_cases_v_blocks_news_insights_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_use_cases_v_blocks_news_insights_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_news_insights_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_news_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_news_insights_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"mode" "enum__use_cases_v_blocks_news_insights_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_content_feed_collections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__use_cases_v_blocks_content_feed_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_use_cases_v_blocks_content_feed_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_content_feed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_content_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_content_feed_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"mode" "enum__use_cases_v_blocks_content_feed_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_pricing_cards_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_pricing_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"accent" "enum__use_cases_v_blocks_pricing_cards_cards_accent" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__use_cases_v_blocks_pricing_cards_cards_button_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__use_cases_v_blocks_pricing_cards_background" DEFAULT 'gray',
  	"info" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_pricing_details_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_pricing_details_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"strong" boolean DEFAULT false,
  	"accent" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"stars" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_pricing_details_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_pricing_details_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background" "enum__use_cases_v_blocks_pricing_details_sections_background" DEFAULT 'gray',
  	"variant" "enum__use_cases_v_blocks_pricing_details_sections_variant" DEFAULT 'default',
  	"title" varchar,
  	"info" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_pricing_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_pricing_details_background",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_difference_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_difference_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_difference_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"left_title" varchar,
  	"right_title" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__use_cases_v_blocks_difference_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_pain_points_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_title" varchar,
  	"left_description" varchar,
  	"right_title" varchar,
  	"right_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_pain_points_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_pain_points_comparison_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"title" varchar,
  	"show_column_headings" boolean DEFAULT false,
  	"left_heading" varchar DEFAULT 'The Challenge',
  	"right_heading" varchar DEFAULT 'Your AI Agent',
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__use_cases_v_blocks_pain_points_comparison_action_target" DEFAULT '_self',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_pricing_policy_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__use_cases_v_blocks_pricing_policy_callouts_icon" DEFAULT 'wallet',
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_pricing_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_pricing_policy_background" DEFAULT 'white',
  	"title" varchar,
  	"info" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_industry_expertise_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__use_cases_v_blocks_industry_expertise_items_icon",
  	"custom_icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_industry_expertise_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"source" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_industry_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_industry_expertise_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"visual_type" "enum__use_cases_v_blocks_industry_expertise_visual_type" DEFAULT 'industry',
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum__use_cases_v_blocks_industry_expertise_button_target" DEFAULT '_self',
  	"hide_bottom_controls" boolean DEFAULT false,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_logo_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_logo_strip_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_integrations_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_integrations_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_integrations_banner_background",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_logo_grid_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"secondary_image_source_id" varchar,
  	"secondary_image_src" varchar,
  	"secondary_image_alt" varchar DEFAULT '',
  	"secondary_image_width" numeric,
  	"secondary_image_height" numeric,
  	"label" varchar,
  	"sub_label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_logo_grid_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_logo_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_tabs_showcase_tabs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_tabs_showcase_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_tabs_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_tabs_showcase_background" DEFAULT 'gray',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"autoplay_seconds" numeric DEFAULT 0,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_anchor_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_anchor_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_anchor_nav_background" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_source_id" varchar,
  	"author_image_src" varchar,
  	"author_image_alt" varchar DEFAULT '',
  	"author_image_width" numeric,
  	"author_image_height" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_testimonials_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_comparison_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum__use_cases_v_blocks_comparison_grid_cards_action_target" DEFAULT '_self',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_comparison_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum__use_cases_v_blocks_comparison_grid_background",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_use_case_flow_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_use_case_flow_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_use_cases_v_blocks_use_case_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum__use_cases_v_blocks_use_case_flow_background" DEFAULT 'gray',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_use_cases_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_content_key" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_published_at" varchar,
  	"version_path" varchar,
  	"version_status" "enum__use_cases_v_version_status" DEFAULT 'draft',
  	"version_template" "enum__use_cases_v_version_template" DEFAULT 'use-case',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_canonical_url" varchar,
  	"version_seo_robots" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_source_id" varchar,
  	"version_seo_og_image_src" varchar,
  	"version_seo_og_image_alt" varchar DEFAULT '',
  	"version_seo_og_image_width" numeric,
  	"version_seo_og_image_height" numeric,
  	"version_seo_twitter_title" varchar,
  	"version_seo_twitter_description" varchar,
  	"version_seo_twitter_image_source_id" varchar,
  	"version_seo_twitter_image_src" varchar,
  	"version_seo_twitter_image_alt" varchar DEFAULT '',
  	"version_seo_twitter_image_width" numeric,
  	"version_seo_twitter_image_height" numeric,
  	"version_seo_schema_json" jsonb,
  	"version_import_trace" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__use_cases_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_forms_v_version_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_forms_v_version_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"type" "enum__forms_v_version_fields_type",
  	"required" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_forms_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_intent" "enum__forms_v_version_intent",
  	"version_description" varchar,
  	"version_success_behavior_message" varchar,
  	"version_success_behavior_redirect_path" varchar,
  	"version_notification_config_key" varchar,
  	"version_crm_config_key" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__forms_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_faq_items_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_source_key" varchar,
  	"version_question" varchar,
  	"version_answer" varchar,
  	"version_category" varchar,
  	"version_status" "enum__faq_items_v_version_status" DEFAULT 'draft',
  	"version_sort_order" numeric DEFAULT 0,
  	"version_import_trace" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__faq_items_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_source_key" varchar,
  	"version_quote" varchar,
  	"version_author_name" varchar,
  	"version_author_role" varchar,
  	"version_author_image_id" integer,
  	"version_status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"version_sort_order" numeric DEFAULT 0,
  	"version_import_trace" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_hero_extended" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_rich_text" ALTER COLUMN "html" DROP NOT NULL;
  ALTER TABLE "pages_blocks_side_by_side_bullets" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_side_by_side" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_metrics_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "pages_blocks_metrics_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "pages_blocks_metrics" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_results_stats_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "pages_blocks_results_stats_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "pages_blocks_results_stats" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_stats_cards_items" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_stats_cards_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "pages_blocks_stats_cards_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_stats_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_capability_strip_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_live_in_days_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "pages_blocks_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "pages_blocks_faq" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_news_insights_cards_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_news_insights_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_news_insights_cards" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "pages_blocks_news_insights" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_content_feed_cards_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_content_feed_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_content_feed_cards" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "pages_blocks_content_feed" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_pricing_cards_cards_features" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "pages_blocks_pricing_details_sections_headers" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "pages_blocks_pain_points_comparison" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_pricing_policy_callouts" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "pages_blocks_industry_expertise_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_industry_expertise" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_tabs_showcase_tabs_steps" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "pages_blocks_tabs_showcase_tabs" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_anchor_nav_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_use_case_flow_columns_items" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "path" DROP NOT NULL;
  ALTER TABLE "posts_blocks_hero" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_hero_extended" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_rich_text" ALTER COLUMN "html" DROP NOT NULL;
  ALTER TABLE "posts_blocks_side_by_side_bullets" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_side_by_side" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_cta" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_metrics_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "posts_blocks_metrics_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "posts_blocks_metrics" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_results_stats_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "posts_blocks_results_stats_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "posts_blocks_results_stats" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_stats_cards_items" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "posts_blocks_stats_cards_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "posts_blocks_stats_cards_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "posts_blocks_stats_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_capability_strip_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "posts_blocks_live_in_days_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "posts_blocks_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "posts_blocks_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "posts_blocks_faq" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_news_insights_cards_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "posts_blocks_news_insights_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_news_insights_cards" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "posts_blocks_news_insights" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_content_feed_cards_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "posts_blocks_content_feed_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_content_feed_cards" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "posts_blocks_content_feed" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_pricing_cards_cards_features" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "posts_blocks_pricing_details_sections_headers" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "posts_blocks_pain_points_comparison" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_pricing_policy_callouts" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "posts_blocks_industry_expertise_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_industry_expertise" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts_blocks_tabs_showcase_tabs_steps" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "posts_blocks_tabs_showcase_tabs" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "posts_blocks_anchor_nav_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "posts_blocks_use_case_flow_columns_items" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "posts_article_meta_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "posts" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "posts" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "posts" ALTER COLUMN "path" DROP NOT NULL;
  ALTER TABLE "news_blocks_hero" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_hero_extended" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_rich_text" ALTER COLUMN "html" DROP NOT NULL;
  ALTER TABLE "news_blocks_side_by_side_bullets" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_side_by_side" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_cta" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_metrics_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "news_blocks_metrics_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "news_blocks_metrics" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_results_stats_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "news_blocks_results_stats_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "news_blocks_results_stats" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_stats_cards_items" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "news_blocks_stats_cards_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "news_blocks_stats_cards_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "news_blocks_stats_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_capability_strip_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "news_blocks_live_in_days_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "news_blocks_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "news_blocks_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "news_blocks_faq" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_news_insights_cards_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "news_blocks_news_insights_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_news_insights_cards" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "news_blocks_news_insights" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_content_feed_cards_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "news_blocks_content_feed_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_content_feed_cards" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "news_blocks_content_feed" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_pricing_cards_cards_features" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "news_blocks_pricing_details_sections_headers" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "news_blocks_pain_points_comparison" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_pricing_policy_callouts" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "news_blocks_industry_expertise_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_industry_expertise" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news_blocks_tabs_showcase_tabs_steps" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "news_blocks_tabs_showcase_tabs" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "news_blocks_anchor_nav_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "news_blocks_use_case_flow_columns_items" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "news_article_meta_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "news" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "news" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "news" ALTER COLUMN "path" DROP NOT NULL;
  ALTER TABLE "guides_blocks_hero" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_hero_extended" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_rich_text" ALTER COLUMN "html" DROP NOT NULL;
  ALTER TABLE "guides_blocks_side_by_side_bullets" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_side_by_side" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_cta" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_metrics_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "guides_blocks_metrics_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "guides_blocks_metrics" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_results_stats_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "guides_blocks_results_stats_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "guides_blocks_results_stats" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_stats_cards_items" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "guides_blocks_stats_cards_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "guides_blocks_stats_cards_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "guides_blocks_stats_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_capability_strip_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "guides_blocks_live_in_days_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "guides_blocks_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "guides_blocks_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "guides_blocks_faq" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_news_insights_cards_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "guides_blocks_news_insights_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_news_insights_cards" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "guides_blocks_news_insights" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_content_feed_cards_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "guides_blocks_content_feed_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_content_feed_cards" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "guides_blocks_content_feed" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_pricing_cards_cards_features" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "guides_blocks_pricing_details_sections_headers" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "guides_blocks_pain_points_comparison" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_pricing_policy_callouts" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "guides_blocks_industry_expertise_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_industry_expertise" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides_blocks_tabs_showcase_tabs_steps" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "guides_blocks_tabs_showcase_tabs" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "guides_blocks_anchor_nav_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "guides_blocks_use_case_flow_columns_items" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "guides_article_meta_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "guides" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "guides" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "guides" ALTER COLUMN "path" DROP NOT NULL;
  ALTER TABLE "tips_tip_card_icons" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "tips_blocks_hero" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_hero_extended" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_rich_text" ALTER COLUMN "html" DROP NOT NULL;
  ALTER TABLE "tips_blocks_side_by_side_bullets" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_side_by_side" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_cta" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_metrics_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "tips_blocks_metrics_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "tips_blocks_metrics" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_results_stats_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "tips_blocks_results_stats_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "tips_blocks_results_stats" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_stats_cards_items" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "tips_blocks_stats_cards_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "tips_blocks_stats_cards_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "tips_blocks_stats_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_capability_strip_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "tips_blocks_live_in_days_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "tips_blocks_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "tips_blocks_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "tips_blocks_faq" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_news_insights_cards_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "tips_blocks_news_insights_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_news_insights_cards" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "tips_blocks_news_insights" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_content_feed_cards_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "tips_blocks_content_feed_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_content_feed_cards" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "tips_blocks_content_feed" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_pricing_cards_cards_features" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "tips_blocks_pricing_details_sections_headers" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "tips_blocks_pain_points_comparison" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_pricing_policy_callouts" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "tips_blocks_industry_expertise_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_industry_expertise" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips_blocks_tabs_showcase_tabs_steps" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "tips_blocks_tabs_showcase_tabs" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "tips_blocks_anchor_nav_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "tips_blocks_use_case_flow_columns_items" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "tips" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "tips" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "tips" ALTER COLUMN "path" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_hero" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_hero_extended" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_rich_text" ALTER COLUMN "html" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_side_by_side_bullets" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_side_by_side" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_cta" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_metrics_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_metrics_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_metrics" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_results_stats_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_results_stats_items" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_results_stats" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_stats_cards_items" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_stats_cards_items" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_stats_cards_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_stats_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_capability_strip_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_live_in_days_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_faq" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_news_insights_cards_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_news_insights_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_news_insights_cards" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_news_insights" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_content_feed_cards_tags" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_content_feed_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_content_feed_cards" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_content_feed" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_pricing_cards_cards_features" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_pricing_details_sections_headers" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_pain_points_comparison" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_pricing_policy_callouts" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_industry_expertise_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_industry_expertise" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_tabs_showcase_tabs_steps" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_tabs_showcase_tabs" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_anchor_nav_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "use_cases_blocks_use_case_flow_columns_items" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "use_cases" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "use_cases" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "use_cases" ALTER COLUMN "path" DROP NOT NULL;
  ALTER TABLE "forms_fields" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "forms_fields" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "forms_fields" ALTER COLUMN "type" DROP NOT NULL;
  ALTER TABLE "forms" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "forms" ALTER COLUMN "intent" DROP NOT NULL;
  ALTER TABLE "faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "testimonials" ALTER COLUMN "quote" DROP NOT NULL;
  ALTER TABLE "testimonials" ALTER COLUMN "author_name" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "_status" "enum_pages_status" DEFAULT 'draft';
  ALTER TABLE "posts" ADD COLUMN "_status" "enum_posts_status" DEFAULT 'draft';
  ALTER TABLE "news" ADD COLUMN "_status" "enum_news_status" DEFAULT 'draft';
  ALTER TABLE "guides" ADD COLUMN "_status" "enum_guides_status" DEFAULT 'draft';
  ALTER TABLE "tips" ADD COLUMN "_status" "enum_tips_status" DEFAULT 'draft';
  ALTER TABLE "use_cases" ADD COLUMN "_status" "enum_use_cases_status" DEFAULT 'draft';
  ALTER TABLE "forms" ADD COLUMN "_status" "enum_forms_status" DEFAULT 'draft';
  ALTER TABLE "faq_items" ADD COLUMN "_status" "enum_faq_items_status" DEFAULT 'draft';
  ALTER TABLE "testimonials" ADD COLUMN "_status" "enum_testimonials_status" DEFAULT 'draft';
  UPDATE "pages" SET "_status" = "status";
  UPDATE "posts" SET "_status" = "status";
  UPDATE "news" SET "_status" = "status";
  UPDATE "guides" SET "_status" = "status";
  UPDATE "tips" SET "_status" = "status";
  UPDATE "use_cases" SET "_status" = "status";
  UPDATE "faq_items" SET "_status" = "status";
  UPDATE "testimonials" SET "_status" = "status";
  UPDATE "forms" SET "_status" = 'published';
  ALTER TABLE "_media_v" ADD CONSTRAINT "_media_v_parent_id_media_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_cards" ADD CONSTRAINT "_pages_v_blocks_hero_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_extended_cards" ADD CONSTRAINT "_pages_v_blocks_hero_extended_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_extended"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_extended" ADD CONSTRAINT "_pages_v_blocks_hero_extended_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_side_by_side_bullets" ADD CONSTRAINT "_pages_v_blocks_side_by_side_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_side_by_side_small_icons" ADD CONSTRAINT "_pages_v_blocks_side_by_side_small_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_side_by_side_bottom_cards_items" ADD CONSTRAINT "_pages_v_blocks_side_by_side_bottom_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_side_by_side_bottom_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_side_by_side_bottom_cards" ADD CONSTRAINT "_pages_v_blocks_side_by_side_bottom_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_side_by_side" ADD CONSTRAINT "_pages_v_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_cards" ADD CONSTRAINT "_pages_v_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story" ADD CONSTRAINT "_pages_v_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_showcase" ADD CONSTRAINT "_pages_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_cards" ADD CONSTRAINT "_pages_v_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_agent_capabilities_items" ADD CONSTRAINT "_pages_v_blocks_agent_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_agent_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_agent_capabilities" ADD CONSTRAINT "_pages_v_blocks_agent_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_agent_solutions_items" ADD CONSTRAINT "_pages_v_blocks_agent_solutions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_agent_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_agent_solutions" ADD CONSTRAINT "_pages_v_blocks_agent_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us" ADD CONSTRAINT "_pages_v_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_concierge_flow_cards" ADD CONSTRAINT "_pages_v_blocks_concierge_flow_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_concierge_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_concierge_flow" ADD CONSTRAINT "_pages_v_blocks_concierge_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enterprise_upgrade_benefits" ADD CONSTRAINT "_pages_v_blocks_enterprise_upgrade_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_enterprise_upgrade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enterprise_upgrade" ADD CONSTRAINT "_pages_v_blocks_enterprise_upgrade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_channels_grid_cards" ADD CONSTRAINT "_pages_v_blocks_channels_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_channels_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_channels_grid" ADD CONSTRAINT "_pages_v_blocks_channels_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_stack_cards" ADD CONSTRAINT "_pages_v_blocks_feature_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_stack" ADD CONSTRAINT "_pages_v_blocks_feature_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_coverage_grid_cards" ADD CONSTRAINT "_pages_v_blocks_coverage_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_coverage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_coverage_grid" ADD CONSTRAINT "_pages_v_blocks_coverage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_rows_rows" ADD CONSTRAINT "_pages_v_blocks_feature_rows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_rows" ADD CONSTRAINT "_pages_v_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capability_trio_cards" ADD CONSTRAINT "_pages_v_blocks_capability_trio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_capability_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capability_trio" ADD CONSTRAINT "_pages_v_blocks_capability_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capability_tools_cards_logos" ADD CONSTRAINT "_pages_v_blocks_capability_tools_cards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_capability_tools_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capability_tools_cards" ADD CONSTRAINT "_pages_v_blocks_capability_tools_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_capability_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capability_tools" ADD CONSTRAINT "_pages_v_blocks_capability_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_use_cases_grid_cards" ADD CONSTRAINT "_pages_v_blocks_use_cases_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_use_cases_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_use_cases_grid" ADD CONSTRAINT "_pages_v_blocks_use_cases_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_security_cards" ADD CONSTRAINT "_pages_v_blocks_security_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_security" ADD CONSTRAINT "_pages_v_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_functional_capabilities_cards" ADD CONSTRAINT "_pages_v_blocks_functional_capabilities_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_functional_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_functional_capabilities" ADD CONSTRAINT "_pages_v_blocks_functional_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" ADD CONSTRAINT "_pages_v_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works" ADD CONSTRAINT "_pages_v_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics_items" ADD CONSTRAINT "_pages_v_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics" ADD CONSTRAINT "_pages_v_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_results_stats_items" ADD CONSTRAINT "_pages_v_blocks_results_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_results_stats" ADD CONSTRAINT "_pages_v_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_cards_items" ADD CONSTRAINT "_pages_v_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_cards" ADD CONSTRAINT "_pages_v_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capability_strip_items" ADD CONSTRAINT "_pages_v_blocks_capability_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_capability_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capability_strip" ADD CONSTRAINT "_pages_v_blocks_capability_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_live_in_days_items" ADD CONSTRAINT "_pages_v_blocks_live_in_days_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_live_in_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_live_in_days" ADD CONSTRAINT "_pages_v_blocks_live_in_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_insights_collections" ADD CONSTRAINT "_pages_v_blocks_news_insights_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_insights_cards_tags" ADD CONSTRAINT "_pages_v_blocks_news_insights_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_news_insights_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_insights_cards" ADD CONSTRAINT "_pages_v_blocks_news_insights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_news_insights" ADD CONSTRAINT "_pages_v_blocks_news_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_feed_collections" ADD CONSTRAINT "_pages_v_blocks_content_feed_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_feed_cards_tags" ADD CONSTRAINT "_pages_v_blocks_content_feed_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_feed_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_feed_cards" ADD CONSTRAINT "_pages_v_blocks_content_feed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_feed" ADD CONSTRAINT "_pages_v_blocks_content_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_cards_cards_features" ADD CONSTRAINT "_pages_v_blocks_pricing_cards_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_cards_cards" ADD CONSTRAINT "_pages_v_blocks_pricing_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_cards" ADD CONSTRAINT "_pages_v_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_details_sections_headers" ADD CONSTRAINT "_pages_v_blocks_pricing_details_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_details_sections_rows_cells" ADD CONSTRAINT "_pages_v_blocks_pricing_details_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_details_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_details_sections_rows" ADD CONSTRAINT "_pages_v_blocks_pricing_details_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_details_sections" ADD CONSTRAINT "_pages_v_blocks_pricing_details_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_details" ADD CONSTRAINT "_pages_v_blocks_pricing_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_difference_left_items" ADD CONSTRAINT "_pages_v_blocks_difference_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_difference_right_items" ADD CONSTRAINT "_pages_v_blocks_difference_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_difference" ADD CONSTRAINT "_pages_v_blocks_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pain_points_comparison_rows" ADD CONSTRAINT "_pages_v_blocks_pain_points_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pain_points_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pain_points_comparison" ADD CONSTRAINT "_pages_v_blocks_pain_points_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_policy_callouts" ADD CONSTRAINT "_pages_v_blocks_pricing_policy_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_policy" ADD CONSTRAINT "_pages_v_blocks_pricing_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_industry_expertise_items" ADD CONSTRAINT "_pages_v_blocks_industry_expertise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_industry_expertise_info_cards" ADD CONSTRAINT "_pages_v_blocks_industry_expertise_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_industry_expertise" ADD CONSTRAINT "_pages_v_blocks_industry_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_strip_logos" ADD CONSTRAINT "_pages_v_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_strip_stats" ADD CONSTRAINT "_pages_v_blocks_logo_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_strip" ADD CONSTRAINT "_pages_v_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_integrations_banner_items" ADD CONSTRAINT "_pages_v_blocks_integrations_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_integrations_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_integrations_banner" ADD CONSTRAINT "_pages_v_blocks_integrations_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_grid_columns_items" ADD CONSTRAINT "_pages_v_blocks_logo_grid_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_grid_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_grid_columns" ADD CONSTRAINT "_pages_v_blocks_logo_grid_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_grid" ADD CONSTRAINT "_pages_v_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_showcase_tabs_steps" ADD CONSTRAINT "_pages_v_blocks_tabs_showcase_tabs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs_showcase_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_showcase_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_showcase_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_showcase" ADD CONSTRAINT "_pages_v_blocks_tabs_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_anchor_nav_items" ADD CONSTRAINT "_pages_v_blocks_anchor_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_anchor_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_anchor_nav" ADD CONSTRAINT "_pages_v_blocks_anchor_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_grid_cards" ADD CONSTRAINT "_pages_v_blocks_comparison_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_grid" ADD CONSTRAINT "_pages_v_blocks_comparison_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_use_case_flow_columns_items" ADD CONSTRAINT "_pages_v_blocks_use_case_flow_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_use_case_flow_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_use_case_flow_columns" ADD CONSTRAINT "_pages_v_blocks_use_case_flow_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_use_case_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_use_case_flow" ADD CONSTRAINT "_pages_v_blocks_use_case_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_cards" ADD CONSTRAINT "_posts_v_blocks_hero_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero" ADD CONSTRAINT "_posts_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_extended_cards" ADD CONSTRAINT "_posts_v_blocks_hero_extended_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero_extended"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_extended" ADD CONSTRAINT "_posts_v_blocks_hero_extended_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text" ADD CONSTRAINT "_posts_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_side_by_side_bullets" ADD CONSTRAINT "_posts_v_blocks_side_by_side_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_side_by_side_small_icons" ADD CONSTRAINT "_posts_v_blocks_side_by_side_small_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_side_by_side_bottom_cards_items" ADD CONSTRAINT "_posts_v_blocks_side_by_side_bottom_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_side_by_side_bottom_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_side_by_side_bottom_cards" ADD CONSTRAINT "_posts_v_blocks_side_by_side_bottom_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_side_by_side" ADD CONSTRAINT "_posts_v_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_story_cards" ADD CONSTRAINT "_posts_v_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_story" ADD CONSTRAINT "_posts_v_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_showcase" ADD CONSTRAINT "_posts_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_grid_cards" ADD CONSTRAINT "_posts_v_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_grid" ADD CONSTRAINT "_posts_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_agent_capabilities_items" ADD CONSTRAINT "_posts_v_blocks_agent_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_agent_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_agent_capabilities" ADD CONSTRAINT "_posts_v_blocks_agent_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_agent_solutions_items" ADD CONSTRAINT "_posts_v_blocks_agent_solutions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_agent_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_agent_solutions" ADD CONSTRAINT "_posts_v_blocks_agent_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_contact_us" ADD CONSTRAINT "_posts_v_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_concierge_flow_cards" ADD CONSTRAINT "_posts_v_blocks_concierge_flow_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_concierge_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_concierge_flow" ADD CONSTRAINT "_posts_v_blocks_concierge_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_enterprise_upgrade_benefits" ADD CONSTRAINT "_posts_v_blocks_enterprise_upgrade_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_enterprise_upgrade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_enterprise_upgrade" ADD CONSTRAINT "_posts_v_blocks_enterprise_upgrade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_channels_grid_cards" ADD CONSTRAINT "_posts_v_blocks_channels_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_channels_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_channels_grid" ADD CONSTRAINT "_posts_v_blocks_channels_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_stack_cards" ADD CONSTRAINT "_posts_v_blocks_feature_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_feature_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_stack" ADD CONSTRAINT "_posts_v_blocks_feature_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_coverage_grid_cards" ADD CONSTRAINT "_posts_v_blocks_coverage_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_coverage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_coverage_grid" ADD CONSTRAINT "_posts_v_blocks_coverage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_rows_rows" ADD CONSTRAINT "_posts_v_blocks_feature_rows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_feature_rows" ADD CONSTRAINT "_posts_v_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_capability_trio_cards" ADD CONSTRAINT "_posts_v_blocks_capability_trio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_capability_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_capability_trio" ADD CONSTRAINT "_posts_v_blocks_capability_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_capability_tools_cards_logos" ADD CONSTRAINT "_posts_v_blocks_capability_tools_cards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_capability_tools_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_capability_tools_cards" ADD CONSTRAINT "_posts_v_blocks_capability_tools_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_capability_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_capability_tools" ADD CONSTRAINT "_posts_v_blocks_capability_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_use_cases_grid_cards" ADD CONSTRAINT "_posts_v_blocks_use_cases_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_use_cases_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_use_cases_grid" ADD CONSTRAINT "_posts_v_blocks_use_cases_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_security_cards" ADD CONSTRAINT "_posts_v_blocks_security_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_security" ADD CONSTRAINT "_posts_v_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_functional_capabilities_cards" ADD CONSTRAINT "_posts_v_blocks_functional_capabilities_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_functional_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_functional_capabilities" ADD CONSTRAINT "_posts_v_blocks_functional_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_how_it_works_steps" ADD CONSTRAINT "_posts_v_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_how_it_works" ADD CONSTRAINT "_posts_v_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta" ADD CONSTRAINT "_posts_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_metrics_items" ADD CONSTRAINT "_posts_v_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_metrics" ADD CONSTRAINT "_posts_v_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_results_stats_items" ADD CONSTRAINT "_posts_v_blocks_results_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_results_stats" ADD CONSTRAINT "_posts_v_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_cards_items" ADD CONSTRAINT "_posts_v_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_cards" ADD CONSTRAINT "_posts_v_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_capability_strip_items" ADD CONSTRAINT "_posts_v_blocks_capability_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_capability_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_capability_strip" ADD CONSTRAINT "_posts_v_blocks_capability_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_live_in_days_items" ADD CONSTRAINT "_posts_v_blocks_live_in_days_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_live_in_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_live_in_days" ADD CONSTRAINT "_posts_v_blocks_live_in_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_items" ADD CONSTRAINT "_posts_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq" ADD CONSTRAINT "_posts_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_news_insights_collections" ADD CONSTRAINT "_posts_v_blocks_news_insights_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_news_insights_cards_tags" ADD CONSTRAINT "_posts_v_blocks_news_insights_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_news_insights_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_news_insights_cards" ADD CONSTRAINT "_posts_v_blocks_news_insights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_news_insights" ADD CONSTRAINT "_posts_v_blocks_news_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_content_feed_collections" ADD CONSTRAINT "_posts_v_blocks_content_feed_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_content_feed_cards_tags" ADD CONSTRAINT "_posts_v_blocks_content_feed_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_content_feed_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_content_feed_cards" ADD CONSTRAINT "_posts_v_blocks_content_feed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_content_feed" ADD CONSTRAINT "_posts_v_blocks_content_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_cards_cards_features" ADD CONSTRAINT "_posts_v_blocks_pricing_cards_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_pricing_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_cards_cards" ADD CONSTRAINT "_posts_v_blocks_pricing_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_cards" ADD CONSTRAINT "_posts_v_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_details_sections_headers" ADD CONSTRAINT "_posts_v_blocks_pricing_details_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_details_sections_rows_cells" ADD CONSTRAINT "_posts_v_blocks_pricing_details_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_pricing_details_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_details_sections_rows" ADD CONSTRAINT "_posts_v_blocks_pricing_details_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_details_sections" ADD CONSTRAINT "_posts_v_blocks_pricing_details_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_pricing_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_details" ADD CONSTRAINT "_posts_v_blocks_pricing_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_difference_left_items" ADD CONSTRAINT "_posts_v_blocks_difference_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_difference_right_items" ADD CONSTRAINT "_posts_v_blocks_difference_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_difference" ADD CONSTRAINT "_posts_v_blocks_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pain_points_comparison_rows" ADD CONSTRAINT "_posts_v_blocks_pain_points_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_pain_points_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pain_points_comparison" ADD CONSTRAINT "_posts_v_blocks_pain_points_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_policy_callouts" ADD CONSTRAINT "_posts_v_blocks_pricing_policy_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_pricing_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_policy" ADD CONSTRAINT "_posts_v_blocks_pricing_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_industry_expertise_items" ADD CONSTRAINT "_posts_v_blocks_industry_expertise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_industry_expertise_info_cards" ADD CONSTRAINT "_posts_v_blocks_industry_expertise_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_industry_expertise" ADD CONSTRAINT "_posts_v_blocks_industry_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_strip_logos" ADD CONSTRAINT "_posts_v_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_strip_stats" ADD CONSTRAINT "_posts_v_blocks_logo_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_strip" ADD CONSTRAINT "_posts_v_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_integrations_banner_items" ADD CONSTRAINT "_posts_v_blocks_integrations_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_integrations_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_integrations_banner" ADD CONSTRAINT "_posts_v_blocks_integrations_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_grid_columns_items" ADD CONSTRAINT "_posts_v_blocks_logo_grid_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_logo_grid_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_grid_columns" ADD CONSTRAINT "_posts_v_blocks_logo_grid_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_grid" ADD CONSTRAINT "_posts_v_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_tabs_showcase_tabs_steps" ADD CONSTRAINT "_posts_v_blocks_tabs_showcase_tabs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_tabs_showcase_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_tabs_showcase_tabs" ADD CONSTRAINT "_posts_v_blocks_tabs_showcase_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_tabs_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_tabs_showcase" ADD CONSTRAINT "_posts_v_blocks_tabs_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_anchor_nav_items" ADD CONSTRAINT "_posts_v_blocks_anchor_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_anchor_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_anchor_nav" ADD CONSTRAINT "_posts_v_blocks_anchor_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials_items" ADD CONSTRAINT "_posts_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials" ADD CONSTRAINT "_posts_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_comparison_grid_cards" ADD CONSTRAINT "_posts_v_blocks_comparison_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_comparison_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_comparison_grid" ADD CONSTRAINT "_posts_v_blocks_comparison_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_use_case_flow_columns_items" ADD CONSTRAINT "_posts_v_blocks_use_case_flow_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_use_case_flow_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_use_case_flow_columns" ADD CONSTRAINT "_posts_v_blocks_use_case_flow_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_use_case_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_use_case_flow" ADD CONSTRAINT "_posts_v_blocks_use_case_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_article_meta_tags" ADD CONSTRAINT "_posts_v_version_article_meta_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_hero_cards" ADD CONSTRAINT "_news_v_blocks_hero_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_hero" ADD CONSTRAINT "_news_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_hero_extended_cards" ADD CONSTRAINT "_news_v_blocks_hero_extended_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_hero_extended"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_hero_extended" ADD CONSTRAINT "_news_v_blocks_hero_extended_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_rich_text" ADD CONSTRAINT "_news_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_side_by_side_bullets" ADD CONSTRAINT "_news_v_blocks_side_by_side_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_side_by_side_small_icons" ADD CONSTRAINT "_news_v_blocks_side_by_side_small_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_side_by_side_bottom_cards_items" ADD CONSTRAINT "_news_v_blocks_side_by_side_bottom_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_side_by_side_bottom_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_side_by_side_bottom_cards" ADD CONSTRAINT "_news_v_blocks_side_by_side_bottom_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_side_by_side" ADD CONSTRAINT "_news_v_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_story_cards" ADD CONSTRAINT "_news_v_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_story" ADD CONSTRAINT "_news_v_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_media_showcase" ADD CONSTRAINT "_news_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_feature_grid_cards" ADD CONSTRAINT "_news_v_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_feature_grid" ADD CONSTRAINT "_news_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_agent_capabilities_items" ADD CONSTRAINT "_news_v_blocks_agent_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_agent_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_agent_capabilities" ADD CONSTRAINT "_news_v_blocks_agent_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_agent_solutions_items" ADD CONSTRAINT "_news_v_blocks_agent_solutions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_agent_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_agent_solutions" ADD CONSTRAINT "_news_v_blocks_agent_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_contact_us" ADD CONSTRAINT "_news_v_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_concierge_flow_cards" ADD CONSTRAINT "_news_v_blocks_concierge_flow_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_concierge_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_concierge_flow" ADD CONSTRAINT "_news_v_blocks_concierge_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_enterprise_upgrade_benefits" ADD CONSTRAINT "_news_v_blocks_enterprise_upgrade_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_enterprise_upgrade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_enterprise_upgrade" ADD CONSTRAINT "_news_v_blocks_enterprise_upgrade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_channels_grid_cards" ADD CONSTRAINT "_news_v_blocks_channels_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_channels_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_channels_grid" ADD CONSTRAINT "_news_v_blocks_channels_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_feature_stack_cards" ADD CONSTRAINT "_news_v_blocks_feature_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_feature_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_feature_stack" ADD CONSTRAINT "_news_v_blocks_feature_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_coverage_grid_cards" ADD CONSTRAINT "_news_v_blocks_coverage_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_coverage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_coverage_grid" ADD CONSTRAINT "_news_v_blocks_coverage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_feature_rows_rows" ADD CONSTRAINT "_news_v_blocks_feature_rows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_feature_rows" ADD CONSTRAINT "_news_v_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_capability_trio_cards" ADD CONSTRAINT "_news_v_blocks_capability_trio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_capability_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_capability_trio" ADD CONSTRAINT "_news_v_blocks_capability_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_capability_tools_cards_logos" ADD CONSTRAINT "_news_v_blocks_capability_tools_cards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_capability_tools_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_capability_tools_cards" ADD CONSTRAINT "_news_v_blocks_capability_tools_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_capability_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_capability_tools" ADD CONSTRAINT "_news_v_blocks_capability_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_use_cases_grid_cards" ADD CONSTRAINT "_news_v_blocks_use_cases_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_use_cases_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_use_cases_grid" ADD CONSTRAINT "_news_v_blocks_use_cases_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_security_cards" ADD CONSTRAINT "_news_v_blocks_security_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_security" ADD CONSTRAINT "_news_v_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_functional_capabilities_cards" ADD CONSTRAINT "_news_v_blocks_functional_capabilities_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_functional_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_functional_capabilities" ADD CONSTRAINT "_news_v_blocks_functional_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_how_it_works_steps" ADD CONSTRAINT "_news_v_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_how_it_works" ADD CONSTRAINT "_news_v_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_cta" ADD CONSTRAINT "_news_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_metrics_items" ADD CONSTRAINT "_news_v_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_metrics" ADD CONSTRAINT "_news_v_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_results_stats_items" ADD CONSTRAINT "_news_v_blocks_results_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_results_stats" ADD CONSTRAINT "_news_v_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_stats_cards_items" ADD CONSTRAINT "_news_v_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_stats_cards" ADD CONSTRAINT "_news_v_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_capability_strip_items" ADD CONSTRAINT "_news_v_blocks_capability_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_capability_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_capability_strip" ADD CONSTRAINT "_news_v_blocks_capability_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_live_in_days_items" ADD CONSTRAINT "_news_v_blocks_live_in_days_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_live_in_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_live_in_days" ADD CONSTRAINT "_news_v_blocks_live_in_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_faq_items" ADD CONSTRAINT "_news_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_faq" ADD CONSTRAINT "_news_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_news_insights_collections" ADD CONSTRAINT "_news_v_blocks_news_insights_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_news_insights_cards_tags" ADD CONSTRAINT "_news_v_blocks_news_insights_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_news_insights_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_news_insights_cards" ADD CONSTRAINT "_news_v_blocks_news_insights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_news_insights" ADD CONSTRAINT "_news_v_blocks_news_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_content_feed_collections" ADD CONSTRAINT "_news_v_blocks_content_feed_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_content_feed_cards_tags" ADD CONSTRAINT "_news_v_blocks_content_feed_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_content_feed_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_content_feed_cards" ADD CONSTRAINT "_news_v_blocks_content_feed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_content_feed" ADD CONSTRAINT "_news_v_blocks_content_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_pricing_cards_cards_features" ADD CONSTRAINT "_news_v_blocks_pricing_cards_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_pricing_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_pricing_cards_cards" ADD CONSTRAINT "_news_v_blocks_pricing_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_pricing_cards" ADD CONSTRAINT "_news_v_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_pricing_details_sections_headers" ADD CONSTRAINT "_news_v_blocks_pricing_details_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_pricing_details_sections_rows_cells" ADD CONSTRAINT "_news_v_blocks_pricing_details_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_pricing_details_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_pricing_details_sections_rows" ADD CONSTRAINT "_news_v_blocks_pricing_details_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_pricing_details_sections" ADD CONSTRAINT "_news_v_blocks_pricing_details_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_pricing_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_pricing_details" ADD CONSTRAINT "_news_v_blocks_pricing_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_difference_left_items" ADD CONSTRAINT "_news_v_blocks_difference_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_difference_right_items" ADD CONSTRAINT "_news_v_blocks_difference_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_difference" ADD CONSTRAINT "_news_v_blocks_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_pain_points_comparison_rows" ADD CONSTRAINT "_news_v_blocks_pain_points_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_pain_points_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_pain_points_comparison" ADD CONSTRAINT "_news_v_blocks_pain_points_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_pricing_policy_callouts" ADD CONSTRAINT "_news_v_blocks_pricing_policy_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_pricing_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_pricing_policy" ADD CONSTRAINT "_news_v_blocks_pricing_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_industry_expertise_items" ADD CONSTRAINT "_news_v_blocks_industry_expertise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_industry_expertise_info_cards" ADD CONSTRAINT "_news_v_blocks_industry_expertise_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_industry_expertise" ADD CONSTRAINT "_news_v_blocks_industry_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_logo_strip_logos" ADD CONSTRAINT "_news_v_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_logo_strip_stats" ADD CONSTRAINT "_news_v_blocks_logo_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_logo_strip" ADD CONSTRAINT "_news_v_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_integrations_banner_items" ADD CONSTRAINT "_news_v_blocks_integrations_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_integrations_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_integrations_banner" ADD CONSTRAINT "_news_v_blocks_integrations_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_logo_grid_columns_items" ADD CONSTRAINT "_news_v_blocks_logo_grid_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_logo_grid_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_logo_grid_columns" ADD CONSTRAINT "_news_v_blocks_logo_grid_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_logo_grid" ADD CONSTRAINT "_news_v_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_tabs_showcase_tabs_steps" ADD CONSTRAINT "_news_v_blocks_tabs_showcase_tabs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_tabs_showcase_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_tabs_showcase_tabs" ADD CONSTRAINT "_news_v_blocks_tabs_showcase_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_tabs_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_tabs_showcase" ADD CONSTRAINT "_news_v_blocks_tabs_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_anchor_nav_items" ADD CONSTRAINT "_news_v_blocks_anchor_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_anchor_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_anchor_nav" ADD CONSTRAINT "_news_v_blocks_anchor_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_testimonials_items" ADD CONSTRAINT "_news_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_testimonials" ADD CONSTRAINT "_news_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_comparison_grid_cards" ADD CONSTRAINT "_news_v_blocks_comparison_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_comparison_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_comparison_grid" ADD CONSTRAINT "_news_v_blocks_comparison_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_use_case_flow_columns_items" ADD CONSTRAINT "_news_v_blocks_use_case_flow_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_use_case_flow_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_use_case_flow_columns" ADD CONSTRAINT "_news_v_blocks_use_case_flow_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v_blocks_use_case_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_blocks_use_case_flow" ADD CONSTRAINT "_news_v_blocks_use_case_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_article_meta_tags" ADD CONSTRAINT "_news_v_version_article_meta_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_hero_cards" ADD CONSTRAINT "_guides_v_blocks_hero_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_hero" ADD CONSTRAINT "_guides_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_hero_extended_cards" ADD CONSTRAINT "_guides_v_blocks_hero_extended_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_hero_extended"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_hero_extended" ADD CONSTRAINT "_guides_v_blocks_hero_extended_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_rich_text" ADD CONSTRAINT "_guides_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_side_by_side_bullets" ADD CONSTRAINT "_guides_v_blocks_side_by_side_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_side_by_side_small_icons" ADD CONSTRAINT "_guides_v_blocks_side_by_side_small_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_side_by_side_bottom_cards_items" ADD CONSTRAINT "_guides_v_blocks_side_by_side_bottom_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_side_by_side_bottom_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_side_by_side_bottom_cards" ADD CONSTRAINT "_guides_v_blocks_side_by_side_bottom_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_side_by_side" ADD CONSTRAINT "_guides_v_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_story_cards" ADD CONSTRAINT "_guides_v_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_story" ADD CONSTRAINT "_guides_v_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_media_showcase" ADD CONSTRAINT "_guides_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_feature_grid_cards" ADD CONSTRAINT "_guides_v_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_feature_grid" ADD CONSTRAINT "_guides_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_agent_capabilities_items" ADD CONSTRAINT "_guides_v_blocks_agent_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_agent_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_agent_capabilities" ADD CONSTRAINT "_guides_v_blocks_agent_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_agent_solutions_items" ADD CONSTRAINT "_guides_v_blocks_agent_solutions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_agent_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_agent_solutions" ADD CONSTRAINT "_guides_v_blocks_agent_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_contact_us" ADD CONSTRAINT "_guides_v_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_concierge_flow_cards" ADD CONSTRAINT "_guides_v_blocks_concierge_flow_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_concierge_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_concierge_flow" ADD CONSTRAINT "_guides_v_blocks_concierge_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_enterprise_upgrade_benefits" ADD CONSTRAINT "_guides_v_blocks_enterprise_upgrade_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_enterprise_upgrade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_enterprise_upgrade" ADD CONSTRAINT "_guides_v_blocks_enterprise_upgrade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_channels_grid_cards" ADD CONSTRAINT "_guides_v_blocks_channels_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_channels_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_channels_grid" ADD CONSTRAINT "_guides_v_blocks_channels_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_feature_stack_cards" ADD CONSTRAINT "_guides_v_blocks_feature_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_feature_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_feature_stack" ADD CONSTRAINT "_guides_v_blocks_feature_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_coverage_grid_cards" ADD CONSTRAINT "_guides_v_blocks_coverage_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_coverage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_coverage_grid" ADD CONSTRAINT "_guides_v_blocks_coverage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_feature_rows_rows" ADD CONSTRAINT "_guides_v_blocks_feature_rows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_feature_rows" ADD CONSTRAINT "_guides_v_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_capability_trio_cards" ADD CONSTRAINT "_guides_v_blocks_capability_trio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_capability_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_capability_trio" ADD CONSTRAINT "_guides_v_blocks_capability_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_capability_tools_cards_logos" ADD CONSTRAINT "_guides_v_blocks_capability_tools_cards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_capability_tools_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_capability_tools_cards" ADD CONSTRAINT "_guides_v_blocks_capability_tools_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_capability_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_capability_tools" ADD CONSTRAINT "_guides_v_blocks_capability_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_use_cases_grid_cards" ADD CONSTRAINT "_guides_v_blocks_use_cases_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_use_cases_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_use_cases_grid" ADD CONSTRAINT "_guides_v_blocks_use_cases_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_security_cards" ADD CONSTRAINT "_guides_v_blocks_security_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_security" ADD CONSTRAINT "_guides_v_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_functional_capabilities_cards" ADD CONSTRAINT "_guides_v_blocks_functional_capabilities_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_functional_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_functional_capabilities" ADD CONSTRAINT "_guides_v_blocks_functional_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_how_it_works_steps" ADD CONSTRAINT "_guides_v_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_how_it_works" ADD CONSTRAINT "_guides_v_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_cta" ADD CONSTRAINT "_guides_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_metrics_items" ADD CONSTRAINT "_guides_v_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_metrics" ADD CONSTRAINT "_guides_v_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_results_stats_items" ADD CONSTRAINT "_guides_v_blocks_results_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_results_stats" ADD CONSTRAINT "_guides_v_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_stats_cards_items" ADD CONSTRAINT "_guides_v_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_stats_cards" ADD CONSTRAINT "_guides_v_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_capability_strip_items" ADD CONSTRAINT "_guides_v_blocks_capability_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_capability_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_capability_strip" ADD CONSTRAINT "_guides_v_blocks_capability_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_live_in_days_items" ADD CONSTRAINT "_guides_v_blocks_live_in_days_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_live_in_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_live_in_days" ADD CONSTRAINT "_guides_v_blocks_live_in_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_faq_items" ADD CONSTRAINT "_guides_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_faq" ADD CONSTRAINT "_guides_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_news_insights_collections" ADD CONSTRAINT "_guides_v_blocks_news_insights_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_guides_v_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_news_insights_cards_tags" ADD CONSTRAINT "_guides_v_blocks_news_insights_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_news_insights_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_news_insights_cards" ADD CONSTRAINT "_guides_v_blocks_news_insights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_news_insights" ADD CONSTRAINT "_guides_v_blocks_news_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_content_feed_collections" ADD CONSTRAINT "_guides_v_blocks_content_feed_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_guides_v_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_content_feed_cards_tags" ADD CONSTRAINT "_guides_v_blocks_content_feed_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_content_feed_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_content_feed_cards" ADD CONSTRAINT "_guides_v_blocks_content_feed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_content_feed" ADD CONSTRAINT "_guides_v_blocks_content_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_pricing_cards_cards_features" ADD CONSTRAINT "_guides_v_blocks_pricing_cards_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_pricing_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_pricing_cards_cards" ADD CONSTRAINT "_guides_v_blocks_pricing_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_pricing_cards" ADD CONSTRAINT "_guides_v_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_pricing_details_sections_headers" ADD CONSTRAINT "_guides_v_blocks_pricing_details_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_pricing_details_sections_rows_cells" ADD CONSTRAINT "_guides_v_blocks_pricing_details_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_pricing_details_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_pricing_details_sections_rows" ADD CONSTRAINT "_guides_v_blocks_pricing_details_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_pricing_details_sections" ADD CONSTRAINT "_guides_v_blocks_pricing_details_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_pricing_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_pricing_details" ADD CONSTRAINT "_guides_v_blocks_pricing_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_difference_left_items" ADD CONSTRAINT "_guides_v_blocks_difference_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_difference_right_items" ADD CONSTRAINT "_guides_v_blocks_difference_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_difference" ADD CONSTRAINT "_guides_v_blocks_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_pain_points_comparison_rows" ADD CONSTRAINT "_guides_v_blocks_pain_points_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_pain_points_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_pain_points_comparison" ADD CONSTRAINT "_guides_v_blocks_pain_points_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_pricing_policy_callouts" ADD CONSTRAINT "_guides_v_blocks_pricing_policy_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_pricing_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_pricing_policy" ADD CONSTRAINT "_guides_v_blocks_pricing_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_industry_expertise_items" ADD CONSTRAINT "_guides_v_blocks_industry_expertise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_industry_expertise_info_cards" ADD CONSTRAINT "_guides_v_blocks_industry_expertise_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_industry_expertise" ADD CONSTRAINT "_guides_v_blocks_industry_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_logo_strip_logos" ADD CONSTRAINT "_guides_v_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_logo_strip_stats" ADD CONSTRAINT "_guides_v_blocks_logo_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_logo_strip" ADD CONSTRAINT "_guides_v_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_integrations_banner_items" ADD CONSTRAINT "_guides_v_blocks_integrations_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_integrations_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_integrations_banner" ADD CONSTRAINT "_guides_v_blocks_integrations_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_logo_grid_columns_items" ADD CONSTRAINT "_guides_v_blocks_logo_grid_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_logo_grid_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_logo_grid_columns" ADD CONSTRAINT "_guides_v_blocks_logo_grid_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_logo_grid" ADD CONSTRAINT "_guides_v_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_tabs_showcase_tabs_steps" ADD CONSTRAINT "_guides_v_blocks_tabs_showcase_tabs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_tabs_showcase_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_tabs_showcase_tabs" ADD CONSTRAINT "_guides_v_blocks_tabs_showcase_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_tabs_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_tabs_showcase" ADD CONSTRAINT "_guides_v_blocks_tabs_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_anchor_nav_items" ADD CONSTRAINT "_guides_v_blocks_anchor_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_anchor_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_anchor_nav" ADD CONSTRAINT "_guides_v_blocks_anchor_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_testimonials_items" ADD CONSTRAINT "_guides_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_testimonials" ADD CONSTRAINT "_guides_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_comparison_grid_cards" ADD CONSTRAINT "_guides_v_blocks_comparison_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_comparison_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_comparison_grid" ADD CONSTRAINT "_guides_v_blocks_comparison_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_use_case_flow_columns_items" ADD CONSTRAINT "_guides_v_blocks_use_case_flow_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_use_case_flow_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_use_case_flow_columns" ADD CONSTRAINT "_guides_v_blocks_use_case_flow_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_use_case_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_use_case_flow" ADD CONSTRAINT "_guides_v_blocks_use_case_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_version_article_meta_tags" ADD CONSTRAINT "_guides_v_version_article_meta_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_parent_id_guides_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."guides"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tips_v_version_tip_card_icons" ADD CONSTRAINT "_tips_v_version_tip_card_icons_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tips_v_version_tip_card_icons" ADD CONSTRAINT "_tips_v_version_tip_card_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_hero_cards" ADD CONSTRAINT "_tips_v_blocks_hero_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_hero" ADD CONSTRAINT "_tips_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_hero_extended_cards" ADD CONSTRAINT "_tips_v_blocks_hero_extended_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_hero_extended"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_hero_extended" ADD CONSTRAINT "_tips_v_blocks_hero_extended_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_rich_text" ADD CONSTRAINT "_tips_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_side_by_side_bullets" ADD CONSTRAINT "_tips_v_blocks_side_by_side_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_side_by_side_small_icons" ADD CONSTRAINT "_tips_v_blocks_side_by_side_small_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_side_by_side_bottom_cards_items" ADD CONSTRAINT "_tips_v_blocks_side_by_side_bottom_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_side_by_side_bottom_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_side_by_side_bottom_cards" ADD CONSTRAINT "_tips_v_blocks_side_by_side_bottom_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_side_by_side" ADD CONSTRAINT "_tips_v_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_story_cards" ADD CONSTRAINT "_tips_v_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_story" ADD CONSTRAINT "_tips_v_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_media_showcase" ADD CONSTRAINT "_tips_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_feature_grid_cards" ADD CONSTRAINT "_tips_v_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_feature_grid" ADD CONSTRAINT "_tips_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_agent_capabilities_items" ADD CONSTRAINT "_tips_v_blocks_agent_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_agent_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_agent_capabilities" ADD CONSTRAINT "_tips_v_blocks_agent_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_agent_solutions_items" ADD CONSTRAINT "_tips_v_blocks_agent_solutions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_agent_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_agent_solutions" ADD CONSTRAINT "_tips_v_blocks_agent_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_contact_us" ADD CONSTRAINT "_tips_v_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_concierge_flow_cards" ADD CONSTRAINT "_tips_v_blocks_concierge_flow_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_concierge_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_concierge_flow" ADD CONSTRAINT "_tips_v_blocks_concierge_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_enterprise_upgrade_benefits" ADD CONSTRAINT "_tips_v_blocks_enterprise_upgrade_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_enterprise_upgrade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_enterprise_upgrade" ADD CONSTRAINT "_tips_v_blocks_enterprise_upgrade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_channels_grid_cards" ADD CONSTRAINT "_tips_v_blocks_channels_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_channels_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_channels_grid" ADD CONSTRAINT "_tips_v_blocks_channels_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_feature_stack_cards" ADD CONSTRAINT "_tips_v_blocks_feature_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_feature_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_feature_stack" ADD CONSTRAINT "_tips_v_blocks_feature_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_coverage_grid_cards" ADD CONSTRAINT "_tips_v_blocks_coverage_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_coverage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_coverage_grid" ADD CONSTRAINT "_tips_v_blocks_coverage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_feature_rows_rows" ADD CONSTRAINT "_tips_v_blocks_feature_rows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_feature_rows" ADD CONSTRAINT "_tips_v_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_capability_trio_cards" ADD CONSTRAINT "_tips_v_blocks_capability_trio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_capability_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_capability_trio" ADD CONSTRAINT "_tips_v_blocks_capability_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_capability_tools_cards_logos" ADD CONSTRAINT "_tips_v_blocks_capability_tools_cards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_capability_tools_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_capability_tools_cards" ADD CONSTRAINT "_tips_v_blocks_capability_tools_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_capability_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_capability_tools" ADD CONSTRAINT "_tips_v_blocks_capability_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_use_cases_grid_cards" ADD CONSTRAINT "_tips_v_blocks_use_cases_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_use_cases_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_use_cases_grid" ADD CONSTRAINT "_tips_v_blocks_use_cases_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_security_cards" ADD CONSTRAINT "_tips_v_blocks_security_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_security" ADD CONSTRAINT "_tips_v_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_functional_capabilities_cards" ADD CONSTRAINT "_tips_v_blocks_functional_capabilities_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_functional_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_functional_capabilities" ADD CONSTRAINT "_tips_v_blocks_functional_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_how_it_works_steps" ADD CONSTRAINT "_tips_v_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_how_it_works" ADD CONSTRAINT "_tips_v_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_cta" ADD CONSTRAINT "_tips_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_metrics_items" ADD CONSTRAINT "_tips_v_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_metrics" ADD CONSTRAINT "_tips_v_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_results_stats_items" ADD CONSTRAINT "_tips_v_blocks_results_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_results_stats" ADD CONSTRAINT "_tips_v_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_stats_cards_items" ADD CONSTRAINT "_tips_v_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_stats_cards" ADD CONSTRAINT "_tips_v_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_capability_strip_items" ADD CONSTRAINT "_tips_v_blocks_capability_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_capability_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_capability_strip" ADD CONSTRAINT "_tips_v_blocks_capability_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_live_in_days_items" ADD CONSTRAINT "_tips_v_blocks_live_in_days_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_live_in_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_live_in_days" ADD CONSTRAINT "_tips_v_blocks_live_in_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_faq_items" ADD CONSTRAINT "_tips_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_faq" ADD CONSTRAINT "_tips_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_news_insights_collections" ADD CONSTRAINT "_tips_v_blocks_news_insights_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_tips_v_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_news_insights_cards_tags" ADD CONSTRAINT "_tips_v_blocks_news_insights_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_news_insights_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_news_insights_cards" ADD CONSTRAINT "_tips_v_blocks_news_insights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_news_insights" ADD CONSTRAINT "_tips_v_blocks_news_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_content_feed_collections" ADD CONSTRAINT "_tips_v_blocks_content_feed_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_tips_v_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_content_feed_cards_tags" ADD CONSTRAINT "_tips_v_blocks_content_feed_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_content_feed_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_content_feed_cards" ADD CONSTRAINT "_tips_v_blocks_content_feed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_content_feed" ADD CONSTRAINT "_tips_v_blocks_content_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_pricing_cards_cards_features" ADD CONSTRAINT "_tips_v_blocks_pricing_cards_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_pricing_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_pricing_cards_cards" ADD CONSTRAINT "_tips_v_blocks_pricing_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_pricing_cards" ADD CONSTRAINT "_tips_v_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_pricing_details_sections_headers" ADD CONSTRAINT "_tips_v_blocks_pricing_details_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_pricing_details_sections_rows_cells" ADD CONSTRAINT "_tips_v_blocks_pricing_details_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_pricing_details_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_pricing_details_sections_rows" ADD CONSTRAINT "_tips_v_blocks_pricing_details_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_pricing_details_sections" ADD CONSTRAINT "_tips_v_blocks_pricing_details_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_pricing_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_pricing_details" ADD CONSTRAINT "_tips_v_blocks_pricing_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_difference_left_items" ADD CONSTRAINT "_tips_v_blocks_difference_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_difference_right_items" ADD CONSTRAINT "_tips_v_blocks_difference_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_difference" ADD CONSTRAINT "_tips_v_blocks_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_pain_points_comparison_rows" ADD CONSTRAINT "_tips_v_blocks_pain_points_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_pain_points_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_pain_points_comparison" ADD CONSTRAINT "_tips_v_blocks_pain_points_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_pricing_policy_callouts" ADD CONSTRAINT "_tips_v_blocks_pricing_policy_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_pricing_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_pricing_policy" ADD CONSTRAINT "_tips_v_blocks_pricing_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_industry_expertise_items" ADD CONSTRAINT "_tips_v_blocks_industry_expertise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_industry_expertise_info_cards" ADD CONSTRAINT "_tips_v_blocks_industry_expertise_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_industry_expertise" ADD CONSTRAINT "_tips_v_blocks_industry_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_logo_strip_logos" ADD CONSTRAINT "_tips_v_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_logo_strip_stats" ADD CONSTRAINT "_tips_v_blocks_logo_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_logo_strip" ADD CONSTRAINT "_tips_v_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_integrations_banner_items" ADD CONSTRAINT "_tips_v_blocks_integrations_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_integrations_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_integrations_banner" ADD CONSTRAINT "_tips_v_blocks_integrations_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_logo_grid_columns_items" ADD CONSTRAINT "_tips_v_blocks_logo_grid_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_logo_grid_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_logo_grid_columns" ADD CONSTRAINT "_tips_v_blocks_logo_grid_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_logo_grid" ADD CONSTRAINT "_tips_v_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_tabs_showcase_tabs_steps" ADD CONSTRAINT "_tips_v_blocks_tabs_showcase_tabs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_tabs_showcase_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_tabs_showcase_tabs" ADD CONSTRAINT "_tips_v_blocks_tabs_showcase_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_tabs_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_tabs_showcase" ADD CONSTRAINT "_tips_v_blocks_tabs_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_anchor_nav_items" ADD CONSTRAINT "_tips_v_blocks_anchor_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_anchor_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_anchor_nav" ADD CONSTRAINT "_tips_v_blocks_anchor_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_testimonials_items" ADD CONSTRAINT "_tips_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_testimonials" ADD CONSTRAINT "_tips_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_comparison_grid_cards" ADD CONSTRAINT "_tips_v_blocks_comparison_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_comparison_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_comparison_grid" ADD CONSTRAINT "_tips_v_blocks_comparison_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_use_case_flow_columns_items" ADD CONSTRAINT "_tips_v_blocks_use_case_flow_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_use_case_flow_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_use_case_flow_columns" ADD CONSTRAINT "_tips_v_blocks_use_case_flow_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v_blocks_use_case_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v_blocks_use_case_flow" ADD CONSTRAINT "_tips_v_blocks_use_case_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tips_v" ADD CONSTRAINT "_tips_v_parent_id_tips_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tips"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_hero_cards" ADD CONSTRAINT "_use_cases_v_blocks_hero_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_hero" ADD CONSTRAINT "_use_cases_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_hero_extended_cards" ADD CONSTRAINT "_use_cases_v_blocks_hero_extended_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_hero_extended"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_hero_extended" ADD CONSTRAINT "_use_cases_v_blocks_hero_extended_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_rich_text" ADD CONSTRAINT "_use_cases_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_side_by_side_bullets" ADD CONSTRAINT "_use_cases_v_blocks_side_by_side_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_side_by_side_small_icons" ADD CONSTRAINT "_use_cases_v_blocks_side_by_side_small_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_side_by_side_bottom_cards_items" ADD CONSTRAINT "_use_cases_v_blocks_side_by_side_bottom_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_side_by_side_bottom_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_side_by_side_bottom_cards" ADD CONSTRAINT "_use_cases_v_blocks_side_by_side_bottom_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_side_by_side" ADD CONSTRAINT "_use_cases_v_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_story_cards" ADD CONSTRAINT "_use_cases_v_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_story" ADD CONSTRAINT "_use_cases_v_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_media_showcase" ADD CONSTRAINT "_use_cases_v_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_feature_grid_cards" ADD CONSTRAINT "_use_cases_v_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_feature_grid" ADD CONSTRAINT "_use_cases_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_agent_capabilities_items" ADD CONSTRAINT "_use_cases_v_blocks_agent_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_agent_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_agent_capabilities" ADD CONSTRAINT "_use_cases_v_blocks_agent_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_agent_solutions_items" ADD CONSTRAINT "_use_cases_v_blocks_agent_solutions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_agent_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_agent_solutions" ADD CONSTRAINT "_use_cases_v_blocks_agent_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_contact_us" ADD CONSTRAINT "_use_cases_v_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_concierge_flow_cards" ADD CONSTRAINT "_use_cases_v_blocks_concierge_flow_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_concierge_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_concierge_flow" ADD CONSTRAINT "_use_cases_v_blocks_concierge_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_enterprise_upgrade_benefits" ADD CONSTRAINT "_use_cases_v_blocks_enterprise_upgrade_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_enterprise_upgrade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_enterprise_upgrade" ADD CONSTRAINT "_use_cases_v_blocks_enterprise_upgrade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_channels_grid_cards" ADD CONSTRAINT "_use_cases_v_blocks_channels_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_channels_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_channels_grid" ADD CONSTRAINT "_use_cases_v_blocks_channels_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_feature_stack_cards" ADD CONSTRAINT "_use_cases_v_blocks_feature_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_feature_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_feature_stack" ADD CONSTRAINT "_use_cases_v_blocks_feature_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_coverage_grid_cards" ADD CONSTRAINT "_use_cases_v_blocks_coverage_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_coverage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_coverage_grid" ADD CONSTRAINT "_use_cases_v_blocks_coverage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_feature_rows_rows" ADD CONSTRAINT "_use_cases_v_blocks_feature_rows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_feature_rows" ADD CONSTRAINT "_use_cases_v_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_capability_trio_cards" ADD CONSTRAINT "_use_cases_v_blocks_capability_trio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_capability_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_capability_trio" ADD CONSTRAINT "_use_cases_v_blocks_capability_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_capability_tools_cards_logos" ADD CONSTRAINT "_use_cases_v_blocks_capability_tools_cards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_capability_tools_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_capability_tools_cards" ADD CONSTRAINT "_use_cases_v_blocks_capability_tools_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_capability_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_capability_tools" ADD CONSTRAINT "_use_cases_v_blocks_capability_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_use_cases_grid_cards" ADD CONSTRAINT "_use_cases_v_blocks_use_cases_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_use_cases_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_use_cases_grid" ADD CONSTRAINT "_use_cases_v_blocks_use_cases_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_security_cards" ADD CONSTRAINT "_use_cases_v_blocks_security_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_security" ADD CONSTRAINT "_use_cases_v_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_functional_capabilities_cards" ADD CONSTRAINT "_use_cases_v_blocks_functional_capabilities_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_functional_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_functional_capabilities" ADD CONSTRAINT "_use_cases_v_blocks_functional_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_how_it_works_steps" ADD CONSTRAINT "_use_cases_v_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_how_it_works" ADD CONSTRAINT "_use_cases_v_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_cta" ADD CONSTRAINT "_use_cases_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_metrics_items" ADD CONSTRAINT "_use_cases_v_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_metrics" ADD CONSTRAINT "_use_cases_v_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_results_stats_items" ADD CONSTRAINT "_use_cases_v_blocks_results_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_results_stats" ADD CONSTRAINT "_use_cases_v_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_stats_cards_items" ADD CONSTRAINT "_use_cases_v_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_stats_cards" ADD CONSTRAINT "_use_cases_v_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_capability_strip_items" ADD CONSTRAINT "_use_cases_v_blocks_capability_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_capability_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_capability_strip" ADD CONSTRAINT "_use_cases_v_blocks_capability_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_live_in_days_items" ADD CONSTRAINT "_use_cases_v_blocks_live_in_days_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_live_in_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_live_in_days" ADD CONSTRAINT "_use_cases_v_blocks_live_in_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_faq_items" ADD CONSTRAINT "_use_cases_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_faq" ADD CONSTRAINT "_use_cases_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_news_insights_collections" ADD CONSTRAINT "_use_cases_v_blocks_news_insights_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_use_cases_v_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_news_insights_cards_tags" ADD CONSTRAINT "_use_cases_v_blocks_news_insights_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_news_insights_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_news_insights_cards" ADD CONSTRAINT "_use_cases_v_blocks_news_insights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_news_insights" ADD CONSTRAINT "_use_cases_v_blocks_news_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_content_feed_collections" ADD CONSTRAINT "_use_cases_v_blocks_content_feed_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_use_cases_v_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_content_feed_cards_tags" ADD CONSTRAINT "_use_cases_v_blocks_content_feed_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_content_feed_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_content_feed_cards" ADD CONSTRAINT "_use_cases_v_blocks_content_feed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_content_feed" ADD CONSTRAINT "_use_cases_v_blocks_content_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_pricing_cards_cards_features" ADD CONSTRAINT "_use_cases_v_blocks_pricing_cards_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_pricing_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_pricing_cards_cards" ADD CONSTRAINT "_use_cases_v_blocks_pricing_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_pricing_cards" ADD CONSTRAINT "_use_cases_v_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_pricing_details_sections_headers" ADD CONSTRAINT "_use_cases_v_blocks_pricing_details_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_pricing_details_sections_rows_cells" ADD CONSTRAINT "_use_cases_v_blocks_pricing_details_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_pricing_details_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_pricing_details_sections_rows" ADD CONSTRAINT "_use_cases_v_blocks_pricing_details_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_pricing_details_sections" ADD CONSTRAINT "_use_cases_v_blocks_pricing_details_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_pricing_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_pricing_details" ADD CONSTRAINT "_use_cases_v_blocks_pricing_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_difference_left_items" ADD CONSTRAINT "_use_cases_v_blocks_difference_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_difference_right_items" ADD CONSTRAINT "_use_cases_v_blocks_difference_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_difference" ADD CONSTRAINT "_use_cases_v_blocks_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_pain_points_comparison_rows" ADD CONSTRAINT "_use_cases_v_blocks_pain_points_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_pain_points_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_pain_points_comparison" ADD CONSTRAINT "_use_cases_v_blocks_pain_points_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_pricing_policy_callouts" ADD CONSTRAINT "_use_cases_v_blocks_pricing_policy_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_pricing_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_pricing_policy" ADD CONSTRAINT "_use_cases_v_blocks_pricing_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_industry_expertise_items" ADD CONSTRAINT "_use_cases_v_blocks_industry_expertise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_industry_expertise_info_cards" ADD CONSTRAINT "_use_cases_v_blocks_industry_expertise_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_industry_expertise" ADD CONSTRAINT "_use_cases_v_blocks_industry_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_logo_strip_logos" ADD CONSTRAINT "_use_cases_v_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_logo_strip_stats" ADD CONSTRAINT "_use_cases_v_blocks_logo_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_logo_strip" ADD CONSTRAINT "_use_cases_v_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_integrations_banner_items" ADD CONSTRAINT "_use_cases_v_blocks_integrations_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_integrations_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_integrations_banner" ADD CONSTRAINT "_use_cases_v_blocks_integrations_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_logo_grid_columns_items" ADD CONSTRAINT "_use_cases_v_blocks_logo_grid_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_logo_grid_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_logo_grid_columns" ADD CONSTRAINT "_use_cases_v_blocks_logo_grid_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_logo_grid" ADD CONSTRAINT "_use_cases_v_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_tabs_showcase_tabs_steps" ADD CONSTRAINT "_use_cases_v_blocks_tabs_showcase_tabs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_tabs_showcase_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_tabs_showcase_tabs" ADD CONSTRAINT "_use_cases_v_blocks_tabs_showcase_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_tabs_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_tabs_showcase" ADD CONSTRAINT "_use_cases_v_blocks_tabs_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_anchor_nav_items" ADD CONSTRAINT "_use_cases_v_blocks_anchor_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_anchor_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_anchor_nav" ADD CONSTRAINT "_use_cases_v_blocks_anchor_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_testimonials_items" ADD CONSTRAINT "_use_cases_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_testimonials" ADD CONSTRAINT "_use_cases_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_comparison_grid_cards" ADD CONSTRAINT "_use_cases_v_blocks_comparison_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_comparison_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_comparison_grid" ADD CONSTRAINT "_use_cases_v_blocks_comparison_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_use_case_flow_columns_items" ADD CONSTRAINT "_use_cases_v_blocks_use_case_flow_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_use_case_flow_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_use_case_flow_columns" ADD CONSTRAINT "_use_cases_v_blocks_use_case_flow_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v_blocks_use_case_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v_blocks_use_case_flow" ADD CONSTRAINT "_use_cases_v_blocks_use_case_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_use_cases_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_use_cases_v" ADD CONSTRAINT "_use_cases_v_parent_id_use_cases_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."use_cases"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_forms_v_version_fields_options" ADD CONSTRAINT "_forms_v_version_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v_version_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_version_fields" ADD CONSTRAINT "_forms_v_version_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v" ADD CONSTRAINT "_forms_v_parent_id_forms_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faq_items_v" ADD CONSTRAINT "_faq_items_v_parent_id_faq_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faq_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_author_image_id_media_id_fk" FOREIGN KEY ("version_author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_media_v_parent_idx" ON "_media_v" USING btree ("parent_id");
  CREATE INDEX "_media_v_version_version_title_idx" ON "_media_v" USING btree ("version_title");
  CREATE INDEX "_media_v_version_version_alt_idx" ON "_media_v" USING btree ("version_alt");
  CREATE INDEX "_media_v_version_version_source_id_idx" ON "_media_v" USING btree ("version_source_id");
  CREATE INDEX "_media_v_version_version_public_path_idx" ON "_media_v" USING btree ("version_public_path");
  CREATE INDEX "_media_v_version_version_storage_key_idx" ON "_media_v" USING btree ("version_storage_key");
  CREATE INDEX "_media_v_version_version_updated_at_idx" ON "_media_v" USING btree ("version_updated_at");
  CREATE INDEX "_media_v_version_version_created_at_idx" ON "_media_v" USING btree ("version_created_at");
  CREATE INDEX "_media_v_version_version_filename_idx" ON "_media_v" USING btree ("version_filename");
  CREATE INDEX "_media_v_created_at_idx" ON "_media_v" USING btree ("created_at");
  CREATE INDEX "_media_v_updated_at_idx" ON "_media_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_blocks_hero_cards_order_idx" ON "_pages_v_blocks_hero_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_cards_parent_id_idx" ON "_pages_v_blocks_hero_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_extended_cards_order_idx" ON "_pages_v_blocks_hero_extended_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_extended_cards_parent_id_idx" ON "_pages_v_blocks_hero_extended_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_extended_order_idx" ON "_pages_v_blocks_hero_extended" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_extended_parent_id_idx" ON "_pages_v_blocks_hero_extended" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_extended_path_idx" ON "_pages_v_blocks_hero_extended" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_side_by_side_bullets_order_idx" ON "_pages_v_blocks_side_by_side_bullets" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_side_by_side_bullets_parent_id_idx" ON "_pages_v_blocks_side_by_side_bullets" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_side_by_side_small_icons_order_idx" ON "_pages_v_blocks_side_by_side_small_icons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_side_by_side_small_icons_parent_id_idx" ON "_pages_v_blocks_side_by_side_small_icons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_side_by_side_bottom_cards_items_order_idx" ON "_pages_v_blocks_side_by_side_bottom_cards_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_side_by_side_bottom_cards_items_parent_id_idx" ON "_pages_v_blocks_side_by_side_bottom_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_side_by_side_bottom_cards_order_idx" ON "_pages_v_blocks_side_by_side_bottom_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_side_by_side_bottom_cards_parent_id_idx" ON "_pages_v_blocks_side_by_side_bottom_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_side_by_side_order_idx" ON "_pages_v_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_side_by_side_parent_id_idx" ON "_pages_v_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_side_by_side_path_idx" ON "_pages_v_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_story_cards_order_idx" ON "_pages_v_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_story_cards_parent_id_idx" ON "_pages_v_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_story_order_idx" ON "_pages_v_blocks_story" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_story_parent_id_idx" ON "_pages_v_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_story_path_idx" ON "_pages_v_blocks_story" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_showcase_order_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_showcase_parent_id_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_showcase_path_idx" ON "_pages_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_grid_cards_order_idx" ON "_pages_v_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_cards_parent_id_idx" ON "_pages_v_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_agent_capabilities_items_order_idx" ON "_pages_v_blocks_agent_capabilities_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_agent_capabilities_items_parent_id_idx" ON "_pages_v_blocks_agent_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_agent_capabilities_order_idx" ON "_pages_v_blocks_agent_capabilities" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_agent_capabilities_parent_id_idx" ON "_pages_v_blocks_agent_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_agent_capabilities_path_idx" ON "_pages_v_blocks_agent_capabilities" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_agent_solutions_items_order_idx" ON "_pages_v_blocks_agent_solutions_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_agent_solutions_items_parent_id_idx" ON "_pages_v_blocks_agent_solutions_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_agent_solutions_order_idx" ON "_pages_v_blocks_agent_solutions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_agent_solutions_parent_id_idx" ON "_pages_v_blocks_agent_solutions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_agent_solutions_path_idx" ON "_pages_v_blocks_agent_solutions" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_us_order_idx" ON "_pages_v_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_us_parent_id_idx" ON "_pages_v_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_path_idx" ON "_pages_v_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_concierge_flow_cards_order_idx" ON "_pages_v_blocks_concierge_flow_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_concierge_flow_cards_parent_id_idx" ON "_pages_v_blocks_concierge_flow_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_concierge_flow_order_idx" ON "_pages_v_blocks_concierge_flow" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_concierge_flow_parent_id_idx" ON "_pages_v_blocks_concierge_flow" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_concierge_flow_path_idx" ON "_pages_v_blocks_concierge_flow" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_enterprise_upgrade_benefits_order_idx" ON "_pages_v_blocks_enterprise_upgrade_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_enterprise_upgrade_benefits_parent_id_idx" ON "_pages_v_blocks_enterprise_upgrade_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_enterprise_upgrade_order_idx" ON "_pages_v_blocks_enterprise_upgrade" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_enterprise_upgrade_parent_id_idx" ON "_pages_v_blocks_enterprise_upgrade" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_enterprise_upgrade_path_idx" ON "_pages_v_blocks_enterprise_upgrade" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_channels_grid_cards_order_idx" ON "_pages_v_blocks_channels_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_channels_grid_cards_parent_id_idx" ON "_pages_v_blocks_channels_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_channels_grid_order_idx" ON "_pages_v_blocks_channels_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_channels_grid_parent_id_idx" ON "_pages_v_blocks_channels_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_channels_grid_path_idx" ON "_pages_v_blocks_channels_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_stack_cards_order_idx" ON "_pages_v_blocks_feature_stack_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_stack_cards_parent_id_idx" ON "_pages_v_blocks_feature_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_stack_order_idx" ON "_pages_v_blocks_feature_stack" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_stack_parent_id_idx" ON "_pages_v_blocks_feature_stack" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_stack_path_idx" ON "_pages_v_blocks_feature_stack" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_coverage_grid_cards_order_idx" ON "_pages_v_blocks_coverage_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_coverage_grid_cards_parent_id_idx" ON "_pages_v_blocks_coverage_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_coverage_grid_order_idx" ON "_pages_v_blocks_coverage_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_coverage_grid_parent_id_idx" ON "_pages_v_blocks_coverage_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_coverage_grid_path_idx" ON "_pages_v_blocks_coverage_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_rows_rows_order_idx" ON "_pages_v_blocks_feature_rows_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_rows_rows_parent_id_idx" ON "_pages_v_blocks_feature_rows_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_rows_order_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_rows_parent_id_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_rows_path_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_capability_trio_cards_order_idx" ON "_pages_v_blocks_capability_trio_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capability_trio_cards_parent_id_idx" ON "_pages_v_blocks_capability_trio_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capability_trio_order_idx" ON "_pages_v_blocks_capability_trio" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capability_trio_parent_id_idx" ON "_pages_v_blocks_capability_trio" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capability_trio_path_idx" ON "_pages_v_blocks_capability_trio" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_capability_tools_cards_logos_order_idx" ON "_pages_v_blocks_capability_tools_cards_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capability_tools_cards_logos_parent_id_idx" ON "_pages_v_blocks_capability_tools_cards_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capability_tools_cards_order_idx" ON "_pages_v_blocks_capability_tools_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capability_tools_cards_parent_id_idx" ON "_pages_v_blocks_capability_tools_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capability_tools_order_idx" ON "_pages_v_blocks_capability_tools" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capability_tools_parent_id_idx" ON "_pages_v_blocks_capability_tools" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capability_tools_path_idx" ON "_pages_v_blocks_capability_tools" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_use_cases_grid_cards_order_idx" ON "_pages_v_blocks_use_cases_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_use_cases_grid_cards_parent_id_idx" ON "_pages_v_blocks_use_cases_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_use_cases_grid_order_idx" ON "_pages_v_blocks_use_cases_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_use_cases_grid_parent_id_idx" ON "_pages_v_blocks_use_cases_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_use_cases_grid_path_idx" ON "_pages_v_blocks_use_cases_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_security_cards_order_idx" ON "_pages_v_blocks_security_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_security_cards_parent_id_idx" ON "_pages_v_blocks_security_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_security_order_idx" ON "_pages_v_blocks_security" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_security_parent_id_idx" ON "_pages_v_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_security_path_idx" ON "_pages_v_blocks_security" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_functional_capabilities_cards_order_idx" ON "_pages_v_blocks_functional_capabilities_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_functional_capabilities_cards_parent_id_idx" ON "_pages_v_blocks_functional_capabilities_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_functional_capabilities_order_idx" ON "_pages_v_blocks_functional_capabilities" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_functional_capabilities_parent_id_idx" ON "_pages_v_blocks_functional_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_functional_capabilities_path_idx" ON "_pages_v_blocks_functional_capabilities" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_how_it_works_steps_order_idx" ON "_pages_v_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_it_works_steps_parent_id_idx" ON "_pages_v_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_order_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_it_works_parent_id_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_it_works_path_idx" ON "_pages_v_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_metrics_items_order_idx" ON "_pages_v_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_metrics_items_parent_id_idx" ON "_pages_v_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_metrics_order_idx" ON "_pages_v_blocks_metrics" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_metrics_parent_id_idx" ON "_pages_v_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_metrics_path_idx" ON "_pages_v_blocks_metrics" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_results_stats_items_order_idx" ON "_pages_v_blocks_results_stats_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_results_stats_items_parent_id_idx" ON "_pages_v_blocks_results_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_results_stats_order_idx" ON "_pages_v_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_results_stats_parent_id_idx" ON "_pages_v_blocks_results_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_results_stats_path_idx" ON "_pages_v_blocks_results_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_cards_items_order_idx" ON "_pages_v_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_cards_items_parent_id_idx" ON "_pages_v_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_cards_order_idx" ON "_pages_v_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_cards_parent_id_idx" ON "_pages_v_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_cards_path_idx" ON "_pages_v_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_capability_strip_items_order_idx" ON "_pages_v_blocks_capability_strip_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capability_strip_items_parent_id_idx" ON "_pages_v_blocks_capability_strip_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capability_strip_order_idx" ON "_pages_v_blocks_capability_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capability_strip_parent_id_idx" ON "_pages_v_blocks_capability_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capability_strip_path_idx" ON "_pages_v_blocks_capability_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_live_in_days_items_order_idx" ON "_pages_v_blocks_live_in_days_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_live_in_days_items_parent_id_idx" ON "_pages_v_blocks_live_in_days_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_live_in_days_order_idx" ON "_pages_v_blocks_live_in_days" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_live_in_days_parent_id_idx" ON "_pages_v_blocks_live_in_days" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_live_in_days_path_idx" ON "_pages_v_blocks_live_in_days" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_news_insights_collections_order_idx" ON "_pages_v_blocks_news_insights_collections" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_news_insights_collections_parent_idx" ON "_pages_v_blocks_news_insights_collections" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_news_insights_cards_tags_order_idx" ON "_pages_v_blocks_news_insights_cards_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_news_insights_cards_tags_parent_id_idx" ON "_pages_v_blocks_news_insights_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_insights_cards_order_idx" ON "_pages_v_blocks_news_insights_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_news_insights_cards_parent_id_idx" ON "_pages_v_blocks_news_insights_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_insights_order_idx" ON "_pages_v_blocks_news_insights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_news_insights_parent_id_idx" ON "_pages_v_blocks_news_insights" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_news_insights_path_idx" ON "_pages_v_blocks_news_insights" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_feed_collections_order_idx" ON "_pages_v_blocks_content_feed_collections" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_content_feed_collections_parent_idx" ON "_pages_v_blocks_content_feed_collections" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_content_feed_cards_tags_order_idx" ON "_pages_v_blocks_content_feed_cards_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_feed_cards_tags_parent_id_idx" ON "_pages_v_blocks_content_feed_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_feed_cards_order_idx" ON "_pages_v_blocks_content_feed_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_feed_cards_parent_id_idx" ON "_pages_v_blocks_content_feed_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_feed_order_idx" ON "_pages_v_blocks_content_feed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_feed_parent_id_idx" ON "_pages_v_blocks_content_feed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_feed_path_idx" ON "_pages_v_blocks_content_feed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_cards_cards_features_order_idx" ON "_pages_v_blocks_pricing_cards_cards_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_cards_cards_features_parent_id_idx" ON "_pages_v_blocks_pricing_cards_cards_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_cards_cards_order_idx" ON "_pages_v_blocks_pricing_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_cards_cards_parent_id_idx" ON "_pages_v_blocks_pricing_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_cards_order_idx" ON "_pages_v_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_cards_parent_id_idx" ON "_pages_v_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_cards_path_idx" ON "_pages_v_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_details_sections_headers_order_idx" ON "_pages_v_blocks_pricing_details_sections_headers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_details_sections_headers_parent_id_idx" ON "_pages_v_blocks_pricing_details_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_details_sections_rows_cells_order_idx" ON "_pages_v_blocks_pricing_details_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_details_sections_rows_cells_parent_id_idx" ON "_pages_v_blocks_pricing_details_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_details_sections_rows_order_idx" ON "_pages_v_blocks_pricing_details_sections_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_details_sections_rows_parent_id_idx" ON "_pages_v_blocks_pricing_details_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_details_sections_order_idx" ON "_pages_v_blocks_pricing_details_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_details_sections_parent_id_idx" ON "_pages_v_blocks_pricing_details_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_details_order_idx" ON "_pages_v_blocks_pricing_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_details_parent_id_idx" ON "_pages_v_blocks_pricing_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_details_path_idx" ON "_pages_v_blocks_pricing_details" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_difference_left_items_order_idx" ON "_pages_v_blocks_difference_left_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_difference_left_items_parent_id_idx" ON "_pages_v_blocks_difference_left_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_difference_right_items_order_idx" ON "_pages_v_blocks_difference_right_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_difference_right_items_parent_id_idx" ON "_pages_v_blocks_difference_right_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_difference_order_idx" ON "_pages_v_blocks_difference" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_difference_parent_id_idx" ON "_pages_v_blocks_difference" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_difference_path_idx" ON "_pages_v_blocks_difference" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pain_points_comparison_rows_order_idx" ON "_pages_v_blocks_pain_points_comparison_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pain_points_comparison_rows_parent_id_idx" ON "_pages_v_blocks_pain_points_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pain_points_comparison_order_idx" ON "_pages_v_blocks_pain_points_comparison" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pain_points_comparison_parent_id_idx" ON "_pages_v_blocks_pain_points_comparison" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pain_points_comparison_path_idx" ON "_pages_v_blocks_pain_points_comparison" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_policy_callouts_order_idx" ON "_pages_v_blocks_pricing_policy_callouts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_policy_callouts_parent_id_idx" ON "_pages_v_blocks_pricing_policy_callouts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_policy_order_idx" ON "_pages_v_blocks_pricing_policy" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_policy_parent_id_idx" ON "_pages_v_blocks_pricing_policy" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_policy_path_idx" ON "_pages_v_blocks_pricing_policy" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_industry_expertise_items_order_idx" ON "_pages_v_blocks_industry_expertise_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_industry_expertise_items_parent_id_idx" ON "_pages_v_blocks_industry_expertise_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_industry_expertise_info_cards_order_idx" ON "_pages_v_blocks_industry_expertise_info_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_industry_expertise_info_cards_parent_id_idx" ON "_pages_v_blocks_industry_expertise_info_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_industry_expertise_order_idx" ON "_pages_v_blocks_industry_expertise" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_industry_expertise_parent_id_idx" ON "_pages_v_blocks_industry_expertise" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_industry_expertise_path_idx" ON "_pages_v_blocks_industry_expertise" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_strip_logos_order_idx" ON "_pages_v_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_strip_logos_parent_id_idx" ON "_pages_v_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_strip_stats_order_idx" ON "_pages_v_blocks_logo_strip_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_strip_stats_parent_id_idx" ON "_pages_v_blocks_logo_strip_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_strip_order_idx" ON "_pages_v_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_strip_parent_id_idx" ON "_pages_v_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_strip_path_idx" ON "_pages_v_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_integrations_banner_items_order_idx" ON "_pages_v_blocks_integrations_banner_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_integrations_banner_items_parent_id_idx" ON "_pages_v_blocks_integrations_banner_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_integrations_banner_order_idx" ON "_pages_v_blocks_integrations_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_integrations_banner_parent_id_idx" ON "_pages_v_blocks_integrations_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_integrations_banner_path_idx" ON "_pages_v_blocks_integrations_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_grid_columns_items_order_idx" ON "_pages_v_blocks_logo_grid_columns_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_grid_columns_items_parent_id_idx" ON "_pages_v_blocks_logo_grid_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_grid_columns_order_idx" ON "_pages_v_blocks_logo_grid_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_grid_columns_parent_id_idx" ON "_pages_v_blocks_logo_grid_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_grid_order_idx" ON "_pages_v_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_grid_parent_id_idx" ON "_pages_v_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_grid_path_idx" ON "_pages_v_blocks_logo_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tabs_showcase_tabs_steps_order_idx" ON "_pages_v_blocks_tabs_showcase_tabs_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_showcase_tabs_steps_parent_id_idx" ON "_pages_v_blocks_tabs_showcase_tabs_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_showcase_tabs_order_idx" ON "_pages_v_blocks_tabs_showcase_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_showcase_tabs_parent_id_idx" ON "_pages_v_blocks_tabs_showcase_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_showcase_order_idx" ON "_pages_v_blocks_tabs_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_showcase_parent_id_idx" ON "_pages_v_blocks_tabs_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_showcase_path_idx" ON "_pages_v_blocks_tabs_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_anchor_nav_items_order_idx" ON "_pages_v_blocks_anchor_nav_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_anchor_nav_items_parent_id_idx" ON "_pages_v_blocks_anchor_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_anchor_nav_order_idx" ON "_pages_v_blocks_anchor_nav" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_anchor_nav_parent_id_idx" ON "_pages_v_blocks_anchor_nav" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_anchor_nav_path_idx" ON "_pages_v_blocks_anchor_nav" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_comparison_grid_cards_order_idx" ON "_pages_v_blocks_comparison_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_grid_cards_parent_id_idx" ON "_pages_v_blocks_comparison_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_grid_order_idx" ON "_pages_v_blocks_comparison_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_grid_parent_id_idx" ON "_pages_v_blocks_comparison_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_grid_path_idx" ON "_pages_v_blocks_comparison_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_use_case_flow_columns_items_order_idx" ON "_pages_v_blocks_use_case_flow_columns_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_use_case_flow_columns_items_parent_id_idx" ON "_pages_v_blocks_use_case_flow_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_use_case_flow_columns_order_idx" ON "_pages_v_blocks_use_case_flow_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_use_case_flow_columns_parent_id_idx" ON "_pages_v_blocks_use_case_flow_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_use_case_flow_order_idx" ON "_pages_v_blocks_use_case_flow" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_use_case_flow_parent_id_idx" ON "_pages_v_blocks_use_case_flow" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_use_case_flow_path_idx" ON "_pages_v_blocks_use_case_flow" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_content_key_idx" ON "_pages_v" USING btree ("version_content_key");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_posts_v_blocks_hero_cards_order_idx" ON "_posts_v_blocks_hero_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_cards_parent_id_idx" ON "_posts_v_blocks_hero_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_order_idx" ON "_posts_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_parent_id_idx" ON "_posts_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_path_idx" ON "_posts_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_hero_extended_cards_order_idx" ON "_posts_v_blocks_hero_extended_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_extended_cards_parent_id_idx" ON "_posts_v_blocks_hero_extended_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_extended_order_idx" ON "_posts_v_blocks_hero_extended" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_extended_parent_id_idx" ON "_posts_v_blocks_hero_extended" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_extended_path_idx" ON "_posts_v_blocks_hero_extended" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_rich_text_order_idx" ON "_posts_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_rich_text_parent_id_idx" ON "_posts_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_rich_text_path_idx" ON "_posts_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_side_by_side_bullets_order_idx" ON "_posts_v_blocks_side_by_side_bullets" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_side_by_side_bullets_parent_id_idx" ON "_posts_v_blocks_side_by_side_bullets" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_side_by_side_small_icons_order_idx" ON "_posts_v_blocks_side_by_side_small_icons" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_side_by_side_small_icons_parent_id_idx" ON "_posts_v_blocks_side_by_side_small_icons" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_side_by_side_bottom_cards_items_order_idx" ON "_posts_v_blocks_side_by_side_bottom_cards_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_side_by_side_bottom_cards_items_parent_id_idx" ON "_posts_v_blocks_side_by_side_bottom_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_side_by_side_bottom_cards_order_idx" ON "_posts_v_blocks_side_by_side_bottom_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_side_by_side_bottom_cards_parent_id_idx" ON "_posts_v_blocks_side_by_side_bottom_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_side_by_side_order_idx" ON "_posts_v_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_side_by_side_parent_id_idx" ON "_posts_v_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_side_by_side_path_idx" ON "_posts_v_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_story_cards_order_idx" ON "_posts_v_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_story_cards_parent_id_idx" ON "_posts_v_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_story_order_idx" ON "_posts_v_blocks_story" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_story_parent_id_idx" ON "_posts_v_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_story_path_idx" ON "_posts_v_blocks_story" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_media_showcase_order_idx" ON "_posts_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_media_showcase_parent_id_idx" ON "_posts_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_media_showcase_path_idx" ON "_posts_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_feature_grid_cards_order_idx" ON "_posts_v_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_feature_grid_cards_parent_id_idx" ON "_posts_v_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_grid_order_idx" ON "_posts_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_feature_grid_parent_id_idx" ON "_posts_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_grid_path_idx" ON "_posts_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_agent_capabilities_items_order_idx" ON "_posts_v_blocks_agent_capabilities_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_agent_capabilities_items_parent_id_idx" ON "_posts_v_blocks_agent_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_agent_capabilities_order_idx" ON "_posts_v_blocks_agent_capabilities" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_agent_capabilities_parent_id_idx" ON "_posts_v_blocks_agent_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_agent_capabilities_path_idx" ON "_posts_v_blocks_agent_capabilities" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_agent_solutions_items_order_idx" ON "_posts_v_blocks_agent_solutions_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_agent_solutions_items_parent_id_idx" ON "_posts_v_blocks_agent_solutions_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_agent_solutions_order_idx" ON "_posts_v_blocks_agent_solutions" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_agent_solutions_parent_id_idx" ON "_posts_v_blocks_agent_solutions" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_agent_solutions_path_idx" ON "_posts_v_blocks_agent_solutions" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_contact_us_order_idx" ON "_posts_v_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_contact_us_parent_id_idx" ON "_posts_v_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_contact_us_path_idx" ON "_posts_v_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_concierge_flow_cards_order_idx" ON "_posts_v_blocks_concierge_flow_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_concierge_flow_cards_parent_id_idx" ON "_posts_v_blocks_concierge_flow_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_concierge_flow_order_idx" ON "_posts_v_blocks_concierge_flow" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_concierge_flow_parent_id_idx" ON "_posts_v_blocks_concierge_flow" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_concierge_flow_path_idx" ON "_posts_v_blocks_concierge_flow" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_enterprise_upgrade_benefits_order_idx" ON "_posts_v_blocks_enterprise_upgrade_benefits" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_enterprise_upgrade_benefits_parent_id_idx" ON "_posts_v_blocks_enterprise_upgrade_benefits" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_enterprise_upgrade_order_idx" ON "_posts_v_blocks_enterprise_upgrade" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_enterprise_upgrade_parent_id_idx" ON "_posts_v_blocks_enterprise_upgrade" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_enterprise_upgrade_path_idx" ON "_posts_v_blocks_enterprise_upgrade" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_channels_grid_cards_order_idx" ON "_posts_v_blocks_channels_grid_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_channels_grid_cards_parent_id_idx" ON "_posts_v_blocks_channels_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_channels_grid_order_idx" ON "_posts_v_blocks_channels_grid" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_channels_grid_parent_id_idx" ON "_posts_v_blocks_channels_grid" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_channels_grid_path_idx" ON "_posts_v_blocks_channels_grid" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_feature_stack_cards_order_idx" ON "_posts_v_blocks_feature_stack_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_feature_stack_cards_parent_id_idx" ON "_posts_v_blocks_feature_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_stack_order_idx" ON "_posts_v_blocks_feature_stack" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_feature_stack_parent_id_idx" ON "_posts_v_blocks_feature_stack" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_stack_path_idx" ON "_posts_v_blocks_feature_stack" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_coverage_grid_cards_order_idx" ON "_posts_v_blocks_coverage_grid_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_coverage_grid_cards_parent_id_idx" ON "_posts_v_blocks_coverage_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_coverage_grid_order_idx" ON "_posts_v_blocks_coverage_grid" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_coverage_grid_parent_id_idx" ON "_posts_v_blocks_coverage_grid" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_coverage_grid_path_idx" ON "_posts_v_blocks_coverage_grid" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_feature_rows_rows_order_idx" ON "_posts_v_blocks_feature_rows_rows" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_feature_rows_rows_parent_id_idx" ON "_posts_v_blocks_feature_rows_rows" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_rows_order_idx" ON "_posts_v_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_feature_rows_parent_id_idx" ON "_posts_v_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_feature_rows_path_idx" ON "_posts_v_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_capability_trio_cards_order_idx" ON "_posts_v_blocks_capability_trio_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_capability_trio_cards_parent_id_idx" ON "_posts_v_blocks_capability_trio_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_capability_trio_order_idx" ON "_posts_v_blocks_capability_trio" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_capability_trio_parent_id_idx" ON "_posts_v_blocks_capability_trio" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_capability_trio_path_idx" ON "_posts_v_blocks_capability_trio" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_capability_tools_cards_logos_order_idx" ON "_posts_v_blocks_capability_tools_cards_logos" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_capability_tools_cards_logos_parent_id_idx" ON "_posts_v_blocks_capability_tools_cards_logos" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_capability_tools_cards_order_idx" ON "_posts_v_blocks_capability_tools_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_capability_tools_cards_parent_id_idx" ON "_posts_v_blocks_capability_tools_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_capability_tools_order_idx" ON "_posts_v_blocks_capability_tools" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_capability_tools_parent_id_idx" ON "_posts_v_blocks_capability_tools" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_capability_tools_path_idx" ON "_posts_v_blocks_capability_tools" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_use_cases_grid_cards_order_idx" ON "_posts_v_blocks_use_cases_grid_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_use_cases_grid_cards_parent_id_idx" ON "_posts_v_blocks_use_cases_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_use_cases_grid_order_idx" ON "_posts_v_blocks_use_cases_grid" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_use_cases_grid_parent_id_idx" ON "_posts_v_blocks_use_cases_grid" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_use_cases_grid_path_idx" ON "_posts_v_blocks_use_cases_grid" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_security_cards_order_idx" ON "_posts_v_blocks_security_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_security_cards_parent_id_idx" ON "_posts_v_blocks_security_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_security_order_idx" ON "_posts_v_blocks_security" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_security_parent_id_idx" ON "_posts_v_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_security_path_idx" ON "_posts_v_blocks_security" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_functional_capabilities_cards_order_idx" ON "_posts_v_blocks_functional_capabilities_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_functional_capabilities_cards_parent_id_idx" ON "_posts_v_blocks_functional_capabilities_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_functional_capabilities_order_idx" ON "_posts_v_blocks_functional_capabilities" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_functional_capabilities_parent_id_idx" ON "_posts_v_blocks_functional_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_functional_capabilities_path_idx" ON "_posts_v_blocks_functional_capabilities" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_how_it_works_steps_order_idx" ON "_posts_v_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_how_it_works_steps_parent_id_idx" ON "_posts_v_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_how_it_works_order_idx" ON "_posts_v_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_how_it_works_parent_id_idx" ON "_posts_v_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_how_it_works_path_idx" ON "_posts_v_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_cta_order_idx" ON "_posts_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cta_parent_id_idx" ON "_posts_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_cta_path_idx" ON "_posts_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_metrics_items_order_idx" ON "_posts_v_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_metrics_items_parent_id_idx" ON "_posts_v_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_metrics_order_idx" ON "_posts_v_blocks_metrics" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_metrics_parent_id_idx" ON "_posts_v_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_metrics_path_idx" ON "_posts_v_blocks_metrics" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_results_stats_items_order_idx" ON "_posts_v_blocks_results_stats_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_results_stats_items_parent_id_idx" ON "_posts_v_blocks_results_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_results_stats_order_idx" ON "_posts_v_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_results_stats_parent_id_idx" ON "_posts_v_blocks_results_stats" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_results_stats_path_idx" ON "_posts_v_blocks_results_stats" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_stats_cards_items_order_idx" ON "_posts_v_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_cards_items_parent_id_idx" ON "_posts_v_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_cards_order_idx" ON "_posts_v_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_cards_parent_id_idx" ON "_posts_v_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_cards_path_idx" ON "_posts_v_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_capability_strip_items_order_idx" ON "_posts_v_blocks_capability_strip_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_capability_strip_items_parent_id_idx" ON "_posts_v_blocks_capability_strip_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_capability_strip_order_idx" ON "_posts_v_blocks_capability_strip" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_capability_strip_parent_id_idx" ON "_posts_v_blocks_capability_strip" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_capability_strip_path_idx" ON "_posts_v_blocks_capability_strip" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_live_in_days_items_order_idx" ON "_posts_v_blocks_live_in_days_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_live_in_days_items_parent_id_idx" ON "_posts_v_blocks_live_in_days_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_live_in_days_order_idx" ON "_posts_v_blocks_live_in_days" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_live_in_days_parent_id_idx" ON "_posts_v_blocks_live_in_days" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_live_in_days_path_idx" ON "_posts_v_blocks_live_in_days" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_faq_items_order_idx" ON "_posts_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_items_parent_id_idx" ON "_posts_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_order_idx" ON "_posts_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_parent_id_idx" ON "_posts_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_path_idx" ON "_posts_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_news_insights_collections_order_idx" ON "_posts_v_blocks_news_insights_collections" USING btree ("order");
  CREATE INDEX "_posts_v_blocks_news_insights_collections_parent_idx" ON "_posts_v_blocks_news_insights_collections" USING btree ("parent_id");
  CREATE INDEX "_posts_v_blocks_news_insights_cards_tags_order_idx" ON "_posts_v_blocks_news_insights_cards_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_news_insights_cards_tags_parent_id_idx" ON "_posts_v_blocks_news_insights_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_news_insights_cards_order_idx" ON "_posts_v_blocks_news_insights_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_news_insights_cards_parent_id_idx" ON "_posts_v_blocks_news_insights_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_news_insights_order_idx" ON "_posts_v_blocks_news_insights" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_news_insights_parent_id_idx" ON "_posts_v_blocks_news_insights" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_news_insights_path_idx" ON "_posts_v_blocks_news_insights" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_content_feed_collections_order_idx" ON "_posts_v_blocks_content_feed_collections" USING btree ("order");
  CREATE INDEX "_posts_v_blocks_content_feed_collections_parent_idx" ON "_posts_v_blocks_content_feed_collections" USING btree ("parent_id");
  CREATE INDEX "_posts_v_blocks_content_feed_cards_tags_order_idx" ON "_posts_v_blocks_content_feed_cards_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_content_feed_cards_tags_parent_id_idx" ON "_posts_v_blocks_content_feed_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_content_feed_cards_order_idx" ON "_posts_v_blocks_content_feed_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_content_feed_cards_parent_id_idx" ON "_posts_v_blocks_content_feed_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_content_feed_order_idx" ON "_posts_v_blocks_content_feed" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_content_feed_parent_id_idx" ON "_posts_v_blocks_content_feed" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_content_feed_path_idx" ON "_posts_v_blocks_content_feed" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_pricing_cards_cards_features_order_idx" ON "_posts_v_blocks_pricing_cards_cards_features" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_cards_cards_features_parent_id_idx" ON "_posts_v_blocks_pricing_cards_cards_features" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_cards_cards_order_idx" ON "_posts_v_blocks_pricing_cards_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_cards_cards_parent_id_idx" ON "_posts_v_blocks_pricing_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_cards_order_idx" ON "_posts_v_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_cards_parent_id_idx" ON "_posts_v_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_cards_path_idx" ON "_posts_v_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_pricing_details_sections_headers_order_idx" ON "_posts_v_blocks_pricing_details_sections_headers" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_details_sections_headers_parent_id_idx" ON "_posts_v_blocks_pricing_details_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_details_sections_rows_cells_order_idx" ON "_posts_v_blocks_pricing_details_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_details_sections_rows_cells_parent_id_idx" ON "_posts_v_blocks_pricing_details_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_details_sections_rows_order_idx" ON "_posts_v_blocks_pricing_details_sections_rows" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_details_sections_rows_parent_id_idx" ON "_posts_v_blocks_pricing_details_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_details_sections_order_idx" ON "_posts_v_blocks_pricing_details_sections" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_details_sections_parent_id_idx" ON "_posts_v_blocks_pricing_details_sections" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_details_order_idx" ON "_posts_v_blocks_pricing_details" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_details_parent_id_idx" ON "_posts_v_blocks_pricing_details" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_details_path_idx" ON "_posts_v_blocks_pricing_details" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_difference_left_items_order_idx" ON "_posts_v_blocks_difference_left_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_difference_left_items_parent_id_idx" ON "_posts_v_blocks_difference_left_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_difference_right_items_order_idx" ON "_posts_v_blocks_difference_right_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_difference_right_items_parent_id_idx" ON "_posts_v_blocks_difference_right_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_difference_order_idx" ON "_posts_v_blocks_difference" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_difference_parent_id_idx" ON "_posts_v_blocks_difference" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_difference_path_idx" ON "_posts_v_blocks_difference" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_pain_points_comparison_rows_order_idx" ON "_posts_v_blocks_pain_points_comparison_rows" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pain_points_comparison_rows_parent_id_idx" ON "_posts_v_blocks_pain_points_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pain_points_comparison_order_idx" ON "_posts_v_blocks_pain_points_comparison" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pain_points_comparison_parent_id_idx" ON "_posts_v_blocks_pain_points_comparison" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pain_points_comparison_path_idx" ON "_posts_v_blocks_pain_points_comparison" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_pricing_policy_callouts_order_idx" ON "_posts_v_blocks_pricing_policy_callouts" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_policy_callouts_parent_id_idx" ON "_posts_v_blocks_pricing_policy_callouts" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_policy_order_idx" ON "_posts_v_blocks_pricing_policy" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_policy_parent_id_idx" ON "_posts_v_blocks_pricing_policy" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_policy_path_idx" ON "_posts_v_blocks_pricing_policy" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_industry_expertise_items_order_idx" ON "_posts_v_blocks_industry_expertise_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_industry_expertise_items_parent_id_idx" ON "_posts_v_blocks_industry_expertise_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_industry_expertise_info_cards_order_idx" ON "_posts_v_blocks_industry_expertise_info_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_industry_expertise_info_cards_parent_id_idx" ON "_posts_v_blocks_industry_expertise_info_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_industry_expertise_order_idx" ON "_posts_v_blocks_industry_expertise" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_industry_expertise_parent_id_idx" ON "_posts_v_blocks_industry_expertise" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_industry_expertise_path_idx" ON "_posts_v_blocks_industry_expertise" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_logo_strip_logos_order_idx" ON "_posts_v_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_logo_strip_logos_parent_id_idx" ON "_posts_v_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_strip_stats_order_idx" ON "_posts_v_blocks_logo_strip_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_logo_strip_stats_parent_id_idx" ON "_posts_v_blocks_logo_strip_stats" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_strip_order_idx" ON "_posts_v_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_logo_strip_parent_id_idx" ON "_posts_v_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_strip_path_idx" ON "_posts_v_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_integrations_banner_items_order_idx" ON "_posts_v_blocks_integrations_banner_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_integrations_banner_items_parent_id_idx" ON "_posts_v_blocks_integrations_banner_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_integrations_banner_order_idx" ON "_posts_v_blocks_integrations_banner" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_integrations_banner_parent_id_idx" ON "_posts_v_blocks_integrations_banner" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_integrations_banner_path_idx" ON "_posts_v_blocks_integrations_banner" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_logo_grid_columns_items_order_idx" ON "_posts_v_blocks_logo_grid_columns_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_logo_grid_columns_items_parent_id_idx" ON "_posts_v_blocks_logo_grid_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_grid_columns_order_idx" ON "_posts_v_blocks_logo_grid_columns" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_logo_grid_columns_parent_id_idx" ON "_posts_v_blocks_logo_grid_columns" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_grid_order_idx" ON "_posts_v_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_logo_grid_parent_id_idx" ON "_posts_v_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_grid_path_idx" ON "_posts_v_blocks_logo_grid" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_tabs_showcase_tabs_steps_order_idx" ON "_posts_v_blocks_tabs_showcase_tabs_steps" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_tabs_showcase_tabs_steps_parent_id_idx" ON "_posts_v_blocks_tabs_showcase_tabs_steps" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_tabs_showcase_tabs_order_idx" ON "_posts_v_blocks_tabs_showcase_tabs" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_tabs_showcase_tabs_parent_id_idx" ON "_posts_v_blocks_tabs_showcase_tabs" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_tabs_showcase_order_idx" ON "_posts_v_blocks_tabs_showcase" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_tabs_showcase_parent_id_idx" ON "_posts_v_blocks_tabs_showcase" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_tabs_showcase_path_idx" ON "_posts_v_blocks_tabs_showcase" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_anchor_nav_items_order_idx" ON "_posts_v_blocks_anchor_nav_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_anchor_nav_items_parent_id_idx" ON "_posts_v_blocks_anchor_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_anchor_nav_order_idx" ON "_posts_v_blocks_anchor_nav" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_anchor_nav_parent_id_idx" ON "_posts_v_blocks_anchor_nav" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_anchor_nav_path_idx" ON "_posts_v_blocks_anchor_nav" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_testimonials_items_order_idx" ON "_posts_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_testimonials_items_parent_id_idx" ON "_posts_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonials_order_idx" ON "_posts_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_testimonials_parent_id_idx" ON "_posts_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonials_path_idx" ON "_posts_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_comparison_grid_cards_order_idx" ON "_posts_v_blocks_comparison_grid_cards" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_comparison_grid_cards_parent_id_idx" ON "_posts_v_blocks_comparison_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_comparison_grid_order_idx" ON "_posts_v_blocks_comparison_grid" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_comparison_grid_parent_id_idx" ON "_posts_v_blocks_comparison_grid" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_comparison_grid_path_idx" ON "_posts_v_blocks_comparison_grid" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_use_case_flow_columns_items_order_idx" ON "_posts_v_blocks_use_case_flow_columns_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_use_case_flow_columns_items_parent_id_idx" ON "_posts_v_blocks_use_case_flow_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_use_case_flow_columns_order_idx" ON "_posts_v_blocks_use_case_flow_columns" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_use_case_flow_columns_parent_id_idx" ON "_posts_v_blocks_use_case_flow_columns" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_use_case_flow_order_idx" ON "_posts_v_blocks_use_case_flow" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_use_case_flow_parent_id_idx" ON "_posts_v_blocks_use_case_flow" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_use_case_flow_path_idx" ON "_posts_v_blocks_use_case_flow" USING btree ("_path");
  CREATE INDEX "_posts_v_version_article_meta_tags_order_idx" ON "_posts_v_version_article_meta_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_article_meta_tags_parent_id_idx" ON "_posts_v_version_article_meta_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_path_idx" ON "_posts_v" USING btree ("version_path");
  CREATE INDEX "_posts_v_version_version_content_key_idx" ON "_posts_v" USING btree ("version_content_key");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_news_v_blocks_hero_cards_order_idx" ON "_news_v_blocks_hero_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_hero_cards_parent_id_idx" ON "_news_v_blocks_hero_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_hero_order_idx" ON "_news_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_hero_parent_id_idx" ON "_news_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_hero_path_idx" ON "_news_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_hero_extended_cards_order_idx" ON "_news_v_blocks_hero_extended_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_hero_extended_cards_parent_id_idx" ON "_news_v_blocks_hero_extended_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_hero_extended_order_idx" ON "_news_v_blocks_hero_extended" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_hero_extended_parent_id_idx" ON "_news_v_blocks_hero_extended" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_hero_extended_path_idx" ON "_news_v_blocks_hero_extended" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_rich_text_order_idx" ON "_news_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_rich_text_parent_id_idx" ON "_news_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_rich_text_path_idx" ON "_news_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_side_by_side_bullets_order_idx" ON "_news_v_blocks_side_by_side_bullets" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_side_by_side_bullets_parent_id_idx" ON "_news_v_blocks_side_by_side_bullets" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_side_by_side_small_icons_order_idx" ON "_news_v_blocks_side_by_side_small_icons" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_side_by_side_small_icons_parent_id_idx" ON "_news_v_blocks_side_by_side_small_icons" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_side_by_side_bottom_cards_items_order_idx" ON "_news_v_blocks_side_by_side_bottom_cards_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_side_by_side_bottom_cards_items_parent_id_idx" ON "_news_v_blocks_side_by_side_bottom_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_side_by_side_bottom_cards_order_idx" ON "_news_v_blocks_side_by_side_bottom_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_side_by_side_bottom_cards_parent_id_idx" ON "_news_v_blocks_side_by_side_bottom_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_side_by_side_order_idx" ON "_news_v_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_side_by_side_parent_id_idx" ON "_news_v_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_side_by_side_path_idx" ON "_news_v_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_story_cards_order_idx" ON "_news_v_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_story_cards_parent_id_idx" ON "_news_v_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_story_order_idx" ON "_news_v_blocks_story" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_story_parent_id_idx" ON "_news_v_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_story_path_idx" ON "_news_v_blocks_story" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_media_showcase_order_idx" ON "_news_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_media_showcase_parent_id_idx" ON "_news_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_media_showcase_path_idx" ON "_news_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_feature_grid_cards_order_idx" ON "_news_v_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_feature_grid_cards_parent_id_idx" ON "_news_v_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_feature_grid_order_idx" ON "_news_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_feature_grid_parent_id_idx" ON "_news_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_feature_grid_path_idx" ON "_news_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_agent_capabilities_items_order_idx" ON "_news_v_blocks_agent_capabilities_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_agent_capabilities_items_parent_id_idx" ON "_news_v_blocks_agent_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_agent_capabilities_order_idx" ON "_news_v_blocks_agent_capabilities" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_agent_capabilities_parent_id_idx" ON "_news_v_blocks_agent_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_agent_capabilities_path_idx" ON "_news_v_blocks_agent_capabilities" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_agent_solutions_items_order_idx" ON "_news_v_blocks_agent_solutions_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_agent_solutions_items_parent_id_idx" ON "_news_v_blocks_agent_solutions_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_agent_solutions_order_idx" ON "_news_v_blocks_agent_solutions" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_agent_solutions_parent_id_idx" ON "_news_v_blocks_agent_solutions" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_agent_solutions_path_idx" ON "_news_v_blocks_agent_solutions" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_contact_us_order_idx" ON "_news_v_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_contact_us_parent_id_idx" ON "_news_v_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_contact_us_path_idx" ON "_news_v_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_concierge_flow_cards_order_idx" ON "_news_v_blocks_concierge_flow_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_concierge_flow_cards_parent_id_idx" ON "_news_v_blocks_concierge_flow_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_concierge_flow_order_idx" ON "_news_v_blocks_concierge_flow" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_concierge_flow_parent_id_idx" ON "_news_v_blocks_concierge_flow" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_concierge_flow_path_idx" ON "_news_v_blocks_concierge_flow" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_enterprise_upgrade_benefits_order_idx" ON "_news_v_blocks_enterprise_upgrade_benefits" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_enterprise_upgrade_benefits_parent_id_idx" ON "_news_v_blocks_enterprise_upgrade_benefits" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_enterprise_upgrade_order_idx" ON "_news_v_blocks_enterprise_upgrade" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_enterprise_upgrade_parent_id_idx" ON "_news_v_blocks_enterprise_upgrade" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_enterprise_upgrade_path_idx" ON "_news_v_blocks_enterprise_upgrade" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_channels_grid_cards_order_idx" ON "_news_v_blocks_channels_grid_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_channels_grid_cards_parent_id_idx" ON "_news_v_blocks_channels_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_channels_grid_order_idx" ON "_news_v_blocks_channels_grid" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_channels_grid_parent_id_idx" ON "_news_v_blocks_channels_grid" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_channels_grid_path_idx" ON "_news_v_blocks_channels_grid" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_feature_stack_cards_order_idx" ON "_news_v_blocks_feature_stack_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_feature_stack_cards_parent_id_idx" ON "_news_v_blocks_feature_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_feature_stack_order_idx" ON "_news_v_blocks_feature_stack" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_feature_stack_parent_id_idx" ON "_news_v_blocks_feature_stack" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_feature_stack_path_idx" ON "_news_v_blocks_feature_stack" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_coverage_grid_cards_order_idx" ON "_news_v_blocks_coverage_grid_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_coverage_grid_cards_parent_id_idx" ON "_news_v_blocks_coverage_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_coverage_grid_order_idx" ON "_news_v_blocks_coverage_grid" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_coverage_grid_parent_id_idx" ON "_news_v_blocks_coverage_grid" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_coverage_grid_path_idx" ON "_news_v_blocks_coverage_grid" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_feature_rows_rows_order_idx" ON "_news_v_blocks_feature_rows_rows" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_feature_rows_rows_parent_id_idx" ON "_news_v_blocks_feature_rows_rows" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_feature_rows_order_idx" ON "_news_v_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_feature_rows_parent_id_idx" ON "_news_v_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_feature_rows_path_idx" ON "_news_v_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_capability_trio_cards_order_idx" ON "_news_v_blocks_capability_trio_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_capability_trio_cards_parent_id_idx" ON "_news_v_blocks_capability_trio_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_capability_trio_order_idx" ON "_news_v_blocks_capability_trio" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_capability_trio_parent_id_idx" ON "_news_v_blocks_capability_trio" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_capability_trio_path_idx" ON "_news_v_blocks_capability_trio" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_capability_tools_cards_logos_order_idx" ON "_news_v_blocks_capability_tools_cards_logos" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_capability_tools_cards_logos_parent_id_idx" ON "_news_v_blocks_capability_tools_cards_logos" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_capability_tools_cards_order_idx" ON "_news_v_blocks_capability_tools_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_capability_tools_cards_parent_id_idx" ON "_news_v_blocks_capability_tools_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_capability_tools_order_idx" ON "_news_v_blocks_capability_tools" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_capability_tools_parent_id_idx" ON "_news_v_blocks_capability_tools" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_capability_tools_path_idx" ON "_news_v_blocks_capability_tools" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_use_cases_grid_cards_order_idx" ON "_news_v_blocks_use_cases_grid_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_use_cases_grid_cards_parent_id_idx" ON "_news_v_blocks_use_cases_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_use_cases_grid_order_idx" ON "_news_v_blocks_use_cases_grid" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_use_cases_grid_parent_id_idx" ON "_news_v_blocks_use_cases_grid" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_use_cases_grid_path_idx" ON "_news_v_blocks_use_cases_grid" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_security_cards_order_idx" ON "_news_v_blocks_security_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_security_cards_parent_id_idx" ON "_news_v_blocks_security_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_security_order_idx" ON "_news_v_blocks_security" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_security_parent_id_idx" ON "_news_v_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_security_path_idx" ON "_news_v_blocks_security" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_functional_capabilities_cards_order_idx" ON "_news_v_blocks_functional_capabilities_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_functional_capabilities_cards_parent_id_idx" ON "_news_v_blocks_functional_capabilities_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_functional_capabilities_order_idx" ON "_news_v_blocks_functional_capabilities" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_functional_capabilities_parent_id_idx" ON "_news_v_blocks_functional_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_functional_capabilities_path_idx" ON "_news_v_blocks_functional_capabilities" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_how_it_works_steps_order_idx" ON "_news_v_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_how_it_works_steps_parent_id_idx" ON "_news_v_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_how_it_works_order_idx" ON "_news_v_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_how_it_works_parent_id_idx" ON "_news_v_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_how_it_works_path_idx" ON "_news_v_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_cta_order_idx" ON "_news_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_cta_parent_id_idx" ON "_news_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_cta_path_idx" ON "_news_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_metrics_items_order_idx" ON "_news_v_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_metrics_items_parent_id_idx" ON "_news_v_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_metrics_order_idx" ON "_news_v_blocks_metrics" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_metrics_parent_id_idx" ON "_news_v_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_metrics_path_idx" ON "_news_v_blocks_metrics" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_results_stats_items_order_idx" ON "_news_v_blocks_results_stats_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_results_stats_items_parent_id_idx" ON "_news_v_blocks_results_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_results_stats_order_idx" ON "_news_v_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_results_stats_parent_id_idx" ON "_news_v_blocks_results_stats" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_results_stats_path_idx" ON "_news_v_blocks_results_stats" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_stats_cards_items_order_idx" ON "_news_v_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_stats_cards_items_parent_id_idx" ON "_news_v_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_stats_cards_order_idx" ON "_news_v_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_stats_cards_parent_id_idx" ON "_news_v_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_stats_cards_path_idx" ON "_news_v_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_capability_strip_items_order_idx" ON "_news_v_blocks_capability_strip_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_capability_strip_items_parent_id_idx" ON "_news_v_blocks_capability_strip_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_capability_strip_order_idx" ON "_news_v_blocks_capability_strip" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_capability_strip_parent_id_idx" ON "_news_v_blocks_capability_strip" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_capability_strip_path_idx" ON "_news_v_blocks_capability_strip" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_live_in_days_items_order_idx" ON "_news_v_blocks_live_in_days_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_live_in_days_items_parent_id_idx" ON "_news_v_blocks_live_in_days_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_live_in_days_order_idx" ON "_news_v_blocks_live_in_days" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_live_in_days_parent_id_idx" ON "_news_v_blocks_live_in_days" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_live_in_days_path_idx" ON "_news_v_blocks_live_in_days" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_faq_items_order_idx" ON "_news_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_faq_items_parent_id_idx" ON "_news_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_faq_order_idx" ON "_news_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_faq_parent_id_idx" ON "_news_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_faq_path_idx" ON "_news_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_news_insights_collections_order_idx" ON "_news_v_blocks_news_insights_collections" USING btree ("order");
  CREATE INDEX "_news_v_blocks_news_insights_collections_parent_idx" ON "_news_v_blocks_news_insights_collections" USING btree ("parent_id");
  CREATE INDEX "_news_v_blocks_news_insights_cards_tags_order_idx" ON "_news_v_blocks_news_insights_cards_tags" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_news_insights_cards_tags_parent_id_idx" ON "_news_v_blocks_news_insights_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_news_insights_cards_order_idx" ON "_news_v_blocks_news_insights_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_news_insights_cards_parent_id_idx" ON "_news_v_blocks_news_insights_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_news_insights_order_idx" ON "_news_v_blocks_news_insights" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_news_insights_parent_id_idx" ON "_news_v_blocks_news_insights" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_news_insights_path_idx" ON "_news_v_blocks_news_insights" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_content_feed_collections_order_idx" ON "_news_v_blocks_content_feed_collections" USING btree ("order");
  CREATE INDEX "_news_v_blocks_content_feed_collections_parent_idx" ON "_news_v_blocks_content_feed_collections" USING btree ("parent_id");
  CREATE INDEX "_news_v_blocks_content_feed_cards_tags_order_idx" ON "_news_v_blocks_content_feed_cards_tags" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_content_feed_cards_tags_parent_id_idx" ON "_news_v_blocks_content_feed_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_content_feed_cards_order_idx" ON "_news_v_blocks_content_feed_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_content_feed_cards_parent_id_idx" ON "_news_v_blocks_content_feed_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_content_feed_order_idx" ON "_news_v_blocks_content_feed" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_content_feed_parent_id_idx" ON "_news_v_blocks_content_feed" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_content_feed_path_idx" ON "_news_v_blocks_content_feed" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_pricing_cards_cards_features_order_idx" ON "_news_v_blocks_pricing_cards_cards_features" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_pricing_cards_cards_features_parent_id_idx" ON "_news_v_blocks_pricing_cards_cards_features" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_pricing_cards_cards_order_idx" ON "_news_v_blocks_pricing_cards_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_pricing_cards_cards_parent_id_idx" ON "_news_v_blocks_pricing_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_pricing_cards_order_idx" ON "_news_v_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_pricing_cards_parent_id_idx" ON "_news_v_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_pricing_cards_path_idx" ON "_news_v_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_pricing_details_sections_headers_order_idx" ON "_news_v_blocks_pricing_details_sections_headers" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_pricing_details_sections_headers_parent_id_idx" ON "_news_v_blocks_pricing_details_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_pricing_details_sections_rows_cells_order_idx" ON "_news_v_blocks_pricing_details_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_pricing_details_sections_rows_cells_parent_id_idx" ON "_news_v_blocks_pricing_details_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_pricing_details_sections_rows_order_idx" ON "_news_v_blocks_pricing_details_sections_rows" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_pricing_details_sections_rows_parent_id_idx" ON "_news_v_blocks_pricing_details_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_pricing_details_sections_order_idx" ON "_news_v_blocks_pricing_details_sections" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_pricing_details_sections_parent_id_idx" ON "_news_v_blocks_pricing_details_sections" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_pricing_details_order_idx" ON "_news_v_blocks_pricing_details" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_pricing_details_parent_id_idx" ON "_news_v_blocks_pricing_details" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_pricing_details_path_idx" ON "_news_v_blocks_pricing_details" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_difference_left_items_order_idx" ON "_news_v_blocks_difference_left_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_difference_left_items_parent_id_idx" ON "_news_v_blocks_difference_left_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_difference_right_items_order_idx" ON "_news_v_blocks_difference_right_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_difference_right_items_parent_id_idx" ON "_news_v_blocks_difference_right_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_difference_order_idx" ON "_news_v_blocks_difference" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_difference_parent_id_idx" ON "_news_v_blocks_difference" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_difference_path_idx" ON "_news_v_blocks_difference" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_pain_points_comparison_rows_order_idx" ON "_news_v_blocks_pain_points_comparison_rows" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_pain_points_comparison_rows_parent_id_idx" ON "_news_v_blocks_pain_points_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_pain_points_comparison_order_idx" ON "_news_v_blocks_pain_points_comparison" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_pain_points_comparison_parent_id_idx" ON "_news_v_blocks_pain_points_comparison" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_pain_points_comparison_path_idx" ON "_news_v_blocks_pain_points_comparison" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_pricing_policy_callouts_order_idx" ON "_news_v_blocks_pricing_policy_callouts" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_pricing_policy_callouts_parent_id_idx" ON "_news_v_blocks_pricing_policy_callouts" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_pricing_policy_order_idx" ON "_news_v_blocks_pricing_policy" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_pricing_policy_parent_id_idx" ON "_news_v_blocks_pricing_policy" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_pricing_policy_path_idx" ON "_news_v_blocks_pricing_policy" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_industry_expertise_items_order_idx" ON "_news_v_blocks_industry_expertise_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_industry_expertise_items_parent_id_idx" ON "_news_v_blocks_industry_expertise_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_industry_expertise_info_cards_order_idx" ON "_news_v_blocks_industry_expertise_info_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_industry_expertise_info_cards_parent_id_idx" ON "_news_v_blocks_industry_expertise_info_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_industry_expertise_order_idx" ON "_news_v_blocks_industry_expertise" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_industry_expertise_parent_id_idx" ON "_news_v_blocks_industry_expertise" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_industry_expertise_path_idx" ON "_news_v_blocks_industry_expertise" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_logo_strip_logos_order_idx" ON "_news_v_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_logo_strip_logos_parent_id_idx" ON "_news_v_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_logo_strip_stats_order_idx" ON "_news_v_blocks_logo_strip_stats" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_logo_strip_stats_parent_id_idx" ON "_news_v_blocks_logo_strip_stats" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_logo_strip_order_idx" ON "_news_v_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_logo_strip_parent_id_idx" ON "_news_v_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_logo_strip_path_idx" ON "_news_v_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_integrations_banner_items_order_idx" ON "_news_v_blocks_integrations_banner_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_integrations_banner_items_parent_id_idx" ON "_news_v_blocks_integrations_banner_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_integrations_banner_order_idx" ON "_news_v_blocks_integrations_banner" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_integrations_banner_parent_id_idx" ON "_news_v_blocks_integrations_banner" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_integrations_banner_path_idx" ON "_news_v_blocks_integrations_banner" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_logo_grid_columns_items_order_idx" ON "_news_v_blocks_logo_grid_columns_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_logo_grid_columns_items_parent_id_idx" ON "_news_v_blocks_logo_grid_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_logo_grid_columns_order_idx" ON "_news_v_blocks_logo_grid_columns" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_logo_grid_columns_parent_id_idx" ON "_news_v_blocks_logo_grid_columns" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_logo_grid_order_idx" ON "_news_v_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_logo_grid_parent_id_idx" ON "_news_v_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_logo_grid_path_idx" ON "_news_v_blocks_logo_grid" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_tabs_showcase_tabs_steps_order_idx" ON "_news_v_blocks_tabs_showcase_tabs_steps" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_tabs_showcase_tabs_steps_parent_id_idx" ON "_news_v_blocks_tabs_showcase_tabs_steps" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_tabs_showcase_tabs_order_idx" ON "_news_v_blocks_tabs_showcase_tabs" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_tabs_showcase_tabs_parent_id_idx" ON "_news_v_blocks_tabs_showcase_tabs" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_tabs_showcase_order_idx" ON "_news_v_blocks_tabs_showcase" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_tabs_showcase_parent_id_idx" ON "_news_v_blocks_tabs_showcase" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_tabs_showcase_path_idx" ON "_news_v_blocks_tabs_showcase" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_anchor_nav_items_order_idx" ON "_news_v_blocks_anchor_nav_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_anchor_nav_items_parent_id_idx" ON "_news_v_blocks_anchor_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_anchor_nav_order_idx" ON "_news_v_blocks_anchor_nav" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_anchor_nav_parent_id_idx" ON "_news_v_blocks_anchor_nav" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_anchor_nav_path_idx" ON "_news_v_blocks_anchor_nav" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_testimonials_items_order_idx" ON "_news_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_testimonials_items_parent_id_idx" ON "_news_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_testimonials_order_idx" ON "_news_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_testimonials_parent_id_idx" ON "_news_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_testimonials_path_idx" ON "_news_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_comparison_grid_cards_order_idx" ON "_news_v_blocks_comparison_grid_cards" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_comparison_grid_cards_parent_id_idx" ON "_news_v_blocks_comparison_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_comparison_grid_order_idx" ON "_news_v_blocks_comparison_grid" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_comparison_grid_parent_id_idx" ON "_news_v_blocks_comparison_grid" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_comparison_grid_path_idx" ON "_news_v_blocks_comparison_grid" USING btree ("_path");
  CREATE INDEX "_news_v_blocks_use_case_flow_columns_items_order_idx" ON "_news_v_blocks_use_case_flow_columns_items" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_use_case_flow_columns_items_parent_id_idx" ON "_news_v_blocks_use_case_flow_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_use_case_flow_columns_order_idx" ON "_news_v_blocks_use_case_flow_columns" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_use_case_flow_columns_parent_id_idx" ON "_news_v_blocks_use_case_flow_columns" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_use_case_flow_order_idx" ON "_news_v_blocks_use_case_flow" USING btree ("_order");
  CREATE INDEX "_news_v_blocks_use_case_flow_parent_id_idx" ON "_news_v_blocks_use_case_flow" USING btree ("_parent_id");
  CREATE INDEX "_news_v_blocks_use_case_flow_path_idx" ON "_news_v_blocks_use_case_flow" USING btree ("_path");
  CREATE INDEX "_news_v_version_article_meta_tags_order_idx" ON "_news_v_version_article_meta_tags" USING btree ("_order");
  CREATE INDEX "_news_v_version_article_meta_tags_parent_id_idx" ON "_news_v_version_article_meta_tags" USING btree ("_parent_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_featured_image_idx" ON "_news_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_path_idx" ON "_news_v" USING btree ("version_path");
  CREATE INDEX "_news_v_version_version_content_key_idx" ON "_news_v" USING btree ("version_content_key");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "_guides_v_blocks_hero_cards_order_idx" ON "_guides_v_blocks_hero_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_hero_cards_parent_id_idx" ON "_guides_v_blocks_hero_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_hero_order_idx" ON "_guides_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_hero_parent_id_idx" ON "_guides_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_hero_path_idx" ON "_guides_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_hero_extended_cards_order_idx" ON "_guides_v_blocks_hero_extended_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_hero_extended_cards_parent_id_idx" ON "_guides_v_blocks_hero_extended_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_hero_extended_order_idx" ON "_guides_v_blocks_hero_extended" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_hero_extended_parent_id_idx" ON "_guides_v_blocks_hero_extended" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_hero_extended_path_idx" ON "_guides_v_blocks_hero_extended" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_rich_text_order_idx" ON "_guides_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_rich_text_parent_id_idx" ON "_guides_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_rich_text_path_idx" ON "_guides_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_side_by_side_bullets_order_idx" ON "_guides_v_blocks_side_by_side_bullets" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_side_by_side_bullets_parent_id_idx" ON "_guides_v_blocks_side_by_side_bullets" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_side_by_side_small_icons_order_idx" ON "_guides_v_blocks_side_by_side_small_icons" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_side_by_side_small_icons_parent_id_idx" ON "_guides_v_blocks_side_by_side_small_icons" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_side_by_side_bottom_cards_items_order_idx" ON "_guides_v_blocks_side_by_side_bottom_cards_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_side_by_side_bottom_cards_items_parent_id_idx" ON "_guides_v_blocks_side_by_side_bottom_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_side_by_side_bottom_cards_order_idx" ON "_guides_v_blocks_side_by_side_bottom_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_side_by_side_bottom_cards_parent_id_idx" ON "_guides_v_blocks_side_by_side_bottom_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_side_by_side_order_idx" ON "_guides_v_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_side_by_side_parent_id_idx" ON "_guides_v_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_side_by_side_path_idx" ON "_guides_v_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_story_cards_order_idx" ON "_guides_v_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_story_cards_parent_id_idx" ON "_guides_v_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_story_order_idx" ON "_guides_v_blocks_story" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_story_parent_id_idx" ON "_guides_v_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_story_path_idx" ON "_guides_v_blocks_story" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_media_showcase_order_idx" ON "_guides_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_media_showcase_parent_id_idx" ON "_guides_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_media_showcase_path_idx" ON "_guides_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_feature_grid_cards_order_idx" ON "_guides_v_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_feature_grid_cards_parent_id_idx" ON "_guides_v_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_feature_grid_order_idx" ON "_guides_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_feature_grid_parent_id_idx" ON "_guides_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_feature_grid_path_idx" ON "_guides_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_agent_capabilities_items_order_idx" ON "_guides_v_blocks_agent_capabilities_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_agent_capabilities_items_parent_id_idx" ON "_guides_v_blocks_agent_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_agent_capabilities_order_idx" ON "_guides_v_blocks_agent_capabilities" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_agent_capabilities_parent_id_idx" ON "_guides_v_blocks_agent_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_agent_capabilities_path_idx" ON "_guides_v_blocks_agent_capabilities" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_agent_solutions_items_order_idx" ON "_guides_v_blocks_agent_solutions_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_agent_solutions_items_parent_id_idx" ON "_guides_v_blocks_agent_solutions_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_agent_solutions_order_idx" ON "_guides_v_blocks_agent_solutions" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_agent_solutions_parent_id_idx" ON "_guides_v_blocks_agent_solutions" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_agent_solutions_path_idx" ON "_guides_v_blocks_agent_solutions" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_contact_us_order_idx" ON "_guides_v_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_contact_us_parent_id_idx" ON "_guides_v_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_contact_us_path_idx" ON "_guides_v_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_concierge_flow_cards_order_idx" ON "_guides_v_blocks_concierge_flow_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_concierge_flow_cards_parent_id_idx" ON "_guides_v_blocks_concierge_flow_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_concierge_flow_order_idx" ON "_guides_v_blocks_concierge_flow" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_concierge_flow_parent_id_idx" ON "_guides_v_blocks_concierge_flow" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_concierge_flow_path_idx" ON "_guides_v_blocks_concierge_flow" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_enterprise_upgrade_benefits_order_idx" ON "_guides_v_blocks_enterprise_upgrade_benefits" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_enterprise_upgrade_benefits_parent_id_idx" ON "_guides_v_blocks_enterprise_upgrade_benefits" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_enterprise_upgrade_order_idx" ON "_guides_v_blocks_enterprise_upgrade" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_enterprise_upgrade_parent_id_idx" ON "_guides_v_blocks_enterprise_upgrade" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_enterprise_upgrade_path_idx" ON "_guides_v_blocks_enterprise_upgrade" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_channels_grid_cards_order_idx" ON "_guides_v_blocks_channels_grid_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_channels_grid_cards_parent_id_idx" ON "_guides_v_blocks_channels_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_channels_grid_order_idx" ON "_guides_v_blocks_channels_grid" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_channels_grid_parent_id_idx" ON "_guides_v_blocks_channels_grid" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_channels_grid_path_idx" ON "_guides_v_blocks_channels_grid" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_feature_stack_cards_order_idx" ON "_guides_v_blocks_feature_stack_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_feature_stack_cards_parent_id_idx" ON "_guides_v_blocks_feature_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_feature_stack_order_idx" ON "_guides_v_blocks_feature_stack" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_feature_stack_parent_id_idx" ON "_guides_v_blocks_feature_stack" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_feature_stack_path_idx" ON "_guides_v_blocks_feature_stack" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_coverage_grid_cards_order_idx" ON "_guides_v_blocks_coverage_grid_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_coverage_grid_cards_parent_id_idx" ON "_guides_v_blocks_coverage_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_coverage_grid_order_idx" ON "_guides_v_blocks_coverage_grid" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_coverage_grid_parent_id_idx" ON "_guides_v_blocks_coverage_grid" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_coverage_grid_path_idx" ON "_guides_v_blocks_coverage_grid" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_feature_rows_rows_order_idx" ON "_guides_v_blocks_feature_rows_rows" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_feature_rows_rows_parent_id_idx" ON "_guides_v_blocks_feature_rows_rows" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_feature_rows_order_idx" ON "_guides_v_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_feature_rows_parent_id_idx" ON "_guides_v_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_feature_rows_path_idx" ON "_guides_v_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_capability_trio_cards_order_idx" ON "_guides_v_blocks_capability_trio_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_capability_trio_cards_parent_id_idx" ON "_guides_v_blocks_capability_trio_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_capability_trio_order_idx" ON "_guides_v_blocks_capability_trio" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_capability_trio_parent_id_idx" ON "_guides_v_blocks_capability_trio" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_capability_trio_path_idx" ON "_guides_v_blocks_capability_trio" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_capability_tools_cards_logos_order_idx" ON "_guides_v_blocks_capability_tools_cards_logos" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_capability_tools_cards_logos_parent_id_idx" ON "_guides_v_blocks_capability_tools_cards_logos" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_capability_tools_cards_order_idx" ON "_guides_v_blocks_capability_tools_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_capability_tools_cards_parent_id_idx" ON "_guides_v_blocks_capability_tools_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_capability_tools_order_idx" ON "_guides_v_blocks_capability_tools" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_capability_tools_parent_id_idx" ON "_guides_v_blocks_capability_tools" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_capability_tools_path_idx" ON "_guides_v_blocks_capability_tools" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_use_cases_grid_cards_order_idx" ON "_guides_v_blocks_use_cases_grid_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_use_cases_grid_cards_parent_id_idx" ON "_guides_v_blocks_use_cases_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_use_cases_grid_order_idx" ON "_guides_v_blocks_use_cases_grid" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_use_cases_grid_parent_id_idx" ON "_guides_v_blocks_use_cases_grid" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_use_cases_grid_path_idx" ON "_guides_v_blocks_use_cases_grid" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_security_cards_order_idx" ON "_guides_v_blocks_security_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_security_cards_parent_id_idx" ON "_guides_v_blocks_security_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_security_order_idx" ON "_guides_v_blocks_security" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_security_parent_id_idx" ON "_guides_v_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_security_path_idx" ON "_guides_v_blocks_security" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_functional_capabilities_cards_order_idx" ON "_guides_v_blocks_functional_capabilities_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_functional_capabilities_cards_parent_id_idx" ON "_guides_v_blocks_functional_capabilities_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_functional_capabilities_order_idx" ON "_guides_v_blocks_functional_capabilities" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_functional_capabilities_parent_id_idx" ON "_guides_v_blocks_functional_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_functional_capabilities_path_idx" ON "_guides_v_blocks_functional_capabilities" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_how_it_works_steps_order_idx" ON "_guides_v_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_how_it_works_steps_parent_id_idx" ON "_guides_v_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_how_it_works_order_idx" ON "_guides_v_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_how_it_works_parent_id_idx" ON "_guides_v_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_how_it_works_path_idx" ON "_guides_v_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_cta_order_idx" ON "_guides_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_cta_parent_id_idx" ON "_guides_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_cta_path_idx" ON "_guides_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_metrics_items_order_idx" ON "_guides_v_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_metrics_items_parent_id_idx" ON "_guides_v_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_metrics_order_idx" ON "_guides_v_blocks_metrics" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_metrics_parent_id_idx" ON "_guides_v_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_metrics_path_idx" ON "_guides_v_blocks_metrics" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_results_stats_items_order_idx" ON "_guides_v_blocks_results_stats_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_results_stats_items_parent_id_idx" ON "_guides_v_blocks_results_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_results_stats_order_idx" ON "_guides_v_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_results_stats_parent_id_idx" ON "_guides_v_blocks_results_stats" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_results_stats_path_idx" ON "_guides_v_blocks_results_stats" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_stats_cards_items_order_idx" ON "_guides_v_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_stats_cards_items_parent_id_idx" ON "_guides_v_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_stats_cards_order_idx" ON "_guides_v_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_stats_cards_parent_id_idx" ON "_guides_v_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_stats_cards_path_idx" ON "_guides_v_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_capability_strip_items_order_idx" ON "_guides_v_blocks_capability_strip_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_capability_strip_items_parent_id_idx" ON "_guides_v_blocks_capability_strip_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_capability_strip_order_idx" ON "_guides_v_blocks_capability_strip" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_capability_strip_parent_id_idx" ON "_guides_v_blocks_capability_strip" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_capability_strip_path_idx" ON "_guides_v_blocks_capability_strip" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_live_in_days_items_order_idx" ON "_guides_v_blocks_live_in_days_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_live_in_days_items_parent_id_idx" ON "_guides_v_blocks_live_in_days_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_live_in_days_order_idx" ON "_guides_v_blocks_live_in_days" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_live_in_days_parent_id_idx" ON "_guides_v_blocks_live_in_days" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_live_in_days_path_idx" ON "_guides_v_blocks_live_in_days" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_faq_items_order_idx" ON "_guides_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_faq_items_parent_id_idx" ON "_guides_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_faq_order_idx" ON "_guides_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_faq_parent_id_idx" ON "_guides_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_faq_path_idx" ON "_guides_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_news_insights_collections_order_idx" ON "_guides_v_blocks_news_insights_collections" USING btree ("order");
  CREATE INDEX "_guides_v_blocks_news_insights_collections_parent_idx" ON "_guides_v_blocks_news_insights_collections" USING btree ("parent_id");
  CREATE INDEX "_guides_v_blocks_news_insights_cards_tags_order_idx" ON "_guides_v_blocks_news_insights_cards_tags" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_news_insights_cards_tags_parent_id_idx" ON "_guides_v_blocks_news_insights_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_news_insights_cards_order_idx" ON "_guides_v_blocks_news_insights_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_news_insights_cards_parent_id_idx" ON "_guides_v_blocks_news_insights_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_news_insights_order_idx" ON "_guides_v_blocks_news_insights" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_news_insights_parent_id_idx" ON "_guides_v_blocks_news_insights" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_news_insights_path_idx" ON "_guides_v_blocks_news_insights" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_content_feed_collections_order_idx" ON "_guides_v_blocks_content_feed_collections" USING btree ("order");
  CREATE INDEX "_guides_v_blocks_content_feed_collections_parent_idx" ON "_guides_v_blocks_content_feed_collections" USING btree ("parent_id");
  CREATE INDEX "_guides_v_blocks_content_feed_cards_tags_order_idx" ON "_guides_v_blocks_content_feed_cards_tags" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_content_feed_cards_tags_parent_id_idx" ON "_guides_v_blocks_content_feed_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_content_feed_cards_order_idx" ON "_guides_v_blocks_content_feed_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_content_feed_cards_parent_id_idx" ON "_guides_v_blocks_content_feed_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_content_feed_order_idx" ON "_guides_v_blocks_content_feed" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_content_feed_parent_id_idx" ON "_guides_v_blocks_content_feed" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_content_feed_path_idx" ON "_guides_v_blocks_content_feed" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_pricing_cards_cards_features_order_idx" ON "_guides_v_blocks_pricing_cards_cards_features" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_pricing_cards_cards_features_parent_id_idx" ON "_guides_v_blocks_pricing_cards_cards_features" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_pricing_cards_cards_order_idx" ON "_guides_v_blocks_pricing_cards_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_pricing_cards_cards_parent_id_idx" ON "_guides_v_blocks_pricing_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_pricing_cards_order_idx" ON "_guides_v_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_pricing_cards_parent_id_idx" ON "_guides_v_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_pricing_cards_path_idx" ON "_guides_v_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_pricing_details_sections_headers_order_idx" ON "_guides_v_blocks_pricing_details_sections_headers" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_pricing_details_sections_headers_parent_id_idx" ON "_guides_v_blocks_pricing_details_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_pricing_details_sections_rows_cells_order_idx" ON "_guides_v_blocks_pricing_details_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_pricing_details_sections_rows_cells_parent_id_idx" ON "_guides_v_blocks_pricing_details_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_pricing_details_sections_rows_order_idx" ON "_guides_v_blocks_pricing_details_sections_rows" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_pricing_details_sections_rows_parent_id_idx" ON "_guides_v_blocks_pricing_details_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_pricing_details_sections_order_idx" ON "_guides_v_blocks_pricing_details_sections" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_pricing_details_sections_parent_id_idx" ON "_guides_v_blocks_pricing_details_sections" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_pricing_details_order_idx" ON "_guides_v_blocks_pricing_details" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_pricing_details_parent_id_idx" ON "_guides_v_blocks_pricing_details" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_pricing_details_path_idx" ON "_guides_v_blocks_pricing_details" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_difference_left_items_order_idx" ON "_guides_v_blocks_difference_left_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_difference_left_items_parent_id_idx" ON "_guides_v_blocks_difference_left_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_difference_right_items_order_idx" ON "_guides_v_blocks_difference_right_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_difference_right_items_parent_id_idx" ON "_guides_v_blocks_difference_right_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_difference_order_idx" ON "_guides_v_blocks_difference" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_difference_parent_id_idx" ON "_guides_v_blocks_difference" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_difference_path_idx" ON "_guides_v_blocks_difference" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_pain_points_comparison_rows_order_idx" ON "_guides_v_blocks_pain_points_comparison_rows" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_pain_points_comparison_rows_parent_id_idx" ON "_guides_v_blocks_pain_points_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_pain_points_comparison_order_idx" ON "_guides_v_blocks_pain_points_comparison" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_pain_points_comparison_parent_id_idx" ON "_guides_v_blocks_pain_points_comparison" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_pain_points_comparison_path_idx" ON "_guides_v_blocks_pain_points_comparison" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_pricing_policy_callouts_order_idx" ON "_guides_v_blocks_pricing_policy_callouts" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_pricing_policy_callouts_parent_id_idx" ON "_guides_v_blocks_pricing_policy_callouts" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_pricing_policy_order_idx" ON "_guides_v_blocks_pricing_policy" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_pricing_policy_parent_id_idx" ON "_guides_v_blocks_pricing_policy" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_pricing_policy_path_idx" ON "_guides_v_blocks_pricing_policy" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_industry_expertise_items_order_idx" ON "_guides_v_blocks_industry_expertise_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_industry_expertise_items_parent_id_idx" ON "_guides_v_blocks_industry_expertise_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_industry_expertise_info_cards_order_idx" ON "_guides_v_blocks_industry_expertise_info_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_industry_expertise_info_cards_parent_id_idx" ON "_guides_v_blocks_industry_expertise_info_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_industry_expertise_order_idx" ON "_guides_v_blocks_industry_expertise" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_industry_expertise_parent_id_idx" ON "_guides_v_blocks_industry_expertise" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_industry_expertise_path_idx" ON "_guides_v_blocks_industry_expertise" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_logo_strip_logos_order_idx" ON "_guides_v_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_logo_strip_logos_parent_id_idx" ON "_guides_v_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_logo_strip_stats_order_idx" ON "_guides_v_blocks_logo_strip_stats" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_logo_strip_stats_parent_id_idx" ON "_guides_v_blocks_logo_strip_stats" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_logo_strip_order_idx" ON "_guides_v_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_logo_strip_parent_id_idx" ON "_guides_v_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_logo_strip_path_idx" ON "_guides_v_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_integrations_banner_items_order_idx" ON "_guides_v_blocks_integrations_banner_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_integrations_banner_items_parent_id_idx" ON "_guides_v_blocks_integrations_banner_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_integrations_banner_order_idx" ON "_guides_v_blocks_integrations_banner" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_integrations_banner_parent_id_idx" ON "_guides_v_blocks_integrations_banner" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_integrations_banner_path_idx" ON "_guides_v_blocks_integrations_banner" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_logo_grid_columns_items_order_idx" ON "_guides_v_blocks_logo_grid_columns_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_logo_grid_columns_items_parent_id_idx" ON "_guides_v_blocks_logo_grid_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_logo_grid_columns_order_idx" ON "_guides_v_blocks_logo_grid_columns" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_logo_grid_columns_parent_id_idx" ON "_guides_v_blocks_logo_grid_columns" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_logo_grid_order_idx" ON "_guides_v_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_logo_grid_parent_id_idx" ON "_guides_v_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_logo_grid_path_idx" ON "_guides_v_blocks_logo_grid" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_tabs_showcase_tabs_steps_order_idx" ON "_guides_v_blocks_tabs_showcase_tabs_steps" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_tabs_showcase_tabs_steps_parent_id_idx" ON "_guides_v_blocks_tabs_showcase_tabs_steps" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_tabs_showcase_tabs_order_idx" ON "_guides_v_blocks_tabs_showcase_tabs" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_tabs_showcase_tabs_parent_id_idx" ON "_guides_v_blocks_tabs_showcase_tabs" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_tabs_showcase_order_idx" ON "_guides_v_blocks_tabs_showcase" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_tabs_showcase_parent_id_idx" ON "_guides_v_blocks_tabs_showcase" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_tabs_showcase_path_idx" ON "_guides_v_blocks_tabs_showcase" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_anchor_nav_items_order_idx" ON "_guides_v_blocks_anchor_nav_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_anchor_nav_items_parent_id_idx" ON "_guides_v_blocks_anchor_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_anchor_nav_order_idx" ON "_guides_v_blocks_anchor_nav" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_anchor_nav_parent_id_idx" ON "_guides_v_blocks_anchor_nav" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_anchor_nav_path_idx" ON "_guides_v_blocks_anchor_nav" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_testimonials_items_order_idx" ON "_guides_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_testimonials_items_parent_id_idx" ON "_guides_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_testimonials_order_idx" ON "_guides_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_testimonials_parent_id_idx" ON "_guides_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_testimonials_path_idx" ON "_guides_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_comparison_grid_cards_order_idx" ON "_guides_v_blocks_comparison_grid_cards" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_comparison_grid_cards_parent_id_idx" ON "_guides_v_blocks_comparison_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_comparison_grid_order_idx" ON "_guides_v_blocks_comparison_grid" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_comparison_grid_parent_id_idx" ON "_guides_v_blocks_comparison_grid" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_comparison_grid_path_idx" ON "_guides_v_blocks_comparison_grid" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_use_case_flow_columns_items_order_idx" ON "_guides_v_blocks_use_case_flow_columns_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_use_case_flow_columns_items_parent_id_idx" ON "_guides_v_blocks_use_case_flow_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_use_case_flow_columns_order_idx" ON "_guides_v_blocks_use_case_flow_columns" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_use_case_flow_columns_parent_id_idx" ON "_guides_v_blocks_use_case_flow_columns" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_use_case_flow_order_idx" ON "_guides_v_blocks_use_case_flow" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_use_case_flow_parent_id_idx" ON "_guides_v_blocks_use_case_flow" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_use_case_flow_path_idx" ON "_guides_v_blocks_use_case_flow" USING btree ("_path");
  CREATE INDEX "_guides_v_version_article_meta_tags_order_idx" ON "_guides_v_version_article_meta_tags" USING btree ("_order");
  CREATE INDEX "_guides_v_version_article_meta_tags_parent_id_idx" ON "_guides_v_version_article_meta_tags" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_parent_idx" ON "_guides_v" USING btree ("parent_id");
  CREATE INDEX "_guides_v_version_version_featured_image_idx" ON "_guides_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_guides_v_version_version_slug_idx" ON "_guides_v" USING btree ("version_slug");
  CREATE INDEX "_guides_v_version_version_path_idx" ON "_guides_v" USING btree ("version_path");
  CREATE INDEX "_guides_v_version_version_content_key_idx" ON "_guides_v" USING btree ("version_content_key");
  CREATE INDEX "_guides_v_version_version_updated_at_idx" ON "_guides_v" USING btree ("version_updated_at");
  CREATE INDEX "_guides_v_version_version_created_at_idx" ON "_guides_v" USING btree ("version_created_at");
  CREATE INDEX "_guides_v_version_version__status_idx" ON "_guides_v" USING btree ("version__status");
  CREATE INDEX "_guides_v_created_at_idx" ON "_guides_v" USING btree ("created_at");
  CREATE INDEX "_guides_v_updated_at_idx" ON "_guides_v" USING btree ("updated_at");
  CREATE INDEX "_guides_v_latest_idx" ON "_guides_v" USING btree ("latest");
  CREATE INDEX "_tips_v_version_tip_card_icons_order_idx" ON "_tips_v_version_tip_card_icons" USING btree ("_order");
  CREATE INDEX "_tips_v_version_tip_card_icons_parent_id_idx" ON "_tips_v_version_tip_card_icons" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_version_tip_card_icons_image_idx" ON "_tips_v_version_tip_card_icons" USING btree ("image_id");
  CREATE INDEX "_tips_v_blocks_hero_cards_order_idx" ON "_tips_v_blocks_hero_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_hero_cards_parent_id_idx" ON "_tips_v_blocks_hero_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_hero_order_idx" ON "_tips_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_hero_parent_id_idx" ON "_tips_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_hero_path_idx" ON "_tips_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_hero_extended_cards_order_idx" ON "_tips_v_blocks_hero_extended_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_hero_extended_cards_parent_id_idx" ON "_tips_v_blocks_hero_extended_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_hero_extended_order_idx" ON "_tips_v_blocks_hero_extended" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_hero_extended_parent_id_idx" ON "_tips_v_blocks_hero_extended" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_hero_extended_path_idx" ON "_tips_v_blocks_hero_extended" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_rich_text_order_idx" ON "_tips_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_rich_text_parent_id_idx" ON "_tips_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_rich_text_path_idx" ON "_tips_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_side_by_side_bullets_order_idx" ON "_tips_v_blocks_side_by_side_bullets" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_side_by_side_bullets_parent_id_idx" ON "_tips_v_blocks_side_by_side_bullets" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_side_by_side_small_icons_order_idx" ON "_tips_v_blocks_side_by_side_small_icons" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_side_by_side_small_icons_parent_id_idx" ON "_tips_v_blocks_side_by_side_small_icons" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_side_by_side_bottom_cards_items_order_idx" ON "_tips_v_blocks_side_by_side_bottom_cards_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_side_by_side_bottom_cards_items_parent_id_idx" ON "_tips_v_blocks_side_by_side_bottom_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_side_by_side_bottom_cards_order_idx" ON "_tips_v_blocks_side_by_side_bottom_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_side_by_side_bottom_cards_parent_id_idx" ON "_tips_v_blocks_side_by_side_bottom_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_side_by_side_order_idx" ON "_tips_v_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_side_by_side_parent_id_idx" ON "_tips_v_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_side_by_side_path_idx" ON "_tips_v_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_story_cards_order_idx" ON "_tips_v_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_story_cards_parent_id_idx" ON "_tips_v_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_story_order_idx" ON "_tips_v_blocks_story" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_story_parent_id_idx" ON "_tips_v_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_story_path_idx" ON "_tips_v_blocks_story" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_media_showcase_order_idx" ON "_tips_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_media_showcase_parent_id_idx" ON "_tips_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_media_showcase_path_idx" ON "_tips_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_feature_grid_cards_order_idx" ON "_tips_v_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_feature_grid_cards_parent_id_idx" ON "_tips_v_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_feature_grid_order_idx" ON "_tips_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_feature_grid_parent_id_idx" ON "_tips_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_feature_grid_path_idx" ON "_tips_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_agent_capabilities_items_order_idx" ON "_tips_v_blocks_agent_capabilities_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_agent_capabilities_items_parent_id_idx" ON "_tips_v_blocks_agent_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_agent_capabilities_order_idx" ON "_tips_v_blocks_agent_capabilities" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_agent_capabilities_parent_id_idx" ON "_tips_v_blocks_agent_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_agent_capabilities_path_idx" ON "_tips_v_blocks_agent_capabilities" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_agent_solutions_items_order_idx" ON "_tips_v_blocks_agent_solutions_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_agent_solutions_items_parent_id_idx" ON "_tips_v_blocks_agent_solutions_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_agent_solutions_order_idx" ON "_tips_v_blocks_agent_solutions" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_agent_solutions_parent_id_idx" ON "_tips_v_blocks_agent_solutions" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_agent_solutions_path_idx" ON "_tips_v_blocks_agent_solutions" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_contact_us_order_idx" ON "_tips_v_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_contact_us_parent_id_idx" ON "_tips_v_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_contact_us_path_idx" ON "_tips_v_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_concierge_flow_cards_order_idx" ON "_tips_v_blocks_concierge_flow_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_concierge_flow_cards_parent_id_idx" ON "_tips_v_blocks_concierge_flow_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_concierge_flow_order_idx" ON "_tips_v_blocks_concierge_flow" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_concierge_flow_parent_id_idx" ON "_tips_v_blocks_concierge_flow" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_concierge_flow_path_idx" ON "_tips_v_blocks_concierge_flow" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_enterprise_upgrade_benefits_order_idx" ON "_tips_v_blocks_enterprise_upgrade_benefits" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_enterprise_upgrade_benefits_parent_id_idx" ON "_tips_v_blocks_enterprise_upgrade_benefits" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_enterprise_upgrade_order_idx" ON "_tips_v_blocks_enterprise_upgrade" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_enterprise_upgrade_parent_id_idx" ON "_tips_v_blocks_enterprise_upgrade" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_enterprise_upgrade_path_idx" ON "_tips_v_blocks_enterprise_upgrade" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_channels_grid_cards_order_idx" ON "_tips_v_blocks_channels_grid_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_channels_grid_cards_parent_id_idx" ON "_tips_v_blocks_channels_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_channels_grid_order_idx" ON "_tips_v_blocks_channels_grid" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_channels_grid_parent_id_idx" ON "_tips_v_blocks_channels_grid" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_channels_grid_path_idx" ON "_tips_v_blocks_channels_grid" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_feature_stack_cards_order_idx" ON "_tips_v_blocks_feature_stack_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_feature_stack_cards_parent_id_idx" ON "_tips_v_blocks_feature_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_feature_stack_order_idx" ON "_tips_v_blocks_feature_stack" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_feature_stack_parent_id_idx" ON "_tips_v_blocks_feature_stack" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_feature_stack_path_idx" ON "_tips_v_blocks_feature_stack" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_coverage_grid_cards_order_idx" ON "_tips_v_blocks_coverage_grid_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_coverage_grid_cards_parent_id_idx" ON "_tips_v_blocks_coverage_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_coverage_grid_order_idx" ON "_tips_v_blocks_coverage_grid" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_coverage_grid_parent_id_idx" ON "_tips_v_blocks_coverage_grid" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_coverage_grid_path_idx" ON "_tips_v_blocks_coverage_grid" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_feature_rows_rows_order_idx" ON "_tips_v_blocks_feature_rows_rows" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_feature_rows_rows_parent_id_idx" ON "_tips_v_blocks_feature_rows_rows" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_feature_rows_order_idx" ON "_tips_v_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_feature_rows_parent_id_idx" ON "_tips_v_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_feature_rows_path_idx" ON "_tips_v_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_capability_trio_cards_order_idx" ON "_tips_v_blocks_capability_trio_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_capability_trio_cards_parent_id_idx" ON "_tips_v_blocks_capability_trio_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_capability_trio_order_idx" ON "_tips_v_blocks_capability_trio" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_capability_trio_parent_id_idx" ON "_tips_v_blocks_capability_trio" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_capability_trio_path_idx" ON "_tips_v_blocks_capability_trio" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_capability_tools_cards_logos_order_idx" ON "_tips_v_blocks_capability_tools_cards_logos" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_capability_tools_cards_logos_parent_id_idx" ON "_tips_v_blocks_capability_tools_cards_logos" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_capability_tools_cards_order_idx" ON "_tips_v_blocks_capability_tools_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_capability_tools_cards_parent_id_idx" ON "_tips_v_blocks_capability_tools_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_capability_tools_order_idx" ON "_tips_v_blocks_capability_tools" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_capability_tools_parent_id_idx" ON "_tips_v_blocks_capability_tools" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_capability_tools_path_idx" ON "_tips_v_blocks_capability_tools" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_use_cases_grid_cards_order_idx" ON "_tips_v_blocks_use_cases_grid_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_use_cases_grid_cards_parent_id_idx" ON "_tips_v_blocks_use_cases_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_use_cases_grid_order_idx" ON "_tips_v_blocks_use_cases_grid" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_use_cases_grid_parent_id_idx" ON "_tips_v_blocks_use_cases_grid" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_use_cases_grid_path_idx" ON "_tips_v_blocks_use_cases_grid" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_security_cards_order_idx" ON "_tips_v_blocks_security_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_security_cards_parent_id_idx" ON "_tips_v_blocks_security_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_security_order_idx" ON "_tips_v_blocks_security" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_security_parent_id_idx" ON "_tips_v_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_security_path_idx" ON "_tips_v_blocks_security" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_functional_capabilities_cards_order_idx" ON "_tips_v_blocks_functional_capabilities_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_functional_capabilities_cards_parent_id_idx" ON "_tips_v_blocks_functional_capabilities_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_functional_capabilities_order_idx" ON "_tips_v_blocks_functional_capabilities" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_functional_capabilities_parent_id_idx" ON "_tips_v_blocks_functional_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_functional_capabilities_path_idx" ON "_tips_v_blocks_functional_capabilities" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_how_it_works_steps_order_idx" ON "_tips_v_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_how_it_works_steps_parent_id_idx" ON "_tips_v_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_how_it_works_order_idx" ON "_tips_v_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_how_it_works_parent_id_idx" ON "_tips_v_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_how_it_works_path_idx" ON "_tips_v_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_cta_order_idx" ON "_tips_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_cta_parent_id_idx" ON "_tips_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_cta_path_idx" ON "_tips_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_metrics_items_order_idx" ON "_tips_v_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_metrics_items_parent_id_idx" ON "_tips_v_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_metrics_order_idx" ON "_tips_v_blocks_metrics" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_metrics_parent_id_idx" ON "_tips_v_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_metrics_path_idx" ON "_tips_v_blocks_metrics" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_results_stats_items_order_idx" ON "_tips_v_blocks_results_stats_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_results_stats_items_parent_id_idx" ON "_tips_v_blocks_results_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_results_stats_order_idx" ON "_tips_v_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_results_stats_parent_id_idx" ON "_tips_v_blocks_results_stats" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_results_stats_path_idx" ON "_tips_v_blocks_results_stats" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_stats_cards_items_order_idx" ON "_tips_v_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_stats_cards_items_parent_id_idx" ON "_tips_v_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_stats_cards_order_idx" ON "_tips_v_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_stats_cards_parent_id_idx" ON "_tips_v_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_stats_cards_path_idx" ON "_tips_v_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_capability_strip_items_order_idx" ON "_tips_v_blocks_capability_strip_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_capability_strip_items_parent_id_idx" ON "_tips_v_blocks_capability_strip_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_capability_strip_order_idx" ON "_tips_v_blocks_capability_strip" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_capability_strip_parent_id_idx" ON "_tips_v_blocks_capability_strip" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_capability_strip_path_idx" ON "_tips_v_blocks_capability_strip" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_live_in_days_items_order_idx" ON "_tips_v_blocks_live_in_days_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_live_in_days_items_parent_id_idx" ON "_tips_v_blocks_live_in_days_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_live_in_days_order_idx" ON "_tips_v_blocks_live_in_days" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_live_in_days_parent_id_idx" ON "_tips_v_blocks_live_in_days" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_live_in_days_path_idx" ON "_tips_v_blocks_live_in_days" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_faq_items_order_idx" ON "_tips_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_faq_items_parent_id_idx" ON "_tips_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_faq_order_idx" ON "_tips_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_faq_parent_id_idx" ON "_tips_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_faq_path_idx" ON "_tips_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_news_insights_collections_order_idx" ON "_tips_v_blocks_news_insights_collections" USING btree ("order");
  CREATE INDEX "_tips_v_blocks_news_insights_collections_parent_idx" ON "_tips_v_blocks_news_insights_collections" USING btree ("parent_id");
  CREATE INDEX "_tips_v_blocks_news_insights_cards_tags_order_idx" ON "_tips_v_blocks_news_insights_cards_tags" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_news_insights_cards_tags_parent_id_idx" ON "_tips_v_blocks_news_insights_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_news_insights_cards_order_idx" ON "_tips_v_blocks_news_insights_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_news_insights_cards_parent_id_idx" ON "_tips_v_blocks_news_insights_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_news_insights_order_idx" ON "_tips_v_blocks_news_insights" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_news_insights_parent_id_idx" ON "_tips_v_blocks_news_insights" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_news_insights_path_idx" ON "_tips_v_blocks_news_insights" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_content_feed_collections_order_idx" ON "_tips_v_blocks_content_feed_collections" USING btree ("order");
  CREATE INDEX "_tips_v_blocks_content_feed_collections_parent_idx" ON "_tips_v_blocks_content_feed_collections" USING btree ("parent_id");
  CREATE INDEX "_tips_v_blocks_content_feed_cards_tags_order_idx" ON "_tips_v_blocks_content_feed_cards_tags" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_content_feed_cards_tags_parent_id_idx" ON "_tips_v_blocks_content_feed_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_content_feed_cards_order_idx" ON "_tips_v_blocks_content_feed_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_content_feed_cards_parent_id_idx" ON "_tips_v_blocks_content_feed_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_content_feed_order_idx" ON "_tips_v_blocks_content_feed" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_content_feed_parent_id_idx" ON "_tips_v_blocks_content_feed" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_content_feed_path_idx" ON "_tips_v_blocks_content_feed" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_pricing_cards_cards_features_order_idx" ON "_tips_v_blocks_pricing_cards_cards_features" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_pricing_cards_cards_features_parent_id_idx" ON "_tips_v_blocks_pricing_cards_cards_features" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_pricing_cards_cards_order_idx" ON "_tips_v_blocks_pricing_cards_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_pricing_cards_cards_parent_id_idx" ON "_tips_v_blocks_pricing_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_pricing_cards_order_idx" ON "_tips_v_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_pricing_cards_parent_id_idx" ON "_tips_v_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_pricing_cards_path_idx" ON "_tips_v_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_pricing_details_sections_headers_order_idx" ON "_tips_v_blocks_pricing_details_sections_headers" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_pricing_details_sections_headers_parent_id_idx" ON "_tips_v_blocks_pricing_details_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_pricing_details_sections_rows_cells_order_idx" ON "_tips_v_blocks_pricing_details_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_pricing_details_sections_rows_cells_parent_id_idx" ON "_tips_v_blocks_pricing_details_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_pricing_details_sections_rows_order_idx" ON "_tips_v_blocks_pricing_details_sections_rows" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_pricing_details_sections_rows_parent_id_idx" ON "_tips_v_blocks_pricing_details_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_pricing_details_sections_order_idx" ON "_tips_v_blocks_pricing_details_sections" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_pricing_details_sections_parent_id_idx" ON "_tips_v_blocks_pricing_details_sections" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_pricing_details_order_idx" ON "_tips_v_blocks_pricing_details" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_pricing_details_parent_id_idx" ON "_tips_v_blocks_pricing_details" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_pricing_details_path_idx" ON "_tips_v_blocks_pricing_details" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_difference_left_items_order_idx" ON "_tips_v_blocks_difference_left_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_difference_left_items_parent_id_idx" ON "_tips_v_blocks_difference_left_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_difference_right_items_order_idx" ON "_tips_v_blocks_difference_right_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_difference_right_items_parent_id_idx" ON "_tips_v_blocks_difference_right_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_difference_order_idx" ON "_tips_v_blocks_difference" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_difference_parent_id_idx" ON "_tips_v_blocks_difference" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_difference_path_idx" ON "_tips_v_blocks_difference" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_pain_points_comparison_rows_order_idx" ON "_tips_v_blocks_pain_points_comparison_rows" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_pain_points_comparison_rows_parent_id_idx" ON "_tips_v_blocks_pain_points_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_pain_points_comparison_order_idx" ON "_tips_v_blocks_pain_points_comparison" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_pain_points_comparison_parent_id_idx" ON "_tips_v_blocks_pain_points_comparison" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_pain_points_comparison_path_idx" ON "_tips_v_blocks_pain_points_comparison" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_pricing_policy_callouts_order_idx" ON "_tips_v_blocks_pricing_policy_callouts" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_pricing_policy_callouts_parent_id_idx" ON "_tips_v_blocks_pricing_policy_callouts" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_pricing_policy_order_idx" ON "_tips_v_blocks_pricing_policy" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_pricing_policy_parent_id_idx" ON "_tips_v_blocks_pricing_policy" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_pricing_policy_path_idx" ON "_tips_v_blocks_pricing_policy" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_industry_expertise_items_order_idx" ON "_tips_v_blocks_industry_expertise_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_industry_expertise_items_parent_id_idx" ON "_tips_v_blocks_industry_expertise_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_industry_expertise_info_cards_order_idx" ON "_tips_v_blocks_industry_expertise_info_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_industry_expertise_info_cards_parent_id_idx" ON "_tips_v_blocks_industry_expertise_info_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_industry_expertise_order_idx" ON "_tips_v_blocks_industry_expertise" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_industry_expertise_parent_id_idx" ON "_tips_v_blocks_industry_expertise" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_industry_expertise_path_idx" ON "_tips_v_blocks_industry_expertise" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_logo_strip_logos_order_idx" ON "_tips_v_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_logo_strip_logos_parent_id_idx" ON "_tips_v_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_logo_strip_stats_order_idx" ON "_tips_v_blocks_logo_strip_stats" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_logo_strip_stats_parent_id_idx" ON "_tips_v_blocks_logo_strip_stats" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_logo_strip_order_idx" ON "_tips_v_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_logo_strip_parent_id_idx" ON "_tips_v_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_logo_strip_path_idx" ON "_tips_v_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_integrations_banner_items_order_idx" ON "_tips_v_blocks_integrations_banner_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_integrations_banner_items_parent_id_idx" ON "_tips_v_blocks_integrations_banner_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_integrations_banner_order_idx" ON "_tips_v_blocks_integrations_banner" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_integrations_banner_parent_id_idx" ON "_tips_v_blocks_integrations_banner" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_integrations_banner_path_idx" ON "_tips_v_blocks_integrations_banner" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_logo_grid_columns_items_order_idx" ON "_tips_v_blocks_logo_grid_columns_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_logo_grid_columns_items_parent_id_idx" ON "_tips_v_blocks_logo_grid_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_logo_grid_columns_order_idx" ON "_tips_v_blocks_logo_grid_columns" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_logo_grid_columns_parent_id_idx" ON "_tips_v_blocks_logo_grid_columns" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_logo_grid_order_idx" ON "_tips_v_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_logo_grid_parent_id_idx" ON "_tips_v_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_logo_grid_path_idx" ON "_tips_v_blocks_logo_grid" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_tabs_showcase_tabs_steps_order_idx" ON "_tips_v_blocks_tabs_showcase_tabs_steps" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_tabs_showcase_tabs_steps_parent_id_idx" ON "_tips_v_blocks_tabs_showcase_tabs_steps" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_tabs_showcase_tabs_order_idx" ON "_tips_v_blocks_tabs_showcase_tabs" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_tabs_showcase_tabs_parent_id_idx" ON "_tips_v_blocks_tabs_showcase_tabs" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_tabs_showcase_order_idx" ON "_tips_v_blocks_tabs_showcase" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_tabs_showcase_parent_id_idx" ON "_tips_v_blocks_tabs_showcase" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_tabs_showcase_path_idx" ON "_tips_v_blocks_tabs_showcase" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_anchor_nav_items_order_idx" ON "_tips_v_blocks_anchor_nav_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_anchor_nav_items_parent_id_idx" ON "_tips_v_blocks_anchor_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_anchor_nav_order_idx" ON "_tips_v_blocks_anchor_nav" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_anchor_nav_parent_id_idx" ON "_tips_v_blocks_anchor_nav" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_anchor_nav_path_idx" ON "_tips_v_blocks_anchor_nav" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_testimonials_items_order_idx" ON "_tips_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_testimonials_items_parent_id_idx" ON "_tips_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_testimonials_order_idx" ON "_tips_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_testimonials_parent_id_idx" ON "_tips_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_testimonials_path_idx" ON "_tips_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_comparison_grid_cards_order_idx" ON "_tips_v_blocks_comparison_grid_cards" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_comparison_grid_cards_parent_id_idx" ON "_tips_v_blocks_comparison_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_comparison_grid_order_idx" ON "_tips_v_blocks_comparison_grid" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_comparison_grid_parent_id_idx" ON "_tips_v_blocks_comparison_grid" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_comparison_grid_path_idx" ON "_tips_v_blocks_comparison_grid" USING btree ("_path");
  CREATE INDEX "_tips_v_blocks_use_case_flow_columns_items_order_idx" ON "_tips_v_blocks_use_case_flow_columns_items" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_use_case_flow_columns_items_parent_id_idx" ON "_tips_v_blocks_use_case_flow_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_use_case_flow_columns_order_idx" ON "_tips_v_blocks_use_case_flow_columns" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_use_case_flow_columns_parent_id_idx" ON "_tips_v_blocks_use_case_flow_columns" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_use_case_flow_order_idx" ON "_tips_v_blocks_use_case_flow" USING btree ("_order");
  CREATE INDEX "_tips_v_blocks_use_case_flow_parent_id_idx" ON "_tips_v_blocks_use_case_flow" USING btree ("_parent_id");
  CREATE INDEX "_tips_v_blocks_use_case_flow_path_idx" ON "_tips_v_blocks_use_case_flow" USING btree ("_path");
  CREATE INDEX "_tips_v_parent_idx" ON "_tips_v" USING btree ("parent_id");
  CREATE INDEX "_tips_v_version_version_content_key_idx" ON "_tips_v" USING btree ("version_content_key");
  CREATE INDEX "_tips_v_version_version_slug_idx" ON "_tips_v" USING btree ("version_slug");
  CREATE INDEX "_tips_v_version_version_path_idx" ON "_tips_v" USING btree ("version_path");
  CREATE INDEX "_tips_v_version_version_updated_at_idx" ON "_tips_v" USING btree ("version_updated_at");
  CREATE INDEX "_tips_v_version_version_created_at_idx" ON "_tips_v" USING btree ("version_created_at");
  CREATE INDEX "_tips_v_version_version__status_idx" ON "_tips_v" USING btree ("version__status");
  CREATE INDEX "_tips_v_created_at_idx" ON "_tips_v" USING btree ("created_at");
  CREATE INDEX "_tips_v_updated_at_idx" ON "_tips_v" USING btree ("updated_at");
  CREATE INDEX "_tips_v_latest_idx" ON "_tips_v" USING btree ("latest");
  CREATE INDEX "_use_cases_v_blocks_hero_cards_order_idx" ON "_use_cases_v_blocks_hero_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_hero_cards_parent_id_idx" ON "_use_cases_v_blocks_hero_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_hero_order_idx" ON "_use_cases_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_hero_parent_id_idx" ON "_use_cases_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_hero_path_idx" ON "_use_cases_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_hero_extended_cards_order_idx" ON "_use_cases_v_blocks_hero_extended_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_hero_extended_cards_parent_id_idx" ON "_use_cases_v_blocks_hero_extended_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_hero_extended_order_idx" ON "_use_cases_v_blocks_hero_extended" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_hero_extended_parent_id_idx" ON "_use_cases_v_blocks_hero_extended" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_hero_extended_path_idx" ON "_use_cases_v_blocks_hero_extended" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_rich_text_order_idx" ON "_use_cases_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_rich_text_parent_id_idx" ON "_use_cases_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_rich_text_path_idx" ON "_use_cases_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_side_by_side_bullets_order_idx" ON "_use_cases_v_blocks_side_by_side_bullets" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_side_by_side_bullets_parent_id_idx" ON "_use_cases_v_blocks_side_by_side_bullets" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_side_by_side_small_icons_order_idx" ON "_use_cases_v_blocks_side_by_side_small_icons" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_side_by_side_small_icons_parent_id_idx" ON "_use_cases_v_blocks_side_by_side_small_icons" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_side_by_side_bottom_cards_items_order_idx" ON "_use_cases_v_blocks_side_by_side_bottom_cards_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_side_by_side_bottom_cards_items_parent_id_idx" ON "_use_cases_v_blocks_side_by_side_bottom_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_side_by_side_bottom_cards_order_idx" ON "_use_cases_v_blocks_side_by_side_bottom_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_side_by_side_bottom_cards_parent_id_idx" ON "_use_cases_v_blocks_side_by_side_bottom_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_side_by_side_order_idx" ON "_use_cases_v_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_side_by_side_parent_id_idx" ON "_use_cases_v_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_side_by_side_path_idx" ON "_use_cases_v_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_story_cards_order_idx" ON "_use_cases_v_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_story_cards_parent_id_idx" ON "_use_cases_v_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_story_order_idx" ON "_use_cases_v_blocks_story" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_story_parent_id_idx" ON "_use_cases_v_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_story_path_idx" ON "_use_cases_v_blocks_story" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_media_showcase_order_idx" ON "_use_cases_v_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_media_showcase_parent_id_idx" ON "_use_cases_v_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_media_showcase_path_idx" ON "_use_cases_v_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_feature_grid_cards_order_idx" ON "_use_cases_v_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_feature_grid_cards_parent_id_idx" ON "_use_cases_v_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_feature_grid_order_idx" ON "_use_cases_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_feature_grid_parent_id_idx" ON "_use_cases_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_feature_grid_path_idx" ON "_use_cases_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_agent_capabilities_items_order_idx" ON "_use_cases_v_blocks_agent_capabilities_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_agent_capabilities_items_parent_id_idx" ON "_use_cases_v_blocks_agent_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_agent_capabilities_order_idx" ON "_use_cases_v_blocks_agent_capabilities" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_agent_capabilities_parent_id_idx" ON "_use_cases_v_blocks_agent_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_agent_capabilities_path_idx" ON "_use_cases_v_blocks_agent_capabilities" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_agent_solutions_items_order_idx" ON "_use_cases_v_blocks_agent_solutions_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_agent_solutions_items_parent_id_idx" ON "_use_cases_v_blocks_agent_solutions_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_agent_solutions_order_idx" ON "_use_cases_v_blocks_agent_solutions" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_agent_solutions_parent_id_idx" ON "_use_cases_v_blocks_agent_solutions" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_agent_solutions_path_idx" ON "_use_cases_v_blocks_agent_solutions" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_contact_us_order_idx" ON "_use_cases_v_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_contact_us_parent_id_idx" ON "_use_cases_v_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_contact_us_path_idx" ON "_use_cases_v_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_concierge_flow_cards_order_idx" ON "_use_cases_v_blocks_concierge_flow_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_concierge_flow_cards_parent_id_idx" ON "_use_cases_v_blocks_concierge_flow_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_concierge_flow_order_idx" ON "_use_cases_v_blocks_concierge_flow" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_concierge_flow_parent_id_idx" ON "_use_cases_v_blocks_concierge_flow" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_concierge_flow_path_idx" ON "_use_cases_v_blocks_concierge_flow" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_enterprise_upgrade_benefits_order_idx" ON "_use_cases_v_blocks_enterprise_upgrade_benefits" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_enterprise_upgrade_benefits_parent_id_idx" ON "_use_cases_v_blocks_enterprise_upgrade_benefits" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_enterprise_upgrade_order_idx" ON "_use_cases_v_blocks_enterprise_upgrade" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_enterprise_upgrade_parent_id_idx" ON "_use_cases_v_blocks_enterprise_upgrade" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_enterprise_upgrade_path_idx" ON "_use_cases_v_blocks_enterprise_upgrade" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_channels_grid_cards_order_idx" ON "_use_cases_v_blocks_channels_grid_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_channels_grid_cards_parent_id_idx" ON "_use_cases_v_blocks_channels_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_channels_grid_order_idx" ON "_use_cases_v_blocks_channels_grid" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_channels_grid_parent_id_idx" ON "_use_cases_v_blocks_channels_grid" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_channels_grid_path_idx" ON "_use_cases_v_blocks_channels_grid" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_feature_stack_cards_order_idx" ON "_use_cases_v_blocks_feature_stack_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_feature_stack_cards_parent_id_idx" ON "_use_cases_v_blocks_feature_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_feature_stack_order_idx" ON "_use_cases_v_blocks_feature_stack" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_feature_stack_parent_id_idx" ON "_use_cases_v_blocks_feature_stack" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_feature_stack_path_idx" ON "_use_cases_v_blocks_feature_stack" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_coverage_grid_cards_order_idx" ON "_use_cases_v_blocks_coverage_grid_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_coverage_grid_cards_parent_id_idx" ON "_use_cases_v_blocks_coverage_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_coverage_grid_order_idx" ON "_use_cases_v_blocks_coverage_grid" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_coverage_grid_parent_id_idx" ON "_use_cases_v_blocks_coverage_grid" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_coverage_grid_path_idx" ON "_use_cases_v_blocks_coverage_grid" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_feature_rows_rows_order_idx" ON "_use_cases_v_blocks_feature_rows_rows" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_feature_rows_rows_parent_id_idx" ON "_use_cases_v_blocks_feature_rows_rows" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_feature_rows_order_idx" ON "_use_cases_v_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_feature_rows_parent_id_idx" ON "_use_cases_v_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_feature_rows_path_idx" ON "_use_cases_v_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_capability_trio_cards_order_idx" ON "_use_cases_v_blocks_capability_trio_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_capability_trio_cards_parent_id_idx" ON "_use_cases_v_blocks_capability_trio_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_capability_trio_order_idx" ON "_use_cases_v_blocks_capability_trio" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_capability_trio_parent_id_idx" ON "_use_cases_v_blocks_capability_trio" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_capability_trio_path_idx" ON "_use_cases_v_blocks_capability_trio" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_capability_tools_cards_logos_order_idx" ON "_use_cases_v_blocks_capability_tools_cards_logos" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_capability_tools_cards_logos_parent_id_idx" ON "_use_cases_v_blocks_capability_tools_cards_logos" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_capability_tools_cards_order_idx" ON "_use_cases_v_blocks_capability_tools_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_capability_tools_cards_parent_id_idx" ON "_use_cases_v_blocks_capability_tools_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_capability_tools_order_idx" ON "_use_cases_v_blocks_capability_tools" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_capability_tools_parent_id_idx" ON "_use_cases_v_blocks_capability_tools" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_capability_tools_path_idx" ON "_use_cases_v_blocks_capability_tools" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_use_cases_grid_cards_order_idx" ON "_use_cases_v_blocks_use_cases_grid_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_use_cases_grid_cards_parent_id_idx" ON "_use_cases_v_blocks_use_cases_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_use_cases_grid_order_idx" ON "_use_cases_v_blocks_use_cases_grid" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_use_cases_grid_parent_id_idx" ON "_use_cases_v_blocks_use_cases_grid" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_use_cases_grid_path_idx" ON "_use_cases_v_blocks_use_cases_grid" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_security_cards_order_idx" ON "_use_cases_v_blocks_security_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_security_cards_parent_id_idx" ON "_use_cases_v_blocks_security_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_security_order_idx" ON "_use_cases_v_blocks_security" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_security_parent_id_idx" ON "_use_cases_v_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_security_path_idx" ON "_use_cases_v_blocks_security" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_functional_capabilities_cards_order_idx" ON "_use_cases_v_blocks_functional_capabilities_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_functional_capabilities_cards_parent_id_idx" ON "_use_cases_v_blocks_functional_capabilities_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_functional_capabilities_order_idx" ON "_use_cases_v_blocks_functional_capabilities" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_functional_capabilities_parent_id_idx" ON "_use_cases_v_blocks_functional_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_functional_capabilities_path_idx" ON "_use_cases_v_blocks_functional_capabilities" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_how_it_works_steps_order_idx" ON "_use_cases_v_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_how_it_works_steps_parent_id_idx" ON "_use_cases_v_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_how_it_works_order_idx" ON "_use_cases_v_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_how_it_works_parent_id_idx" ON "_use_cases_v_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_how_it_works_path_idx" ON "_use_cases_v_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_cta_order_idx" ON "_use_cases_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_cta_parent_id_idx" ON "_use_cases_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_cta_path_idx" ON "_use_cases_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_metrics_items_order_idx" ON "_use_cases_v_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_metrics_items_parent_id_idx" ON "_use_cases_v_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_metrics_order_idx" ON "_use_cases_v_blocks_metrics" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_metrics_parent_id_idx" ON "_use_cases_v_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_metrics_path_idx" ON "_use_cases_v_blocks_metrics" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_results_stats_items_order_idx" ON "_use_cases_v_blocks_results_stats_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_results_stats_items_parent_id_idx" ON "_use_cases_v_blocks_results_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_results_stats_order_idx" ON "_use_cases_v_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_results_stats_parent_id_idx" ON "_use_cases_v_blocks_results_stats" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_results_stats_path_idx" ON "_use_cases_v_blocks_results_stats" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_stats_cards_items_order_idx" ON "_use_cases_v_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_stats_cards_items_parent_id_idx" ON "_use_cases_v_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_stats_cards_order_idx" ON "_use_cases_v_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_stats_cards_parent_id_idx" ON "_use_cases_v_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_stats_cards_path_idx" ON "_use_cases_v_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_capability_strip_items_order_idx" ON "_use_cases_v_blocks_capability_strip_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_capability_strip_items_parent_id_idx" ON "_use_cases_v_blocks_capability_strip_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_capability_strip_order_idx" ON "_use_cases_v_blocks_capability_strip" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_capability_strip_parent_id_idx" ON "_use_cases_v_blocks_capability_strip" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_capability_strip_path_idx" ON "_use_cases_v_blocks_capability_strip" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_live_in_days_items_order_idx" ON "_use_cases_v_blocks_live_in_days_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_live_in_days_items_parent_id_idx" ON "_use_cases_v_blocks_live_in_days_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_live_in_days_order_idx" ON "_use_cases_v_blocks_live_in_days" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_live_in_days_parent_id_idx" ON "_use_cases_v_blocks_live_in_days" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_live_in_days_path_idx" ON "_use_cases_v_blocks_live_in_days" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_faq_items_order_idx" ON "_use_cases_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_faq_items_parent_id_idx" ON "_use_cases_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_faq_order_idx" ON "_use_cases_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_faq_parent_id_idx" ON "_use_cases_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_faq_path_idx" ON "_use_cases_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_news_insights_collections_order_idx" ON "_use_cases_v_blocks_news_insights_collections" USING btree ("order");
  CREATE INDEX "_use_cases_v_blocks_news_insights_collections_parent_idx" ON "_use_cases_v_blocks_news_insights_collections" USING btree ("parent_id");
  CREATE INDEX "_use_cases_v_blocks_news_insights_cards_tags_order_idx" ON "_use_cases_v_blocks_news_insights_cards_tags" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_news_insights_cards_tags_parent_id_idx" ON "_use_cases_v_blocks_news_insights_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_news_insights_cards_order_idx" ON "_use_cases_v_blocks_news_insights_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_news_insights_cards_parent_id_idx" ON "_use_cases_v_blocks_news_insights_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_news_insights_order_idx" ON "_use_cases_v_blocks_news_insights" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_news_insights_parent_id_idx" ON "_use_cases_v_blocks_news_insights" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_news_insights_path_idx" ON "_use_cases_v_blocks_news_insights" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_content_feed_collections_order_idx" ON "_use_cases_v_blocks_content_feed_collections" USING btree ("order");
  CREATE INDEX "_use_cases_v_blocks_content_feed_collections_parent_idx" ON "_use_cases_v_blocks_content_feed_collections" USING btree ("parent_id");
  CREATE INDEX "_use_cases_v_blocks_content_feed_cards_tags_order_idx" ON "_use_cases_v_blocks_content_feed_cards_tags" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_content_feed_cards_tags_parent_id_idx" ON "_use_cases_v_blocks_content_feed_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_content_feed_cards_order_idx" ON "_use_cases_v_blocks_content_feed_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_content_feed_cards_parent_id_idx" ON "_use_cases_v_blocks_content_feed_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_content_feed_order_idx" ON "_use_cases_v_blocks_content_feed" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_content_feed_parent_id_idx" ON "_use_cases_v_blocks_content_feed" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_content_feed_path_idx" ON "_use_cases_v_blocks_content_feed" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_pricing_cards_cards_features_order_idx" ON "_use_cases_v_blocks_pricing_cards_cards_features" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_pricing_cards_cards_features_parent_id_idx" ON "_use_cases_v_blocks_pricing_cards_cards_features" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_pricing_cards_cards_order_idx" ON "_use_cases_v_blocks_pricing_cards_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_pricing_cards_cards_parent_id_idx" ON "_use_cases_v_blocks_pricing_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_pricing_cards_order_idx" ON "_use_cases_v_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_pricing_cards_parent_id_idx" ON "_use_cases_v_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_pricing_cards_path_idx" ON "_use_cases_v_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_pricing_details_sections_headers_order_idx" ON "_use_cases_v_blocks_pricing_details_sections_headers" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_pricing_details_sections_headers_parent_id_idx" ON "_use_cases_v_blocks_pricing_details_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_pricing_details_sections_rows_cells_order_idx" ON "_use_cases_v_blocks_pricing_details_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_pricing_details_sections_rows_cells_parent_id_idx" ON "_use_cases_v_blocks_pricing_details_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_pricing_details_sections_rows_order_idx" ON "_use_cases_v_blocks_pricing_details_sections_rows" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_pricing_details_sections_rows_parent_id_idx" ON "_use_cases_v_blocks_pricing_details_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_pricing_details_sections_order_idx" ON "_use_cases_v_blocks_pricing_details_sections" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_pricing_details_sections_parent_id_idx" ON "_use_cases_v_blocks_pricing_details_sections" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_pricing_details_order_idx" ON "_use_cases_v_blocks_pricing_details" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_pricing_details_parent_id_idx" ON "_use_cases_v_blocks_pricing_details" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_pricing_details_path_idx" ON "_use_cases_v_blocks_pricing_details" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_difference_left_items_order_idx" ON "_use_cases_v_blocks_difference_left_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_difference_left_items_parent_id_idx" ON "_use_cases_v_blocks_difference_left_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_difference_right_items_order_idx" ON "_use_cases_v_blocks_difference_right_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_difference_right_items_parent_id_idx" ON "_use_cases_v_blocks_difference_right_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_difference_order_idx" ON "_use_cases_v_blocks_difference" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_difference_parent_id_idx" ON "_use_cases_v_blocks_difference" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_difference_path_idx" ON "_use_cases_v_blocks_difference" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_pain_points_comparison_rows_order_idx" ON "_use_cases_v_blocks_pain_points_comparison_rows" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_pain_points_comparison_rows_parent_id_idx" ON "_use_cases_v_blocks_pain_points_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_pain_points_comparison_order_idx" ON "_use_cases_v_blocks_pain_points_comparison" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_pain_points_comparison_parent_id_idx" ON "_use_cases_v_blocks_pain_points_comparison" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_pain_points_comparison_path_idx" ON "_use_cases_v_blocks_pain_points_comparison" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_pricing_policy_callouts_order_idx" ON "_use_cases_v_blocks_pricing_policy_callouts" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_pricing_policy_callouts_parent_id_idx" ON "_use_cases_v_blocks_pricing_policy_callouts" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_pricing_policy_order_idx" ON "_use_cases_v_blocks_pricing_policy" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_pricing_policy_parent_id_idx" ON "_use_cases_v_blocks_pricing_policy" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_pricing_policy_path_idx" ON "_use_cases_v_blocks_pricing_policy" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_industry_expertise_items_order_idx" ON "_use_cases_v_blocks_industry_expertise_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_industry_expertise_items_parent_id_idx" ON "_use_cases_v_blocks_industry_expertise_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_industry_expertise_info_cards_order_idx" ON "_use_cases_v_blocks_industry_expertise_info_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_industry_expertise_info_cards_parent_id_idx" ON "_use_cases_v_blocks_industry_expertise_info_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_industry_expertise_order_idx" ON "_use_cases_v_blocks_industry_expertise" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_industry_expertise_parent_id_idx" ON "_use_cases_v_blocks_industry_expertise" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_industry_expertise_path_idx" ON "_use_cases_v_blocks_industry_expertise" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_logo_strip_logos_order_idx" ON "_use_cases_v_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_logo_strip_logos_parent_id_idx" ON "_use_cases_v_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_logo_strip_stats_order_idx" ON "_use_cases_v_blocks_logo_strip_stats" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_logo_strip_stats_parent_id_idx" ON "_use_cases_v_blocks_logo_strip_stats" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_logo_strip_order_idx" ON "_use_cases_v_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_logo_strip_parent_id_idx" ON "_use_cases_v_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_logo_strip_path_idx" ON "_use_cases_v_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_integrations_banner_items_order_idx" ON "_use_cases_v_blocks_integrations_banner_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_integrations_banner_items_parent_id_idx" ON "_use_cases_v_blocks_integrations_banner_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_integrations_banner_order_idx" ON "_use_cases_v_blocks_integrations_banner" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_integrations_banner_parent_id_idx" ON "_use_cases_v_blocks_integrations_banner" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_integrations_banner_path_idx" ON "_use_cases_v_blocks_integrations_banner" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_logo_grid_columns_items_order_idx" ON "_use_cases_v_blocks_logo_grid_columns_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_logo_grid_columns_items_parent_id_idx" ON "_use_cases_v_blocks_logo_grid_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_logo_grid_columns_order_idx" ON "_use_cases_v_blocks_logo_grid_columns" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_logo_grid_columns_parent_id_idx" ON "_use_cases_v_blocks_logo_grid_columns" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_logo_grid_order_idx" ON "_use_cases_v_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_logo_grid_parent_id_idx" ON "_use_cases_v_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_logo_grid_path_idx" ON "_use_cases_v_blocks_logo_grid" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_tabs_showcase_tabs_steps_order_idx" ON "_use_cases_v_blocks_tabs_showcase_tabs_steps" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_tabs_showcase_tabs_steps_parent_id_idx" ON "_use_cases_v_blocks_tabs_showcase_tabs_steps" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_tabs_showcase_tabs_order_idx" ON "_use_cases_v_blocks_tabs_showcase_tabs" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_tabs_showcase_tabs_parent_id_idx" ON "_use_cases_v_blocks_tabs_showcase_tabs" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_tabs_showcase_order_idx" ON "_use_cases_v_blocks_tabs_showcase" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_tabs_showcase_parent_id_idx" ON "_use_cases_v_blocks_tabs_showcase" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_tabs_showcase_path_idx" ON "_use_cases_v_blocks_tabs_showcase" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_anchor_nav_items_order_idx" ON "_use_cases_v_blocks_anchor_nav_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_anchor_nav_items_parent_id_idx" ON "_use_cases_v_blocks_anchor_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_anchor_nav_order_idx" ON "_use_cases_v_blocks_anchor_nav" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_anchor_nav_parent_id_idx" ON "_use_cases_v_blocks_anchor_nav" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_anchor_nav_path_idx" ON "_use_cases_v_blocks_anchor_nav" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_testimonials_items_order_idx" ON "_use_cases_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_testimonials_items_parent_id_idx" ON "_use_cases_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_testimonials_order_idx" ON "_use_cases_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_testimonials_parent_id_idx" ON "_use_cases_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_testimonials_path_idx" ON "_use_cases_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_comparison_grid_cards_order_idx" ON "_use_cases_v_blocks_comparison_grid_cards" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_comparison_grid_cards_parent_id_idx" ON "_use_cases_v_blocks_comparison_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_comparison_grid_order_idx" ON "_use_cases_v_blocks_comparison_grid" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_comparison_grid_parent_id_idx" ON "_use_cases_v_blocks_comparison_grid" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_comparison_grid_path_idx" ON "_use_cases_v_blocks_comparison_grid" USING btree ("_path");
  CREATE INDEX "_use_cases_v_blocks_use_case_flow_columns_items_order_idx" ON "_use_cases_v_blocks_use_case_flow_columns_items" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_use_case_flow_columns_items_parent_id_idx" ON "_use_cases_v_blocks_use_case_flow_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_use_case_flow_columns_order_idx" ON "_use_cases_v_blocks_use_case_flow_columns" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_use_case_flow_columns_parent_id_idx" ON "_use_cases_v_blocks_use_case_flow_columns" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_use_case_flow_order_idx" ON "_use_cases_v_blocks_use_case_flow" USING btree ("_order");
  CREATE INDEX "_use_cases_v_blocks_use_case_flow_parent_id_idx" ON "_use_cases_v_blocks_use_case_flow" USING btree ("_parent_id");
  CREATE INDEX "_use_cases_v_blocks_use_case_flow_path_idx" ON "_use_cases_v_blocks_use_case_flow" USING btree ("_path");
  CREATE INDEX "_use_cases_v_parent_idx" ON "_use_cases_v" USING btree ("parent_id");
  CREATE INDEX "_use_cases_v_version_version_content_key_idx" ON "_use_cases_v" USING btree ("version_content_key");
  CREATE INDEX "_use_cases_v_version_version_slug_idx" ON "_use_cases_v" USING btree ("version_slug");
  CREATE INDEX "_use_cases_v_version_version_path_idx" ON "_use_cases_v" USING btree ("version_path");
  CREATE INDEX "_use_cases_v_version_version_updated_at_idx" ON "_use_cases_v" USING btree ("version_updated_at");
  CREATE INDEX "_use_cases_v_version_version_created_at_idx" ON "_use_cases_v" USING btree ("version_created_at");
  CREATE INDEX "_use_cases_v_version_version__status_idx" ON "_use_cases_v" USING btree ("version__status");
  CREATE INDEX "_use_cases_v_created_at_idx" ON "_use_cases_v" USING btree ("created_at");
  CREATE INDEX "_use_cases_v_updated_at_idx" ON "_use_cases_v" USING btree ("updated_at");
  CREATE INDEX "_use_cases_v_latest_idx" ON "_use_cases_v" USING btree ("latest");
  CREATE INDEX "_forms_v_version_fields_options_order_idx" ON "_forms_v_version_fields_options" USING btree ("_order");
  CREATE INDEX "_forms_v_version_fields_options_parent_id_idx" ON "_forms_v_version_fields_options" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_version_fields_order_idx" ON "_forms_v_version_fields" USING btree ("_order");
  CREATE INDEX "_forms_v_version_fields_parent_id_idx" ON "_forms_v_version_fields" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_parent_idx" ON "_forms_v" USING btree ("parent_id");
  CREATE INDEX "_forms_v_version_version_updated_at_idx" ON "_forms_v" USING btree ("version_updated_at");
  CREATE INDEX "_forms_v_version_version_created_at_idx" ON "_forms_v" USING btree ("version_created_at");
  CREATE INDEX "_forms_v_version_version__status_idx" ON "_forms_v" USING btree ("version__status");
  CREATE INDEX "_forms_v_created_at_idx" ON "_forms_v" USING btree ("created_at");
  CREATE INDEX "_forms_v_updated_at_idx" ON "_forms_v" USING btree ("updated_at");
  CREATE INDEX "_forms_v_latest_idx" ON "_forms_v" USING btree ("latest");
  CREATE INDEX "_faq_items_v_parent_idx" ON "_faq_items_v" USING btree ("parent_id");
  CREATE INDEX "_faq_items_v_version_version_source_key_idx" ON "_faq_items_v" USING btree ("version_source_key");
  CREATE INDEX "_faq_items_v_version_version_updated_at_idx" ON "_faq_items_v" USING btree ("version_updated_at");
  CREATE INDEX "_faq_items_v_version_version_created_at_idx" ON "_faq_items_v" USING btree ("version_created_at");
  CREATE INDEX "_faq_items_v_version_version__status_idx" ON "_faq_items_v" USING btree ("version__status");
  CREATE INDEX "_faq_items_v_created_at_idx" ON "_faq_items_v" USING btree ("created_at");
  CREATE INDEX "_faq_items_v_updated_at_idx" ON "_faq_items_v" USING btree ("updated_at");
  CREATE INDEX "_faq_items_v_latest_idx" ON "_faq_items_v" USING btree ("latest");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version_source_key_idx" ON "_testimonials_v" USING btree ("version_source_key");
  CREATE INDEX "_testimonials_v_version_version_author_image_idx" ON "_testimonials_v" USING btree ("version_author_image_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE INDEX "guides__status_idx" ON "guides" USING btree ("_status");
  CREATE INDEX "tips__status_idx" ON "tips" USING btree ("_status");
  CREATE INDEX "use_cases__status_idx" ON "use_cases" USING btree ("_status");
  CREATE INDEX "forms__status_idx" ON "forms" USING btree ("_status");
  CREATE INDEX "faq_items__status_idx" ON "faq_items" USING btree ("_status");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_media_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_extended_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_extended" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_side_by_side_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_side_by_side_small_icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_side_by_side_bottom_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_side_by_side_bottom_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_side_by_side" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_story_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_story" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_agent_capabilities_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_agent_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_agent_solutions_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_agent_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_concierge_flow_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_concierge_flow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_enterprise_upgrade_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_enterprise_upgrade" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_channels_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_channels_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_stack_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_coverage_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_coverage_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_rows_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_capability_trio_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_capability_trio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_capability_tools_cards_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_capability_tools_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_capability_tools" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_use_cases_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_use_cases_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_security_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_security" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_functional_capabilities_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_functional_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_metrics_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_results_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_results_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_capability_strip_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_capability_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_live_in_days_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_live_in_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_news_insights_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_news_insights_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_news_insights_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_news_insights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_feed_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_feed_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_feed_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_cards_cards_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_details_sections_headers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_details_sections_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_details_sections_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_details_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_difference_left_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_difference_right_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_difference" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pain_points_comparison_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pain_points_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_policy_callouts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pricing_policy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_industry_expertise_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_industry_expertise_info_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_industry_expertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_strip_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_strip_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_integrations_banner_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_integrations_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_grid_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_grid_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabs_showcase_tabs_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabs_showcase_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabs_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_anchor_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_anchor_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_comparison_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_use_case_flow_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_use_case_flow_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_use_case_flow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero_extended_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_hero_extended" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_side_by_side_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_side_by_side_small_icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_side_by_side_bottom_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_side_by_side_bottom_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_side_by_side" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_story_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_story" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_feature_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_agent_capabilities_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_agent_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_agent_solutions_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_agent_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_contact_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_concierge_flow_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_concierge_flow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_enterprise_upgrade_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_enterprise_upgrade" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_channels_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_channels_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_feature_stack_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_feature_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_coverage_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_coverage_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_feature_rows_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_feature_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_capability_trio_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_capability_trio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_capability_tools_cards_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_capability_tools_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_capability_tools" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_use_cases_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_use_cases_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_security_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_security" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_functional_capabilities_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_functional_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_how_it_works_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_metrics_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_results_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_results_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_stats_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_stats_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_capability_strip_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_capability_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_live_in_days_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_live_in_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_news_insights_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_news_insights_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_news_insights_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_news_insights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_content_feed_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_content_feed_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_content_feed_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_content_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_pricing_cards_cards_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_pricing_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_pricing_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_pricing_details_sections_headers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_pricing_details_sections_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_pricing_details_sections_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_pricing_details_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_pricing_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_difference_left_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_difference_right_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_difference" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_pain_points_comparison_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_pain_points_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_pricing_policy_callouts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_pricing_policy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_industry_expertise_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_industry_expertise_info_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_industry_expertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_logo_strip_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_logo_strip_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_logo_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_integrations_banner_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_integrations_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_logo_grid_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_logo_grid_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_logo_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_tabs_showcase_tabs_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_tabs_showcase_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_tabs_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_anchor_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_anchor_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_comparison_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_comparison_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_use_case_flow_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_use_case_flow_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_use_case_flow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_article_meta_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_hero_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_hero_extended_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_hero_extended" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_side_by_side_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_side_by_side_small_icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_side_by_side_bottom_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_side_by_side_bottom_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_side_by_side" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_story_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_story" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_feature_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_agent_capabilities_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_agent_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_agent_solutions_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_agent_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_contact_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_concierge_flow_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_concierge_flow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_enterprise_upgrade_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_enterprise_upgrade" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_channels_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_channels_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_feature_stack_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_feature_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_coverage_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_coverage_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_feature_rows_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_feature_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_capability_trio_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_capability_trio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_capability_tools_cards_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_capability_tools_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_capability_tools" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_use_cases_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_use_cases_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_security_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_security" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_functional_capabilities_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_functional_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_how_it_works_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_metrics_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_results_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_results_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_stats_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_stats_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_capability_strip_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_capability_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_live_in_days_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_live_in_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_news_insights_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_news_insights_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_news_insights_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_news_insights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_content_feed_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_content_feed_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_content_feed_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_content_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_pricing_cards_cards_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_pricing_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_pricing_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_pricing_details_sections_headers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_pricing_details_sections_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_pricing_details_sections_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_pricing_details_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_pricing_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_difference_left_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_difference_right_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_difference" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_pain_points_comparison_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_pain_points_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_pricing_policy_callouts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_pricing_policy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_industry_expertise_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_industry_expertise_info_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_industry_expertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_logo_strip_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_logo_strip_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_logo_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_integrations_banner_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_integrations_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_logo_grid_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_logo_grid_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_logo_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_tabs_showcase_tabs_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_tabs_showcase_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_tabs_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_anchor_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_anchor_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_comparison_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_comparison_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_use_case_flow_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_use_case_flow_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_blocks_use_case_flow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_version_article_meta_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_hero_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_hero_extended_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_hero_extended" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_side_by_side_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_side_by_side_small_icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_side_by_side_bottom_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_side_by_side_bottom_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_side_by_side" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_story_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_story" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_feature_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_agent_capabilities_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_agent_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_agent_solutions_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_agent_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_contact_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_concierge_flow_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_concierge_flow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_enterprise_upgrade_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_enterprise_upgrade" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_channels_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_channels_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_feature_stack_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_feature_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_coverage_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_coverage_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_feature_rows_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_feature_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_capability_trio_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_capability_trio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_capability_tools_cards_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_capability_tools_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_capability_tools" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_use_cases_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_use_cases_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_security_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_security" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_functional_capabilities_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_functional_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_how_it_works_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_metrics_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_results_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_results_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_stats_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_stats_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_capability_strip_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_capability_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_live_in_days_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_live_in_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_news_insights_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_news_insights_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_news_insights_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_news_insights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_content_feed_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_content_feed_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_content_feed_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_content_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_pricing_cards_cards_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_pricing_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_pricing_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_pricing_details_sections_headers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_pricing_details_sections_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_pricing_details_sections_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_pricing_details_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_pricing_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_difference_left_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_difference_right_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_difference" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_pain_points_comparison_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_pain_points_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_pricing_policy_callouts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_pricing_policy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_industry_expertise_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_industry_expertise_info_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_industry_expertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_logo_strip_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_logo_strip_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_logo_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_integrations_banner_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_integrations_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_logo_grid_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_logo_grid_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_logo_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_tabs_showcase_tabs_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_tabs_showcase_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_tabs_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_anchor_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_anchor_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_comparison_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_comparison_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_use_case_flow_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_use_case_flow_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_blocks_use_case_flow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v_version_article_meta_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_guides_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_version_tip_card_icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_hero_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_hero_extended_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_hero_extended" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_side_by_side_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_side_by_side_small_icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_side_by_side_bottom_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_side_by_side_bottom_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_side_by_side" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_story_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_story" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_feature_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_agent_capabilities_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_agent_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_agent_solutions_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_agent_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_contact_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_concierge_flow_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_concierge_flow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_enterprise_upgrade_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_enterprise_upgrade" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_channels_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_channels_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_feature_stack_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_feature_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_coverage_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_coverage_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_feature_rows_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_feature_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_capability_trio_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_capability_trio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_capability_tools_cards_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_capability_tools_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_capability_tools" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_use_cases_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_use_cases_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_security_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_security" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_functional_capabilities_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_functional_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_how_it_works_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_metrics_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_results_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_results_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_stats_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_stats_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_capability_strip_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_capability_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_live_in_days_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_live_in_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_news_insights_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_news_insights_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_news_insights_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_news_insights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_content_feed_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_content_feed_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_content_feed_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_content_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_pricing_cards_cards_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_pricing_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_pricing_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_pricing_details_sections_headers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_pricing_details_sections_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_pricing_details_sections_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_pricing_details_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_pricing_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_difference_left_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_difference_right_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_difference" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_pain_points_comparison_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_pain_points_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_pricing_policy_callouts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_pricing_policy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_industry_expertise_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_industry_expertise_info_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_industry_expertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_logo_strip_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_logo_strip_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_logo_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_integrations_banner_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_integrations_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_logo_grid_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_logo_grid_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_logo_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_tabs_showcase_tabs_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_tabs_showcase_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_tabs_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_anchor_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_anchor_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_comparison_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_comparison_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_use_case_flow_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_use_case_flow_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v_blocks_use_case_flow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tips_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_hero_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_hero_extended_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_hero_extended" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_side_by_side_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_side_by_side_small_icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_side_by_side_bottom_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_side_by_side_bottom_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_side_by_side" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_story_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_story" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_media_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_feature_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_agent_capabilities_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_agent_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_agent_solutions_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_agent_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_contact_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_concierge_flow_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_concierge_flow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_enterprise_upgrade_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_enterprise_upgrade" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_channels_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_channels_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_feature_stack_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_feature_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_coverage_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_coverage_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_feature_rows_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_feature_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_capability_trio_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_capability_trio" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_capability_tools_cards_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_capability_tools_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_capability_tools" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_use_cases_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_use_cases_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_security_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_security" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_functional_capabilities_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_functional_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_how_it_works_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_metrics_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_results_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_results_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_stats_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_stats_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_capability_strip_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_capability_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_live_in_days_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_live_in_days" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_news_insights_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_news_insights_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_news_insights_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_news_insights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_content_feed_collections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_content_feed_cards_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_content_feed_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_content_feed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_pricing_cards_cards_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_pricing_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_pricing_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_pricing_details_sections_headers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_pricing_details_sections_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_pricing_details_sections_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_pricing_details_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_pricing_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_difference_left_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_difference_right_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_difference" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_pain_points_comparison_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_pain_points_comparison" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_pricing_policy_callouts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_pricing_policy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_industry_expertise_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_industry_expertise_info_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_industry_expertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_logo_strip_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_logo_strip_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_logo_strip" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_integrations_banner_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_integrations_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_logo_grid_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_logo_grid_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_logo_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_tabs_showcase_tabs_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_tabs_showcase_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_tabs_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_anchor_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_anchor_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_comparison_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_comparison_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_use_case_flow_columns_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_use_case_flow_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v_blocks_use_case_flow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_use_cases_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_forms_v_version_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_forms_v_version_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_forms_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faq_items_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_testimonials_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_media_v" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_extended_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_extended" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_side_by_side_bullets" CASCADE;
  DROP TABLE "_pages_v_blocks_side_by_side_small_icons" CASCADE;
  DROP TABLE "_pages_v_blocks_side_by_side_bottom_cards_items" CASCADE;
  DROP TABLE "_pages_v_blocks_side_by_side_bottom_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_side_by_side" CASCADE;
  DROP TABLE "_pages_v_blocks_story_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_story" CASCADE;
  DROP TABLE "_pages_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_agent_capabilities_items" CASCADE;
  DROP TABLE "_pages_v_blocks_agent_capabilities" CASCADE;
  DROP TABLE "_pages_v_blocks_agent_solutions_items" CASCADE;
  DROP TABLE "_pages_v_blocks_agent_solutions" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us" CASCADE;
  DROP TABLE "_pages_v_blocks_concierge_flow_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_concierge_flow" CASCADE;
  DROP TABLE "_pages_v_blocks_enterprise_upgrade_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_enterprise_upgrade" CASCADE;
  DROP TABLE "_pages_v_blocks_channels_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_channels_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_stack_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_stack" CASCADE;
  DROP TABLE "_pages_v_blocks_coverage_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_coverage_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_rows_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_capability_trio_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_capability_trio" CASCADE;
  DROP TABLE "_pages_v_blocks_capability_tools_cards_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_capability_tools_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_capability_tools" CASCADE;
  DROP TABLE "_pages_v_blocks_use_cases_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_use_cases_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_security_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_security" CASCADE;
  DROP TABLE "_pages_v_blocks_functional_capabilities_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_functional_capabilities" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_metrics_items" CASCADE;
  DROP TABLE "_pages_v_blocks_metrics" CASCADE;
  DROP TABLE "_pages_v_blocks_results_stats_items" CASCADE;
  DROP TABLE "_pages_v_blocks_results_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_cards_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_capability_strip_items" CASCADE;
  DROP TABLE "_pages_v_blocks_capability_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_live_in_days_items" CASCADE;
  DROP TABLE "_pages_v_blocks_live_in_days" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_news_insights_collections" CASCADE;
  DROP TABLE "_pages_v_blocks_news_insights_cards_tags" CASCADE;
  DROP TABLE "_pages_v_blocks_news_insights_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_news_insights" CASCADE;
  DROP TABLE "_pages_v_blocks_content_feed_collections" CASCADE;
  DROP TABLE "_pages_v_blocks_content_feed_cards_tags" CASCADE;
  DROP TABLE "_pages_v_blocks_content_feed_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_content_feed" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_cards_cards_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_details_sections_headers" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_details_sections_rows_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_details_sections_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_details_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_details" CASCADE;
  DROP TABLE "_pages_v_blocks_difference_left_items" CASCADE;
  DROP TABLE "_pages_v_blocks_difference_right_items" CASCADE;
  DROP TABLE "_pages_v_blocks_difference" CASCADE;
  DROP TABLE "_pages_v_blocks_pain_points_comparison_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_pain_points_comparison" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_policy_callouts" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_policy" CASCADE;
  DROP TABLE "_pages_v_blocks_industry_expertise_items" CASCADE;
  DROP TABLE "_pages_v_blocks_industry_expertise_info_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_industry_expertise" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_strip_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_integrations_banner_items" CASCADE;
  DROP TABLE "_pages_v_blocks_integrations_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_grid_columns_items" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_grid_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_showcase_tabs_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_showcase_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_anchor_nav_items" CASCADE;
  DROP TABLE "_pages_v_blocks_anchor_nav" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_use_case_flow_columns_items" CASCADE;
  DROP TABLE "_pages_v_blocks_use_case_flow_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_use_case_flow" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_hero" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_extended_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_extended" CASCADE;
  DROP TABLE "_posts_v_blocks_rich_text" CASCADE;
  DROP TABLE "_posts_v_blocks_side_by_side_bullets" CASCADE;
  DROP TABLE "_posts_v_blocks_side_by_side_small_icons" CASCADE;
  DROP TABLE "_posts_v_blocks_side_by_side_bottom_cards_items" CASCADE;
  DROP TABLE "_posts_v_blocks_side_by_side_bottom_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_side_by_side" CASCADE;
  DROP TABLE "_posts_v_blocks_story_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_story" CASCADE;
  DROP TABLE "_posts_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_posts_v_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_posts_v_blocks_agent_capabilities_items" CASCADE;
  DROP TABLE "_posts_v_blocks_agent_capabilities" CASCADE;
  DROP TABLE "_posts_v_blocks_agent_solutions_items" CASCADE;
  DROP TABLE "_posts_v_blocks_agent_solutions" CASCADE;
  DROP TABLE "_posts_v_blocks_contact_us" CASCADE;
  DROP TABLE "_posts_v_blocks_concierge_flow_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_concierge_flow" CASCADE;
  DROP TABLE "_posts_v_blocks_enterprise_upgrade_benefits" CASCADE;
  DROP TABLE "_posts_v_blocks_enterprise_upgrade" CASCADE;
  DROP TABLE "_posts_v_blocks_channels_grid_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_channels_grid" CASCADE;
  DROP TABLE "_posts_v_blocks_feature_stack_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_feature_stack" CASCADE;
  DROP TABLE "_posts_v_blocks_coverage_grid_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_coverage_grid" CASCADE;
  DROP TABLE "_posts_v_blocks_feature_rows_rows" CASCADE;
  DROP TABLE "_posts_v_blocks_feature_rows" CASCADE;
  DROP TABLE "_posts_v_blocks_capability_trio_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_capability_trio" CASCADE;
  DROP TABLE "_posts_v_blocks_capability_tools_cards_logos" CASCADE;
  DROP TABLE "_posts_v_blocks_capability_tools_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_capability_tools" CASCADE;
  DROP TABLE "_posts_v_blocks_use_cases_grid_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_use_cases_grid" CASCADE;
  DROP TABLE "_posts_v_blocks_security_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_security" CASCADE;
  DROP TABLE "_posts_v_blocks_functional_capabilities_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_functional_capabilities" CASCADE;
  DROP TABLE "_posts_v_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "_posts_v_blocks_how_it_works" CASCADE;
  DROP TABLE "_posts_v_blocks_cta" CASCADE;
  DROP TABLE "_posts_v_blocks_metrics_items" CASCADE;
  DROP TABLE "_posts_v_blocks_metrics" CASCADE;
  DROP TABLE "_posts_v_blocks_results_stats_items" CASCADE;
  DROP TABLE "_posts_v_blocks_results_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_cards_items" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_capability_strip_items" CASCADE;
  DROP TABLE "_posts_v_blocks_capability_strip" CASCADE;
  DROP TABLE "_posts_v_blocks_live_in_days_items" CASCADE;
  DROP TABLE "_posts_v_blocks_live_in_days" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_items" CASCADE;
  DROP TABLE "_posts_v_blocks_faq" CASCADE;
  DROP TABLE "_posts_v_blocks_news_insights_collections" CASCADE;
  DROP TABLE "_posts_v_blocks_news_insights_cards_tags" CASCADE;
  DROP TABLE "_posts_v_blocks_news_insights_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_news_insights" CASCADE;
  DROP TABLE "_posts_v_blocks_content_feed_collections" CASCADE;
  DROP TABLE "_posts_v_blocks_content_feed_cards_tags" CASCADE;
  DROP TABLE "_posts_v_blocks_content_feed_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_content_feed" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_cards_cards_features" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_cards_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_details_sections_headers" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_details_sections_rows_cells" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_details_sections_rows" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_details_sections" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_details" CASCADE;
  DROP TABLE "_posts_v_blocks_difference_left_items" CASCADE;
  DROP TABLE "_posts_v_blocks_difference_right_items" CASCADE;
  DROP TABLE "_posts_v_blocks_difference" CASCADE;
  DROP TABLE "_posts_v_blocks_pain_points_comparison_rows" CASCADE;
  DROP TABLE "_posts_v_blocks_pain_points_comparison" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_policy_callouts" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_policy" CASCADE;
  DROP TABLE "_posts_v_blocks_industry_expertise_items" CASCADE;
  DROP TABLE "_posts_v_blocks_industry_expertise_info_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_industry_expertise" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_strip_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_strip" CASCADE;
  DROP TABLE "_posts_v_blocks_integrations_banner_items" CASCADE;
  DROP TABLE "_posts_v_blocks_integrations_banner" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_grid_columns_items" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_grid_columns" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_grid" CASCADE;
  DROP TABLE "_posts_v_blocks_tabs_showcase_tabs_steps" CASCADE;
  DROP TABLE "_posts_v_blocks_tabs_showcase_tabs" CASCADE;
  DROP TABLE "_posts_v_blocks_tabs_showcase" CASCADE;
  DROP TABLE "_posts_v_blocks_anchor_nav_items" CASCADE;
  DROP TABLE "_posts_v_blocks_anchor_nav" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonials" CASCADE;
  DROP TABLE "_posts_v_blocks_comparison_grid_cards" CASCADE;
  DROP TABLE "_posts_v_blocks_comparison_grid" CASCADE;
  DROP TABLE "_posts_v_blocks_use_case_flow_columns_items" CASCADE;
  DROP TABLE "_posts_v_blocks_use_case_flow_columns" CASCADE;
  DROP TABLE "_posts_v_blocks_use_case_flow" CASCADE;
  DROP TABLE "_posts_v_version_article_meta_tags" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_news_v_blocks_hero_cards" CASCADE;
  DROP TABLE "_news_v_blocks_hero" CASCADE;
  DROP TABLE "_news_v_blocks_hero_extended_cards" CASCADE;
  DROP TABLE "_news_v_blocks_hero_extended" CASCADE;
  DROP TABLE "_news_v_blocks_rich_text" CASCADE;
  DROP TABLE "_news_v_blocks_side_by_side_bullets" CASCADE;
  DROP TABLE "_news_v_blocks_side_by_side_small_icons" CASCADE;
  DROP TABLE "_news_v_blocks_side_by_side_bottom_cards_items" CASCADE;
  DROP TABLE "_news_v_blocks_side_by_side_bottom_cards" CASCADE;
  DROP TABLE "_news_v_blocks_side_by_side" CASCADE;
  DROP TABLE "_news_v_blocks_story_cards" CASCADE;
  DROP TABLE "_news_v_blocks_story" CASCADE;
  DROP TABLE "_news_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_news_v_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "_news_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_news_v_blocks_agent_capabilities_items" CASCADE;
  DROP TABLE "_news_v_blocks_agent_capabilities" CASCADE;
  DROP TABLE "_news_v_blocks_agent_solutions_items" CASCADE;
  DROP TABLE "_news_v_blocks_agent_solutions" CASCADE;
  DROP TABLE "_news_v_blocks_contact_us" CASCADE;
  DROP TABLE "_news_v_blocks_concierge_flow_cards" CASCADE;
  DROP TABLE "_news_v_blocks_concierge_flow" CASCADE;
  DROP TABLE "_news_v_blocks_enterprise_upgrade_benefits" CASCADE;
  DROP TABLE "_news_v_blocks_enterprise_upgrade" CASCADE;
  DROP TABLE "_news_v_blocks_channels_grid_cards" CASCADE;
  DROP TABLE "_news_v_blocks_channels_grid" CASCADE;
  DROP TABLE "_news_v_blocks_feature_stack_cards" CASCADE;
  DROP TABLE "_news_v_blocks_feature_stack" CASCADE;
  DROP TABLE "_news_v_blocks_coverage_grid_cards" CASCADE;
  DROP TABLE "_news_v_blocks_coverage_grid" CASCADE;
  DROP TABLE "_news_v_blocks_feature_rows_rows" CASCADE;
  DROP TABLE "_news_v_blocks_feature_rows" CASCADE;
  DROP TABLE "_news_v_blocks_capability_trio_cards" CASCADE;
  DROP TABLE "_news_v_blocks_capability_trio" CASCADE;
  DROP TABLE "_news_v_blocks_capability_tools_cards_logos" CASCADE;
  DROP TABLE "_news_v_blocks_capability_tools_cards" CASCADE;
  DROP TABLE "_news_v_blocks_capability_tools" CASCADE;
  DROP TABLE "_news_v_blocks_use_cases_grid_cards" CASCADE;
  DROP TABLE "_news_v_blocks_use_cases_grid" CASCADE;
  DROP TABLE "_news_v_blocks_security_cards" CASCADE;
  DROP TABLE "_news_v_blocks_security" CASCADE;
  DROP TABLE "_news_v_blocks_functional_capabilities_cards" CASCADE;
  DROP TABLE "_news_v_blocks_functional_capabilities" CASCADE;
  DROP TABLE "_news_v_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "_news_v_blocks_how_it_works" CASCADE;
  DROP TABLE "_news_v_blocks_cta" CASCADE;
  DROP TABLE "_news_v_blocks_metrics_items" CASCADE;
  DROP TABLE "_news_v_blocks_metrics" CASCADE;
  DROP TABLE "_news_v_blocks_results_stats_items" CASCADE;
  DROP TABLE "_news_v_blocks_results_stats" CASCADE;
  DROP TABLE "_news_v_blocks_stats_cards_items" CASCADE;
  DROP TABLE "_news_v_blocks_stats_cards" CASCADE;
  DROP TABLE "_news_v_blocks_capability_strip_items" CASCADE;
  DROP TABLE "_news_v_blocks_capability_strip" CASCADE;
  DROP TABLE "_news_v_blocks_live_in_days_items" CASCADE;
  DROP TABLE "_news_v_blocks_live_in_days" CASCADE;
  DROP TABLE "_news_v_blocks_faq_items" CASCADE;
  DROP TABLE "_news_v_blocks_faq" CASCADE;
  DROP TABLE "_news_v_blocks_news_insights_collections" CASCADE;
  DROP TABLE "_news_v_blocks_news_insights_cards_tags" CASCADE;
  DROP TABLE "_news_v_blocks_news_insights_cards" CASCADE;
  DROP TABLE "_news_v_blocks_news_insights" CASCADE;
  DROP TABLE "_news_v_blocks_content_feed_collections" CASCADE;
  DROP TABLE "_news_v_blocks_content_feed_cards_tags" CASCADE;
  DROP TABLE "_news_v_blocks_content_feed_cards" CASCADE;
  DROP TABLE "_news_v_blocks_content_feed" CASCADE;
  DROP TABLE "_news_v_blocks_pricing_cards_cards_features" CASCADE;
  DROP TABLE "_news_v_blocks_pricing_cards_cards" CASCADE;
  DROP TABLE "_news_v_blocks_pricing_cards" CASCADE;
  DROP TABLE "_news_v_blocks_pricing_details_sections_headers" CASCADE;
  DROP TABLE "_news_v_blocks_pricing_details_sections_rows_cells" CASCADE;
  DROP TABLE "_news_v_blocks_pricing_details_sections_rows" CASCADE;
  DROP TABLE "_news_v_blocks_pricing_details_sections" CASCADE;
  DROP TABLE "_news_v_blocks_pricing_details" CASCADE;
  DROP TABLE "_news_v_blocks_difference_left_items" CASCADE;
  DROP TABLE "_news_v_blocks_difference_right_items" CASCADE;
  DROP TABLE "_news_v_blocks_difference" CASCADE;
  DROP TABLE "_news_v_blocks_pain_points_comparison_rows" CASCADE;
  DROP TABLE "_news_v_blocks_pain_points_comparison" CASCADE;
  DROP TABLE "_news_v_blocks_pricing_policy_callouts" CASCADE;
  DROP TABLE "_news_v_blocks_pricing_policy" CASCADE;
  DROP TABLE "_news_v_blocks_industry_expertise_items" CASCADE;
  DROP TABLE "_news_v_blocks_industry_expertise_info_cards" CASCADE;
  DROP TABLE "_news_v_blocks_industry_expertise" CASCADE;
  DROP TABLE "_news_v_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "_news_v_blocks_logo_strip_stats" CASCADE;
  DROP TABLE "_news_v_blocks_logo_strip" CASCADE;
  DROP TABLE "_news_v_blocks_integrations_banner_items" CASCADE;
  DROP TABLE "_news_v_blocks_integrations_banner" CASCADE;
  DROP TABLE "_news_v_blocks_logo_grid_columns_items" CASCADE;
  DROP TABLE "_news_v_blocks_logo_grid_columns" CASCADE;
  DROP TABLE "_news_v_blocks_logo_grid" CASCADE;
  DROP TABLE "_news_v_blocks_tabs_showcase_tabs_steps" CASCADE;
  DROP TABLE "_news_v_blocks_tabs_showcase_tabs" CASCADE;
  DROP TABLE "_news_v_blocks_tabs_showcase" CASCADE;
  DROP TABLE "_news_v_blocks_anchor_nav_items" CASCADE;
  DROP TABLE "_news_v_blocks_anchor_nav" CASCADE;
  DROP TABLE "_news_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_news_v_blocks_testimonials" CASCADE;
  DROP TABLE "_news_v_blocks_comparison_grid_cards" CASCADE;
  DROP TABLE "_news_v_blocks_comparison_grid" CASCADE;
  DROP TABLE "_news_v_blocks_use_case_flow_columns_items" CASCADE;
  DROP TABLE "_news_v_blocks_use_case_flow_columns" CASCADE;
  DROP TABLE "_news_v_blocks_use_case_flow" CASCADE;
  DROP TABLE "_news_v_version_article_meta_tags" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_guides_v_blocks_hero_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_hero" CASCADE;
  DROP TABLE "_guides_v_blocks_hero_extended_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_hero_extended" CASCADE;
  DROP TABLE "_guides_v_blocks_rich_text" CASCADE;
  DROP TABLE "_guides_v_blocks_side_by_side_bullets" CASCADE;
  DROP TABLE "_guides_v_blocks_side_by_side_small_icons" CASCADE;
  DROP TABLE "_guides_v_blocks_side_by_side_bottom_cards_items" CASCADE;
  DROP TABLE "_guides_v_blocks_side_by_side_bottom_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_side_by_side" CASCADE;
  DROP TABLE "_guides_v_blocks_story_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_story" CASCADE;
  DROP TABLE "_guides_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_guides_v_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_guides_v_blocks_agent_capabilities_items" CASCADE;
  DROP TABLE "_guides_v_blocks_agent_capabilities" CASCADE;
  DROP TABLE "_guides_v_blocks_agent_solutions_items" CASCADE;
  DROP TABLE "_guides_v_blocks_agent_solutions" CASCADE;
  DROP TABLE "_guides_v_blocks_contact_us" CASCADE;
  DROP TABLE "_guides_v_blocks_concierge_flow_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_concierge_flow" CASCADE;
  DROP TABLE "_guides_v_blocks_enterprise_upgrade_benefits" CASCADE;
  DROP TABLE "_guides_v_blocks_enterprise_upgrade" CASCADE;
  DROP TABLE "_guides_v_blocks_channels_grid_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_channels_grid" CASCADE;
  DROP TABLE "_guides_v_blocks_feature_stack_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_feature_stack" CASCADE;
  DROP TABLE "_guides_v_blocks_coverage_grid_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_coverage_grid" CASCADE;
  DROP TABLE "_guides_v_blocks_feature_rows_rows" CASCADE;
  DROP TABLE "_guides_v_blocks_feature_rows" CASCADE;
  DROP TABLE "_guides_v_blocks_capability_trio_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_capability_trio" CASCADE;
  DROP TABLE "_guides_v_blocks_capability_tools_cards_logos" CASCADE;
  DROP TABLE "_guides_v_blocks_capability_tools_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_capability_tools" CASCADE;
  DROP TABLE "_guides_v_blocks_use_cases_grid_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_use_cases_grid" CASCADE;
  DROP TABLE "_guides_v_blocks_security_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_security" CASCADE;
  DROP TABLE "_guides_v_blocks_functional_capabilities_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_functional_capabilities" CASCADE;
  DROP TABLE "_guides_v_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "_guides_v_blocks_how_it_works" CASCADE;
  DROP TABLE "_guides_v_blocks_cta" CASCADE;
  DROP TABLE "_guides_v_blocks_metrics_items" CASCADE;
  DROP TABLE "_guides_v_blocks_metrics" CASCADE;
  DROP TABLE "_guides_v_blocks_results_stats_items" CASCADE;
  DROP TABLE "_guides_v_blocks_results_stats" CASCADE;
  DROP TABLE "_guides_v_blocks_stats_cards_items" CASCADE;
  DROP TABLE "_guides_v_blocks_stats_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_capability_strip_items" CASCADE;
  DROP TABLE "_guides_v_blocks_capability_strip" CASCADE;
  DROP TABLE "_guides_v_blocks_live_in_days_items" CASCADE;
  DROP TABLE "_guides_v_blocks_live_in_days" CASCADE;
  DROP TABLE "_guides_v_blocks_faq_items" CASCADE;
  DROP TABLE "_guides_v_blocks_faq" CASCADE;
  DROP TABLE "_guides_v_blocks_news_insights_collections" CASCADE;
  DROP TABLE "_guides_v_blocks_news_insights_cards_tags" CASCADE;
  DROP TABLE "_guides_v_blocks_news_insights_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_news_insights" CASCADE;
  DROP TABLE "_guides_v_blocks_content_feed_collections" CASCADE;
  DROP TABLE "_guides_v_blocks_content_feed_cards_tags" CASCADE;
  DROP TABLE "_guides_v_blocks_content_feed_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_content_feed" CASCADE;
  DROP TABLE "_guides_v_blocks_pricing_cards_cards_features" CASCADE;
  DROP TABLE "_guides_v_blocks_pricing_cards_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_pricing_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_pricing_details_sections_headers" CASCADE;
  DROP TABLE "_guides_v_blocks_pricing_details_sections_rows_cells" CASCADE;
  DROP TABLE "_guides_v_blocks_pricing_details_sections_rows" CASCADE;
  DROP TABLE "_guides_v_blocks_pricing_details_sections" CASCADE;
  DROP TABLE "_guides_v_blocks_pricing_details" CASCADE;
  DROP TABLE "_guides_v_blocks_difference_left_items" CASCADE;
  DROP TABLE "_guides_v_blocks_difference_right_items" CASCADE;
  DROP TABLE "_guides_v_blocks_difference" CASCADE;
  DROP TABLE "_guides_v_blocks_pain_points_comparison_rows" CASCADE;
  DROP TABLE "_guides_v_blocks_pain_points_comparison" CASCADE;
  DROP TABLE "_guides_v_blocks_pricing_policy_callouts" CASCADE;
  DROP TABLE "_guides_v_blocks_pricing_policy" CASCADE;
  DROP TABLE "_guides_v_blocks_industry_expertise_items" CASCADE;
  DROP TABLE "_guides_v_blocks_industry_expertise_info_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_industry_expertise" CASCADE;
  DROP TABLE "_guides_v_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "_guides_v_blocks_logo_strip_stats" CASCADE;
  DROP TABLE "_guides_v_blocks_logo_strip" CASCADE;
  DROP TABLE "_guides_v_blocks_integrations_banner_items" CASCADE;
  DROP TABLE "_guides_v_blocks_integrations_banner" CASCADE;
  DROP TABLE "_guides_v_blocks_logo_grid_columns_items" CASCADE;
  DROP TABLE "_guides_v_blocks_logo_grid_columns" CASCADE;
  DROP TABLE "_guides_v_blocks_logo_grid" CASCADE;
  DROP TABLE "_guides_v_blocks_tabs_showcase_tabs_steps" CASCADE;
  DROP TABLE "_guides_v_blocks_tabs_showcase_tabs" CASCADE;
  DROP TABLE "_guides_v_blocks_tabs_showcase" CASCADE;
  DROP TABLE "_guides_v_blocks_anchor_nav_items" CASCADE;
  DROP TABLE "_guides_v_blocks_anchor_nav" CASCADE;
  DROP TABLE "_guides_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_guides_v_blocks_testimonials" CASCADE;
  DROP TABLE "_guides_v_blocks_comparison_grid_cards" CASCADE;
  DROP TABLE "_guides_v_blocks_comparison_grid" CASCADE;
  DROP TABLE "_guides_v_blocks_use_case_flow_columns_items" CASCADE;
  DROP TABLE "_guides_v_blocks_use_case_flow_columns" CASCADE;
  DROP TABLE "_guides_v_blocks_use_case_flow" CASCADE;
  DROP TABLE "_guides_v_version_article_meta_tags" CASCADE;
  DROP TABLE "_guides_v" CASCADE;
  DROP TABLE "_tips_v_version_tip_card_icons" CASCADE;
  DROP TABLE "_tips_v_blocks_hero_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_hero" CASCADE;
  DROP TABLE "_tips_v_blocks_hero_extended_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_hero_extended" CASCADE;
  DROP TABLE "_tips_v_blocks_rich_text" CASCADE;
  DROP TABLE "_tips_v_blocks_side_by_side_bullets" CASCADE;
  DROP TABLE "_tips_v_blocks_side_by_side_small_icons" CASCADE;
  DROP TABLE "_tips_v_blocks_side_by_side_bottom_cards_items" CASCADE;
  DROP TABLE "_tips_v_blocks_side_by_side_bottom_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_side_by_side" CASCADE;
  DROP TABLE "_tips_v_blocks_story_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_story" CASCADE;
  DROP TABLE "_tips_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_tips_v_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_tips_v_blocks_agent_capabilities_items" CASCADE;
  DROP TABLE "_tips_v_blocks_agent_capabilities" CASCADE;
  DROP TABLE "_tips_v_blocks_agent_solutions_items" CASCADE;
  DROP TABLE "_tips_v_blocks_agent_solutions" CASCADE;
  DROP TABLE "_tips_v_blocks_contact_us" CASCADE;
  DROP TABLE "_tips_v_blocks_concierge_flow_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_concierge_flow" CASCADE;
  DROP TABLE "_tips_v_blocks_enterprise_upgrade_benefits" CASCADE;
  DROP TABLE "_tips_v_blocks_enterprise_upgrade" CASCADE;
  DROP TABLE "_tips_v_blocks_channels_grid_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_channels_grid" CASCADE;
  DROP TABLE "_tips_v_blocks_feature_stack_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_feature_stack" CASCADE;
  DROP TABLE "_tips_v_blocks_coverage_grid_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_coverage_grid" CASCADE;
  DROP TABLE "_tips_v_blocks_feature_rows_rows" CASCADE;
  DROP TABLE "_tips_v_blocks_feature_rows" CASCADE;
  DROP TABLE "_tips_v_blocks_capability_trio_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_capability_trio" CASCADE;
  DROP TABLE "_tips_v_blocks_capability_tools_cards_logos" CASCADE;
  DROP TABLE "_tips_v_blocks_capability_tools_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_capability_tools" CASCADE;
  DROP TABLE "_tips_v_blocks_use_cases_grid_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_use_cases_grid" CASCADE;
  DROP TABLE "_tips_v_blocks_security_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_security" CASCADE;
  DROP TABLE "_tips_v_blocks_functional_capabilities_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_functional_capabilities" CASCADE;
  DROP TABLE "_tips_v_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "_tips_v_blocks_how_it_works" CASCADE;
  DROP TABLE "_tips_v_blocks_cta" CASCADE;
  DROP TABLE "_tips_v_blocks_metrics_items" CASCADE;
  DROP TABLE "_tips_v_blocks_metrics" CASCADE;
  DROP TABLE "_tips_v_blocks_results_stats_items" CASCADE;
  DROP TABLE "_tips_v_blocks_results_stats" CASCADE;
  DROP TABLE "_tips_v_blocks_stats_cards_items" CASCADE;
  DROP TABLE "_tips_v_blocks_stats_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_capability_strip_items" CASCADE;
  DROP TABLE "_tips_v_blocks_capability_strip" CASCADE;
  DROP TABLE "_tips_v_blocks_live_in_days_items" CASCADE;
  DROP TABLE "_tips_v_blocks_live_in_days" CASCADE;
  DROP TABLE "_tips_v_blocks_faq_items" CASCADE;
  DROP TABLE "_tips_v_blocks_faq" CASCADE;
  DROP TABLE "_tips_v_blocks_news_insights_collections" CASCADE;
  DROP TABLE "_tips_v_blocks_news_insights_cards_tags" CASCADE;
  DROP TABLE "_tips_v_blocks_news_insights_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_news_insights" CASCADE;
  DROP TABLE "_tips_v_blocks_content_feed_collections" CASCADE;
  DROP TABLE "_tips_v_blocks_content_feed_cards_tags" CASCADE;
  DROP TABLE "_tips_v_blocks_content_feed_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_content_feed" CASCADE;
  DROP TABLE "_tips_v_blocks_pricing_cards_cards_features" CASCADE;
  DROP TABLE "_tips_v_blocks_pricing_cards_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_pricing_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_pricing_details_sections_headers" CASCADE;
  DROP TABLE "_tips_v_blocks_pricing_details_sections_rows_cells" CASCADE;
  DROP TABLE "_tips_v_blocks_pricing_details_sections_rows" CASCADE;
  DROP TABLE "_tips_v_blocks_pricing_details_sections" CASCADE;
  DROP TABLE "_tips_v_blocks_pricing_details" CASCADE;
  DROP TABLE "_tips_v_blocks_difference_left_items" CASCADE;
  DROP TABLE "_tips_v_blocks_difference_right_items" CASCADE;
  DROP TABLE "_tips_v_blocks_difference" CASCADE;
  DROP TABLE "_tips_v_blocks_pain_points_comparison_rows" CASCADE;
  DROP TABLE "_tips_v_blocks_pain_points_comparison" CASCADE;
  DROP TABLE "_tips_v_blocks_pricing_policy_callouts" CASCADE;
  DROP TABLE "_tips_v_blocks_pricing_policy" CASCADE;
  DROP TABLE "_tips_v_blocks_industry_expertise_items" CASCADE;
  DROP TABLE "_tips_v_blocks_industry_expertise_info_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_industry_expertise" CASCADE;
  DROP TABLE "_tips_v_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "_tips_v_blocks_logo_strip_stats" CASCADE;
  DROP TABLE "_tips_v_blocks_logo_strip" CASCADE;
  DROP TABLE "_tips_v_blocks_integrations_banner_items" CASCADE;
  DROP TABLE "_tips_v_blocks_integrations_banner" CASCADE;
  DROP TABLE "_tips_v_blocks_logo_grid_columns_items" CASCADE;
  DROP TABLE "_tips_v_blocks_logo_grid_columns" CASCADE;
  DROP TABLE "_tips_v_blocks_logo_grid" CASCADE;
  DROP TABLE "_tips_v_blocks_tabs_showcase_tabs_steps" CASCADE;
  DROP TABLE "_tips_v_blocks_tabs_showcase_tabs" CASCADE;
  DROP TABLE "_tips_v_blocks_tabs_showcase" CASCADE;
  DROP TABLE "_tips_v_blocks_anchor_nav_items" CASCADE;
  DROP TABLE "_tips_v_blocks_anchor_nav" CASCADE;
  DROP TABLE "_tips_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_tips_v_blocks_testimonials" CASCADE;
  DROP TABLE "_tips_v_blocks_comparison_grid_cards" CASCADE;
  DROP TABLE "_tips_v_blocks_comparison_grid" CASCADE;
  DROP TABLE "_tips_v_blocks_use_case_flow_columns_items" CASCADE;
  DROP TABLE "_tips_v_blocks_use_case_flow_columns" CASCADE;
  DROP TABLE "_tips_v_blocks_use_case_flow" CASCADE;
  DROP TABLE "_tips_v" CASCADE;
  DROP TABLE "_use_cases_v_blocks_hero_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_hero" CASCADE;
  DROP TABLE "_use_cases_v_blocks_hero_extended_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_hero_extended" CASCADE;
  DROP TABLE "_use_cases_v_blocks_rich_text" CASCADE;
  DROP TABLE "_use_cases_v_blocks_side_by_side_bullets" CASCADE;
  DROP TABLE "_use_cases_v_blocks_side_by_side_small_icons" CASCADE;
  DROP TABLE "_use_cases_v_blocks_side_by_side_bottom_cards_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_side_by_side_bottom_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_side_by_side" CASCADE;
  DROP TABLE "_use_cases_v_blocks_story_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_story" CASCADE;
  DROP TABLE "_use_cases_v_blocks_media_showcase" CASCADE;
  DROP TABLE "_use_cases_v_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_use_cases_v_blocks_agent_capabilities_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_agent_capabilities" CASCADE;
  DROP TABLE "_use_cases_v_blocks_agent_solutions_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_agent_solutions" CASCADE;
  DROP TABLE "_use_cases_v_blocks_contact_us" CASCADE;
  DROP TABLE "_use_cases_v_blocks_concierge_flow_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_concierge_flow" CASCADE;
  DROP TABLE "_use_cases_v_blocks_enterprise_upgrade_benefits" CASCADE;
  DROP TABLE "_use_cases_v_blocks_enterprise_upgrade" CASCADE;
  DROP TABLE "_use_cases_v_blocks_channels_grid_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_channels_grid" CASCADE;
  DROP TABLE "_use_cases_v_blocks_feature_stack_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_feature_stack" CASCADE;
  DROP TABLE "_use_cases_v_blocks_coverage_grid_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_coverage_grid" CASCADE;
  DROP TABLE "_use_cases_v_blocks_feature_rows_rows" CASCADE;
  DROP TABLE "_use_cases_v_blocks_feature_rows" CASCADE;
  DROP TABLE "_use_cases_v_blocks_capability_trio_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_capability_trio" CASCADE;
  DROP TABLE "_use_cases_v_blocks_capability_tools_cards_logos" CASCADE;
  DROP TABLE "_use_cases_v_blocks_capability_tools_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_capability_tools" CASCADE;
  DROP TABLE "_use_cases_v_blocks_use_cases_grid_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_use_cases_grid" CASCADE;
  DROP TABLE "_use_cases_v_blocks_security_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_security" CASCADE;
  DROP TABLE "_use_cases_v_blocks_functional_capabilities_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_functional_capabilities" CASCADE;
  DROP TABLE "_use_cases_v_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "_use_cases_v_blocks_how_it_works" CASCADE;
  DROP TABLE "_use_cases_v_blocks_cta" CASCADE;
  DROP TABLE "_use_cases_v_blocks_metrics_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_metrics" CASCADE;
  DROP TABLE "_use_cases_v_blocks_results_stats_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_results_stats" CASCADE;
  DROP TABLE "_use_cases_v_blocks_stats_cards_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_stats_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_capability_strip_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_capability_strip" CASCADE;
  DROP TABLE "_use_cases_v_blocks_live_in_days_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_live_in_days" CASCADE;
  DROP TABLE "_use_cases_v_blocks_faq_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_faq" CASCADE;
  DROP TABLE "_use_cases_v_blocks_news_insights_collections" CASCADE;
  DROP TABLE "_use_cases_v_blocks_news_insights_cards_tags" CASCADE;
  DROP TABLE "_use_cases_v_blocks_news_insights_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_news_insights" CASCADE;
  DROP TABLE "_use_cases_v_blocks_content_feed_collections" CASCADE;
  DROP TABLE "_use_cases_v_blocks_content_feed_cards_tags" CASCADE;
  DROP TABLE "_use_cases_v_blocks_content_feed_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_content_feed" CASCADE;
  DROP TABLE "_use_cases_v_blocks_pricing_cards_cards_features" CASCADE;
  DROP TABLE "_use_cases_v_blocks_pricing_cards_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_pricing_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_pricing_details_sections_headers" CASCADE;
  DROP TABLE "_use_cases_v_blocks_pricing_details_sections_rows_cells" CASCADE;
  DROP TABLE "_use_cases_v_blocks_pricing_details_sections_rows" CASCADE;
  DROP TABLE "_use_cases_v_blocks_pricing_details_sections" CASCADE;
  DROP TABLE "_use_cases_v_blocks_pricing_details" CASCADE;
  DROP TABLE "_use_cases_v_blocks_difference_left_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_difference_right_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_difference" CASCADE;
  DROP TABLE "_use_cases_v_blocks_pain_points_comparison_rows" CASCADE;
  DROP TABLE "_use_cases_v_blocks_pain_points_comparison" CASCADE;
  DROP TABLE "_use_cases_v_blocks_pricing_policy_callouts" CASCADE;
  DROP TABLE "_use_cases_v_blocks_pricing_policy" CASCADE;
  DROP TABLE "_use_cases_v_blocks_industry_expertise_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_industry_expertise_info_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_industry_expertise" CASCADE;
  DROP TABLE "_use_cases_v_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "_use_cases_v_blocks_logo_strip_stats" CASCADE;
  DROP TABLE "_use_cases_v_blocks_logo_strip" CASCADE;
  DROP TABLE "_use_cases_v_blocks_integrations_banner_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_integrations_banner" CASCADE;
  DROP TABLE "_use_cases_v_blocks_logo_grid_columns_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_logo_grid_columns" CASCADE;
  DROP TABLE "_use_cases_v_blocks_logo_grid" CASCADE;
  DROP TABLE "_use_cases_v_blocks_tabs_showcase_tabs_steps" CASCADE;
  DROP TABLE "_use_cases_v_blocks_tabs_showcase_tabs" CASCADE;
  DROP TABLE "_use_cases_v_blocks_tabs_showcase" CASCADE;
  DROP TABLE "_use_cases_v_blocks_anchor_nav_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_anchor_nav" CASCADE;
  DROP TABLE "_use_cases_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_testimonials" CASCADE;
  DROP TABLE "_use_cases_v_blocks_comparison_grid_cards" CASCADE;
  DROP TABLE "_use_cases_v_blocks_comparison_grid" CASCADE;
  DROP TABLE "_use_cases_v_blocks_use_case_flow_columns_items" CASCADE;
  DROP TABLE "_use_cases_v_blocks_use_case_flow_columns" CASCADE;
  DROP TABLE "_use_cases_v_blocks_use_case_flow" CASCADE;
  DROP TABLE "_use_cases_v" CASCADE;
  DROP TABLE "_forms_v_version_fields_options" CASCADE;
  DROP TABLE "_forms_v_version_fields" CASCADE;
  DROP TABLE "_forms_v" CASCADE;
  DROP TABLE "_faq_items_v" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP INDEX "pages__status_idx";
  DROP INDEX "posts__status_idx";
  DROP INDEX "news__status_idx";
  DROP INDEX "guides__status_idx";
  DROP INDEX "tips__status_idx";
  DROP INDEX "use_cases__status_idx";
  DROP INDEX "forms__status_idx";
  DROP INDEX "faq_items__status_idx";
  DROP INDEX "testimonials__status_idx";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_hero_extended" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_rich_text" ALTER COLUMN "html" SET NOT NULL;
  ALTER TABLE "pages_blocks_side_by_side_bullets" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_side_by_side" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_metrics_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "pages_blocks_metrics_items" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "pages_blocks_metrics" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_results_stats_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "pages_blocks_results_stats_items" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "pages_blocks_results_stats" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_stats_cards_items" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_stats_cards_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "pages_blocks_stats_cards_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_stats_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_capability_strip_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_live_in_days_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "pages_blocks_faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "pages_blocks_faq" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_news_insights_cards_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_news_insights_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_news_insights_cards" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "pages_blocks_news_insights" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_content_feed_cards_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_content_feed_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_content_feed_cards" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "pages_blocks_content_feed" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_pricing_cards_cards_features" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "pages_blocks_pricing_details_sections_headers" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "pages_blocks_pain_points_comparison" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_pricing_policy_callouts" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "pages_blocks_industry_expertise_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_industry_expertise" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_tabs_showcase_tabs_steps" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "pages_blocks_tabs_showcase_tabs" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_anchor_nav_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_use_case_flow_columns_items" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "path" SET NOT NULL;
  ALTER TABLE "posts_blocks_hero" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_hero_extended" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_rich_text" ALTER COLUMN "html" SET NOT NULL;
  ALTER TABLE "posts_blocks_side_by_side_bullets" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_side_by_side" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_cta" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_metrics_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "posts_blocks_metrics_items" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "posts_blocks_metrics" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_results_stats_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "posts_blocks_results_stats_items" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "posts_blocks_results_stats" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_stats_cards_items" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "posts_blocks_stats_cards_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "posts_blocks_stats_cards_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "posts_blocks_stats_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_capability_strip_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "posts_blocks_live_in_days_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "posts_blocks_faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "posts_blocks_faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "posts_blocks_faq" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_news_insights_cards_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "posts_blocks_news_insights_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_news_insights_cards" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "posts_blocks_news_insights" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_content_feed_cards_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "posts_blocks_content_feed_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_content_feed_cards" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "posts_blocks_content_feed" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_pricing_cards_cards_features" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "posts_blocks_pricing_details_sections_headers" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "posts_blocks_pain_points_comparison" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_pricing_policy_callouts" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "posts_blocks_industry_expertise_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_industry_expertise" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts_blocks_tabs_showcase_tabs_steps" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "posts_blocks_tabs_showcase_tabs" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "posts_blocks_anchor_nav_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "posts_blocks_use_case_flow_columns_items" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "posts_article_meta_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "posts" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "posts" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "posts" ALTER COLUMN "path" SET NOT NULL;
  ALTER TABLE "news_blocks_hero" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_hero_extended" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_rich_text" ALTER COLUMN "html" SET NOT NULL;
  ALTER TABLE "news_blocks_side_by_side_bullets" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_side_by_side" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_cta" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_metrics_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "news_blocks_metrics_items" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "news_blocks_metrics" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_results_stats_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "news_blocks_results_stats_items" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "news_blocks_results_stats" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_stats_cards_items" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "news_blocks_stats_cards_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "news_blocks_stats_cards_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "news_blocks_stats_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_capability_strip_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "news_blocks_live_in_days_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "news_blocks_faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "news_blocks_faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "news_blocks_faq" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_news_insights_cards_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "news_blocks_news_insights_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_news_insights_cards" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "news_blocks_news_insights" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_content_feed_cards_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "news_blocks_content_feed_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_content_feed_cards" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "news_blocks_content_feed" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_pricing_cards_cards_features" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "news_blocks_pricing_details_sections_headers" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "news_blocks_pain_points_comparison" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_pricing_policy_callouts" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "news_blocks_industry_expertise_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_industry_expertise" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news_blocks_tabs_showcase_tabs_steps" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "news_blocks_tabs_showcase_tabs" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "news_blocks_anchor_nav_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "news_blocks_use_case_flow_columns_items" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "news_article_meta_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "news" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "news" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "news" ALTER COLUMN "path" SET NOT NULL;
  ALTER TABLE "guides_blocks_hero" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_hero_extended" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_rich_text" ALTER COLUMN "html" SET NOT NULL;
  ALTER TABLE "guides_blocks_side_by_side_bullets" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_side_by_side" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_cta" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_metrics_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "guides_blocks_metrics_items" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "guides_blocks_metrics" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_results_stats_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "guides_blocks_results_stats_items" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "guides_blocks_results_stats" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_stats_cards_items" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "guides_blocks_stats_cards_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "guides_blocks_stats_cards_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "guides_blocks_stats_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_capability_strip_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "guides_blocks_live_in_days_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "guides_blocks_faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "guides_blocks_faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "guides_blocks_faq" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_news_insights_cards_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "guides_blocks_news_insights_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_news_insights_cards" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "guides_blocks_news_insights" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_content_feed_cards_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "guides_blocks_content_feed_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_content_feed_cards" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "guides_blocks_content_feed" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_pricing_cards_cards_features" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "guides_blocks_pricing_details_sections_headers" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "guides_blocks_pain_points_comparison" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_pricing_policy_callouts" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "guides_blocks_industry_expertise_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_industry_expertise" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides_blocks_tabs_showcase_tabs_steps" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "guides_blocks_tabs_showcase_tabs" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "guides_blocks_anchor_nav_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "guides_blocks_use_case_flow_columns_items" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "guides_article_meta_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "guides" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "guides" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "guides" ALTER COLUMN "path" SET NOT NULL;
  ALTER TABLE "tips_tip_card_icons" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "tips_blocks_hero" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_hero_extended" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_rich_text" ALTER COLUMN "html" SET NOT NULL;
  ALTER TABLE "tips_blocks_side_by_side_bullets" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_side_by_side" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_cta" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_metrics_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "tips_blocks_metrics_items" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "tips_blocks_metrics" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_results_stats_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "tips_blocks_results_stats_items" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "tips_blocks_results_stats" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_stats_cards_items" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "tips_blocks_stats_cards_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "tips_blocks_stats_cards_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "tips_blocks_stats_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_capability_strip_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "tips_blocks_live_in_days_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "tips_blocks_faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "tips_blocks_faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "tips_blocks_faq" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_news_insights_cards_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "tips_blocks_news_insights_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_news_insights_cards" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "tips_blocks_news_insights" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_content_feed_cards_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "tips_blocks_content_feed_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_content_feed_cards" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "tips_blocks_content_feed" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_pricing_cards_cards_features" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "tips_blocks_pricing_details_sections_headers" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "tips_blocks_pain_points_comparison" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_pricing_policy_callouts" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "tips_blocks_industry_expertise_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_industry_expertise" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips_blocks_tabs_showcase_tabs_steps" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "tips_blocks_tabs_showcase_tabs" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "tips_blocks_anchor_nav_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "tips_blocks_use_case_flow_columns_items" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "tips" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "tips" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "tips" ALTER COLUMN "path" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_hero" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_hero_extended" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_rich_text" ALTER COLUMN "html" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_side_by_side_bullets" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_side_by_side" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_cta" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_metrics_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_metrics_items" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_metrics" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_results_stats_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_results_stats_items" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_results_stats" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_stats_cards_items" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_stats_cards_items" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_stats_cards_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_stats_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_capability_strip_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_live_in_days_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_faq" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_news_insights_cards_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_news_insights_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_news_insights_cards" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_news_insights" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_content_feed_cards_tags" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_content_feed_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_content_feed_cards" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_content_feed" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_pricing_cards_cards_features" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_pricing_details_sections_headers" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_pain_points_comparison" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_pricing_policy_callouts" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_industry_expertise_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_industry_expertise" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_tabs_showcase_tabs_steps" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_tabs_showcase_tabs" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_anchor_nav_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "use_cases_blocks_use_case_flow_columns_items" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "use_cases" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "use_cases" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "use_cases" ALTER COLUMN "path" SET NOT NULL;
  ALTER TABLE "forms_fields" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "forms_fields" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "forms_fields" ALTER COLUMN "type" SET NOT NULL;
  ALTER TABLE "forms" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "forms" ALTER COLUMN "intent" SET NOT NULL;
  ALTER TABLE "faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "testimonials" ALTER COLUMN "quote" SET NOT NULL;
  ALTER TABLE "testimonials" ALTER COLUMN "author_name" SET NOT NULL;
  ALTER TABLE "pages" DROP COLUMN "_status";
  ALTER TABLE "posts" DROP COLUMN "_status";
  ALTER TABLE "news" DROP COLUMN "_status";
  ALTER TABLE "guides" DROP COLUMN "_status";
  ALTER TABLE "tips" DROP COLUMN "_status";
  ALTER TABLE "use_cases" DROP COLUMN "_status";
  ALTER TABLE "forms" DROP COLUMN "_status";
  ALTER TABLE "faq_items" DROP COLUMN "_status";
  ALTER TABLE "testimonials" DROP COLUMN "_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_background";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_primary_action_target";
  DROP TYPE "public"."enum__pages_v_blocks_hero_secondary_action_target";
  DROP TYPE "public"."enum__pages_v_blocks_hero_media_size";
  DROP TYPE "public"."enum__pages_v_blocks_hero_extended_background";
  DROP TYPE "public"."enum__pages_v_blocks_hero_extended_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_extended_media_size";
  DROP TYPE "public"."enum__pages_v_blocks_hero_extended_primary_action_target";
  DROP TYPE "public"."enum__pages_v_blocks_hero_extended_secondary_action_target";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__pages_v_blocks_side_by_side_media_side";
  DROP TYPE "public"."enum__pages_v_blocks_side_by_side_image_side";
  DROP TYPE "public"."enum__pages_v_blocks_side_by_side_background";
  DROP TYPE "public"."enum__pages_v_blocks_side_by_side_primary_action_target";
  DROP TYPE "public"."enum__pages_v_blocks_side_by_side_secondary_action_target";
  DROP TYPE "public"."enum__pages_v_blocks_story_background";
  DROP TYPE "public"."enum__pages_v_blocks_media_showcase_background";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_agent_capabilities_items_link_target";
  DROP TYPE "public"."enum__pages_v_blocks_agent_capabilities_background";
  DROP TYPE "public"."enum__pages_v_blocks_agent_capabilities_content_side";
  DROP TYPE "public"."enum__pages_v_blocks_agent_solutions_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_agent_solutions_background";
  DROP TYPE "public"."enum__pages_v_blocks_contact_us_background";
  DROP TYPE "public"."enum__pages_v_blocks_concierge_flow_background";
  DROP TYPE "public"."enum__pages_v_blocks_concierge_flow_button_target";
  DROP TYPE "public"."enum__pages_v_blocks_enterprise_upgrade_background";
  DROP TYPE "public"."enum__pages_v_blocks_channels_grid_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_channels_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_feature_stack_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_feature_stack_background";
  DROP TYPE "public"."enum__pages_v_blocks_coverage_grid_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_coverage_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_feature_rows_background";
  DROP TYPE "public"."enum__pages_v_blocks_feature_rows_variant";
  DROP TYPE "public"."enum__pages_v_blocks_capability_trio_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_capability_trio_background";
  DROP TYPE "public"."enum__pages_v_blocks_capability_tools_background";
  DROP TYPE "public"."enum__pages_v_blocks_use_cases_grid_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_use_cases_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_security_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_security_background";
  DROP TYPE "public"."enum__pages_v_blocks_functional_capabilities_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_functional_capabilities_cards_width";
  DROP TYPE "public"."enum__pages_v_blocks_functional_capabilities_background";
  DROP TYPE "public"."enum__pages_v_blocks_functional_capabilities_preset";
  DROP TYPE "public"."enum__pages_v_blocks_how_it_works_background";
  DROP TYPE "public"."enum__pages_v_blocks_how_it_works_button_target";
  DROP TYPE "public"."enum__pages_v_blocks_cta_background";
  DROP TYPE "public"."enum__pages_v_blocks_cta_primary_action_target";
  DROP TYPE "public"."enum__pages_v_blocks_cta_secondary_action_target";
  DROP TYPE "public"."enum__pages_v_blocks_metrics_background";
  DROP TYPE "public"."enum__pages_v_blocks_results_stats_items_link_target";
  DROP TYPE "public"."enum__pages_v_blocks_results_stats_background";
  DROP TYPE "public"."enum__pages_v_blocks_stats_cards_background";
  DROP TYPE "public"."enum__pages_v_blocks_capability_strip_background";
  DROP TYPE "public"."enum__pages_v_blocks_live_in_days_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_live_in_days_background";
  DROP TYPE "public"."enum__pages_v_blocks_faq_background";
  DROP TYPE "public"."enum__pages_v_blocks_news_insights_collections";
  DROP TYPE "public"."enum__pages_v_blocks_news_insights_background";
  DROP TYPE "public"."enum__pages_v_blocks_news_insights_mode";
  DROP TYPE "public"."enum__pages_v_blocks_content_feed_collections";
  DROP TYPE "public"."enum__pages_v_blocks_content_feed_background";
  DROP TYPE "public"."enum__pages_v_blocks_content_feed_mode";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_cards_cards_accent";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_cards_cards_button_target";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_cards_background";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_details_sections_background";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_details_sections_variant";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_details_background";
  DROP TYPE "public"."enum__pages_v_blocks_difference_background";
  DROP TYPE "public"."enum__pages_v_blocks_difference_action_target";
  DROP TYPE "public"."enum__pages_v_blocks_pain_points_comparison_background";
  DROP TYPE "public"."enum__pages_v_blocks_pain_points_comparison_action_target";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_policy_callouts_icon";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_policy_background";
  DROP TYPE "public"."enum__pages_v_blocks_industry_expertise_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_industry_expertise_background";
  DROP TYPE "public"."enum__pages_v_blocks_industry_expertise_visual_type";
  DROP TYPE "public"."enum__pages_v_blocks_industry_expertise_button_target";
  DROP TYPE "public"."enum__pages_v_blocks_logo_strip_background";
  DROP TYPE "public"."enum__pages_v_blocks_integrations_banner_background";
  DROP TYPE "public"."enum__pages_v_blocks_logo_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_showcase_background";
  DROP TYPE "public"."enum__pages_v_blocks_anchor_nav_background";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_background";
  DROP TYPE "public"."enum__pages_v_blocks_comparison_grid_cards_action_target";
  DROP TYPE "public"."enum__pages_v_blocks_comparison_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_use_case_flow_background";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_version_template";
  DROP TYPE "public"."enum__posts_v_blocks_hero_background";
  DROP TYPE "public"."enum__posts_v_blocks_hero_variant";
  DROP TYPE "public"."enum__posts_v_blocks_hero_primary_action_target";
  DROP TYPE "public"."enum__posts_v_blocks_hero_secondary_action_target";
  DROP TYPE "public"."enum__posts_v_blocks_hero_media_size";
  DROP TYPE "public"."enum__posts_v_blocks_hero_extended_background";
  DROP TYPE "public"."enum__posts_v_blocks_hero_extended_variant";
  DROP TYPE "public"."enum__posts_v_blocks_hero_extended_media_size";
  DROP TYPE "public"."enum__posts_v_blocks_hero_extended_primary_action_target";
  DROP TYPE "public"."enum__posts_v_blocks_hero_extended_secondary_action_target";
  DROP TYPE "public"."enum__posts_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__posts_v_blocks_side_by_side_media_side";
  DROP TYPE "public"."enum__posts_v_blocks_side_by_side_image_side";
  DROP TYPE "public"."enum__posts_v_blocks_side_by_side_background";
  DROP TYPE "public"."enum__posts_v_blocks_side_by_side_primary_action_target";
  DROP TYPE "public"."enum__posts_v_blocks_side_by_side_secondary_action_target";
  DROP TYPE "public"."enum__posts_v_blocks_story_background";
  DROP TYPE "public"."enum__posts_v_blocks_media_showcase_background";
  DROP TYPE "public"."enum__posts_v_blocks_feature_grid_background";
  DROP TYPE "public"."enum__posts_v_blocks_agent_capabilities_items_link_target";
  DROP TYPE "public"."enum__posts_v_blocks_agent_capabilities_background";
  DROP TYPE "public"."enum__posts_v_blocks_agent_capabilities_content_side";
  DROP TYPE "public"."enum__posts_v_blocks_agent_solutions_items_icon";
  DROP TYPE "public"."enum__posts_v_blocks_agent_solutions_background";
  DROP TYPE "public"."enum__posts_v_blocks_contact_us_background";
  DROP TYPE "public"."enum__posts_v_blocks_concierge_flow_background";
  DROP TYPE "public"."enum__posts_v_blocks_concierge_flow_button_target";
  DROP TYPE "public"."enum__posts_v_blocks_enterprise_upgrade_background";
  DROP TYPE "public"."enum__posts_v_blocks_channels_grid_cards_icon";
  DROP TYPE "public"."enum__posts_v_blocks_channels_grid_background";
  DROP TYPE "public"."enum__posts_v_blocks_feature_stack_cards_icon";
  DROP TYPE "public"."enum__posts_v_blocks_feature_stack_background";
  DROP TYPE "public"."enum__posts_v_blocks_coverage_grid_cards_icon";
  DROP TYPE "public"."enum__posts_v_blocks_coverage_grid_background";
  DROP TYPE "public"."enum__posts_v_blocks_feature_rows_background";
  DROP TYPE "public"."enum__posts_v_blocks_feature_rows_variant";
  DROP TYPE "public"."enum__posts_v_blocks_capability_trio_cards_icon";
  DROP TYPE "public"."enum__posts_v_blocks_capability_trio_background";
  DROP TYPE "public"."enum__posts_v_blocks_capability_tools_background";
  DROP TYPE "public"."enum__posts_v_blocks_use_cases_grid_cards_icon";
  DROP TYPE "public"."enum__posts_v_blocks_use_cases_grid_background";
  DROP TYPE "public"."enum__posts_v_blocks_security_cards_icon";
  DROP TYPE "public"."enum__posts_v_blocks_security_background";
  DROP TYPE "public"."enum__posts_v_blocks_functional_capabilities_cards_icon";
  DROP TYPE "public"."enum__posts_v_blocks_functional_capabilities_cards_width";
  DROP TYPE "public"."enum__posts_v_blocks_functional_capabilities_background";
  DROP TYPE "public"."enum__posts_v_blocks_functional_capabilities_preset";
  DROP TYPE "public"."enum__posts_v_blocks_how_it_works_background";
  DROP TYPE "public"."enum__posts_v_blocks_how_it_works_button_target";
  DROP TYPE "public"."enum__posts_v_blocks_cta_background";
  DROP TYPE "public"."enum__posts_v_blocks_cta_primary_action_target";
  DROP TYPE "public"."enum__posts_v_blocks_cta_secondary_action_target";
  DROP TYPE "public"."enum__posts_v_blocks_metrics_background";
  DROP TYPE "public"."enum__posts_v_blocks_results_stats_items_link_target";
  DROP TYPE "public"."enum__posts_v_blocks_results_stats_background";
  DROP TYPE "public"."enum__posts_v_blocks_stats_cards_background";
  DROP TYPE "public"."enum__posts_v_blocks_capability_strip_background";
  DROP TYPE "public"."enum__posts_v_blocks_live_in_days_items_icon";
  DROP TYPE "public"."enum__posts_v_blocks_live_in_days_background";
  DROP TYPE "public"."enum__posts_v_blocks_faq_background";
  DROP TYPE "public"."enum__posts_v_blocks_news_insights_collections";
  DROP TYPE "public"."enum__posts_v_blocks_news_insights_background";
  DROP TYPE "public"."enum__posts_v_blocks_news_insights_mode";
  DROP TYPE "public"."enum__posts_v_blocks_content_feed_collections";
  DROP TYPE "public"."enum__posts_v_blocks_content_feed_background";
  DROP TYPE "public"."enum__posts_v_blocks_content_feed_mode";
  DROP TYPE "public"."enum__posts_v_blocks_pricing_cards_cards_accent";
  DROP TYPE "public"."enum__posts_v_blocks_pricing_cards_cards_button_target";
  DROP TYPE "public"."enum__posts_v_blocks_pricing_cards_background";
  DROP TYPE "public"."enum__posts_v_blocks_pricing_details_sections_background";
  DROP TYPE "public"."enum__posts_v_blocks_pricing_details_sections_variant";
  DROP TYPE "public"."enum__posts_v_blocks_pricing_details_background";
  DROP TYPE "public"."enum__posts_v_blocks_difference_background";
  DROP TYPE "public"."enum__posts_v_blocks_difference_action_target";
  DROP TYPE "public"."enum__posts_v_blocks_pain_points_comparison_background";
  DROP TYPE "public"."enum__posts_v_blocks_pain_points_comparison_action_target";
  DROP TYPE "public"."enum__posts_v_blocks_pricing_policy_callouts_icon";
  DROP TYPE "public"."enum__posts_v_blocks_pricing_policy_background";
  DROP TYPE "public"."enum__posts_v_blocks_industry_expertise_items_icon";
  DROP TYPE "public"."enum__posts_v_blocks_industry_expertise_background";
  DROP TYPE "public"."enum__posts_v_blocks_industry_expertise_visual_type";
  DROP TYPE "public"."enum__posts_v_blocks_industry_expertise_button_target";
  DROP TYPE "public"."enum__posts_v_blocks_logo_strip_background";
  DROP TYPE "public"."enum__posts_v_blocks_integrations_banner_background";
  DROP TYPE "public"."enum__posts_v_blocks_logo_grid_background";
  DROP TYPE "public"."enum__posts_v_blocks_tabs_showcase_background";
  DROP TYPE "public"."enum__posts_v_blocks_anchor_nav_background";
  DROP TYPE "public"."enum__posts_v_blocks_testimonials_background";
  DROP TYPE "public"."enum__posts_v_blocks_comparison_grid_cards_action_target";
  DROP TYPE "public"."enum__posts_v_blocks_comparison_grid_background";
  DROP TYPE "public"."enum__posts_v_blocks_use_case_flow_background";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_version_template";
  DROP TYPE "public"."enum__news_v_blocks_hero_background";
  DROP TYPE "public"."enum__news_v_blocks_hero_variant";
  DROP TYPE "public"."enum__news_v_blocks_hero_primary_action_target";
  DROP TYPE "public"."enum__news_v_blocks_hero_secondary_action_target";
  DROP TYPE "public"."enum__news_v_blocks_hero_media_size";
  DROP TYPE "public"."enum__news_v_blocks_hero_extended_background";
  DROP TYPE "public"."enum__news_v_blocks_hero_extended_variant";
  DROP TYPE "public"."enum__news_v_blocks_hero_extended_media_size";
  DROP TYPE "public"."enum__news_v_blocks_hero_extended_primary_action_target";
  DROP TYPE "public"."enum__news_v_blocks_hero_extended_secondary_action_target";
  DROP TYPE "public"."enum__news_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__news_v_blocks_side_by_side_media_side";
  DROP TYPE "public"."enum__news_v_blocks_side_by_side_image_side";
  DROP TYPE "public"."enum__news_v_blocks_side_by_side_background";
  DROP TYPE "public"."enum__news_v_blocks_side_by_side_primary_action_target";
  DROP TYPE "public"."enum__news_v_blocks_side_by_side_secondary_action_target";
  DROP TYPE "public"."enum__news_v_blocks_story_background";
  DROP TYPE "public"."enum__news_v_blocks_media_showcase_background";
  DROP TYPE "public"."enum__news_v_blocks_feature_grid_background";
  DROP TYPE "public"."enum__news_v_blocks_agent_capabilities_items_link_target";
  DROP TYPE "public"."enum__news_v_blocks_agent_capabilities_background";
  DROP TYPE "public"."enum__news_v_blocks_agent_capabilities_content_side";
  DROP TYPE "public"."enum__news_v_blocks_agent_solutions_items_icon";
  DROP TYPE "public"."enum__news_v_blocks_agent_solutions_background";
  DROP TYPE "public"."enum__news_v_blocks_contact_us_background";
  DROP TYPE "public"."enum__news_v_blocks_concierge_flow_background";
  DROP TYPE "public"."enum__news_v_blocks_concierge_flow_button_target";
  DROP TYPE "public"."enum__news_v_blocks_enterprise_upgrade_background";
  DROP TYPE "public"."enum__news_v_blocks_channels_grid_cards_icon";
  DROP TYPE "public"."enum__news_v_blocks_channels_grid_background";
  DROP TYPE "public"."enum__news_v_blocks_feature_stack_cards_icon";
  DROP TYPE "public"."enum__news_v_blocks_feature_stack_background";
  DROP TYPE "public"."enum__news_v_blocks_coverage_grid_cards_icon";
  DROP TYPE "public"."enum__news_v_blocks_coverage_grid_background";
  DROP TYPE "public"."enum__news_v_blocks_feature_rows_background";
  DROP TYPE "public"."enum__news_v_blocks_feature_rows_variant";
  DROP TYPE "public"."enum__news_v_blocks_capability_trio_cards_icon";
  DROP TYPE "public"."enum__news_v_blocks_capability_trio_background";
  DROP TYPE "public"."enum__news_v_blocks_capability_tools_background";
  DROP TYPE "public"."enum__news_v_blocks_use_cases_grid_cards_icon";
  DROP TYPE "public"."enum__news_v_blocks_use_cases_grid_background";
  DROP TYPE "public"."enum__news_v_blocks_security_cards_icon";
  DROP TYPE "public"."enum__news_v_blocks_security_background";
  DROP TYPE "public"."enum__news_v_blocks_functional_capabilities_cards_icon";
  DROP TYPE "public"."enum__news_v_blocks_functional_capabilities_cards_width";
  DROP TYPE "public"."enum__news_v_blocks_functional_capabilities_background";
  DROP TYPE "public"."enum__news_v_blocks_functional_capabilities_preset";
  DROP TYPE "public"."enum__news_v_blocks_how_it_works_background";
  DROP TYPE "public"."enum__news_v_blocks_how_it_works_button_target";
  DROP TYPE "public"."enum__news_v_blocks_cta_background";
  DROP TYPE "public"."enum__news_v_blocks_cta_primary_action_target";
  DROP TYPE "public"."enum__news_v_blocks_cta_secondary_action_target";
  DROP TYPE "public"."enum__news_v_blocks_metrics_background";
  DROP TYPE "public"."enum__news_v_blocks_results_stats_items_link_target";
  DROP TYPE "public"."enum__news_v_blocks_results_stats_background";
  DROP TYPE "public"."enum__news_v_blocks_stats_cards_background";
  DROP TYPE "public"."enum__news_v_blocks_capability_strip_background";
  DROP TYPE "public"."enum__news_v_blocks_live_in_days_items_icon";
  DROP TYPE "public"."enum__news_v_blocks_live_in_days_background";
  DROP TYPE "public"."enum__news_v_blocks_faq_background";
  DROP TYPE "public"."enum__news_v_blocks_news_insights_collections";
  DROP TYPE "public"."enum__news_v_blocks_news_insights_background";
  DROP TYPE "public"."enum__news_v_blocks_news_insights_mode";
  DROP TYPE "public"."enum__news_v_blocks_content_feed_collections";
  DROP TYPE "public"."enum__news_v_blocks_content_feed_background";
  DROP TYPE "public"."enum__news_v_blocks_content_feed_mode";
  DROP TYPE "public"."enum__news_v_blocks_pricing_cards_cards_accent";
  DROP TYPE "public"."enum__news_v_blocks_pricing_cards_cards_button_target";
  DROP TYPE "public"."enum__news_v_blocks_pricing_cards_background";
  DROP TYPE "public"."enum__news_v_blocks_pricing_details_sections_background";
  DROP TYPE "public"."enum__news_v_blocks_pricing_details_sections_variant";
  DROP TYPE "public"."enum__news_v_blocks_pricing_details_background";
  DROP TYPE "public"."enum__news_v_blocks_difference_background";
  DROP TYPE "public"."enum__news_v_blocks_difference_action_target";
  DROP TYPE "public"."enum__news_v_blocks_pain_points_comparison_background";
  DROP TYPE "public"."enum__news_v_blocks_pain_points_comparison_action_target";
  DROP TYPE "public"."enum__news_v_blocks_pricing_policy_callouts_icon";
  DROP TYPE "public"."enum__news_v_blocks_pricing_policy_background";
  DROP TYPE "public"."enum__news_v_blocks_industry_expertise_items_icon";
  DROP TYPE "public"."enum__news_v_blocks_industry_expertise_background";
  DROP TYPE "public"."enum__news_v_blocks_industry_expertise_visual_type";
  DROP TYPE "public"."enum__news_v_blocks_industry_expertise_button_target";
  DROP TYPE "public"."enum__news_v_blocks_logo_strip_background";
  DROP TYPE "public"."enum__news_v_blocks_integrations_banner_background";
  DROP TYPE "public"."enum__news_v_blocks_logo_grid_background";
  DROP TYPE "public"."enum__news_v_blocks_tabs_showcase_background";
  DROP TYPE "public"."enum__news_v_blocks_anchor_nav_background";
  DROP TYPE "public"."enum__news_v_blocks_testimonials_background";
  DROP TYPE "public"."enum__news_v_blocks_comparison_grid_cards_action_target";
  DROP TYPE "public"."enum__news_v_blocks_comparison_grid_background";
  DROP TYPE "public"."enum__news_v_blocks_use_case_flow_background";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_version_template";
  DROP TYPE "public"."enum__guides_v_blocks_hero_background";
  DROP TYPE "public"."enum__guides_v_blocks_hero_variant";
  DROP TYPE "public"."enum__guides_v_blocks_hero_primary_action_target";
  DROP TYPE "public"."enum__guides_v_blocks_hero_secondary_action_target";
  DROP TYPE "public"."enum__guides_v_blocks_hero_media_size";
  DROP TYPE "public"."enum__guides_v_blocks_hero_extended_background";
  DROP TYPE "public"."enum__guides_v_blocks_hero_extended_variant";
  DROP TYPE "public"."enum__guides_v_blocks_hero_extended_media_size";
  DROP TYPE "public"."enum__guides_v_blocks_hero_extended_primary_action_target";
  DROP TYPE "public"."enum__guides_v_blocks_hero_extended_secondary_action_target";
  DROP TYPE "public"."enum__guides_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__guides_v_blocks_side_by_side_media_side";
  DROP TYPE "public"."enum__guides_v_blocks_side_by_side_image_side";
  DROP TYPE "public"."enum__guides_v_blocks_side_by_side_background";
  DROP TYPE "public"."enum__guides_v_blocks_side_by_side_primary_action_target";
  DROP TYPE "public"."enum__guides_v_blocks_side_by_side_secondary_action_target";
  DROP TYPE "public"."enum__guides_v_blocks_story_background";
  DROP TYPE "public"."enum__guides_v_blocks_media_showcase_background";
  DROP TYPE "public"."enum__guides_v_blocks_feature_grid_background";
  DROP TYPE "public"."enum__guides_v_blocks_agent_capabilities_items_link_target";
  DROP TYPE "public"."enum__guides_v_blocks_agent_capabilities_background";
  DROP TYPE "public"."enum__guides_v_blocks_agent_capabilities_content_side";
  DROP TYPE "public"."enum__guides_v_blocks_agent_solutions_items_icon";
  DROP TYPE "public"."enum__guides_v_blocks_agent_solutions_background";
  DROP TYPE "public"."enum__guides_v_blocks_contact_us_background";
  DROP TYPE "public"."enum__guides_v_blocks_concierge_flow_background";
  DROP TYPE "public"."enum__guides_v_blocks_concierge_flow_button_target";
  DROP TYPE "public"."enum__guides_v_blocks_enterprise_upgrade_background";
  DROP TYPE "public"."enum__guides_v_blocks_channels_grid_cards_icon";
  DROP TYPE "public"."enum__guides_v_blocks_channels_grid_background";
  DROP TYPE "public"."enum__guides_v_blocks_feature_stack_cards_icon";
  DROP TYPE "public"."enum__guides_v_blocks_feature_stack_background";
  DROP TYPE "public"."enum__guides_v_blocks_coverage_grid_cards_icon";
  DROP TYPE "public"."enum__guides_v_blocks_coverage_grid_background";
  DROP TYPE "public"."enum__guides_v_blocks_feature_rows_background";
  DROP TYPE "public"."enum__guides_v_blocks_feature_rows_variant";
  DROP TYPE "public"."enum__guides_v_blocks_capability_trio_cards_icon";
  DROP TYPE "public"."enum__guides_v_blocks_capability_trio_background";
  DROP TYPE "public"."enum__guides_v_blocks_capability_tools_background";
  DROP TYPE "public"."enum__guides_v_blocks_use_cases_grid_cards_icon";
  DROP TYPE "public"."enum__guides_v_blocks_use_cases_grid_background";
  DROP TYPE "public"."enum__guides_v_blocks_security_cards_icon";
  DROP TYPE "public"."enum__guides_v_blocks_security_background";
  DROP TYPE "public"."enum__guides_v_blocks_functional_capabilities_cards_icon";
  DROP TYPE "public"."enum__guides_v_blocks_functional_capabilities_cards_width";
  DROP TYPE "public"."enum__guides_v_blocks_functional_capabilities_background";
  DROP TYPE "public"."enum__guides_v_blocks_functional_capabilities_preset";
  DROP TYPE "public"."enum__guides_v_blocks_how_it_works_background";
  DROP TYPE "public"."enum__guides_v_blocks_how_it_works_button_target";
  DROP TYPE "public"."enum__guides_v_blocks_cta_background";
  DROP TYPE "public"."enum__guides_v_blocks_cta_primary_action_target";
  DROP TYPE "public"."enum__guides_v_blocks_cta_secondary_action_target";
  DROP TYPE "public"."enum__guides_v_blocks_metrics_background";
  DROP TYPE "public"."enum__guides_v_blocks_results_stats_items_link_target";
  DROP TYPE "public"."enum__guides_v_blocks_results_stats_background";
  DROP TYPE "public"."enum__guides_v_blocks_stats_cards_background";
  DROP TYPE "public"."enum__guides_v_blocks_capability_strip_background";
  DROP TYPE "public"."enum__guides_v_blocks_live_in_days_items_icon";
  DROP TYPE "public"."enum__guides_v_blocks_live_in_days_background";
  DROP TYPE "public"."enum__guides_v_blocks_faq_background";
  DROP TYPE "public"."enum__guides_v_blocks_news_insights_collections";
  DROP TYPE "public"."enum__guides_v_blocks_news_insights_background";
  DROP TYPE "public"."enum__guides_v_blocks_news_insights_mode";
  DROP TYPE "public"."enum__guides_v_blocks_content_feed_collections";
  DROP TYPE "public"."enum__guides_v_blocks_content_feed_background";
  DROP TYPE "public"."enum__guides_v_blocks_content_feed_mode";
  DROP TYPE "public"."enum__guides_v_blocks_pricing_cards_cards_accent";
  DROP TYPE "public"."enum__guides_v_blocks_pricing_cards_cards_button_target";
  DROP TYPE "public"."enum__guides_v_blocks_pricing_cards_background";
  DROP TYPE "public"."enum__guides_v_blocks_pricing_details_sections_background";
  DROP TYPE "public"."enum__guides_v_blocks_pricing_details_sections_variant";
  DROP TYPE "public"."enum__guides_v_blocks_pricing_details_background";
  DROP TYPE "public"."enum__guides_v_blocks_difference_background";
  DROP TYPE "public"."enum__guides_v_blocks_difference_action_target";
  DROP TYPE "public"."enum__guides_v_blocks_pain_points_comparison_background";
  DROP TYPE "public"."enum__guides_v_blocks_pain_points_comparison_action_target";
  DROP TYPE "public"."enum__guides_v_blocks_pricing_policy_callouts_icon";
  DROP TYPE "public"."enum__guides_v_blocks_pricing_policy_background";
  DROP TYPE "public"."enum__guides_v_blocks_industry_expertise_items_icon";
  DROP TYPE "public"."enum__guides_v_blocks_industry_expertise_background";
  DROP TYPE "public"."enum__guides_v_blocks_industry_expertise_visual_type";
  DROP TYPE "public"."enum__guides_v_blocks_industry_expertise_button_target";
  DROP TYPE "public"."enum__guides_v_blocks_logo_strip_background";
  DROP TYPE "public"."enum__guides_v_blocks_integrations_banner_background";
  DROP TYPE "public"."enum__guides_v_blocks_logo_grid_background";
  DROP TYPE "public"."enum__guides_v_blocks_tabs_showcase_background";
  DROP TYPE "public"."enum__guides_v_blocks_anchor_nav_background";
  DROP TYPE "public"."enum__guides_v_blocks_testimonials_background";
  DROP TYPE "public"."enum__guides_v_blocks_comparison_grid_cards_action_target";
  DROP TYPE "public"."enum__guides_v_blocks_comparison_grid_background";
  DROP TYPE "public"."enum__guides_v_blocks_use_case_flow_background";
  DROP TYPE "public"."enum__guides_v_version_status";
  DROP TYPE "public"."enum__guides_v_version_template";
  DROP TYPE "public"."enum__tips_v_blocks_hero_background";
  DROP TYPE "public"."enum__tips_v_blocks_hero_variant";
  DROP TYPE "public"."enum__tips_v_blocks_hero_primary_action_target";
  DROP TYPE "public"."enum__tips_v_blocks_hero_secondary_action_target";
  DROP TYPE "public"."enum__tips_v_blocks_hero_media_size";
  DROP TYPE "public"."enum__tips_v_blocks_hero_extended_background";
  DROP TYPE "public"."enum__tips_v_blocks_hero_extended_variant";
  DROP TYPE "public"."enum__tips_v_blocks_hero_extended_media_size";
  DROP TYPE "public"."enum__tips_v_blocks_hero_extended_primary_action_target";
  DROP TYPE "public"."enum__tips_v_blocks_hero_extended_secondary_action_target";
  DROP TYPE "public"."enum__tips_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__tips_v_blocks_side_by_side_media_side";
  DROP TYPE "public"."enum__tips_v_blocks_side_by_side_image_side";
  DROP TYPE "public"."enum__tips_v_blocks_side_by_side_background";
  DROP TYPE "public"."enum__tips_v_blocks_side_by_side_primary_action_target";
  DROP TYPE "public"."enum__tips_v_blocks_side_by_side_secondary_action_target";
  DROP TYPE "public"."enum__tips_v_blocks_story_background";
  DROP TYPE "public"."enum__tips_v_blocks_media_showcase_background";
  DROP TYPE "public"."enum__tips_v_blocks_feature_grid_background";
  DROP TYPE "public"."enum__tips_v_blocks_agent_capabilities_items_link_target";
  DROP TYPE "public"."enum__tips_v_blocks_agent_capabilities_background";
  DROP TYPE "public"."enum__tips_v_blocks_agent_capabilities_content_side";
  DROP TYPE "public"."enum__tips_v_blocks_agent_solutions_items_icon";
  DROP TYPE "public"."enum__tips_v_blocks_agent_solutions_background";
  DROP TYPE "public"."enum__tips_v_blocks_contact_us_background";
  DROP TYPE "public"."enum__tips_v_blocks_concierge_flow_background";
  DROP TYPE "public"."enum__tips_v_blocks_concierge_flow_button_target";
  DROP TYPE "public"."enum__tips_v_blocks_enterprise_upgrade_background";
  DROP TYPE "public"."enum__tips_v_blocks_channels_grid_cards_icon";
  DROP TYPE "public"."enum__tips_v_blocks_channels_grid_background";
  DROP TYPE "public"."enum__tips_v_blocks_feature_stack_cards_icon";
  DROP TYPE "public"."enum__tips_v_blocks_feature_stack_background";
  DROP TYPE "public"."enum__tips_v_blocks_coverage_grid_cards_icon";
  DROP TYPE "public"."enum__tips_v_blocks_coverage_grid_background";
  DROP TYPE "public"."enum__tips_v_blocks_feature_rows_background";
  DROP TYPE "public"."enum__tips_v_blocks_feature_rows_variant";
  DROP TYPE "public"."enum__tips_v_blocks_capability_trio_cards_icon";
  DROP TYPE "public"."enum__tips_v_blocks_capability_trio_background";
  DROP TYPE "public"."enum__tips_v_blocks_capability_tools_background";
  DROP TYPE "public"."enum__tips_v_blocks_use_cases_grid_cards_icon";
  DROP TYPE "public"."enum__tips_v_blocks_use_cases_grid_background";
  DROP TYPE "public"."enum__tips_v_blocks_security_cards_icon";
  DROP TYPE "public"."enum__tips_v_blocks_security_background";
  DROP TYPE "public"."enum__tips_v_blocks_functional_capabilities_cards_icon";
  DROP TYPE "public"."enum__tips_v_blocks_functional_capabilities_cards_width";
  DROP TYPE "public"."enum__tips_v_blocks_functional_capabilities_background";
  DROP TYPE "public"."enum__tips_v_blocks_functional_capabilities_preset";
  DROP TYPE "public"."enum__tips_v_blocks_how_it_works_background";
  DROP TYPE "public"."enum__tips_v_blocks_how_it_works_button_target";
  DROP TYPE "public"."enum__tips_v_blocks_cta_background";
  DROP TYPE "public"."enum__tips_v_blocks_cta_primary_action_target";
  DROP TYPE "public"."enum__tips_v_blocks_cta_secondary_action_target";
  DROP TYPE "public"."enum__tips_v_blocks_metrics_background";
  DROP TYPE "public"."enum__tips_v_blocks_results_stats_items_link_target";
  DROP TYPE "public"."enum__tips_v_blocks_results_stats_background";
  DROP TYPE "public"."enum__tips_v_blocks_stats_cards_background";
  DROP TYPE "public"."enum__tips_v_blocks_capability_strip_background";
  DROP TYPE "public"."enum__tips_v_blocks_live_in_days_items_icon";
  DROP TYPE "public"."enum__tips_v_blocks_live_in_days_background";
  DROP TYPE "public"."enum__tips_v_blocks_faq_background";
  DROP TYPE "public"."enum__tips_v_blocks_news_insights_collections";
  DROP TYPE "public"."enum__tips_v_blocks_news_insights_background";
  DROP TYPE "public"."enum__tips_v_blocks_news_insights_mode";
  DROP TYPE "public"."enum__tips_v_blocks_content_feed_collections";
  DROP TYPE "public"."enum__tips_v_blocks_content_feed_background";
  DROP TYPE "public"."enum__tips_v_blocks_content_feed_mode";
  DROP TYPE "public"."enum__tips_v_blocks_pricing_cards_cards_accent";
  DROP TYPE "public"."enum__tips_v_blocks_pricing_cards_cards_button_target";
  DROP TYPE "public"."enum__tips_v_blocks_pricing_cards_background";
  DROP TYPE "public"."enum__tips_v_blocks_pricing_details_sections_background";
  DROP TYPE "public"."enum__tips_v_blocks_pricing_details_sections_variant";
  DROP TYPE "public"."enum__tips_v_blocks_pricing_details_background";
  DROP TYPE "public"."enum__tips_v_blocks_difference_background";
  DROP TYPE "public"."enum__tips_v_blocks_difference_action_target";
  DROP TYPE "public"."enum__tips_v_blocks_pain_points_comparison_background";
  DROP TYPE "public"."enum__tips_v_blocks_pain_points_comparison_action_target";
  DROP TYPE "public"."enum__tips_v_blocks_pricing_policy_callouts_icon";
  DROP TYPE "public"."enum__tips_v_blocks_pricing_policy_background";
  DROP TYPE "public"."enum__tips_v_blocks_industry_expertise_items_icon";
  DROP TYPE "public"."enum__tips_v_blocks_industry_expertise_background";
  DROP TYPE "public"."enum__tips_v_blocks_industry_expertise_visual_type";
  DROP TYPE "public"."enum__tips_v_blocks_industry_expertise_button_target";
  DROP TYPE "public"."enum__tips_v_blocks_logo_strip_background";
  DROP TYPE "public"."enum__tips_v_blocks_integrations_banner_background";
  DROP TYPE "public"."enum__tips_v_blocks_logo_grid_background";
  DROP TYPE "public"."enum__tips_v_blocks_tabs_showcase_background";
  DROP TYPE "public"."enum__tips_v_blocks_anchor_nav_background";
  DROP TYPE "public"."enum__tips_v_blocks_testimonials_background";
  DROP TYPE "public"."enum__tips_v_blocks_comparison_grid_cards_action_target";
  DROP TYPE "public"."enum__tips_v_blocks_comparison_grid_background";
  DROP TYPE "public"."enum__tips_v_blocks_use_case_flow_background";
  DROP TYPE "public"."enum__tips_v_version_status";
  DROP TYPE "public"."enum__tips_v_version_template";
  DROP TYPE "public"."enum__use_cases_v_blocks_hero_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_hero_variant";
  DROP TYPE "public"."enum__use_cases_v_blocks_hero_primary_action_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_hero_secondary_action_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_hero_media_size";
  DROP TYPE "public"."enum__use_cases_v_blocks_hero_extended_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_hero_extended_variant";
  DROP TYPE "public"."enum__use_cases_v_blocks_hero_extended_media_size";
  DROP TYPE "public"."enum__use_cases_v_blocks_hero_extended_primary_action_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_hero_extended_secondary_action_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_rich_text_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_side_by_side_media_side";
  DROP TYPE "public"."enum__use_cases_v_blocks_side_by_side_image_side";
  DROP TYPE "public"."enum__use_cases_v_blocks_side_by_side_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_side_by_side_primary_action_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_side_by_side_secondary_action_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_story_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_media_showcase_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_feature_grid_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_agent_capabilities_items_link_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_agent_capabilities_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_agent_capabilities_content_side";
  DROP TYPE "public"."enum__use_cases_v_blocks_agent_solutions_items_icon";
  DROP TYPE "public"."enum__use_cases_v_blocks_agent_solutions_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_contact_us_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_concierge_flow_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_concierge_flow_button_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_enterprise_upgrade_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_channels_grid_cards_icon";
  DROP TYPE "public"."enum__use_cases_v_blocks_channels_grid_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_feature_stack_cards_icon";
  DROP TYPE "public"."enum__use_cases_v_blocks_feature_stack_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_coverage_grid_cards_icon";
  DROP TYPE "public"."enum__use_cases_v_blocks_coverage_grid_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_feature_rows_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_feature_rows_variant";
  DROP TYPE "public"."enum__use_cases_v_blocks_capability_trio_cards_icon";
  DROP TYPE "public"."enum__use_cases_v_blocks_capability_trio_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_capability_tools_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_use_cases_grid_cards_icon";
  DROP TYPE "public"."enum__use_cases_v_blocks_use_cases_grid_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_security_cards_icon";
  DROP TYPE "public"."enum__use_cases_v_blocks_security_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_functional_capabilities_cards_icon";
  DROP TYPE "public"."enum__use_cases_v_blocks_functional_capabilities_cards_width";
  DROP TYPE "public"."enum__use_cases_v_blocks_functional_capabilities_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_functional_capabilities_preset";
  DROP TYPE "public"."enum__use_cases_v_blocks_how_it_works_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_how_it_works_button_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_cta_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_cta_primary_action_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_cta_secondary_action_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_metrics_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_results_stats_items_link_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_results_stats_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_stats_cards_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_capability_strip_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_live_in_days_items_icon";
  DROP TYPE "public"."enum__use_cases_v_blocks_live_in_days_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_faq_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_news_insights_collections";
  DROP TYPE "public"."enum__use_cases_v_blocks_news_insights_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_news_insights_mode";
  DROP TYPE "public"."enum__use_cases_v_blocks_content_feed_collections";
  DROP TYPE "public"."enum__use_cases_v_blocks_content_feed_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_content_feed_mode";
  DROP TYPE "public"."enum__use_cases_v_blocks_pricing_cards_cards_accent";
  DROP TYPE "public"."enum__use_cases_v_blocks_pricing_cards_cards_button_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_pricing_cards_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_pricing_details_sections_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_pricing_details_sections_variant";
  DROP TYPE "public"."enum__use_cases_v_blocks_pricing_details_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_difference_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_difference_action_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_pain_points_comparison_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_pain_points_comparison_action_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_pricing_policy_callouts_icon";
  DROP TYPE "public"."enum__use_cases_v_blocks_pricing_policy_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_industry_expertise_items_icon";
  DROP TYPE "public"."enum__use_cases_v_blocks_industry_expertise_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_industry_expertise_visual_type";
  DROP TYPE "public"."enum__use_cases_v_blocks_industry_expertise_button_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_logo_strip_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_integrations_banner_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_logo_grid_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_tabs_showcase_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_anchor_nav_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_testimonials_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_comparison_grid_cards_action_target";
  DROP TYPE "public"."enum__use_cases_v_blocks_comparison_grid_background";
  DROP TYPE "public"."enum__use_cases_v_blocks_use_case_flow_background";
  DROP TYPE "public"."enum__use_cases_v_version_status";
  DROP TYPE "public"."enum__use_cases_v_version_template";
  DROP TYPE "public"."enum_forms_status";
  DROP TYPE "public"."enum__forms_v_version_fields_type";
  DROP TYPE "public"."enum__forms_v_version_intent";
  DROP TYPE "public"."enum__forms_v_version_status";
  DROP TYPE "public"."enum__faq_items_v_version_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";`)
}
