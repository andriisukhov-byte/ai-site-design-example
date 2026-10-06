import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum_pages_blocks_hero_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_hero_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_hero_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum_pages_blocks_hero_extended_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_hero_extended_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum_pages_blocks_hero_extended_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum_pages_blocks_hero_extended_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_hero_extended_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_side_by_side_media_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_side_by_side_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_side_by_side_background" AS ENUM('white', 'gray', 'transparent', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_side_by_side_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_side_by_side_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_story_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_media_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_agent_capabilities_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_agent_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_agent_capabilities_content_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_agent_solutions_items_icon" AS ENUM('headset', 'connections', 'goal', 'cog', 'tag', 'phone-call', 'messages-square', 'shopping-cart');
  CREATE TYPE "public"."enum_pages_blocks_agent_solutions_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_contact_us_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_concierge_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_concierge_flow_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_enterprise_upgrade_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_channels_grid_cards_icon" AS ENUM('sms', 'whatsapp', 'voice', 'chat', 'mail', 'monitor', 'network', 'clock', 'webhook');
  CREATE TYPE "public"."enum_pages_blocks_channels_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_feature_stack_cards_icon" AS ENUM('network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap');
  CREATE TYPE "public"."enum_pages_blocks_feature_stack_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_coverage_grid_cards_icon" AS ENUM('flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory');
  CREATE TYPE "public"."enum_pages_blocks_coverage_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_feature_rows_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_feature_rows_variant" AS ENUM('capabilities', 'builder');
  CREATE TYPE "public"."enum_pages_blocks_capability_trio_cards_icon" AS ENUM('messages-square', 'orbit', 'brain-circuit');
  CREATE TYPE "public"."enum_pages_blocks_capability_trio_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_capability_tools_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_use_cases_grid_cards_icon" AS ENUM('shopping-cart', 'building', 'cloud-cog', 'megaphone', 'heart-handshake', 'hammer', 'shield-check', 'scroll-text', 'briefcase', 'headset', 'graduation-cap', 'truck', 'calendar-check', 'clock', 'filter', 'refresh-ccw', 'list-checks', 'file-plus', 'messages-square');
  CREATE TYPE "public"."enum_pages_blocks_use_cases_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_security_cards_icon" AS ENUM('database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search');
  CREATE TYPE "public"."enum_pages_blocks_security_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_functional_capabilities_cards_icon" AS ENUM('award', 'bell', 'calendar-check-2', 'calendar-days', 'calendar-range', 'clipboard-check', 'clock', 'database', 'file-check-2', 'file-text', 'filter', 'handshake', 'inbox', 'message-square', 'phone-incoming', 'receipt', 'repeat-2', 'send', 'shield-check', 'sliders-horizontal', 'star', 'triangle-alert', 'audio-lines', 'messages-square', 'smartphone', 'users', 'mail', 'info');
  CREATE TYPE "public"."enum_pages_blocks_functional_capabilities_cards_width" AS ENUM('default', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_functional_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_functional_capabilities_preset" AS ENUM('sales', 'service', 'recruiting', 'channels');
  CREATE TYPE "public"."enum_pages_blocks_how_it_works_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_how_it_works_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_cta_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_cta_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_cta_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_metrics_background" AS ENUM('white', 'muted', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_results_stats_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_results_stats_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_stats_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_capability_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_live_in_days_items_icon" AS ENUM('code-xml', 'layout-grid', 'bot-message-square', 'user-round-check');
  CREATE TYPE "public"."enum_pages_blocks_live_in_days_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_faq_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_news_insights_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum_pages_blocks_news_insights_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_news_insights_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_content_feed_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum_pages_blocks_content_feed_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_content_feed_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_pricing_cards_cards_accent" AS ENUM('gradient', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_pricing_cards_cards_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_pricing_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_pricing_details_sections_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_pricing_details_sections_variant" AS ENUM('default', 'comparison');
  CREATE TYPE "public"."enum_pages_blocks_pricing_details_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_difference_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_difference_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_pain_points_comparison_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_pain_points_comparison_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_pricing_policy_callouts_icon" AS ENUM('wallet', 'infinity', 'headset', 'info');
  CREATE TYPE "public"."enum_pages_blocks_pricing_policy_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_industry_expertise_items_icon" AS ENUM('shopping_cart', 'headset', 'cloud_cog', 'hammer', 'heart_handshake', 'hotel', 'brain', 'layers', 'wand', 'globe', 'users', 'workflow');
  CREATE TYPE "public"."enum_pages_blocks_industry_expertise_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_industry_expertise_visual_type" AS ENUM('industry', 'platform', 'capabilities');
  CREATE TYPE "public"."enum_pages_blocks_industry_expertise_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_logo_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_integrations_banner_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_logo_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_tabs_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_anchor_nav_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_comparison_grid_cards_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_comparison_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_blocks_use_case_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_template" AS ENUM('standard', 'landing', 'document');
  CREATE TYPE "public"."enum_posts_blocks_hero_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_hero_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum_posts_blocks_hero_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_hero_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_hero_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum_posts_blocks_hero_extended_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_hero_extended_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum_posts_blocks_hero_extended_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum_posts_blocks_hero_extended_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_hero_extended_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_rich_text_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_side_by_side_media_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_posts_blocks_side_by_side_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_posts_blocks_side_by_side_background" AS ENUM('white', 'gray', 'transparent', 'muted', 'dark');
  CREATE TYPE "public"."enum_posts_blocks_side_by_side_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_side_by_side_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_story_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_media_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_feature_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_agent_capabilities_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_agent_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_agent_capabilities_content_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_posts_blocks_agent_solutions_items_icon" AS ENUM('headset', 'connections', 'goal', 'cog', 'tag', 'phone-call', 'messages-square', 'shopping-cart');
  CREATE TYPE "public"."enum_posts_blocks_agent_solutions_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_contact_us_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_concierge_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_concierge_flow_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_enterprise_upgrade_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_channels_grid_cards_icon" AS ENUM('sms', 'whatsapp', 'voice', 'chat', 'mail', 'monitor', 'network', 'clock', 'webhook');
  CREATE TYPE "public"."enum_posts_blocks_channels_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_feature_stack_cards_icon" AS ENUM('network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap');
  CREATE TYPE "public"."enum_posts_blocks_feature_stack_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_coverage_grid_cards_icon" AS ENUM('flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory');
  CREATE TYPE "public"."enum_posts_blocks_coverage_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_feature_rows_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_feature_rows_variant" AS ENUM('capabilities', 'builder');
  CREATE TYPE "public"."enum_posts_blocks_capability_trio_cards_icon" AS ENUM('messages-square', 'orbit', 'brain-circuit');
  CREATE TYPE "public"."enum_posts_blocks_capability_trio_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_capability_tools_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_use_cases_grid_cards_icon" AS ENUM('shopping-cart', 'building', 'cloud-cog', 'megaphone', 'heart-handshake', 'hammer', 'shield-check', 'scroll-text', 'briefcase', 'headset', 'graduation-cap', 'truck', 'calendar-check', 'clock', 'filter', 'refresh-ccw', 'list-checks', 'file-plus', 'messages-square');
  CREATE TYPE "public"."enum_posts_blocks_use_cases_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_security_cards_icon" AS ENUM('database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search');
  CREATE TYPE "public"."enum_posts_blocks_security_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_functional_capabilities_cards_icon" AS ENUM('award', 'bell', 'calendar-check-2', 'calendar-days', 'calendar-range', 'clipboard-check', 'clock', 'database', 'file-check-2', 'file-text', 'filter', 'handshake', 'inbox', 'message-square', 'phone-incoming', 'receipt', 'repeat-2', 'send', 'shield-check', 'sliders-horizontal', 'star', 'triangle-alert', 'audio-lines', 'messages-square', 'smartphone', 'users', 'mail', 'info');
  CREATE TYPE "public"."enum_posts_blocks_functional_capabilities_cards_width" AS ENUM('default', 'wide');
  CREATE TYPE "public"."enum_posts_blocks_functional_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_functional_capabilities_preset" AS ENUM('sales', 'service', 'recruiting', 'channels');
  CREATE TYPE "public"."enum_posts_blocks_how_it_works_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_how_it_works_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_cta_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_cta_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_cta_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_metrics_background" AS ENUM('white', 'muted', 'dark');
  CREATE TYPE "public"."enum_posts_blocks_results_stats_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_results_stats_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_stats_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_capability_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_live_in_days_items_icon" AS ENUM('code-xml', 'layout-grid', 'bot-message-square', 'user-round-check');
  CREATE TYPE "public"."enum_posts_blocks_live_in_days_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_faq_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_news_insights_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum_posts_blocks_news_insights_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_news_insights_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_posts_blocks_content_feed_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum_posts_blocks_content_feed_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_content_feed_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_posts_blocks_pricing_cards_cards_accent" AS ENUM('gradient', 'dark');
  CREATE TYPE "public"."enum_posts_blocks_pricing_cards_cards_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_pricing_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_pricing_details_sections_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_pricing_details_sections_variant" AS ENUM('default', 'comparison');
  CREATE TYPE "public"."enum_posts_blocks_pricing_details_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_difference_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_difference_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_pain_points_comparison_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_pain_points_comparison_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_pricing_policy_callouts_icon" AS ENUM('wallet', 'infinity', 'headset', 'info');
  CREATE TYPE "public"."enum_posts_blocks_pricing_policy_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_industry_expertise_items_icon" AS ENUM('shopping_cart', 'headset', 'cloud_cog', 'hammer', 'heart_handshake', 'hotel', 'brain', 'layers', 'wand', 'globe', 'users', 'workflow');
  CREATE TYPE "public"."enum_posts_blocks_industry_expertise_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_industry_expertise_visual_type" AS ENUM('industry', 'platform', 'capabilities');
  CREATE TYPE "public"."enum_posts_blocks_industry_expertise_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_logo_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_integrations_banner_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_logo_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_tabs_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_anchor_nav_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_testimonials_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_comparison_grid_cards_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_posts_blocks_comparison_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_use_case_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_template" AS ENUM('article', 'guide');
  CREATE TYPE "public"."enum_news_blocks_hero_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_hero_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum_news_blocks_hero_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_hero_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_hero_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum_news_blocks_hero_extended_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_hero_extended_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum_news_blocks_hero_extended_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum_news_blocks_hero_extended_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_hero_extended_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_rich_text_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_side_by_side_media_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_news_blocks_side_by_side_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_news_blocks_side_by_side_background" AS ENUM('white', 'gray', 'transparent', 'muted', 'dark');
  CREATE TYPE "public"."enum_news_blocks_side_by_side_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_side_by_side_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_story_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_media_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_feature_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_agent_capabilities_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_agent_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_agent_capabilities_content_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_news_blocks_agent_solutions_items_icon" AS ENUM('headset', 'connections', 'goal', 'cog', 'tag', 'phone-call', 'messages-square', 'shopping-cart');
  CREATE TYPE "public"."enum_news_blocks_agent_solutions_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_contact_us_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_concierge_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_concierge_flow_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_enterprise_upgrade_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_channels_grid_cards_icon" AS ENUM('sms', 'whatsapp', 'voice', 'chat', 'mail', 'monitor', 'network', 'clock', 'webhook');
  CREATE TYPE "public"."enum_news_blocks_channels_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_feature_stack_cards_icon" AS ENUM('network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap');
  CREATE TYPE "public"."enum_news_blocks_feature_stack_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_coverage_grid_cards_icon" AS ENUM('flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory');
  CREATE TYPE "public"."enum_news_blocks_coverage_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_feature_rows_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_feature_rows_variant" AS ENUM('capabilities', 'builder');
  CREATE TYPE "public"."enum_news_blocks_capability_trio_cards_icon" AS ENUM('messages-square', 'orbit', 'brain-circuit');
  CREATE TYPE "public"."enum_news_blocks_capability_trio_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_capability_tools_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_use_cases_grid_cards_icon" AS ENUM('shopping-cart', 'building', 'cloud-cog', 'megaphone', 'heart-handshake', 'hammer', 'shield-check', 'scroll-text', 'briefcase', 'headset', 'graduation-cap', 'truck', 'calendar-check', 'clock', 'filter', 'refresh-ccw', 'list-checks', 'file-plus', 'messages-square');
  CREATE TYPE "public"."enum_news_blocks_use_cases_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_security_cards_icon" AS ENUM('database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search');
  CREATE TYPE "public"."enum_news_blocks_security_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_functional_capabilities_cards_icon" AS ENUM('award', 'bell', 'calendar-check-2', 'calendar-days', 'calendar-range', 'clipboard-check', 'clock', 'database', 'file-check-2', 'file-text', 'filter', 'handshake', 'inbox', 'message-square', 'phone-incoming', 'receipt', 'repeat-2', 'send', 'shield-check', 'sliders-horizontal', 'star', 'triangle-alert', 'audio-lines', 'messages-square', 'smartphone', 'users', 'mail', 'info');
  CREATE TYPE "public"."enum_news_blocks_functional_capabilities_cards_width" AS ENUM('default', 'wide');
  CREATE TYPE "public"."enum_news_blocks_functional_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_functional_capabilities_preset" AS ENUM('sales', 'service', 'recruiting', 'channels');
  CREATE TYPE "public"."enum_news_blocks_how_it_works_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_how_it_works_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_cta_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_cta_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_cta_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_metrics_background" AS ENUM('white', 'muted', 'dark');
  CREATE TYPE "public"."enum_news_blocks_results_stats_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_results_stats_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_stats_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_capability_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_live_in_days_items_icon" AS ENUM('code-xml', 'layout-grid', 'bot-message-square', 'user-round-check');
  CREATE TYPE "public"."enum_news_blocks_live_in_days_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_faq_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_news_insights_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum_news_blocks_news_insights_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_news_insights_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_news_blocks_content_feed_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum_news_blocks_content_feed_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_content_feed_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_news_blocks_pricing_cards_cards_accent" AS ENUM('gradient', 'dark');
  CREATE TYPE "public"."enum_news_blocks_pricing_cards_cards_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_pricing_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_pricing_details_sections_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_pricing_details_sections_variant" AS ENUM('default', 'comparison');
  CREATE TYPE "public"."enum_news_blocks_pricing_details_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_difference_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_difference_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_pain_points_comparison_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_pain_points_comparison_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_pricing_policy_callouts_icon" AS ENUM('wallet', 'infinity', 'headset', 'info');
  CREATE TYPE "public"."enum_news_blocks_pricing_policy_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_industry_expertise_items_icon" AS ENUM('shopping_cart', 'headset', 'cloud_cog', 'hammer', 'heart_handshake', 'hotel', 'brain', 'layers', 'wand', 'globe', 'users', 'workflow');
  CREATE TYPE "public"."enum_news_blocks_industry_expertise_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_industry_expertise_visual_type" AS ENUM('industry', 'platform', 'capabilities');
  CREATE TYPE "public"."enum_news_blocks_industry_expertise_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_logo_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_integrations_banner_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_logo_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_tabs_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_anchor_nav_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_testimonials_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_comparison_grid_cards_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_news_blocks_comparison_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_blocks_use_case_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_news_template" AS ENUM('news', 'article');
  CREATE TYPE "public"."enum_guides_blocks_hero_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_hero_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum_guides_blocks_hero_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_hero_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_hero_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum_guides_blocks_hero_extended_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_hero_extended_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum_guides_blocks_hero_extended_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum_guides_blocks_hero_extended_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_hero_extended_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_rich_text_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_side_by_side_media_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_guides_blocks_side_by_side_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_guides_blocks_side_by_side_background" AS ENUM('white', 'gray', 'transparent', 'muted', 'dark');
  CREATE TYPE "public"."enum_guides_blocks_side_by_side_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_side_by_side_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_story_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_media_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_feature_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_agent_capabilities_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_agent_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_agent_capabilities_content_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_guides_blocks_agent_solutions_items_icon" AS ENUM('headset', 'connections', 'goal', 'cog', 'tag', 'phone-call', 'messages-square', 'shopping-cart');
  CREATE TYPE "public"."enum_guides_blocks_agent_solutions_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_contact_us_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_concierge_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_concierge_flow_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_enterprise_upgrade_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_channels_grid_cards_icon" AS ENUM('sms', 'whatsapp', 'voice', 'chat', 'mail', 'monitor', 'network', 'clock', 'webhook');
  CREATE TYPE "public"."enum_guides_blocks_channels_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_feature_stack_cards_icon" AS ENUM('network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap');
  CREATE TYPE "public"."enum_guides_blocks_feature_stack_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_coverage_grid_cards_icon" AS ENUM('flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory');
  CREATE TYPE "public"."enum_guides_blocks_coverage_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_feature_rows_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_feature_rows_variant" AS ENUM('capabilities', 'builder');
  CREATE TYPE "public"."enum_guides_blocks_capability_trio_cards_icon" AS ENUM('messages-square', 'orbit', 'brain-circuit');
  CREATE TYPE "public"."enum_guides_blocks_capability_trio_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_capability_tools_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_use_cases_grid_cards_icon" AS ENUM('shopping-cart', 'building', 'cloud-cog', 'megaphone', 'heart-handshake', 'hammer', 'shield-check', 'scroll-text', 'briefcase', 'headset', 'graduation-cap', 'truck', 'calendar-check', 'clock', 'filter', 'refresh-ccw', 'list-checks', 'file-plus', 'messages-square');
  CREATE TYPE "public"."enum_guides_blocks_use_cases_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_security_cards_icon" AS ENUM('database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search');
  CREATE TYPE "public"."enum_guides_blocks_security_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_functional_capabilities_cards_icon" AS ENUM('award', 'bell', 'calendar-check-2', 'calendar-days', 'calendar-range', 'clipboard-check', 'clock', 'database', 'file-check-2', 'file-text', 'filter', 'handshake', 'inbox', 'message-square', 'phone-incoming', 'receipt', 'repeat-2', 'send', 'shield-check', 'sliders-horizontal', 'star', 'triangle-alert', 'audio-lines', 'messages-square', 'smartphone', 'users', 'mail', 'info');
  CREATE TYPE "public"."enum_guides_blocks_functional_capabilities_cards_width" AS ENUM('default', 'wide');
  CREATE TYPE "public"."enum_guides_blocks_functional_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_functional_capabilities_preset" AS ENUM('sales', 'service', 'recruiting', 'channels');
  CREATE TYPE "public"."enum_guides_blocks_how_it_works_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_how_it_works_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_cta_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_cta_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_cta_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_metrics_background" AS ENUM('white', 'muted', 'dark');
  CREATE TYPE "public"."enum_guides_blocks_results_stats_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_results_stats_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_stats_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_capability_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_live_in_days_items_icon" AS ENUM('code-xml', 'layout-grid', 'bot-message-square', 'user-round-check');
  CREATE TYPE "public"."enum_guides_blocks_live_in_days_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_faq_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_news_insights_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum_guides_blocks_news_insights_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_news_insights_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_guides_blocks_content_feed_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum_guides_blocks_content_feed_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_content_feed_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_guides_blocks_pricing_cards_cards_accent" AS ENUM('gradient', 'dark');
  CREATE TYPE "public"."enum_guides_blocks_pricing_cards_cards_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_pricing_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_pricing_details_sections_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_pricing_details_sections_variant" AS ENUM('default', 'comparison');
  CREATE TYPE "public"."enum_guides_blocks_pricing_details_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_difference_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_difference_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_pain_points_comparison_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_pain_points_comparison_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_pricing_policy_callouts_icon" AS ENUM('wallet', 'infinity', 'headset', 'info');
  CREATE TYPE "public"."enum_guides_blocks_pricing_policy_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_industry_expertise_items_icon" AS ENUM('shopping_cart', 'headset', 'cloud_cog', 'hammer', 'heart_handshake', 'hotel', 'brain', 'layers', 'wand', 'globe', 'users', 'workflow');
  CREATE TYPE "public"."enum_guides_blocks_industry_expertise_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_industry_expertise_visual_type" AS ENUM('industry', 'platform', 'capabilities');
  CREATE TYPE "public"."enum_guides_blocks_industry_expertise_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_logo_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_integrations_banner_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_logo_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_tabs_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_anchor_nav_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_testimonials_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_comparison_grid_cards_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_guides_blocks_comparison_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_blocks_use_case_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_guides_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_guides_template" AS ENUM('guide', 'article');
  CREATE TYPE "public"."enum_tips_blocks_hero_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_hero_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum_tips_blocks_hero_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_hero_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_hero_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum_tips_blocks_hero_extended_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_hero_extended_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum_tips_blocks_hero_extended_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum_tips_blocks_hero_extended_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_hero_extended_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_rich_text_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_side_by_side_media_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_tips_blocks_side_by_side_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_tips_blocks_side_by_side_background" AS ENUM('white', 'gray', 'transparent', 'muted', 'dark');
  CREATE TYPE "public"."enum_tips_blocks_side_by_side_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_side_by_side_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_story_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_media_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_feature_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_agent_capabilities_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_agent_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_agent_capabilities_content_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_tips_blocks_agent_solutions_items_icon" AS ENUM('headset', 'connections', 'goal', 'cog', 'tag', 'phone-call', 'messages-square', 'shopping-cart');
  CREATE TYPE "public"."enum_tips_blocks_agent_solutions_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_contact_us_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_concierge_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_concierge_flow_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_enterprise_upgrade_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_channels_grid_cards_icon" AS ENUM('sms', 'whatsapp', 'voice', 'chat', 'mail', 'monitor', 'network', 'clock', 'webhook');
  CREATE TYPE "public"."enum_tips_blocks_channels_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_feature_stack_cards_icon" AS ENUM('network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap');
  CREATE TYPE "public"."enum_tips_blocks_feature_stack_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_coverage_grid_cards_icon" AS ENUM('flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory');
  CREATE TYPE "public"."enum_tips_blocks_coverage_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_feature_rows_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_feature_rows_variant" AS ENUM('capabilities', 'builder');
  CREATE TYPE "public"."enum_tips_blocks_capability_trio_cards_icon" AS ENUM('messages-square', 'orbit', 'brain-circuit');
  CREATE TYPE "public"."enum_tips_blocks_capability_trio_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_capability_tools_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_use_cases_grid_cards_icon" AS ENUM('shopping-cart', 'building', 'cloud-cog', 'megaphone', 'heart-handshake', 'hammer', 'shield-check', 'scroll-text', 'briefcase', 'headset', 'graduation-cap', 'truck', 'calendar-check', 'clock', 'filter', 'refresh-ccw', 'list-checks', 'file-plus', 'messages-square');
  CREATE TYPE "public"."enum_tips_blocks_use_cases_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_security_cards_icon" AS ENUM('database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search');
  CREATE TYPE "public"."enum_tips_blocks_security_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_functional_capabilities_cards_icon" AS ENUM('award', 'bell', 'calendar-check-2', 'calendar-days', 'calendar-range', 'clipboard-check', 'clock', 'database', 'file-check-2', 'file-text', 'filter', 'handshake', 'inbox', 'message-square', 'phone-incoming', 'receipt', 'repeat-2', 'send', 'shield-check', 'sliders-horizontal', 'star', 'triangle-alert', 'audio-lines', 'messages-square', 'smartphone', 'users', 'mail', 'info');
  CREATE TYPE "public"."enum_tips_blocks_functional_capabilities_cards_width" AS ENUM('default', 'wide');
  CREATE TYPE "public"."enum_tips_blocks_functional_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_functional_capabilities_preset" AS ENUM('sales', 'service', 'recruiting', 'channels');
  CREATE TYPE "public"."enum_tips_blocks_how_it_works_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_how_it_works_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_cta_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_cta_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_cta_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_metrics_background" AS ENUM('white', 'muted', 'dark');
  CREATE TYPE "public"."enum_tips_blocks_results_stats_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_results_stats_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_stats_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_capability_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_live_in_days_items_icon" AS ENUM('code-xml', 'layout-grid', 'bot-message-square', 'user-round-check');
  CREATE TYPE "public"."enum_tips_blocks_live_in_days_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_faq_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_news_insights_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum_tips_blocks_news_insights_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_news_insights_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_tips_blocks_content_feed_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum_tips_blocks_content_feed_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_content_feed_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_tips_blocks_pricing_cards_cards_accent" AS ENUM('gradient', 'dark');
  CREATE TYPE "public"."enum_tips_blocks_pricing_cards_cards_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_pricing_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_pricing_details_sections_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_pricing_details_sections_variant" AS ENUM('default', 'comparison');
  CREATE TYPE "public"."enum_tips_blocks_pricing_details_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_difference_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_difference_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_pain_points_comparison_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_pain_points_comparison_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_pricing_policy_callouts_icon" AS ENUM('wallet', 'infinity', 'headset', 'info');
  CREATE TYPE "public"."enum_tips_blocks_pricing_policy_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_industry_expertise_items_icon" AS ENUM('shopping_cart', 'headset', 'cloud_cog', 'hammer', 'heart_handshake', 'hotel', 'brain', 'layers', 'wand', 'globe', 'users', 'workflow');
  CREATE TYPE "public"."enum_tips_blocks_industry_expertise_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_industry_expertise_visual_type" AS ENUM('industry', 'platform', 'capabilities');
  CREATE TYPE "public"."enum_tips_blocks_industry_expertise_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_logo_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_integrations_banner_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_logo_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_tabs_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_anchor_nav_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_testimonials_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_comparison_grid_cards_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_tips_blocks_comparison_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_blocks_use_case_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_tips_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_tips_template" AS ENUM('tip', 'article');
  CREATE TYPE "public"."enum_use_cases_blocks_hero_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_hero_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum_use_cases_blocks_hero_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_hero_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_hero_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum_use_cases_blocks_hero_extended_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_hero_extended_variant" AS ENUM('default', 'home');
  CREATE TYPE "public"."enum_use_cases_blocks_hero_extended_media_size" AS ENUM('wide', 'tall');
  CREATE TYPE "public"."enum_use_cases_blocks_hero_extended_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_hero_extended_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_rich_text_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_side_by_side_media_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_use_cases_blocks_side_by_side_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_use_cases_blocks_side_by_side_background" AS ENUM('white', 'gray', 'transparent', 'muted', 'dark');
  CREATE TYPE "public"."enum_use_cases_blocks_side_by_side_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_side_by_side_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_story_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_media_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_feature_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_agent_capabilities_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_agent_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_agent_capabilities_content_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_use_cases_blocks_agent_solutions_items_icon" AS ENUM('headset', 'connections', 'goal', 'cog', 'tag', 'phone-call', 'messages-square', 'shopping-cart');
  CREATE TYPE "public"."enum_use_cases_blocks_agent_solutions_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_contact_us_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_concierge_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_concierge_flow_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_enterprise_upgrade_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_channels_grid_cards_icon" AS ENUM('sms', 'whatsapp', 'voice', 'chat', 'mail', 'monitor', 'network', 'clock', 'webhook');
  CREATE TYPE "public"."enum_use_cases_blocks_channels_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_feature_stack_cards_icon" AS ENUM('network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap');
  CREATE TYPE "public"."enum_use_cases_blocks_feature_stack_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_coverage_grid_cards_icon" AS ENUM('flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory');
  CREATE TYPE "public"."enum_use_cases_blocks_coverage_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_feature_rows_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_feature_rows_variant" AS ENUM('capabilities', 'builder');
  CREATE TYPE "public"."enum_use_cases_blocks_capability_trio_cards_icon" AS ENUM('messages-square', 'orbit', 'brain-circuit');
  CREATE TYPE "public"."enum_use_cases_blocks_capability_trio_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_capability_tools_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_use_cases_grid_cards_icon" AS ENUM('shopping-cart', 'building', 'cloud-cog', 'megaphone', 'heart-handshake', 'hammer', 'shield-check', 'scroll-text', 'briefcase', 'headset', 'graduation-cap', 'truck', 'calendar-check', 'clock', 'filter', 'refresh-ccw', 'list-checks', 'file-plus', 'messages-square');
  CREATE TYPE "public"."enum_use_cases_blocks_use_cases_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_security_cards_icon" AS ENUM('database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search');
  CREATE TYPE "public"."enum_use_cases_blocks_security_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_functional_capabilities_cards_icon" AS ENUM('award', 'bell', 'calendar-check-2', 'calendar-days', 'calendar-range', 'clipboard-check', 'clock', 'database', 'file-check-2', 'file-text', 'filter', 'handshake', 'inbox', 'message-square', 'phone-incoming', 'receipt', 'repeat-2', 'send', 'shield-check', 'sliders-horizontal', 'star', 'triangle-alert', 'audio-lines', 'messages-square', 'smartphone', 'users', 'mail', 'info');
  CREATE TYPE "public"."enum_use_cases_blocks_functional_capabilities_cards_width" AS ENUM('default', 'wide');
  CREATE TYPE "public"."enum_use_cases_blocks_functional_capabilities_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_functional_capabilities_preset" AS ENUM('sales', 'service', 'recruiting', 'channels');
  CREATE TYPE "public"."enum_use_cases_blocks_how_it_works_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_how_it_works_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_cta_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_cta_primary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_cta_secondary_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_metrics_background" AS ENUM('white', 'muted', 'dark');
  CREATE TYPE "public"."enum_use_cases_blocks_results_stats_items_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_results_stats_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_stats_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_capability_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_live_in_days_items_icon" AS ENUM('code-xml', 'layout-grid', 'bot-message-square', 'user-round-check');
  CREATE TYPE "public"."enum_use_cases_blocks_live_in_days_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_faq_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_news_insights_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum_use_cases_blocks_news_insights_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_news_insights_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_use_cases_blocks_content_feed_collections" AS ENUM('pages', 'posts', 'news', 'guides', 'tips', 'use-cases');
  CREATE TYPE "public"."enum_use_cases_blocks_content_feed_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_content_feed_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_use_cases_blocks_pricing_cards_cards_accent" AS ENUM('gradient', 'dark');
  CREATE TYPE "public"."enum_use_cases_blocks_pricing_cards_cards_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_pricing_cards_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_pricing_details_sections_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_pricing_details_sections_variant" AS ENUM('default', 'comparison');
  CREATE TYPE "public"."enum_use_cases_blocks_pricing_details_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_difference_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_difference_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_pain_points_comparison_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_pain_points_comparison_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_pricing_policy_callouts_icon" AS ENUM('wallet', 'infinity', 'headset', 'info');
  CREATE TYPE "public"."enum_use_cases_blocks_pricing_policy_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_industry_expertise_items_icon" AS ENUM('shopping_cart', 'headset', 'cloud_cog', 'hammer', 'heart_handshake', 'hotel', 'brain', 'layers', 'wand', 'globe', 'users', 'workflow');
  CREATE TYPE "public"."enum_use_cases_blocks_industry_expertise_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_industry_expertise_visual_type" AS ENUM('industry', 'platform', 'capabilities');
  CREATE TYPE "public"."enum_use_cases_blocks_industry_expertise_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_logo_strip_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_integrations_banner_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_logo_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_tabs_showcase_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_anchor_nav_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_testimonials_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_comparison_grid_cards_action_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_use_cases_blocks_comparison_grid_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_blocks_use_case_flow_background" AS ENUM('white', 'gray');
  CREATE TYPE "public"."enum_use_cases_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_use_cases_template" AS ENUM('use-case', 'industry-use-case');
  CREATE TYPE "public"."enum_forms_fields_type" AS ENUM('text', 'email', 'phone', 'url', 'textarea', 'select', 'checkbox', 'hidden');
  CREATE TYPE "public"."enum_forms_intent" AS ENUM('request-demo', 'contact', 'enterprise', 'blog-subscribe');
  CREATE TYPE "public"."enum_form_submissions_intent" AS ENUM('request-demo', 'contact', 'enterprise', 'blog-subscribe');
  CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('new', 'delivered', 'delivery-failed', 'spam-rejected');
  CREATE TYPE "public"."enum_faq_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_settings_primary_navigation_items_role" AS ENUM('link', 'heading', 'span-heading', 'all');
  CREATE TYPE "public"."enum_site_settings_primary_navigation_variant" AS ENUM('link', 'mega');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"alt" varchar NOT NULL,
  	"description" varchar,
  	"source_id" numeric,
  	"public_path" varchar,
  	"storage_key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages_blocks_hero_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_hero_background",
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_pages_blocks_hero_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_pages_blocks_hero_secondary_action_target" DEFAULT '_self',
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
  	"media_size" "enum_pages_blocks_hero_media_size" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_extended_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_extended" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_hero_extended_background",
  	"variant" "enum_pages_blocks_hero_extended_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
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
  	"media_size" "enum_pages_blocks_hero_extended_media_size" DEFAULT 'wide',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_pages_blocks_hero_extended_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_pages_blocks_hero_extended_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_rich_text_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"html" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_side_by_side_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_side_by_side_small_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "pages_blocks_side_by_side_bottom_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_side_by_side_bottom_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_side" "enum_pages_blocks_side_by_side_media_side" DEFAULT 'right',
  	"section_eyebrow" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"image_side" "enum_pages_blocks_side_by_side_image_side",
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum_pages_blocks_side_by_side_background" DEFAULT 'white',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_pages_blocks_side_by_side_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_pages_blocks_side_by_side_secondary_action_target" DEFAULT '_self',
  	"card_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_story_background",
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
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum_pages_blocks_media_showcase_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar DEFAULT 'wrench',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_pages_blocks_feature_grid_background" DEFAULT 'white',
  	"columns" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_agent_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
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
  	"link_target" "enum_pages_blocks_agent_capabilities_items_link_target" DEFAULT '_self'
  );
  
  CREATE TABLE "pages_blocks_agent_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_agent_capabilities_background",
  	"title" varchar,
  	"description" varchar,
  	"content_side" "enum_pages_blocks_agent_capabilities_content_side" DEFAULT 'left',
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"info_note" varchar,
  	"preview" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_agent_solutions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_agent_solutions_items_icon" DEFAULT 'headset',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_agent_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_agent_solutions_background",
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_contact_us_background",
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
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_concierge_flow_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_concierge_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_concierge_flow_background",
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_pages_blocks_concierge_flow_button_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_enterprise_upgrade_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"included" varchar
  );
  
  CREATE TABLE "pages_blocks_enterprise_upgrade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_enterprise_upgrade_background",
  	"title" varchar,
  	"description" varchar,
  	"table_title" varchar,
  	"left_heading" varchar,
  	"right_heading" varchar,
  	"body_html" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"form_html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_channels_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_channels_grid_cards_icon" DEFAULT 'sms',
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
  	"full_width" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_channels_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_channels_grid_background",
  	"title" varchar,
  	"gradient_text" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_feature_stack_cards_icon" DEFAULT 'network',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_feature_stack_background",
  	"title" varchar,
  	"description" varchar,
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_coverage_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_coverage_grid_cards_icon" DEFAULT 'flame',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_coverage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_coverage_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_rows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_feature_rows_background",
  	"variant" "enum_pages_blocks_feature_rows_variant" DEFAULT 'capabilities',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_capability_trio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_capability_trio_cards_icon" DEFAULT 'messages-square',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_capability_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_capability_trio_background",
  	"title" varchar,
  	"center_label" varchar DEFAULT 'Deterministic workflow engine',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_capability_tools_cards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "pages_blocks_capability_tools_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"extra_tools" numeric DEFAULT 0
  );
  
  CREATE TABLE "pages_blocks_capability_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_capability_tools_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_use_cases_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_use_cases_grid_cards_icon" DEFAULT 'shopping-cart',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_use_cases_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_use_cases_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_security_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_security_cards_icon" DEFAULT 'database_zap',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_security_background" DEFAULT 'white',
  	"title" varchar,
  	"title_gradient" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_functional_capabilities_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_functional_capabilities_cards_icon" DEFAULT 'filter',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"channels" varchar,
  	"width" "enum_pages_blocks_functional_capabilities_cards_width" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_functional_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_functional_capabilities_background",
  	"preset" "enum_pages_blocks_functional_capabilities_preset" DEFAULT 'sales',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'How it Works',
  	"gradient_text" varchar DEFAULT 'Works',
  	"subtitle" varchar DEFAULT 'From First Call to Live Agent in Days',
  	"background" "enum_pages_blocks_how_it_works_background" DEFAULT 'gray',
  	"open_first" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_pages_blocks_how_it_works_button_target" DEFAULT '_self',
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_cta_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_pages_blocks_cta_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_pages_blocks_cta_secondary_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"background" "enum_pages_blocks_metrics_background" DEFAULT 'white',
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_results_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_target" "enum_pages_blocks_results_stats_items_link_target" DEFAULT '_self'
  );
  
  CREATE TABLE "pages_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_results_stats_background" DEFAULT 'white',
  	"title" varchar NOT NULL,
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"heading" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_stats_cards_background" DEFAULT 'white',
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_capability_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_capability_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_pages_blocks_capability_strip_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_live_in_days_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_live_in_days_items_icon" DEFAULT 'code-xml',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_live_in_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_live_in_days_background",
  	"eyebrow" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_faq_background",
  	"title" varchar NOT NULL,
  	"title_gradient" varchar,
  	"description" varchar,
  	"search_placeholder" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_news_insights_collections" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_news_insights_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_news_insights_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_news_insights_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar
  );
  
  CREATE TABLE "pages_blocks_news_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_news_insights_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"mode" "enum_pages_blocks_news_insights_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_feed_collections" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_content_feed_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content_feed_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content_feed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar
  );
  
  CREATE TABLE "pages_blocks_content_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_content_feed_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"mode" "enum_pages_blocks_content_feed_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_cards_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"accent" "enum_pages_blocks_pricing_cards_cards_accent" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_pages_blocks_pricing_cards_cards_button_target" DEFAULT '_self'
  );
  
  CREATE TABLE "pages_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_pages_blocks_pricing_cards_background" DEFAULT 'gray',
  	"info" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_details_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_details_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"strong" boolean DEFAULT false,
  	"accent" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"stars" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_pricing_details_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_details_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_pricing_details_sections_background" DEFAULT 'gray',
  	"variant" "enum_pages_blocks_pricing_details_sections_variant" DEFAULT 'default',
  	"title" varchar,
  	"info" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_pricing_details_background",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_difference_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_difference_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_difference_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"left_title" varchar,
  	"right_title" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_pages_blocks_difference_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pain_points_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_title" varchar,
  	"left_description" varchar,
  	"right_title" varchar,
  	"right_description" varchar
  );
  
  CREATE TABLE "pages_blocks_pain_points_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_pain_points_comparison_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"show_column_headings" boolean DEFAULT false,
  	"left_heading" varchar DEFAULT 'The Challenge',
  	"right_heading" varchar DEFAULT 'Your AI Agent',
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_pages_blocks_pain_points_comparison_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_policy_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_pricing_policy_callouts_icon" DEFAULT 'wallet',
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_pricing_policy_background" DEFAULT 'white',
  	"title" varchar,
  	"info" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_industry_expertise_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_industry_expertise_items_icon",
  	"custom_icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "pages_blocks_industry_expertise_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"source" varchar
  );
  
  CREATE TABLE "pages_blocks_industry_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_industry_expertise_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"visual_type" "enum_pages_blocks_industry_expertise_visual_type" DEFAULT 'industry',
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_pages_blocks_industry_expertise_button_target" DEFAULT '_self',
  	"hide_bottom_controls" boolean DEFAULT false,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "pages_blocks_logo_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_logo_strip_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_integrations_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric
  );
  
  CREATE TABLE "pages_blocks_integrations_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_integrations_banner_background",
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_grid_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
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
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_grid_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_logo_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tabs_showcase_tabs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric
  );
  
  CREATE TABLE "pages_blocks_tabs_showcase_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric
  );
  
  CREATE TABLE "pages_blocks_tabs_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_tabs_showcase_background" DEFAULT 'gray',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"autoplay_seconds" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_anchor_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "pages_blocks_anchor_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_anchor_nav_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_source_id" varchar,
  	"author_image_src" varchar,
  	"author_image_alt" varchar DEFAULT '',
  	"author_image_width" numeric,
  	"author_image_height" numeric
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_testimonials_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_pages_blocks_comparison_grid_cards_action_target" DEFAULT '_self'
  );
  
  CREATE TABLE "pages_blocks_comparison_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_pages_blocks_comparison_grid_background",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_use_case_flow_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_use_case_flow_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_use_case_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_pages_blocks_use_case_flow_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content_key" varchar,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar,
  	"published_at" varchar,
  	"path" varchar NOT NULL,
  	"status" "enum_pages_status" DEFAULT 'draft',
  	"template" "enum_pages_template" DEFAULT 'standard',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_robots" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_source_id" varchar,
  	"seo_og_image_src" varchar,
  	"seo_og_image_alt" varchar DEFAULT '',
  	"seo_og_image_width" numeric,
  	"seo_og_image_height" numeric,
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_source_id" varchar,
  	"seo_twitter_image_src" varchar,
  	"seo_twitter_image_alt" varchar DEFAULT '',
  	"seo_twitter_image_width" numeric,
  	"seo_twitter_image_height" numeric,
  	"seo_schema_json" jsonb,
  	"import_trace" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_blocks_hero_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric
  );
  
  CREATE TABLE "posts_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_hero_background",
  	"variant" "enum_posts_blocks_hero_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_posts_blocks_hero_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_posts_blocks_hero_secondary_action_target" DEFAULT '_self',
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
  	"media_size" "enum_posts_blocks_hero_media_size" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_hero_extended_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_blocks_hero_extended" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_hero_extended_background",
  	"variant" "enum_posts_blocks_hero_extended_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
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
  	"media_size" "enum_posts_blocks_hero_extended_media_size" DEFAULT 'wide',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_posts_blocks_hero_extended_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_posts_blocks_hero_extended_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_rich_text_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"html" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_side_by_side_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_blocks_side_by_side_small_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "posts_blocks_side_by_side_bottom_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_blocks_side_by_side_bottom_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "posts_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_side" "enum_posts_blocks_side_by_side_media_side" DEFAULT 'right',
  	"section_eyebrow" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"image_side" "enum_posts_blocks_side_by_side_image_side",
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum_posts_blocks_side_by_side_background" DEFAULT 'white',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_posts_blocks_side_by_side_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_posts_blocks_side_by_side_secondary_action_target" DEFAULT '_self',
  	"card_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_story_background",
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
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum_posts_blocks_media_showcase_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar DEFAULT 'wrench',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_posts_blocks_feature_grid_background" DEFAULT 'white',
  	"columns" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_agent_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
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
  	"link_target" "enum_posts_blocks_agent_capabilities_items_link_target" DEFAULT '_self'
  );
  
  CREATE TABLE "posts_blocks_agent_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_agent_capabilities_background",
  	"title" varchar,
  	"description" varchar,
  	"content_side" "enum_posts_blocks_agent_capabilities_content_side" DEFAULT 'left',
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"info_note" varchar,
  	"preview" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_agent_solutions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_posts_blocks_agent_solutions_items_icon" DEFAULT 'headset',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_blocks_agent_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_agent_solutions_background",
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_contact_us_background",
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
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_concierge_flow_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_blocks_concierge_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_concierge_flow_background",
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_posts_blocks_concierge_flow_button_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_enterprise_upgrade_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"included" varchar
  );
  
  CREATE TABLE "posts_blocks_enterprise_upgrade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_enterprise_upgrade_background",
  	"title" varchar,
  	"description" varchar,
  	"table_title" varchar,
  	"left_heading" varchar,
  	"right_heading" varchar,
  	"body_html" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"form_html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_channels_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_posts_blocks_channels_grid_cards_icon" DEFAULT 'sms',
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
  	"full_width" boolean DEFAULT false
  );
  
  CREATE TABLE "posts_blocks_channels_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_channels_grid_background",
  	"title" varchar,
  	"gradient_text" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_feature_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_posts_blocks_feature_stack_cards_icon" DEFAULT 'network',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "posts_blocks_feature_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_feature_stack_background",
  	"title" varchar,
  	"description" varchar,
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_coverage_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_posts_blocks_coverage_grid_cards_icon" DEFAULT 'flame',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "posts_blocks_coverage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_coverage_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_feature_rows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_feature_rows_background",
  	"variant" "enum_posts_blocks_feature_rows_variant" DEFAULT 'capabilities',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_capability_trio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_posts_blocks_capability_trio_cards_icon" DEFAULT 'messages-square',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "posts_blocks_capability_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_capability_trio_background",
  	"title" varchar,
  	"center_label" varchar DEFAULT 'Deterministic workflow engine',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_capability_tools_cards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "posts_blocks_capability_tools_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"extra_tools" numeric DEFAULT 0
  );
  
  CREATE TABLE "posts_blocks_capability_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_capability_tools_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_use_cases_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_posts_blocks_use_cases_grid_cards_icon" DEFAULT 'shopping-cart',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "posts_blocks_use_cases_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_use_cases_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_security_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_posts_blocks_security_cards_icon" DEFAULT 'database_zap',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_security_background" DEFAULT 'white',
  	"title" varchar,
  	"title_gradient" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_functional_capabilities_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_posts_blocks_functional_capabilities_cards_icon" DEFAULT 'filter',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"channels" varchar,
  	"width" "enum_posts_blocks_functional_capabilities_cards_width" DEFAULT 'default'
  );
  
  CREATE TABLE "posts_blocks_functional_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_functional_capabilities_background",
  	"preset" "enum_posts_blocks_functional_capabilities_preset" DEFAULT 'sales',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'How it Works',
  	"gradient_text" varchar DEFAULT 'Works',
  	"subtitle" varchar DEFAULT 'From First Call to Live Agent in Days',
  	"background" "enum_posts_blocks_how_it_works_background" DEFAULT 'gray',
  	"open_first" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_posts_blocks_how_it_works_button_target" DEFAULT '_self',
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_cta_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_posts_blocks_cta_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_posts_blocks_cta_secondary_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "posts_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"background" "enum_posts_blocks_metrics_background" DEFAULT 'white',
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_results_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_target" "enum_posts_blocks_results_stats_items_link_target" DEFAULT '_self'
  );
  
  CREATE TABLE "posts_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_results_stats_background" DEFAULT 'white',
  	"title" varchar NOT NULL,
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"heading" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_stats_cards_background" DEFAULT 'white',
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_capability_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_capability_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_posts_blocks_capability_strip_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_live_in_days_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_posts_blocks_live_in_days_items_icon" DEFAULT 'code-xml',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_live_in_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_live_in_days_background",
  	"eyebrow" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "posts_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_faq_background",
  	"title" varchar NOT NULL,
  	"title_gradient" varchar,
  	"description" varchar,
  	"search_placeholder" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_news_insights_collections" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_posts_blocks_news_insights_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_blocks_news_insights_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_news_insights_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar
  );
  
  CREATE TABLE "posts_blocks_news_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_news_insights_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"mode" "enum_posts_blocks_news_insights_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_content_feed_collections" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_posts_blocks_content_feed_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_blocks_content_feed_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_content_feed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar
  );
  
  CREATE TABLE "posts_blocks_content_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_content_feed_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"mode" "enum_posts_blocks_content_feed_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_pricing_cards_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_pricing_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"accent" "enum_posts_blocks_pricing_cards_cards_accent" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_posts_blocks_pricing_cards_cards_button_target" DEFAULT '_self'
  );
  
  CREATE TABLE "posts_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_posts_blocks_pricing_cards_background" DEFAULT 'gray',
  	"info" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_pricing_details_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_pricing_details_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"strong" boolean DEFAULT false,
  	"accent" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"stars" boolean DEFAULT false
  );
  
  CREATE TABLE "posts_blocks_pricing_details_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_blocks_pricing_details_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_posts_blocks_pricing_details_sections_background" DEFAULT 'gray',
  	"variant" "enum_posts_blocks_pricing_details_sections_variant" DEFAULT 'default',
  	"title" varchar,
  	"info" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "posts_blocks_pricing_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_pricing_details_background",
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_difference_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_blocks_difference_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_blocks_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_difference_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"left_title" varchar,
  	"right_title" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_posts_blocks_difference_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_pain_points_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_title" varchar,
  	"left_description" varchar,
  	"right_title" varchar,
  	"right_description" varchar
  );
  
  CREATE TABLE "posts_blocks_pain_points_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_pain_points_comparison_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"show_column_headings" boolean DEFAULT false,
  	"left_heading" varchar DEFAULT 'The Challenge',
  	"right_heading" varchar DEFAULT 'Your AI Agent',
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_posts_blocks_pain_points_comparison_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_pricing_policy_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_posts_blocks_pricing_policy_callouts_icon" DEFAULT 'wallet',
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_pricing_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_pricing_policy_background" DEFAULT 'white',
  	"title" varchar,
  	"info" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_industry_expertise_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_posts_blocks_industry_expertise_items_icon",
  	"custom_icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "posts_blocks_industry_expertise_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"source" varchar
  );
  
  CREATE TABLE "posts_blocks_industry_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_industry_expertise_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"visual_type" "enum_posts_blocks_industry_expertise_visual_type" DEFAULT 'industry',
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_posts_blocks_industry_expertise_button_target" DEFAULT '_self',
  	"hide_bottom_controls" boolean DEFAULT false,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "posts_blocks_logo_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "posts_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_logo_strip_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_integrations_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric
  );
  
  CREATE TABLE "posts_blocks_integrations_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_integrations_banner_background",
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_logo_grid_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
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
  	"url" varchar
  );
  
  CREATE TABLE "posts_blocks_logo_grid_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "posts_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_logo_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_tabs_showcase_tabs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric
  );
  
  CREATE TABLE "posts_blocks_tabs_showcase_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric
  );
  
  CREATE TABLE "posts_blocks_tabs_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_tabs_showcase_background" DEFAULT 'gray',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"autoplay_seconds" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_anchor_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "posts_blocks_anchor_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_anchor_nav_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_source_id" varchar,
  	"author_image_src" varchar,
  	"author_image_alt" varchar DEFAULT '',
  	"author_image_width" numeric,
  	"author_image_height" numeric
  );
  
  CREATE TABLE "posts_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_testimonials_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_comparison_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_posts_blocks_comparison_grid_cards_action_target" DEFAULT '_self'
  );
  
  CREATE TABLE "posts_blocks_comparison_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_posts_blocks_comparison_grid_background",
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_use_case_flow_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_use_case_flow_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "posts_blocks_use_case_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_posts_blocks_use_case_flow_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_article_meta_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"excerpt" varchar,
  	"featured_image_id" integer,
  	"source_featured_image_source_id" varchar,
  	"source_featured_image_src" varchar,
  	"source_featured_image_alt" varchar,
  	"source_featured_image_width" numeric,
  	"source_featured_image_height" numeric,
  	"slug" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"path" varchar NOT NULL,
  	"status" "enum_posts_status" DEFAULT 'draft',
  	"template" "enum_posts_template" DEFAULT 'article',
  	"article_meta_category" varchar,
  	"article_meta_author_name" varchar,
  	"article_meta_updated_at" timestamp(3) with time zone,
  	"article_meta_read_time_minutes" numeric,
  	"article_meta_rating_average" numeric,
  	"article_meta_rating_count" numeric,
  	"article_meta_views" numeric,
  	"article_meta_show_table_of_contents" boolean DEFAULT true,
  	"article_meta_show_table_of_contents_title" boolean DEFAULT true,
  	"article_meta_table_of_contents_title" varchar DEFAULT 'Contents',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_robots" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_source_id" varchar,
  	"seo_og_image_src" varchar,
  	"seo_og_image_alt" varchar DEFAULT '',
  	"seo_og_image_width" numeric,
  	"seo_og_image_height" numeric,
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_source_id" varchar,
  	"seo_twitter_image_src" varchar,
  	"seo_twitter_image_alt" varchar DEFAULT '',
  	"seo_twitter_image_width" numeric,
  	"seo_twitter_image_height" numeric,
  	"seo_schema_json" jsonb,
  	"content_key" varchar,
  	"import_trace" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_blocks_hero_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric
  );
  
  CREATE TABLE "news_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_hero_background",
  	"variant" "enum_news_blocks_hero_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_news_blocks_hero_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_news_blocks_hero_secondary_action_target" DEFAULT '_self',
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
  	"media_size" "enum_news_blocks_hero_media_size" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_hero_extended_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "news_blocks_hero_extended" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_hero_extended_background",
  	"variant" "enum_news_blocks_hero_extended_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
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
  	"media_size" "enum_news_blocks_hero_extended_media_size" DEFAULT 'wide',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_news_blocks_hero_extended_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_news_blocks_hero_extended_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_rich_text_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"html" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_side_by_side_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "news_blocks_side_by_side_small_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "news_blocks_side_by_side_bottom_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "news_blocks_side_by_side_bottom_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "news_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_side" "enum_news_blocks_side_by_side_media_side" DEFAULT 'right',
  	"section_eyebrow" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"image_side" "enum_news_blocks_side_by_side_image_side",
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum_news_blocks_side_by_side_background" DEFAULT 'white',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_news_blocks_side_by_side_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_news_blocks_side_by_side_secondary_action_target" DEFAULT '_self',
  	"card_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "news_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_story_background",
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
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum_news_blocks_media_showcase_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar DEFAULT 'wrench',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "news_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_news_blocks_feature_grid_background" DEFAULT 'white',
  	"columns" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_agent_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
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
  	"link_target" "enum_news_blocks_agent_capabilities_items_link_target" DEFAULT '_self'
  );
  
  CREATE TABLE "news_blocks_agent_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_agent_capabilities_background",
  	"title" varchar,
  	"description" varchar,
  	"content_side" "enum_news_blocks_agent_capabilities_content_side" DEFAULT 'left',
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"info_note" varchar,
  	"preview" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_agent_solutions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_news_blocks_agent_solutions_items_icon" DEFAULT 'headset',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "news_blocks_agent_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_agent_solutions_background",
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_contact_us_background",
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
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_concierge_flow_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "news_blocks_concierge_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_concierge_flow_background",
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_news_blocks_concierge_flow_button_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_enterprise_upgrade_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"included" varchar
  );
  
  CREATE TABLE "news_blocks_enterprise_upgrade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_enterprise_upgrade_background",
  	"title" varchar,
  	"description" varchar,
  	"table_title" varchar,
  	"left_heading" varchar,
  	"right_heading" varchar,
  	"body_html" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"form_html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_channels_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_news_blocks_channels_grid_cards_icon" DEFAULT 'sms',
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
  	"full_width" boolean DEFAULT false
  );
  
  CREATE TABLE "news_blocks_channels_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_channels_grid_background",
  	"title" varchar,
  	"gradient_text" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_feature_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_news_blocks_feature_stack_cards_icon" DEFAULT 'network',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "news_blocks_feature_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_feature_stack_background",
  	"title" varchar,
  	"description" varchar,
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_coverage_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_news_blocks_coverage_grid_cards_icon" DEFAULT 'flame',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "news_blocks_coverage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_coverage_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_feature_rows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "news_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_feature_rows_background",
  	"variant" "enum_news_blocks_feature_rows_variant" DEFAULT 'capabilities',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_capability_trio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_news_blocks_capability_trio_cards_icon" DEFAULT 'messages-square',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "news_blocks_capability_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_capability_trio_background",
  	"title" varchar,
  	"center_label" varchar DEFAULT 'Deterministic workflow engine',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_capability_tools_cards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "news_blocks_capability_tools_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"extra_tools" numeric DEFAULT 0
  );
  
  CREATE TABLE "news_blocks_capability_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_capability_tools_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_use_cases_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_news_blocks_use_cases_grid_cards_icon" DEFAULT 'shopping-cart',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "news_blocks_use_cases_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_use_cases_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_security_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_news_blocks_security_cards_icon" DEFAULT 'database_zap',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "news_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_security_background" DEFAULT 'white',
  	"title" varchar,
  	"title_gradient" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_functional_capabilities_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_news_blocks_functional_capabilities_cards_icon" DEFAULT 'filter',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"channels" varchar,
  	"width" "enum_news_blocks_functional_capabilities_cards_width" DEFAULT 'default'
  );
  
  CREATE TABLE "news_blocks_functional_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_functional_capabilities_background",
  	"preset" "enum_news_blocks_functional_capabilities_preset" DEFAULT 'sales',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "news_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'How it Works',
  	"gradient_text" varchar DEFAULT 'Works',
  	"subtitle" varchar DEFAULT 'From First Call to Live Agent in Days',
  	"background" "enum_news_blocks_how_it_works_background" DEFAULT 'gray',
  	"open_first" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_news_blocks_how_it_works_button_target" DEFAULT '_self',
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_cta_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_news_blocks_cta_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_news_blocks_cta_secondary_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "news_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"background" "enum_news_blocks_metrics_background" DEFAULT 'white',
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_results_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_target" "enum_news_blocks_results_stats_items_link_target" DEFAULT '_self'
  );
  
  CREATE TABLE "news_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_results_stats_background" DEFAULT 'white',
  	"title" varchar NOT NULL,
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"heading" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "news_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_stats_cards_background" DEFAULT 'white',
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_capability_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "news_blocks_capability_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_news_blocks_capability_strip_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_live_in_days_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_news_blocks_live_in_days_items_icon" DEFAULT 'code-xml',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "news_blocks_live_in_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_live_in_days_background",
  	"eyebrow" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "news_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_faq_background",
  	"title" varchar NOT NULL,
  	"title_gradient" varchar,
  	"description" varchar,
  	"search_placeholder" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_news_insights_collections" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_news_blocks_news_insights_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "news_blocks_news_insights_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "news_blocks_news_insights_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar
  );
  
  CREATE TABLE "news_blocks_news_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_news_insights_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"mode" "enum_news_blocks_news_insights_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_content_feed_collections" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_news_blocks_content_feed_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "news_blocks_content_feed_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "news_blocks_content_feed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar
  );
  
  CREATE TABLE "news_blocks_content_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_content_feed_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"mode" "enum_news_blocks_content_feed_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_pricing_cards_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "news_blocks_pricing_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"accent" "enum_news_blocks_pricing_cards_cards_accent" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_news_blocks_pricing_cards_cards_button_target" DEFAULT '_self'
  );
  
  CREATE TABLE "news_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_news_blocks_pricing_cards_background" DEFAULT 'gray',
  	"info" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_pricing_details_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "news_blocks_pricing_details_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"strong" boolean DEFAULT false,
  	"accent" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"stars" boolean DEFAULT false
  );
  
  CREATE TABLE "news_blocks_pricing_details_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "news_blocks_pricing_details_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_news_blocks_pricing_details_sections_background" DEFAULT 'gray',
  	"variant" "enum_news_blocks_pricing_details_sections_variant" DEFAULT 'default',
  	"title" varchar,
  	"info" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "news_blocks_pricing_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_pricing_details_background",
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_difference_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "news_blocks_difference_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "news_blocks_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_difference_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"left_title" varchar,
  	"right_title" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_news_blocks_difference_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_pain_points_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_title" varchar,
  	"left_description" varchar,
  	"right_title" varchar,
  	"right_description" varchar
  );
  
  CREATE TABLE "news_blocks_pain_points_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_pain_points_comparison_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"show_column_headings" boolean DEFAULT false,
  	"left_heading" varchar DEFAULT 'The Challenge',
  	"right_heading" varchar DEFAULT 'Your AI Agent',
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_news_blocks_pain_points_comparison_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_pricing_policy_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_news_blocks_pricing_policy_callouts_icon" DEFAULT 'wallet',
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "news_blocks_pricing_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_pricing_policy_background" DEFAULT 'white',
  	"title" varchar,
  	"info" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_industry_expertise_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_news_blocks_industry_expertise_items_icon",
  	"custom_icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "news_blocks_industry_expertise_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"source" varchar
  );
  
  CREATE TABLE "news_blocks_industry_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_industry_expertise_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"visual_type" "enum_news_blocks_industry_expertise_visual_type" DEFAULT 'industry',
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_news_blocks_industry_expertise_button_target" DEFAULT '_self',
  	"hide_bottom_controls" boolean DEFAULT false,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "news_blocks_logo_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "news_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_logo_strip_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_integrations_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric
  );
  
  CREATE TABLE "news_blocks_integrations_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_integrations_banner_background",
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_logo_grid_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
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
  	"url" varchar
  );
  
  CREATE TABLE "news_blocks_logo_grid_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "news_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_logo_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_tabs_showcase_tabs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric
  );
  
  CREATE TABLE "news_blocks_tabs_showcase_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric
  );
  
  CREATE TABLE "news_blocks_tabs_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_tabs_showcase_background" DEFAULT 'gray',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"autoplay_seconds" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_anchor_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "news_blocks_anchor_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_anchor_nav_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_source_id" varchar,
  	"author_image_src" varchar,
  	"author_image_alt" varchar DEFAULT '',
  	"author_image_width" numeric,
  	"author_image_height" numeric
  );
  
  CREATE TABLE "news_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_testimonials_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_comparison_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_news_blocks_comparison_grid_cards_action_target" DEFAULT '_self'
  );
  
  CREATE TABLE "news_blocks_comparison_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_news_blocks_comparison_grid_background",
  	"block_name" varchar
  );
  
  CREATE TABLE "news_blocks_use_case_flow_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "news_blocks_use_case_flow_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "news_blocks_use_case_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_news_blocks_use_case_flow_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "news_article_meta_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"excerpt" varchar,
  	"featured_image_id" integer,
  	"source_featured_image_source_id" varchar,
  	"source_featured_image_src" varchar,
  	"source_featured_image_alt" varchar,
  	"source_featured_image_width" numeric,
  	"source_featured_image_height" numeric,
  	"slug" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"path" varchar NOT NULL,
  	"status" "enum_news_status" DEFAULT 'draft',
  	"template" "enum_news_template" DEFAULT 'news',
  	"article_meta_category" varchar,
  	"article_meta_author_name" varchar,
  	"article_meta_updated_at" timestamp(3) with time zone,
  	"article_meta_read_time_minutes" numeric,
  	"article_meta_rating_average" numeric,
  	"article_meta_rating_count" numeric,
  	"article_meta_views" numeric,
  	"article_meta_show_table_of_contents" boolean DEFAULT true,
  	"article_meta_show_table_of_contents_title" boolean DEFAULT true,
  	"article_meta_table_of_contents_title" varchar DEFAULT 'Contents',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_robots" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_source_id" varchar,
  	"seo_og_image_src" varchar,
  	"seo_og_image_alt" varchar DEFAULT '',
  	"seo_og_image_width" numeric,
  	"seo_og_image_height" numeric,
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_source_id" varchar,
  	"seo_twitter_image_src" varchar,
  	"seo_twitter_image_alt" varchar DEFAULT '',
  	"seo_twitter_image_width" numeric,
  	"seo_twitter_image_height" numeric,
  	"seo_schema_json" jsonb,
  	"content_key" varchar,
  	"import_trace" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "guides_blocks_hero_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric
  );
  
  CREATE TABLE "guides_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_hero_background",
  	"variant" "enum_guides_blocks_hero_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_guides_blocks_hero_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_guides_blocks_hero_secondary_action_target" DEFAULT '_self',
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
  	"media_size" "enum_guides_blocks_hero_media_size" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_hero_extended_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "guides_blocks_hero_extended" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_hero_extended_background",
  	"variant" "enum_guides_blocks_hero_extended_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
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
  	"media_size" "enum_guides_blocks_hero_extended_media_size" DEFAULT 'wide',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_guides_blocks_hero_extended_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_guides_blocks_hero_extended_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_rich_text_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"html" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_side_by_side_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "guides_blocks_side_by_side_small_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "guides_blocks_side_by_side_bottom_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "guides_blocks_side_by_side_bottom_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "guides_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_side" "enum_guides_blocks_side_by_side_media_side" DEFAULT 'right',
  	"section_eyebrow" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"image_side" "enum_guides_blocks_side_by_side_image_side",
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum_guides_blocks_side_by_side_background" DEFAULT 'white',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_guides_blocks_side_by_side_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_guides_blocks_side_by_side_secondary_action_target" DEFAULT '_self',
  	"card_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "guides_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_story_background",
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
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum_guides_blocks_media_showcase_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar DEFAULT 'wrench',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "guides_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_guides_blocks_feature_grid_background" DEFAULT 'white',
  	"columns" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_agent_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
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
  	"link_target" "enum_guides_blocks_agent_capabilities_items_link_target" DEFAULT '_self'
  );
  
  CREATE TABLE "guides_blocks_agent_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_agent_capabilities_background",
  	"title" varchar,
  	"description" varchar,
  	"content_side" "enum_guides_blocks_agent_capabilities_content_side" DEFAULT 'left',
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"info_note" varchar,
  	"preview" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_agent_solutions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_guides_blocks_agent_solutions_items_icon" DEFAULT 'headset',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "guides_blocks_agent_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_agent_solutions_background",
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_contact_us_background",
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
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_concierge_flow_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "guides_blocks_concierge_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_concierge_flow_background",
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_guides_blocks_concierge_flow_button_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_enterprise_upgrade_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"included" varchar
  );
  
  CREATE TABLE "guides_blocks_enterprise_upgrade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_enterprise_upgrade_background",
  	"title" varchar,
  	"description" varchar,
  	"table_title" varchar,
  	"left_heading" varchar,
  	"right_heading" varchar,
  	"body_html" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"form_html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_channels_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_guides_blocks_channels_grid_cards_icon" DEFAULT 'sms',
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
  	"full_width" boolean DEFAULT false
  );
  
  CREATE TABLE "guides_blocks_channels_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_channels_grid_background",
  	"title" varchar,
  	"gradient_text" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_feature_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_guides_blocks_feature_stack_cards_icon" DEFAULT 'network',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "guides_blocks_feature_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_feature_stack_background",
  	"title" varchar,
  	"description" varchar,
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_coverage_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_guides_blocks_coverage_grid_cards_icon" DEFAULT 'flame',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "guides_blocks_coverage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_coverage_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_feature_rows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "guides_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_feature_rows_background",
  	"variant" "enum_guides_blocks_feature_rows_variant" DEFAULT 'capabilities',
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_capability_trio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_guides_blocks_capability_trio_cards_icon" DEFAULT 'messages-square',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "guides_blocks_capability_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_capability_trio_background",
  	"title" varchar,
  	"center_label" varchar DEFAULT 'Deterministic workflow engine',
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_capability_tools_cards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "guides_blocks_capability_tools_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"extra_tools" numeric DEFAULT 0
  );
  
  CREATE TABLE "guides_blocks_capability_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_capability_tools_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_use_cases_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_guides_blocks_use_cases_grid_cards_icon" DEFAULT 'shopping-cart',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "guides_blocks_use_cases_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_use_cases_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_security_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_guides_blocks_security_cards_icon" DEFAULT 'database_zap',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "guides_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_security_background" DEFAULT 'white',
  	"title" varchar,
  	"title_gradient" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_functional_capabilities_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_guides_blocks_functional_capabilities_cards_icon" DEFAULT 'filter',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"channels" varchar,
  	"width" "enum_guides_blocks_functional_capabilities_cards_width" DEFAULT 'default'
  );
  
  CREATE TABLE "guides_blocks_functional_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_functional_capabilities_background",
  	"preset" "enum_guides_blocks_functional_capabilities_preset" DEFAULT 'sales',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "guides_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'How it Works',
  	"gradient_text" varchar DEFAULT 'Works',
  	"subtitle" varchar DEFAULT 'From First Call to Live Agent in Days',
  	"background" "enum_guides_blocks_how_it_works_background" DEFAULT 'gray',
  	"open_first" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_guides_blocks_how_it_works_button_target" DEFAULT '_self',
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_cta_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_guides_blocks_cta_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_guides_blocks_cta_secondary_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "guides_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"background" "enum_guides_blocks_metrics_background" DEFAULT 'white',
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_results_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_target" "enum_guides_blocks_results_stats_items_link_target" DEFAULT '_self'
  );
  
  CREATE TABLE "guides_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_results_stats_background" DEFAULT 'white',
  	"title" varchar NOT NULL,
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"heading" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "guides_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_stats_cards_background" DEFAULT 'white',
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_capability_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "guides_blocks_capability_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_guides_blocks_capability_strip_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_live_in_days_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_guides_blocks_live_in_days_items_icon" DEFAULT 'code-xml',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "guides_blocks_live_in_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_live_in_days_background",
  	"eyebrow" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "guides_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_faq_background",
  	"title" varchar NOT NULL,
  	"title_gradient" varchar,
  	"description" varchar,
  	"search_placeholder" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_news_insights_collections" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_guides_blocks_news_insights_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "guides_blocks_news_insights_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "guides_blocks_news_insights_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar
  );
  
  CREATE TABLE "guides_blocks_news_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_news_insights_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"mode" "enum_guides_blocks_news_insights_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_content_feed_collections" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_guides_blocks_content_feed_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "guides_blocks_content_feed_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "guides_blocks_content_feed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar
  );
  
  CREATE TABLE "guides_blocks_content_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_content_feed_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"mode" "enum_guides_blocks_content_feed_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_pricing_cards_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "guides_blocks_pricing_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"accent" "enum_guides_blocks_pricing_cards_cards_accent" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_guides_blocks_pricing_cards_cards_button_target" DEFAULT '_self'
  );
  
  CREATE TABLE "guides_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_guides_blocks_pricing_cards_background" DEFAULT 'gray',
  	"info" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_pricing_details_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "guides_blocks_pricing_details_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"strong" boolean DEFAULT false,
  	"accent" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"stars" boolean DEFAULT false
  );
  
  CREATE TABLE "guides_blocks_pricing_details_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "guides_blocks_pricing_details_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_guides_blocks_pricing_details_sections_background" DEFAULT 'gray',
  	"variant" "enum_guides_blocks_pricing_details_sections_variant" DEFAULT 'default',
  	"title" varchar,
  	"info" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "guides_blocks_pricing_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_pricing_details_background",
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_difference_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "guides_blocks_difference_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "guides_blocks_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_difference_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"left_title" varchar,
  	"right_title" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_guides_blocks_difference_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_pain_points_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_title" varchar,
  	"left_description" varchar,
  	"right_title" varchar,
  	"right_description" varchar
  );
  
  CREATE TABLE "guides_blocks_pain_points_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_pain_points_comparison_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"show_column_headings" boolean DEFAULT false,
  	"left_heading" varchar DEFAULT 'The Challenge',
  	"right_heading" varchar DEFAULT 'Your AI Agent',
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_guides_blocks_pain_points_comparison_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_pricing_policy_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_guides_blocks_pricing_policy_callouts_icon" DEFAULT 'wallet',
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "guides_blocks_pricing_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_pricing_policy_background" DEFAULT 'white',
  	"title" varchar,
  	"info" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_industry_expertise_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_guides_blocks_industry_expertise_items_icon",
  	"custom_icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "guides_blocks_industry_expertise_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"source" varchar
  );
  
  CREATE TABLE "guides_blocks_industry_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_industry_expertise_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"visual_type" "enum_guides_blocks_industry_expertise_visual_type" DEFAULT 'industry',
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_guides_blocks_industry_expertise_button_target" DEFAULT '_self',
  	"hide_bottom_controls" boolean DEFAULT false,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "guides_blocks_logo_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "guides_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_logo_strip_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_integrations_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric
  );
  
  CREATE TABLE "guides_blocks_integrations_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_integrations_banner_background",
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_logo_grid_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
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
  	"url" varchar
  );
  
  CREATE TABLE "guides_blocks_logo_grid_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "guides_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_logo_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_tabs_showcase_tabs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric
  );
  
  CREATE TABLE "guides_blocks_tabs_showcase_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric
  );
  
  CREATE TABLE "guides_blocks_tabs_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_tabs_showcase_background" DEFAULT 'gray',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"autoplay_seconds" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_anchor_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "guides_blocks_anchor_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_anchor_nav_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_source_id" varchar,
  	"author_image_src" varchar,
  	"author_image_alt" varchar DEFAULT '',
  	"author_image_width" numeric,
  	"author_image_height" numeric
  );
  
  CREATE TABLE "guides_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_testimonials_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_comparison_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_guides_blocks_comparison_grid_cards_action_target" DEFAULT '_self'
  );
  
  CREATE TABLE "guides_blocks_comparison_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_guides_blocks_comparison_grid_background",
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_use_case_flow_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "guides_blocks_use_case_flow_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "guides_blocks_use_case_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_guides_blocks_use_case_flow_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_article_meta_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "guides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"excerpt" varchar,
  	"featured_image_id" integer,
  	"source_featured_image_source_id" varchar,
  	"source_featured_image_src" varchar,
  	"source_featured_image_alt" varchar,
  	"source_featured_image_width" numeric,
  	"source_featured_image_height" numeric,
  	"slug" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"path" varchar NOT NULL,
  	"status" "enum_guides_status" DEFAULT 'draft',
  	"template" "enum_guides_template" DEFAULT 'guide',
  	"article_meta_category" varchar,
  	"article_meta_author_name" varchar,
  	"article_meta_updated_at" timestamp(3) with time zone,
  	"article_meta_read_time_minutes" numeric,
  	"article_meta_rating_average" numeric,
  	"article_meta_rating_count" numeric,
  	"article_meta_views" numeric,
  	"article_meta_show_table_of_contents" boolean DEFAULT true,
  	"article_meta_show_table_of_contents_title" boolean DEFAULT true,
  	"article_meta_table_of_contents_title" varchar DEFAULT 'Contents',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_robots" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_source_id" varchar,
  	"seo_og_image_src" varchar,
  	"seo_og_image_alt" varchar DEFAULT '',
  	"seo_og_image_width" numeric,
  	"seo_og_image_height" numeric,
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_source_id" varchar,
  	"seo_twitter_image_src" varchar,
  	"seo_twitter_image_alt" varchar DEFAULT '',
  	"seo_twitter_image_width" numeric,
  	"seo_twitter_image_height" numeric,
  	"seo_schema_json" jsonb,
  	"content_key" varchar,
  	"import_trace" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tips_tip_card_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "tips_blocks_hero_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric
  );
  
  CREATE TABLE "tips_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_hero_background",
  	"variant" "enum_tips_blocks_hero_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_tips_blocks_hero_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_tips_blocks_hero_secondary_action_target" DEFAULT '_self',
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
  	"media_size" "enum_tips_blocks_hero_media_size" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_hero_extended_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "tips_blocks_hero_extended" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_hero_extended_background",
  	"variant" "enum_tips_blocks_hero_extended_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
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
  	"media_size" "enum_tips_blocks_hero_extended_media_size" DEFAULT 'wide',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_tips_blocks_hero_extended_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_tips_blocks_hero_extended_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_rich_text_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"html" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_side_by_side_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "tips_blocks_side_by_side_small_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "tips_blocks_side_by_side_bottom_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "tips_blocks_side_by_side_bottom_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "tips_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_side" "enum_tips_blocks_side_by_side_media_side" DEFAULT 'right',
  	"section_eyebrow" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"image_side" "enum_tips_blocks_side_by_side_image_side",
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum_tips_blocks_side_by_side_background" DEFAULT 'white',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_tips_blocks_side_by_side_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_tips_blocks_side_by_side_secondary_action_target" DEFAULT '_self',
  	"card_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "tips_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_story_background",
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
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum_tips_blocks_media_showcase_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar DEFAULT 'wrench',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "tips_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_tips_blocks_feature_grid_background" DEFAULT 'white',
  	"columns" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_agent_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
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
  	"link_target" "enum_tips_blocks_agent_capabilities_items_link_target" DEFAULT '_self'
  );
  
  CREATE TABLE "tips_blocks_agent_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_agent_capabilities_background",
  	"title" varchar,
  	"description" varchar,
  	"content_side" "enum_tips_blocks_agent_capabilities_content_side" DEFAULT 'left',
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"info_note" varchar,
  	"preview" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_agent_solutions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_tips_blocks_agent_solutions_items_icon" DEFAULT 'headset',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "tips_blocks_agent_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_agent_solutions_background",
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_contact_us_background",
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
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_concierge_flow_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "tips_blocks_concierge_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_concierge_flow_background",
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_tips_blocks_concierge_flow_button_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_enterprise_upgrade_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"included" varchar
  );
  
  CREATE TABLE "tips_blocks_enterprise_upgrade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_enterprise_upgrade_background",
  	"title" varchar,
  	"description" varchar,
  	"table_title" varchar,
  	"left_heading" varchar,
  	"right_heading" varchar,
  	"body_html" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"form_html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_channels_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_tips_blocks_channels_grid_cards_icon" DEFAULT 'sms',
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
  	"full_width" boolean DEFAULT false
  );
  
  CREATE TABLE "tips_blocks_channels_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_channels_grid_background",
  	"title" varchar,
  	"gradient_text" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_feature_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_tips_blocks_feature_stack_cards_icon" DEFAULT 'network',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "tips_blocks_feature_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_feature_stack_background",
  	"title" varchar,
  	"description" varchar,
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_coverage_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_tips_blocks_coverage_grid_cards_icon" DEFAULT 'flame',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "tips_blocks_coverage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_coverage_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_feature_rows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "tips_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_feature_rows_background",
  	"variant" "enum_tips_blocks_feature_rows_variant" DEFAULT 'capabilities',
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_capability_trio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_tips_blocks_capability_trio_cards_icon" DEFAULT 'messages-square',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "tips_blocks_capability_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_capability_trio_background",
  	"title" varchar,
  	"center_label" varchar DEFAULT 'Deterministic workflow engine',
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_capability_tools_cards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "tips_blocks_capability_tools_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"extra_tools" numeric DEFAULT 0
  );
  
  CREATE TABLE "tips_blocks_capability_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_capability_tools_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_use_cases_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_tips_blocks_use_cases_grid_cards_icon" DEFAULT 'shopping-cart',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "tips_blocks_use_cases_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_use_cases_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_security_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_tips_blocks_security_cards_icon" DEFAULT 'database_zap',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "tips_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_security_background" DEFAULT 'white',
  	"title" varchar,
  	"title_gradient" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_functional_capabilities_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_tips_blocks_functional_capabilities_cards_icon" DEFAULT 'filter',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"channels" varchar,
  	"width" "enum_tips_blocks_functional_capabilities_cards_width" DEFAULT 'default'
  );
  
  CREATE TABLE "tips_blocks_functional_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_functional_capabilities_background",
  	"preset" "enum_tips_blocks_functional_capabilities_preset" DEFAULT 'sales',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "tips_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'How it Works',
  	"gradient_text" varchar DEFAULT 'Works',
  	"subtitle" varchar DEFAULT 'From First Call to Live Agent in Days',
  	"background" "enum_tips_blocks_how_it_works_background" DEFAULT 'gray',
  	"open_first" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_tips_blocks_how_it_works_button_target" DEFAULT '_self',
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_cta_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_tips_blocks_cta_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_tips_blocks_cta_secondary_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "tips_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"background" "enum_tips_blocks_metrics_background" DEFAULT 'white',
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_results_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_target" "enum_tips_blocks_results_stats_items_link_target" DEFAULT '_self'
  );
  
  CREATE TABLE "tips_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_results_stats_background" DEFAULT 'white',
  	"title" varchar NOT NULL,
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"heading" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "tips_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_stats_cards_background" DEFAULT 'white',
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_capability_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "tips_blocks_capability_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_tips_blocks_capability_strip_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_live_in_days_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_tips_blocks_live_in_days_items_icon" DEFAULT 'code-xml',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "tips_blocks_live_in_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_live_in_days_background",
  	"eyebrow" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "tips_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_faq_background",
  	"title" varchar NOT NULL,
  	"title_gradient" varchar,
  	"description" varchar,
  	"search_placeholder" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_news_insights_collections" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_tips_blocks_news_insights_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tips_blocks_news_insights_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "tips_blocks_news_insights_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar
  );
  
  CREATE TABLE "tips_blocks_news_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_news_insights_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"mode" "enum_tips_blocks_news_insights_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_content_feed_collections" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_tips_blocks_content_feed_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tips_blocks_content_feed_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "tips_blocks_content_feed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar
  );
  
  CREATE TABLE "tips_blocks_content_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_content_feed_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"mode" "enum_tips_blocks_content_feed_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_pricing_cards_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "tips_blocks_pricing_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"accent" "enum_tips_blocks_pricing_cards_cards_accent" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_tips_blocks_pricing_cards_cards_button_target" DEFAULT '_self'
  );
  
  CREATE TABLE "tips_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_tips_blocks_pricing_cards_background" DEFAULT 'gray',
  	"info" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_pricing_details_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "tips_blocks_pricing_details_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"strong" boolean DEFAULT false,
  	"accent" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"stars" boolean DEFAULT false
  );
  
  CREATE TABLE "tips_blocks_pricing_details_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tips_blocks_pricing_details_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_tips_blocks_pricing_details_sections_background" DEFAULT 'gray',
  	"variant" "enum_tips_blocks_pricing_details_sections_variant" DEFAULT 'default',
  	"title" varchar,
  	"info" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "tips_blocks_pricing_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_pricing_details_background",
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_difference_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "tips_blocks_difference_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "tips_blocks_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_difference_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"left_title" varchar,
  	"right_title" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_tips_blocks_difference_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_pain_points_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_title" varchar,
  	"left_description" varchar,
  	"right_title" varchar,
  	"right_description" varchar
  );
  
  CREATE TABLE "tips_blocks_pain_points_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_pain_points_comparison_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"show_column_headings" boolean DEFAULT false,
  	"left_heading" varchar DEFAULT 'The Challenge',
  	"right_heading" varchar DEFAULT 'Your AI Agent',
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_tips_blocks_pain_points_comparison_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_pricing_policy_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_tips_blocks_pricing_policy_callouts_icon" DEFAULT 'wallet',
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "tips_blocks_pricing_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_pricing_policy_background" DEFAULT 'white',
  	"title" varchar,
  	"info" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_industry_expertise_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_tips_blocks_industry_expertise_items_icon",
  	"custom_icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "tips_blocks_industry_expertise_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"source" varchar
  );
  
  CREATE TABLE "tips_blocks_industry_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_industry_expertise_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"visual_type" "enum_tips_blocks_industry_expertise_visual_type" DEFAULT 'industry',
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_tips_blocks_industry_expertise_button_target" DEFAULT '_self',
  	"hide_bottom_controls" boolean DEFAULT false,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "tips_blocks_logo_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "tips_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_logo_strip_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_integrations_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric
  );
  
  CREATE TABLE "tips_blocks_integrations_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_integrations_banner_background",
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_logo_grid_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
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
  	"url" varchar
  );
  
  CREATE TABLE "tips_blocks_logo_grid_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "tips_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_logo_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_tabs_showcase_tabs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric
  );
  
  CREATE TABLE "tips_blocks_tabs_showcase_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric
  );
  
  CREATE TABLE "tips_blocks_tabs_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_tabs_showcase_background" DEFAULT 'gray',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"autoplay_seconds" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_anchor_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "tips_blocks_anchor_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_anchor_nav_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_source_id" varchar,
  	"author_image_src" varchar,
  	"author_image_alt" varchar DEFAULT '',
  	"author_image_width" numeric,
  	"author_image_height" numeric
  );
  
  CREATE TABLE "tips_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_testimonials_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_comparison_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_tips_blocks_comparison_grid_cards_action_target" DEFAULT '_self'
  );
  
  CREATE TABLE "tips_blocks_comparison_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_tips_blocks_comparison_grid_background",
  	"block_name" varchar
  );
  
  CREATE TABLE "tips_blocks_use_case_flow_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "tips_blocks_use_case_flow_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "tips_blocks_use_case_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_tips_blocks_use_case_flow_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "tips" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content_key" varchar,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar,
  	"tip_card_category" varchar,
  	"tip_card_archive_width" numeric DEFAULT 1,
  	"tip_card_source_icons" jsonb,
  	"published_at" varchar,
  	"path" varchar NOT NULL,
  	"status" "enum_tips_status" DEFAULT 'draft',
  	"template" "enum_tips_template" DEFAULT 'tip',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_robots" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_source_id" varchar,
  	"seo_og_image_src" varchar,
  	"seo_og_image_alt" varchar DEFAULT '',
  	"seo_og_image_width" numeric,
  	"seo_og_image_height" numeric,
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_source_id" varchar,
  	"seo_twitter_image_src" varchar,
  	"seo_twitter_image_alt" varchar DEFAULT '',
  	"seo_twitter_image_width" numeric,
  	"seo_twitter_image_height" numeric,
  	"seo_schema_json" jsonb,
  	"import_trace" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_hero_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric
  );
  
  CREATE TABLE "use_cases_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_hero_background",
  	"variant" "enum_use_cases_blocks_hero_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_use_cases_blocks_hero_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_use_cases_blocks_hero_secondary_action_target" DEFAULT '_self',
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
  	"media_size" "enum_use_cases_blocks_hero_media_size" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_hero_extended_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "use_cases_blocks_hero_extended" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_hero_extended_background",
  	"variant" "enum_use_cases_blocks_hero_extended_variant" DEFAULT 'default',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
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
  	"media_size" "enum_use_cases_blocks_hero_extended_media_size" DEFAULT 'wide',
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_use_cases_blocks_hero_extended_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_use_cases_blocks_hero_extended_secondary_action_target" DEFAULT '_self',
  	"primary_note" varchar,
  	"secondary_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_rich_text_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"html" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_side_by_side_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "use_cases_blocks_side_by_side_small_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "use_cases_blocks_side_by_side_bottom_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "use_cases_blocks_side_by_side_bottom_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "use_cases_blocks_side_by_side" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"media_source_id" varchar,
  	"media_src" varchar,
  	"media_alt" varchar DEFAULT '',
  	"media_width" numeric,
  	"media_height" numeric,
  	"media_side" "enum_use_cases_blocks_side_by_side_media_side" DEFAULT 'right',
  	"section_eyebrow" varchar,
  	"section_title" varchar,
  	"section_subtitle" varchar,
  	"image_side" "enum_use_cases_blocks_side_by_side_image_side",
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum_use_cases_blocks_side_by_side_background" DEFAULT 'white',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"card_description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_use_cases_blocks_side_by_side_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_use_cases_blocks_side_by_side_secondary_action_target" DEFAULT '_self',
  	"card_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "use_cases_blocks_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_story_background",
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
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_media_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"background" "enum_use_cases_blocks_media_showcase_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_feature_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar DEFAULT 'wrench',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "use_cases_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_use_cases_blocks_feature_grid_background" DEFAULT 'white',
  	"columns" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_agent_capabilities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
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
  	"link_target" "enum_use_cases_blocks_agent_capabilities_items_link_target" DEFAULT '_self'
  );
  
  CREATE TABLE "use_cases_blocks_agent_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_agent_capabilities_background",
  	"title" varchar,
  	"description" varchar,
  	"content_side" "enum_use_cases_blocks_agent_capabilities_content_side" DEFAULT 'left',
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"info_note" varchar,
  	"preview" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_agent_solutions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_use_cases_blocks_agent_solutions_items_icon" DEFAULT 'headset',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"href" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "use_cases_blocks_agent_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_agent_solutions_background",
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_contact_us_background",
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
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_concierge_flow_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "use_cases_blocks_concierge_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_concierge_flow_background",
  	"title" varchar,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_use_cases_blocks_concierge_flow_button_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_enterprise_upgrade_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"included" varchar
  );
  
  CREATE TABLE "use_cases_blocks_enterprise_upgrade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_enterprise_upgrade_background",
  	"title" varchar,
  	"description" varchar,
  	"table_title" varchar,
  	"left_heading" varchar,
  	"right_heading" varchar,
  	"body_html" varchar,
  	"form_title" varchar,
  	"form_description" varchar,
  	"form_html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_channels_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_use_cases_blocks_channels_grid_cards_icon" DEFAULT 'sms',
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
  	"full_width" boolean DEFAULT false
  );
  
  CREATE TABLE "use_cases_blocks_channels_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_channels_grid_background",
  	"title" varchar,
  	"gradient_text" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_feature_stack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_use_cases_blocks_feature_stack_cards_icon" DEFAULT 'network',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "use_cases_blocks_feature_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_feature_stack_background",
  	"title" varchar,
  	"description" varchar,
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_coverage_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_use_cases_blocks_coverage_grid_cards_icon" DEFAULT 'flame',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "use_cases_blocks_coverage_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_coverage_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_feature_rows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "use_cases_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_feature_rows_background",
  	"variant" "enum_use_cases_blocks_feature_rows_variant" DEFAULT 'capabilities',
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_capability_trio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_use_cases_blocks_capability_trio_cards_icon" DEFAULT 'messages-square',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "use_cases_blocks_capability_trio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_capability_trio_background",
  	"title" varchar,
  	"center_label" varchar DEFAULT 'Deterministic workflow engine',
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_capability_tools_cards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "use_cases_blocks_capability_tools_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"extra_tools" numeric DEFAULT 0
  );
  
  CREATE TABLE "use_cases_blocks_capability_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_capability_tools_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_use_cases_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_use_cases_blocks_use_cases_grid_cards_icon" DEFAULT 'shopping-cart',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "use_cases_blocks_use_cases_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_use_cases_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_security_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_use_cases_blocks_security_cards_icon" DEFAULT 'database_zap',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "use_cases_blocks_security" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_security_background" DEFAULT 'white',
  	"title" varchar,
  	"title_gradient" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_functional_capabilities_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_use_cases_blocks_functional_capabilities_cards_icon" DEFAULT 'filter',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"title" varchar,
  	"description" varchar,
  	"channels" varchar,
  	"width" "enum_use_cases_blocks_functional_capabilities_cards_width" DEFAULT 'default'
  );
  
  CREATE TABLE "use_cases_blocks_functional_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_functional_capabilities_background",
  	"preset" "enum_use_cases_blocks_functional_capabilities_preset" DEFAULT 'sales',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "use_cases_blocks_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'How it Works',
  	"gradient_text" varchar DEFAULT 'Works',
  	"subtitle" varchar DEFAULT 'From First Call to Live Agent in Days',
  	"background" "enum_use_cases_blocks_how_it_works_background" DEFAULT 'gray',
  	"open_first" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_use_cases_blocks_how_it_works_button_target" DEFAULT '_self',
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_cta_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_target" "enum_use_cases_blocks_cta_primary_action_target" DEFAULT '_self',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_target" "enum_use_cases_blocks_cta_secondary_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "use_cases_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"background" "enum_use_cases_blocks_metrics_background" DEFAULT 'white',
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_results_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_target" "enum_use_cases_blocks_results_stats_items_link_target" DEFAULT '_self'
  );
  
  CREATE TABLE "use_cases_blocks_results_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_results_stats_background" DEFAULT 'white',
  	"title" varchar NOT NULL,
  	"info_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"heading" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_stats_cards_background" DEFAULT 'white',
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_capability_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_capability_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_use_cases_blocks_capability_strip_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_live_in_days_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_use_cases_blocks_live_in_days_items_icon" DEFAULT 'code-xml',
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_live_in_days" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_live_in_days_background",
  	"eyebrow" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "use_cases_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_faq_background",
  	"title" varchar NOT NULL,
  	"title_gradient" varchar,
  	"description" varchar,
  	"search_placeholder" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_news_insights_collections" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_use_cases_blocks_news_insights_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_news_insights_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_news_insights_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar
  );
  
  CREATE TABLE "use_cases_blocks_news_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_news_insights_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"mode" "enum_use_cases_blocks_news_insights_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_content_feed_collections" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_use_cases_blocks_content_feed_collections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_content_feed_cards_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_content_feed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric,
  	"meta" varchar,
  	"read_time" varchar
  );
  
  CREATE TABLE "use_cases_blocks_content_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_content_feed_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"mode" "enum_use_cases_blocks_content_feed_mode" DEFAULT 'latest',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_pricing_cards_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_pricing_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"accent" "enum_use_cases_blocks_pricing_cards_cards_accent" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"note" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_use_cases_blocks_pricing_cards_cards_button_target" DEFAULT '_self'
  );
  
  CREATE TABLE "use_cases_blocks_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_use_cases_blocks_pricing_cards_background" DEFAULT 'gray',
  	"info" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_pricing_details_sections_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_pricing_details_sections_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"strong" boolean DEFAULT false,
  	"accent" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"stars" boolean DEFAULT false
  );
  
  CREATE TABLE "use_cases_blocks_pricing_details_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_pricing_details_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_use_cases_blocks_pricing_details_sections_background" DEFAULT 'gray',
  	"variant" "enum_use_cases_blocks_pricing_details_sections_variant" DEFAULT 'default',
  	"title" varchar,
  	"info" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "use_cases_blocks_pricing_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_pricing_details_background",
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_difference_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "use_cases_blocks_difference_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "use_cases_blocks_difference" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_difference_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"left_title" varchar,
  	"right_title" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_use_cases_blocks_difference_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_pain_points_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_title" varchar,
  	"left_description" varchar,
  	"right_title" varchar,
  	"right_description" varchar
  );
  
  CREATE TABLE "use_cases_blocks_pain_points_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_pain_points_comparison_background" DEFAULT 'white',
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"show_column_headings" boolean DEFAULT false,
  	"left_heading" varchar DEFAULT 'The Challenge',
  	"right_heading" varchar DEFAULT 'Your AI Agent',
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_use_cases_blocks_pain_points_comparison_action_target" DEFAULT '_self',
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_pricing_policy_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_use_cases_blocks_pricing_policy_callouts_icon" DEFAULT 'wallet',
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_pricing_policy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_pricing_policy_background" DEFAULT 'white',
  	"title" varchar,
  	"info" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_industry_expertise_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_use_cases_blocks_industry_expertise_items_icon",
  	"custom_icon" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "use_cases_blocks_industry_expertise_info_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"source" varchar
  );
  
  CREATE TABLE "use_cases_blocks_industry_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_industry_expertise_background",
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"visual_type" "enum_use_cases_blocks_industry_expertise_visual_type" DEFAULT 'industry',
  	"button_label" varchar,
  	"button_href" varchar,
  	"button_target" "enum_use_cases_blocks_industry_expertise_button_target" DEFAULT '_self',
  	"hide_bottom_controls" boolean DEFAULT false,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_logo_strip_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"image_source_id" varchar,
  	"image_src" varchar,
  	"image_alt" varchar DEFAULT '',
  	"image_width" numeric,
  	"image_height" numeric
  );
  
  CREATE TABLE "use_cases_blocks_logo_strip_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "use_cases_blocks_logo_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_logo_strip_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_integrations_banner_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_source_id" varchar,
  	"icon_src" varchar,
  	"icon_alt" varchar DEFAULT '',
  	"icon_width" numeric,
  	"icon_height" numeric
  );
  
  CREATE TABLE "use_cases_blocks_integrations_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_integrations_banner_background",
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_logo_grid_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
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
  	"url" varchar
  );
  
  CREATE TABLE "use_cases_blocks_logo_grid_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "use_cases_blocks_logo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_logo_grid_background",
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_tabs_showcase_tabs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric
  );
  
  CREATE TABLE "use_cases_blocks_tabs_showcase_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" varchar,
  	"custom_icon_source_id" varchar,
  	"custom_icon_src" varchar,
  	"custom_icon_alt" varchar DEFAULT '',
  	"custom_icon_width" numeric,
  	"custom_icon_height" numeric
  );
  
  CREATE TABLE "use_cases_blocks_tabs_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_tabs_showcase_background" DEFAULT 'gray',
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"autoplay_seconds" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_anchor_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "use_cases_blocks_anchor_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_anchor_nav_background" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_source_id" varchar,
  	"author_image_src" varchar,
  	"author_image_alt" varchar DEFAULT '',
  	"author_image_width" numeric,
  	"author_image_height" numeric
  );
  
  CREATE TABLE "use_cases_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_testimonials_background",
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_comparison_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"action_target" "enum_use_cases_blocks_comparison_grid_cards_action_target" DEFAULT '_self'
  );
  
  CREATE TABLE "use_cases_blocks_comparison_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"background" "enum_use_cases_blocks_comparison_grid_background",
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases_blocks_use_case_flow_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "use_cases_blocks_use_case_flow_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "use_cases_blocks_use_case_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"root_anchor" varchar,
  	"root_class_name" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"background" "enum_use_cases_blocks_use_case_flow_background" DEFAULT 'gray',
  	"block_name" varchar
  );
  
  CREATE TABLE "use_cases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content_key" varchar,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar,
  	"published_at" varchar,
  	"path" varchar NOT NULL,
  	"status" "enum_use_cases_status" DEFAULT 'draft',
  	"template" "enum_use_cases_template" DEFAULT 'use-case',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_canonical_url" varchar,
  	"seo_robots" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_source_id" varchar,
  	"seo_og_image_src" varchar,
  	"seo_og_image_alt" varchar DEFAULT '',
  	"seo_og_image_width" numeric,
  	"seo_og_image_height" numeric,
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_source_id" varchar,
  	"seo_twitter_image_src" varchar,
  	"seo_twitter_image_alt" varchar DEFAULT '',
  	"seo_twitter_image_width" numeric,
  	"seo_twitter_image_height" numeric,
  	"seo_schema_json" jsonb,
  	"import_trace" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "forms_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_forms_fields_type" NOT NULL,
  	"required" boolean DEFAULT false
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"intent" "enum_forms_intent" NOT NULL,
  	"description" varchar,
  	"success_behavior_message" varchar,
  	"success_behavior_redirect_path" varchar,
  	"notification_config_key" varchar,
  	"crm_config_key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_functions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intent" "enum_form_submissions_intent" NOT NULL,
  	"status" "enum_form_submissions_status" DEFAULT 'new',
  	"name" varchar,
  	"first_name" varchar,
  	"last_name" varchar,
  	"title" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"company" varchar,
  	"company_website" varchar,
  	"industry" varchar,
  	"department" varchar,
  	"team_size" varchar,
  	"message" varchar,
  	"consent" boolean DEFAULT false,
  	"tracking_referrer" varchar,
  	"tracking_utm_source" varchar,
  	"tracking_utm_medium" varchar,
  	"tracking_utm_campaign" varchar,
  	"tracking_source" varchar,
  	"tracking_all_pages_visited" varchar,
  	"tracking_first_page_visited" varchar,
  	"tracking_visitor_country" varchar,
  	"tracking_visitor_city" varchar,
  	"tracking_visitor_continent" varchar,
  	"tracking_visitor_calling_code" varchar,
  	"tracking_visitor_channel" varchar,
  	"tracking_current_time" varchar,
  	"delivery_payload_stored" boolean DEFAULT false,
  	"delivery_formspree_sent" boolean DEFAULT false,
  	"delivery_email_sent" boolean DEFAULT false,
  	"delivery_webhook_sent" boolean DEFAULT false,
  	"delivery_error" varchar,
  	"metadata_received_at" timestamp(3) with time zone NOT NULL,
  	"metadata_ip" varchar,
  	"metadata_user_agent" varchar,
  	"raw" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_key" varchar,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar,
  	"status" "enum_faq_items_status" DEFAULT 'draft',
  	"sort_order" numeric DEFAULT 0,
  	"import_trace" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_key" varchar,
  	"quote" varchar NOT NULL,
  	"author_name" varchar NOT NULL,
  	"author_role" varchar,
  	"author_image_id" integer,
  	"status" "enum_testimonials_status" DEFAULT 'draft',
  	"sort_order" numeric DEFAULT 0,
  	"import_trace" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"pages_find" boolean DEFAULT false,
  	"pages_create" boolean DEFAULT false,
  	"pages_update" boolean DEFAULT false,
  	"posts_find" boolean DEFAULT false,
  	"posts_create" boolean DEFAULT false,
  	"posts_update" boolean DEFAULT false,
  	"news_find" boolean DEFAULT false,
  	"news_create" boolean DEFAULT false,
  	"news_update" boolean DEFAULT false,
  	"guides_find" boolean DEFAULT false,
  	"guides_create" boolean DEFAULT false,
  	"guides_update" boolean DEFAULT false,
  	"tips_find" boolean DEFAULT false,
  	"tips_create" boolean DEFAULT false,
  	"tips_update" boolean DEFAULT false,
  	"use_cases_find" boolean DEFAULT false,
  	"use_cases_create" boolean DEFAULT false,
  	"use_cases_update" boolean DEFAULT false,
  	"forms_find" boolean DEFAULT false,
  	"forms_create" boolean DEFAULT false,
  	"forms_update" boolean DEFAULT false,
  	"media_find" boolean DEFAULT false,
  	"site_settings_find" boolean DEFAULT false,
  	"site_settings_update" boolean DEFAULT false,
  	"payload_mcp_resource_content_block_guide" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"news_id" integer,
  	"guides_id" integer,
  	"tips_id" integer,
  	"use_cases_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"faq_items_id" integer,
  	"testimonials_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_primary_navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"icon" varchar,
  	"role" "enum_site_settings_primary_navigation_items_role" DEFAULT 'link',
  	"start_column" boolean,
  	"start_row" boolean
  );
  
  CREATE TABLE "site_settings_primary_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"variant" "enum_site_settings_primary_navigation_variant" DEFAULT 'link'
  );
  
  CREATE TABLE "site_settings_footer_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Acme' NOT NULL,
  	"site_url" varchar DEFAULT 'https://acme.example' NOT NULL,
  	"default_seo_meta_title" varchar,
  	"default_seo_meta_description" varchar,
  	"default_seo_social_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_cards" ADD CONSTRAINT "pages_blocks_hero_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_extended_cards" ADD CONSTRAINT "pages_blocks_hero_extended_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_extended"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_extended" ADD CONSTRAINT "pages_blocks_hero_extended_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_side_by_side_bullets" ADD CONSTRAINT "pages_blocks_side_by_side_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_side_by_side_small_icons" ADD CONSTRAINT "pages_blocks_side_by_side_small_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_side_by_side_bottom_cards_items" ADD CONSTRAINT "pages_blocks_side_by_side_bottom_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_side_by_side_bottom_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_side_by_side_bottom_cards" ADD CONSTRAINT "pages_blocks_side_by_side_bottom_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_side_by_side" ADD CONSTRAINT "pages_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_cards" ADD CONSTRAINT "pages_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_story" ADD CONSTRAINT "pages_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_showcase" ADD CONSTRAINT "pages_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_cards" ADD CONSTRAINT "pages_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_agent_capabilities_items" ADD CONSTRAINT "pages_blocks_agent_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_agent_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_agent_capabilities" ADD CONSTRAINT "pages_blocks_agent_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_agent_solutions_items" ADD CONSTRAINT "pages_blocks_agent_solutions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_agent_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_agent_solutions" ADD CONSTRAINT "pages_blocks_agent_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us" ADD CONSTRAINT "pages_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_concierge_flow_cards" ADD CONSTRAINT "pages_blocks_concierge_flow_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_concierge_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_concierge_flow" ADD CONSTRAINT "pages_blocks_concierge_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_enterprise_upgrade_benefits" ADD CONSTRAINT "pages_blocks_enterprise_upgrade_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_enterprise_upgrade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_enterprise_upgrade" ADD CONSTRAINT "pages_blocks_enterprise_upgrade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_channels_grid_cards" ADD CONSTRAINT "pages_blocks_channels_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_channels_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_channels_grid" ADD CONSTRAINT "pages_blocks_channels_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_stack_cards" ADD CONSTRAINT "pages_blocks_feature_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_stack" ADD CONSTRAINT "pages_blocks_feature_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_coverage_grid_cards" ADD CONSTRAINT "pages_blocks_coverage_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_coverage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_coverage_grid" ADD CONSTRAINT "pages_blocks_coverage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_rows_rows" ADD CONSTRAINT "pages_blocks_feature_rows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_rows" ADD CONSTRAINT "pages_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capability_trio_cards" ADD CONSTRAINT "pages_blocks_capability_trio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capability_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capability_trio" ADD CONSTRAINT "pages_blocks_capability_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capability_tools_cards_logos" ADD CONSTRAINT "pages_blocks_capability_tools_cards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capability_tools_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capability_tools_cards" ADD CONSTRAINT "pages_blocks_capability_tools_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capability_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capability_tools" ADD CONSTRAINT "pages_blocks_capability_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_use_cases_grid_cards" ADD CONSTRAINT "pages_blocks_use_cases_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_use_cases_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_use_cases_grid" ADD CONSTRAINT "pages_blocks_use_cases_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_security_cards" ADD CONSTRAINT "pages_blocks_security_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_security" ADD CONSTRAINT "pages_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_functional_capabilities_cards" ADD CONSTRAINT "pages_blocks_functional_capabilities_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_functional_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_functional_capabilities" ADD CONSTRAINT "pages_blocks_functional_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_steps" ADD CONSTRAINT "pages_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works" ADD CONSTRAINT "pages_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics_items" ADD CONSTRAINT "pages_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics" ADD CONSTRAINT "pages_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_results_stats_items" ADD CONSTRAINT "pages_blocks_results_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_results_stats" ADD CONSTRAINT "pages_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_cards_items" ADD CONSTRAINT "pages_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_cards" ADD CONSTRAINT "pages_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capability_strip_items" ADD CONSTRAINT "pages_blocks_capability_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capability_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capability_strip" ADD CONSTRAINT "pages_blocks_capability_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_live_in_days_items" ADD CONSTRAINT "pages_blocks_live_in_days_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_live_in_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_live_in_days" ADD CONSTRAINT "pages_blocks_live_in_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_insights_collections" ADD CONSTRAINT "pages_blocks_news_insights_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_insights_cards_tags" ADD CONSTRAINT "pages_blocks_news_insights_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_news_insights_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_insights_cards" ADD CONSTRAINT "pages_blocks_news_insights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_news_insights" ADD CONSTRAINT "pages_blocks_news_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_feed_collections" ADD CONSTRAINT "pages_blocks_content_feed_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_feed_cards_tags" ADD CONSTRAINT "pages_blocks_content_feed_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_feed_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_feed_cards" ADD CONSTRAINT "pages_blocks_content_feed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_feed" ADD CONSTRAINT "pages_blocks_content_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_cards_cards_features" ADD CONSTRAINT "pages_blocks_pricing_cards_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_cards_cards" ADD CONSTRAINT "pages_blocks_pricing_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_cards" ADD CONSTRAINT "pages_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_details_sections_headers" ADD CONSTRAINT "pages_blocks_pricing_details_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_details_sections_rows_cells" ADD CONSTRAINT "pages_blocks_pricing_details_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_details_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_details_sections_rows" ADD CONSTRAINT "pages_blocks_pricing_details_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_details_sections" ADD CONSTRAINT "pages_blocks_pricing_details_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_details" ADD CONSTRAINT "pages_blocks_pricing_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_difference_left_items" ADD CONSTRAINT "pages_blocks_difference_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_difference_right_items" ADD CONSTRAINT "pages_blocks_difference_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_difference" ADD CONSTRAINT "pages_blocks_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pain_points_comparison_rows" ADD CONSTRAINT "pages_blocks_pain_points_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pain_points_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pain_points_comparison" ADD CONSTRAINT "pages_blocks_pain_points_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_policy_callouts" ADD CONSTRAINT "pages_blocks_pricing_policy_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_policy" ADD CONSTRAINT "pages_blocks_pricing_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industry_expertise_items" ADD CONSTRAINT "pages_blocks_industry_expertise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industry_expertise_info_cards" ADD CONSTRAINT "pages_blocks_industry_expertise_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_industry_expertise" ADD CONSTRAINT "pages_blocks_industry_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_strip_logos" ADD CONSTRAINT "pages_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_strip_stats" ADD CONSTRAINT "pages_blocks_logo_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_strip" ADD CONSTRAINT "pages_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_integrations_banner_items" ADD CONSTRAINT "pages_blocks_integrations_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_integrations_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_integrations_banner" ADD CONSTRAINT "pages_blocks_integrations_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_grid_columns_items" ADD CONSTRAINT "pages_blocks_logo_grid_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_grid_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_grid_columns" ADD CONSTRAINT "pages_blocks_logo_grid_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_grid" ADD CONSTRAINT "pages_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_showcase_tabs_steps" ADD CONSTRAINT "pages_blocks_tabs_showcase_tabs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs_showcase_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_showcase_tabs" ADD CONSTRAINT "pages_blocks_tabs_showcase_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_showcase" ADD CONSTRAINT "pages_blocks_tabs_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_anchor_nav_items" ADD CONSTRAINT "pages_blocks_anchor_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_anchor_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_anchor_nav" ADD CONSTRAINT "pages_blocks_anchor_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_grid_cards" ADD CONSTRAINT "pages_blocks_comparison_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_grid" ADD CONSTRAINT "pages_blocks_comparison_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_use_case_flow_columns_items" ADD CONSTRAINT "pages_blocks_use_case_flow_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_use_case_flow_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_use_case_flow_columns" ADD CONSTRAINT "pages_blocks_use_case_flow_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_use_case_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_use_case_flow" ADD CONSTRAINT "pages_blocks_use_case_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_cards" ADD CONSTRAINT "posts_blocks_hero_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_extended_cards" ADD CONSTRAINT "posts_blocks_hero_extended_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero_extended"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_extended" ADD CONSTRAINT "posts_blocks_hero_extended_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text" ADD CONSTRAINT "posts_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_side_by_side_bullets" ADD CONSTRAINT "posts_blocks_side_by_side_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_side_by_side_small_icons" ADD CONSTRAINT "posts_blocks_side_by_side_small_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_side_by_side_bottom_cards_items" ADD CONSTRAINT "posts_blocks_side_by_side_bottom_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_side_by_side_bottom_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_side_by_side_bottom_cards" ADD CONSTRAINT "posts_blocks_side_by_side_bottom_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_side_by_side" ADD CONSTRAINT "posts_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_story_cards" ADD CONSTRAINT "posts_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_story" ADD CONSTRAINT "posts_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_showcase" ADD CONSTRAINT "posts_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_grid_cards" ADD CONSTRAINT "posts_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_grid" ADD CONSTRAINT "posts_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_agent_capabilities_items" ADD CONSTRAINT "posts_blocks_agent_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_agent_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_agent_capabilities" ADD CONSTRAINT "posts_blocks_agent_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_agent_solutions_items" ADD CONSTRAINT "posts_blocks_agent_solutions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_agent_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_agent_solutions" ADD CONSTRAINT "posts_blocks_agent_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_contact_us" ADD CONSTRAINT "posts_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_concierge_flow_cards" ADD CONSTRAINT "posts_blocks_concierge_flow_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_concierge_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_concierge_flow" ADD CONSTRAINT "posts_blocks_concierge_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_enterprise_upgrade_benefits" ADD CONSTRAINT "posts_blocks_enterprise_upgrade_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_enterprise_upgrade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_enterprise_upgrade" ADD CONSTRAINT "posts_blocks_enterprise_upgrade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_channels_grid_cards" ADD CONSTRAINT "posts_blocks_channels_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_channels_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_channels_grid" ADD CONSTRAINT "posts_blocks_channels_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_stack_cards" ADD CONSTRAINT "posts_blocks_feature_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_feature_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_stack" ADD CONSTRAINT "posts_blocks_feature_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_coverage_grid_cards" ADD CONSTRAINT "posts_blocks_coverage_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_coverage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_coverage_grid" ADD CONSTRAINT "posts_blocks_coverage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_rows_rows" ADD CONSTRAINT "posts_blocks_feature_rows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_feature_rows" ADD CONSTRAINT "posts_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_capability_trio_cards" ADD CONSTRAINT "posts_blocks_capability_trio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_capability_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_capability_trio" ADD CONSTRAINT "posts_blocks_capability_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_capability_tools_cards_logos" ADD CONSTRAINT "posts_blocks_capability_tools_cards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_capability_tools_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_capability_tools_cards" ADD CONSTRAINT "posts_blocks_capability_tools_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_capability_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_capability_tools" ADD CONSTRAINT "posts_blocks_capability_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_use_cases_grid_cards" ADD CONSTRAINT "posts_blocks_use_cases_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_use_cases_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_use_cases_grid" ADD CONSTRAINT "posts_blocks_use_cases_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_security_cards" ADD CONSTRAINT "posts_blocks_security_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_security" ADD CONSTRAINT "posts_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_functional_capabilities_cards" ADD CONSTRAINT "posts_blocks_functional_capabilities_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_functional_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_functional_capabilities" ADD CONSTRAINT "posts_blocks_functional_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_how_it_works_steps" ADD CONSTRAINT "posts_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_how_it_works" ADD CONSTRAINT "posts_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta" ADD CONSTRAINT "posts_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_metrics_items" ADD CONSTRAINT "posts_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_metrics" ADD CONSTRAINT "posts_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_results_stats_items" ADD CONSTRAINT "posts_blocks_results_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_results_stats" ADD CONSTRAINT "posts_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_cards_items" ADD CONSTRAINT "posts_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_cards" ADD CONSTRAINT "posts_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_capability_strip_items" ADD CONSTRAINT "posts_blocks_capability_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_capability_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_capability_strip" ADD CONSTRAINT "posts_blocks_capability_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_live_in_days_items" ADD CONSTRAINT "posts_blocks_live_in_days_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_live_in_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_live_in_days" ADD CONSTRAINT "posts_blocks_live_in_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_items" ADD CONSTRAINT "posts_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq" ADD CONSTRAINT "posts_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_news_insights_collections" ADD CONSTRAINT "posts_blocks_news_insights_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_news_insights_cards_tags" ADD CONSTRAINT "posts_blocks_news_insights_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_news_insights_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_news_insights_cards" ADD CONSTRAINT "posts_blocks_news_insights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_news_insights" ADD CONSTRAINT "posts_blocks_news_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_content_feed_collections" ADD CONSTRAINT "posts_blocks_content_feed_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_content_feed_cards_tags" ADD CONSTRAINT "posts_blocks_content_feed_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_content_feed_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_content_feed_cards" ADD CONSTRAINT "posts_blocks_content_feed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_content_feed" ADD CONSTRAINT "posts_blocks_content_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_cards_cards_features" ADD CONSTRAINT "posts_blocks_pricing_cards_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_pricing_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_cards_cards" ADD CONSTRAINT "posts_blocks_pricing_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_cards" ADD CONSTRAINT "posts_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_details_sections_headers" ADD CONSTRAINT "posts_blocks_pricing_details_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_details_sections_rows_cells" ADD CONSTRAINT "posts_blocks_pricing_details_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_pricing_details_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_details_sections_rows" ADD CONSTRAINT "posts_blocks_pricing_details_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_details_sections" ADD CONSTRAINT "posts_blocks_pricing_details_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_pricing_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_details" ADD CONSTRAINT "posts_blocks_pricing_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_difference_left_items" ADD CONSTRAINT "posts_blocks_difference_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_difference_right_items" ADD CONSTRAINT "posts_blocks_difference_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_difference" ADD CONSTRAINT "posts_blocks_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pain_points_comparison_rows" ADD CONSTRAINT "posts_blocks_pain_points_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_pain_points_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pain_points_comparison" ADD CONSTRAINT "posts_blocks_pain_points_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_policy_callouts" ADD CONSTRAINT "posts_blocks_pricing_policy_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_pricing_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_policy" ADD CONSTRAINT "posts_blocks_pricing_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_industry_expertise_items" ADD CONSTRAINT "posts_blocks_industry_expertise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_industry_expertise_info_cards" ADD CONSTRAINT "posts_blocks_industry_expertise_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_industry_expertise" ADD CONSTRAINT "posts_blocks_industry_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_strip_logos" ADD CONSTRAINT "posts_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_strip_stats" ADD CONSTRAINT "posts_blocks_logo_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_strip" ADD CONSTRAINT "posts_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_integrations_banner_items" ADD CONSTRAINT "posts_blocks_integrations_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_integrations_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_integrations_banner" ADD CONSTRAINT "posts_blocks_integrations_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_grid_columns_items" ADD CONSTRAINT "posts_blocks_logo_grid_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_logo_grid_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_grid_columns" ADD CONSTRAINT "posts_blocks_logo_grid_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_grid" ADD CONSTRAINT "posts_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_tabs_showcase_tabs_steps" ADD CONSTRAINT "posts_blocks_tabs_showcase_tabs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_tabs_showcase_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_tabs_showcase_tabs" ADD CONSTRAINT "posts_blocks_tabs_showcase_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_tabs_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_tabs_showcase" ADD CONSTRAINT "posts_blocks_tabs_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_anchor_nav_items" ADD CONSTRAINT "posts_blocks_anchor_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_anchor_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_anchor_nav" ADD CONSTRAINT "posts_blocks_anchor_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials_items" ADD CONSTRAINT "posts_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials" ADD CONSTRAINT "posts_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_comparison_grid_cards" ADD CONSTRAINT "posts_blocks_comparison_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_comparison_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_comparison_grid" ADD CONSTRAINT "posts_blocks_comparison_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_use_case_flow_columns_items" ADD CONSTRAINT "posts_blocks_use_case_flow_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_use_case_flow_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_use_case_flow_columns" ADD CONSTRAINT "posts_blocks_use_case_flow_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_use_case_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_use_case_flow" ADD CONSTRAINT "posts_blocks_use_case_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_article_meta_tags" ADD CONSTRAINT "posts_article_meta_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_blocks_hero_cards" ADD CONSTRAINT "news_blocks_hero_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_hero" ADD CONSTRAINT "news_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_hero_extended_cards" ADD CONSTRAINT "news_blocks_hero_extended_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_hero_extended"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_hero_extended" ADD CONSTRAINT "news_blocks_hero_extended_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_rich_text" ADD CONSTRAINT "news_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_side_by_side_bullets" ADD CONSTRAINT "news_blocks_side_by_side_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_side_by_side_small_icons" ADD CONSTRAINT "news_blocks_side_by_side_small_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_side_by_side_bottom_cards_items" ADD CONSTRAINT "news_blocks_side_by_side_bottom_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_side_by_side_bottom_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_side_by_side_bottom_cards" ADD CONSTRAINT "news_blocks_side_by_side_bottom_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_side_by_side" ADD CONSTRAINT "news_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_story_cards" ADD CONSTRAINT "news_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_story" ADD CONSTRAINT "news_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_media_showcase" ADD CONSTRAINT "news_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_feature_grid_cards" ADD CONSTRAINT "news_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_feature_grid" ADD CONSTRAINT "news_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_agent_capabilities_items" ADD CONSTRAINT "news_blocks_agent_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_agent_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_agent_capabilities" ADD CONSTRAINT "news_blocks_agent_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_agent_solutions_items" ADD CONSTRAINT "news_blocks_agent_solutions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_agent_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_agent_solutions" ADD CONSTRAINT "news_blocks_agent_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_contact_us" ADD CONSTRAINT "news_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_concierge_flow_cards" ADD CONSTRAINT "news_blocks_concierge_flow_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_concierge_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_concierge_flow" ADD CONSTRAINT "news_blocks_concierge_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_enterprise_upgrade_benefits" ADD CONSTRAINT "news_blocks_enterprise_upgrade_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_enterprise_upgrade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_enterprise_upgrade" ADD CONSTRAINT "news_blocks_enterprise_upgrade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_channels_grid_cards" ADD CONSTRAINT "news_blocks_channels_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_channels_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_channels_grid" ADD CONSTRAINT "news_blocks_channels_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_feature_stack_cards" ADD CONSTRAINT "news_blocks_feature_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_feature_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_feature_stack" ADD CONSTRAINT "news_blocks_feature_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_coverage_grid_cards" ADD CONSTRAINT "news_blocks_coverage_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_coverage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_coverage_grid" ADD CONSTRAINT "news_blocks_coverage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_feature_rows_rows" ADD CONSTRAINT "news_blocks_feature_rows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_feature_rows" ADD CONSTRAINT "news_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_capability_trio_cards" ADD CONSTRAINT "news_blocks_capability_trio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_capability_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_capability_trio" ADD CONSTRAINT "news_blocks_capability_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_capability_tools_cards_logos" ADD CONSTRAINT "news_blocks_capability_tools_cards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_capability_tools_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_capability_tools_cards" ADD CONSTRAINT "news_blocks_capability_tools_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_capability_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_capability_tools" ADD CONSTRAINT "news_blocks_capability_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_use_cases_grid_cards" ADD CONSTRAINT "news_blocks_use_cases_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_use_cases_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_use_cases_grid" ADD CONSTRAINT "news_blocks_use_cases_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_security_cards" ADD CONSTRAINT "news_blocks_security_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_security" ADD CONSTRAINT "news_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_functional_capabilities_cards" ADD CONSTRAINT "news_blocks_functional_capabilities_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_functional_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_functional_capabilities" ADD CONSTRAINT "news_blocks_functional_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_how_it_works_steps" ADD CONSTRAINT "news_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_how_it_works" ADD CONSTRAINT "news_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_cta" ADD CONSTRAINT "news_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_metrics_items" ADD CONSTRAINT "news_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_metrics" ADD CONSTRAINT "news_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_results_stats_items" ADD CONSTRAINT "news_blocks_results_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_results_stats" ADD CONSTRAINT "news_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_stats_cards_items" ADD CONSTRAINT "news_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_stats_cards" ADD CONSTRAINT "news_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_capability_strip_items" ADD CONSTRAINT "news_blocks_capability_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_capability_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_capability_strip" ADD CONSTRAINT "news_blocks_capability_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_live_in_days_items" ADD CONSTRAINT "news_blocks_live_in_days_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_live_in_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_live_in_days" ADD CONSTRAINT "news_blocks_live_in_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_faq_items" ADD CONSTRAINT "news_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_faq" ADD CONSTRAINT "news_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_news_insights_collections" ADD CONSTRAINT "news_blocks_news_insights_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_news_insights_cards_tags" ADD CONSTRAINT "news_blocks_news_insights_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_news_insights_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_news_insights_cards" ADD CONSTRAINT "news_blocks_news_insights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_news_insights" ADD CONSTRAINT "news_blocks_news_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_content_feed_collections" ADD CONSTRAINT "news_blocks_content_feed_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_content_feed_cards_tags" ADD CONSTRAINT "news_blocks_content_feed_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_content_feed_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_content_feed_cards" ADD CONSTRAINT "news_blocks_content_feed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_content_feed" ADD CONSTRAINT "news_blocks_content_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_pricing_cards_cards_features" ADD CONSTRAINT "news_blocks_pricing_cards_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_pricing_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_pricing_cards_cards" ADD CONSTRAINT "news_blocks_pricing_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_pricing_cards" ADD CONSTRAINT "news_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_pricing_details_sections_headers" ADD CONSTRAINT "news_blocks_pricing_details_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_pricing_details_sections_rows_cells" ADD CONSTRAINT "news_blocks_pricing_details_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_pricing_details_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_pricing_details_sections_rows" ADD CONSTRAINT "news_blocks_pricing_details_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_pricing_details_sections" ADD CONSTRAINT "news_blocks_pricing_details_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_pricing_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_pricing_details" ADD CONSTRAINT "news_blocks_pricing_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_difference_left_items" ADD CONSTRAINT "news_blocks_difference_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_difference_right_items" ADD CONSTRAINT "news_blocks_difference_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_difference" ADD CONSTRAINT "news_blocks_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_pain_points_comparison_rows" ADD CONSTRAINT "news_blocks_pain_points_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_pain_points_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_pain_points_comparison" ADD CONSTRAINT "news_blocks_pain_points_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_pricing_policy_callouts" ADD CONSTRAINT "news_blocks_pricing_policy_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_pricing_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_pricing_policy" ADD CONSTRAINT "news_blocks_pricing_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_industry_expertise_items" ADD CONSTRAINT "news_blocks_industry_expertise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_industry_expertise_info_cards" ADD CONSTRAINT "news_blocks_industry_expertise_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_industry_expertise" ADD CONSTRAINT "news_blocks_industry_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_logo_strip_logos" ADD CONSTRAINT "news_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_logo_strip_stats" ADD CONSTRAINT "news_blocks_logo_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_logo_strip" ADD CONSTRAINT "news_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_integrations_banner_items" ADD CONSTRAINT "news_blocks_integrations_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_integrations_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_integrations_banner" ADD CONSTRAINT "news_blocks_integrations_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_logo_grid_columns_items" ADD CONSTRAINT "news_blocks_logo_grid_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_logo_grid_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_logo_grid_columns" ADD CONSTRAINT "news_blocks_logo_grid_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_logo_grid" ADD CONSTRAINT "news_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_tabs_showcase_tabs_steps" ADD CONSTRAINT "news_blocks_tabs_showcase_tabs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_tabs_showcase_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_tabs_showcase_tabs" ADD CONSTRAINT "news_blocks_tabs_showcase_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_tabs_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_tabs_showcase" ADD CONSTRAINT "news_blocks_tabs_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_anchor_nav_items" ADD CONSTRAINT "news_blocks_anchor_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_anchor_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_anchor_nav" ADD CONSTRAINT "news_blocks_anchor_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_testimonials_items" ADD CONSTRAINT "news_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_testimonials" ADD CONSTRAINT "news_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_comparison_grid_cards" ADD CONSTRAINT "news_blocks_comparison_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_comparison_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_comparison_grid" ADD CONSTRAINT "news_blocks_comparison_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_use_case_flow_columns_items" ADD CONSTRAINT "news_blocks_use_case_flow_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_use_case_flow_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_use_case_flow_columns" ADD CONSTRAINT "news_blocks_use_case_flow_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_blocks_use_case_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_blocks_use_case_flow" ADD CONSTRAINT "news_blocks_use_case_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_article_meta_tags" ADD CONSTRAINT "news_article_meta_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides_blocks_hero_cards" ADD CONSTRAINT "guides_blocks_hero_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_hero" ADD CONSTRAINT "guides_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_hero_extended_cards" ADD CONSTRAINT "guides_blocks_hero_extended_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_hero_extended"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_hero_extended" ADD CONSTRAINT "guides_blocks_hero_extended_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_rich_text" ADD CONSTRAINT "guides_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_side_by_side_bullets" ADD CONSTRAINT "guides_blocks_side_by_side_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_side_by_side_small_icons" ADD CONSTRAINT "guides_blocks_side_by_side_small_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_side_by_side_bottom_cards_items" ADD CONSTRAINT "guides_blocks_side_by_side_bottom_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_side_by_side_bottom_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_side_by_side_bottom_cards" ADD CONSTRAINT "guides_blocks_side_by_side_bottom_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_side_by_side" ADD CONSTRAINT "guides_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_story_cards" ADD CONSTRAINT "guides_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_story" ADD CONSTRAINT "guides_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_media_showcase" ADD CONSTRAINT "guides_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_feature_grid_cards" ADD CONSTRAINT "guides_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_feature_grid" ADD CONSTRAINT "guides_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_agent_capabilities_items" ADD CONSTRAINT "guides_blocks_agent_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_agent_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_agent_capabilities" ADD CONSTRAINT "guides_blocks_agent_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_agent_solutions_items" ADD CONSTRAINT "guides_blocks_agent_solutions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_agent_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_agent_solutions" ADD CONSTRAINT "guides_blocks_agent_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_contact_us" ADD CONSTRAINT "guides_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_concierge_flow_cards" ADD CONSTRAINT "guides_blocks_concierge_flow_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_concierge_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_concierge_flow" ADD CONSTRAINT "guides_blocks_concierge_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_enterprise_upgrade_benefits" ADD CONSTRAINT "guides_blocks_enterprise_upgrade_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_enterprise_upgrade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_enterprise_upgrade" ADD CONSTRAINT "guides_blocks_enterprise_upgrade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_channels_grid_cards" ADD CONSTRAINT "guides_blocks_channels_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_channels_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_channels_grid" ADD CONSTRAINT "guides_blocks_channels_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_feature_stack_cards" ADD CONSTRAINT "guides_blocks_feature_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_feature_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_feature_stack" ADD CONSTRAINT "guides_blocks_feature_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_coverage_grid_cards" ADD CONSTRAINT "guides_blocks_coverage_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_coverage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_coverage_grid" ADD CONSTRAINT "guides_blocks_coverage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_feature_rows_rows" ADD CONSTRAINT "guides_blocks_feature_rows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_feature_rows" ADD CONSTRAINT "guides_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_capability_trio_cards" ADD CONSTRAINT "guides_blocks_capability_trio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_capability_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_capability_trio" ADD CONSTRAINT "guides_blocks_capability_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_capability_tools_cards_logos" ADD CONSTRAINT "guides_blocks_capability_tools_cards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_capability_tools_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_capability_tools_cards" ADD CONSTRAINT "guides_blocks_capability_tools_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_capability_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_capability_tools" ADD CONSTRAINT "guides_blocks_capability_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_use_cases_grid_cards" ADD CONSTRAINT "guides_blocks_use_cases_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_use_cases_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_use_cases_grid" ADD CONSTRAINT "guides_blocks_use_cases_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_security_cards" ADD CONSTRAINT "guides_blocks_security_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_security" ADD CONSTRAINT "guides_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_functional_capabilities_cards" ADD CONSTRAINT "guides_blocks_functional_capabilities_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_functional_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_functional_capabilities" ADD CONSTRAINT "guides_blocks_functional_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_how_it_works_steps" ADD CONSTRAINT "guides_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_how_it_works" ADD CONSTRAINT "guides_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_cta" ADD CONSTRAINT "guides_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_metrics_items" ADD CONSTRAINT "guides_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_metrics" ADD CONSTRAINT "guides_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_results_stats_items" ADD CONSTRAINT "guides_blocks_results_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_results_stats" ADD CONSTRAINT "guides_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_stats_cards_items" ADD CONSTRAINT "guides_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_stats_cards" ADD CONSTRAINT "guides_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_capability_strip_items" ADD CONSTRAINT "guides_blocks_capability_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_capability_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_capability_strip" ADD CONSTRAINT "guides_blocks_capability_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_live_in_days_items" ADD CONSTRAINT "guides_blocks_live_in_days_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_live_in_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_live_in_days" ADD CONSTRAINT "guides_blocks_live_in_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_faq_items" ADD CONSTRAINT "guides_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_faq" ADD CONSTRAINT "guides_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_news_insights_collections" ADD CONSTRAINT "guides_blocks_news_insights_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."guides_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_news_insights_cards_tags" ADD CONSTRAINT "guides_blocks_news_insights_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_news_insights_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_news_insights_cards" ADD CONSTRAINT "guides_blocks_news_insights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_news_insights" ADD CONSTRAINT "guides_blocks_news_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_content_feed_collections" ADD CONSTRAINT "guides_blocks_content_feed_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."guides_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_content_feed_cards_tags" ADD CONSTRAINT "guides_blocks_content_feed_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_content_feed_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_content_feed_cards" ADD CONSTRAINT "guides_blocks_content_feed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_content_feed" ADD CONSTRAINT "guides_blocks_content_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_pricing_cards_cards_features" ADD CONSTRAINT "guides_blocks_pricing_cards_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_pricing_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_pricing_cards_cards" ADD CONSTRAINT "guides_blocks_pricing_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_pricing_cards" ADD CONSTRAINT "guides_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_pricing_details_sections_headers" ADD CONSTRAINT "guides_blocks_pricing_details_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_pricing_details_sections_rows_cells" ADD CONSTRAINT "guides_blocks_pricing_details_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_pricing_details_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_pricing_details_sections_rows" ADD CONSTRAINT "guides_blocks_pricing_details_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_pricing_details_sections" ADD CONSTRAINT "guides_blocks_pricing_details_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_pricing_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_pricing_details" ADD CONSTRAINT "guides_blocks_pricing_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_difference_left_items" ADD CONSTRAINT "guides_blocks_difference_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_difference_right_items" ADD CONSTRAINT "guides_blocks_difference_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_difference" ADD CONSTRAINT "guides_blocks_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_pain_points_comparison_rows" ADD CONSTRAINT "guides_blocks_pain_points_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_pain_points_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_pain_points_comparison" ADD CONSTRAINT "guides_blocks_pain_points_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_pricing_policy_callouts" ADD CONSTRAINT "guides_blocks_pricing_policy_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_pricing_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_pricing_policy" ADD CONSTRAINT "guides_blocks_pricing_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_industry_expertise_items" ADD CONSTRAINT "guides_blocks_industry_expertise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_industry_expertise_info_cards" ADD CONSTRAINT "guides_blocks_industry_expertise_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_industry_expertise" ADD CONSTRAINT "guides_blocks_industry_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_logo_strip_logos" ADD CONSTRAINT "guides_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_logo_strip_stats" ADD CONSTRAINT "guides_blocks_logo_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_logo_strip" ADD CONSTRAINT "guides_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_integrations_banner_items" ADD CONSTRAINT "guides_blocks_integrations_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_integrations_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_integrations_banner" ADD CONSTRAINT "guides_blocks_integrations_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_logo_grid_columns_items" ADD CONSTRAINT "guides_blocks_logo_grid_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_logo_grid_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_logo_grid_columns" ADD CONSTRAINT "guides_blocks_logo_grid_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_logo_grid" ADD CONSTRAINT "guides_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_tabs_showcase_tabs_steps" ADD CONSTRAINT "guides_blocks_tabs_showcase_tabs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_tabs_showcase_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_tabs_showcase_tabs" ADD CONSTRAINT "guides_blocks_tabs_showcase_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_tabs_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_tabs_showcase" ADD CONSTRAINT "guides_blocks_tabs_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_anchor_nav_items" ADD CONSTRAINT "guides_blocks_anchor_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_anchor_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_anchor_nav" ADD CONSTRAINT "guides_blocks_anchor_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_testimonials_items" ADD CONSTRAINT "guides_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_testimonials" ADD CONSTRAINT "guides_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_comparison_grid_cards" ADD CONSTRAINT "guides_blocks_comparison_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_comparison_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_comparison_grid" ADD CONSTRAINT "guides_blocks_comparison_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_use_case_flow_columns_items" ADD CONSTRAINT "guides_blocks_use_case_flow_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_use_case_flow_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_use_case_flow_columns" ADD CONSTRAINT "guides_blocks_use_case_flow_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_use_case_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_use_case_flow" ADD CONSTRAINT "guides_blocks_use_case_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_article_meta_tags" ADD CONSTRAINT "guides_article_meta_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tips_tip_card_icons" ADD CONSTRAINT "tips_tip_card_icons_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tips_tip_card_icons" ADD CONSTRAINT "tips_tip_card_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_hero_cards" ADD CONSTRAINT "tips_blocks_hero_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_hero" ADD CONSTRAINT "tips_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_hero_extended_cards" ADD CONSTRAINT "tips_blocks_hero_extended_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_hero_extended"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_hero_extended" ADD CONSTRAINT "tips_blocks_hero_extended_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_rich_text" ADD CONSTRAINT "tips_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_side_by_side_bullets" ADD CONSTRAINT "tips_blocks_side_by_side_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_side_by_side_small_icons" ADD CONSTRAINT "tips_blocks_side_by_side_small_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_side_by_side_bottom_cards_items" ADD CONSTRAINT "tips_blocks_side_by_side_bottom_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_side_by_side_bottom_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_side_by_side_bottom_cards" ADD CONSTRAINT "tips_blocks_side_by_side_bottom_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_side_by_side" ADD CONSTRAINT "tips_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_story_cards" ADD CONSTRAINT "tips_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_story" ADD CONSTRAINT "tips_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_media_showcase" ADD CONSTRAINT "tips_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_feature_grid_cards" ADD CONSTRAINT "tips_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_feature_grid" ADD CONSTRAINT "tips_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_agent_capabilities_items" ADD CONSTRAINT "tips_blocks_agent_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_agent_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_agent_capabilities" ADD CONSTRAINT "tips_blocks_agent_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_agent_solutions_items" ADD CONSTRAINT "tips_blocks_agent_solutions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_agent_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_agent_solutions" ADD CONSTRAINT "tips_blocks_agent_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_contact_us" ADD CONSTRAINT "tips_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_concierge_flow_cards" ADD CONSTRAINT "tips_blocks_concierge_flow_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_concierge_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_concierge_flow" ADD CONSTRAINT "tips_blocks_concierge_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_enterprise_upgrade_benefits" ADD CONSTRAINT "tips_blocks_enterprise_upgrade_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_enterprise_upgrade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_enterprise_upgrade" ADD CONSTRAINT "tips_blocks_enterprise_upgrade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_channels_grid_cards" ADD CONSTRAINT "tips_blocks_channels_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_channels_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_channels_grid" ADD CONSTRAINT "tips_blocks_channels_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_feature_stack_cards" ADD CONSTRAINT "tips_blocks_feature_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_feature_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_feature_stack" ADD CONSTRAINT "tips_blocks_feature_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_coverage_grid_cards" ADD CONSTRAINT "tips_blocks_coverage_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_coverage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_coverage_grid" ADD CONSTRAINT "tips_blocks_coverage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_feature_rows_rows" ADD CONSTRAINT "tips_blocks_feature_rows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_feature_rows" ADD CONSTRAINT "tips_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_capability_trio_cards" ADD CONSTRAINT "tips_blocks_capability_trio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_capability_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_capability_trio" ADD CONSTRAINT "tips_blocks_capability_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_capability_tools_cards_logos" ADD CONSTRAINT "tips_blocks_capability_tools_cards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_capability_tools_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_capability_tools_cards" ADD CONSTRAINT "tips_blocks_capability_tools_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_capability_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_capability_tools" ADD CONSTRAINT "tips_blocks_capability_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_use_cases_grid_cards" ADD CONSTRAINT "tips_blocks_use_cases_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_use_cases_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_use_cases_grid" ADD CONSTRAINT "tips_blocks_use_cases_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_security_cards" ADD CONSTRAINT "tips_blocks_security_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_security" ADD CONSTRAINT "tips_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_functional_capabilities_cards" ADD CONSTRAINT "tips_blocks_functional_capabilities_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_functional_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_functional_capabilities" ADD CONSTRAINT "tips_blocks_functional_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_how_it_works_steps" ADD CONSTRAINT "tips_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_how_it_works" ADD CONSTRAINT "tips_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_cta" ADD CONSTRAINT "tips_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_metrics_items" ADD CONSTRAINT "tips_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_metrics" ADD CONSTRAINT "tips_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_results_stats_items" ADD CONSTRAINT "tips_blocks_results_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_results_stats" ADD CONSTRAINT "tips_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_stats_cards_items" ADD CONSTRAINT "tips_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_stats_cards" ADD CONSTRAINT "tips_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_capability_strip_items" ADD CONSTRAINT "tips_blocks_capability_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_capability_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_capability_strip" ADD CONSTRAINT "tips_blocks_capability_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_live_in_days_items" ADD CONSTRAINT "tips_blocks_live_in_days_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_live_in_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_live_in_days" ADD CONSTRAINT "tips_blocks_live_in_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_faq_items" ADD CONSTRAINT "tips_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_faq" ADD CONSTRAINT "tips_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_news_insights_collections" ADD CONSTRAINT "tips_blocks_news_insights_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tips_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_news_insights_cards_tags" ADD CONSTRAINT "tips_blocks_news_insights_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_news_insights_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_news_insights_cards" ADD CONSTRAINT "tips_blocks_news_insights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_news_insights" ADD CONSTRAINT "tips_blocks_news_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_content_feed_collections" ADD CONSTRAINT "tips_blocks_content_feed_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tips_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_content_feed_cards_tags" ADD CONSTRAINT "tips_blocks_content_feed_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_content_feed_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_content_feed_cards" ADD CONSTRAINT "tips_blocks_content_feed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_content_feed" ADD CONSTRAINT "tips_blocks_content_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_pricing_cards_cards_features" ADD CONSTRAINT "tips_blocks_pricing_cards_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_pricing_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_pricing_cards_cards" ADD CONSTRAINT "tips_blocks_pricing_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_pricing_cards" ADD CONSTRAINT "tips_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_pricing_details_sections_headers" ADD CONSTRAINT "tips_blocks_pricing_details_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_pricing_details_sections_rows_cells" ADD CONSTRAINT "tips_blocks_pricing_details_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_pricing_details_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_pricing_details_sections_rows" ADD CONSTRAINT "tips_blocks_pricing_details_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_pricing_details_sections" ADD CONSTRAINT "tips_blocks_pricing_details_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_pricing_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_pricing_details" ADD CONSTRAINT "tips_blocks_pricing_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_difference_left_items" ADD CONSTRAINT "tips_blocks_difference_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_difference_right_items" ADD CONSTRAINT "tips_blocks_difference_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_difference" ADD CONSTRAINT "tips_blocks_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_pain_points_comparison_rows" ADD CONSTRAINT "tips_blocks_pain_points_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_pain_points_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_pain_points_comparison" ADD CONSTRAINT "tips_blocks_pain_points_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_pricing_policy_callouts" ADD CONSTRAINT "tips_blocks_pricing_policy_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_pricing_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_pricing_policy" ADD CONSTRAINT "tips_blocks_pricing_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_industry_expertise_items" ADD CONSTRAINT "tips_blocks_industry_expertise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_industry_expertise_info_cards" ADD CONSTRAINT "tips_blocks_industry_expertise_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_industry_expertise" ADD CONSTRAINT "tips_blocks_industry_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_logo_strip_logos" ADD CONSTRAINT "tips_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_logo_strip_stats" ADD CONSTRAINT "tips_blocks_logo_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_logo_strip" ADD CONSTRAINT "tips_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_integrations_banner_items" ADD CONSTRAINT "tips_blocks_integrations_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_integrations_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_integrations_banner" ADD CONSTRAINT "tips_blocks_integrations_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_logo_grid_columns_items" ADD CONSTRAINT "tips_blocks_logo_grid_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_logo_grid_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_logo_grid_columns" ADD CONSTRAINT "tips_blocks_logo_grid_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_logo_grid" ADD CONSTRAINT "tips_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_tabs_showcase_tabs_steps" ADD CONSTRAINT "tips_blocks_tabs_showcase_tabs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_tabs_showcase_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_tabs_showcase_tabs" ADD CONSTRAINT "tips_blocks_tabs_showcase_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_tabs_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_tabs_showcase" ADD CONSTRAINT "tips_blocks_tabs_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_anchor_nav_items" ADD CONSTRAINT "tips_blocks_anchor_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_anchor_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_anchor_nav" ADD CONSTRAINT "tips_blocks_anchor_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_testimonials_items" ADD CONSTRAINT "tips_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_testimonials" ADD CONSTRAINT "tips_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_comparison_grid_cards" ADD CONSTRAINT "tips_blocks_comparison_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_comparison_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_comparison_grid" ADD CONSTRAINT "tips_blocks_comparison_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_use_case_flow_columns_items" ADD CONSTRAINT "tips_blocks_use_case_flow_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_use_case_flow_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_use_case_flow_columns" ADD CONSTRAINT "tips_blocks_use_case_flow_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips_blocks_use_case_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tips_blocks_use_case_flow" ADD CONSTRAINT "tips_blocks_use_case_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_hero_cards" ADD CONSTRAINT "use_cases_blocks_hero_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_hero" ADD CONSTRAINT "use_cases_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_hero_extended_cards" ADD CONSTRAINT "use_cases_blocks_hero_extended_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_hero_extended"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_hero_extended" ADD CONSTRAINT "use_cases_blocks_hero_extended_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_rich_text" ADD CONSTRAINT "use_cases_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_side_by_side_bullets" ADD CONSTRAINT "use_cases_blocks_side_by_side_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_side_by_side_small_icons" ADD CONSTRAINT "use_cases_blocks_side_by_side_small_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_side_by_side_bottom_cards_items" ADD CONSTRAINT "use_cases_blocks_side_by_side_bottom_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_side_by_side_bottom_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_side_by_side_bottom_cards" ADD CONSTRAINT "use_cases_blocks_side_by_side_bottom_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_side_by_side"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_side_by_side" ADD CONSTRAINT "use_cases_blocks_side_by_side_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_story_cards" ADD CONSTRAINT "use_cases_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_story" ADD CONSTRAINT "use_cases_blocks_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_media_showcase" ADD CONSTRAINT "use_cases_blocks_media_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_feature_grid_cards" ADD CONSTRAINT "use_cases_blocks_feature_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_feature_grid" ADD CONSTRAINT "use_cases_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_agent_capabilities_items" ADD CONSTRAINT "use_cases_blocks_agent_capabilities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_agent_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_agent_capabilities" ADD CONSTRAINT "use_cases_blocks_agent_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_agent_solutions_items" ADD CONSTRAINT "use_cases_blocks_agent_solutions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_agent_solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_agent_solutions" ADD CONSTRAINT "use_cases_blocks_agent_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_contact_us" ADD CONSTRAINT "use_cases_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_concierge_flow_cards" ADD CONSTRAINT "use_cases_blocks_concierge_flow_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_concierge_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_concierge_flow" ADD CONSTRAINT "use_cases_blocks_concierge_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_enterprise_upgrade_benefits" ADD CONSTRAINT "use_cases_blocks_enterprise_upgrade_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_enterprise_upgrade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_enterprise_upgrade" ADD CONSTRAINT "use_cases_blocks_enterprise_upgrade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_channels_grid_cards" ADD CONSTRAINT "use_cases_blocks_channels_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_channels_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_channels_grid" ADD CONSTRAINT "use_cases_blocks_channels_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_feature_stack_cards" ADD CONSTRAINT "use_cases_blocks_feature_stack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_feature_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_feature_stack" ADD CONSTRAINT "use_cases_blocks_feature_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_coverage_grid_cards" ADD CONSTRAINT "use_cases_blocks_coverage_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_coverage_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_coverage_grid" ADD CONSTRAINT "use_cases_blocks_coverage_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_feature_rows_rows" ADD CONSTRAINT "use_cases_blocks_feature_rows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_feature_rows" ADD CONSTRAINT "use_cases_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_capability_trio_cards" ADD CONSTRAINT "use_cases_blocks_capability_trio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_capability_trio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_capability_trio" ADD CONSTRAINT "use_cases_blocks_capability_trio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_capability_tools_cards_logos" ADD CONSTRAINT "use_cases_blocks_capability_tools_cards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_capability_tools_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_capability_tools_cards" ADD CONSTRAINT "use_cases_blocks_capability_tools_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_capability_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_capability_tools" ADD CONSTRAINT "use_cases_blocks_capability_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_use_cases_grid_cards" ADD CONSTRAINT "use_cases_blocks_use_cases_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_use_cases_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_use_cases_grid" ADD CONSTRAINT "use_cases_blocks_use_cases_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_security_cards" ADD CONSTRAINT "use_cases_blocks_security_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_security"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_security" ADD CONSTRAINT "use_cases_blocks_security_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_functional_capabilities_cards" ADD CONSTRAINT "use_cases_blocks_functional_capabilities_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_functional_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_functional_capabilities" ADD CONSTRAINT "use_cases_blocks_functional_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_how_it_works_steps" ADD CONSTRAINT "use_cases_blocks_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_how_it_works" ADD CONSTRAINT "use_cases_blocks_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_cta" ADD CONSTRAINT "use_cases_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_metrics_items" ADD CONSTRAINT "use_cases_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_metrics" ADD CONSTRAINT "use_cases_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_results_stats_items" ADD CONSTRAINT "use_cases_blocks_results_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_results_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_results_stats" ADD CONSTRAINT "use_cases_blocks_results_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_stats_cards_items" ADD CONSTRAINT "use_cases_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_stats_cards" ADD CONSTRAINT "use_cases_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_capability_strip_items" ADD CONSTRAINT "use_cases_blocks_capability_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_capability_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_capability_strip" ADD CONSTRAINT "use_cases_blocks_capability_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_live_in_days_items" ADD CONSTRAINT "use_cases_blocks_live_in_days_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_live_in_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_live_in_days" ADD CONSTRAINT "use_cases_blocks_live_in_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_faq_items" ADD CONSTRAINT "use_cases_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_faq" ADD CONSTRAINT "use_cases_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_news_insights_collections" ADD CONSTRAINT "use_cases_blocks_news_insights_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."use_cases_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_news_insights_cards_tags" ADD CONSTRAINT "use_cases_blocks_news_insights_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_news_insights_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_news_insights_cards" ADD CONSTRAINT "use_cases_blocks_news_insights_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_news_insights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_news_insights" ADD CONSTRAINT "use_cases_blocks_news_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_content_feed_collections" ADD CONSTRAINT "use_cases_blocks_content_feed_collections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."use_cases_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_content_feed_cards_tags" ADD CONSTRAINT "use_cases_blocks_content_feed_cards_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_content_feed_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_content_feed_cards" ADD CONSTRAINT "use_cases_blocks_content_feed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_content_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_content_feed" ADD CONSTRAINT "use_cases_blocks_content_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_pricing_cards_cards_features" ADD CONSTRAINT "use_cases_blocks_pricing_cards_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_pricing_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_pricing_cards_cards" ADD CONSTRAINT "use_cases_blocks_pricing_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_pricing_cards" ADD CONSTRAINT "use_cases_blocks_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_pricing_details_sections_headers" ADD CONSTRAINT "use_cases_blocks_pricing_details_sections_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_pricing_details_sections_rows_cells" ADD CONSTRAINT "use_cases_blocks_pricing_details_sections_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_pricing_details_sections_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_pricing_details_sections_rows" ADD CONSTRAINT "use_cases_blocks_pricing_details_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_pricing_details_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_pricing_details_sections" ADD CONSTRAINT "use_cases_blocks_pricing_details_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_pricing_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_pricing_details" ADD CONSTRAINT "use_cases_blocks_pricing_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_difference_left_items" ADD CONSTRAINT "use_cases_blocks_difference_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_difference_right_items" ADD CONSTRAINT "use_cases_blocks_difference_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_difference" ADD CONSTRAINT "use_cases_blocks_difference_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_pain_points_comparison_rows" ADD CONSTRAINT "use_cases_blocks_pain_points_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_pain_points_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_pain_points_comparison" ADD CONSTRAINT "use_cases_blocks_pain_points_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_pricing_policy_callouts" ADD CONSTRAINT "use_cases_blocks_pricing_policy_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_pricing_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_pricing_policy" ADD CONSTRAINT "use_cases_blocks_pricing_policy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_industry_expertise_items" ADD CONSTRAINT "use_cases_blocks_industry_expertise_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_industry_expertise_info_cards" ADD CONSTRAINT "use_cases_blocks_industry_expertise_info_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_industry_expertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_industry_expertise" ADD CONSTRAINT "use_cases_blocks_industry_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_logo_strip_logos" ADD CONSTRAINT "use_cases_blocks_logo_strip_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_logo_strip_stats" ADD CONSTRAINT "use_cases_blocks_logo_strip_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_logo_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_logo_strip" ADD CONSTRAINT "use_cases_blocks_logo_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_integrations_banner_items" ADD CONSTRAINT "use_cases_blocks_integrations_banner_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_integrations_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_integrations_banner" ADD CONSTRAINT "use_cases_blocks_integrations_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_logo_grid_columns_items" ADD CONSTRAINT "use_cases_blocks_logo_grid_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_logo_grid_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_logo_grid_columns" ADD CONSTRAINT "use_cases_blocks_logo_grid_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_logo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_logo_grid" ADD CONSTRAINT "use_cases_blocks_logo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_tabs_showcase_tabs_steps" ADD CONSTRAINT "use_cases_blocks_tabs_showcase_tabs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_tabs_showcase_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_tabs_showcase_tabs" ADD CONSTRAINT "use_cases_blocks_tabs_showcase_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_tabs_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_tabs_showcase" ADD CONSTRAINT "use_cases_blocks_tabs_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_anchor_nav_items" ADD CONSTRAINT "use_cases_blocks_anchor_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_anchor_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_anchor_nav" ADD CONSTRAINT "use_cases_blocks_anchor_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_testimonials_items" ADD CONSTRAINT "use_cases_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_testimonials" ADD CONSTRAINT "use_cases_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_comparison_grid_cards" ADD CONSTRAINT "use_cases_blocks_comparison_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_comparison_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_comparison_grid" ADD CONSTRAINT "use_cases_blocks_comparison_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_use_case_flow_columns_items" ADD CONSTRAINT "use_cases_blocks_use_case_flow_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_use_case_flow_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_use_case_flow_columns" ADD CONSTRAINT "use_cases_blocks_use_case_flow_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases_blocks_use_case_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "use_cases_blocks_use_case_flow" ADD CONSTRAINT "use_cases_blocks_use_case_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_fields_options" ADD CONSTRAINT "forms_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_fields" ADD CONSTRAINT "forms_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_functions" ADD CONSTRAINT "form_submissions_functions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tips_fk" FOREIGN KEY ("tips_id") REFERENCES "public"."tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_use_cases_fk" FOREIGN KEY ("use_cases_id") REFERENCES "public"."use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_items_fk" FOREIGN KEY ("faq_items_id") REFERENCES "public"."faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_primary_navigation_items" ADD CONSTRAINT "site_settings_primary_navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_primary_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_primary_navigation" ADD CONSTRAINT "site_settings_primary_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_navigation" ADD CONSTRAINT "site_settings_footer_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_seo_social_image_id_media_id_fk" FOREIGN KEY ("default_seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_title_idx" ON "media" USING btree ("title");
  CREATE INDEX "media_alt_idx" ON "media" USING btree ("alt");
  CREATE UNIQUE INDEX "media_source_id_idx" ON "media" USING btree ("source_id");
  CREATE INDEX "media_public_path_idx" ON "media" USING btree ("public_path");
  CREATE INDEX "media_storage_key_idx" ON "media" USING btree ("storage_key");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "pages_blocks_hero_cards_order_idx" ON "pages_blocks_hero_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_cards_parent_id_idx" ON "pages_blocks_hero_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_extended_cards_order_idx" ON "pages_blocks_hero_extended_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_extended_cards_parent_id_idx" ON "pages_blocks_hero_extended_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_extended_order_idx" ON "pages_blocks_hero_extended" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_extended_parent_id_idx" ON "pages_blocks_hero_extended" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_extended_path_idx" ON "pages_blocks_hero_extended" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_side_by_side_bullets_order_idx" ON "pages_blocks_side_by_side_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_side_by_side_bullets_parent_id_idx" ON "pages_blocks_side_by_side_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_side_by_side_small_icons_order_idx" ON "pages_blocks_side_by_side_small_icons" USING btree ("_order");
  CREATE INDEX "pages_blocks_side_by_side_small_icons_parent_id_idx" ON "pages_blocks_side_by_side_small_icons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_side_by_side_bottom_cards_items_order_idx" ON "pages_blocks_side_by_side_bottom_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_side_by_side_bottom_cards_items_parent_id_idx" ON "pages_blocks_side_by_side_bottom_cards_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_side_by_side_bottom_cards_order_idx" ON "pages_blocks_side_by_side_bottom_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_side_by_side_bottom_cards_parent_id_idx" ON "pages_blocks_side_by_side_bottom_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_side_by_side_order_idx" ON "pages_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "pages_blocks_side_by_side_parent_id_idx" ON "pages_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_side_by_side_path_idx" ON "pages_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "pages_blocks_story_cards_order_idx" ON "pages_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_story_cards_parent_id_idx" ON "pages_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_story_order_idx" ON "pages_blocks_story" USING btree ("_order");
  CREATE INDEX "pages_blocks_story_parent_id_idx" ON "pages_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_story_path_idx" ON "pages_blocks_story" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_showcase_order_idx" ON "pages_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_showcase_parent_id_idx" ON "pages_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_showcase_path_idx" ON "pages_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_grid_cards_order_idx" ON "pages_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_cards_parent_id_idx" ON "pages_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_agent_capabilities_items_order_idx" ON "pages_blocks_agent_capabilities_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_agent_capabilities_items_parent_id_idx" ON "pages_blocks_agent_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_agent_capabilities_order_idx" ON "pages_blocks_agent_capabilities" USING btree ("_order");
  CREATE INDEX "pages_blocks_agent_capabilities_parent_id_idx" ON "pages_blocks_agent_capabilities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_agent_capabilities_path_idx" ON "pages_blocks_agent_capabilities" USING btree ("_path");
  CREATE INDEX "pages_blocks_agent_solutions_items_order_idx" ON "pages_blocks_agent_solutions_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_agent_solutions_items_parent_id_idx" ON "pages_blocks_agent_solutions_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_agent_solutions_order_idx" ON "pages_blocks_agent_solutions" USING btree ("_order");
  CREATE INDEX "pages_blocks_agent_solutions_parent_id_idx" ON "pages_blocks_agent_solutions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_agent_solutions_path_idx" ON "pages_blocks_agent_solutions" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_us_order_idx" ON "pages_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_us_parent_id_idx" ON "pages_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_us_path_idx" ON "pages_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "pages_blocks_concierge_flow_cards_order_idx" ON "pages_blocks_concierge_flow_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_concierge_flow_cards_parent_id_idx" ON "pages_blocks_concierge_flow_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_concierge_flow_order_idx" ON "pages_blocks_concierge_flow" USING btree ("_order");
  CREATE INDEX "pages_blocks_concierge_flow_parent_id_idx" ON "pages_blocks_concierge_flow" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_concierge_flow_path_idx" ON "pages_blocks_concierge_flow" USING btree ("_path");
  CREATE INDEX "pages_blocks_enterprise_upgrade_benefits_order_idx" ON "pages_blocks_enterprise_upgrade_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_enterprise_upgrade_benefits_parent_id_idx" ON "pages_blocks_enterprise_upgrade_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_enterprise_upgrade_order_idx" ON "pages_blocks_enterprise_upgrade" USING btree ("_order");
  CREATE INDEX "pages_blocks_enterprise_upgrade_parent_id_idx" ON "pages_blocks_enterprise_upgrade" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_enterprise_upgrade_path_idx" ON "pages_blocks_enterprise_upgrade" USING btree ("_path");
  CREATE INDEX "pages_blocks_channels_grid_cards_order_idx" ON "pages_blocks_channels_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_channels_grid_cards_parent_id_idx" ON "pages_blocks_channels_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_channels_grid_order_idx" ON "pages_blocks_channels_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_channels_grid_parent_id_idx" ON "pages_blocks_channels_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_channels_grid_path_idx" ON "pages_blocks_channels_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_stack_cards_order_idx" ON "pages_blocks_feature_stack_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_stack_cards_parent_id_idx" ON "pages_blocks_feature_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_stack_order_idx" ON "pages_blocks_feature_stack" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_stack_parent_id_idx" ON "pages_blocks_feature_stack" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_stack_path_idx" ON "pages_blocks_feature_stack" USING btree ("_path");
  CREATE INDEX "pages_blocks_coverage_grid_cards_order_idx" ON "pages_blocks_coverage_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_coverage_grid_cards_parent_id_idx" ON "pages_blocks_coverage_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_coverage_grid_order_idx" ON "pages_blocks_coverage_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_coverage_grid_parent_id_idx" ON "pages_blocks_coverage_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_coverage_grid_path_idx" ON "pages_blocks_coverage_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_rows_rows_order_idx" ON "pages_blocks_feature_rows_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_rows_rows_parent_id_idx" ON "pages_blocks_feature_rows_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_rows_order_idx" ON "pages_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_rows_parent_id_idx" ON "pages_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_rows_path_idx" ON "pages_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "pages_blocks_capability_trio_cards_order_idx" ON "pages_blocks_capability_trio_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_capability_trio_cards_parent_id_idx" ON "pages_blocks_capability_trio_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capability_trio_order_idx" ON "pages_blocks_capability_trio" USING btree ("_order");
  CREATE INDEX "pages_blocks_capability_trio_parent_id_idx" ON "pages_blocks_capability_trio" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capability_trio_path_idx" ON "pages_blocks_capability_trio" USING btree ("_path");
  CREATE INDEX "pages_blocks_capability_tools_cards_logos_order_idx" ON "pages_blocks_capability_tools_cards_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_capability_tools_cards_logos_parent_id_idx" ON "pages_blocks_capability_tools_cards_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capability_tools_cards_order_idx" ON "pages_blocks_capability_tools_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_capability_tools_cards_parent_id_idx" ON "pages_blocks_capability_tools_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capability_tools_order_idx" ON "pages_blocks_capability_tools" USING btree ("_order");
  CREATE INDEX "pages_blocks_capability_tools_parent_id_idx" ON "pages_blocks_capability_tools" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capability_tools_path_idx" ON "pages_blocks_capability_tools" USING btree ("_path");
  CREATE INDEX "pages_blocks_use_cases_grid_cards_order_idx" ON "pages_blocks_use_cases_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_use_cases_grid_cards_parent_id_idx" ON "pages_blocks_use_cases_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_use_cases_grid_order_idx" ON "pages_blocks_use_cases_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_use_cases_grid_parent_id_idx" ON "pages_blocks_use_cases_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_use_cases_grid_path_idx" ON "pages_blocks_use_cases_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_security_cards_order_idx" ON "pages_blocks_security_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_security_cards_parent_id_idx" ON "pages_blocks_security_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_security_order_idx" ON "pages_blocks_security" USING btree ("_order");
  CREATE INDEX "pages_blocks_security_parent_id_idx" ON "pages_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_security_path_idx" ON "pages_blocks_security" USING btree ("_path");
  CREATE INDEX "pages_blocks_functional_capabilities_cards_order_idx" ON "pages_blocks_functional_capabilities_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_functional_capabilities_cards_parent_id_idx" ON "pages_blocks_functional_capabilities_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_functional_capabilities_order_idx" ON "pages_blocks_functional_capabilities" USING btree ("_order");
  CREATE INDEX "pages_blocks_functional_capabilities_parent_id_idx" ON "pages_blocks_functional_capabilities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_functional_capabilities_path_idx" ON "pages_blocks_functional_capabilities" USING btree ("_path");
  CREATE INDEX "pages_blocks_how_it_works_steps_order_idx" ON "pages_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_steps_parent_id_idx" ON "pages_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_order_idx" ON "pages_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_it_works_parent_id_idx" ON "pages_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_it_works_path_idx" ON "pages_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_metrics_items_order_idx" ON "pages_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_metrics_items_parent_id_idx" ON "pages_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_metrics_order_idx" ON "pages_blocks_metrics" USING btree ("_order");
  CREATE INDEX "pages_blocks_metrics_parent_id_idx" ON "pages_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_metrics_path_idx" ON "pages_blocks_metrics" USING btree ("_path");
  CREATE INDEX "pages_blocks_results_stats_items_order_idx" ON "pages_blocks_results_stats_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_results_stats_items_parent_id_idx" ON "pages_blocks_results_stats_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_results_stats_order_idx" ON "pages_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_results_stats_parent_id_idx" ON "pages_blocks_results_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_results_stats_path_idx" ON "pages_blocks_results_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_cards_items_order_idx" ON "pages_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_cards_items_parent_id_idx" ON "pages_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_cards_order_idx" ON "pages_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_cards_parent_id_idx" ON "pages_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_cards_path_idx" ON "pages_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_capability_strip_items_order_idx" ON "pages_blocks_capability_strip_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_capability_strip_items_parent_id_idx" ON "pages_blocks_capability_strip_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capability_strip_order_idx" ON "pages_blocks_capability_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_capability_strip_parent_id_idx" ON "pages_blocks_capability_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capability_strip_path_idx" ON "pages_blocks_capability_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_live_in_days_items_order_idx" ON "pages_blocks_live_in_days_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_live_in_days_items_parent_id_idx" ON "pages_blocks_live_in_days_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_live_in_days_order_idx" ON "pages_blocks_live_in_days" USING btree ("_order");
  CREATE INDEX "pages_blocks_live_in_days_parent_id_idx" ON "pages_blocks_live_in_days" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_live_in_days_path_idx" ON "pages_blocks_live_in_days" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_news_insights_collections_order_idx" ON "pages_blocks_news_insights_collections" USING btree ("order");
  CREATE INDEX "pages_blocks_news_insights_collections_parent_idx" ON "pages_blocks_news_insights_collections" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_news_insights_cards_tags_order_idx" ON "pages_blocks_news_insights_cards_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_insights_cards_tags_parent_id_idx" ON "pages_blocks_news_insights_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_insights_cards_order_idx" ON "pages_blocks_news_insights_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_insights_cards_parent_id_idx" ON "pages_blocks_news_insights_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_insights_order_idx" ON "pages_blocks_news_insights" USING btree ("_order");
  CREATE INDEX "pages_blocks_news_insights_parent_id_idx" ON "pages_blocks_news_insights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_news_insights_path_idx" ON "pages_blocks_news_insights" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_feed_collections_order_idx" ON "pages_blocks_content_feed_collections" USING btree ("order");
  CREATE INDEX "pages_blocks_content_feed_collections_parent_idx" ON "pages_blocks_content_feed_collections" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_content_feed_cards_tags_order_idx" ON "pages_blocks_content_feed_cards_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_feed_cards_tags_parent_id_idx" ON "pages_blocks_content_feed_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_feed_cards_order_idx" ON "pages_blocks_content_feed_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_feed_cards_parent_id_idx" ON "pages_blocks_content_feed_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_feed_order_idx" ON "pages_blocks_content_feed" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_feed_parent_id_idx" ON "pages_blocks_content_feed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_feed_path_idx" ON "pages_blocks_content_feed" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_cards_cards_features_order_idx" ON "pages_blocks_pricing_cards_cards_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_cards_cards_features_parent_id_idx" ON "pages_blocks_pricing_cards_cards_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_cards_cards_order_idx" ON "pages_blocks_pricing_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_cards_cards_parent_id_idx" ON "pages_blocks_pricing_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_cards_order_idx" ON "pages_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_cards_parent_id_idx" ON "pages_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_cards_path_idx" ON "pages_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_details_sections_headers_order_idx" ON "pages_blocks_pricing_details_sections_headers" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_details_sections_headers_parent_id_idx" ON "pages_blocks_pricing_details_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_details_sections_rows_cells_order_idx" ON "pages_blocks_pricing_details_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_details_sections_rows_cells_parent_id_idx" ON "pages_blocks_pricing_details_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_details_sections_rows_order_idx" ON "pages_blocks_pricing_details_sections_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_details_sections_rows_parent_id_idx" ON "pages_blocks_pricing_details_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_details_sections_order_idx" ON "pages_blocks_pricing_details_sections" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_details_sections_parent_id_idx" ON "pages_blocks_pricing_details_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_details_order_idx" ON "pages_blocks_pricing_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_details_parent_id_idx" ON "pages_blocks_pricing_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_details_path_idx" ON "pages_blocks_pricing_details" USING btree ("_path");
  CREATE INDEX "pages_blocks_difference_left_items_order_idx" ON "pages_blocks_difference_left_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_difference_left_items_parent_id_idx" ON "pages_blocks_difference_left_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_difference_right_items_order_idx" ON "pages_blocks_difference_right_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_difference_right_items_parent_id_idx" ON "pages_blocks_difference_right_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_difference_order_idx" ON "pages_blocks_difference" USING btree ("_order");
  CREATE INDEX "pages_blocks_difference_parent_id_idx" ON "pages_blocks_difference" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_difference_path_idx" ON "pages_blocks_difference" USING btree ("_path");
  CREATE INDEX "pages_blocks_pain_points_comparison_rows_order_idx" ON "pages_blocks_pain_points_comparison_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_pain_points_comparison_rows_parent_id_idx" ON "pages_blocks_pain_points_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pain_points_comparison_order_idx" ON "pages_blocks_pain_points_comparison" USING btree ("_order");
  CREATE INDEX "pages_blocks_pain_points_comparison_parent_id_idx" ON "pages_blocks_pain_points_comparison" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pain_points_comparison_path_idx" ON "pages_blocks_pain_points_comparison" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_policy_callouts_order_idx" ON "pages_blocks_pricing_policy_callouts" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_policy_callouts_parent_id_idx" ON "pages_blocks_pricing_policy_callouts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_policy_order_idx" ON "pages_blocks_pricing_policy" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_policy_parent_id_idx" ON "pages_blocks_pricing_policy" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_policy_path_idx" ON "pages_blocks_pricing_policy" USING btree ("_path");
  CREATE INDEX "pages_blocks_industry_expertise_items_order_idx" ON "pages_blocks_industry_expertise_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_industry_expertise_items_parent_id_idx" ON "pages_blocks_industry_expertise_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_industry_expertise_info_cards_order_idx" ON "pages_blocks_industry_expertise_info_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_industry_expertise_info_cards_parent_id_idx" ON "pages_blocks_industry_expertise_info_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_industry_expertise_order_idx" ON "pages_blocks_industry_expertise" USING btree ("_order");
  CREATE INDEX "pages_blocks_industry_expertise_parent_id_idx" ON "pages_blocks_industry_expertise" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_industry_expertise_path_idx" ON "pages_blocks_industry_expertise" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_strip_logos_order_idx" ON "pages_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_strip_logos_parent_id_idx" ON "pages_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_strip_stats_order_idx" ON "pages_blocks_logo_strip_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_strip_stats_parent_id_idx" ON "pages_blocks_logo_strip_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_strip_order_idx" ON "pages_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_strip_parent_id_idx" ON "pages_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_strip_path_idx" ON "pages_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_integrations_banner_items_order_idx" ON "pages_blocks_integrations_banner_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_integrations_banner_items_parent_id_idx" ON "pages_blocks_integrations_banner_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_integrations_banner_order_idx" ON "pages_blocks_integrations_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_integrations_banner_parent_id_idx" ON "pages_blocks_integrations_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_integrations_banner_path_idx" ON "pages_blocks_integrations_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_grid_columns_items_order_idx" ON "pages_blocks_logo_grid_columns_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_grid_columns_items_parent_id_idx" ON "pages_blocks_logo_grid_columns_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_grid_columns_order_idx" ON "pages_blocks_logo_grid_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_grid_columns_parent_id_idx" ON "pages_blocks_logo_grid_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_grid_order_idx" ON "pages_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_grid_parent_id_idx" ON "pages_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_grid_path_idx" ON "pages_blocks_logo_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_tabs_showcase_tabs_steps_order_idx" ON "pages_blocks_tabs_showcase_tabs_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_showcase_tabs_steps_parent_id_idx" ON "pages_blocks_tabs_showcase_tabs_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_showcase_tabs_order_idx" ON "pages_blocks_tabs_showcase_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_showcase_tabs_parent_id_idx" ON "pages_blocks_tabs_showcase_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_showcase_order_idx" ON "pages_blocks_tabs_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_showcase_parent_id_idx" ON "pages_blocks_tabs_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_showcase_path_idx" ON "pages_blocks_tabs_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_anchor_nav_items_order_idx" ON "pages_blocks_anchor_nav_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_anchor_nav_items_parent_id_idx" ON "pages_blocks_anchor_nav_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_anchor_nav_order_idx" ON "pages_blocks_anchor_nav" USING btree ("_order");
  CREATE INDEX "pages_blocks_anchor_nav_parent_id_idx" ON "pages_blocks_anchor_nav" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_anchor_nav_path_idx" ON "pages_blocks_anchor_nav" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_comparison_grid_cards_order_idx" ON "pages_blocks_comparison_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_grid_cards_parent_id_idx" ON "pages_blocks_comparison_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_grid_order_idx" ON "pages_blocks_comparison_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_grid_parent_id_idx" ON "pages_blocks_comparison_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_grid_path_idx" ON "pages_blocks_comparison_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_use_case_flow_columns_items_order_idx" ON "pages_blocks_use_case_flow_columns_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_use_case_flow_columns_items_parent_id_idx" ON "pages_blocks_use_case_flow_columns_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_use_case_flow_columns_order_idx" ON "pages_blocks_use_case_flow_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_use_case_flow_columns_parent_id_idx" ON "pages_blocks_use_case_flow_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_use_case_flow_order_idx" ON "pages_blocks_use_case_flow" USING btree ("_order");
  CREATE INDEX "pages_blocks_use_case_flow_parent_id_idx" ON "pages_blocks_use_case_flow" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_use_case_flow_path_idx" ON "pages_blocks_use_case_flow" USING btree ("_path");
  CREATE INDEX "pages_content_key_idx" ON "pages" USING btree ("content_key");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE UNIQUE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "posts_blocks_hero_cards_order_idx" ON "posts_blocks_hero_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_cards_parent_id_idx" ON "posts_blocks_hero_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_order_idx" ON "posts_blocks_hero" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_parent_id_idx" ON "posts_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_path_idx" ON "posts_blocks_hero" USING btree ("_path");
  CREATE INDEX "posts_blocks_hero_extended_cards_order_idx" ON "posts_blocks_hero_extended_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_extended_cards_parent_id_idx" ON "posts_blocks_hero_extended_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_extended_order_idx" ON "posts_blocks_hero_extended" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_extended_parent_id_idx" ON "posts_blocks_hero_extended" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_extended_path_idx" ON "posts_blocks_hero_extended" USING btree ("_path");
  CREATE INDEX "posts_blocks_rich_text_order_idx" ON "posts_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "posts_blocks_rich_text_parent_id_idx" ON "posts_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_rich_text_path_idx" ON "posts_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "posts_blocks_side_by_side_bullets_order_idx" ON "posts_blocks_side_by_side_bullets" USING btree ("_order");
  CREATE INDEX "posts_blocks_side_by_side_bullets_parent_id_idx" ON "posts_blocks_side_by_side_bullets" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_side_by_side_small_icons_order_idx" ON "posts_blocks_side_by_side_small_icons" USING btree ("_order");
  CREATE INDEX "posts_blocks_side_by_side_small_icons_parent_id_idx" ON "posts_blocks_side_by_side_small_icons" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_side_by_side_bottom_cards_items_order_idx" ON "posts_blocks_side_by_side_bottom_cards_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_side_by_side_bottom_cards_items_parent_id_idx" ON "posts_blocks_side_by_side_bottom_cards_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_side_by_side_bottom_cards_order_idx" ON "posts_blocks_side_by_side_bottom_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_side_by_side_bottom_cards_parent_id_idx" ON "posts_blocks_side_by_side_bottom_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_side_by_side_order_idx" ON "posts_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "posts_blocks_side_by_side_parent_id_idx" ON "posts_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_side_by_side_path_idx" ON "posts_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "posts_blocks_story_cards_order_idx" ON "posts_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_story_cards_parent_id_idx" ON "posts_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_story_order_idx" ON "posts_blocks_story" USING btree ("_order");
  CREATE INDEX "posts_blocks_story_parent_id_idx" ON "posts_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_story_path_idx" ON "posts_blocks_story" USING btree ("_path");
  CREATE INDEX "posts_blocks_media_showcase_order_idx" ON "posts_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "posts_blocks_media_showcase_parent_id_idx" ON "posts_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_media_showcase_path_idx" ON "posts_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "posts_blocks_feature_grid_cards_order_idx" ON "posts_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_feature_grid_cards_parent_id_idx" ON "posts_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_feature_grid_order_idx" ON "posts_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "posts_blocks_feature_grid_parent_id_idx" ON "posts_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_feature_grid_path_idx" ON "posts_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "posts_blocks_agent_capabilities_items_order_idx" ON "posts_blocks_agent_capabilities_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_agent_capabilities_items_parent_id_idx" ON "posts_blocks_agent_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_agent_capabilities_order_idx" ON "posts_blocks_agent_capabilities" USING btree ("_order");
  CREATE INDEX "posts_blocks_agent_capabilities_parent_id_idx" ON "posts_blocks_agent_capabilities" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_agent_capabilities_path_idx" ON "posts_blocks_agent_capabilities" USING btree ("_path");
  CREATE INDEX "posts_blocks_agent_solutions_items_order_idx" ON "posts_blocks_agent_solutions_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_agent_solutions_items_parent_id_idx" ON "posts_blocks_agent_solutions_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_agent_solutions_order_idx" ON "posts_blocks_agent_solutions" USING btree ("_order");
  CREATE INDEX "posts_blocks_agent_solutions_parent_id_idx" ON "posts_blocks_agent_solutions" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_agent_solutions_path_idx" ON "posts_blocks_agent_solutions" USING btree ("_path");
  CREATE INDEX "posts_blocks_contact_us_order_idx" ON "posts_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "posts_blocks_contact_us_parent_id_idx" ON "posts_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_contact_us_path_idx" ON "posts_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "posts_blocks_concierge_flow_cards_order_idx" ON "posts_blocks_concierge_flow_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_concierge_flow_cards_parent_id_idx" ON "posts_blocks_concierge_flow_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_concierge_flow_order_idx" ON "posts_blocks_concierge_flow" USING btree ("_order");
  CREATE INDEX "posts_blocks_concierge_flow_parent_id_idx" ON "posts_blocks_concierge_flow" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_concierge_flow_path_idx" ON "posts_blocks_concierge_flow" USING btree ("_path");
  CREATE INDEX "posts_blocks_enterprise_upgrade_benefits_order_idx" ON "posts_blocks_enterprise_upgrade_benefits" USING btree ("_order");
  CREATE INDEX "posts_blocks_enterprise_upgrade_benefits_parent_id_idx" ON "posts_blocks_enterprise_upgrade_benefits" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_enterprise_upgrade_order_idx" ON "posts_blocks_enterprise_upgrade" USING btree ("_order");
  CREATE INDEX "posts_blocks_enterprise_upgrade_parent_id_idx" ON "posts_blocks_enterprise_upgrade" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_enterprise_upgrade_path_idx" ON "posts_blocks_enterprise_upgrade" USING btree ("_path");
  CREATE INDEX "posts_blocks_channels_grid_cards_order_idx" ON "posts_blocks_channels_grid_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_channels_grid_cards_parent_id_idx" ON "posts_blocks_channels_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_channels_grid_order_idx" ON "posts_blocks_channels_grid" USING btree ("_order");
  CREATE INDEX "posts_blocks_channels_grid_parent_id_idx" ON "posts_blocks_channels_grid" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_channels_grid_path_idx" ON "posts_blocks_channels_grid" USING btree ("_path");
  CREATE INDEX "posts_blocks_feature_stack_cards_order_idx" ON "posts_blocks_feature_stack_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_feature_stack_cards_parent_id_idx" ON "posts_blocks_feature_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_feature_stack_order_idx" ON "posts_blocks_feature_stack" USING btree ("_order");
  CREATE INDEX "posts_blocks_feature_stack_parent_id_idx" ON "posts_blocks_feature_stack" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_feature_stack_path_idx" ON "posts_blocks_feature_stack" USING btree ("_path");
  CREATE INDEX "posts_blocks_coverage_grid_cards_order_idx" ON "posts_blocks_coverage_grid_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_coverage_grid_cards_parent_id_idx" ON "posts_blocks_coverage_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_coverage_grid_order_idx" ON "posts_blocks_coverage_grid" USING btree ("_order");
  CREATE INDEX "posts_blocks_coverage_grid_parent_id_idx" ON "posts_blocks_coverage_grid" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_coverage_grid_path_idx" ON "posts_blocks_coverage_grid" USING btree ("_path");
  CREATE INDEX "posts_blocks_feature_rows_rows_order_idx" ON "posts_blocks_feature_rows_rows" USING btree ("_order");
  CREATE INDEX "posts_blocks_feature_rows_rows_parent_id_idx" ON "posts_blocks_feature_rows_rows" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_feature_rows_order_idx" ON "posts_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "posts_blocks_feature_rows_parent_id_idx" ON "posts_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_feature_rows_path_idx" ON "posts_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "posts_blocks_capability_trio_cards_order_idx" ON "posts_blocks_capability_trio_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_capability_trio_cards_parent_id_idx" ON "posts_blocks_capability_trio_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_capability_trio_order_idx" ON "posts_blocks_capability_trio" USING btree ("_order");
  CREATE INDEX "posts_blocks_capability_trio_parent_id_idx" ON "posts_blocks_capability_trio" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_capability_trio_path_idx" ON "posts_blocks_capability_trio" USING btree ("_path");
  CREATE INDEX "posts_blocks_capability_tools_cards_logos_order_idx" ON "posts_blocks_capability_tools_cards_logos" USING btree ("_order");
  CREATE INDEX "posts_blocks_capability_tools_cards_logos_parent_id_idx" ON "posts_blocks_capability_tools_cards_logos" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_capability_tools_cards_order_idx" ON "posts_blocks_capability_tools_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_capability_tools_cards_parent_id_idx" ON "posts_blocks_capability_tools_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_capability_tools_order_idx" ON "posts_blocks_capability_tools" USING btree ("_order");
  CREATE INDEX "posts_blocks_capability_tools_parent_id_idx" ON "posts_blocks_capability_tools" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_capability_tools_path_idx" ON "posts_blocks_capability_tools" USING btree ("_path");
  CREATE INDEX "posts_blocks_use_cases_grid_cards_order_idx" ON "posts_blocks_use_cases_grid_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_use_cases_grid_cards_parent_id_idx" ON "posts_blocks_use_cases_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_use_cases_grid_order_idx" ON "posts_blocks_use_cases_grid" USING btree ("_order");
  CREATE INDEX "posts_blocks_use_cases_grid_parent_id_idx" ON "posts_blocks_use_cases_grid" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_use_cases_grid_path_idx" ON "posts_blocks_use_cases_grid" USING btree ("_path");
  CREATE INDEX "posts_blocks_security_cards_order_idx" ON "posts_blocks_security_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_security_cards_parent_id_idx" ON "posts_blocks_security_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_security_order_idx" ON "posts_blocks_security" USING btree ("_order");
  CREATE INDEX "posts_blocks_security_parent_id_idx" ON "posts_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_security_path_idx" ON "posts_blocks_security" USING btree ("_path");
  CREATE INDEX "posts_blocks_functional_capabilities_cards_order_idx" ON "posts_blocks_functional_capabilities_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_functional_capabilities_cards_parent_id_idx" ON "posts_blocks_functional_capabilities_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_functional_capabilities_order_idx" ON "posts_blocks_functional_capabilities" USING btree ("_order");
  CREATE INDEX "posts_blocks_functional_capabilities_parent_id_idx" ON "posts_blocks_functional_capabilities" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_functional_capabilities_path_idx" ON "posts_blocks_functional_capabilities" USING btree ("_path");
  CREATE INDEX "posts_blocks_how_it_works_steps_order_idx" ON "posts_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "posts_blocks_how_it_works_steps_parent_id_idx" ON "posts_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_how_it_works_order_idx" ON "posts_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "posts_blocks_how_it_works_parent_id_idx" ON "posts_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_how_it_works_path_idx" ON "posts_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "posts_blocks_cta_order_idx" ON "posts_blocks_cta" USING btree ("_order");
  CREATE INDEX "posts_blocks_cta_parent_id_idx" ON "posts_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cta_path_idx" ON "posts_blocks_cta" USING btree ("_path");
  CREATE INDEX "posts_blocks_metrics_items_order_idx" ON "posts_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_metrics_items_parent_id_idx" ON "posts_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_metrics_order_idx" ON "posts_blocks_metrics" USING btree ("_order");
  CREATE INDEX "posts_blocks_metrics_parent_id_idx" ON "posts_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_metrics_path_idx" ON "posts_blocks_metrics" USING btree ("_path");
  CREATE INDEX "posts_blocks_results_stats_items_order_idx" ON "posts_blocks_results_stats_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_results_stats_items_parent_id_idx" ON "posts_blocks_results_stats_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_results_stats_order_idx" ON "posts_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_results_stats_parent_id_idx" ON "posts_blocks_results_stats" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_results_stats_path_idx" ON "posts_blocks_results_stats" USING btree ("_path");
  CREATE INDEX "posts_blocks_stats_cards_items_order_idx" ON "posts_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_cards_items_parent_id_idx" ON "posts_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_cards_order_idx" ON "posts_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_cards_parent_id_idx" ON "posts_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_cards_path_idx" ON "posts_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "posts_blocks_capability_strip_items_order_idx" ON "posts_blocks_capability_strip_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_capability_strip_items_parent_id_idx" ON "posts_blocks_capability_strip_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_capability_strip_order_idx" ON "posts_blocks_capability_strip" USING btree ("_order");
  CREATE INDEX "posts_blocks_capability_strip_parent_id_idx" ON "posts_blocks_capability_strip" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_capability_strip_path_idx" ON "posts_blocks_capability_strip" USING btree ("_path");
  CREATE INDEX "posts_blocks_live_in_days_items_order_idx" ON "posts_blocks_live_in_days_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_live_in_days_items_parent_id_idx" ON "posts_blocks_live_in_days_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_live_in_days_order_idx" ON "posts_blocks_live_in_days" USING btree ("_order");
  CREATE INDEX "posts_blocks_live_in_days_parent_id_idx" ON "posts_blocks_live_in_days" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_live_in_days_path_idx" ON "posts_blocks_live_in_days" USING btree ("_path");
  CREATE INDEX "posts_blocks_faq_items_order_idx" ON "posts_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_items_parent_id_idx" ON "posts_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_order_idx" ON "posts_blocks_faq" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_parent_id_idx" ON "posts_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_path_idx" ON "posts_blocks_faq" USING btree ("_path");
  CREATE INDEX "posts_blocks_news_insights_collections_order_idx" ON "posts_blocks_news_insights_collections" USING btree ("order");
  CREATE INDEX "posts_blocks_news_insights_collections_parent_idx" ON "posts_blocks_news_insights_collections" USING btree ("parent_id");
  CREATE INDEX "posts_blocks_news_insights_cards_tags_order_idx" ON "posts_blocks_news_insights_cards_tags" USING btree ("_order");
  CREATE INDEX "posts_blocks_news_insights_cards_tags_parent_id_idx" ON "posts_blocks_news_insights_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_news_insights_cards_order_idx" ON "posts_blocks_news_insights_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_news_insights_cards_parent_id_idx" ON "posts_blocks_news_insights_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_news_insights_order_idx" ON "posts_blocks_news_insights" USING btree ("_order");
  CREATE INDEX "posts_blocks_news_insights_parent_id_idx" ON "posts_blocks_news_insights" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_news_insights_path_idx" ON "posts_blocks_news_insights" USING btree ("_path");
  CREATE INDEX "posts_blocks_content_feed_collections_order_idx" ON "posts_blocks_content_feed_collections" USING btree ("order");
  CREATE INDEX "posts_blocks_content_feed_collections_parent_idx" ON "posts_blocks_content_feed_collections" USING btree ("parent_id");
  CREATE INDEX "posts_blocks_content_feed_cards_tags_order_idx" ON "posts_blocks_content_feed_cards_tags" USING btree ("_order");
  CREATE INDEX "posts_blocks_content_feed_cards_tags_parent_id_idx" ON "posts_blocks_content_feed_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_content_feed_cards_order_idx" ON "posts_blocks_content_feed_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_content_feed_cards_parent_id_idx" ON "posts_blocks_content_feed_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_content_feed_order_idx" ON "posts_blocks_content_feed" USING btree ("_order");
  CREATE INDEX "posts_blocks_content_feed_parent_id_idx" ON "posts_blocks_content_feed" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_content_feed_path_idx" ON "posts_blocks_content_feed" USING btree ("_path");
  CREATE INDEX "posts_blocks_pricing_cards_cards_features_order_idx" ON "posts_blocks_pricing_cards_cards_features" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_cards_cards_features_parent_id_idx" ON "posts_blocks_pricing_cards_cards_features" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_cards_cards_order_idx" ON "posts_blocks_pricing_cards_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_cards_cards_parent_id_idx" ON "posts_blocks_pricing_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_cards_order_idx" ON "posts_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_cards_parent_id_idx" ON "posts_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_cards_path_idx" ON "posts_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "posts_blocks_pricing_details_sections_headers_order_idx" ON "posts_blocks_pricing_details_sections_headers" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_details_sections_headers_parent_id_idx" ON "posts_blocks_pricing_details_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_details_sections_rows_cells_order_idx" ON "posts_blocks_pricing_details_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_details_sections_rows_cells_parent_id_idx" ON "posts_blocks_pricing_details_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_details_sections_rows_order_idx" ON "posts_blocks_pricing_details_sections_rows" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_details_sections_rows_parent_id_idx" ON "posts_blocks_pricing_details_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_details_sections_order_idx" ON "posts_blocks_pricing_details_sections" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_details_sections_parent_id_idx" ON "posts_blocks_pricing_details_sections" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_details_order_idx" ON "posts_blocks_pricing_details" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_details_parent_id_idx" ON "posts_blocks_pricing_details" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_details_path_idx" ON "posts_blocks_pricing_details" USING btree ("_path");
  CREATE INDEX "posts_blocks_difference_left_items_order_idx" ON "posts_blocks_difference_left_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_difference_left_items_parent_id_idx" ON "posts_blocks_difference_left_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_difference_right_items_order_idx" ON "posts_blocks_difference_right_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_difference_right_items_parent_id_idx" ON "posts_blocks_difference_right_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_difference_order_idx" ON "posts_blocks_difference" USING btree ("_order");
  CREATE INDEX "posts_blocks_difference_parent_id_idx" ON "posts_blocks_difference" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_difference_path_idx" ON "posts_blocks_difference" USING btree ("_path");
  CREATE INDEX "posts_blocks_pain_points_comparison_rows_order_idx" ON "posts_blocks_pain_points_comparison_rows" USING btree ("_order");
  CREATE INDEX "posts_blocks_pain_points_comparison_rows_parent_id_idx" ON "posts_blocks_pain_points_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pain_points_comparison_order_idx" ON "posts_blocks_pain_points_comparison" USING btree ("_order");
  CREATE INDEX "posts_blocks_pain_points_comparison_parent_id_idx" ON "posts_blocks_pain_points_comparison" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pain_points_comparison_path_idx" ON "posts_blocks_pain_points_comparison" USING btree ("_path");
  CREATE INDEX "posts_blocks_pricing_policy_callouts_order_idx" ON "posts_blocks_pricing_policy_callouts" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_policy_callouts_parent_id_idx" ON "posts_blocks_pricing_policy_callouts" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_policy_order_idx" ON "posts_blocks_pricing_policy" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_policy_parent_id_idx" ON "posts_blocks_pricing_policy" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_policy_path_idx" ON "posts_blocks_pricing_policy" USING btree ("_path");
  CREATE INDEX "posts_blocks_industry_expertise_items_order_idx" ON "posts_blocks_industry_expertise_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_industry_expertise_items_parent_id_idx" ON "posts_blocks_industry_expertise_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_industry_expertise_info_cards_order_idx" ON "posts_blocks_industry_expertise_info_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_industry_expertise_info_cards_parent_id_idx" ON "posts_blocks_industry_expertise_info_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_industry_expertise_order_idx" ON "posts_blocks_industry_expertise" USING btree ("_order");
  CREATE INDEX "posts_blocks_industry_expertise_parent_id_idx" ON "posts_blocks_industry_expertise" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_industry_expertise_path_idx" ON "posts_blocks_industry_expertise" USING btree ("_path");
  CREATE INDEX "posts_blocks_logo_strip_logos_order_idx" ON "posts_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "posts_blocks_logo_strip_logos_parent_id_idx" ON "posts_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_logo_strip_stats_order_idx" ON "posts_blocks_logo_strip_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_logo_strip_stats_parent_id_idx" ON "posts_blocks_logo_strip_stats" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_logo_strip_order_idx" ON "posts_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "posts_blocks_logo_strip_parent_id_idx" ON "posts_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_logo_strip_path_idx" ON "posts_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "posts_blocks_integrations_banner_items_order_idx" ON "posts_blocks_integrations_banner_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_integrations_banner_items_parent_id_idx" ON "posts_blocks_integrations_banner_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_integrations_banner_order_idx" ON "posts_blocks_integrations_banner" USING btree ("_order");
  CREATE INDEX "posts_blocks_integrations_banner_parent_id_idx" ON "posts_blocks_integrations_banner" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_integrations_banner_path_idx" ON "posts_blocks_integrations_banner" USING btree ("_path");
  CREATE INDEX "posts_blocks_logo_grid_columns_items_order_idx" ON "posts_blocks_logo_grid_columns_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_logo_grid_columns_items_parent_id_idx" ON "posts_blocks_logo_grid_columns_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_logo_grid_columns_order_idx" ON "posts_blocks_logo_grid_columns" USING btree ("_order");
  CREATE INDEX "posts_blocks_logo_grid_columns_parent_id_idx" ON "posts_blocks_logo_grid_columns" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_logo_grid_order_idx" ON "posts_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "posts_blocks_logo_grid_parent_id_idx" ON "posts_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_logo_grid_path_idx" ON "posts_blocks_logo_grid" USING btree ("_path");
  CREATE INDEX "posts_blocks_tabs_showcase_tabs_steps_order_idx" ON "posts_blocks_tabs_showcase_tabs_steps" USING btree ("_order");
  CREATE INDEX "posts_blocks_tabs_showcase_tabs_steps_parent_id_idx" ON "posts_blocks_tabs_showcase_tabs_steps" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_tabs_showcase_tabs_order_idx" ON "posts_blocks_tabs_showcase_tabs" USING btree ("_order");
  CREATE INDEX "posts_blocks_tabs_showcase_tabs_parent_id_idx" ON "posts_blocks_tabs_showcase_tabs" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_tabs_showcase_order_idx" ON "posts_blocks_tabs_showcase" USING btree ("_order");
  CREATE INDEX "posts_blocks_tabs_showcase_parent_id_idx" ON "posts_blocks_tabs_showcase" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_tabs_showcase_path_idx" ON "posts_blocks_tabs_showcase" USING btree ("_path");
  CREATE INDEX "posts_blocks_anchor_nav_items_order_idx" ON "posts_blocks_anchor_nav_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_anchor_nav_items_parent_id_idx" ON "posts_blocks_anchor_nav_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_anchor_nav_order_idx" ON "posts_blocks_anchor_nav" USING btree ("_order");
  CREATE INDEX "posts_blocks_anchor_nav_parent_id_idx" ON "posts_blocks_anchor_nav" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_anchor_nav_path_idx" ON "posts_blocks_anchor_nav" USING btree ("_path");
  CREATE INDEX "posts_blocks_testimonials_items_order_idx" ON "posts_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_testimonials_items_parent_id_idx" ON "posts_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_testimonials_order_idx" ON "posts_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "posts_blocks_testimonials_parent_id_idx" ON "posts_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_testimonials_path_idx" ON "posts_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "posts_blocks_comparison_grid_cards_order_idx" ON "posts_blocks_comparison_grid_cards" USING btree ("_order");
  CREATE INDEX "posts_blocks_comparison_grid_cards_parent_id_idx" ON "posts_blocks_comparison_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_comparison_grid_order_idx" ON "posts_blocks_comparison_grid" USING btree ("_order");
  CREATE INDEX "posts_blocks_comparison_grid_parent_id_idx" ON "posts_blocks_comparison_grid" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_comparison_grid_path_idx" ON "posts_blocks_comparison_grid" USING btree ("_path");
  CREATE INDEX "posts_blocks_use_case_flow_columns_items_order_idx" ON "posts_blocks_use_case_flow_columns_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_use_case_flow_columns_items_parent_id_idx" ON "posts_blocks_use_case_flow_columns_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_use_case_flow_columns_order_idx" ON "posts_blocks_use_case_flow_columns" USING btree ("_order");
  CREATE INDEX "posts_blocks_use_case_flow_columns_parent_id_idx" ON "posts_blocks_use_case_flow_columns" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_use_case_flow_order_idx" ON "posts_blocks_use_case_flow" USING btree ("_order");
  CREATE INDEX "posts_blocks_use_case_flow_parent_id_idx" ON "posts_blocks_use_case_flow" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_use_case_flow_path_idx" ON "posts_blocks_use_case_flow" USING btree ("_path");
  CREATE INDEX "posts_article_meta_tags_order_idx" ON "posts_article_meta_tags" USING btree ("_order");
  CREATE INDEX "posts_article_meta_tags_parent_id_idx" ON "posts_article_meta_tags" USING btree ("_parent_id");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE UNIQUE INDEX "posts_path_idx" ON "posts" USING btree ("path");
  CREATE INDEX "posts_content_key_idx" ON "posts" USING btree ("content_key");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "news_blocks_hero_cards_order_idx" ON "news_blocks_hero_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_hero_cards_parent_id_idx" ON "news_blocks_hero_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_hero_order_idx" ON "news_blocks_hero" USING btree ("_order");
  CREATE INDEX "news_blocks_hero_parent_id_idx" ON "news_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_hero_path_idx" ON "news_blocks_hero" USING btree ("_path");
  CREATE INDEX "news_blocks_hero_extended_cards_order_idx" ON "news_blocks_hero_extended_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_hero_extended_cards_parent_id_idx" ON "news_blocks_hero_extended_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_hero_extended_order_idx" ON "news_blocks_hero_extended" USING btree ("_order");
  CREATE INDEX "news_blocks_hero_extended_parent_id_idx" ON "news_blocks_hero_extended" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_hero_extended_path_idx" ON "news_blocks_hero_extended" USING btree ("_path");
  CREATE INDEX "news_blocks_rich_text_order_idx" ON "news_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "news_blocks_rich_text_parent_id_idx" ON "news_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_rich_text_path_idx" ON "news_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "news_blocks_side_by_side_bullets_order_idx" ON "news_blocks_side_by_side_bullets" USING btree ("_order");
  CREATE INDEX "news_blocks_side_by_side_bullets_parent_id_idx" ON "news_blocks_side_by_side_bullets" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_side_by_side_small_icons_order_idx" ON "news_blocks_side_by_side_small_icons" USING btree ("_order");
  CREATE INDEX "news_blocks_side_by_side_small_icons_parent_id_idx" ON "news_blocks_side_by_side_small_icons" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_side_by_side_bottom_cards_items_order_idx" ON "news_blocks_side_by_side_bottom_cards_items" USING btree ("_order");
  CREATE INDEX "news_blocks_side_by_side_bottom_cards_items_parent_id_idx" ON "news_blocks_side_by_side_bottom_cards_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_side_by_side_bottom_cards_order_idx" ON "news_blocks_side_by_side_bottom_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_side_by_side_bottom_cards_parent_id_idx" ON "news_blocks_side_by_side_bottom_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_side_by_side_order_idx" ON "news_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "news_blocks_side_by_side_parent_id_idx" ON "news_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_side_by_side_path_idx" ON "news_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "news_blocks_story_cards_order_idx" ON "news_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_story_cards_parent_id_idx" ON "news_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_story_order_idx" ON "news_blocks_story" USING btree ("_order");
  CREATE INDEX "news_blocks_story_parent_id_idx" ON "news_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_story_path_idx" ON "news_blocks_story" USING btree ("_path");
  CREATE INDEX "news_blocks_media_showcase_order_idx" ON "news_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "news_blocks_media_showcase_parent_id_idx" ON "news_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_media_showcase_path_idx" ON "news_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "news_blocks_feature_grid_cards_order_idx" ON "news_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_feature_grid_cards_parent_id_idx" ON "news_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_feature_grid_order_idx" ON "news_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "news_blocks_feature_grid_parent_id_idx" ON "news_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_feature_grid_path_idx" ON "news_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "news_blocks_agent_capabilities_items_order_idx" ON "news_blocks_agent_capabilities_items" USING btree ("_order");
  CREATE INDEX "news_blocks_agent_capabilities_items_parent_id_idx" ON "news_blocks_agent_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_agent_capabilities_order_idx" ON "news_blocks_agent_capabilities" USING btree ("_order");
  CREATE INDEX "news_blocks_agent_capabilities_parent_id_idx" ON "news_blocks_agent_capabilities" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_agent_capabilities_path_idx" ON "news_blocks_agent_capabilities" USING btree ("_path");
  CREATE INDEX "news_blocks_agent_solutions_items_order_idx" ON "news_blocks_agent_solutions_items" USING btree ("_order");
  CREATE INDEX "news_blocks_agent_solutions_items_parent_id_idx" ON "news_blocks_agent_solutions_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_agent_solutions_order_idx" ON "news_blocks_agent_solutions" USING btree ("_order");
  CREATE INDEX "news_blocks_agent_solutions_parent_id_idx" ON "news_blocks_agent_solutions" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_agent_solutions_path_idx" ON "news_blocks_agent_solutions" USING btree ("_path");
  CREATE INDEX "news_blocks_contact_us_order_idx" ON "news_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "news_blocks_contact_us_parent_id_idx" ON "news_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_contact_us_path_idx" ON "news_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "news_blocks_concierge_flow_cards_order_idx" ON "news_blocks_concierge_flow_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_concierge_flow_cards_parent_id_idx" ON "news_blocks_concierge_flow_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_concierge_flow_order_idx" ON "news_blocks_concierge_flow" USING btree ("_order");
  CREATE INDEX "news_blocks_concierge_flow_parent_id_idx" ON "news_blocks_concierge_flow" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_concierge_flow_path_idx" ON "news_blocks_concierge_flow" USING btree ("_path");
  CREATE INDEX "news_blocks_enterprise_upgrade_benefits_order_idx" ON "news_blocks_enterprise_upgrade_benefits" USING btree ("_order");
  CREATE INDEX "news_blocks_enterprise_upgrade_benefits_parent_id_idx" ON "news_blocks_enterprise_upgrade_benefits" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_enterprise_upgrade_order_idx" ON "news_blocks_enterprise_upgrade" USING btree ("_order");
  CREATE INDEX "news_blocks_enterprise_upgrade_parent_id_idx" ON "news_blocks_enterprise_upgrade" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_enterprise_upgrade_path_idx" ON "news_blocks_enterprise_upgrade" USING btree ("_path");
  CREATE INDEX "news_blocks_channels_grid_cards_order_idx" ON "news_blocks_channels_grid_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_channels_grid_cards_parent_id_idx" ON "news_blocks_channels_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_channels_grid_order_idx" ON "news_blocks_channels_grid" USING btree ("_order");
  CREATE INDEX "news_blocks_channels_grid_parent_id_idx" ON "news_blocks_channels_grid" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_channels_grid_path_idx" ON "news_blocks_channels_grid" USING btree ("_path");
  CREATE INDEX "news_blocks_feature_stack_cards_order_idx" ON "news_blocks_feature_stack_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_feature_stack_cards_parent_id_idx" ON "news_blocks_feature_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_feature_stack_order_idx" ON "news_blocks_feature_stack" USING btree ("_order");
  CREATE INDEX "news_blocks_feature_stack_parent_id_idx" ON "news_blocks_feature_stack" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_feature_stack_path_idx" ON "news_blocks_feature_stack" USING btree ("_path");
  CREATE INDEX "news_blocks_coverage_grid_cards_order_idx" ON "news_blocks_coverage_grid_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_coverage_grid_cards_parent_id_idx" ON "news_blocks_coverage_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_coverage_grid_order_idx" ON "news_blocks_coverage_grid" USING btree ("_order");
  CREATE INDEX "news_blocks_coverage_grid_parent_id_idx" ON "news_blocks_coverage_grid" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_coverage_grid_path_idx" ON "news_blocks_coverage_grid" USING btree ("_path");
  CREATE INDEX "news_blocks_feature_rows_rows_order_idx" ON "news_blocks_feature_rows_rows" USING btree ("_order");
  CREATE INDEX "news_blocks_feature_rows_rows_parent_id_idx" ON "news_blocks_feature_rows_rows" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_feature_rows_order_idx" ON "news_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "news_blocks_feature_rows_parent_id_idx" ON "news_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_feature_rows_path_idx" ON "news_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "news_blocks_capability_trio_cards_order_idx" ON "news_blocks_capability_trio_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_capability_trio_cards_parent_id_idx" ON "news_blocks_capability_trio_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_capability_trio_order_idx" ON "news_blocks_capability_trio" USING btree ("_order");
  CREATE INDEX "news_blocks_capability_trio_parent_id_idx" ON "news_blocks_capability_trio" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_capability_trio_path_idx" ON "news_blocks_capability_trio" USING btree ("_path");
  CREATE INDEX "news_blocks_capability_tools_cards_logos_order_idx" ON "news_blocks_capability_tools_cards_logos" USING btree ("_order");
  CREATE INDEX "news_blocks_capability_tools_cards_logos_parent_id_idx" ON "news_blocks_capability_tools_cards_logos" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_capability_tools_cards_order_idx" ON "news_blocks_capability_tools_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_capability_tools_cards_parent_id_idx" ON "news_blocks_capability_tools_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_capability_tools_order_idx" ON "news_blocks_capability_tools" USING btree ("_order");
  CREATE INDEX "news_blocks_capability_tools_parent_id_idx" ON "news_blocks_capability_tools" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_capability_tools_path_idx" ON "news_blocks_capability_tools" USING btree ("_path");
  CREATE INDEX "news_blocks_use_cases_grid_cards_order_idx" ON "news_blocks_use_cases_grid_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_use_cases_grid_cards_parent_id_idx" ON "news_blocks_use_cases_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_use_cases_grid_order_idx" ON "news_blocks_use_cases_grid" USING btree ("_order");
  CREATE INDEX "news_blocks_use_cases_grid_parent_id_idx" ON "news_blocks_use_cases_grid" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_use_cases_grid_path_idx" ON "news_blocks_use_cases_grid" USING btree ("_path");
  CREATE INDEX "news_blocks_security_cards_order_idx" ON "news_blocks_security_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_security_cards_parent_id_idx" ON "news_blocks_security_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_security_order_idx" ON "news_blocks_security" USING btree ("_order");
  CREATE INDEX "news_blocks_security_parent_id_idx" ON "news_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_security_path_idx" ON "news_blocks_security" USING btree ("_path");
  CREATE INDEX "news_blocks_functional_capabilities_cards_order_idx" ON "news_blocks_functional_capabilities_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_functional_capabilities_cards_parent_id_idx" ON "news_blocks_functional_capabilities_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_functional_capabilities_order_idx" ON "news_blocks_functional_capabilities" USING btree ("_order");
  CREATE INDEX "news_blocks_functional_capabilities_parent_id_idx" ON "news_blocks_functional_capabilities" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_functional_capabilities_path_idx" ON "news_blocks_functional_capabilities" USING btree ("_path");
  CREATE INDEX "news_blocks_how_it_works_steps_order_idx" ON "news_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "news_blocks_how_it_works_steps_parent_id_idx" ON "news_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_how_it_works_order_idx" ON "news_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "news_blocks_how_it_works_parent_id_idx" ON "news_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_how_it_works_path_idx" ON "news_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "news_blocks_cta_order_idx" ON "news_blocks_cta" USING btree ("_order");
  CREATE INDEX "news_blocks_cta_parent_id_idx" ON "news_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_cta_path_idx" ON "news_blocks_cta" USING btree ("_path");
  CREATE INDEX "news_blocks_metrics_items_order_idx" ON "news_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "news_blocks_metrics_items_parent_id_idx" ON "news_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_metrics_order_idx" ON "news_blocks_metrics" USING btree ("_order");
  CREATE INDEX "news_blocks_metrics_parent_id_idx" ON "news_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_metrics_path_idx" ON "news_blocks_metrics" USING btree ("_path");
  CREATE INDEX "news_blocks_results_stats_items_order_idx" ON "news_blocks_results_stats_items" USING btree ("_order");
  CREATE INDEX "news_blocks_results_stats_items_parent_id_idx" ON "news_blocks_results_stats_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_results_stats_order_idx" ON "news_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "news_blocks_results_stats_parent_id_idx" ON "news_blocks_results_stats" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_results_stats_path_idx" ON "news_blocks_results_stats" USING btree ("_path");
  CREATE INDEX "news_blocks_stats_cards_items_order_idx" ON "news_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "news_blocks_stats_cards_items_parent_id_idx" ON "news_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_stats_cards_order_idx" ON "news_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_stats_cards_parent_id_idx" ON "news_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_stats_cards_path_idx" ON "news_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "news_blocks_capability_strip_items_order_idx" ON "news_blocks_capability_strip_items" USING btree ("_order");
  CREATE INDEX "news_blocks_capability_strip_items_parent_id_idx" ON "news_blocks_capability_strip_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_capability_strip_order_idx" ON "news_blocks_capability_strip" USING btree ("_order");
  CREATE INDEX "news_blocks_capability_strip_parent_id_idx" ON "news_blocks_capability_strip" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_capability_strip_path_idx" ON "news_blocks_capability_strip" USING btree ("_path");
  CREATE INDEX "news_blocks_live_in_days_items_order_idx" ON "news_blocks_live_in_days_items" USING btree ("_order");
  CREATE INDEX "news_blocks_live_in_days_items_parent_id_idx" ON "news_blocks_live_in_days_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_live_in_days_order_idx" ON "news_blocks_live_in_days" USING btree ("_order");
  CREATE INDEX "news_blocks_live_in_days_parent_id_idx" ON "news_blocks_live_in_days" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_live_in_days_path_idx" ON "news_blocks_live_in_days" USING btree ("_path");
  CREATE INDEX "news_blocks_faq_items_order_idx" ON "news_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "news_blocks_faq_items_parent_id_idx" ON "news_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_faq_order_idx" ON "news_blocks_faq" USING btree ("_order");
  CREATE INDEX "news_blocks_faq_parent_id_idx" ON "news_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_faq_path_idx" ON "news_blocks_faq" USING btree ("_path");
  CREATE INDEX "news_blocks_news_insights_collections_order_idx" ON "news_blocks_news_insights_collections" USING btree ("order");
  CREATE INDEX "news_blocks_news_insights_collections_parent_idx" ON "news_blocks_news_insights_collections" USING btree ("parent_id");
  CREATE INDEX "news_blocks_news_insights_cards_tags_order_idx" ON "news_blocks_news_insights_cards_tags" USING btree ("_order");
  CREATE INDEX "news_blocks_news_insights_cards_tags_parent_id_idx" ON "news_blocks_news_insights_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_news_insights_cards_order_idx" ON "news_blocks_news_insights_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_news_insights_cards_parent_id_idx" ON "news_blocks_news_insights_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_news_insights_order_idx" ON "news_blocks_news_insights" USING btree ("_order");
  CREATE INDEX "news_blocks_news_insights_parent_id_idx" ON "news_blocks_news_insights" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_news_insights_path_idx" ON "news_blocks_news_insights" USING btree ("_path");
  CREATE INDEX "news_blocks_content_feed_collections_order_idx" ON "news_blocks_content_feed_collections" USING btree ("order");
  CREATE INDEX "news_blocks_content_feed_collections_parent_idx" ON "news_blocks_content_feed_collections" USING btree ("parent_id");
  CREATE INDEX "news_blocks_content_feed_cards_tags_order_idx" ON "news_blocks_content_feed_cards_tags" USING btree ("_order");
  CREATE INDEX "news_blocks_content_feed_cards_tags_parent_id_idx" ON "news_blocks_content_feed_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_content_feed_cards_order_idx" ON "news_blocks_content_feed_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_content_feed_cards_parent_id_idx" ON "news_blocks_content_feed_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_content_feed_order_idx" ON "news_blocks_content_feed" USING btree ("_order");
  CREATE INDEX "news_blocks_content_feed_parent_id_idx" ON "news_blocks_content_feed" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_content_feed_path_idx" ON "news_blocks_content_feed" USING btree ("_path");
  CREATE INDEX "news_blocks_pricing_cards_cards_features_order_idx" ON "news_blocks_pricing_cards_cards_features" USING btree ("_order");
  CREATE INDEX "news_blocks_pricing_cards_cards_features_parent_id_idx" ON "news_blocks_pricing_cards_cards_features" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_pricing_cards_cards_order_idx" ON "news_blocks_pricing_cards_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_pricing_cards_cards_parent_id_idx" ON "news_blocks_pricing_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_pricing_cards_order_idx" ON "news_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_pricing_cards_parent_id_idx" ON "news_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_pricing_cards_path_idx" ON "news_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "news_blocks_pricing_details_sections_headers_order_idx" ON "news_blocks_pricing_details_sections_headers" USING btree ("_order");
  CREATE INDEX "news_blocks_pricing_details_sections_headers_parent_id_idx" ON "news_blocks_pricing_details_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_pricing_details_sections_rows_cells_order_idx" ON "news_blocks_pricing_details_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "news_blocks_pricing_details_sections_rows_cells_parent_id_idx" ON "news_blocks_pricing_details_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_pricing_details_sections_rows_order_idx" ON "news_blocks_pricing_details_sections_rows" USING btree ("_order");
  CREATE INDEX "news_blocks_pricing_details_sections_rows_parent_id_idx" ON "news_blocks_pricing_details_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_pricing_details_sections_order_idx" ON "news_blocks_pricing_details_sections" USING btree ("_order");
  CREATE INDEX "news_blocks_pricing_details_sections_parent_id_idx" ON "news_blocks_pricing_details_sections" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_pricing_details_order_idx" ON "news_blocks_pricing_details" USING btree ("_order");
  CREATE INDEX "news_blocks_pricing_details_parent_id_idx" ON "news_blocks_pricing_details" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_pricing_details_path_idx" ON "news_blocks_pricing_details" USING btree ("_path");
  CREATE INDEX "news_blocks_difference_left_items_order_idx" ON "news_blocks_difference_left_items" USING btree ("_order");
  CREATE INDEX "news_blocks_difference_left_items_parent_id_idx" ON "news_blocks_difference_left_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_difference_right_items_order_idx" ON "news_blocks_difference_right_items" USING btree ("_order");
  CREATE INDEX "news_blocks_difference_right_items_parent_id_idx" ON "news_blocks_difference_right_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_difference_order_idx" ON "news_blocks_difference" USING btree ("_order");
  CREATE INDEX "news_blocks_difference_parent_id_idx" ON "news_blocks_difference" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_difference_path_idx" ON "news_blocks_difference" USING btree ("_path");
  CREATE INDEX "news_blocks_pain_points_comparison_rows_order_idx" ON "news_blocks_pain_points_comparison_rows" USING btree ("_order");
  CREATE INDEX "news_blocks_pain_points_comparison_rows_parent_id_idx" ON "news_blocks_pain_points_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_pain_points_comparison_order_idx" ON "news_blocks_pain_points_comparison" USING btree ("_order");
  CREATE INDEX "news_blocks_pain_points_comparison_parent_id_idx" ON "news_blocks_pain_points_comparison" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_pain_points_comparison_path_idx" ON "news_blocks_pain_points_comparison" USING btree ("_path");
  CREATE INDEX "news_blocks_pricing_policy_callouts_order_idx" ON "news_blocks_pricing_policy_callouts" USING btree ("_order");
  CREATE INDEX "news_blocks_pricing_policy_callouts_parent_id_idx" ON "news_blocks_pricing_policy_callouts" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_pricing_policy_order_idx" ON "news_blocks_pricing_policy" USING btree ("_order");
  CREATE INDEX "news_blocks_pricing_policy_parent_id_idx" ON "news_blocks_pricing_policy" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_pricing_policy_path_idx" ON "news_blocks_pricing_policy" USING btree ("_path");
  CREATE INDEX "news_blocks_industry_expertise_items_order_idx" ON "news_blocks_industry_expertise_items" USING btree ("_order");
  CREATE INDEX "news_blocks_industry_expertise_items_parent_id_idx" ON "news_blocks_industry_expertise_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_industry_expertise_info_cards_order_idx" ON "news_blocks_industry_expertise_info_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_industry_expertise_info_cards_parent_id_idx" ON "news_blocks_industry_expertise_info_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_industry_expertise_order_idx" ON "news_blocks_industry_expertise" USING btree ("_order");
  CREATE INDEX "news_blocks_industry_expertise_parent_id_idx" ON "news_blocks_industry_expertise" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_industry_expertise_path_idx" ON "news_blocks_industry_expertise" USING btree ("_path");
  CREATE INDEX "news_blocks_logo_strip_logos_order_idx" ON "news_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "news_blocks_logo_strip_logos_parent_id_idx" ON "news_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_logo_strip_stats_order_idx" ON "news_blocks_logo_strip_stats" USING btree ("_order");
  CREATE INDEX "news_blocks_logo_strip_stats_parent_id_idx" ON "news_blocks_logo_strip_stats" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_logo_strip_order_idx" ON "news_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "news_blocks_logo_strip_parent_id_idx" ON "news_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_logo_strip_path_idx" ON "news_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "news_blocks_integrations_banner_items_order_idx" ON "news_blocks_integrations_banner_items" USING btree ("_order");
  CREATE INDEX "news_blocks_integrations_banner_items_parent_id_idx" ON "news_blocks_integrations_banner_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_integrations_banner_order_idx" ON "news_blocks_integrations_banner" USING btree ("_order");
  CREATE INDEX "news_blocks_integrations_banner_parent_id_idx" ON "news_blocks_integrations_banner" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_integrations_banner_path_idx" ON "news_blocks_integrations_banner" USING btree ("_path");
  CREATE INDEX "news_blocks_logo_grid_columns_items_order_idx" ON "news_blocks_logo_grid_columns_items" USING btree ("_order");
  CREATE INDEX "news_blocks_logo_grid_columns_items_parent_id_idx" ON "news_blocks_logo_grid_columns_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_logo_grid_columns_order_idx" ON "news_blocks_logo_grid_columns" USING btree ("_order");
  CREATE INDEX "news_blocks_logo_grid_columns_parent_id_idx" ON "news_blocks_logo_grid_columns" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_logo_grid_order_idx" ON "news_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "news_blocks_logo_grid_parent_id_idx" ON "news_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_logo_grid_path_idx" ON "news_blocks_logo_grid" USING btree ("_path");
  CREATE INDEX "news_blocks_tabs_showcase_tabs_steps_order_idx" ON "news_blocks_tabs_showcase_tabs_steps" USING btree ("_order");
  CREATE INDEX "news_blocks_tabs_showcase_tabs_steps_parent_id_idx" ON "news_blocks_tabs_showcase_tabs_steps" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_tabs_showcase_tabs_order_idx" ON "news_blocks_tabs_showcase_tabs" USING btree ("_order");
  CREATE INDEX "news_blocks_tabs_showcase_tabs_parent_id_idx" ON "news_blocks_tabs_showcase_tabs" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_tabs_showcase_order_idx" ON "news_blocks_tabs_showcase" USING btree ("_order");
  CREATE INDEX "news_blocks_tabs_showcase_parent_id_idx" ON "news_blocks_tabs_showcase" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_tabs_showcase_path_idx" ON "news_blocks_tabs_showcase" USING btree ("_path");
  CREATE INDEX "news_blocks_anchor_nav_items_order_idx" ON "news_blocks_anchor_nav_items" USING btree ("_order");
  CREATE INDEX "news_blocks_anchor_nav_items_parent_id_idx" ON "news_blocks_anchor_nav_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_anchor_nav_order_idx" ON "news_blocks_anchor_nav" USING btree ("_order");
  CREATE INDEX "news_blocks_anchor_nav_parent_id_idx" ON "news_blocks_anchor_nav" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_anchor_nav_path_idx" ON "news_blocks_anchor_nav" USING btree ("_path");
  CREATE INDEX "news_blocks_testimonials_items_order_idx" ON "news_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "news_blocks_testimonials_items_parent_id_idx" ON "news_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_testimonials_order_idx" ON "news_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "news_blocks_testimonials_parent_id_idx" ON "news_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_testimonials_path_idx" ON "news_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "news_blocks_comparison_grid_cards_order_idx" ON "news_blocks_comparison_grid_cards" USING btree ("_order");
  CREATE INDEX "news_blocks_comparison_grid_cards_parent_id_idx" ON "news_blocks_comparison_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_comparison_grid_order_idx" ON "news_blocks_comparison_grid" USING btree ("_order");
  CREATE INDEX "news_blocks_comparison_grid_parent_id_idx" ON "news_blocks_comparison_grid" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_comparison_grid_path_idx" ON "news_blocks_comparison_grid" USING btree ("_path");
  CREATE INDEX "news_blocks_use_case_flow_columns_items_order_idx" ON "news_blocks_use_case_flow_columns_items" USING btree ("_order");
  CREATE INDEX "news_blocks_use_case_flow_columns_items_parent_id_idx" ON "news_blocks_use_case_flow_columns_items" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_use_case_flow_columns_order_idx" ON "news_blocks_use_case_flow_columns" USING btree ("_order");
  CREATE INDEX "news_blocks_use_case_flow_columns_parent_id_idx" ON "news_blocks_use_case_flow_columns" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_use_case_flow_order_idx" ON "news_blocks_use_case_flow" USING btree ("_order");
  CREATE INDEX "news_blocks_use_case_flow_parent_id_idx" ON "news_blocks_use_case_flow" USING btree ("_parent_id");
  CREATE INDEX "news_blocks_use_case_flow_path_idx" ON "news_blocks_use_case_flow" USING btree ("_path");
  CREATE INDEX "news_article_meta_tags_order_idx" ON "news_article_meta_tags" USING btree ("_order");
  CREATE INDEX "news_article_meta_tags_parent_id_idx" ON "news_article_meta_tags" USING btree ("_parent_id");
  CREATE INDEX "news_featured_image_idx" ON "news" USING btree ("featured_image_id");
  CREATE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE UNIQUE INDEX "news_path_idx" ON "news" USING btree ("path");
  CREATE INDEX "news_content_key_idx" ON "news" USING btree ("content_key");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "guides_blocks_hero_cards_order_idx" ON "guides_blocks_hero_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_hero_cards_parent_id_idx" ON "guides_blocks_hero_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_hero_order_idx" ON "guides_blocks_hero" USING btree ("_order");
  CREATE INDEX "guides_blocks_hero_parent_id_idx" ON "guides_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_hero_path_idx" ON "guides_blocks_hero" USING btree ("_path");
  CREATE INDEX "guides_blocks_hero_extended_cards_order_idx" ON "guides_blocks_hero_extended_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_hero_extended_cards_parent_id_idx" ON "guides_blocks_hero_extended_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_hero_extended_order_idx" ON "guides_blocks_hero_extended" USING btree ("_order");
  CREATE INDEX "guides_blocks_hero_extended_parent_id_idx" ON "guides_blocks_hero_extended" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_hero_extended_path_idx" ON "guides_blocks_hero_extended" USING btree ("_path");
  CREATE INDEX "guides_blocks_rich_text_order_idx" ON "guides_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "guides_blocks_rich_text_parent_id_idx" ON "guides_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_rich_text_path_idx" ON "guides_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "guides_blocks_side_by_side_bullets_order_idx" ON "guides_blocks_side_by_side_bullets" USING btree ("_order");
  CREATE INDEX "guides_blocks_side_by_side_bullets_parent_id_idx" ON "guides_blocks_side_by_side_bullets" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_side_by_side_small_icons_order_idx" ON "guides_blocks_side_by_side_small_icons" USING btree ("_order");
  CREATE INDEX "guides_blocks_side_by_side_small_icons_parent_id_idx" ON "guides_blocks_side_by_side_small_icons" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_side_by_side_bottom_cards_items_order_idx" ON "guides_blocks_side_by_side_bottom_cards_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_side_by_side_bottom_cards_items_parent_id_idx" ON "guides_blocks_side_by_side_bottom_cards_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_side_by_side_bottom_cards_order_idx" ON "guides_blocks_side_by_side_bottom_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_side_by_side_bottom_cards_parent_id_idx" ON "guides_blocks_side_by_side_bottom_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_side_by_side_order_idx" ON "guides_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "guides_blocks_side_by_side_parent_id_idx" ON "guides_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_side_by_side_path_idx" ON "guides_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "guides_blocks_story_cards_order_idx" ON "guides_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_story_cards_parent_id_idx" ON "guides_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_story_order_idx" ON "guides_blocks_story" USING btree ("_order");
  CREATE INDEX "guides_blocks_story_parent_id_idx" ON "guides_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_story_path_idx" ON "guides_blocks_story" USING btree ("_path");
  CREATE INDEX "guides_blocks_media_showcase_order_idx" ON "guides_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "guides_blocks_media_showcase_parent_id_idx" ON "guides_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_media_showcase_path_idx" ON "guides_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "guides_blocks_feature_grid_cards_order_idx" ON "guides_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_feature_grid_cards_parent_id_idx" ON "guides_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_feature_grid_order_idx" ON "guides_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "guides_blocks_feature_grid_parent_id_idx" ON "guides_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_feature_grid_path_idx" ON "guides_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "guides_blocks_agent_capabilities_items_order_idx" ON "guides_blocks_agent_capabilities_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_agent_capabilities_items_parent_id_idx" ON "guides_blocks_agent_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_agent_capabilities_order_idx" ON "guides_blocks_agent_capabilities" USING btree ("_order");
  CREATE INDEX "guides_blocks_agent_capabilities_parent_id_idx" ON "guides_blocks_agent_capabilities" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_agent_capabilities_path_idx" ON "guides_blocks_agent_capabilities" USING btree ("_path");
  CREATE INDEX "guides_blocks_agent_solutions_items_order_idx" ON "guides_blocks_agent_solutions_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_agent_solutions_items_parent_id_idx" ON "guides_blocks_agent_solutions_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_agent_solutions_order_idx" ON "guides_blocks_agent_solutions" USING btree ("_order");
  CREATE INDEX "guides_blocks_agent_solutions_parent_id_idx" ON "guides_blocks_agent_solutions" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_agent_solutions_path_idx" ON "guides_blocks_agent_solutions" USING btree ("_path");
  CREATE INDEX "guides_blocks_contact_us_order_idx" ON "guides_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "guides_blocks_contact_us_parent_id_idx" ON "guides_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_contact_us_path_idx" ON "guides_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "guides_blocks_concierge_flow_cards_order_idx" ON "guides_blocks_concierge_flow_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_concierge_flow_cards_parent_id_idx" ON "guides_blocks_concierge_flow_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_concierge_flow_order_idx" ON "guides_blocks_concierge_flow" USING btree ("_order");
  CREATE INDEX "guides_blocks_concierge_flow_parent_id_idx" ON "guides_blocks_concierge_flow" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_concierge_flow_path_idx" ON "guides_blocks_concierge_flow" USING btree ("_path");
  CREATE INDEX "guides_blocks_enterprise_upgrade_benefits_order_idx" ON "guides_blocks_enterprise_upgrade_benefits" USING btree ("_order");
  CREATE INDEX "guides_blocks_enterprise_upgrade_benefits_parent_id_idx" ON "guides_blocks_enterprise_upgrade_benefits" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_enterprise_upgrade_order_idx" ON "guides_blocks_enterprise_upgrade" USING btree ("_order");
  CREATE INDEX "guides_blocks_enterprise_upgrade_parent_id_idx" ON "guides_blocks_enterprise_upgrade" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_enterprise_upgrade_path_idx" ON "guides_blocks_enterprise_upgrade" USING btree ("_path");
  CREATE INDEX "guides_blocks_channels_grid_cards_order_idx" ON "guides_blocks_channels_grid_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_channels_grid_cards_parent_id_idx" ON "guides_blocks_channels_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_channels_grid_order_idx" ON "guides_blocks_channels_grid" USING btree ("_order");
  CREATE INDEX "guides_blocks_channels_grid_parent_id_idx" ON "guides_blocks_channels_grid" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_channels_grid_path_idx" ON "guides_blocks_channels_grid" USING btree ("_path");
  CREATE INDEX "guides_blocks_feature_stack_cards_order_idx" ON "guides_blocks_feature_stack_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_feature_stack_cards_parent_id_idx" ON "guides_blocks_feature_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_feature_stack_order_idx" ON "guides_blocks_feature_stack" USING btree ("_order");
  CREATE INDEX "guides_blocks_feature_stack_parent_id_idx" ON "guides_blocks_feature_stack" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_feature_stack_path_idx" ON "guides_blocks_feature_stack" USING btree ("_path");
  CREATE INDEX "guides_blocks_coverage_grid_cards_order_idx" ON "guides_blocks_coverage_grid_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_coverage_grid_cards_parent_id_idx" ON "guides_blocks_coverage_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_coverage_grid_order_idx" ON "guides_blocks_coverage_grid" USING btree ("_order");
  CREATE INDEX "guides_blocks_coverage_grid_parent_id_idx" ON "guides_blocks_coverage_grid" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_coverage_grid_path_idx" ON "guides_blocks_coverage_grid" USING btree ("_path");
  CREATE INDEX "guides_blocks_feature_rows_rows_order_idx" ON "guides_blocks_feature_rows_rows" USING btree ("_order");
  CREATE INDEX "guides_blocks_feature_rows_rows_parent_id_idx" ON "guides_blocks_feature_rows_rows" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_feature_rows_order_idx" ON "guides_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "guides_blocks_feature_rows_parent_id_idx" ON "guides_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_feature_rows_path_idx" ON "guides_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "guides_blocks_capability_trio_cards_order_idx" ON "guides_blocks_capability_trio_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_capability_trio_cards_parent_id_idx" ON "guides_blocks_capability_trio_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_capability_trio_order_idx" ON "guides_blocks_capability_trio" USING btree ("_order");
  CREATE INDEX "guides_blocks_capability_trio_parent_id_idx" ON "guides_blocks_capability_trio" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_capability_trio_path_idx" ON "guides_blocks_capability_trio" USING btree ("_path");
  CREATE INDEX "guides_blocks_capability_tools_cards_logos_order_idx" ON "guides_blocks_capability_tools_cards_logos" USING btree ("_order");
  CREATE INDEX "guides_blocks_capability_tools_cards_logos_parent_id_idx" ON "guides_blocks_capability_tools_cards_logos" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_capability_tools_cards_order_idx" ON "guides_blocks_capability_tools_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_capability_tools_cards_parent_id_idx" ON "guides_blocks_capability_tools_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_capability_tools_order_idx" ON "guides_blocks_capability_tools" USING btree ("_order");
  CREATE INDEX "guides_blocks_capability_tools_parent_id_idx" ON "guides_blocks_capability_tools" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_capability_tools_path_idx" ON "guides_blocks_capability_tools" USING btree ("_path");
  CREATE INDEX "guides_blocks_use_cases_grid_cards_order_idx" ON "guides_blocks_use_cases_grid_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_use_cases_grid_cards_parent_id_idx" ON "guides_blocks_use_cases_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_use_cases_grid_order_idx" ON "guides_blocks_use_cases_grid" USING btree ("_order");
  CREATE INDEX "guides_blocks_use_cases_grid_parent_id_idx" ON "guides_blocks_use_cases_grid" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_use_cases_grid_path_idx" ON "guides_blocks_use_cases_grid" USING btree ("_path");
  CREATE INDEX "guides_blocks_security_cards_order_idx" ON "guides_blocks_security_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_security_cards_parent_id_idx" ON "guides_blocks_security_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_security_order_idx" ON "guides_blocks_security" USING btree ("_order");
  CREATE INDEX "guides_blocks_security_parent_id_idx" ON "guides_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_security_path_idx" ON "guides_blocks_security" USING btree ("_path");
  CREATE INDEX "guides_blocks_functional_capabilities_cards_order_idx" ON "guides_blocks_functional_capabilities_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_functional_capabilities_cards_parent_id_idx" ON "guides_blocks_functional_capabilities_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_functional_capabilities_order_idx" ON "guides_blocks_functional_capabilities" USING btree ("_order");
  CREATE INDEX "guides_blocks_functional_capabilities_parent_id_idx" ON "guides_blocks_functional_capabilities" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_functional_capabilities_path_idx" ON "guides_blocks_functional_capabilities" USING btree ("_path");
  CREATE INDEX "guides_blocks_how_it_works_steps_order_idx" ON "guides_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "guides_blocks_how_it_works_steps_parent_id_idx" ON "guides_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_how_it_works_order_idx" ON "guides_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "guides_blocks_how_it_works_parent_id_idx" ON "guides_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_how_it_works_path_idx" ON "guides_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "guides_blocks_cta_order_idx" ON "guides_blocks_cta" USING btree ("_order");
  CREATE INDEX "guides_blocks_cta_parent_id_idx" ON "guides_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_cta_path_idx" ON "guides_blocks_cta" USING btree ("_path");
  CREATE INDEX "guides_blocks_metrics_items_order_idx" ON "guides_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_metrics_items_parent_id_idx" ON "guides_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_metrics_order_idx" ON "guides_blocks_metrics" USING btree ("_order");
  CREATE INDEX "guides_blocks_metrics_parent_id_idx" ON "guides_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_metrics_path_idx" ON "guides_blocks_metrics" USING btree ("_path");
  CREATE INDEX "guides_blocks_results_stats_items_order_idx" ON "guides_blocks_results_stats_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_results_stats_items_parent_id_idx" ON "guides_blocks_results_stats_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_results_stats_order_idx" ON "guides_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "guides_blocks_results_stats_parent_id_idx" ON "guides_blocks_results_stats" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_results_stats_path_idx" ON "guides_blocks_results_stats" USING btree ("_path");
  CREATE INDEX "guides_blocks_stats_cards_items_order_idx" ON "guides_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_stats_cards_items_parent_id_idx" ON "guides_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_stats_cards_order_idx" ON "guides_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_stats_cards_parent_id_idx" ON "guides_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_stats_cards_path_idx" ON "guides_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "guides_blocks_capability_strip_items_order_idx" ON "guides_blocks_capability_strip_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_capability_strip_items_parent_id_idx" ON "guides_blocks_capability_strip_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_capability_strip_order_idx" ON "guides_blocks_capability_strip" USING btree ("_order");
  CREATE INDEX "guides_blocks_capability_strip_parent_id_idx" ON "guides_blocks_capability_strip" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_capability_strip_path_idx" ON "guides_blocks_capability_strip" USING btree ("_path");
  CREATE INDEX "guides_blocks_live_in_days_items_order_idx" ON "guides_blocks_live_in_days_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_live_in_days_items_parent_id_idx" ON "guides_blocks_live_in_days_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_live_in_days_order_idx" ON "guides_blocks_live_in_days" USING btree ("_order");
  CREATE INDEX "guides_blocks_live_in_days_parent_id_idx" ON "guides_blocks_live_in_days" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_live_in_days_path_idx" ON "guides_blocks_live_in_days" USING btree ("_path");
  CREATE INDEX "guides_blocks_faq_items_order_idx" ON "guides_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_faq_items_parent_id_idx" ON "guides_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_faq_order_idx" ON "guides_blocks_faq" USING btree ("_order");
  CREATE INDEX "guides_blocks_faq_parent_id_idx" ON "guides_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_faq_path_idx" ON "guides_blocks_faq" USING btree ("_path");
  CREATE INDEX "guides_blocks_news_insights_collections_order_idx" ON "guides_blocks_news_insights_collections" USING btree ("order");
  CREATE INDEX "guides_blocks_news_insights_collections_parent_idx" ON "guides_blocks_news_insights_collections" USING btree ("parent_id");
  CREATE INDEX "guides_blocks_news_insights_cards_tags_order_idx" ON "guides_blocks_news_insights_cards_tags" USING btree ("_order");
  CREATE INDEX "guides_blocks_news_insights_cards_tags_parent_id_idx" ON "guides_blocks_news_insights_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_news_insights_cards_order_idx" ON "guides_blocks_news_insights_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_news_insights_cards_parent_id_idx" ON "guides_blocks_news_insights_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_news_insights_order_idx" ON "guides_blocks_news_insights" USING btree ("_order");
  CREATE INDEX "guides_blocks_news_insights_parent_id_idx" ON "guides_blocks_news_insights" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_news_insights_path_idx" ON "guides_blocks_news_insights" USING btree ("_path");
  CREATE INDEX "guides_blocks_content_feed_collections_order_idx" ON "guides_blocks_content_feed_collections" USING btree ("order");
  CREATE INDEX "guides_blocks_content_feed_collections_parent_idx" ON "guides_blocks_content_feed_collections" USING btree ("parent_id");
  CREATE INDEX "guides_blocks_content_feed_cards_tags_order_idx" ON "guides_blocks_content_feed_cards_tags" USING btree ("_order");
  CREATE INDEX "guides_blocks_content_feed_cards_tags_parent_id_idx" ON "guides_blocks_content_feed_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_content_feed_cards_order_idx" ON "guides_blocks_content_feed_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_content_feed_cards_parent_id_idx" ON "guides_blocks_content_feed_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_content_feed_order_idx" ON "guides_blocks_content_feed" USING btree ("_order");
  CREATE INDEX "guides_blocks_content_feed_parent_id_idx" ON "guides_blocks_content_feed" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_content_feed_path_idx" ON "guides_blocks_content_feed" USING btree ("_path");
  CREATE INDEX "guides_blocks_pricing_cards_cards_features_order_idx" ON "guides_blocks_pricing_cards_cards_features" USING btree ("_order");
  CREATE INDEX "guides_blocks_pricing_cards_cards_features_parent_id_idx" ON "guides_blocks_pricing_cards_cards_features" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_pricing_cards_cards_order_idx" ON "guides_blocks_pricing_cards_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_pricing_cards_cards_parent_id_idx" ON "guides_blocks_pricing_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_pricing_cards_order_idx" ON "guides_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_pricing_cards_parent_id_idx" ON "guides_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_pricing_cards_path_idx" ON "guides_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "guides_blocks_pricing_details_sections_headers_order_idx" ON "guides_blocks_pricing_details_sections_headers" USING btree ("_order");
  CREATE INDEX "guides_blocks_pricing_details_sections_headers_parent_id_idx" ON "guides_blocks_pricing_details_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_pricing_details_sections_rows_cells_order_idx" ON "guides_blocks_pricing_details_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "guides_blocks_pricing_details_sections_rows_cells_parent_id_idx" ON "guides_blocks_pricing_details_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_pricing_details_sections_rows_order_idx" ON "guides_blocks_pricing_details_sections_rows" USING btree ("_order");
  CREATE INDEX "guides_blocks_pricing_details_sections_rows_parent_id_idx" ON "guides_blocks_pricing_details_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_pricing_details_sections_order_idx" ON "guides_blocks_pricing_details_sections" USING btree ("_order");
  CREATE INDEX "guides_blocks_pricing_details_sections_parent_id_idx" ON "guides_blocks_pricing_details_sections" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_pricing_details_order_idx" ON "guides_blocks_pricing_details" USING btree ("_order");
  CREATE INDEX "guides_blocks_pricing_details_parent_id_idx" ON "guides_blocks_pricing_details" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_pricing_details_path_idx" ON "guides_blocks_pricing_details" USING btree ("_path");
  CREATE INDEX "guides_blocks_difference_left_items_order_idx" ON "guides_blocks_difference_left_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_difference_left_items_parent_id_idx" ON "guides_blocks_difference_left_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_difference_right_items_order_idx" ON "guides_blocks_difference_right_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_difference_right_items_parent_id_idx" ON "guides_blocks_difference_right_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_difference_order_idx" ON "guides_blocks_difference" USING btree ("_order");
  CREATE INDEX "guides_blocks_difference_parent_id_idx" ON "guides_blocks_difference" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_difference_path_idx" ON "guides_blocks_difference" USING btree ("_path");
  CREATE INDEX "guides_blocks_pain_points_comparison_rows_order_idx" ON "guides_blocks_pain_points_comparison_rows" USING btree ("_order");
  CREATE INDEX "guides_blocks_pain_points_comparison_rows_parent_id_idx" ON "guides_blocks_pain_points_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_pain_points_comparison_order_idx" ON "guides_blocks_pain_points_comparison" USING btree ("_order");
  CREATE INDEX "guides_blocks_pain_points_comparison_parent_id_idx" ON "guides_blocks_pain_points_comparison" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_pain_points_comparison_path_idx" ON "guides_blocks_pain_points_comparison" USING btree ("_path");
  CREATE INDEX "guides_blocks_pricing_policy_callouts_order_idx" ON "guides_blocks_pricing_policy_callouts" USING btree ("_order");
  CREATE INDEX "guides_blocks_pricing_policy_callouts_parent_id_idx" ON "guides_blocks_pricing_policy_callouts" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_pricing_policy_order_idx" ON "guides_blocks_pricing_policy" USING btree ("_order");
  CREATE INDEX "guides_blocks_pricing_policy_parent_id_idx" ON "guides_blocks_pricing_policy" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_pricing_policy_path_idx" ON "guides_blocks_pricing_policy" USING btree ("_path");
  CREATE INDEX "guides_blocks_industry_expertise_items_order_idx" ON "guides_blocks_industry_expertise_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_industry_expertise_items_parent_id_idx" ON "guides_blocks_industry_expertise_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_industry_expertise_info_cards_order_idx" ON "guides_blocks_industry_expertise_info_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_industry_expertise_info_cards_parent_id_idx" ON "guides_blocks_industry_expertise_info_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_industry_expertise_order_idx" ON "guides_blocks_industry_expertise" USING btree ("_order");
  CREATE INDEX "guides_blocks_industry_expertise_parent_id_idx" ON "guides_blocks_industry_expertise" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_industry_expertise_path_idx" ON "guides_blocks_industry_expertise" USING btree ("_path");
  CREATE INDEX "guides_blocks_logo_strip_logos_order_idx" ON "guides_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "guides_blocks_logo_strip_logos_parent_id_idx" ON "guides_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_logo_strip_stats_order_idx" ON "guides_blocks_logo_strip_stats" USING btree ("_order");
  CREATE INDEX "guides_blocks_logo_strip_stats_parent_id_idx" ON "guides_blocks_logo_strip_stats" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_logo_strip_order_idx" ON "guides_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "guides_blocks_logo_strip_parent_id_idx" ON "guides_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_logo_strip_path_idx" ON "guides_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "guides_blocks_integrations_banner_items_order_idx" ON "guides_blocks_integrations_banner_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_integrations_banner_items_parent_id_idx" ON "guides_blocks_integrations_banner_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_integrations_banner_order_idx" ON "guides_blocks_integrations_banner" USING btree ("_order");
  CREATE INDEX "guides_blocks_integrations_banner_parent_id_idx" ON "guides_blocks_integrations_banner" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_integrations_banner_path_idx" ON "guides_blocks_integrations_banner" USING btree ("_path");
  CREATE INDEX "guides_blocks_logo_grid_columns_items_order_idx" ON "guides_blocks_logo_grid_columns_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_logo_grid_columns_items_parent_id_idx" ON "guides_blocks_logo_grid_columns_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_logo_grid_columns_order_idx" ON "guides_blocks_logo_grid_columns" USING btree ("_order");
  CREATE INDEX "guides_blocks_logo_grid_columns_parent_id_idx" ON "guides_blocks_logo_grid_columns" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_logo_grid_order_idx" ON "guides_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "guides_blocks_logo_grid_parent_id_idx" ON "guides_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_logo_grid_path_idx" ON "guides_blocks_logo_grid" USING btree ("_path");
  CREATE INDEX "guides_blocks_tabs_showcase_tabs_steps_order_idx" ON "guides_blocks_tabs_showcase_tabs_steps" USING btree ("_order");
  CREATE INDEX "guides_blocks_tabs_showcase_tabs_steps_parent_id_idx" ON "guides_blocks_tabs_showcase_tabs_steps" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_tabs_showcase_tabs_order_idx" ON "guides_blocks_tabs_showcase_tabs" USING btree ("_order");
  CREATE INDEX "guides_blocks_tabs_showcase_tabs_parent_id_idx" ON "guides_blocks_tabs_showcase_tabs" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_tabs_showcase_order_idx" ON "guides_blocks_tabs_showcase" USING btree ("_order");
  CREATE INDEX "guides_blocks_tabs_showcase_parent_id_idx" ON "guides_blocks_tabs_showcase" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_tabs_showcase_path_idx" ON "guides_blocks_tabs_showcase" USING btree ("_path");
  CREATE INDEX "guides_blocks_anchor_nav_items_order_idx" ON "guides_blocks_anchor_nav_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_anchor_nav_items_parent_id_idx" ON "guides_blocks_anchor_nav_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_anchor_nav_order_idx" ON "guides_blocks_anchor_nav" USING btree ("_order");
  CREATE INDEX "guides_blocks_anchor_nav_parent_id_idx" ON "guides_blocks_anchor_nav" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_anchor_nav_path_idx" ON "guides_blocks_anchor_nav" USING btree ("_path");
  CREATE INDEX "guides_blocks_testimonials_items_order_idx" ON "guides_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_testimonials_items_parent_id_idx" ON "guides_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_testimonials_order_idx" ON "guides_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "guides_blocks_testimonials_parent_id_idx" ON "guides_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_testimonials_path_idx" ON "guides_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "guides_blocks_comparison_grid_cards_order_idx" ON "guides_blocks_comparison_grid_cards" USING btree ("_order");
  CREATE INDEX "guides_blocks_comparison_grid_cards_parent_id_idx" ON "guides_blocks_comparison_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_comparison_grid_order_idx" ON "guides_blocks_comparison_grid" USING btree ("_order");
  CREATE INDEX "guides_blocks_comparison_grid_parent_id_idx" ON "guides_blocks_comparison_grid" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_comparison_grid_path_idx" ON "guides_blocks_comparison_grid" USING btree ("_path");
  CREATE INDEX "guides_blocks_use_case_flow_columns_items_order_idx" ON "guides_blocks_use_case_flow_columns_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_use_case_flow_columns_items_parent_id_idx" ON "guides_blocks_use_case_flow_columns_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_use_case_flow_columns_order_idx" ON "guides_blocks_use_case_flow_columns" USING btree ("_order");
  CREATE INDEX "guides_blocks_use_case_flow_columns_parent_id_idx" ON "guides_blocks_use_case_flow_columns" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_use_case_flow_order_idx" ON "guides_blocks_use_case_flow" USING btree ("_order");
  CREATE INDEX "guides_blocks_use_case_flow_parent_id_idx" ON "guides_blocks_use_case_flow" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_use_case_flow_path_idx" ON "guides_blocks_use_case_flow" USING btree ("_path");
  CREATE INDEX "guides_article_meta_tags_order_idx" ON "guides_article_meta_tags" USING btree ("_order");
  CREATE INDEX "guides_article_meta_tags_parent_id_idx" ON "guides_article_meta_tags" USING btree ("_parent_id");
  CREATE INDEX "guides_featured_image_idx" ON "guides" USING btree ("featured_image_id");
  CREATE INDEX "guides_slug_idx" ON "guides" USING btree ("slug");
  CREATE UNIQUE INDEX "guides_path_idx" ON "guides" USING btree ("path");
  CREATE INDEX "guides_content_key_idx" ON "guides" USING btree ("content_key");
  CREATE INDEX "guides_updated_at_idx" ON "guides" USING btree ("updated_at");
  CREATE INDEX "guides_created_at_idx" ON "guides" USING btree ("created_at");
  CREATE INDEX "tips_tip_card_icons_order_idx" ON "tips_tip_card_icons" USING btree ("_order");
  CREATE INDEX "tips_tip_card_icons_parent_id_idx" ON "tips_tip_card_icons" USING btree ("_parent_id");
  CREATE INDEX "tips_tip_card_icons_image_idx" ON "tips_tip_card_icons" USING btree ("image_id");
  CREATE INDEX "tips_blocks_hero_cards_order_idx" ON "tips_blocks_hero_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_hero_cards_parent_id_idx" ON "tips_blocks_hero_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_hero_order_idx" ON "tips_blocks_hero" USING btree ("_order");
  CREATE INDEX "tips_blocks_hero_parent_id_idx" ON "tips_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_hero_path_idx" ON "tips_blocks_hero" USING btree ("_path");
  CREATE INDEX "tips_blocks_hero_extended_cards_order_idx" ON "tips_blocks_hero_extended_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_hero_extended_cards_parent_id_idx" ON "tips_blocks_hero_extended_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_hero_extended_order_idx" ON "tips_blocks_hero_extended" USING btree ("_order");
  CREATE INDEX "tips_blocks_hero_extended_parent_id_idx" ON "tips_blocks_hero_extended" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_hero_extended_path_idx" ON "tips_blocks_hero_extended" USING btree ("_path");
  CREATE INDEX "tips_blocks_rich_text_order_idx" ON "tips_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "tips_blocks_rich_text_parent_id_idx" ON "tips_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_rich_text_path_idx" ON "tips_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "tips_blocks_side_by_side_bullets_order_idx" ON "tips_blocks_side_by_side_bullets" USING btree ("_order");
  CREATE INDEX "tips_blocks_side_by_side_bullets_parent_id_idx" ON "tips_blocks_side_by_side_bullets" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_side_by_side_small_icons_order_idx" ON "tips_blocks_side_by_side_small_icons" USING btree ("_order");
  CREATE INDEX "tips_blocks_side_by_side_small_icons_parent_id_idx" ON "tips_blocks_side_by_side_small_icons" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_side_by_side_bottom_cards_items_order_idx" ON "tips_blocks_side_by_side_bottom_cards_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_side_by_side_bottom_cards_items_parent_id_idx" ON "tips_blocks_side_by_side_bottom_cards_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_side_by_side_bottom_cards_order_idx" ON "tips_blocks_side_by_side_bottom_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_side_by_side_bottom_cards_parent_id_idx" ON "tips_blocks_side_by_side_bottom_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_side_by_side_order_idx" ON "tips_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "tips_blocks_side_by_side_parent_id_idx" ON "tips_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_side_by_side_path_idx" ON "tips_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "tips_blocks_story_cards_order_idx" ON "tips_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_story_cards_parent_id_idx" ON "tips_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_story_order_idx" ON "tips_blocks_story" USING btree ("_order");
  CREATE INDEX "tips_blocks_story_parent_id_idx" ON "tips_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_story_path_idx" ON "tips_blocks_story" USING btree ("_path");
  CREATE INDEX "tips_blocks_media_showcase_order_idx" ON "tips_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "tips_blocks_media_showcase_parent_id_idx" ON "tips_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_media_showcase_path_idx" ON "tips_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "tips_blocks_feature_grid_cards_order_idx" ON "tips_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_feature_grid_cards_parent_id_idx" ON "tips_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_feature_grid_order_idx" ON "tips_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "tips_blocks_feature_grid_parent_id_idx" ON "tips_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_feature_grid_path_idx" ON "tips_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "tips_blocks_agent_capabilities_items_order_idx" ON "tips_blocks_agent_capabilities_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_agent_capabilities_items_parent_id_idx" ON "tips_blocks_agent_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_agent_capabilities_order_idx" ON "tips_blocks_agent_capabilities" USING btree ("_order");
  CREATE INDEX "tips_blocks_agent_capabilities_parent_id_idx" ON "tips_blocks_agent_capabilities" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_agent_capabilities_path_idx" ON "tips_blocks_agent_capabilities" USING btree ("_path");
  CREATE INDEX "tips_blocks_agent_solutions_items_order_idx" ON "tips_blocks_agent_solutions_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_agent_solutions_items_parent_id_idx" ON "tips_blocks_agent_solutions_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_agent_solutions_order_idx" ON "tips_blocks_agent_solutions" USING btree ("_order");
  CREATE INDEX "tips_blocks_agent_solutions_parent_id_idx" ON "tips_blocks_agent_solutions" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_agent_solutions_path_idx" ON "tips_blocks_agent_solutions" USING btree ("_path");
  CREATE INDEX "tips_blocks_contact_us_order_idx" ON "tips_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "tips_blocks_contact_us_parent_id_idx" ON "tips_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_contact_us_path_idx" ON "tips_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "tips_blocks_concierge_flow_cards_order_idx" ON "tips_blocks_concierge_flow_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_concierge_flow_cards_parent_id_idx" ON "tips_blocks_concierge_flow_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_concierge_flow_order_idx" ON "tips_blocks_concierge_flow" USING btree ("_order");
  CREATE INDEX "tips_blocks_concierge_flow_parent_id_idx" ON "tips_blocks_concierge_flow" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_concierge_flow_path_idx" ON "tips_blocks_concierge_flow" USING btree ("_path");
  CREATE INDEX "tips_blocks_enterprise_upgrade_benefits_order_idx" ON "tips_blocks_enterprise_upgrade_benefits" USING btree ("_order");
  CREATE INDEX "tips_blocks_enterprise_upgrade_benefits_parent_id_idx" ON "tips_blocks_enterprise_upgrade_benefits" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_enterprise_upgrade_order_idx" ON "tips_blocks_enterprise_upgrade" USING btree ("_order");
  CREATE INDEX "tips_blocks_enterprise_upgrade_parent_id_idx" ON "tips_blocks_enterprise_upgrade" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_enterprise_upgrade_path_idx" ON "tips_blocks_enterprise_upgrade" USING btree ("_path");
  CREATE INDEX "tips_blocks_channels_grid_cards_order_idx" ON "tips_blocks_channels_grid_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_channels_grid_cards_parent_id_idx" ON "tips_blocks_channels_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_channels_grid_order_idx" ON "tips_blocks_channels_grid" USING btree ("_order");
  CREATE INDEX "tips_blocks_channels_grid_parent_id_idx" ON "tips_blocks_channels_grid" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_channels_grid_path_idx" ON "tips_blocks_channels_grid" USING btree ("_path");
  CREATE INDEX "tips_blocks_feature_stack_cards_order_idx" ON "tips_blocks_feature_stack_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_feature_stack_cards_parent_id_idx" ON "tips_blocks_feature_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_feature_stack_order_idx" ON "tips_blocks_feature_stack" USING btree ("_order");
  CREATE INDEX "tips_blocks_feature_stack_parent_id_idx" ON "tips_blocks_feature_stack" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_feature_stack_path_idx" ON "tips_blocks_feature_stack" USING btree ("_path");
  CREATE INDEX "tips_blocks_coverage_grid_cards_order_idx" ON "tips_blocks_coverage_grid_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_coverage_grid_cards_parent_id_idx" ON "tips_blocks_coverage_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_coverage_grid_order_idx" ON "tips_blocks_coverage_grid" USING btree ("_order");
  CREATE INDEX "tips_blocks_coverage_grid_parent_id_idx" ON "tips_blocks_coverage_grid" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_coverage_grid_path_idx" ON "tips_blocks_coverage_grid" USING btree ("_path");
  CREATE INDEX "tips_blocks_feature_rows_rows_order_idx" ON "tips_blocks_feature_rows_rows" USING btree ("_order");
  CREATE INDEX "tips_blocks_feature_rows_rows_parent_id_idx" ON "tips_blocks_feature_rows_rows" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_feature_rows_order_idx" ON "tips_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "tips_blocks_feature_rows_parent_id_idx" ON "tips_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_feature_rows_path_idx" ON "tips_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "tips_blocks_capability_trio_cards_order_idx" ON "tips_blocks_capability_trio_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_capability_trio_cards_parent_id_idx" ON "tips_blocks_capability_trio_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_capability_trio_order_idx" ON "tips_blocks_capability_trio" USING btree ("_order");
  CREATE INDEX "tips_blocks_capability_trio_parent_id_idx" ON "tips_blocks_capability_trio" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_capability_trio_path_idx" ON "tips_blocks_capability_trio" USING btree ("_path");
  CREATE INDEX "tips_blocks_capability_tools_cards_logos_order_idx" ON "tips_blocks_capability_tools_cards_logos" USING btree ("_order");
  CREATE INDEX "tips_blocks_capability_tools_cards_logos_parent_id_idx" ON "tips_blocks_capability_tools_cards_logos" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_capability_tools_cards_order_idx" ON "tips_blocks_capability_tools_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_capability_tools_cards_parent_id_idx" ON "tips_blocks_capability_tools_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_capability_tools_order_idx" ON "tips_blocks_capability_tools" USING btree ("_order");
  CREATE INDEX "tips_blocks_capability_tools_parent_id_idx" ON "tips_blocks_capability_tools" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_capability_tools_path_idx" ON "tips_blocks_capability_tools" USING btree ("_path");
  CREATE INDEX "tips_blocks_use_cases_grid_cards_order_idx" ON "tips_blocks_use_cases_grid_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_use_cases_grid_cards_parent_id_idx" ON "tips_blocks_use_cases_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_use_cases_grid_order_idx" ON "tips_blocks_use_cases_grid" USING btree ("_order");
  CREATE INDEX "tips_blocks_use_cases_grid_parent_id_idx" ON "tips_blocks_use_cases_grid" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_use_cases_grid_path_idx" ON "tips_blocks_use_cases_grid" USING btree ("_path");
  CREATE INDEX "tips_blocks_security_cards_order_idx" ON "tips_blocks_security_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_security_cards_parent_id_idx" ON "tips_blocks_security_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_security_order_idx" ON "tips_blocks_security" USING btree ("_order");
  CREATE INDEX "tips_blocks_security_parent_id_idx" ON "tips_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_security_path_idx" ON "tips_blocks_security" USING btree ("_path");
  CREATE INDEX "tips_blocks_functional_capabilities_cards_order_idx" ON "tips_blocks_functional_capabilities_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_functional_capabilities_cards_parent_id_idx" ON "tips_blocks_functional_capabilities_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_functional_capabilities_order_idx" ON "tips_blocks_functional_capabilities" USING btree ("_order");
  CREATE INDEX "tips_blocks_functional_capabilities_parent_id_idx" ON "tips_blocks_functional_capabilities" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_functional_capabilities_path_idx" ON "tips_blocks_functional_capabilities" USING btree ("_path");
  CREATE INDEX "tips_blocks_how_it_works_steps_order_idx" ON "tips_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "tips_blocks_how_it_works_steps_parent_id_idx" ON "tips_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_how_it_works_order_idx" ON "tips_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "tips_blocks_how_it_works_parent_id_idx" ON "tips_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_how_it_works_path_idx" ON "tips_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "tips_blocks_cta_order_idx" ON "tips_blocks_cta" USING btree ("_order");
  CREATE INDEX "tips_blocks_cta_parent_id_idx" ON "tips_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_cta_path_idx" ON "tips_blocks_cta" USING btree ("_path");
  CREATE INDEX "tips_blocks_metrics_items_order_idx" ON "tips_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_metrics_items_parent_id_idx" ON "tips_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_metrics_order_idx" ON "tips_blocks_metrics" USING btree ("_order");
  CREATE INDEX "tips_blocks_metrics_parent_id_idx" ON "tips_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_metrics_path_idx" ON "tips_blocks_metrics" USING btree ("_path");
  CREATE INDEX "tips_blocks_results_stats_items_order_idx" ON "tips_blocks_results_stats_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_results_stats_items_parent_id_idx" ON "tips_blocks_results_stats_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_results_stats_order_idx" ON "tips_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "tips_blocks_results_stats_parent_id_idx" ON "tips_blocks_results_stats" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_results_stats_path_idx" ON "tips_blocks_results_stats" USING btree ("_path");
  CREATE INDEX "tips_blocks_stats_cards_items_order_idx" ON "tips_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_stats_cards_items_parent_id_idx" ON "tips_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_stats_cards_order_idx" ON "tips_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_stats_cards_parent_id_idx" ON "tips_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_stats_cards_path_idx" ON "tips_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "tips_blocks_capability_strip_items_order_idx" ON "tips_blocks_capability_strip_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_capability_strip_items_parent_id_idx" ON "tips_blocks_capability_strip_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_capability_strip_order_idx" ON "tips_blocks_capability_strip" USING btree ("_order");
  CREATE INDEX "tips_blocks_capability_strip_parent_id_idx" ON "tips_blocks_capability_strip" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_capability_strip_path_idx" ON "tips_blocks_capability_strip" USING btree ("_path");
  CREATE INDEX "tips_blocks_live_in_days_items_order_idx" ON "tips_blocks_live_in_days_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_live_in_days_items_parent_id_idx" ON "tips_blocks_live_in_days_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_live_in_days_order_idx" ON "tips_blocks_live_in_days" USING btree ("_order");
  CREATE INDEX "tips_blocks_live_in_days_parent_id_idx" ON "tips_blocks_live_in_days" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_live_in_days_path_idx" ON "tips_blocks_live_in_days" USING btree ("_path");
  CREATE INDEX "tips_blocks_faq_items_order_idx" ON "tips_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_faq_items_parent_id_idx" ON "tips_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_faq_order_idx" ON "tips_blocks_faq" USING btree ("_order");
  CREATE INDEX "tips_blocks_faq_parent_id_idx" ON "tips_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_faq_path_idx" ON "tips_blocks_faq" USING btree ("_path");
  CREATE INDEX "tips_blocks_news_insights_collections_order_idx" ON "tips_blocks_news_insights_collections" USING btree ("order");
  CREATE INDEX "tips_blocks_news_insights_collections_parent_idx" ON "tips_blocks_news_insights_collections" USING btree ("parent_id");
  CREATE INDEX "tips_blocks_news_insights_cards_tags_order_idx" ON "tips_blocks_news_insights_cards_tags" USING btree ("_order");
  CREATE INDEX "tips_blocks_news_insights_cards_tags_parent_id_idx" ON "tips_blocks_news_insights_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_news_insights_cards_order_idx" ON "tips_blocks_news_insights_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_news_insights_cards_parent_id_idx" ON "tips_blocks_news_insights_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_news_insights_order_idx" ON "tips_blocks_news_insights" USING btree ("_order");
  CREATE INDEX "tips_blocks_news_insights_parent_id_idx" ON "tips_blocks_news_insights" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_news_insights_path_idx" ON "tips_blocks_news_insights" USING btree ("_path");
  CREATE INDEX "tips_blocks_content_feed_collections_order_idx" ON "tips_blocks_content_feed_collections" USING btree ("order");
  CREATE INDEX "tips_blocks_content_feed_collections_parent_idx" ON "tips_blocks_content_feed_collections" USING btree ("parent_id");
  CREATE INDEX "tips_blocks_content_feed_cards_tags_order_idx" ON "tips_blocks_content_feed_cards_tags" USING btree ("_order");
  CREATE INDEX "tips_blocks_content_feed_cards_tags_parent_id_idx" ON "tips_blocks_content_feed_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_content_feed_cards_order_idx" ON "tips_blocks_content_feed_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_content_feed_cards_parent_id_idx" ON "tips_blocks_content_feed_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_content_feed_order_idx" ON "tips_blocks_content_feed" USING btree ("_order");
  CREATE INDEX "tips_blocks_content_feed_parent_id_idx" ON "tips_blocks_content_feed" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_content_feed_path_idx" ON "tips_blocks_content_feed" USING btree ("_path");
  CREATE INDEX "tips_blocks_pricing_cards_cards_features_order_idx" ON "tips_blocks_pricing_cards_cards_features" USING btree ("_order");
  CREATE INDEX "tips_blocks_pricing_cards_cards_features_parent_id_idx" ON "tips_blocks_pricing_cards_cards_features" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_pricing_cards_cards_order_idx" ON "tips_blocks_pricing_cards_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_pricing_cards_cards_parent_id_idx" ON "tips_blocks_pricing_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_pricing_cards_order_idx" ON "tips_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_pricing_cards_parent_id_idx" ON "tips_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_pricing_cards_path_idx" ON "tips_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "tips_blocks_pricing_details_sections_headers_order_idx" ON "tips_blocks_pricing_details_sections_headers" USING btree ("_order");
  CREATE INDEX "tips_blocks_pricing_details_sections_headers_parent_id_idx" ON "tips_blocks_pricing_details_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_pricing_details_sections_rows_cells_order_idx" ON "tips_blocks_pricing_details_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "tips_blocks_pricing_details_sections_rows_cells_parent_id_idx" ON "tips_blocks_pricing_details_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_pricing_details_sections_rows_order_idx" ON "tips_blocks_pricing_details_sections_rows" USING btree ("_order");
  CREATE INDEX "tips_blocks_pricing_details_sections_rows_parent_id_idx" ON "tips_blocks_pricing_details_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_pricing_details_sections_order_idx" ON "tips_blocks_pricing_details_sections" USING btree ("_order");
  CREATE INDEX "tips_blocks_pricing_details_sections_parent_id_idx" ON "tips_blocks_pricing_details_sections" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_pricing_details_order_idx" ON "tips_blocks_pricing_details" USING btree ("_order");
  CREATE INDEX "tips_blocks_pricing_details_parent_id_idx" ON "tips_blocks_pricing_details" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_pricing_details_path_idx" ON "tips_blocks_pricing_details" USING btree ("_path");
  CREATE INDEX "tips_blocks_difference_left_items_order_idx" ON "tips_blocks_difference_left_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_difference_left_items_parent_id_idx" ON "tips_blocks_difference_left_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_difference_right_items_order_idx" ON "tips_blocks_difference_right_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_difference_right_items_parent_id_idx" ON "tips_blocks_difference_right_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_difference_order_idx" ON "tips_blocks_difference" USING btree ("_order");
  CREATE INDEX "tips_blocks_difference_parent_id_idx" ON "tips_blocks_difference" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_difference_path_idx" ON "tips_blocks_difference" USING btree ("_path");
  CREATE INDEX "tips_blocks_pain_points_comparison_rows_order_idx" ON "tips_blocks_pain_points_comparison_rows" USING btree ("_order");
  CREATE INDEX "tips_blocks_pain_points_comparison_rows_parent_id_idx" ON "tips_blocks_pain_points_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_pain_points_comparison_order_idx" ON "tips_blocks_pain_points_comparison" USING btree ("_order");
  CREATE INDEX "tips_blocks_pain_points_comparison_parent_id_idx" ON "tips_blocks_pain_points_comparison" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_pain_points_comparison_path_idx" ON "tips_blocks_pain_points_comparison" USING btree ("_path");
  CREATE INDEX "tips_blocks_pricing_policy_callouts_order_idx" ON "tips_blocks_pricing_policy_callouts" USING btree ("_order");
  CREATE INDEX "tips_blocks_pricing_policy_callouts_parent_id_idx" ON "tips_blocks_pricing_policy_callouts" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_pricing_policy_order_idx" ON "tips_blocks_pricing_policy" USING btree ("_order");
  CREATE INDEX "tips_blocks_pricing_policy_parent_id_idx" ON "tips_blocks_pricing_policy" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_pricing_policy_path_idx" ON "tips_blocks_pricing_policy" USING btree ("_path");
  CREATE INDEX "tips_blocks_industry_expertise_items_order_idx" ON "tips_blocks_industry_expertise_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_industry_expertise_items_parent_id_idx" ON "tips_blocks_industry_expertise_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_industry_expertise_info_cards_order_idx" ON "tips_blocks_industry_expertise_info_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_industry_expertise_info_cards_parent_id_idx" ON "tips_blocks_industry_expertise_info_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_industry_expertise_order_idx" ON "tips_blocks_industry_expertise" USING btree ("_order");
  CREATE INDEX "tips_blocks_industry_expertise_parent_id_idx" ON "tips_blocks_industry_expertise" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_industry_expertise_path_idx" ON "tips_blocks_industry_expertise" USING btree ("_path");
  CREATE INDEX "tips_blocks_logo_strip_logos_order_idx" ON "tips_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "tips_blocks_logo_strip_logos_parent_id_idx" ON "tips_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_logo_strip_stats_order_idx" ON "tips_blocks_logo_strip_stats" USING btree ("_order");
  CREATE INDEX "tips_blocks_logo_strip_stats_parent_id_idx" ON "tips_blocks_logo_strip_stats" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_logo_strip_order_idx" ON "tips_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "tips_blocks_logo_strip_parent_id_idx" ON "tips_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_logo_strip_path_idx" ON "tips_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "tips_blocks_integrations_banner_items_order_idx" ON "tips_blocks_integrations_banner_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_integrations_banner_items_parent_id_idx" ON "tips_blocks_integrations_banner_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_integrations_banner_order_idx" ON "tips_blocks_integrations_banner" USING btree ("_order");
  CREATE INDEX "tips_blocks_integrations_banner_parent_id_idx" ON "tips_blocks_integrations_banner" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_integrations_banner_path_idx" ON "tips_blocks_integrations_banner" USING btree ("_path");
  CREATE INDEX "tips_blocks_logo_grid_columns_items_order_idx" ON "tips_blocks_logo_grid_columns_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_logo_grid_columns_items_parent_id_idx" ON "tips_blocks_logo_grid_columns_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_logo_grid_columns_order_idx" ON "tips_blocks_logo_grid_columns" USING btree ("_order");
  CREATE INDEX "tips_blocks_logo_grid_columns_parent_id_idx" ON "tips_blocks_logo_grid_columns" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_logo_grid_order_idx" ON "tips_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "tips_blocks_logo_grid_parent_id_idx" ON "tips_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_logo_grid_path_idx" ON "tips_blocks_logo_grid" USING btree ("_path");
  CREATE INDEX "tips_blocks_tabs_showcase_tabs_steps_order_idx" ON "tips_blocks_tabs_showcase_tabs_steps" USING btree ("_order");
  CREATE INDEX "tips_blocks_tabs_showcase_tabs_steps_parent_id_idx" ON "tips_blocks_tabs_showcase_tabs_steps" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_tabs_showcase_tabs_order_idx" ON "tips_blocks_tabs_showcase_tabs" USING btree ("_order");
  CREATE INDEX "tips_blocks_tabs_showcase_tabs_parent_id_idx" ON "tips_blocks_tabs_showcase_tabs" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_tabs_showcase_order_idx" ON "tips_blocks_tabs_showcase" USING btree ("_order");
  CREATE INDEX "tips_blocks_tabs_showcase_parent_id_idx" ON "tips_blocks_tabs_showcase" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_tabs_showcase_path_idx" ON "tips_blocks_tabs_showcase" USING btree ("_path");
  CREATE INDEX "tips_blocks_anchor_nav_items_order_idx" ON "tips_blocks_anchor_nav_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_anchor_nav_items_parent_id_idx" ON "tips_blocks_anchor_nav_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_anchor_nav_order_idx" ON "tips_blocks_anchor_nav" USING btree ("_order");
  CREATE INDEX "tips_blocks_anchor_nav_parent_id_idx" ON "tips_blocks_anchor_nav" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_anchor_nav_path_idx" ON "tips_blocks_anchor_nav" USING btree ("_path");
  CREATE INDEX "tips_blocks_testimonials_items_order_idx" ON "tips_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_testimonials_items_parent_id_idx" ON "tips_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_testimonials_order_idx" ON "tips_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "tips_blocks_testimonials_parent_id_idx" ON "tips_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_testimonials_path_idx" ON "tips_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "tips_blocks_comparison_grid_cards_order_idx" ON "tips_blocks_comparison_grid_cards" USING btree ("_order");
  CREATE INDEX "tips_blocks_comparison_grid_cards_parent_id_idx" ON "tips_blocks_comparison_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_comparison_grid_order_idx" ON "tips_blocks_comparison_grid" USING btree ("_order");
  CREATE INDEX "tips_blocks_comparison_grid_parent_id_idx" ON "tips_blocks_comparison_grid" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_comparison_grid_path_idx" ON "tips_blocks_comparison_grid" USING btree ("_path");
  CREATE INDEX "tips_blocks_use_case_flow_columns_items_order_idx" ON "tips_blocks_use_case_flow_columns_items" USING btree ("_order");
  CREATE INDEX "tips_blocks_use_case_flow_columns_items_parent_id_idx" ON "tips_blocks_use_case_flow_columns_items" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_use_case_flow_columns_order_idx" ON "tips_blocks_use_case_flow_columns" USING btree ("_order");
  CREATE INDEX "tips_blocks_use_case_flow_columns_parent_id_idx" ON "tips_blocks_use_case_flow_columns" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_use_case_flow_order_idx" ON "tips_blocks_use_case_flow" USING btree ("_order");
  CREATE INDEX "tips_blocks_use_case_flow_parent_id_idx" ON "tips_blocks_use_case_flow" USING btree ("_parent_id");
  CREATE INDEX "tips_blocks_use_case_flow_path_idx" ON "tips_blocks_use_case_flow" USING btree ("_path");
  CREATE INDEX "tips_content_key_idx" ON "tips" USING btree ("content_key");
  CREATE INDEX "tips_slug_idx" ON "tips" USING btree ("slug");
  CREATE UNIQUE INDEX "tips_path_idx" ON "tips" USING btree ("path");
  CREATE INDEX "tips_updated_at_idx" ON "tips" USING btree ("updated_at");
  CREATE INDEX "tips_created_at_idx" ON "tips" USING btree ("created_at");
  CREATE INDEX "use_cases_blocks_hero_cards_order_idx" ON "use_cases_blocks_hero_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_hero_cards_parent_id_idx" ON "use_cases_blocks_hero_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_hero_order_idx" ON "use_cases_blocks_hero" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_hero_parent_id_idx" ON "use_cases_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_hero_path_idx" ON "use_cases_blocks_hero" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_hero_extended_cards_order_idx" ON "use_cases_blocks_hero_extended_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_hero_extended_cards_parent_id_idx" ON "use_cases_blocks_hero_extended_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_hero_extended_order_idx" ON "use_cases_blocks_hero_extended" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_hero_extended_parent_id_idx" ON "use_cases_blocks_hero_extended" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_hero_extended_path_idx" ON "use_cases_blocks_hero_extended" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_rich_text_order_idx" ON "use_cases_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_rich_text_parent_id_idx" ON "use_cases_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_rich_text_path_idx" ON "use_cases_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_side_by_side_bullets_order_idx" ON "use_cases_blocks_side_by_side_bullets" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_side_by_side_bullets_parent_id_idx" ON "use_cases_blocks_side_by_side_bullets" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_side_by_side_small_icons_order_idx" ON "use_cases_blocks_side_by_side_small_icons" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_side_by_side_small_icons_parent_id_idx" ON "use_cases_blocks_side_by_side_small_icons" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_side_by_side_bottom_cards_items_order_idx" ON "use_cases_blocks_side_by_side_bottom_cards_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_side_by_side_bottom_cards_items_parent_id_idx" ON "use_cases_blocks_side_by_side_bottom_cards_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_side_by_side_bottom_cards_order_idx" ON "use_cases_blocks_side_by_side_bottom_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_side_by_side_bottom_cards_parent_id_idx" ON "use_cases_blocks_side_by_side_bottom_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_side_by_side_order_idx" ON "use_cases_blocks_side_by_side" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_side_by_side_parent_id_idx" ON "use_cases_blocks_side_by_side" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_side_by_side_path_idx" ON "use_cases_blocks_side_by_side" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_story_cards_order_idx" ON "use_cases_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_story_cards_parent_id_idx" ON "use_cases_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_story_order_idx" ON "use_cases_blocks_story" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_story_parent_id_idx" ON "use_cases_blocks_story" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_story_path_idx" ON "use_cases_blocks_story" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_media_showcase_order_idx" ON "use_cases_blocks_media_showcase" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_media_showcase_parent_id_idx" ON "use_cases_blocks_media_showcase" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_media_showcase_path_idx" ON "use_cases_blocks_media_showcase" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_feature_grid_cards_order_idx" ON "use_cases_blocks_feature_grid_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_feature_grid_cards_parent_id_idx" ON "use_cases_blocks_feature_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_feature_grid_order_idx" ON "use_cases_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_feature_grid_parent_id_idx" ON "use_cases_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_feature_grid_path_idx" ON "use_cases_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_agent_capabilities_items_order_idx" ON "use_cases_blocks_agent_capabilities_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_agent_capabilities_items_parent_id_idx" ON "use_cases_blocks_agent_capabilities_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_agent_capabilities_order_idx" ON "use_cases_blocks_agent_capabilities" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_agent_capabilities_parent_id_idx" ON "use_cases_blocks_agent_capabilities" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_agent_capabilities_path_idx" ON "use_cases_blocks_agent_capabilities" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_agent_solutions_items_order_idx" ON "use_cases_blocks_agent_solutions_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_agent_solutions_items_parent_id_idx" ON "use_cases_blocks_agent_solutions_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_agent_solutions_order_idx" ON "use_cases_blocks_agent_solutions" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_agent_solutions_parent_id_idx" ON "use_cases_blocks_agent_solutions" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_agent_solutions_path_idx" ON "use_cases_blocks_agent_solutions" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_contact_us_order_idx" ON "use_cases_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_contact_us_parent_id_idx" ON "use_cases_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_contact_us_path_idx" ON "use_cases_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_concierge_flow_cards_order_idx" ON "use_cases_blocks_concierge_flow_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_concierge_flow_cards_parent_id_idx" ON "use_cases_blocks_concierge_flow_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_concierge_flow_order_idx" ON "use_cases_blocks_concierge_flow" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_concierge_flow_parent_id_idx" ON "use_cases_blocks_concierge_flow" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_concierge_flow_path_idx" ON "use_cases_blocks_concierge_flow" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_enterprise_upgrade_benefits_order_idx" ON "use_cases_blocks_enterprise_upgrade_benefits" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_enterprise_upgrade_benefits_parent_id_idx" ON "use_cases_blocks_enterprise_upgrade_benefits" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_enterprise_upgrade_order_idx" ON "use_cases_blocks_enterprise_upgrade" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_enterprise_upgrade_parent_id_idx" ON "use_cases_blocks_enterprise_upgrade" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_enterprise_upgrade_path_idx" ON "use_cases_blocks_enterprise_upgrade" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_channels_grid_cards_order_idx" ON "use_cases_blocks_channels_grid_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_channels_grid_cards_parent_id_idx" ON "use_cases_blocks_channels_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_channels_grid_order_idx" ON "use_cases_blocks_channels_grid" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_channels_grid_parent_id_idx" ON "use_cases_blocks_channels_grid" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_channels_grid_path_idx" ON "use_cases_blocks_channels_grid" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_feature_stack_cards_order_idx" ON "use_cases_blocks_feature_stack_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_feature_stack_cards_parent_id_idx" ON "use_cases_blocks_feature_stack_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_feature_stack_order_idx" ON "use_cases_blocks_feature_stack" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_feature_stack_parent_id_idx" ON "use_cases_blocks_feature_stack" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_feature_stack_path_idx" ON "use_cases_blocks_feature_stack" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_coverage_grid_cards_order_idx" ON "use_cases_blocks_coverage_grid_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_coverage_grid_cards_parent_id_idx" ON "use_cases_blocks_coverage_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_coverage_grid_order_idx" ON "use_cases_blocks_coverage_grid" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_coverage_grid_parent_id_idx" ON "use_cases_blocks_coverage_grid" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_coverage_grid_path_idx" ON "use_cases_blocks_coverage_grid" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_feature_rows_rows_order_idx" ON "use_cases_blocks_feature_rows_rows" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_feature_rows_rows_parent_id_idx" ON "use_cases_blocks_feature_rows_rows" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_feature_rows_order_idx" ON "use_cases_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_feature_rows_parent_id_idx" ON "use_cases_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_feature_rows_path_idx" ON "use_cases_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_capability_trio_cards_order_idx" ON "use_cases_blocks_capability_trio_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_capability_trio_cards_parent_id_idx" ON "use_cases_blocks_capability_trio_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_capability_trio_order_idx" ON "use_cases_blocks_capability_trio" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_capability_trio_parent_id_idx" ON "use_cases_blocks_capability_trio" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_capability_trio_path_idx" ON "use_cases_blocks_capability_trio" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_capability_tools_cards_logos_order_idx" ON "use_cases_blocks_capability_tools_cards_logos" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_capability_tools_cards_logos_parent_id_idx" ON "use_cases_blocks_capability_tools_cards_logos" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_capability_tools_cards_order_idx" ON "use_cases_blocks_capability_tools_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_capability_tools_cards_parent_id_idx" ON "use_cases_blocks_capability_tools_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_capability_tools_order_idx" ON "use_cases_blocks_capability_tools" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_capability_tools_parent_id_idx" ON "use_cases_blocks_capability_tools" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_capability_tools_path_idx" ON "use_cases_blocks_capability_tools" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_use_cases_grid_cards_order_idx" ON "use_cases_blocks_use_cases_grid_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_use_cases_grid_cards_parent_id_idx" ON "use_cases_blocks_use_cases_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_use_cases_grid_order_idx" ON "use_cases_blocks_use_cases_grid" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_use_cases_grid_parent_id_idx" ON "use_cases_blocks_use_cases_grid" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_use_cases_grid_path_idx" ON "use_cases_blocks_use_cases_grid" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_security_cards_order_idx" ON "use_cases_blocks_security_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_security_cards_parent_id_idx" ON "use_cases_blocks_security_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_security_order_idx" ON "use_cases_blocks_security" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_security_parent_id_idx" ON "use_cases_blocks_security" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_security_path_idx" ON "use_cases_blocks_security" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_functional_capabilities_cards_order_idx" ON "use_cases_blocks_functional_capabilities_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_functional_capabilities_cards_parent_id_idx" ON "use_cases_blocks_functional_capabilities_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_functional_capabilities_order_idx" ON "use_cases_blocks_functional_capabilities" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_functional_capabilities_parent_id_idx" ON "use_cases_blocks_functional_capabilities" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_functional_capabilities_path_idx" ON "use_cases_blocks_functional_capabilities" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_how_it_works_steps_order_idx" ON "use_cases_blocks_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_how_it_works_steps_parent_id_idx" ON "use_cases_blocks_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_how_it_works_order_idx" ON "use_cases_blocks_how_it_works" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_how_it_works_parent_id_idx" ON "use_cases_blocks_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_how_it_works_path_idx" ON "use_cases_blocks_how_it_works" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_cta_order_idx" ON "use_cases_blocks_cta" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_cta_parent_id_idx" ON "use_cases_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_cta_path_idx" ON "use_cases_blocks_cta" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_metrics_items_order_idx" ON "use_cases_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_metrics_items_parent_id_idx" ON "use_cases_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_metrics_order_idx" ON "use_cases_blocks_metrics" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_metrics_parent_id_idx" ON "use_cases_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_metrics_path_idx" ON "use_cases_blocks_metrics" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_results_stats_items_order_idx" ON "use_cases_blocks_results_stats_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_results_stats_items_parent_id_idx" ON "use_cases_blocks_results_stats_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_results_stats_order_idx" ON "use_cases_blocks_results_stats" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_results_stats_parent_id_idx" ON "use_cases_blocks_results_stats" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_results_stats_path_idx" ON "use_cases_blocks_results_stats" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_stats_cards_items_order_idx" ON "use_cases_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_stats_cards_items_parent_id_idx" ON "use_cases_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_stats_cards_order_idx" ON "use_cases_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_stats_cards_parent_id_idx" ON "use_cases_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_stats_cards_path_idx" ON "use_cases_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_capability_strip_items_order_idx" ON "use_cases_blocks_capability_strip_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_capability_strip_items_parent_id_idx" ON "use_cases_blocks_capability_strip_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_capability_strip_order_idx" ON "use_cases_blocks_capability_strip" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_capability_strip_parent_id_idx" ON "use_cases_blocks_capability_strip" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_capability_strip_path_idx" ON "use_cases_blocks_capability_strip" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_live_in_days_items_order_idx" ON "use_cases_blocks_live_in_days_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_live_in_days_items_parent_id_idx" ON "use_cases_blocks_live_in_days_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_live_in_days_order_idx" ON "use_cases_blocks_live_in_days" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_live_in_days_parent_id_idx" ON "use_cases_blocks_live_in_days" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_live_in_days_path_idx" ON "use_cases_blocks_live_in_days" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_faq_items_order_idx" ON "use_cases_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_faq_items_parent_id_idx" ON "use_cases_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_faq_order_idx" ON "use_cases_blocks_faq" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_faq_parent_id_idx" ON "use_cases_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_faq_path_idx" ON "use_cases_blocks_faq" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_news_insights_collections_order_idx" ON "use_cases_blocks_news_insights_collections" USING btree ("order");
  CREATE INDEX "use_cases_blocks_news_insights_collections_parent_idx" ON "use_cases_blocks_news_insights_collections" USING btree ("parent_id");
  CREATE INDEX "use_cases_blocks_news_insights_cards_tags_order_idx" ON "use_cases_blocks_news_insights_cards_tags" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_news_insights_cards_tags_parent_id_idx" ON "use_cases_blocks_news_insights_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_news_insights_cards_order_idx" ON "use_cases_blocks_news_insights_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_news_insights_cards_parent_id_idx" ON "use_cases_blocks_news_insights_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_news_insights_order_idx" ON "use_cases_blocks_news_insights" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_news_insights_parent_id_idx" ON "use_cases_blocks_news_insights" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_news_insights_path_idx" ON "use_cases_blocks_news_insights" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_content_feed_collections_order_idx" ON "use_cases_blocks_content_feed_collections" USING btree ("order");
  CREATE INDEX "use_cases_blocks_content_feed_collections_parent_idx" ON "use_cases_blocks_content_feed_collections" USING btree ("parent_id");
  CREATE INDEX "use_cases_blocks_content_feed_cards_tags_order_idx" ON "use_cases_blocks_content_feed_cards_tags" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_content_feed_cards_tags_parent_id_idx" ON "use_cases_blocks_content_feed_cards_tags" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_content_feed_cards_order_idx" ON "use_cases_blocks_content_feed_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_content_feed_cards_parent_id_idx" ON "use_cases_blocks_content_feed_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_content_feed_order_idx" ON "use_cases_blocks_content_feed" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_content_feed_parent_id_idx" ON "use_cases_blocks_content_feed" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_content_feed_path_idx" ON "use_cases_blocks_content_feed" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_pricing_cards_cards_features_order_idx" ON "use_cases_blocks_pricing_cards_cards_features" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_pricing_cards_cards_features_parent_id_idx" ON "use_cases_blocks_pricing_cards_cards_features" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_pricing_cards_cards_order_idx" ON "use_cases_blocks_pricing_cards_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_pricing_cards_cards_parent_id_idx" ON "use_cases_blocks_pricing_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_pricing_cards_order_idx" ON "use_cases_blocks_pricing_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_pricing_cards_parent_id_idx" ON "use_cases_blocks_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_pricing_cards_path_idx" ON "use_cases_blocks_pricing_cards" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_pricing_details_sections_headers_order_idx" ON "use_cases_blocks_pricing_details_sections_headers" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_pricing_details_sections_headers_parent_id_idx" ON "use_cases_blocks_pricing_details_sections_headers" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_pricing_details_sections_rows_cells_order_idx" ON "use_cases_blocks_pricing_details_sections_rows_cells" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_pricing_details_sections_rows_cells_parent_id_idx" ON "use_cases_blocks_pricing_details_sections_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_pricing_details_sections_rows_order_idx" ON "use_cases_blocks_pricing_details_sections_rows" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_pricing_details_sections_rows_parent_id_idx" ON "use_cases_blocks_pricing_details_sections_rows" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_pricing_details_sections_order_idx" ON "use_cases_blocks_pricing_details_sections" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_pricing_details_sections_parent_id_idx" ON "use_cases_blocks_pricing_details_sections" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_pricing_details_order_idx" ON "use_cases_blocks_pricing_details" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_pricing_details_parent_id_idx" ON "use_cases_blocks_pricing_details" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_pricing_details_path_idx" ON "use_cases_blocks_pricing_details" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_difference_left_items_order_idx" ON "use_cases_blocks_difference_left_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_difference_left_items_parent_id_idx" ON "use_cases_blocks_difference_left_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_difference_right_items_order_idx" ON "use_cases_blocks_difference_right_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_difference_right_items_parent_id_idx" ON "use_cases_blocks_difference_right_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_difference_order_idx" ON "use_cases_blocks_difference" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_difference_parent_id_idx" ON "use_cases_blocks_difference" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_difference_path_idx" ON "use_cases_blocks_difference" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_pain_points_comparison_rows_order_idx" ON "use_cases_blocks_pain_points_comparison_rows" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_pain_points_comparison_rows_parent_id_idx" ON "use_cases_blocks_pain_points_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_pain_points_comparison_order_idx" ON "use_cases_blocks_pain_points_comparison" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_pain_points_comparison_parent_id_idx" ON "use_cases_blocks_pain_points_comparison" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_pain_points_comparison_path_idx" ON "use_cases_blocks_pain_points_comparison" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_pricing_policy_callouts_order_idx" ON "use_cases_blocks_pricing_policy_callouts" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_pricing_policy_callouts_parent_id_idx" ON "use_cases_blocks_pricing_policy_callouts" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_pricing_policy_order_idx" ON "use_cases_blocks_pricing_policy" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_pricing_policy_parent_id_idx" ON "use_cases_blocks_pricing_policy" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_pricing_policy_path_idx" ON "use_cases_blocks_pricing_policy" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_industry_expertise_items_order_idx" ON "use_cases_blocks_industry_expertise_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_industry_expertise_items_parent_id_idx" ON "use_cases_blocks_industry_expertise_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_industry_expertise_info_cards_order_idx" ON "use_cases_blocks_industry_expertise_info_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_industry_expertise_info_cards_parent_id_idx" ON "use_cases_blocks_industry_expertise_info_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_industry_expertise_order_idx" ON "use_cases_blocks_industry_expertise" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_industry_expertise_parent_id_idx" ON "use_cases_blocks_industry_expertise" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_industry_expertise_path_idx" ON "use_cases_blocks_industry_expertise" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_logo_strip_logos_order_idx" ON "use_cases_blocks_logo_strip_logos" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_logo_strip_logos_parent_id_idx" ON "use_cases_blocks_logo_strip_logos" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_logo_strip_stats_order_idx" ON "use_cases_blocks_logo_strip_stats" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_logo_strip_stats_parent_id_idx" ON "use_cases_blocks_logo_strip_stats" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_logo_strip_order_idx" ON "use_cases_blocks_logo_strip" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_logo_strip_parent_id_idx" ON "use_cases_blocks_logo_strip" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_logo_strip_path_idx" ON "use_cases_blocks_logo_strip" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_integrations_banner_items_order_idx" ON "use_cases_blocks_integrations_banner_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_integrations_banner_items_parent_id_idx" ON "use_cases_blocks_integrations_banner_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_integrations_banner_order_idx" ON "use_cases_blocks_integrations_banner" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_integrations_banner_parent_id_idx" ON "use_cases_blocks_integrations_banner" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_integrations_banner_path_idx" ON "use_cases_blocks_integrations_banner" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_logo_grid_columns_items_order_idx" ON "use_cases_blocks_logo_grid_columns_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_logo_grid_columns_items_parent_id_idx" ON "use_cases_blocks_logo_grid_columns_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_logo_grid_columns_order_idx" ON "use_cases_blocks_logo_grid_columns" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_logo_grid_columns_parent_id_idx" ON "use_cases_blocks_logo_grid_columns" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_logo_grid_order_idx" ON "use_cases_blocks_logo_grid" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_logo_grid_parent_id_idx" ON "use_cases_blocks_logo_grid" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_logo_grid_path_idx" ON "use_cases_blocks_logo_grid" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_tabs_showcase_tabs_steps_order_idx" ON "use_cases_blocks_tabs_showcase_tabs_steps" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_tabs_showcase_tabs_steps_parent_id_idx" ON "use_cases_blocks_tabs_showcase_tabs_steps" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_tabs_showcase_tabs_order_idx" ON "use_cases_blocks_tabs_showcase_tabs" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_tabs_showcase_tabs_parent_id_idx" ON "use_cases_blocks_tabs_showcase_tabs" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_tabs_showcase_order_idx" ON "use_cases_blocks_tabs_showcase" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_tabs_showcase_parent_id_idx" ON "use_cases_blocks_tabs_showcase" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_tabs_showcase_path_idx" ON "use_cases_blocks_tabs_showcase" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_anchor_nav_items_order_idx" ON "use_cases_blocks_anchor_nav_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_anchor_nav_items_parent_id_idx" ON "use_cases_blocks_anchor_nav_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_anchor_nav_order_idx" ON "use_cases_blocks_anchor_nav" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_anchor_nav_parent_id_idx" ON "use_cases_blocks_anchor_nav" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_anchor_nav_path_idx" ON "use_cases_blocks_anchor_nav" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_testimonials_items_order_idx" ON "use_cases_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_testimonials_items_parent_id_idx" ON "use_cases_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_testimonials_order_idx" ON "use_cases_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_testimonials_parent_id_idx" ON "use_cases_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_testimonials_path_idx" ON "use_cases_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_comparison_grid_cards_order_idx" ON "use_cases_blocks_comparison_grid_cards" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_comparison_grid_cards_parent_id_idx" ON "use_cases_blocks_comparison_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_comparison_grid_order_idx" ON "use_cases_blocks_comparison_grid" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_comparison_grid_parent_id_idx" ON "use_cases_blocks_comparison_grid" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_comparison_grid_path_idx" ON "use_cases_blocks_comparison_grid" USING btree ("_path");
  CREATE INDEX "use_cases_blocks_use_case_flow_columns_items_order_idx" ON "use_cases_blocks_use_case_flow_columns_items" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_use_case_flow_columns_items_parent_id_idx" ON "use_cases_blocks_use_case_flow_columns_items" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_use_case_flow_columns_order_idx" ON "use_cases_blocks_use_case_flow_columns" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_use_case_flow_columns_parent_id_idx" ON "use_cases_blocks_use_case_flow_columns" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_use_case_flow_order_idx" ON "use_cases_blocks_use_case_flow" USING btree ("_order");
  CREATE INDEX "use_cases_blocks_use_case_flow_parent_id_idx" ON "use_cases_blocks_use_case_flow" USING btree ("_parent_id");
  CREATE INDEX "use_cases_blocks_use_case_flow_path_idx" ON "use_cases_blocks_use_case_flow" USING btree ("_path");
  CREATE INDEX "use_cases_content_key_idx" ON "use_cases" USING btree ("content_key");
  CREATE INDEX "use_cases_slug_idx" ON "use_cases" USING btree ("slug");
  CREATE UNIQUE INDEX "use_cases_path_idx" ON "use_cases" USING btree ("path");
  CREATE INDEX "use_cases_updated_at_idx" ON "use_cases" USING btree ("updated_at");
  CREATE INDEX "use_cases_created_at_idx" ON "use_cases" USING btree ("created_at");
  CREATE INDEX "forms_fields_options_order_idx" ON "forms_fields_options" USING btree ("_order");
  CREATE INDEX "forms_fields_options_parent_id_idx" ON "forms_fields_options" USING btree ("_parent_id");
  CREATE INDEX "forms_fields_order_idx" ON "forms_fields" USING btree ("_order");
  CREATE INDEX "forms_fields_parent_id_idx" ON "forms_fields" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_functions_order_idx" ON "form_submissions_functions" USING btree ("_order");
  CREATE INDEX "form_submissions_functions_parent_id_idx" ON "form_submissions_functions" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "faq_items_source_key_idx" ON "faq_items" USING btree ("source_key");
  CREATE INDEX "faq_items_updated_at_idx" ON "faq_items" USING btree ("updated_at");
  CREATE INDEX "faq_items_created_at_idx" ON "faq_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_source_key_idx" ON "testimonials" USING btree ("source_key");
  CREATE INDEX "testimonials_author_image_idx" ON "testimonials" USING btree ("author_image_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_guides_id_idx" ON "payload_locked_documents_rels" USING btree ("guides_id");
  CREATE INDEX "payload_locked_documents_rels_tips_id_idx" ON "payload_locked_documents_rels" USING btree ("tips_id");
  CREATE INDEX "payload_locked_documents_rels_use_cases_id_idx" ON "payload_locked_documents_rels" USING btree ("use_cases_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_faq_items_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_items_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_primary_navigation_items_order_idx" ON "site_settings_primary_navigation_items" USING btree ("_order");
  CREATE INDEX "site_settings_primary_navigation_items_parent_id_idx" ON "site_settings_primary_navigation_items" USING btree ("_parent_id");
  CREATE INDEX "site_settings_primary_navigation_order_idx" ON "site_settings_primary_navigation" USING btree ("_order");
  CREATE INDEX "site_settings_primary_navigation_parent_id_idx" ON "site_settings_primary_navigation" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_navigation_order_idx" ON "site_settings_footer_navigation" USING btree ("_order");
  CREATE INDEX "site_settings_footer_navigation_parent_id_idx" ON "site_settings_footer_navigation" USING btree ("_parent_id");
  CREATE INDEX "site_settings_default_seo_default_seo_social_image_idx" ON "site_settings" USING btree ("default_seo_social_image_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero_cards" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_extended_cards" CASCADE;
  DROP TABLE "pages_blocks_hero_extended" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_side_by_side_bullets" CASCADE;
  DROP TABLE "pages_blocks_side_by_side_small_icons" CASCADE;
  DROP TABLE "pages_blocks_side_by_side_bottom_cards_items" CASCADE;
  DROP TABLE "pages_blocks_side_by_side_bottom_cards" CASCADE;
  DROP TABLE "pages_blocks_side_by_side" CASCADE;
  DROP TABLE "pages_blocks_story_cards" CASCADE;
  DROP TABLE "pages_blocks_story" CASCADE;
  DROP TABLE "pages_blocks_media_showcase" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_agent_capabilities_items" CASCADE;
  DROP TABLE "pages_blocks_agent_capabilities" CASCADE;
  DROP TABLE "pages_blocks_agent_solutions_items" CASCADE;
  DROP TABLE "pages_blocks_agent_solutions" CASCADE;
  DROP TABLE "pages_blocks_contact_us" CASCADE;
  DROP TABLE "pages_blocks_concierge_flow_cards" CASCADE;
  DROP TABLE "pages_blocks_concierge_flow" CASCADE;
  DROP TABLE "pages_blocks_enterprise_upgrade_benefits" CASCADE;
  DROP TABLE "pages_blocks_enterprise_upgrade" CASCADE;
  DROP TABLE "pages_blocks_channels_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_channels_grid" CASCADE;
  DROP TABLE "pages_blocks_feature_stack_cards" CASCADE;
  DROP TABLE "pages_blocks_feature_stack" CASCADE;
  DROP TABLE "pages_blocks_coverage_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_coverage_grid" CASCADE;
  DROP TABLE "pages_blocks_feature_rows_rows" CASCADE;
  DROP TABLE "pages_blocks_feature_rows" CASCADE;
  DROP TABLE "pages_blocks_capability_trio_cards" CASCADE;
  DROP TABLE "pages_blocks_capability_trio" CASCADE;
  DROP TABLE "pages_blocks_capability_tools_cards_logos" CASCADE;
  DROP TABLE "pages_blocks_capability_tools_cards" CASCADE;
  DROP TABLE "pages_blocks_capability_tools" CASCADE;
  DROP TABLE "pages_blocks_use_cases_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_use_cases_grid" CASCADE;
  DROP TABLE "pages_blocks_security_cards" CASCADE;
  DROP TABLE "pages_blocks_security" CASCADE;
  DROP TABLE "pages_blocks_functional_capabilities_cards" CASCADE;
  DROP TABLE "pages_blocks_functional_capabilities" CASCADE;
  DROP TABLE "pages_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "pages_blocks_how_it_works" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_metrics_items" CASCADE;
  DROP TABLE "pages_blocks_metrics" CASCADE;
  DROP TABLE "pages_blocks_results_stats_items" CASCADE;
  DROP TABLE "pages_blocks_results_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_cards_items" CASCADE;
  DROP TABLE "pages_blocks_stats_cards" CASCADE;
  DROP TABLE "pages_blocks_capability_strip_items" CASCADE;
  DROP TABLE "pages_blocks_capability_strip" CASCADE;
  DROP TABLE "pages_blocks_live_in_days_items" CASCADE;
  DROP TABLE "pages_blocks_live_in_days" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_news_insights_collections" CASCADE;
  DROP TABLE "pages_blocks_news_insights_cards_tags" CASCADE;
  DROP TABLE "pages_blocks_news_insights_cards" CASCADE;
  DROP TABLE "pages_blocks_news_insights" CASCADE;
  DROP TABLE "pages_blocks_content_feed_collections" CASCADE;
  DROP TABLE "pages_blocks_content_feed_cards_tags" CASCADE;
  DROP TABLE "pages_blocks_content_feed_cards" CASCADE;
  DROP TABLE "pages_blocks_content_feed" CASCADE;
  DROP TABLE "pages_blocks_pricing_cards_cards_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_pricing_cards" CASCADE;
  DROP TABLE "pages_blocks_pricing_details_sections_headers" CASCADE;
  DROP TABLE "pages_blocks_pricing_details_sections_rows_cells" CASCADE;
  DROP TABLE "pages_blocks_pricing_details_sections_rows" CASCADE;
  DROP TABLE "pages_blocks_pricing_details_sections" CASCADE;
  DROP TABLE "pages_blocks_pricing_details" CASCADE;
  DROP TABLE "pages_blocks_difference_left_items" CASCADE;
  DROP TABLE "pages_blocks_difference_right_items" CASCADE;
  DROP TABLE "pages_blocks_difference" CASCADE;
  DROP TABLE "pages_blocks_pain_points_comparison_rows" CASCADE;
  DROP TABLE "pages_blocks_pain_points_comparison" CASCADE;
  DROP TABLE "pages_blocks_pricing_policy_callouts" CASCADE;
  DROP TABLE "pages_blocks_pricing_policy" CASCADE;
  DROP TABLE "pages_blocks_industry_expertise_items" CASCADE;
  DROP TABLE "pages_blocks_industry_expertise_info_cards" CASCADE;
  DROP TABLE "pages_blocks_industry_expertise" CASCADE;
  DROP TABLE "pages_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_strip_stats" CASCADE;
  DROP TABLE "pages_blocks_logo_strip" CASCADE;
  DROP TABLE "pages_blocks_integrations_banner_items" CASCADE;
  DROP TABLE "pages_blocks_integrations_banner" CASCADE;
  DROP TABLE "pages_blocks_logo_grid_columns_items" CASCADE;
  DROP TABLE "pages_blocks_logo_grid_columns" CASCADE;
  DROP TABLE "pages_blocks_logo_grid" CASCADE;
  DROP TABLE "pages_blocks_tabs_showcase_tabs_steps" CASCADE;
  DROP TABLE "pages_blocks_tabs_showcase_tabs" CASCADE;
  DROP TABLE "pages_blocks_tabs_showcase" CASCADE;
  DROP TABLE "pages_blocks_anchor_nav_items" CASCADE;
  DROP TABLE "pages_blocks_anchor_nav" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_comparison_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_comparison_grid" CASCADE;
  DROP TABLE "pages_blocks_use_case_flow_columns_items" CASCADE;
  DROP TABLE "pages_blocks_use_case_flow_columns" CASCADE;
  DROP TABLE "pages_blocks_use_case_flow" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "posts_blocks_hero_cards" CASCADE;
  DROP TABLE "posts_blocks_hero" CASCADE;
  DROP TABLE "posts_blocks_hero_extended_cards" CASCADE;
  DROP TABLE "posts_blocks_hero_extended" CASCADE;
  DROP TABLE "posts_blocks_rich_text" CASCADE;
  DROP TABLE "posts_blocks_side_by_side_bullets" CASCADE;
  DROP TABLE "posts_blocks_side_by_side_small_icons" CASCADE;
  DROP TABLE "posts_blocks_side_by_side_bottom_cards_items" CASCADE;
  DROP TABLE "posts_blocks_side_by_side_bottom_cards" CASCADE;
  DROP TABLE "posts_blocks_side_by_side" CASCADE;
  DROP TABLE "posts_blocks_story_cards" CASCADE;
  DROP TABLE "posts_blocks_story" CASCADE;
  DROP TABLE "posts_blocks_media_showcase" CASCADE;
  DROP TABLE "posts_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "posts_blocks_feature_grid" CASCADE;
  DROP TABLE "posts_blocks_agent_capabilities_items" CASCADE;
  DROP TABLE "posts_blocks_agent_capabilities" CASCADE;
  DROP TABLE "posts_blocks_agent_solutions_items" CASCADE;
  DROP TABLE "posts_blocks_agent_solutions" CASCADE;
  DROP TABLE "posts_blocks_contact_us" CASCADE;
  DROP TABLE "posts_blocks_concierge_flow_cards" CASCADE;
  DROP TABLE "posts_blocks_concierge_flow" CASCADE;
  DROP TABLE "posts_blocks_enterprise_upgrade_benefits" CASCADE;
  DROP TABLE "posts_blocks_enterprise_upgrade" CASCADE;
  DROP TABLE "posts_blocks_channels_grid_cards" CASCADE;
  DROP TABLE "posts_blocks_channels_grid" CASCADE;
  DROP TABLE "posts_blocks_feature_stack_cards" CASCADE;
  DROP TABLE "posts_blocks_feature_stack" CASCADE;
  DROP TABLE "posts_blocks_coverage_grid_cards" CASCADE;
  DROP TABLE "posts_blocks_coverage_grid" CASCADE;
  DROP TABLE "posts_blocks_feature_rows_rows" CASCADE;
  DROP TABLE "posts_blocks_feature_rows" CASCADE;
  DROP TABLE "posts_blocks_capability_trio_cards" CASCADE;
  DROP TABLE "posts_blocks_capability_trio" CASCADE;
  DROP TABLE "posts_blocks_capability_tools_cards_logos" CASCADE;
  DROP TABLE "posts_blocks_capability_tools_cards" CASCADE;
  DROP TABLE "posts_blocks_capability_tools" CASCADE;
  DROP TABLE "posts_blocks_use_cases_grid_cards" CASCADE;
  DROP TABLE "posts_blocks_use_cases_grid" CASCADE;
  DROP TABLE "posts_blocks_security_cards" CASCADE;
  DROP TABLE "posts_blocks_security" CASCADE;
  DROP TABLE "posts_blocks_functional_capabilities_cards" CASCADE;
  DROP TABLE "posts_blocks_functional_capabilities" CASCADE;
  DROP TABLE "posts_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "posts_blocks_how_it_works" CASCADE;
  DROP TABLE "posts_blocks_cta" CASCADE;
  DROP TABLE "posts_blocks_metrics_items" CASCADE;
  DROP TABLE "posts_blocks_metrics" CASCADE;
  DROP TABLE "posts_blocks_results_stats_items" CASCADE;
  DROP TABLE "posts_blocks_results_stats" CASCADE;
  DROP TABLE "posts_blocks_stats_cards_items" CASCADE;
  DROP TABLE "posts_blocks_stats_cards" CASCADE;
  DROP TABLE "posts_blocks_capability_strip_items" CASCADE;
  DROP TABLE "posts_blocks_capability_strip" CASCADE;
  DROP TABLE "posts_blocks_live_in_days_items" CASCADE;
  DROP TABLE "posts_blocks_live_in_days" CASCADE;
  DROP TABLE "posts_blocks_faq_items" CASCADE;
  DROP TABLE "posts_blocks_faq" CASCADE;
  DROP TABLE "posts_blocks_news_insights_collections" CASCADE;
  DROP TABLE "posts_blocks_news_insights_cards_tags" CASCADE;
  DROP TABLE "posts_blocks_news_insights_cards" CASCADE;
  DROP TABLE "posts_blocks_news_insights" CASCADE;
  DROP TABLE "posts_blocks_content_feed_collections" CASCADE;
  DROP TABLE "posts_blocks_content_feed_cards_tags" CASCADE;
  DROP TABLE "posts_blocks_content_feed_cards" CASCADE;
  DROP TABLE "posts_blocks_content_feed" CASCADE;
  DROP TABLE "posts_blocks_pricing_cards_cards_features" CASCADE;
  DROP TABLE "posts_blocks_pricing_cards_cards" CASCADE;
  DROP TABLE "posts_blocks_pricing_cards" CASCADE;
  DROP TABLE "posts_blocks_pricing_details_sections_headers" CASCADE;
  DROP TABLE "posts_blocks_pricing_details_sections_rows_cells" CASCADE;
  DROP TABLE "posts_blocks_pricing_details_sections_rows" CASCADE;
  DROP TABLE "posts_blocks_pricing_details_sections" CASCADE;
  DROP TABLE "posts_blocks_pricing_details" CASCADE;
  DROP TABLE "posts_blocks_difference_left_items" CASCADE;
  DROP TABLE "posts_blocks_difference_right_items" CASCADE;
  DROP TABLE "posts_blocks_difference" CASCADE;
  DROP TABLE "posts_blocks_pain_points_comparison_rows" CASCADE;
  DROP TABLE "posts_blocks_pain_points_comparison" CASCADE;
  DROP TABLE "posts_blocks_pricing_policy_callouts" CASCADE;
  DROP TABLE "posts_blocks_pricing_policy" CASCADE;
  DROP TABLE "posts_blocks_industry_expertise_items" CASCADE;
  DROP TABLE "posts_blocks_industry_expertise_info_cards" CASCADE;
  DROP TABLE "posts_blocks_industry_expertise" CASCADE;
  DROP TABLE "posts_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "posts_blocks_logo_strip_stats" CASCADE;
  DROP TABLE "posts_blocks_logo_strip" CASCADE;
  DROP TABLE "posts_blocks_integrations_banner_items" CASCADE;
  DROP TABLE "posts_blocks_integrations_banner" CASCADE;
  DROP TABLE "posts_blocks_logo_grid_columns_items" CASCADE;
  DROP TABLE "posts_blocks_logo_grid_columns" CASCADE;
  DROP TABLE "posts_blocks_logo_grid" CASCADE;
  DROP TABLE "posts_blocks_tabs_showcase_tabs_steps" CASCADE;
  DROP TABLE "posts_blocks_tabs_showcase_tabs" CASCADE;
  DROP TABLE "posts_blocks_tabs_showcase" CASCADE;
  DROP TABLE "posts_blocks_anchor_nav_items" CASCADE;
  DROP TABLE "posts_blocks_anchor_nav" CASCADE;
  DROP TABLE "posts_blocks_testimonials_items" CASCADE;
  DROP TABLE "posts_blocks_testimonials" CASCADE;
  DROP TABLE "posts_blocks_comparison_grid_cards" CASCADE;
  DROP TABLE "posts_blocks_comparison_grid" CASCADE;
  DROP TABLE "posts_blocks_use_case_flow_columns_items" CASCADE;
  DROP TABLE "posts_blocks_use_case_flow_columns" CASCADE;
  DROP TABLE "posts_blocks_use_case_flow" CASCADE;
  DROP TABLE "posts_article_meta_tags" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "news_blocks_hero_cards" CASCADE;
  DROP TABLE "news_blocks_hero" CASCADE;
  DROP TABLE "news_blocks_hero_extended_cards" CASCADE;
  DROP TABLE "news_blocks_hero_extended" CASCADE;
  DROP TABLE "news_blocks_rich_text" CASCADE;
  DROP TABLE "news_blocks_side_by_side_bullets" CASCADE;
  DROP TABLE "news_blocks_side_by_side_small_icons" CASCADE;
  DROP TABLE "news_blocks_side_by_side_bottom_cards_items" CASCADE;
  DROP TABLE "news_blocks_side_by_side_bottom_cards" CASCADE;
  DROP TABLE "news_blocks_side_by_side" CASCADE;
  DROP TABLE "news_blocks_story_cards" CASCADE;
  DROP TABLE "news_blocks_story" CASCADE;
  DROP TABLE "news_blocks_media_showcase" CASCADE;
  DROP TABLE "news_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "news_blocks_feature_grid" CASCADE;
  DROP TABLE "news_blocks_agent_capabilities_items" CASCADE;
  DROP TABLE "news_blocks_agent_capabilities" CASCADE;
  DROP TABLE "news_blocks_agent_solutions_items" CASCADE;
  DROP TABLE "news_blocks_agent_solutions" CASCADE;
  DROP TABLE "news_blocks_contact_us" CASCADE;
  DROP TABLE "news_blocks_concierge_flow_cards" CASCADE;
  DROP TABLE "news_blocks_concierge_flow" CASCADE;
  DROP TABLE "news_blocks_enterprise_upgrade_benefits" CASCADE;
  DROP TABLE "news_blocks_enterprise_upgrade" CASCADE;
  DROP TABLE "news_blocks_channels_grid_cards" CASCADE;
  DROP TABLE "news_blocks_channels_grid" CASCADE;
  DROP TABLE "news_blocks_feature_stack_cards" CASCADE;
  DROP TABLE "news_blocks_feature_stack" CASCADE;
  DROP TABLE "news_blocks_coverage_grid_cards" CASCADE;
  DROP TABLE "news_blocks_coverage_grid" CASCADE;
  DROP TABLE "news_blocks_feature_rows_rows" CASCADE;
  DROP TABLE "news_blocks_feature_rows" CASCADE;
  DROP TABLE "news_blocks_capability_trio_cards" CASCADE;
  DROP TABLE "news_blocks_capability_trio" CASCADE;
  DROP TABLE "news_blocks_capability_tools_cards_logos" CASCADE;
  DROP TABLE "news_blocks_capability_tools_cards" CASCADE;
  DROP TABLE "news_blocks_capability_tools" CASCADE;
  DROP TABLE "news_blocks_use_cases_grid_cards" CASCADE;
  DROP TABLE "news_blocks_use_cases_grid" CASCADE;
  DROP TABLE "news_blocks_security_cards" CASCADE;
  DROP TABLE "news_blocks_security" CASCADE;
  DROP TABLE "news_blocks_functional_capabilities_cards" CASCADE;
  DROP TABLE "news_blocks_functional_capabilities" CASCADE;
  DROP TABLE "news_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "news_blocks_how_it_works" CASCADE;
  DROP TABLE "news_blocks_cta" CASCADE;
  DROP TABLE "news_blocks_metrics_items" CASCADE;
  DROP TABLE "news_blocks_metrics" CASCADE;
  DROP TABLE "news_blocks_results_stats_items" CASCADE;
  DROP TABLE "news_blocks_results_stats" CASCADE;
  DROP TABLE "news_blocks_stats_cards_items" CASCADE;
  DROP TABLE "news_blocks_stats_cards" CASCADE;
  DROP TABLE "news_blocks_capability_strip_items" CASCADE;
  DROP TABLE "news_blocks_capability_strip" CASCADE;
  DROP TABLE "news_blocks_live_in_days_items" CASCADE;
  DROP TABLE "news_blocks_live_in_days" CASCADE;
  DROP TABLE "news_blocks_faq_items" CASCADE;
  DROP TABLE "news_blocks_faq" CASCADE;
  DROP TABLE "news_blocks_news_insights_collections" CASCADE;
  DROP TABLE "news_blocks_news_insights_cards_tags" CASCADE;
  DROP TABLE "news_blocks_news_insights_cards" CASCADE;
  DROP TABLE "news_blocks_news_insights" CASCADE;
  DROP TABLE "news_blocks_content_feed_collections" CASCADE;
  DROP TABLE "news_blocks_content_feed_cards_tags" CASCADE;
  DROP TABLE "news_blocks_content_feed_cards" CASCADE;
  DROP TABLE "news_blocks_content_feed" CASCADE;
  DROP TABLE "news_blocks_pricing_cards_cards_features" CASCADE;
  DROP TABLE "news_blocks_pricing_cards_cards" CASCADE;
  DROP TABLE "news_blocks_pricing_cards" CASCADE;
  DROP TABLE "news_blocks_pricing_details_sections_headers" CASCADE;
  DROP TABLE "news_blocks_pricing_details_sections_rows_cells" CASCADE;
  DROP TABLE "news_blocks_pricing_details_sections_rows" CASCADE;
  DROP TABLE "news_blocks_pricing_details_sections" CASCADE;
  DROP TABLE "news_blocks_pricing_details" CASCADE;
  DROP TABLE "news_blocks_difference_left_items" CASCADE;
  DROP TABLE "news_blocks_difference_right_items" CASCADE;
  DROP TABLE "news_blocks_difference" CASCADE;
  DROP TABLE "news_blocks_pain_points_comparison_rows" CASCADE;
  DROP TABLE "news_blocks_pain_points_comparison" CASCADE;
  DROP TABLE "news_blocks_pricing_policy_callouts" CASCADE;
  DROP TABLE "news_blocks_pricing_policy" CASCADE;
  DROP TABLE "news_blocks_industry_expertise_items" CASCADE;
  DROP TABLE "news_blocks_industry_expertise_info_cards" CASCADE;
  DROP TABLE "news_blocks_industry_expertise" CASCADE;
  DROP TABLE "news_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "news_blocks_logo_strip_stats" CASCADE;
  DROP TABLE "news_blocks_logo_strip" CASCADE;
  DROP TABLE "news_blocks_integrations_banner_items" CASCADE;
  DROP TABLE "news_blocks_integrations_banner" CASCADE;
  DROP TABLE "news_blocks_logo_grid_columns_items" CASCADE;
  DROP TABLE "news_blocks_logo_grid_columns" CASCADE;
  DROP TABLE "news_blocks_logo_grid" CASCADE;
  DROP TABLE "news_blocks_tabs_showcase_tabs_steps" CASCADE;
  DROP TABLE "news_blocks_tabs_showcase_tabs" CASCADE;
  DROP TABLE "news_blocks_tabs_showcase" CASCADE;
  DROP TABLE "news_blocks_anchor_nav_items" CASCADE;
  DROP TABLE "news_blocks_anchor_nav" CASCADE;
  DROP TABLE "news_blocks_testimonials_items" CASCADE;
  DROP TABLE "news_blocks_testimonials" CASCADE;
  DROP TABLE "news_blocks_comparison_grid_cards" CASCADE;
  DROP TABLE "news_blocks_comparison_grid" CASCADE;
  DROP TABLE "news_blocks_use_case_flow_columns_items" CASCADE;
  DROP TABLE "news_blocks_use_case_flow_columns" CASCADE;
  DROP TABLE "news_blocks_use_case_flow" CASCADE;
  DROP TABLE "news_article_meta_tags" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "guides_blocks_hero_cards" CASCADE;
  DROP TABLE "guides_blocks_hero" CASCADE;
  DROP TABLE "guides_blocks_hero_extended_cards" CASCADE;
  DROP TABLE "guides_blocks_hero_extended" CASCADE;
  DROP TABLE "guides_blocks_rich_text" CASCADE;
  DROP TABLE "guides_blocks_side_by_side_bullets" CASCADE;
  DROP TABLE "guides_blocks_side_by_side_small_icons" CASCADE;
  DROP TABLE "guides_blocks_side_by_side_bottom_cards_items" CASCADE;
  DROP TABLE "guides_blocks_side_by_side_bottom_cards" CASCADE;
  DROP TABLE "guides_blocks_side_by_side" CASCADE;
  DROP TABLE "guides_blocks_story_cards" CASCADE;
  DROP TABLE "guides_blocks_story" CASCADE;
  DROP TABLE "guides_blocks_media_showcase" CASCADE;
  DROP TABLE "guides_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "guides_blocks_feature_grid" CASCADE;
  DROP TABLE "guides_blocks_agent_capabilities_items" CASCADE;
  DROP TABLE "guides_blocks_agent_capabilities" CASCADE;
  DROP TABLE "guides_blocks_agent_solutions_items" CASCADE;
  DROP TABLE "guides_blocks_agent_solutions" CASCADE;
  DROP TABLE "guides_blocks_contact_us" CASCADE;
  DROP TABLE "guides_blocks_concierge_flow_cards" CASCADE;
  DROP TABLE "guides_blocks_concierge_flow" CASCADE;
  DROP TABLE "guides_blocks_enterprise_upgrade_benefits" CASCADE;
  DROP TABLE "guides_blocks_enterprise_upgrade" CASCADE;
  DROP TABLE "guides_blocks_channels_grid_cards" CASCADE;
  DROP TABLE "guides_blocks_channels_grid" CASCADE;
  DROP TABLE "guides_blocks_feature_stack_cards" CASCADE;
  DROP TABLE "guides_blocks_feature_stack" CASCADE;
  DROP TABLE "guides_blocks_coverage_grid_cards" CASCADE;
  DROP TABLE "guides_blocks_coverage_grid" CASCADE;
  DROP TABLE "guides_blocks_feature_rows_rows" CASCADE;
  DROP TABLE "guides_blocks_feature_rows" CASCADE;
  DROP TABLE "guides_blocks_capability_trio_cards" CASCADE;
  DROP TABLE "guides_blocks_capability_trio" CASCADE;
  DROP TABLE "guides_blocks_capability_tools_cards_logos" CASCADE;
  DROP TABLE "guides_blocks_capability_tools_cards" CASCADE;
  DROP TABLE "guides_blocks_capability_tools" CASCADE;
  DROP TABLE "guides_blocks_use_cases_grid_cards" CASCADE;
  DROP TABLE "guides_blocks_use_cases_grid" CASCADE;
  DROP TABLE "guides_blocks_security_cards" CASCADE;
  DROP TABLE "guides_blocks_security" CASCADE;
  DROP TABLE "guides_blocks_functional_capabilities_cards" CASCADE;
  DROP TABLE "guides_blocks_functional_capabilities" CASCADE;
  DROP TABLE "guides_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "guides_blocks_how_it_works" CASCADE;
  DROP TABLE "guides_blocks_cta" CASCADE;
  DROP TABLE "guides_blocks_metrics_items" CASCADE;
  DROP TABLE "guides_blocks_metrics" CASCADE;
  DROP TABLE "guides_blocks_results_stats_items" CASCADE;
  DROP TABLE "guides_blocks_results_stats" CASCADE;
  DROP TABLE "guides_blocks_stats_cards_items" CASCADE;
  DROP TABLE "guides_blocks_stats_cards" CASCADE;
  DROP TABLE "guides_blocks_capability_strip_items" CASCADE;
  DROP TABLE "guides_blocks_capability_strip" CASCADE;
  DROP TABLE "guides_blocks_live_in_days_items" CASCADE;
  DROP TABLE "guides_blocks_live_in_days" CASCADE;
  DROP TABLE "guides_blocks_faq_items" CASCADE;
  DROP TABLE "guides_blocks_faq" CASCADE;
  DROP TABLE "guides_blocks_news_insights_collections" CASCADE;
  DROP TABLE "guides_blocks_news_insights_cards_tags" CASCADE;
  DROP TABLE "guides_blocks_news_insights_cards" CASCADE;
  DROP TABLE "guides_blocks_news_insights" CASCADE;
  DROP TABLE "guides_blocks_content_feed_collections" CASCADE;
  DROP TABLE "guides_blocks_content_feed_cards_tags" CASCADE;
  DROP TABLE "guides_blocks_content_feed_cards" CASCADE;
  DROP TABLE "guides_blocks_content_feed" CASCADE;
  DROP TABLE "guides_blocks_pricing_cards_cards_features" CASCADE;
  DROP TABLE "guides_blocks_pricing_cards_cards" CASCADE;
  DROP TABLE "guides_blocks_pricing_cards" CASCADE;
  DROP TABLE "guides_blocks_pricing_details_sections_headers" CASCADE;
  DROP TABLE "guides_blocks_pricing_details_sections_rows_cells" CASCADE;
  DROP TABLE "guides_blocks_pricing_details_sections_rows" CASCADE;
  DROP TABLE "guides_blocks_pricing_details_sections" CASCADE;
  DROP TABLE "guides_blocks_pricing_details" CASCADE;
  DROP TABLE "guides_blocks_difference_left_items" CASCADE;
  DROP TABLE "guides_blocks_difference_right_items" CASCADE;
  DROP TABLE "guides_blocks_difference" CASCADE;
  DROP TABLE "guides_blocks_pain_points_comparison_rows" CASCADE;
  DROP TABLE "guides_blocks_pain_points_comparison" CASCADE;
  DROP TABLE "guides_blocks_pricing_policy_callouts" CASCADE;
  DROP TABLE "guides_blocks_pricing_policy" CASCADE;
  DROP TABLE "guides_blocks_industry_expertise_items" CASCADE;
  DROP TABLE "guides_blocks_industry_expertise_info_cards" CASCADE;
  DROP TABLE "guides_blocks_industry_expertise" CASCADE;
  DROP TABLE "guides_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "guides_blocks_logo_strip_stats" CASCADE;
  DROP TABLE "guides_blocks_logo_strip" CASCADE;
  DROP TABLE "guides_blocks_integrations_banner_items" CASCADE;
  DROP TABLE "guides_blocks_integrations_banner" CASCADE;
  DROP TABLE "guides_blocks_logo_grid_columns_items" CASCADE;
  DROP TABLE "guides_blocks_logo_grid_columns" CASCADE;
  DROP TABLE "guides_blocks_logo_grid" CASCADE;
  DROP TABLE "guides_blocks_tabs_showcase_tabs_steps" CASCADE;
  DROP TABLE "guides_blocks_tabs_showcase_tabs" CASCADE;
  DROP TABLE "guides_blocks_tabs_showcase" CASCADE;
  DROP TABLE "guides_blocks_anchor_nav_items" CASCADE;
  DROP TABLE "guides_blocks_anchor_nav" CASCADE;
  DROP TABLE "guides_blocks_testimonials_items" CASCADE;
  DROP TABLE "guides_blocks_testimonials" CASCADE;
  DROP TABLE "guides_blocks_comparison_grid_cards" CASCADE;
  DROP TABLE "guides_blocks_comparison_grid" CASCADE;
  DROP TABLE "guides_blocks_use_case_flow_columns_items" CASCADE;
  DROP TABLE "guides_blocks_use_case_flow_columns" CASCADE;
  DROP TABLE "guides_blocks_use_case_flow" CASCADE;
  DROP TABLE "guides_article_meta_tags" CASCADE;
  DROP TABLE "guides" CASCADE;
  DROP TABLE "tips_tip_card_icons" CASCADE;
  DROP TABLE "tips_blocks_hero_cards" CASCADE;
  DROP TABLE "tips_blocks_hero" CASCADE;
  DROP TABLE "tips_blocks_hero_extended_cards" CASCADE;
  DROP TABLE "tips_blocks_hero_extended" CASCADE;
  DROP TABLE "tips_blocks_rich_text" CASCADE;
  DROP TABLE "tips_blocks_side_by_side_bullets" CASCADE;
  DROP TABLE "tips_blocks_side_by_side_small_icons" CASCADE;
  DROP TABLE "tips_blocks_side_by_side_bottom_cards_items" CASCADE;
  DROP TABLE "tips_blocks_side_by_side_bottom_cards" CASCADE;
  DROP TABLE "tips_blocks_side_by_side" CASCADE;
  DROP TABLE "tips_blocks_story_cards" CASCADE;
  DROP TABLE "tips_blocks_story" CASCADE;
  DROP TABLE "tips_blocks_media_showcase" CASCADE;
  DROP TABLE "tips_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "tips_blocks_feature_grid" CASCADE;
  DROP TABLE "tips_blocks_agent_capabilities_items" CASCADE;
  DROP TABLE "tips_blocks_agent_capabilities" CASCADE;
  DROP TABLE "tips_blocks_agent_solutions_items" CASCADE;
  DROP TABLE "tips_blocks_agent_solutions" CASCADE;
  DROP TABLE "tips_blocks_contact_us" CASCADE;
  DROP TABLE "tips_blocks_concierge_flow_cards" CASCADE;
  DROP TABLE "tips_blocks_concierge_flow" CASCADE;
  DROP TABLE "tips_blocks_enterprise_upgrade_benefits" CASCADE;
  DROP TABLE "tips_blocks_enterprise_upgrade" CASCADE;
  DROP TABLE "tips_blocks_channels_grid_cards" CASCADE;
  DROP TABLE "tips_blocks_channels_grid" CASCADE;
  DROP TABLE "tips_blocks_feature_stack_cards" CASCADE;
  DROP TABLE "tips_blocks_feature_stack" CASCADE;
  DROP TABLE "tips_blocks_coverage_grid_cards" CASCADE;
  DROP TABLE "tips_blocks_coverage_grid" CASCADE;
  DROP TABLE "tips_blocks_feature_rows_rows" CASCADE;
  DROP TABLE "tips_blocks_feature_rows" CASCADE;
  DROP TABLE "tips_blocks_capability_trio_cards" CASCADE;
  DROP TABLE "tips_blocks_capability_trio" CASCADE;
  DROP TABLE "tips_blocks_capability_tools_cards_logos" CASCADE;
  DROP TABLE "tips_blocks_capability_tools_cards" CASCADE;
  DROP TABLE "tips_blocks_capability_tools" CASCADE;
  DROP TABLE "tips_blocks_use_cases_grid_cards" CASCADE;
  DROP TABLE "tips_blocks_use_cases_grid" CASCADE;
  DROP TABLE "tips_blocks_security_cards" CASCADE;
  DROP TABLE "tips_blocks_security" CASCADE;
  DROP TABLE "tips_blocks_functional_capabilities_cards" CASCADE;
  DROP TABLE "tips_blocks_functional_capabilities" CASCADE;
  DROP TABLE "tips_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "tips_blocks_how_it_works" CASCADE;
  DROP TABLE "tips_blocks_cta" CASCADE;
  DROP TABLE "tips_blocks_metrics_items" CASCADE;
  DROP TABLE "tips_blocks_metrics" CASCADE;
  DROP TABLE "tips_blocks_results_stats_items" CASCADE;
  DROP TABLE "tips_blocks_results_stats" CASCADE;
  DROP TABLE "tips_blocks_stats_cards_items" CASCADE;
  DROP TABLE "tips_blocks_stats_cards" CASCADE;
  DROP TABLE "tips_blocks_capability_strip_items" CASCADE;
  DROP TABLE "tips_blocks_capability_strip" CASCADE;
  DROP TABLE "tips_blocks_live_in_days_items" CASCADE;
  DROP TABLE "tips_blocks_live_in_days" CASCADE;
  DROP TABLE "tips_blocks_faq_items" CASCADE;
  DROP TABLE "tips_blocks_faq" CASCADE;
  DROP TABLE "tips_blocks_news_insights_collections" CASCADE;
  DROP TABLE "tips_blocks_news_insights_cards_tags" CASCADE;
  DROP TABLE "tips_blocks_news_insights_cards" CASCADE;
  DROP TABLE "tips_blocks_news_insights" CASCADE;
  DROP TABLE "tips_blocks_content_feed_collections" CASCADE;
  DROP TABLE "tips_blocks_content_feed_cards_tags" CASCADE;
  DROP TABLE "tips_blocks_content_feed_cards" CASCADE;
  DROP TABLE "tips_blocks_content_feed" CASCADE;
  DROP TABLE "tips_blocks_pricing_cards_cards_features" CASCADE;
  DROP TABLE "tips_blocks_pricing_cards_cards" CASCADE;
  DROP TABLE "tips_blocks_pricing_cards" CASCADE;
  DROP TABLE "tips_blocks_pricing_details_sections_headers" CASCADE;
  DROP TABLE "tips_blocks_pricing_details_sections_rows_cells" CASCADE;
  DROP TABLE "tips_blocks_pricing_details_sections_rows" CASCADE;
  DROP TABLE "tips_blocks_pricing_details_sections" CASCADE;
  DROP TABLE "tips_blocks_pricing_details" CASCADE;
  DROP TABLE "tips_blocks_difference_left_items" CASCADE;
  DROP TABLE "tips_blocks_difference_right_items" CASCADE;
  DROP TABLE "tips_blocks_difference" CASCADE;
  DROP TABLE "tips_blocks_pain_points_comparison_rows" CASCADE;
  DROP TABLE "tips_blocks_pain_points_comparison" CASCADE;
  DROP TABLE "tips_blocks_pricing_policy_callouts" CASCADE;
  DROP TABLE "tips_blocks_pricing_policy" CASCADE;
  DROP TABLE "tips_blocks_industry_expertise_items" CASCADE;
  DROP TABLE "tips_blocks_industry_expertise_info_cards" CASCADE;
  DROP TABLE "tips_blocks_industry_expertise" CASCADE;
  DROP TABLE "tips_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "tips_blocks_logo_strip_stats" CASCADE;
  DROP TABLE "tips_blocks_logo_strip" CASCADE;
  DROP TABLE "tips_blocks_integrations_banner_items" CASCADE;
  DROP TABLE "tips_blocks_integrations_banner" CASCADE;
  DROP TABLE "tips_blocks_logo_grid_columns_items" CASCADE;
  DROP TABLE "tips_blocks_logo_grid_columns" CASCADE;
  DROP TABLE "tips_blocks_logo_grid" CASCADE;
  DROP TABLE "tips_blocks_tabs_showcase_tabs_steps" CASCADE;
  DROP TABLE "tips_blocks_tabs_showcase_tabs" CASCADE;
  DROP TABLE "tips_blocks_tabs_showcase" CASCADE;
  DROP TABLE "tips_blocks_anchor_nav_items" CASCADE;
  DROP TABLE "tips_blocks_anchor_nav" CASCADE;
  DROP TABLE "tips_blocks_testimonials_items" CASCADE;
  DROP TABLE "tips_blocks_testimonials" CASCADE;
  DROP TABLE "tips_blocks_comparison_grid_cards" CASCADE;
  DROP TABLE "tips_blocks_comparison_grid" CASCADE;
  DROP TABLE "tips_blocks_use_case_flow_columns_items" CASCADE;
  DROP TABLE "tips_blocks_use_case_flow_columns" CASCADE;
  DROP TABLE "tips_blocks_use_case_flow" CASCADE;
  DROP TABLE "tips" CASCADE;
  DROP TABLE "use_cases_blocks_hero_cards" CASCADE;
  DROP TABLE "use_cases_blocks_hero" CASCADE;
  DROP TABLE "use_cases_blocks_hero_extended_cards" CASCADE;
  DROP TABLE "use_cases_blocks_hero_extended" CASCADE;
  DROP TABLE "use_cases_blocks_rich_text" CASCADE;
  DROP TABLE "use_cases_blocks_side_by_side_bullets" CASCADE;
  DROP TABLE "use_cases_blocks_side_by_side_small_icons" CASCADE;
  DROP TABLE "use_cases_blocks_side_by_side_bottom_cards_items" CASCADE;
  DROP TABLE "use_cases_blocks_side_by_side_bottom_cards" CASCADE;
  DROP TABLE "use_cases_blocks_side_by_side" CASCADE;
  DROP TABLE "use_cases_blocks_story_cards" CASCADE;
  DROP TABLE "use_cases_blocks_story" CASCADE;
  DROP TABLE "use_cases_blocks_media_showcase" CASCADE;
  DROP TABLE "use_cases_blocks_feature_grid_cards" CASCADE;
  DROP TABLE "use_cases_blocks_feature_grid" CASCADE;
  DROP TABLE "use_cases_blocks_agent_capabilities_items" CASCADE;
  DROP TABLE "use_cases_blocks_agent_capabilities" CASCADE;
  DROP TABLE "use_cases_blocks_agent_solutions_items" CASCADE;
  DROP TABLE "use_cases_blocks_agent_solutions" CASCADE;
  DROP TABLE "use_cases_blocks_contact_us" CASCADE;
  DROP TABLE "use_cases_blocks_concierge_flow_cards" CASCADE;
  DROP TABLE "use_cases_blocks_concierge_flow" CASCADE;
  DROP TABLE "use_cases_blocks_enterprise_upgrade_benefits" CASCADE;
  DROP TABLE "use_cases_blocks_enterprise_upgrade" CASCADE;
  DROP TABLE "use_cases_blocks_channels_grid_cards" CASCADE;
  DROP TABLE "use_cases_blocks_channels_grid" CASCADE;
  DROP TABLE "use_cases_blocks_feature_stack_cards" CASCADE;
  DROP TABLE "use_cases_blocks_feature_stack" CASCADE;
  DROP TABLE "use_cases_blocks_coverage_grid_cards" CASCADE;
  DROP TABLE "use_cases_blocks_coverage_grid" CASCADE;
  DROP TABLE "use_cases_blocks_feature_rows_rows" CASCADE;
  DROP TABLE "use_cases_blocks_feature_rows" CASCADE;
  DROP TABLE "use_cases_blocks_capability_trio_cards" CASCADE;
  DROP TABLE "use_cases_blocks_capability_trio" CASCADE;
  DROP TABLE "use_cases_blocks_capability_tools_cards_logos" CASCADE;
  DROP TABLE "use_cases_blocks_capability_tools_cards" CASCADE;
  DROP TABLE "use_cases_blocks_capability_tools" CASCADE;
  DROP TABLE "use_cases_blocks_use_cases_grid_cards" CASCADE;
  DROP TABLE "use_cases_blocks_use_cases_grid" CASCADE;
  DROP TABLE "use_cases_blocks_security_cards" CASCADE;
  DROP TABLE "use_cases_blocks_security" CASCADE;
  DROP TABLE "use_cases_blocks_functional_capabilities_cards" CASCADE;
  DROP TABLE "use_cases_blocks_functional_capabilities" CASCADE;
  DROP TABLE "use_cases_blocks_how_it_works_steps" CASCADE;
  DROP TABLE "use_cases_blocks_how_it_works" CASCADE;
  DROP TABLE "use_cases_blocks_cta" CASCADE;
  DROP TABLE "use_cases_blocks_metrics_items" CASCADE;
  DROP TABLE "use_cases_blocks_metrics" CASCADE;
  DROP TABLE "use_cases_blocks_results_stats_items" CASCADE;
  DROP TABLE "use_cases_blocks_results_stats" CASCADE;
  DROP TABLE "use_cases_blocks_stats_cards_items" CASCADE;
  DROP TABLE "use_cases_blocks_stats_cards" CASCADE;
  DROP TABLE "use_cases_blocks_capability_strip_items" CASCADE;
  DROP TABLE "use_cases_blocks_capability_strip" CASCADE;
  DROP TABLE "use_cases_blocks_live_in_days_items" CASCADE;
  DROP TABLE "use_cases_blocks_live_in_days" CASCADE;
  DROP TABLE "use_cases_blocks_faq_items" CASCADE;
  DROP TABLE "use_cases_blocks_faq" CASCADE;
  DROP TABLE "use_cases_blocks_news_insights_collections" CASCADE;
  DROP TABLE "use_cases_blocks_news_insights_cards_tags" CASCADE;
  DROP TABLE "use_cases_blocks_news_insights_cards" CASCADE;
  DROP TABLE "use_cases_blocks_news_insights" CASCADE;
  DROP TABLE "use_cases_blocks_content_feed_collections" CASCADE;
  DROP TABLE "use_cases_blocks_content_feed_cards_tags" CASCADE;
  DROP TABLE "use_cases_blocks_content_feed_cards" CASCADE;
  DROP TABLE "use_cases_blocks_content_feed" CASCADE;
  DROP TABLE "use_cases_blocks_pricing_cards_cards_features" CASCADE;
  DROP TABLE "use_cases_blocks_pricing_cards_cards" CASCADE;
  DROP TABLE "use_cases_blocks_pricing_cards" CASCADE;
  DROP TABLE "use_cases_blocks_pricing_details_sections_headers" CASCADE;
  DROP TABLE "use_cases_blocks_pricing_details_sections_rows_cells" CASCADE;
  DROP TABLE "use_cases_blocks_pricing_details_sections_rows" CASCADE;
  DROP TABLE "use_cases_blocks_pricing_details_sections" CASCADE;
  DROP TABLE "use_cases_blocks_pricing_details" CASCADE;
  DROP TABLE "use_cases_blocks_difference_left_items" CASCADE;
  DROP TABLE "use_cases_blocks_difference_right_items" CASCADE;
  DROP TABLE "use_cases_blocks_difference" CASCADE;
  DROP TABLE "use_cases_blocks_pain_points_comparison_rows" CASCADE;
  DROP TABLE "use_cases_blocks_pain_points_comparison" CASCADE;
  DROP TABLE "use_cases_blocks_pricing_policy_callouts" CASCADE;
  DROP TABLE "use_cases_blocks_pricing_policy" CASCADE;
  DROP TABLE "use_cases_blocks_industry_expertise_items" CASCADE;
  DROP TABLE "use_cases_blocks_industry_expertise_info_cards" CASCADE;
  DROP TABLE "use_cases_blocks_industry_expertise" CASCADE;
  DROP TABLE "use_cases_blocks_logo_strip_logos" CASCADE;
  DROP TABLE "use_cases_blocks_logo_strip_stats" CASCADE;
  DROP TABLE "use_cases_blocks_logo_strip" CASCADE;
  DROP TABLE "use_cases_blocks_integrations_banner_items" CASCADE;
  DROP TABLE "use_cases_blocks_integrations_banner" CASCADE;
  DROP TABLE "use_cases_blocks_logo_grid_columns_items" CASCADE;
  DROP TABLE "use_cases_blocks_logo_grid_columns" CASCADE;
  DROP TABLE "use_cases_blocks_logo_grid" CASCADE;
  DROP TABLE "use_cases_blocks_tabs_showcase_tabs_steps" CASCADE;
  DROP TABLE "use_cases_blocks_tabs_showcase_tabs" CASCADE;
  DROP TABLE "use_cases_blocks_tabs_showcase" CASCADE;
  DROP TABLE "use_cases_blocks_anchor_nav_items" CASCADE;
  DROP TABLE "use_cases_blocks_anchor_nav" CASCADE;
  DROP TABLE "use_cases_blocks_testimonials_items" CASCADE;
  DROP TABLE "use_cases_blocks_testimonials" CASCADE;
  DROP TABLE "use_cases_blocks_comparison_grid_cards" CASCADE;
  DROP TABLE "use_cases_blocks_comparison_grid" CASCADE;
  DROP TABLE "use_cases_blocks_use_case_flow_columns_items" CASCADE;
  DROP TABLE "use_cases_blocks_use_case_flow_columns" CASCADE;
  DROP TABLE "use_cases_blocks_use_case_flow" CASCADE;
  DROP TABLE "use_cases" CASCADE;
  DROP TABLE "forms_fields_options" CASCADE;
  DROP TABLE "forms_fields" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_functions" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "faq_items" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "payload_mcp_api_keys" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_primary_navigation_items" CASCADE;
  DROP TABLE "site_settings_primary_navigation" CASCADE;
  DROP TABLE "site_settings_footer_navigation" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_background";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_primary_action_target";
  DROP TYPE "public"."enum_pages_blocks_hero_secondary_action_target";
  DROP TYPE "public"."enum_pages_blocks_hero_media_size";
  DROP TYPE "public"."enum_pages_blocks_hero_extended_background";
  DROP TYPE "public"."enum_pages_blocks_hero_extended_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_extended_media_size";
  DROP TYPE "public"."enum_pages_blocks_hero_extended_primary_action_target";
  DROP TYPE "public"."enum_pages_blocks_hero_extended_secondary_action_target";
  DROP TYPE "public"."enum_pages_blocks_rich_text_background";
  DROP TYPE "public"."enum_pages_blocks_side_by_side_media_side";
  DROP TYPE "public"."enum_pages_blocks_side_by_side_image_side";
  DROP TYPE "public"."enum_pages_blocks_side_by_side_background";
  DROP TYPE "public"."enum_pages_blocks_side_by_side_primary_action_target";
  DROP TYPE "public"."enum_pages_blocks_side_by_side_secondary_action_target";
  DROP TYPE "public"."enum_pages_blocks_story_background";
  DROP TYPE "public"."enum_pages_blocks_media_showcase_background";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_background";
  DROP TYPE "public"."enum_pages_blocks_agent_capabilities_items_link_target";
  DROP TYPE "public"."enum_pages_blocks_agent_capabilities_background";
  DROP TYPE "public"."enum_pages_blocks_agent_capabilities_content_side";
  DROP TYPE "public"."enum_pages_blocks_agent_solutions_items_icon";
  DROP TYPE "public"."enum_pages_blocks_agent_solutions_background";
  DROP TYPE "public"."enum_pages_blocks_contact_us_background";
  DROP TYPE "public"."enum_pages_blocks_concierge_flow_background";
  DROP TYPE "public"."enum_pages_blocks_concierge_flow_button_target";
  DROP TYPE "public"."enum_pages_blocks_enterprise_upgrade_background";
  DROP TYPE "public"."enum_pages_blocks_channels_grid_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_channels_grid_background";
  DROP TYPE "public"."enum_pages_blocks_feature_stack_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_feature_stack_background";
  DROP TYPE "public"."enum_pages_blocks_coverage_grid_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_coverage_grid_background";
  DROP TYPE "public"."enum_pages_blocks_feature_rows_background";
  DROP TYPE "public"."enum_pages_blocks_feature_rows_variant";
  DROP TYPE "public"."enum_pages_blocks_capability_trio_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_capability_trio_background";
  DROP TYPE "public"."enum_pages_blocks_capability_tools_background";
  DROP TYPE "public"."enum_pages_blocks_use_cases_grid_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_use_cases_grid_background";
  DROP TYPE "public"."enum_pages_blocks_security_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_security_background";
  DROP TYPE "public"."enum_pages_blocks_functional_capabilities_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_functional_capabilities_cards_width";
  DROP TYPE "public"."enum_pages_blocks_functional_capabilities_background";
  DROP TYPE "public"."enum_pages_blocks_functional_capabilities_preset";
  DROP TYPE "public"."enum_pages_blocks_how_it_works_background";
  DROP TYPE "public"."enum_pages_blocks_how_it_works_button_target";
  DROP TYPE "public"."enum_pages_blocks_cta_background";
  DROP TYPE "public"."enum_pages_blocks_cta_primary_action_target";
  DROP TYPE "public"."enum_pages_blocks_cta_secondary_action_target";
  DROP TYPE "public"."enum_pages_blocks_metrics_background";
  DROP TYPE "public"."enum_pages_blocks_results_stats_items_link_target";
  DROP TYPE "public"."enum_pages_blocks_results_stats_background";
  DROP TYPE "public"."enum_pages_blocks_stats_cards_background";
  DROP TYPE "public"."enum_pages_blocks_capability_strip_background";
  DROP TYPE "public"."enum_pages_blocks_live_in_days_items_icon";
  DROP TYPE "public"."enum_pages_blocks_live_in_days_background";
  DROP TYPE "public"."enum_pages_blocks_faq_background";
  DROP TYPE "public"."enum_pages_blocks_news_insights_collections";
  DROP TYPE "public"."enum_pages_blocks_news_insights_background";
  DROP TYPE "public"."enum_pages_blocks_news_insights_mode";
  DROP TYPE "public"."enum_pages_blocks_content_feed_collections";
  DROP TYPE "public"."enum_pages_blocks_content_feed_background";
  DROP TYPE "public"."enum_pages_blocks_content_feed_mode";
  DROP TYPE "public"."enum_pages_blocks_pricing_cards_cards_accent";
  DROP TYPE "public"."enum_pages_blocks_pricing_cards_cards_button_target";
  DROP TYPE "public"."enum_pages_blocks_pricing_cards_background";
  DROP TYPE "public"."enum_pages_blocks_pricing_details_sections_background";
  DROP TYPE "public"."enum_pages_blocks_pricing_details_sections_variant";
  DROP TYPE "public"."enum_pages_blocks_pricing_details_background";
  DROP TYPE "public"."enum_pages_blocks_difference_background";
  DROP TYPE "public"."enum_pages_blocks_difference_action_target";
  DROP TYPE "public"."enum_pages_blocks_pain_points_comparison_background";
  DROP TYPE "public"."enum_pages_blocks_pain_points_comparison_action_target";
  DROP TYPE "public"."enum_pages_blocks_pricing_policy_callouts_icon";
  DROP TYPE "public"."enum_pages_blocks_pricing_policy_background";
  DROP TYPE "public"."enum_pages_blocks_industry_expertise_items_icon";
  DROP TYPE "public"."enum_pages_blocks_industry_expertise_background";
  DROP TYPE "public"."enum_pages_blocks_industry_expertise_visual_type";
  DROP TYPE "public"."enum_pages_blocks_industry_expertise_button_target";
  DROP TYPE "public"."enum_pages_blocks_logo_strip_background";
  DROP TYPE "public"."enum_pages_blocks_integrations_banner_background";
  DROP TYPE "public"."enum_pages_blocks_logo_grid_background";
  DROP TYPE "public"."enum_pages_blocks_tabs_showcase_background";
  DROP TYPE "public"."enum_pages_blocks_anchor_nav_background";
  DROP TYPE "public"."enum_pages_blocks_testimonials_background";
  DROP TYPE "public"."enum_pages_blocks_comparison_grid_cards_action_target";
  DROP TYPE "public"."enum_pages_blocks_comparison_grid_background";
  DROP TYPE "public"."enum_pages_blocks_use_case_flow_background";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum_pages_template";
  DROP TYPE "public"."enum_posts_blocks_hero_background";
  DROP TYPE "public"."enum_posts_blocks_hero_variant";
  DROP TYPE "public"."enum_posts_blocks_hero_primary_action_target";
  DROP TYPE "public"."enum_posts_blocks_hero_secondary_action_target";
  DROP TYPE "public"."enum_posts_blocks_hero_media_size";
  DROP TYPE "public"."enum_posts_blocks_hero_extended_background";
  DROP TYPE "public"."enum_posts_blocks_hero_extended_variant";
  DROP TYPE "public"."enum_posts_blocks_hero_extended_media_size";
  DROP TYPE "public"."enum_posts_blocks_hero_extended_primary_action_target";
  DROP TYPE "public"."enum_posts_blocks_hero_extended_secondary_action_target";
  DROP TYPE "public"."enum_posts_blocks_rich_text_background";
  DROP TYPE "public"."enum_posts_blocks_side_by_side_media_side";
  DROP TYPE "public"."enum_posts_blocks_side_by_side_image_side";
  DROP TYPE "public"."enum_posts_blocks_side_by_side_background";
  DROP TYPE "public"."enum_posts_blocks_side_by_side_primary_action_target";
  DROP TYPE "public"."enum_posts_blocks_side_by_side_secondary_action_target";
  DROP TYPE "public"."enum_posts_blocks_story_background";
  DROP TYPE "public"."enum_posts_blocks_media_showcase_background";
  DROP TYPE "public"."enum_posts_blocks_feature_grid_background";
  DROP TYPE "public"."enum_posts_blocks_agent_capabilities_items_link_target";
  DROP TYPE "public"."enum_posts_blocks_agent_capabilities_background";
  DROP TYPE "public"."enum_posts_blocks_agent_capabilities_content_side";
  DROP TYPE "public"."enum_posts_blocks_agent_solutions_items_icon";
  DROP TYPE "public"."enum_posts_blocks_agent_solutions_background";
  DROP TYPE "public"."enum_posts_blocks_contact_us_background";
  DROP TYPE "public"."enum_posts_blocks_concierge_flow_background";
  DROP TYPE "public"."enum_posts_blocks_concierge_flow_button_target";
  DROP TYPE "public"."enum_posts_blocks_enterprise_upgrade_background";
  DROP TYPE "public"."enum_posts_blocks_channels_grid_cards_icon";
  DROP TYPE "public"."enum_posts_blocks_channels_grid_background";
  DROP TYPE "public"."enum_posts_blocks_feature_stack_cards_icon";
  DROP TYPE "public"."enum_posts_blocks_feature_stack_background";
  DROP TYPE "public"."enum_posts_blocks_coverage_grid_cards_icon";
  DROP TYPE "public"."enum_posts_blocks_coverage_grid_background";
  DROP TYPE "public"."enum_posts_blocks_feature_rows_background";
  DROP TYPE "public"."enum_posts_blocks_feature_rows_variant";
  DROP TYPE "public"."enum_posts_blocks_capability_trio_cards_icon";
  DROP TYPE "public"."enum_posts_blocks_capability_trio_background";
  DROP TYPE "public"."enum_posts_blocks_capability_tools_background";
  DROP TYPE "public"."enum_posts_blocks_use_cases_grid_cards_icon";
  DROP TYPE "public"."enum_posts_blocks_use_cases_grid_background";
  DROP TYPE "public"."enum_posts_blocks_security_cards_icon";
  DROP TYPE "public"."enum_posts_blocks_security_background";
  DROP TYPE "public"."enum_posts_blocks_functional_capabilities_cards_icon";
  DROP TYPE "public"."enum_posts_blocks_functional_capabilities_cards_width";
  DROP TYPE "public"."enum_posts_blocks_functional_capabilities_background";
  DROP TYPE "public"."enum_posts_blocks_functional_capabilities_preset";
  DROP TYPE "public"."enum_posts_blocks_how_it_works_background";
  DROP TYPE "public"."enum_posts_blocks_how_it_works_button_target";
  DROP TYPE "public"."enum_posts_blocks_cta_background";
  DROP TYPE "public"."enum_posts_blocks_cta_primary_action_target";
  DROP TYPE "public"."enum_posts_blocks_cta_secondary_action_target";
  DROP TYPE "public"."enum_posts_blocks_metrics_background";
  DROP TYPE "public"."enum_posts_blocks_results_stats_items_link_target";
  DROP TYPE "public"."enum_posts_blocks_results_stats_background";
  DROP TYPE "public"."enum_posts_blocks_stats_cards_background";
  DROP TYPE "public"."enum_posts_blocks_capability_strip_background";
  DROP TYPE "public"."enum_posts_blocks_live_in_days_items_icon";
  DROP TYPE "public"."enum_posts_blocks_live_in_days_background";
  DROP TYPE "public"."enum_posts_blocks_faq_background";
  DROP TYPE "public"."enum_posts_blocks_news_insights_collections";
  DROP TYPE "public"."enum_posts_blocks_news_insights_background";
  DROP TYPE "public"."enum_posts_blocks_news_insights_mode";
  DROP TYPE "public"."enum_posts_blocks_content_feed_collections";
  DROP TYPE "public"."enum_posts_blocks_content_feed_background";
  DROP TYPE "public"."enum_posts_blocks_content_feed_mode";
  DROP TYPE "public"."enum_posts_blocks_pricing_cards_cards_accent";
  DROP TYPE "public"."enum_posts_blocks_pricing_cards_cards_button_target";
  DROP TYPE "public"."enum_posts_blocks_pricing_cards_background";
  DROP TYPE "public"."enum_posts_blocks_pricing_details_sections_background";
  DROP TYPE "public"."enum_posts_blocks_pricing_details_sections_variant";
  DROP TYPE "public"."enum_posts_blocks_pricing_details_background";
  DROP TYPE "public"."enum_posts_blocks_difference_background";
  DROP TYPE "public"."enum_posts_blocks_difference_action_target";
  DROP TYPE "public"."enum_posts_blocks_pain_points_comparison_background";
  DROP TYPE "public"."enum_posts_blocks_pain_points_comparison_action_target";
  DROP TYPE "public"."enum_posts_blocks_pricing_policy_callouts_icon";
  DROP TYPE "public"."enum_posts_blocks_pricing_policy_background";
  DROP TYPE "public"."enum_posts_blocks_industry_expertise_items_icon";
  DROP TYPE "public"."enum_posts_blocks_industry_expertise_background";
  DROP TYPE "public"."enum_posts_blocks_industry_expertise_visual_type";
  DROP TYPE "public"."enum_posts_blocks_industry_expertise_button_target";
  DROP TYPE "public"."enum_posts_blocks_logo_strip_background";
  DROP TYPE "public"."enum_posts_blocks_integrations_banner_background";
  DROP TYPE "public"."enum_posts_blocks_logo_grid_background";
  DROP TYPE "public"."enum_posts_blocks_tabs_showcase_background";
  DROP TYPE "public"."enum_posts_blocks_anchor_nav_background";
  DROP TYPE "public"."enum_posts_blocks_testimonials_background";
  DROP TYPE "public"."enum_posts_blocks_comparison_grid_cards_action_target";
  DROP TYPE "public"."enum_posts_blocks_comparison_grid_background";
  DROP TYPE "public"."enum_posts_blocks_use_case_flow_background";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum_posts_template";
  DROP TYPE "public"."enum_news_blocks_hero_background";
  DROP TYPE "public"."enum_news_blocks_hero_variant";
  DROP TYPE "public"."enum_news_blocks_hero_primary_action_target";
  DROP TYPE "public"."enum_news_blocks_hero_secondary_action_target";
  DROP TYPE "public"."enum_news_blocks_hero_media_size";
  DROP TYPE "public"."enum_news_blocks_hero_extended_background";
  DROP TYPE "public"."enum_news_blocks_hero_extended_variant";
  DROP TYPE "public"."enum_news_blocks_hero_extended_media_size";
  DROP TYPE "public"."enum_news_blocks_hero_extended_primary_action_target";
  DROP TYPE "public"."enum_news_blocks_hero_extended_secondary_action_target";
  DROP TYPE "public"."enum_news_blocks_rich_text_background";
  DROP TYPE "public"."enum_news_blocks_side_by_side_media_side";
  DROP TYPE "public"."enum_news_blocks_side_by_side_image_side";
  DROP TYPE "public"."enum_news_blocks_side_by_side_background";
  DROP TYPE "public"."enum_news_blocks_side_by_side_primary_action_target";
  DROP TYPE "public"."enum_news_blocks_side_by_side_secondary_action_target";
  DROP TYPE "public"."enum_news_blocks_story_background";
  DROP TYPE "public"."enum_news_blocks_media_showcase_background";
  DROP TYPE "public"."enum_news_blocks_feature_grid_background";
  DROP TYPE "public"."enum_news_blocks_agent_capabilities_items_link_target";
  DROP TYPE "public"."enum_news_blocks_agent_capabilities_background";
  DROP TYPE "public"."enum_news_blocks_agent_capabilities_content_side";
  DROP TYPE "public"."enum_news_blocks_agent_solutions_items_icon";
  DROP TYPE "public"."enum_news_blocks_agent_solutions_background";
  DROP TYPE "public"."enum_news_blocks_contact_us_background";
  DROP TYPE "public"."enum_news_blocks_concierge_flow_background";
  DROP TYPE "public"."enum_news_blocks_concierge_flow_button_target";
  DROP TYPE "public"."enum_news_blocks_enterprise_upgrade_background";
  DROP TYPE "public"."enum_news_blocks_channels_grid_cards_icon";
  DROP TYPE "public"."enum_news_blocks_channels_grid_background";
  DROP TYPE "public"."enum_news_blocks_feature_stack_cards_icon";
  DROP TYPE "public"."enum_news_blocks_feature_stack_background";
  DROP TYPE "public"."enum_news_blocks_coverage_grid_cards_icon";
  DROP TYPE "public"."enum_news_blocks_coverage_grid_background";
  DROP TYPE "public"."enum_news_blocks_feature_rows_background";
  DROP TYPE "public"."enum_news_blocks_feature_rows_variant";
  DROP TYPE "public"."enum_news_blocks_capability_trio_cards_icon";
  DROP TYPE "public"."enum_news_blocks_capability_trio_background";
  DROP TYPE "public"."enum_news_blocks_capability_tools_background";
  DROP TYPE "public"."enum_news_blocks_use_cases_grid_cards_icon";
  DROP TYPE "public"."enum_news_blocks_use_cases_grid_background";
  DROP TYPE "public"."enum_news_blocks_security_cards_icon";
  DROP TYPE "public"."enum_news_blocks_security_background";
  DROP TYPE "public"."enum_news_blocks_functional_capabilities_cards_icon";
  DROP TYPE "public"."enum_news_blocks_functional_capabilities_cards_width";
  DROP TYPE "public"."enum_news_blocks_functional_capabilities_background";
  DROP TYPE "public"."enum_news_blocks_functional_capabilities_preset";
  DROP TYPE "public"."enum_news_blocks_how_it_works_background";
  DROP TYPE "public"."enum_news_blocks_how_it_works_button_target";
  DROP TYPE "public"."enum_news_blocks_cta_background";
  DROP TYPE "public"."enum_news_blocks_cta_primary_action_target";
  DROP TYPE "public"."enum_news_blocks_cta_secondary_action_target";
  DROP TYPE "public"."enum_news_blocks_metrics_background";
  DROP TYPE "public"."enum_news_blocks_results_stats_items_link_target";
  DROP TYPE "public"."enum_news_blocks_results_stats_background";
  DROP TYPE "public"."enum_news_blocks_stats_cards_background";
  DROP TYPE "public"."enum_news_blocks_capability_strip_background";
  DROP TYPE "public"."enum_news_blocks_live_in_days_items_icon";
  DROP TYPE "public"."enum_news_blocks_live_in_days_background";
  DROP TYPE "public"."enum_news_blocks_faq_background";
  DROP TYPE "public"."enum_news_blocks_news_insights_collections";
  DROP TYPE "public"."enum_news_blocks_news_insights_background";
  DROP TYPE "public"."enum_news_blocks_news_insights_mode";
  DROP TYPE "public"."enum_news_blocks_content_feed_collections";
  DROP TYPE "public"."enum_news_blocks_content_feed_background";
  DROP TYPE "public"."enum_news_blocks_content_feed_mode";
  DROP TYPE "public"."enum_news_blocks_pricing_cards_cards_accent";
  DROP TYPE "public"."enum_news_blocks_pricing_cards_cards_button_target";
  DROP TYPE "public"."enum_news_blocks_pricing_cards_background";
  DROP TYPE "public"."enum_news_blocks_pricing_details_sections_background";
  DROP TYPE "public"."enum_news_blocks_pricing_details_sections_variant";
  DROP TYPE "public"."enum_news_blocks_pricing_details_background";
  DROP TYPE "public"."enum_news_blocks_difference_background";
  DROP TYPE "public"."enum_news_blocks_difference_action_target";
  DROP TYPE "public"."enum_news_blocks_pain_points_comparison_background";
  DROP TYPE "public"."enum_news_blocks_pain_points_comparison_action_target";
  DROP TYPE "public"."enum_news_blocks_pricing_policy_callouts_icon";
  DROP TYPE "public"."enum_news_blocks_pricing_policy_background";
  DROP TYPE "public"."enum_news_blocks_industry_expertise_items_icon";
  DROP TYPE "public"."enum_news_blocks_industry_expertise_background";
  DROP TYPE "public"."enum_news_blocks_industry_expertise_visual_type";
  DROP TYPE "public"."enum_news_blocks_industry_expertise_button_target";
  DROP TYPE "public"."enum_news_blocks_logo_strip_background";
  DROP TYPE "public"."enum_news_blocks_integrations_banner_background";
  DROP TYPE "public"."enum_news_blocks_logo_grid_background";
  DROP TYPE "public"."enum_news_blocks_tabs_showcase_background";
  DROP TYPE "public"."enum_news_blocks_anchor_nav_background";
  DROP TYPE "public"."enum_news_blocks_testimonials_background";
  DROP TYPE "public"."enum_news_blocks_comparison_grid_cards_action_target";
  DROP TYPE "public"."enum_news_blocks_comparison_grid_background";
  DROP TYPE "public"."enum_news_blocks_use_case_flow_background";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum_news_template";
  DROP TYPE "public"."enum_guides_blocks_hero_background";
  DROP TYPE "public"."enum_guides_blocks_hero_variant";
  DROP TYPE "public"."enum_guides_blocks_hero_primary_action_target";
  DROP TYPE "public"."enum_guides_blocks_hero_secondary_action_target";
  DROP TYPE "public"."enum_guides_blocks_hero_media_size";
  DROP TYPE "public"."enum_guides_blocks_hero_extended_background";
  DROP TYPE "public"."enum_guides_blocks_hero_extended_variant";
  DROP TYPE "public"."enum_guides_blocks_hero_extended_media_size";
  DROP TYPE "public"."enum_guides_blocks_hero_extended_primary_action_target";
  DROP TYPE "public"."enum_guides_blocks_hero_extended_secondary_action_target";
  DROP TYPE "public"."enum_guides_blocks_rich_text_background";
  DROP TYPE "public"."enum_guides_blocks_side_by_side_media_side";
  DROP TYPE "public"."enum_guides_blocks_side_by_side_image_side";
  DROP TYPE "public"."enum_guides_blocks_side_by_side_background";
  DROP TYPE "public"."enum_guides_blocks_side_by_side_primary_action_target";
  DROP TYPE "public"."enum_guides_blocks_side_by_side_secondary_action_target";
  DROP TYPE "public"."enum_guides_blocks_story_background";
  DROP TYPE "public"."enum_guides_blocks_media_showcase_background";
  DROP TYPE "public"."enum_guides_blocks_feature_grid_background";
  DROP TYPE "public"."enum_guides_blocks_agent_capabilities_items_link_target";
  DROP TYPE "public"."enum_guides_blocks_agent_capabilities_background";
  DROP TYPE "public"."enum_guides_blocks_agent_capabilities_content_side";
  DROP TYPE "public"."enum_guides_blocks_agent_solutions_items_icon";
  DROP TYPE "public"."enum_guides_blocks_agent_solutions_background";
  DROP TYPE "public"."enum_guides_blocks_contact_us_background";
  DROP TYPE "public"."enum_guides_blocks_concierge_flow_background";
  DROP TYPE "public"."enum_guides_blocks_concierge_flow_button_target";
  DROP TYPE "public"."enum_guides_blocks_enterprise_upgrade_background";
  DROP TYPE "public"."enum_guides_blocks_channels_grid_cards_icon";
  DROP TYPE "public"."enum_guides_blocks_channels_grid_background";
  DROP TYPE "public"."enum_guides_blocks_feature_stack_cards_icon";
  DROP TYPE "public"."enum_guides_blocks_feature_stack_background";
  DROP TYPE "public"."enum_guides_blocks_coverage_grid_cards_icon";
  DROP TYPE "public"."enum_guides_blocks_coverage_grid_background";
  DROP TYPE "public"."enum_guides_blocks_feature_rows_background";
  DROP TYPE "public"."enum_guides_blocks_feature_rows_variant";
  DROP TYPE "public"."enum_guides_blocks_capability_trio_cards_icon";
  DROP TYPE "public"."enum_guides_blocks_capability_trio_background";
  DROP TYPE "public"."enum_guides_blocks_capability_tools_background";
  DROP TYPE "public"."enum_guides_blocks_use_cases_grid_cards_icon";
  DROP TYPE "public"."enum_guides_blocks_use_cases_grid_background";
  DROP TYPE "public"."enum_guides_blocks_security_cards_icon";
  DROP TYPE "public"."enum_guides_blocks_security_background";
  DROP TYPE "public"."enum_guides_blocks_functional_capabilities_cards_icon";
  DROP TYPE "public"."enum_guides_blocks_functional_capabilities_cards_width";
  DROP TYPE "public"."enum_guides_blocks_functional_capabilities_background";
  DROP TYPE "public"."enum_guides_blocks_functional_capabilities_preset";
  DROP TYPE "public"."enum_guides_blocks_how_it_works_background";
  DROP TYPE "public"."enum_guides_blocks_how_it_works_button_target";
  DROP TYPE "public"."enum_guides_blocks_cta_background";
  DROP TYPE "public"."enum_guides_blocks_cta_primary_action_target";
  DROP TYPE "public"."enum_guides_blocks_cta_secondary_action_target";
  DROP TYPE "public"."enum_guides_blocks_metrics_background";
  DROP TYPE "public"."enum_guides_blocks_results_stats_items_link_target";
  DROP TYPE "public"."enum_guides_blocks_results_stats_background";
  DROP TYPE "public"."enum_guides_blocks_stats_cards_background";
  DROP TYPE "public"."enum_guides_blocks_capability_strip_background";
  DROP TYPE "public"."enum_guides_blocks_live_in_days_items_icon";
  DROP TYPE "public"."enum_guides_blocks_live_in_days_background";
  DROP TYPE "public"."enum_guides_blocks_faq_background";
  DROP TYPE "public"."enum_guides_blocks_news_insights_collections";
  DROP TYPE "public"."enum_guides_blocks_news_insights_background";
  DROP TYPE "public"."enum_guides_blocks_news_insights_mode";
  DROP TYPE "public"."enum_guides_blocks_content_feed_collections";
  DROP TYPE "public"."enum_guides_blocks_content_feed_background";
  DROP TYPE "public"."enum_guides_blocks_content_feed_mode";
  DROP TYPE "public"."enum_guides_blocks_pricing_cards_cards_accent";
  DROP TYPE "public"."enum_guides_blocks_pricing_cards_cards_button_target";
  DROP TYPE "public"."enum_guides_blocks_pricing_cards_background";
  DROP TYPE "public"."enum_guides_blocks_pricing_details_sections_background";
  DROP TYPE "public"."enum_guides_blocks_pricing_details_sections_variant";
  DROP TYPE "public"."enum_guides_blocks_pricing_details_background";
  DROP TYPE "public"."enum_guides_blocks_difference_background";
  DROP TYPE "public"."enum_guides_blocks_difference_action_target";
  DROP TYPE "public"."enum_guides_blocks_pain_points_comparison_background";
  DROP TYPE "public"."enum_guides_blocks_pain_points_comparison_action_target";
  DROP TYPE "public"."enum_guides_blocks_pricing_policy_callouts_icon";
  DROP TYPE "public"."enum_guides_blocks_pricing_policy_background";
  DROP TYPE "public"."enum_guides_blocks_industry_expertise_items_icon";
  DROP TYPE "public"."enum_guides_blocks_industry_expertise_background";
  DROP TYPE "public"."enum_guides_blocks_industry_expertise_visual_type";
  DROP TYPE "public"."enum_guides_blocks_industry_expertise_button_target";
  DROP TYPE "public"."enum_guides_blocks_logo_strip_background";
  DROP TYPE "public"."enum_guides_blocks_integrations_banner_background";
  DROP TYPE "public"."enum_guides_blocks_logo_grid_background";
  DROP TYPE "public"."enum_guides_blocks_tabs_showcase_background";
  DROP TYPE "public"."enum_guides_blocks_anchor_nav_background";
  DROP TYPE "public"."enum_guides_blocks_testimonials_background";
  DROP TYPE "public"."enum_guides_blocks_comparison_grid_cards_action_target";
  DROP TYPE "public"."enum_guides_blocks_comparison_grid_background";
  DROP TYPE "public"."enum_guides_blocks_use_case_flow_background";
  DROP TYPE "public"."enum_guides_status";
  DROP TYPE "public"."enum_guides_template";
  DROP TYPE "public"."enum_tips_blocks_hero_background";
  DROP TYPE "public"."enum_tips_blocks_hero_variant";
  DROP TYPE "public"."enum_tips_blocks_hero_primary_action_target";
  DROP TYPE "public"."enum_tips_blocks_hero_secondary_action_target";
  DROP TYPE "public"."enum_tips_blocks_hero_media_size";
  DROP TYPE "public"."enum_tips_blocks_hero_extended_background";
  DROP TYPE "public"."enum_tips_blocks_hero_extended_variant";
  DROP TYPE "public"."enum_tips_blocks_hero_extended_media_size";
  DROP TYPE "public"."enum_tips_blocks_hero_extended_primary_action_target";
  DROP TYPE "public"."enum_tips_blocks_hero_extended_secondary_action_target";
  DROP TYPE "public"."enum_tips_blocks_rich_text_background";
  DROP TYPE "public"."enum_tips_blocks_side_by_side_media_side";
  DROP TYPE "public"."enum_tips_blocks_side_by_side_image_side";
  DROP TYPE "public"."enum_tips_blocks_side_by_side_background";
  DROP TYPE "public"."enum_tips_blocks_side_by_side_primary_action_target";
  DROP TYPE "public"."enum_tips_blocks_side_by_side_secondary_action_target";
  DROP TYPE "public"."enum_tips_blocks_story_background";
  DROP TYPE "public"."enum_tips_blocks_media_showcase_background";
  DROP TYPE "public"."enum_tips_blocks_feature_grid_background";
  DROP TYPE "public"."enum_tips_blocks_agent_capabilities_items_link_target";
  DROP TYPE "public"."enum_tips_blocks_agent_capabilities_background";
  DROP TYPE "public"."enum_tips_blocks_agent_capabilities_content_side";
  DROP TYPE "public"."enum_tips_blocks_agent_solutions_items_icon";
  DROP TYPE "public"."enum_tips_blocks_agent_solutions_background";
  DROP TYPE "public"."enum_tips_blocks_contact_us_background";
  DROP TYPE "public"."enum_tips_blocks_concierge_flow_background";
  DROP TYPE "public"."enum_tips_blocks_concierge_flow_button_target";
  DROP TYPE "public"."enum_tips_blocks_enterprise_upgrade_background";
  DROP TYPE "public"."enum_tips_blocks_channels_grid_cards_icon";
  DROP TYPE "public"."enum_tips_blocks_channels_grid_background";
  DROP TYPE "public"."enum_tips_blocks_feature_stack_cards_icon";
  DROP TYPE "public"."enum_tips_blocks_feature_stack_background";
  DROP TYPE "public"."enum_tips_blocks_coverage_grid_cards_icon";
  DROP TYPE "public"."enum_tips_blocks_coverage_grid_background";
  DROP TYPE "public"."enum_tips_blocks_feature_rows_background";
  DROP TYPE "public"."enum_tips_blocks_feature_rows_variant";
  DROP TYPE "public"."enum_tips_blocks_capability_trio_cards_icon";
  DROP TYPE "public"."enum_tips_blocks_capability_trio_background";
  DROP TYPE "public"."enum_tips_blocks_capability_tools_background";
  DROP TYPE "public"."enum_tips_blocks_use_cases_grid_cards_icon";
  DROP TYPE "public"."enum_tips_blocks_use_cases_grid_background";
  DROP TYPE "public"."enum_tips_blocks_security_cards_icon";
  DROP TYPE "public"."enum_tips_blocks_security_background";
  DROP TYPE "public"."enum_tips_blocks_functional_capabilities_cards_icon";
  DROP TYPE "public"."enum_tips_blocks_functional_capabilities_cards_width";
  DROP TYPE "public"."enum_tips_blocks_functional_capabilities_background";
  DROP TYPE "public"."enum_tips_blocks_functional_capabilities_preset";
  DROP TYPE "public"."enum_tips_blocks_how_it_works_background";
  DROP TYPE "public"."enum_tips_blocks_how_it_works_button_target";
  DROP TYPE "public"."enum_tips_blocks_cta_background";
  DROP TYPE "public"."enum_tips_blocks_cta_primary_action_target";
  DROP TYPE "public"."enum_tips_blocks_cta_secondary_action_target";
  DROP TYPE "public"."enum_tips_blocks_metrics_background";
  DROP TYPE "public"."enum_tips_blocks_results_stats_items_link_target";
  DROP TYPE "public"."enum_tips_blocks_results_stats_background";
  DROP TYPE "public"."enum_tips_blocks_stats_cards_background";
  DROP TYPE "public"."enum_tips_blocks_capability_strip_background";
  DROP TYPE "public"."enum_tips_blocks_live_in_days_items_icon";
  DROP TYPE "public"."enum_tips_blocks_live_in_days_background";
  DROP TYPE "public"."enum_tips_blocks_faq_background";
  DROP TYPE "public"."enum_tips_blocks_news_insights_collections";
  DROP TYPE "public"."enum_tips_blocks_news_insights_background";
  DROP TYPE "public"."enum_tips_blocks_news_insights_mode";
  DROP TYPE "public"."enum_tips_blocks_content_feed_collections";
  DROP TYPE "public"."enum_tips_blocks_content_feed_background";
  DROP TYPE "public"."enum_tips_blocks_content_feed_mode";
  DROP TYPE "public"."enum_tips_blocks_pricing_cards_cards_accent";
  DROP TYPE "public"."enum_tips_blocks_pricing_cards_cards_button_target";
  DROP TYPE "public"."enum_tips_blocks_pricing_cards_background";
  DROP TYPE "public"."enum_tips_blocks_pricing_details_sections_background";
  DROP TYPE "public"."enum_tips_blocks_pricing_details_sections_variant";
  DROP TYPE "public"."enum_tips_blocks_pricing_details_background";
  DROP TYPE "public"."enum_tips_blocks_difference_background";
  DROP TYPE "public"."enum_tips_blocks_difference_action_target";
  DROP TYPE "public"."enum_tips_blocks_pain_points_comparison_background";
  DROP TYPE "public"."enum_tips_blocks_pain_points_comparison_action_target";
  DROP TYPE "public"."enum_tips_blocks_pricing_policy_callouts_icon";
  DROP TYPE "public"."enum_tips_blocks_pricing_policy_background";
  DROP TYPE "public"."enum_tips_blocks_industry_expertise_items_icon";
  DROP TYPE "public"."enum_tips_blocks_industry_expertise_background";
  DROP TYPE "public"."enum_tips_blocks_industry_expertise_visual_type";
  DROP TYPE "public"."enum_tips_blocks_industry_expertise_button_target";
  DROP TYPE "public"."enum_tips_blocks_logo_strip_background";
  DROP TYPE "public"."enum_tips_blocks_integrations_banner_background";
  DROP TYPE "public"."enum_tips_blocks_logo_grid_background";
  DROP TYPE "public"."enum_tips_blocks_tabs_showcase_background";
  DROP TYPE "public"."enum_tips_blocks_anchor_nav_background";
  DROP TYPE "public"."enum_tips_blocks_testimonials_background";
  DROP TYPE "public"."enum_tips_blocks_comparison_grid_cards_action_target";
  DROP TYPE "public"."enum_tips_blocks_comparison_grid_background";
  DROP TYPE "public"."enum_tips_blocks_use_case_flow_background";
  DROP TYPE "public"."enum_tips_status";
  DROP TYPE "public"."enum_tips_template";
  DROP TYPE "public"."enum_use_cases_blocks_hero_background";
  DROP TYPE "public"."enum_use_cases_blocks_hero_variant";
  DROP TYPE "public"."enum_use_cases_blocks_hero_primary_action_target";
  DROP TYPE "public"."enum_use_cases_blocks_hero_secondary_action_target";
  DROP TYPE "public"."enum_use_cases_blocks_hero_media_size";
  DROP TYPE "public"."enum_use_cases_blocks_hero_extended_background";
  DROP TYPE "public"."enum_use_cases_blocks_hero_extended_variant";
  DROP TYPE "public"."enum_use_cases_blocks_hero_extended_media_size";
  DROP TYPE "public"."enum_use_cases_blocks_hero_extended_primary_action_target";
  DROP TYPE "public"."enum_use_cases_blocks_hero_extended_secondary_action_target";
  DROP TYPE "public"."enum_use_cases_blocks_rich_text_background";
  DROP TYPE "public"."enum_use_cases_blocks_side_by_side_media_side";
  DROP TYPE "public"."enum_use_cases_blocks_side_by_side_image_side";
  DROP TYPE "public"."enum_use_cases_blocks_side_by_side_background";
  DROP TYPE "public"."enum_use_cases_blocks_side_by_side_primary_action_target";
  DROP TYPE "public"."enum_use_cases_blocks_side_by_side_secondary_action_target";
  DROP TYPE "public"."enum_use_cases_blocks_story_background";
  DROP TYPE "public"."enum_use_cases_blocks_media_showcase_background";
  DROP TYPE "public"."enum_use_cases_blocks_feature_grid_background";
  DROP TYPE "public"."enum_use_cases_blocks_agent_capabilities_items_link_target";
  DROP TYPE "public"."enum_use_cases_blocks_agent_capabilities_background";
  DROP TYPE "public"."enum_use_cases_blocks_agent_capabilities_content_side";
  DROP TYPE "public"."enum_use_cases_blocks_agent_solutions_items_icon";
  DROP TYPE "public"."enum_use_cases_blocks_agent_solutions_background";
  DROP TYPE "public"."enum_use_cases_blocks_contact_us_background";
  DROP TYPE "public"."enum_use_cases_blocks_concierge_flow_background";
  DROP TYPE "public"."enum_use_cases_blocks_concierge_flow_button_target";
  DROP TYPE "public"."enum_use_cases_blocks_enterprise_upgrade_background";
  DROP TYPE "public"."enum_use_cases_blocks_channels_grid_cards_icon";
  DROP TYPE "public"."enum_use_cases_blocks_channels_grid_background";
  DROP TYPE "public"."enum_use_cases_blocks_feature_stack_cards_icon";
  DROP TYPE "public"."enum_use_cases_blocks_feature_stack_background";
  DROP TYPE "public"."enum_use_cases_blocks_coverage_grid_cards_icon";
  DROP TYPE "public"."enum_use_cases_blocks_coverage_grid_background";
  DROP TYPE "public"."enum_use_cases_blocks_feature_rows_background";
  DROP TYPE "public"."enum_use_cases_blocks_feature_rows_variant";
  DROP TYPE "public"."enum_use_cases_blocks_capability_trio_cards_icon";
  DROP TYPE "public"."enum_use_cases_blocks_capability_trio_background";
  DROP TYPE "public"."enum_use_cases_blocks_capability_tools_background";
  DROP TYPE "public"."enum_use_cases_blocks_use_cases_grid_cards_icon";
  DROP TYPE "public"."enum_use_cases_blocks_use_cases_grid_background";
  DROP TYPE "public"."enum_use_cases_blocks_security_cards_icon";
  DROP TYPE "public"."enum_use_cases_blocks_security_background";
  DROP TYPE "public"."enum_use_cases_blocks_functional_capabilities_cards_icon";
  DROP TYPE "public"."enum_use_cases_blocks_functional_capabilities_cards_width";
  DROP TYPE "public"."enum_use_cases_blocks_functional_capabilities_background";
  DROP TYPE "public"."enum_use_cases_blocks_functional_capabilities_preset";
  DROP TYPE "public"."enum_use_cases_blocks_how_it_works_background";
  DROP TYPE "public"."enum_use_cases_blocks_how_it_works_button_target";
  DROP TYPE "public"."enum_use_cases_blocks_cta_background";
  DROP TYPE "public"."enum_use_cases_blocks_cta_primary_action_target";
  DROP TYPE "public"."enum_use_cases_blocks_cta_secondary_action_target";
  DROP TYPE "public"."enum_use_cases_blocks_metrics_background";
  DROP TYPE "public"."enum_use_cases_blocks_results_stats_items_link_target";
  DROP TYPE "public"."enum_use_cases_blocks_results_stats_background";
  DROP TYPE "public"."enum_use_cases_blocks_stats_cards_background";
  DROP TYPE "public"."enum_use_cases_blocks_capability_strip_background";
  DROP TYPE "public"."enum_use_cases_blocks_live_in_days_items_icon";
  DROP TYPE "public"."enum_use_cases_blocks_live_in_days_background";
  DROP TYPE "public"."enum_use_cases_blocks_faq_background";
  DROP TYPE "public"."enum_use_cases_blocks_news_insights_collections";
  DROP TYPE "public"."enum_use_cases_blocks_news_insights_background";
  DROP TYPE "public"."enum_use_cases_blocks_news_insights_mode";
  DROP TYPE "public"."enum_use_cases_blocks_content_feed_collections";
  DROP TYPE "public"."enum_use_cases_blocks_content_feed_background";
  DROP TYPE "public"."enum_use_cases_blocks_content_feed_mode";
  DROP TYPE "public"."enum_use_cases_blocks_pricing_cards_cards_accent";
  DROP TYPE "public"."enum_use_cases_blocks_pricing_cards_cards_button_target";
  DROP TYPE "public"."enum_use_cases_blocks_pricing_cards_background";
  DROP TYPE "public"."enum_use_cases_blocks_pricing_details_sections_background";
  DROP TYPE "public"."enum_use_cases_blocks_pricing_details_sections_variant";
  DROP TYPE "public"."enum_use_cases_blocks_pricing_details_background";
  DROP TYPE "public"."enum_use_cases_blocks_difference_background";
  DROP TYPE "public"."enum_use_cases_blocks_difference_action_target";
  DROP TYPE "public"."enum_use_cases_blocks_pain_points_comparison_background";
  DROP TYPE "public"."enum_use_cases_blocks_pain_points_comparison_action_target";
  DROP TYPE "public"."enum_use_cases_blocks_pricing_policy_callouts_icon";
  DROP TYPE "public"."enum_use_cases_blocks_pricing_policy_background";
  DROP TYPE "public"."enum_use_cases_blocks_industry_expertise_items_icon";
  DROP TYPE "public"."enum_use_cases_blocks_industry_expertise_background";
  DROP TYPE "public"."enum_use_cases_blocks_industry_expertise_visual_type";
  DROP TYPE "public"."enum_use_cases_blocks_industry_expertise_button_target";
  DROP TYPE "public"."enum_use_cases_blocks_logo_strip_background";
  DROP TYPE "public"."enum_use_cases_blocks_integrations_banner_background";
  DROP TYPE "public"."enum_use_cases_blocks_logo_grid_background";
  DROP TYPE "public"."enum_use_cases_blocks_tabs_showcase_background";
  DROP TYPE "public"."enum_use_cases_blocks_anchor_nav_background";
  DROP TYPE "public"."enum_use_cases_blocks_testimonials_background";
  DROP TYPE "public"."enum_use_cases_blocks_comparison_grid_cards_action_target";
  DROP TYPE "public"."enum_use_cases_blocks_comparison_grid_background";
  DROP TYPE "public"."enum_use_cases_blocks_use_case_flow_background";
  DROP TYPE "public"."enum_use_cases_status";
  DROP TYPE "public"."enum_use_cases_template";
  DROP TYPE "public"."enum_forms_fields_type";
  DROP TYPE "public"."enum_forms_intent";
  DROP TYPE "public"."enum_form_submissions_intent";
  DROP TYPE "public"."enum_form_submissions_status";
  DROP TYPE "public"."enum_faq_items_status";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum_site_settings_primary_navigation_items_role";
  DROP TYPE "public"."enum_site_settings_primary_navigation_variant";`)
}
