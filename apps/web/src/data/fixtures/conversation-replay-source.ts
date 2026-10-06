import { pageBlockSchema, type PageBlock } from '@acme/blocks';

export const conversationReplaySourceFixture: PageBlock = pageBlockSchema.parse({
  type: 'conversation-replay',
  background: 'white',
  title: 'A missed call at 7:42, {{a booked job by 7:44}}',
  description:
    'One customer and one thread moving across channels, with the actions the agent took in connected systems and the record it created at the end.',
  replayLabel: 'Play the conversation',
  turns: [
    {
      channel: 'voice',
      time: '7:42 AM',
      from: 'customer',
      text: 'Missed call from a mobile number. Both crews left at seven and nobody is in the office yet.',
      action: 'Call logged as a new lead. Text-back queued before the caller reaches the next listing.',
    },
    {
      channel: 'sms',
      time: '7:42 AM',
      from: 'agent',
      text: 'Hi, this is Bright Home Cleaning - sorry we missed you. I can help right here. What kind of clean do you need?',
    },
    {
      channel: 'sms',
      time: '7:43 AM',
      from: 'customer',
      text: 'Move-out clean, 3 bed 2 bath in Northgate. Friday if you have it.',
    },
    {
      channel: 'sms',
      time: '7:43 AM',
      from: 'agent',
      text: 'Northgate is in our area. A 3 bed / 2 bath move-out is a flat $240. Friday I have 10:00 or 14:00 - which suits you?',
      action: 'Service area checked, your rate card applied, Friday crew availability read from the calendar.',
    },
    {
      channel: 'whatsapp',
      time: '7:44 AM',
      from: 'customer',
      text: '10:00. Sending photos - the kitchen is rough, is that extra?',
    },
    {
      channel: 'whatsapp',
      time: '7:44 AM',
      from: 'agent',
      text: "Looked at them - that kitchen is inside the flat rate, no surprise charge. You're booked for Friday 10:00. Want the same crew every two weeks once you're in the new place?",
      action: 'Slot held, job written to your scheduling tool, recurring plan offered at the moment of booking.',
    },
  ],
  outcomeTitle: 'What existed two minutes later',
  outcomeRows: [
    { label: 'Job', value: 'Move-out deep clean · 3 bed / 2 bath' },
    { label: 'When', value: 'Friday, 10:00 - 13:00' },
    { label: 'Quote', value: '$240 flat, no upcharge' },
    { label: 'Crew', value: 'Team B · confirmed' },
  ],
  outcomeNote:
    'The recurring biweekly plan was accepted in the same thread. Nobody in the office touched any of it.',
});
