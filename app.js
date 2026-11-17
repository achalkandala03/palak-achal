(function () {
  'use strict';
  const W = window.WEDDING;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // For testing, add ?now=2027-06-02 (or any date/time) to the address to pretend it's that moment.
  const fakeNow = (() => {
    const p = new URLSearchParams(location.search).get('now');
    const d = p ? new Date(p) : null;
    return d && !isNaN(d) ? d : null;
  })();
  const now = () => fakeNow || new Date();

  // ---------- invite links: which days this guest sees ----------
  // The code after # in the link picks the days (see `invites` in event-data.js).
  const ALL_DAYS = W.days;
  const invite = (() => {
    const codes = W.invites || {};
    const fromLink = decodeURIComponent(location.hash.slice(1));
    const code = codes[fromLink] ? fromLink : (codes[W.defaultInvite] ? W.defaultInvite : '');
    const days = code ? codes[code].days : ALL_DAYS.map((d) => d.id);
    return { code, days };
  })();
  W.days = ALL_DAYS.filter((d) => invite.days.includes(d.id));

  // "August 26–27, 2027" for the days this guest is invited to
  (() => {
    const year = W.weddingDateLabel.slice(-4);
    const parts = W.days.map((d) => d.dateLabel.split(' ')); // ['August', '26']
    const nums = parts.map((x) => +x[1]);
    const contiguous = nums.every((n, i) => i === 0 || n === nums[i - 1] + 1);
    let label;
    if (parts.length === 1) label = `${parts[0][0]} ${nums[0]}, ${year}`;
    else if (contiguous) label = `${parts[0][0]} ${nums[0]}–${nums[nums.length - 1]}, ${year}`;
    else label = `${parts[0][0]} ${nums.slice(0, -1).join(', ')} & ${nums[nums.length - 1]}, ${year}`;
    $('#invite-dates').textContent = label;
  })();

  // In-page links scroll without replacing the invite code in the address.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    const t = document.getElementById(a.getAttribute('href').slice(1));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });

  // ---------- fill text and art from event-data.js ----------
  $$('[data-bind]').forEach((el) => {
    const v = el.dataset.bind.split('.').reduce((o, k) => (o == null ? o : o[k]), W);
    if (v != null) el.textContent = v;
  });
  $$('[data-initial]').forEach((el) => { el.textContent = (W.couple[el.dataset.initial] || '').charAt(0); });
  $$('[data-art]').forEach((el) => {
    const src = W.art[el.dataset.art];
    if (src && el.getAttribute('src') !== src) el.src = src;
  });

  // ---------- maps + calendar helpers ----------
  const isApple = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const mapsUrl = (q) =>
    isApple ? 'https://maps.apple.com/?q=' + encodeURIComponent(q) : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);

  const stamp = (local) => local.replace(/[-:]/g, '') + '00'; // 2027-08-26T19:00 → 20270826T190000
  const icsText = (s) => String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');
  function icsUrl(day) {
    const c = day.calendar;
    const lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Palak and Achal//Wedding Weekend//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VTIMEZONE', 'TZID:America/New_York',
      'BEGIN:DAYLIGHT', 'TZOFFSETFROM:-0500', 'TZOFFSETTO:-0400', 'TZNAME:EDT', 'DTSTART:19700308T020000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU', 'END:DAYLIGHT',
      'BEGIN:STANDARD', 'TZOFFSETFROM:-0400', 'TZOFFSETTO:-0500', 'TZNAME:EST', 'DTSTART:19701101T020000', 'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU', 'END:STANDARD',
      'END:VTIMEZONE',
      'BEGIN:VEVENT',
      'UID:' + day.id + '@palak-achal-wedding',
      'DTSTAMP:20261111T000000Z',
      'DTSTART;TZID=America/New_York:' + stamp(c.start),
      'DTEND;TZID=America/New_York:' + stamp(c.end),
      'SUMMARY:' + icsText(c.title),
      'LOCATION:' + icsText(c.location),
      'DESCRIPTION:' + icsText(c.description),
      'END:VEVENT', 'END:VCALENDAR',
    ];
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines.join('\r\n'));
  }
  function googleCalUrl(day) {
    const c = day.calendar;
    const p = new URLSearchParams({
      action: 'TEMPLATE', text: c.title, dates: stamp(c.start) + '/' + stamp(c.end),
      ctz: 'America/New_York', location: c.location, details: c.description,
    });
    return 'https://calendar.google.com/calendar/render?' + p.toString();
  }

  // ---------- weekend at a glance ----------
  $('#glance').hidden = W.days.length < 2;
  $('#glance-cards').style.setProperty('--n', String(W.days.length));
  $('#glance-cards').innerHTML = W.days.map((d) =>
    `<a href="#${d.id}"><span class="g-day">${esc(d.label)}</span><span class="g-date">${esc(d.shortDate)}</span>` +
    `<span class="g-title">${esc(d.glance)}</span>${d.optional ? '<span class="g-opt">Optional</span>' : ''}</a>`).join('');

  // ---------- day sections ----------
  function schedule(d) {
    if (d.timeline) {
      return `<ol class="timeline" data-timeline><span class="pearl" aria-hidden="true"></span>` +
        d.events.map((e) =>
          `<li><img src="${esc(e.icon)}" width="420" height="420" alt=""><div><p class="time">${esc(e.time)}</p><p class="name">${esc(e.name)}</p></div></li>`).join('') +
        `</ol>`;
    }
    return `<ul class="schedule">` +
      d.events.map((e) =>
        `<li><p class="time">${esc(e.time)}</p><p class="name">${esc(e.name)}</p>${e.place ? `<p class="place">${esc(e.place)}</p>` : ''}</li>`).join('') +
      `</ul>`;
  }
  $('#days').innerHTML = W.days.map((d, i) => {
    const venue = d.venueUrl
      ? `<a href="${esc(d.venueUrl)}" target="_blank" rel="noopener">${esc(d.venue)}</a>`
      : `<strong>${esc(d.venue)}</strong>`;
    return `
    <section class="section day${i % 2 ? ' panel' : ''}" id="${d.id}">
      <img class="scene" src="${esc(d.scene)}" width="1280" height="704" loading="lazy" alt="${esc(d.sceneAlt)}">
      <p class="label reveal">${esc(d.label)} · ${esc(d.weekday)}, ${esc(d.dateLabel)}</p>
      <h2 class="reveal">${esc(d.title)}</h2>
      ${d.timeline ? `<p class="venue-line reveal">at ${esc(d.venue)}</p>` : ''}
      ${d.optional ? `<p class="reveal"><span class="tag">Optional</span></p>` : ''}
      <div class="reveal">${schedule(d)}</div>
      <div class="dress reveal">
        <img src="${esc(d.dressArt)}" width="640" height="560" loading="lazy" alt="Embroidered illustration of two guests dressed in ${esc(d.dressCode)} attire">
        <div><p class="label">Dress code</p><p class="dress-name">${esc(d.dressCode)}</p></div>
      </div>
      <p class="venue reveal">${venue}<br>${esc(d.address)}</p>
      ${d.note ? `<p class="note reveal">${esc(d.note)}</p>` : ''}
      <div class="actions reveal">
        <a class="btn" href="${esc(mapsUrl(d.mapsQuery))}" target="_blank" rel="noopener">Open in Maps</a>
        <div class="cal">
          <button class="btn" type="button" aria-expanded="false" aria-controls="cal-${d.id}">Add to Calendar</button>
          <div class="cal-menu" id="cal-${d.id}" hidden>
            <a href="${esc(icsUrl(d))}" download="${d.id}-palak-achal.ics">Apple / Outlook</a>
            <a href="${esc(googleCalUrl(d))}" target="_blank" rel="noopener">Google Calendar</a>
          </div>
        </div>
      </div>
    </section>`;
  }).join('');

  // calendar menus
  function closeMenus(except) {
    $$('.cal button').forEach((b) => {
      if (b === except) return;
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.hidden = true;
    });
  }
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.cal button');
    if (btn) {
      const open = btn.getAttribute('aria-expanded') === 'true';
      closeMenus(btn);
      btn.setAttribute('aria-expanded', String(!open));
      btn.nextElementSibling.hidden = open;
    } else {
      closeMenus();
    }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenus(); });

  // ---------- stay ----------
  const H = W.hotel;
  const hotelLink = $('#hotel-link');
  hotelLink.textContent = H.name;
  hotelLink.href = H.url;
  $('#hotel-address').textContent = H.address;
  $('#hotel-note').textContent = H.locationNote;
  $('#hotel-actions').innerHTML = H.bookingUrl
    ? `<a class="btn" href="${esc(H.bookingUrl)}" target="_blank" rel="noopener">Book in our room block</a>`
    : `<button class="btn" type="button" disabled>Booking link coming soon</button>`;
  if (W.contact) $('#contact').textContent = W.contact;

  // ---------- opening ----------
  // Build the closed curtains from thin strips (see "the curtain reveal" in styles.css).
  // DRAPE maps height down the stage (0-1) to how far the tied-back drape drawn in the hero scene
  // reaches in from the side (fraction of the stage width). Measured from art/scene-hero.webp.
  const DRAPE = [[0, .22], [.10, .22], [.12, .219], [.14, .213], [.18, .21], [.20, .204], [.22, .19],
    [.25, .185], [.28, .17], [.31, .159], [.34, .133], [.37, .106], [.40, .087], [.42, .103],
    [.44, .101], [.46, .115], [.50, .117], [.55, .114], [1, .112]];
  const TIE = 0.40; // tie-back height
  const drapeAt = (y) => {
    for (let i = 1; i < DRAPE.length; i++) {
      const [y0, w0] = DRAPE[i - 1], [y1, w1] = DRAPE[i];
      if (y <= y1) return w0 + (w1 - w0) * ((y - y0) / (y1 - y0));
    }
    return DRAPE[DRAPE.length - 1][1];
  };
  const STRIPS = 64, TOP = 0.045; // strips start just under the valance, which never moves
  $$('[data-curtain]').forEach((side) => {
    const src = W.art[side.dataset.curtain];
    // Styles are set through el.style rather than a style="" attribute: hosts with a strict
    // content-security policy (like claude.ai's) silently drop style attributes.
    const frag = document.createDocumentFragment();
    for (let i = 0; i < STRIPS; i++) {
      const y0 = TOP + (1 - TOP) * (i / STRIPS), h = (1 - TOP) / STRIPS, mid = y0 + h / 2;
      const scale = Math.min(1, (drapeAt(mid) + 0.004) / 0.5);
      const lag = 0.15 * Math.min(1, Math.abs(mid - TIE) / 0.55); // tie-back leads, top and hem follow
      const el = document.createElement('div');
      el.className = 'curtain-strip';
      const st = el.style;
      st.setProperty('top', `calc(${(y0 * 100).toFixed(3)}% - 0.5px)`);
      st.setProperty('height', `calc(${(h * 100).toFixed(3)}% + 1px)`);
      st.setProperty('background-image', `url("${new URL(src, document.baseURI).href}")`);
      st.setProperty('background-size', '100% var(--sh)');
      st.setProperty('background-position', `0 calc(var(--sh) * ${(-y0).toFixed(5)} + 0.5px)`);
      st.setProperty('--s', scale.toFixed(4));
      st.setProperty('--lag', `${lag.toFixed(3)}s`);
      frag.appendChild(el);
    }
    side.replaceChildren(frag);
  });

  const hero = $('#hero');
  const root = document.documentElement;
  let opened = false;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  function openDoors() {
    if (opened) return;
    opened = true;
    hero.classList.add('open');
    setTimeout(() => {
      hero.classList.add('done');
      root.classList.remove('locked');
      if (location.hash && location.hash !== '#hero') {
        const t = document.getElementById(location.hash.slice(1));
        if (t) t.scrollIntoView();
      }
    }, reduceMotion ? 1800 : 4000);
  }
  $('#doors').addEventListener('click', openDoors);
  setTimeout(openDoors, 4500); // open on their own if nobody taps

  // ---------- countdown ----------
  const target = new Date(W.countdownTarget);
  function tick() {
    const diff = target - now();
    if (diff <= 0) {
      $('#medallions').hidden = true;
      $('#cd-today').hidden = false;
      $('#countdown .label').hidden = true;
      return;
    }
    const mins = Math.floor(diff / 60000);
    $('#cd-days').textContent = Math.floor(mins / 1440);
    $('#cd-hours').textContent = Math.floor((mins % 1440) / 60);
    $('#cd-mins').textContent = mins % 60;
  }
  tick();
  if (!fakeNow) setInterval(tick, 15000);

  // ---------- scroll effects ----------
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    $$('.reveal').forEach((el) => io.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('in'));
  }

  const timeline = $('[data-timeline]');
  if (timeline) {
    const pearl = $('.pearl', timeline);
    const stops = $$('li', timeline);
    let queued = false;
    const place = () => {
      queued = false;
      const r = timeline.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height));
      const y = p * r.height;
      pearl.style.transform = `translateY(${y.toFixed(1)}px)`;
      stops.forEach((li) => li.classList.toggle('passed', li.offsetTop + li.offsetHeight / 2 <= y + 1));
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(place); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    place();
  }

  // ---------- RSVP ----------
  const form = $('#rsvp-form');
  const done = $('#rsvp-done');
  const closed = now() > new Date(W.rsvp.closesAt);

  $('#rsvp-days').innerHTML = W.days.map((d) => `
    <fieldset class="choice" id="fs-${d.id}">
      <legend>${esc(d.rsvpLabel)}<small>${esc(d.rsvpDate)}</small></legend>
      <div class="pills">
        <label><input type="radio" name="${d.id}" value="Yes"><span>Yes</span></label>
        <label><input type="radio" name="${d.id}" value="No"><span>No</span></label>
      </div>
      <p class="error" id="e-${d.id}" hidden>Please choose Yes or No.</p>
    </fieldset>`).join('');

  if (closed) {
    form.hidden = true;
    $('#rsvp-closed').hidden = false;
    $('#rsvp .deadline').hidden = true;
  }

  const val = (name) => { const el = form.elements[name]; return el ? String(el.value || '').trim() : ''; };
  const plusBlock = $('#plus-one-block');
  const plusName = $('#plus-one-name');
  function syncPlusOne() {
    const allNo = W.days.every((d) => val(d.id) === 'No');
    plusBlock.hidden = allNo; // declining every day skips the plus-one questions
    plusName.hidden = allNo || val('plusOne') !== 'Yes';
  }
  form.addEventListener('change', syncPlusOne);

  function setError(id, show, input) {
    $('#e-' + id).hidden = !show;
    if (input) input.setAttribute('aria-invalid', String(show));
    return show;
  }
  function validate() {
    let first = null;
    const flag = (bad, id, focusEl) => { if (setError(id, bad, focusEl && focusEl.matches('input[type=text],input[type=email]') ? focusEl : null) && !first) first = focusEl; };
    flag(val('name').length < 2, 'name', form.elements.name);
    flag(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val('email')), 'email', form.elements.email);
    W.days.forEach((d) => flag(!val(d.id), d.id, $(`input[name="${d.id}"]`, form)));
    const allNo = W.days.every((d) => val(d.id) === 'No');
    flag(!allNo && !val('plusOne'), 'plusOne', $('input[name="plusOne"]', form));
    flag(!allNo && val('plusOne') === 'Yes' && val('plusOneName').length < 2, 'plusOneName', form.elements.plusOneName);
    if (first) first.focus();
    return !first;
  }

  function showDone(data, saved) {
    $('#done-name').textContent = data.name.split(/\s+/)[0];
    const coming = W.days.some((d) => data[d.id] === 'Yes');
    $('#done-lede').textContent = coming ? 'We can’t wait to celebrate with you. Here’s what we have for you:' : 'We’ll miss you. Here’s what we have for you:';
    const rows = W.days.map((d) => [d.rsvpLabel, data[d.id]]);
    if (coming) rows.push(['Plus-one', data.plusOne === 'Yes' ? data.plusOneName : 'No']);
    $('#done-summary').innerHTML = rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
    $('#done-note').textContent = saved
      ? 'Need to change something? Send the form again with the same email and your newest answer will count.'
      : 'Preview mode: the Google Sheet isn’t connected yet, so this response was not saved.';
    form.hidden = true;
    done.hidden = false;
    done.focus();
    done.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formError = $('#e-form');
    formError.hidden = true;
    if (!validate()) return;
    const allNo = W.days.every((d) => val(d.id) === 'No');
    const data = { name: val('name'), email: val('email').toLowerCase(), website: val('website') };
    ALL_DAYS.forEach((d) => { data[d.id] = invite.days.includes(d.id) ? val(d.id) : 'Not invited'; });
    data.invite = invite.code;
    data.plusOne = allNo ? 'No' : val('plusOne');
    data.plusOneName = data.plusOne === 'Yes' ? val('plusOneName') : '';

    if (!W.rsvp.endpoint) return showDone(data, false);

    const btn = $('#rsvp-submit');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      // text/plain keeps this a "simple" request, which Google Apps Script accepts from any page.
      const res = await fetch(W.rsvp.endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data) });
      const out = await res.json();
      if (!out.ok) throw new Error(out.error || 'failed');
      showDone(data, true);
    } catch (err) {
      formError.textContent = String(err.message) === 'closed'
        ? 'RSVPs are closed. Please contact us directly.'
        : 'Sorry, we couldn’t send your RSVP. Please check your connection and try again.';
      formError.hidden = false;
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send RSVP';
    }
  });

  $('#rsvp-again').addEventListener('click', () => {
    done.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
})();
