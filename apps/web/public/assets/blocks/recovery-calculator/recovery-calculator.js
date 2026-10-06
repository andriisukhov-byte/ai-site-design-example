(function () {
  'use strict';

  function money(value) {
    return '$' + (Math.round(value / 10) * 10).toLocaleString('en-US');
  }

  function setup(root) {
    var inputs = {};
    Array.prototype.slice.call(root.querySelectorAll('[data-input]')).forEach(function (el) {
      inputs[el.getAttribute('data-input')] = el;
    });

    var numbers = {};
    Array.prototype.slice.call(root.querySelectorAll('[data-number]')).forEach(function (el) {
      numbers[el.getAttribute('data-number')] = el;
    });

    if (!inputs.missed || !inputs.share || !inputs.jobValue) return;

    var weeks = parseFloat(root.getAttribute('data-weeks')) || 4.33;
    var frequencies = Array.prototype.slice.call(root.querySelectorAll('[data-frequency]'));
    var clientsEl = root.querySelector('[data-clients]');
    var resultEl = root.querySelector('[data-result]');
    var annualEl = root.querySelector('[data-annual]');
    var formulaEl = root.querySelector('[data-formula]');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var frame = null;
    var last = null;

    function exact(key) {
      var el = inputs[key];
      var override = el.getAttribute('data-exact');
      return override !== null ? Number(override) : Number(el.value);
    }

    function visits() {
      for (var i = 0; i < frequencies.length; i += 1) {
        if (frequencies[i].checked) return parseFloat(frequencies[i].value) || 1;
      }
      return 1;
    }

    function readout(key) {
      var input = inputs[key];
      var field = numbers[key];

      var value = exact(key);

      if (field && document.activeElement !== field) {
        field.value = String(value);
      }

      var min = Number(input.min || 0);
      var max = Number(input.max || 100);
      var span = max - min;
      input.style.setProperty('--rc-fill', (span > 0 ? ((value - min) / span) * 100 : 0) + '%');

      var prefix = input.getAttribute('data-prefix') || '';
      var suffix = input.getAttribute('data-suffix') || '';
      input.setAttribute('aria-valuetext', prefix + value + (suffix === '%' ? ' percent' : suffix));
    }

    function paint(value) {
      if (resultEl) resultEl.textContent = money(value);
      if (annualEl) annualEl.textContent = money(value * 12);
    }

    function countTo(target) {
      if (frame) cancelAnimationFrame(frame);

      if (reduced.matches || last === null) {
        last = target;
        paint(target);
        return;
      }

      var from = last;
      var start = performance.now();

      function tick(now) {
        var t = Math.min(1, (now - start) / 360);
        var eased = 1 - Math.pow(1 - t, 4);
        paint(from + (target - from) * eased);
        if (t < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          paint(target);
        }
      }

      last = target;
      frame = requestAnimationFrame(tick);
    }

    var statusEl = root.querySelector('[data-status]');
    var announceTimer = null;

    function announce(clients, monthly) {
      if (!statusEl) return;
      clearTimeout(announceTimer);
      announceTimer = setTimeout(function () {
        statusEl.textContent =
          clients + ' new clients a month, worth ' + money(monthly) + ' a month and ' + money(monthly * 12) + ' a year.';
      }, 500);
    }

    function recalc() {
      var missed = exact('missed');
      var share = exact('share');
      var jobValue = exact('jobValue');
      var perMonth = visits();

      // Round first, then multiply, so the printed formula and the printed money agree.
      var clients = Math.round(((missed * weeks * share) / 100) * 10) / 10;
      var monthly = clients * jobValue * perMonth;
      var clientsRounded = clients;

      ['missed', 'share', 'jobValue'].forEach(readout);

      if (clientsEl) clientsEl.textContent = String(clientsRounded);
      countTo(monthly);
      announce(clientsRounded, monthly);

      if (formulaEl) {
        formulaEl.textContent =
          missed +
          ' missed × ' +
          weeks +
          ' weeks × ' +
          share +
          '% booking = ' +
          clientsRounded +
          ' clients, each worth $' +
          jobValue +
          ' × ' +
          perMonth +
          ' visits a month';
      }
    }

    ['missed', 'share', 'jobValue'].forEach(function (key) {
      readout(key);
      inputs[key].addEventListener('input', function () {
        inputs[key].removeAttribute('data-exact');
        recalc();
      });
      inputs[key].addEventListener('change', recalc);
    });

    frequencies.forEach(function (el) {
      el.addEventListener('change', recalc);
    });

    Object.keys(numbers).forEach(function (key) {
      var field = numbers[key];
      var slider = inputs[key];
      if (!slider) return;

      field.removeAttribute('readonly');

      function sync() {
        if (field.value === '') return;
        var min = Number(slider.min || 0);
        var max = Number(slider.max || 100);
        var value = Math.min(max, Math.max(min, Number(field.value)));
        // The slider snaps to its own coarser step; compute from the typed
        // number so the maths never runs on a value the operator did not enter.
        slider.value = String(value);
        if (Number(slider.value) !== value) {
          slider.setAttribute('data-exact', String(value));
        } else {
          slider.removeAttribute('data-exact');
        }
        recalc();
      }

      field.addEventListener('input', sync);
      field.addEventListener('change', function () {
        sync();
        // Snap the field itself back inside range once the user leaves it.
        field.value = slider.value;
      });
    });
  }

  function init() {
    Array.prototype.slice
      .call(document.querySelectorAll('[data-recovery-calculator]'))
      .forEach(setup);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
