(function () {
  'use strict';

  var STEP_DELAY = 820;
  var FIRST_DELAY = 220;

  function setup(root) {
    var turns = Array.prototype.slice.call(root.querySelectorAll('[data-turn]'));
    if (!turns.length) return;

    var railItems = Array.prototype.slice.call(root.querySelectorAll('[data-rail-channel]'));
    var outcome = root.querySelector('[data-outcome]');
    var replay = root.querySelector('[data-replay]');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Opt into the animated state only now, so a no-JS page stays fully readable.
    root.classList.add('is-scripted');

    var timers = [];

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
    }

    function activateRail(channel) {
      railItems.forEach(function (item) {
        if (item.getAttribute('data-rail-channel') === channel) {
          item.classList.add('is-active');
        }
      });
    }

    function reset() {
      clearTimers();
      turns.forEach(function (turn) {
        turn.classList.remove('is-visible');
      });
      railItems.forEach(function (item) {
        item.classList.remove('is-active');
      });
      if (outcome) outcome.classList.remove('is-visible');
    }

    function revealAll() {
      turns.forEach(function (turn) {
        turn.classList.add('is-visible');
        activateRail(turn.getAttribute('data-turn-channel'));
      });
      if (outcome) outcome.classList.add('is-visible');
    }

    function play() {
      reset();

      if (reduced.matches) {
        revealAll();
        return;
      }

      turns.forEach(function (turn, index) {
        timers.push(
          setTimeout(function () {
            turn.classList.add('is-visible');
            activateRail(turn.getAttribute('data-turn-channel'));
          }, FIRST_DELAY + index * STEP_DELAY),
        );
      });

      var tail = FIRST_DELAY + turns.length * STEP_DELAY;

      if (outcome) {
        timers.push(
          setTimeout(function () {
            outcome.classList.add('is-visible');
          }, tail),
        );
      }

      timers.push(
        setTimeout(function () {
          var status = root.querySelector('[data-status]');
          if (status) status.textContent = 'Conversation replayed. Full transcript is shown above.';
        }, tail + 200),
      );
    }

    // The replay is user-initiated on purpose. Auto-updating content that
    // starts on its own needs a pause control under WCAG 2.2.2 (Level A), and
    // that criterion has no short-duration exemption. A button avoids it, and
    // it keeps the whole transcript readable for the visitors - most of them -
    // who never press play.
    revealAll();

    if (replay) {
      replay.addEventListener('click', play);
    }
  }

  function init() {
    Array.prototype.slice
      .call(document.querySelectorAll('[data-conversation-replay]'))
      .forEach(setup);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
