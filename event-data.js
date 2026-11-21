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

  // Our story: one line per moment, shown as a gold timeline under the welcome note.
  // `quote` is optional and shows in italics after the text.
  story: [
    { when: 'Fall 2016', text: 'We matched on Tinder. Our first date ended with Scoops ice cream, a movie, and a borrowed jacket because it was cold.' },
    { when: 'Spring 2017', text: 'A chat about Migos tickets for the spring concert brought us back together, and we had our first real date over tacos at Uncle Jose’s.' },
    { when: 'Summer 2017', text: 'Miles apart, we FaceTimed every single day, with one visit in the middle of it all, just before a US citizenship test. By August, it was official.' },
    { when: '2018–2019', text: 'Life took us in different directions for a while, but we never stopped caring for each other.' },
    { when: 'November 2019', text: 'One phone call, and we were talking again like no time had passed.' },
    { when: '2020, Chicago', text: 'At the end of a nervous flight, one of us was fast asleep, with a note, chocolate and a flower left waiting. Every nerve disappeared.', quote: 'It just felt like home.' },
    { when: '2020, Columbia, SC', text: 'Another visit, and things started to feel certain.' },
    { when: 'Summer 2021, New York', text: 'One summer together in the city, and we’ve been together ever since.' },
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
