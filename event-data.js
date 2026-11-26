// Single source of truth for every date, time, venue, address and dress code
// on the site (mirrors the "Event details" table in the PRD). Change it here once.
// All times are Eastern (EDT, UTC-4).
window.WEDDING = {
  couple: { first: 'Palak', second: 'Achal' }, // always in this order
  hosts: 'The Suri Family and The Kandala Family',
  weddingDateLabel: 'August 27, 2027',
  welcome: 'We can’t wait to celebrate with the people we love most.',

  // Invite links: each code shows only the days listed for it. Send a guest the site's link with
  // #code on the end, for example  https://<site address>/#celebrate-k4m8
  // A link with no code (or a code not listed here) shows `defaultInvite`.
  // To add a group, add a line with a new code; keep a random ending so codes can't be guessed.
  // This hides events from view; it does not lock them. Anyone who reads this file can see every
  // code, so don't rely on it for anything secret.
  invites: {
    'haldi-f5n8': { label: 'Haldi and full weekend', days: ['haldi', 'day1', 'day2', 'day3'] },
    'weekend-p7r2': { label: 'Full weekend', days: ['day1', 'day2', 'day3'] },
    'celebrate-k4m8': { label: 'Sangeet and wedding', days: ['day1', 'day2'] },
    'wedding-x9d3': { label: 'Wedding day only', days: ['day2'] },
  },
  defaultInvite: 'celebrate-k4m8',

  // Our story is written but switched off for now; set to true to show it under the welcome note.
  showStory: false,

  // Our story: one line per moment, shown as a gold timeline under the welcome note.
  // `quote` is optional and shows in italics after the text.
  story: [
    { when: 'Fall 2016', text: 'Our story began at a friend’s birthday party, where we got to talking and didn’t want to stop. Soon after came our very first date: a scoop of ice cream at Scoops, a cozy movie night, and a borrowed jacket to keep out the autumn chill.' },
    { when: 'Spring 2017', text: 'When spring concert season came around, a little excuse about Migos tickets brought us back together, and before long we were sharing tacos at Uncle Jose’s on what we still call our first real date.' },
    { when: 'Summer 2017', text: 'That summer we were miles apart, but somehow it never felt that way. We FaceTimed every single day, and by the time August arrived, we were officially a couple.' },
    { when: '2018–2019', text: 'For a little while, life gently led us down different paths. Even then, we always held a special place for each other in our hearts.' },
    { when: 'November 2019', text: 'Then one evening, a simple phone call brought us back to each other, and it felt as though no time had passed at all.' },
    { when: '2020, Chicago', text: 'A few months later, we met again in Chicago. After a nervous flight, a handwritten note, a little chocolate and a flower were waiting, and in that moment every worry simply melted away.', quote: 'It just felt like home.' },
    { when: 'Summer 2021, New York', text: 'We spent a beautiful summer together in New York City, and from that summer on, we have been side by side ever since.' },
    { when: 'August 2027', text: 'Now we are so excited to begin our next chapter, and we would love for you to be there to celebrate it with us.' },
  ],

  // ---------- Travel page (travel.html) ----------
  // Any paragraph or question can carry ifDays (show only if the guest's link includes one of these days)
  // and unlessDays (hide if it includes one of these). {deadline}, {hotel} and {contact} are filled in.
  travel: {
    intro: 'Everything you need to know about getting here, where to stay and finding your way around the weekend.',
    // Times and prices are estimates (checked November 2026); Uber prices change with traffic and demand.
    airportsNote: 'Times and prices are estimates and change with traffic and time of day. Check the Uber app or NJ Transit’s trip planner before you travel.',
    airports: [
      {
        code: 'EWR', name: 'Newark Liberty International', city: 'Newark, New Jersey', pick: true,
        why: 'Our top pick: it’s the closest airport to Envue, and you never have to cross into Manhattan.',
        uber: { time: '25–35 min', cost: '$45–70' },
        transit: {
          time: 'About 1 hr 15 min', cost: 'About $20',
          steps: [
            'Take the AirTrain to Newark Airport rail station (a shuttle bus runs part of the way while the AirTrain is rebuilt).',
            'Take an NJ Transit train to Secaucus Junction, then change for a train to Hoboken.',
            'At Hoboken, take the Hudson-Bergen Light Rail toward Tonnelle Avenue to Port Imperial station, a short walk from Envue.',
          ],
        },
        url: 'https://www.njtransit.com/EWR',
      },
      {
        code: 'LGA', name: 'LaGuardia', city: 'Queens, New York',
        uber: { time: '40–60 min', cost: '$70–100' },
        transit: {
          time: 'About 1 hr 15 min', cost: 'About $8',
          steps: [
            'Take the free Q70 LaGuardia Link bus to Jackson Heights–Roosevelt Avenue.',
            'Take the E train to 42nd Street–Port Authority Bus Terminal.',
            'Take NJ Transit bus 156 or 158 to Port Imperial, about 15 minutes, right outside Envue.',
          ],
        },
      },
      {
        code: 'JFK', name: 'John F. Kennedy International', city: 'Queens, New York',
        uber: { time: '60–90 min', cost: '$110–150' },
        transit: {
          time: 'About 1 hr 45 min', cost: 'About $16',
          steps: [
            'Take the AirTrain to Jamaica station.',
            'Take the E train to 42nd Street–Port Authority Bus Terminal.',
            'Take NJ Transit bus 156 or 158 to Port Imperial, about 15 minutes, right outside Envue.',
          ],
        },
      },
    ],
    arrive: [
      { ifDays: ['haldi'], text: 'The Haldi begins at 10:00 AM on Thursday, August 26, so we’d suggest arriving on Wednesday, August 25.' },
      { ifDays: ['day1'], unlessDays: ['haldi'], text: 'Check-in at Envue opens at 4:00 PM on Thursday, August 26, and the Sangeet begins at 7:00 PM. Arriving that afternoon works well; if you’re travelling from far away, Wednesday gives you time to settle in.' },
      { ifDays: ['day2'], unlessDays: ['haldi', 'day1'], text: 'The Baraat begins at 3:00 PM on Friday, August 27. We’d suggest arriving on Thursday so the wedding day can be unhurried.' },
      { ifDays: ['day2'], text: 'The reception goes until 12:30 AM, so please plan for a late night on Friday.' },
      { ifDays: ['day3'], text: 'Park Day is a relaxed, optional afternoon on Saturday, August 28 from 2:00 PM. If you can, stay on and head home on Sunday, August 29.' },
      { ifDays: ['day2'], unlessDays: ['day3'], text: 'Heading home on Saturday, August 28 or later gives you a gentle morning after the celebrations.' },
    ],
    stay: 'We have a room block at Envue, Autograph Collection, on the Weehawken waterfront, with views across the Hudson to Midtown. The Sangeet is on its rooftop, so you’ll be right where the weekend begins.',
    around: [
      { text: 'Envue sits right beside the Port Imperial ferry terminal. NY Waterway ferries cross to Midtown Manhattan (West 39th Street) in about ten minutes, the most scenic way into the city.' },
      { ifDays: ['day2'], text: 'The Rockleigh is about 30 to 40 minutes north of Envue by car. We’ll share transport details for the wedding day closer to the date.' },
      { ifDays: ['day3'], text: 'For Park Day, take the ferry to Midtown and a short taxi ride to Sheep Meadow in Central Park. We’ll send the exact meeting spot nearer the time.' },
    ],
    help: 'Can’t find what you need, or have a question about travel or your stay? We’re happy to help.',
  },

  // ---------- FAQ page (faq.html) ----------
  faq: [
    { q: 'When should I RSVP by?', a: 'Please send your RSVP by {deadline}. It only takes a minute, and you can find the form at the bottom of the home page.' },
    { q: 'Can I change my RSVP later?', a: 'Of course. Just send the form again using the same email address, and we’ll go with your newest answers. Changes are welcome until {deadline}.' },
    { q: 'Can I bring a plus-one?', a: 'The RSVP form asks whether you’re bringing a plus-one and their name. Your plus-one joins you on each day you’re attending.' },
    { q: 'What should I wear?', a: '{dresscodes}' },
    { q: 'I’ve never been to an Indian wedding. What should I expect?', a: 'Lots of colour, music, food and dancing! Each celebration has its own feel: {expect} Come ready to celebrate, and don’t be shy about joining the dance floor.' },
    { ifDays: ['day2'], q: 'What is the Baraat?', a: 'The Baraat is the groom’s joyful procession to the wedding, with a dhol drummer, music and plenty of dancing. Everyone is welcome to join in, so wear comfortable shoes and be there by 3:00 PM.' },
    { ifDays: ['day3'], q: 'Do I need to come to Park Day?', a: 'Not at all. Park Day is a relaxed, optional afternoon in Central Park to unwind together after the wedding. Come if you can; we’ll understand if you need to head home.' },
    { q: 'Where should I stay?', a: 'We have a room block at {hotel} in Weehawken, New Jersey. The booking link will be on the Travel page soon.' },
    { q: 'Which airport should I fly into?', a: 'We recommend Newark Liberty International (EWR). It’s the closest to Envue, about 25 to 35 minutes by Uber. LaGuardia (LGA) and JFK work too, but the ride is longer and pricier because you cross Manhattan. The Travel page has Uber and public transport options for all three.' },
    { q: 'Will any events be outdoors?', a: 'The Sangeet is on a rooftop and Park Day is on the lawn, so a light layer for the evening and comfortable shoes for the grass are a good idea. It’s late summer, so expect warm days.' },
    { q: 'Who can I ask if I have a question?', a: '{contact}' },
  ],

  // Countdown target: the wedding ceremony.
  countdownTarget: '2027-08-27T16:00:00-04:00',

  rsvp: {
    deadlineLabel: 'June 1, 2027',
    closesAt: '2027-06-01T23:59:59-04:00',
    // Paste the Google Apps Script web-app URL here (see README.md).
    // While empty, the form runs in preview mode and saves nothing.
    endpoint: '',
  },

  hotel: {
    name: 'Envue, Autograph Collection',
    url: 'https://www.marriott.com/en-us/hotels/lgaaw-envue-autograph-collection/overview/',
    address: '550 Avenue at Port Imperial, Weehawken, NJ 07086',
    locationNote:
      'Envue is in Weehawken, New Jersey, across the Hudson from Midtown Manhattan (not in Manhattan itself). Please plan flights and rides with that in mind.',
    bookingUrl: '', // paste the room-block link here to switch the button on
  },

  contact: '', // e.g. 'Email us at hello@example.com'. Empty shows "coming soon".

  // Artwork (phase 2 embroidered images). The phase 1 SVG of each piece is still in /art
  // under the same name; change .webp back to .svg on a line to use it.
  art: {
    doorLeft: 'art/door-left.webp',
    doorRight: 'art/door-right.webp',
    curtainLeft: 'art/curtain-left.webp?v=2',
    curtainRight: 'art/curtain-right.webp?v=2',
    sceneHero: 'art/scene-hero.webp?v=4',
    roses: 'art/floral-roses.webp',
    wisteria: 'art/wisteria.webp',
    divider: 'art/divider-pearls.webp',
    medallion: 'art/medallion.webp',
  },

  // A day can leave out scene, dressCode/dressArt, address/mapsQuery or an event's icon;
  // the site then skips that part.
  days: [
    {
      id: 'haldi',
      when: 'Morning', // shown with the date instead of a day number
      weekday: 'Thursday',
      dateLabel: 'August 26',
      shortDate: 'Thu, Aug 26',
      title: 'Haldi',
      glance: 'Haldi',
      optional: false,
      scene: 'art/scene-haldi.webp',
      sceneAlt: 'Embroidered illustration of a haldi set-up on a sunny patio: a low wooden stool draped in yellow before strands of marigold garlands, brass bowls of turmeric paste and a marigold rangoli',
      venue: 'Suri House',
      note: 'Palak’s parents’ home, where her story began. Come spend a sunny morning with our nearest and dearest, sharing turmeric, laughter and blessings before the celebrations begin. We’ll send you the address personally.',
      events: [{ time: '10:00 AM', name: 'Turmeric, marigolds & blessings' }],
      rsvpLabel: 'Haldi',
      rsvpDate: 'Thu, Aug 26, 10 AM',
      calendar: {
        title: 'Palak & Achal: Haldi',
        start: '2027-08-26T10:00',
        end: '2027-08-26T12:00', // end time not confirmed yet (assumed)
        location: 'Suri House',
        description: 'Haldi at Suri House, Palak’s parents’ home, at 10:00 AM.',
      },
    },
    {
      id: 'day1',
      when: 'Evening',
      weekday: 'Thursday',
      dateLabel: 'August 26',
      shortDate: 'Thu, Aug 26',
      title: 'Arrival & Sangeet',
      glance: 'Arrival & Sangeet',
      optional: false,
      scene: 'art/scene-envue.webp?v=2',
      sceneAlt: 'Embroidered illustration of the Envue rooftop at night, with string lights and the Manhattan skyline across the river',
      venue: 'Envue, Autograph Collection',
      venueUrl: 'https://www.marriott.com/en-us/hotels/lgaaw-envue-autograph-collection/overview/',
      address: '550 Avenue at Port Imperial, Weehawken, NJ 07086',
      mapsQuery: 'Envue, Autograph Collection, 550 Avenue at Port Imperial, Weehawken, NJ 07086',
      note: 'Envue is in Weehawken, New Jersey, across the Hudson from Midtown Manhattan (not in Manhattan itself).',
      dressCode: 'Indo-Western',
      dressArt: 'art/dress-indo-western.webp?v=2',
      events: [
        { time: 'From 4:00 PM', name: 'Arrival and hotel check-in', place: 'Envue, Autograph Collection' },
        { time: '7:00–11:00 PM', name: 'Sangeet', place: 'Envue Rooftop' },
      ],
      rsvpLabel: 'Sangeet',
      rsvpDate: 'Thu, Aug 26',
      calendar: {
        title: 'Palak & Achal: Sangeet',
        start: '2027-08-26T19:00',
        end: '2027-08-26T23:00',
        location: 'Envue Rooftop, Envue, Autograph Collection, 550 Avenue at Port Imperial, Weehawken, NJ 07086',
        description: 'Sangeet on the Envue Rooftop, 7:00–11:00 PM. Hotel check-in from 4:00 PM. Dress code: Indo-Western.',
      },
    },
    {
      id: 'day2',
      when: 'Afternoon & evening',
      weekday: 'Friday',
      dateLabel: 'August 27',
      shortDate: 'Fri, Aug 27',
      title: 'The Wedding',
      glance: 'Wedding & Reception',
      optional: false,
      timeline: true,
      scene: 'art/scene-rockleigh.webp?v=2',
      sceneAlt: 'Embroidered illustration of the stone colonnade in The Rockleigh’s garden, dressed as a mandap, with an aisle and rows of white chairs',
      venue: 'The Rockleigh',
      venueUrl: 'https://therockleigh.net/',
      address: '26 Paris Avenue, Rockleigh, NJ 07647',
      mapsQuery: 'The Rockleigh, 26 Paris Avenue, Rockleigh, NJ 07647',
      dressCode: 'Traditional Indian',
      dressArt: 'art/dress-traditional.webp?v=2',
      events: [
        { time: '3:00 PM', name: 'Baraat', icon: 'art/icon-baraat.webp' },
        { time: '4:00–5:30 PM', name: 'Wedding ceremony', icon: 'art/icon-ceremony.webp' },
        { time: '5:30–6:00 PM', name: 'Photos', icon: 'art/icon-photos.webp' },
        { time: '6:00–7:30 PM', name: 'Cocktail hour', icon: 'art/icon-cocktail.webp' },
        { time: '7:30 PM–12:30 AM', name: 'Reception', icon: 'art/icon-reception.webp' },
      ],
      rsvpLabel: 'Wedding & Reception',
      rsvpDate: 'Fri, Aug 27',
      calendar: {
        title: 'Palak & Achal: The Wedding',
        start: '2027-08-27T15:00',
        end: '2027-08-28T00:30',
        location: 'The Rockleigh, 26 Paris Avenue, Rockleigh, NJ 07647',
        description:
          '3:00 PM Baraat\n4:00–5:30 PM Wedding ceremony\n5:30–6:00 PM Photos\n6:00–7:30 PM Cocktail hour\n7:30 PM–12:30 AM Reception\nDress code: Traditional Indian.',
      },
    },
    {
      id: 'day3',
      when: 'Afternoon',
      weekday: 'Saturday',
      dateLabel: 'August 28',
      shortDate: 'Sat, Aug 28',
      title: 'Park Day',
      glance: 'Park Day',
      optional: true,
      scene: 'art/scene-park.webp?v=2',
      sceneAlt: 'Embroidered illustration of a picnic on Sheep Meadow in Central Park, with the city skyline behind the trees',
      venue: 'Sheep Meadow, Central Park',
      address: 'Sheep Meadow, Central Park, New York, NY',
      mapsQuery: 'Sheep Meadow, Central Park, New York, NY',
      note: 'Exact meeting point and entrance to come.',
      dressCode: 'Casual',
      dressArt: 'art/dress-casual.webp?v=2',
      events: [{ time: '2:00 PM', name: 'Park Day' }],
      rsvpLabel: 'Park Day',
      rsvpDate: 'Sat, Aug 28, optional',
      calendar: {
        title: 'Palak & Achal: Park Day',
        start: '2027-08-28T14:00',
        end: '2027-08-28T17:00', // end time not confirmed yet (assumed)
        location: 'Sheep Meadow, Central Park, New York, NY',
        description: 'An optional, casual afternoon at Sheep Meadow, Central Park. Dress code: Casual.',
      },
    },
  ],
};
