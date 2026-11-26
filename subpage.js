// Travel and FAQ pages. Content lives in event-data.js (`travel` and `faq`).
(() => {
  const W = window.WEDDING;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- invite code: same rules as the home page ----------
  const codes = W.invites || {};
  const fromLink = decodeURIComponent(location.hash.slice(1));
  const code = codes[fromLink] ? fromLink : (codes[W.defaultInvite] ? W.defaultInvite : '');
  const invited = code ? codes[code].days : W.days.map((d) => d.id);
  const days = W.days.filter((d) => invited.includes(d.id));
  const shows = (item) =>
    (!item.ifDays || item.ifDays.some((id) => invited.includes(id))) &&
    !(item.unlessDays && item.unlessDays.some((id) => invited.includes(id)));

  // links back home and between pages keep the invite code
  $$('a[data-keep-hash]').forEach((a) => {
    const [base, query] = a.getAttribute('href').split('?');
    a.href = base + (query ? '?' + query : '') + location.hash;
  });
  $$('[data-initial]').forEach((el) => { el.textContent = (W.couple[el.dataset.initial] || '').charAt(0); });

  // ---------- shared text ----------
  const contact = W.contact || 'Contact details are coming soon. In the meantime, please reach out to us or our families directly.';
  const dressLines = days.map((d) =>
    d.dressCode ? `${d.rsvpLabel}: ${d.dressCode}.` : `${d.rsvpLabel}: something bright and cheerful that you don’t mind getting a little turmeric on.`);
  const expectBits = {
    haldi: 'the Haldi is an intimate morning where family bless the couple with turmeric paste;',
    day1: 'the Sangeet is an evening of music, performances and dancing;',
    day2: 'the wedding day brings the Baraat, the ceremony, cocktails and a reception that goes late;',
    day3: 'and Park Day is a laid-back picnic to wind down together.',
  };
  const vars = {
    deadline: W.rsvp.deadlineLabel,
    hotel: W.hotel.name,
    contact,
    dresscodes: dressLines.join(' '),
    expect: days.map((d) => expectBits[d.id]).filter(Boolean).join(' '),
  };
  const fill = (s) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  const para = (items) => items.filter(shows).map((x) => `<p>${esc(fill(x.text))}</p>`).join('');

  $$('[data-fill]').forEach((el) => {
    const v = el.dataset.fill.split('.').reduce((o, k) => (o == null ? o : o[k]), W);
    if (v != null) el.textContent = fill(String(v));
  });
  $$('[data-contact]').forEach((el) => { el.textContent = contact; });

  // ---------- travel ----------
  const T = W.travel;
  if ($('#arrive')) {
    $('#arrive').innerHTML = para(T.arrive);
    $('#around').innerHTML = para(T.around);
    const H = W.hotel;
    $('#stay-text').textContent = T.stay;
    $('#stay-hotel').innerHTML =
      `<a href="${esc(H.url)}" target="_blank" rel="noopener">${esc(H.name)}</a><br>${esc(H.address)}`;
    $('#stay-book').innerHTML = H.bookingUrl
      ? `<a class="btn" href="${esc(H.bookingUrl)}" target="_blank" rel="noopener">Book in our room block</a>`
      : `<p class="soon">Booking link coming soon</p>`;
    $('#airport').innerHTML = T.airports.map((A) => `
      <article class="airport${A.pick ? ' pick' : ''}">
        <div class="code-row"><span class="code">${esc(A.code)}</span>
          <span class="code-name">${A.pick ? '<span class="pick-tag">Recommended</span>' : ''}<strong>${esc(A.name)}</strong>${esc(A.city)}</span></div>
        ${A.why ? `<p class="why">${esc(A.why)}</p>` : ''}
        <div class="ways">
          <div class="way"><p class="way-name">By Uber</p><p class="way-meta">${esc(A.uber.time)} · ${esc(A.uber.cost)}</p></div>
          <div class="way"><p class="way-name">By public transport</p><p class="way-meta">${esc(A.transit.time)} · ${esc(A.transit.cost)}</p>
            <ol class="steps">${A.transit.steps.map((x) => `<li>${esc(x)}</li>`).join('')}</ol></div>
        </div>
      </article>`).join('') +
      `<p class="fineprint">${esc(T.airportsNote)}</p>`;
  }

  // ---------- FAQ ----------
  if ($('#faq-list')) {
    $('#faq-list').innerHTML = W.faq.filter(shows).map((f, i) => `
      <details${i === 0 ? ' open' : ''}>
        <summary><span>${esc(f.q)}</span><span class="mark" aria-hidden="true"></span></summary>
        <p>${esc(fill(f.a))}</p>
      </details>`).join('');
  }
})();
