import { pageBlockSchema } from '@acme/blocks';

export const agentCapabilitiesSourceFixture = pageBlockSchema.parse({
  type: 'agent-capabilities',
  title: 'What {{ Your Agents }} Can Do',
  description: 'The most demanded capabilities businesses configure across customer-facing, hiring, and internal workflows',
  contentSide: 'left',
  autoplay: true,
  autoplayInterval: 5000,
  items: [
    { icon: 'messages_square', title: 'Inbound Lead Capture & Qualification', description: 'Every inquiry answered 24/7 across voice, SMS, WhatsApp, web, and email - screened against your criteria and routed or booked without staff involvement.' },
    { icon: 'calendar_check', title: 'Appointment Booking & Scheduling', description: 'Live calendar booking on your dispatch, CRM, or scheduling tool - confirmed, reminded, and rescheduled without back-and-forth.' },
    { icon: 'receipt_text', title: 'Quote & Estimate Handling', description: 'Discloses pricing, captures financing interest, runs multi-touch quote follow-up, and routes complex requests to the right person.' },
    { icon: 'headset', title: 'Customer Service & Case Resolution', description: 'Opens, triages, and resolves support requests across every channel - pulling live data, executing fixes, and logging outcomes inside your tools.' },
    { icon: 'package', title: 'Status & Order Updates', description: 'Answers "where\'s my order, application, or request" by reading live data from your CRM, ERP, dispatch, or order management system - zero staff time.' },
    { icon: 'send', title: 'Follow-Up & Re-Engagement', description: 'Outbound conversations on renewals, abandoned inquiries, lapsed accounts, and pending quotes - returned to your team only when human judgment is needed.' },
    { icon: 'clipboard_list', title: 'Document & Information Collection', description: 'Multi-step structured intake with input validation - new clients, employees, applications, claims, or any sequence that follows a defined collection flow.' },
    { icon: 'shield_check', title: 'Approval & Sign-Off Workflows', description: 'Sends structured requests, collects decisions through conversation, logs outcomes - one exchange instead of an email thread.' },
    { icon: 'user_round_check', title: 'Candidate Screening & Hiring Flows', description: 'First-pass candidate screening, interview scheduling, reference collection, and onboarding communication for roles where hiring never stops.' },
    { icon: 'book_marked', title: 'Internal Help Desk & Knowledge Q&A', description: 'Employee-facing agents that answer policy, process, and system questions - pulling from your knowledge base and connected tools.' },
  ],
  preview: false,
  root: { anchor: 'sec-agent-capabilities' },
});

export const agentCapabilitiesWithCardImagesSourceFixture = pageBlockSchema.parse({
  type: 'agent-capabilities',
  title: 'Transform Every Corner of {{ Your E-commerce Business }}',
  description: 'Eliminate manual system-hopping, reduce data entry errors, and ensure information consistency across your entire e-commerce operations.',
  contentSide: 'left',
  autoplay: true,
  autoplayInterval: 5000,
  items: [
    { icon: 'package_plus', title: 'Instant Order Tracking and Status Updates', description: 'Your AI chatbot for ecommerce connects directly to shipping carriers and order management systems to provide real-time delivery information. When customers ask "where is my order?", the system queries FedEx, UPS, or USPS APIs, retrieves current location data, and shares expected delivery times - all in seconds. For delayed shipments, the AI proactively offers compensation like discount codes while logging the interaction for your team\'s review.' },
    { icon: 'file_cog', title: 'Returns Management Without the Headaches', description: 'Automate the entire returns process from eligibility verification to label generation. The AI agent checks purchase dates against your return policy window, validates return reasons, confirms product condition requirements, and instantly generates prepaid shipping labels. Customers receive return authorization numbers and email confirmations automatically, while your ERP system updates inventory expectations and triggers refund processing once items are received.' },
    { icon: 'rotate_cw_square', title: 'Payment Verification and Account Inquiries', description: 'Handle payment confusion immediately by checking multiple payment gateways simultaneously. The ecommerce automation system searches Stripe, PayPal, and bank transfer records to locate pending transactions, explains processing timeframes, and sends confirmation emails - eliminating frustrated customers and reducing support ticket volume.' },
    { icon: 'refresh_cw', title: 'Product Availability and Restock Notifications', description: 'When customers inquire about out-of-stock items, your AI assistant doesn\'t just say "unavailable." It checks incoming purchase orders, provides specific restock dates, suggests alternative sizes or colors currently in stock, and automatically adds customers to notification lists. The moment inventory arrives, targeted emails go out with 24-hour hold guarantees.' },
    { icon: 'badge_check', title: 'Automated Purchase Order Processing', description: 'Supplier emails arrive with PDF purchase orders containing dozens or hundreds of line items. Your ecommerce automation platform extracts every SKU, quantity, and price point using OCR, validates against approved vendor lists, checks inventory availability, and creates draft sales orders in your ERP. Sales managers receive structured approval requests via Slack - one click confirms the order, generates invoices, and sends confirmations back to suppliers.' },
    { icon: 'file_text', title: 'Real-Time Inventory Synchronization', description: 'Scheduled syncs compare inventory levels across all selling platforms against your ERP system (the source of truth). When discrepancies appear - like Shopify showing 25 units while you actually have 18, or showing zero stock when 5 units sit in your warehouse - the AI chatbot alerts operations managers immediately. One-click sync updates prevent overselling and eliminates lost sales from incorrect stock displays.' },
    { icon: 'shopping_cart', title: 'Invoice Data Entry Elimination', description: 'Supplier invoices arrive as PDF attachments. The AI agent extracts invoice numbers, dates, line items, tax amounts, and totals automatically. It matches invoices against existing purchase orders to verify accuracy, creates draft bills in your accounting system, and flags any discrepancies. Your accounts payable team reviews and approves rather than manually typing data - reducing errors and processing time from hours to minutes.' },
    { icon: 'truck', title: 'Shipping Delay Management', description: 'Your ecommerce automation system monitors tracking data continuously and detects delays before customers complain. When shipments fall behind schedule, the AI proactively notifies customers, explains specific causes (weather, facility delays), provides updated delivery estimates, and automatically applies compensation like discount codes - turning potential negative experiences into demonstrations of excellent service.' },
  ],
  infoNote: '<p>Those are some of the use cases that demonstrate <strong>AI working across multiple platforms simultaneously</strong> - checking ERPs, updating accounting systems, querying shipping carriers, syncing inventory platforms, and notifying team members through communication tools.</p>',
  preview: false,
  root: { anchor: 'sec-agent-capabilities-with-card-images' },
});
