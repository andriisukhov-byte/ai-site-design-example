(() => {
    const blocks = document.querySelectorAll('.feature-rows');

    blocks.forEach((block) => {
        const stage = block.querySelector('.feature-rows__stage');
        const svg = block.querySelector('.feature-rows__connectors');
        const isBuilder = block.classList.contains('feature-rows--builder');
        if (!stage) return;

        const links = [
            [
                { selector: '.feature-rows__node--conversation', side: 'bottom' },
                { selector: '.feature-rows__copy--employees', side: 'top' },
                'straight-vertical',
            ],
            [
                { selector: '.feature-rows__node--employee', side: 'bottom' },
                { selector: '.feature-rows__copy--automation', side: 'top' },
                'straight-vertical',
            ],
        ];

        const mobileLinks = [
            [
                { selector: '.feature-rows__message', side: 'bottom' },
                { selector: '.feature-rows__copy--employees', side: 'top' },
                'straight-vertical',
            ],
            [
                { selector: '.feature-rows__copy--employees', side: 'bottom' },
                { selector: '.feature-rows__copy--automation', side: 'top' },
                'straight-vertical',
            ],
        ];

        const rowConnectorConfigs = [
            {
                selector: '.feature-rows__row-connectors--conversational',
                dots: [
                    { selector: '.feature-rows__copy--conversational', side: 'top' },
                ],
                links: [
                    [{ selector: '.feature-rows__copy--conversational', side: 'bottom' }, { selector: '.feature-rows__icon-card--gmail', side: 'left' }],
                    [{ selector: '.feature-rows__icon-card--gmail', side: 'right' }, { selector: '.feature-rows__sentiment', side: 'left' }],
                    [{ selector: '.feature-rows__sentiment', side: 'right' }, { selector: '.feature-rows__node--conversation', side: 'left' }],
                    [{ selector: '.feature-rows__node--conversation', side: 'right' }, { selector: '.feature-rows__message', side: 'bottom' }],
                ],
            },
            {
                selector: '.feature-rows__row-connectors--employees',
                links: [
                    [{ selector: '.feature-rows__round--slack', side: 'right' }, { selector: '.feature-rows__round--sheets', side: 'left' }],
                    [{ selector: '.feature-rows__round--sheets', side: 'right' }, { selector: '.feature-rows__round--linkedin', side: 'left' }],
                    [{ selector: '.feature-rows__round--slack', side: 'bottom' }, { selector: '.feature-rows__icon-card--calendar-clock', side: 'top' }],
                    [{ selector: '.feature-rows__round--linkedin', side: 'bottom' }, { selector: '.feature-rows__icon-card--git', side: 'top' }],
                    [{ selector: '.feature-rows__icon-card--calendar-clock', side: 'right' }, { selector: '.feature-rows__pill--left', side: 'left' }],
                    [{ selector: '.feature-rows__pill--left', side: 'right' }, { selector: '.feature-rows__pill--right', side: 'left' }],
                    [{ selector: '.feature-rows__pill--right', side: 'right' }, { selector: '.feature-rows__icon-card--git', side: 'left' }],
                    [{ between: ['.feature-rows__pill--left', '.feature-rows__pill--right'], side: 'bottom' }, { selector: '.feature-rows__node--employee', side: 'top' }],
                    [{ selector: '.feature-rows__node--employee', side: 'right' }, { selector: '.feature-rows__copy--employees', side: 'bottom' }, 'horizontal-vertical'],
                ],
            },
            {
                selector: '.feature-rows__row-connectors--automation',
                dots: [
                    { selector: '.feature-rows__copy--automation', side: 'top' },
                ],
                links: [
                    [
                        { selector: '.feature-rows__copy--automation', side: 'bottom' },
                        { selector: '.feature-rows__round--auto-calendar', side: 'left', dot: false },
                        'vertical-horizontal',
                    ],
                    [
                        { selector: '.feature-rows__round--auto-slack', side: 'bottom', dot: false },
                        { selector: '.feature-rows__node--automation', side: 'top', dot: false },
                    ],
                ],
            },
        ];

        const mobileRowConnectorConfigs = [
            {
                selector: '.feature-rows__row-connectors--conversational',
                links: [
                    [
                        { selector: '.feature-rows__copy--conversational', side: 'bottom' },
                        { selector: '.feature-rows__icon-card--gmail', side: 'top' },
                        'vertical-horizontal',
                    ],
                    [
                        { selector: '.feature-rows__icon-card--gmail', side: 'right' },
                        { selector: '.feature-rows__message', side: 'left' },
                    ],
                ],
            },
            {
                selector: '.feature-rows__row-connectors--employees',
                links: [
                    [
                        { selector: '.feature-rows__copy--employees', side: 'bottom' },
                        { selector: '.feature-rows__node--employee', side: 'top' },
                    ],
                    [
                        { selector: '.feature-rows__round--slack', side: 'right' },
                        { selector: '.feature-rows__node--employee', side: 'left' },
                    ],
                    [
                        { selector: '.feature-rows__node--employee', side: 'right' },
                        { selector: '.feature-rows__round--linkedin', side: 'left' },
                    ],
                    [
                        { selector: '.feature-rows__round--slack', side: 'bottom' },
                        { selector: '.feature-rows__pill--left', side: 'top' },
                    ],
                    [
                        { selector: '.feature-rows__round--linkedin', side: 'bottom' },
                        { selector: '.feature-rows__pill--right', side: 'top' },
                    ],
                    [
                        { selector: '.feature-rows__pill--left', side: 'bottom' },
                        { selector: '.feature-rows__round--sheets', side: 'left' },
                        'vertical-horizontal',
                    ],
                    [
                        { selector: '.feature-rows__pill--right', side: 'bottom' },
                        { selector: '.feature-rows__round--sheets', side: 'right' },
                        'vertical-horizontal',
                    ],
                ],
            },
            {
                selector: '.feature-rows__row-connectors--automation',
                links: [
                    [
                        { selector: '.feature-rows__copy--automation', side: 'bottom' },
                        { selector: '.feature-rows__node--automation', side: 'top' },
                    ],
                    [
                        { selector: '.feature-rows__node--automation', side: 'right' },
                        { selector: '.feature-rows__round--auto-gmail', side: 'left' },
                    ],
                    [
                        { selector: '.feature-rows__round--auto-gmail', side: 'right' },
                        { selector: '.feature-rows__round--auto-slack', side: 'left' },
                    ],
                    [
                        { selector: '.feature-rows__round--auto-slack', side: 'right' },
                        { selector: '.feature-rows__round--auto-hubspot', side: 'left' },
                    ],
                ],
            },
        ];

        const builderRowConnectorConfigs = [
            {
                selector: '.feature-rows__row-connectors--builder-one',
                links: [
                    [
                        { selector: '.feature-rows__builder-copy--one', side: 'right' },
                        { selector: '.feature-rows__builder-icon-rail--one', side: 'left' },
                        'horizontal-vertical',
                    ],
                    [
                        { selector: '.feature-rows__builder-icon-rail--one', side: 'right' },
                        { selector: '.feature-rows__builder-node--one', side: 'left' },
                    ],
                    [
                        { selector: '.feature-rows__builder-node--one', side: 'right' },
                        { selector: '.feature-rows__builder-prompt--one', side: 'bottom' },
                        'vertical-horizontal',
                    ],
                ],
            },
            {
                selector: '.feature-rows__row-connectors--builder-two',
                links: [
                    [
                        { selector: '.feature-rows__builder-avatar--qualifies', side: 'bottom' },
                        { selector: '.feature-rows__builder-label--qualifies', side: 'top' },
                    ],
                    [
                        { selector: '.feature-rows__builder-label--qualifies', side: 'bottom' },
                        { selector: '.feature-rows__builder-node--two', side: 'top' },
                        'vertical-horizontal',
                    ],
                    [
                        { selector: '.feature-rows__builder-icon--calendar-clock', side: 'bottom' },
                        { selector: '.feature-rows__builder-label--booked', side: 'top' },
                    ],
                    [
                        { selector: '.feature-rows__builder-label--booked', side: 'bottom' },
                        { selector: '.feature-rows__builder-node--two', side: 'top' },
                        'vertical-horizontal',
                    ],
                    [
                        { selector: '.feature-rows__builder-node--two', side: 'right' },
                        { selector: '.feature-rows__builder-icon--mail', side: 'left' },
                    ],
                    [
                        { selector: '.feature-rows__builder-icon--mail', side: 'right' },
                        { selector: '.feature-rows__builder-copy--two', side: 'left' },
                    ],
                ],
            },
            {
                selector: '.feature-rows__row-connectors--builder-three',
                links: [
                    [
                        { selector: '.feature-rows__builder-copy--three', side: 'right' },
                        { selector: '.feature-rows__builder-icon-rail--three', side: 'left' },
                    ],
                    [
                        { selector: '.feature-rows__builder-icon-rail--three', side: 'right' },
                        { selector: '.feature-rows__builder-icon--headset', side: 'left' },
                    ],
                    [
                        { selector: '.feature-rows__builder-icon--headset', side: 'right' },
                        { selector: '.feature-rows__builder-label--expert', side: 'left' },
                    ],
                    [
                        { selector: '.feature-rows__builder-label--expert', side: 'right' },
                        { selector: '.feature-rows__builder-avatar--expert', side: 'left' },
                    ],
                ],
            },
        ];

        const mobileBuilderRowConnectorConfigs = [
            {
                selector: '.feature-rows__row-connectors--builder-one',
                links: [
                    [
                        { selector: '.feature-rows__builder-copy--one', side: 'bottom' },
                        { selector: '.feature-rows__builder-prompt--one', side: 'top' },
                    ],
                    [
                        { selector: '.feature-rows__builder-prompt--one', side: 'bottom' },
                        { selector: '.feature-rows__builder-node--one', side: 'top' },
                        'vertical-horizontal',
                    ],
                    [
                        { selector: '.feature-rows__builder-node--one', side: 'bottom' },
                        { selector: '.feature-rows__builder-icon-rail--one', side: 'top' },
                        'vertical-horizontal',
                    ],
                ],
            },
            {
                selector: '.feature-rows__row-connectors--builder-two',
                links: [
                    [
                        { selector: '.feature-rows__builder-avatar--qualifies', side: 'bottom' },
                        { selector: '.feature-rows__builder-label--qualifies', side: 'top' },
                    ],
                    [
                        { selector: '.feature-rows__builder-icon--calendar-clock', side: 'bottom' },
                        { selector: '.feature-rows__builder-label--booked', side: 'top' },
                    ],
                    [
                        { selector: '.feature-rows__builder-label--qualifies', side: 'bottom' },
                        { selector: '.feature-rows__builder-node--two', side: 'top' },
                        'vertical-horizontal',
                    ],
                    [
                        { selector: '.feature-rows__builder-label--booked', side: 'bottom' },
                        { selector: '.feature-rows__builder-node--two', side: 'top' },
                        'vertical-horizontal',
                    ],
                    [
                        { selector: '.feature-rows__builder-icon--mail', side: 'bottom' },
                        { selector: '.feature-rows__builder-node--two', side: 'top' },
                    ],
                ],
            },
            {
                selector: '.feature-rows__row-connectors--builder-three',
                links: [
                    [
                        { selector: '.feature-rows__builder-copy--three', side: 'bottom' },
                        { selector: '.feature-rows__builder-icon-rail--three', side: 'top' },
                        'vertical-horizontal',
                    ],
                    [
                        { selector: '.feature-rows__builder-icon-rail--three', side: 'right' },
                        { selector: '.feature-rows__builder-icon--headset', side: 'left' },
                    ],
                    [
                        { selector: '.feature-rows__builder-icon--headset', side: 'right' },
                        { selector: '.feature-rows__builder-label--expert', side: 'left' },
                    ],
                    [
                        { selector: '.feature-rows__builder-label--expert', side: 'right' },
                        { selector: '.feature-rows__builder-avatar--expert', side: 'left' },
                    ],
                ],
            },
        ];

        function createSvgElement(tag, attributes) {
            const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
            Object.entries(attributes).forEach(([name, value]) => {
                element.setAttribute(name, value);
            });

            return element;
        }

        function createDot(cx, cy, fill, style = 'ring') {
            if (style === 'solid') {
                return createSvgElement('circle', {
                    cx,
                    cy,
                    r: '7',
                    fill,
                    stroke: '#fff',
                    'stroke-width': '2',
                });
            }

            return createSvgElement('circle', {
                cx,
                cy,
                r: '6',
                fill: '#fff',
                stroke: fill,
                'stroke-width': '4',
            });
        }

        function dotStyleFor(definition) {
            if (definition && definition.dotStyle) return definition.dotStyle;
            const selector = (definition && definition.selector) || '';

            return selector.includes('__copy--') ? 'solid' : 'ring';
        }

        const DOT_BEARING_TOKENS = [
            '__copy--',
            '__builder-copy',
            '__builder-prompt',
            '__builder-icon-rail',
            '__builder-node',
            '__builder-avatar',
            '__builder-icon',
            '__builder-label',
            '__icon-card--',
            '__sentiment',
            '__message',
        ];

        function shouldRenderDot(definition) {
            if (!definition || definition.dot === false) return false;
            const selector = definition.selector || '';

            return DOT_BEARING_TOKENS.some((token) => selector.includes(token));
        }

        function point(rect, side) {
            const map = {
                top: [rect.left + rect.width / 2, rect.top],
                right: [rect.right, rect.top + rect.height / 2],
                bottom: [rect.left + rect.width / 2, rect.bottom],
                left: [rect.left, rect.top + rect.height / 2],
                center: [rect.left + rect.width / 2, rect.top + rect.height / 2],
            };

            return map[side];
        }

        function localPoint(containerRect, element, side) {
            const elementRect = element.getBoundingClientRect();
            const pagePoint = point(elementRect, side);

            return [pagePoint[0] - containerRect.left, pagePoint[1] - containerRect.top];
        }

        function pathBetween(start, end, startSide, _endSide) {
            const dx = Math.abs(end[0] - start[0]);
            const dy = Math.abs(end[1] - start[1]);

            if (dy < 2) {
                return `M ${start[0]} ${start[1]} H ${end[0]}`;
            }

            if (dx < 2) {
                return `M ${start[0]} ${start[1]} V ${end[1]}`;
            }

            // Cap radius to fit both axes — prevents curve overshoot when one delta is small.
            const radius = Math.min(48, dx / 2, dy / 2);
            const signX = Math.sign(end[0] - start[0]);
            const signY = Math.sign(end[1] - start[1]);

            if (startSide === 'right' || startSide === 'left') {
                const midX = start[0] + (end[0] - start[0]) / 2;
                return `M ${start[0]} ${start[1]} H ${midX - signX * radius} Q ${midX} ${start[1]} ${midX} ${start[1] + signY * radius} V ${end[1] - signY * radius} Q ${midX} ${end[1]} ${midX + signX * radius} ${end[1]} H ${end[0]}`;
            }

            const midY = start[1] + (end[1] - start[1]) / 2;
            return `M ${start[0]} ${start[1]} V ${midY - signY * radius} Q ${start[0]} ${midY} ${start[0] + signX * radius} ${midY} H ${end[0] - signX * radius} Q ${end[0]} ${midY} ${end[0]} ${midY + signY * radius} V ${end[1]}`;
        }

        function horizontalVerticalPath(start, end) {
            const directionY = Math.sign(end[1] - start[1]) || 1;
            const directionX = Math.sign(end[0] - start[0]) || 1;
            const radius = Math.min(48, Math.abs(end[0] - start[0]) / 2, Math.abs(end[1] - start[1]) / 2);

            return `M ${start[0]} ${start[1]} H ${end[0] - directionX * radius} Q ${end[0]} ${start[1]} ${end[0]} ${start[1] + directionY * radius} V ${end[1]}`;
        }

        function verticalHorizontalPath(start, end) {
            const directionY = Math.sign(end[1] - start[1]) || 1;
            const directionX = Math.sign(end[0] - start[0]) || 1;
            const radius = Math.min(32, Math.abs(end[0] - start[0]) / 2, Math.abs(end[1] - start[1]) / 2);

            return `M ${start[0]} ${start[1]} V ${end[1] - directionY * radius} Q ${start[0]} ${end[1]} ${start[0] + directionX * radius} ${end[1]} H ${end[0]}`;
        }

        function straightVerticalPath(start, end) {
            return `M ${start[0]} ${start[1]} V ${end[1]}`;
        }

        function arcAbovePath(start, end) {
            const lift = Math.max(34, Math.abs(end[0] - start[0]) * 0.26);
            const controlY = Math.min(start[1], end[1]) - lift;

            return `M ${start[0]} ${start[1]} Q ${(start[0] + end[0]) / 2} ${controlY} ${end[0]} ${end[1]}`;
        }

        function arcRightPath(start, end) {
            const push = Math.max(44, Math.abs(end[1] - start[1]) * 0.32);
            const controlX = Math.max(start[0], end[0]) + push;

            return `M ${start[0]} ${start[1]} Q ${controlX} ${(start[1] + end[1]) / 2} ${end[0]} ${end[1]}`;
        }

        function endpoint(containerRect, definition) {
            if (definition.selector) {
                const element = block.querySelector(definition.selector);
                return element ? localPoint(containerRect, element, definition.side || 'center') : null;
            }

            if (definition.between) {
                const elements = definition.between
                    .map((selector) => block.querySelector(selector))
                    .filter(Boolean);

                if (elements.length !== 2) return null;

                const [firstRect, secondRect] = elements.map((element) => element.getBoundingClientRect());
                const x = (firstRect.right + secondRect.left) / 2 - containerRect.left;
                const yMap = {
                    top: Math.min(firstRect.top, secondRect.top) - containerRect.top,
                    right: secondRect.left - containerRect.left,
                    bottom: Math.max(firstRect.bottom, secondRect.bottom) - containerRect.top,
                    left: firstRect.right - containerRect.left,
                };

                return [x, yMap[definition.side]];
            }

            return null;
        }

        function rectCenter(rect, containerRect) {
            return [
                rect.left + rect.width / 2 - containerRect.left,
                rect.top + rect.height / 2 - containerRect.top,
            ];
        }

        function nearestBoundaryPoint(fromRect, toRect, containerRect) {
            const from = rectCenter(fromRect, containerRect);
            const to = rectCenter(toRect, containerRect);
            const dx = to[0] - from[0];
            const dy = to[1] - from[1];
            const length = Math.hypot(dx, dy) || 1;
            const radius = Math.min(fromRect.width, fromRect.height) / 2;

            return [
                from[0] + (dx / length) * radius,
                from[1] + (dy / length) * radius,
            ];
        }

        function linkedEndpoints(containerRect, from, to) {
            const fromEl = from.selector ? block.querySelector(from.selector) : null;
            const toEl = to.selector ? block.querySelector(to.selector) : null;

            if (from.anchor === 'nearest' && toEl && fromEl) {
                const fromRect = fromEl.getBoundingClientRect();
                const toRect = toEl.getBoundingClientRect();

                return [
                    nearestBoundaryPoint(fromRect, toRect, containerRect),
                    to.anchor === 'nearest'
                        ? nearestBoundaryPoint(toRect, fromRect, containerRect)
                        : endpoint(containerRect, to),
                ];
            }

            if (to.anchor === 'nearest' && toEl && fromEl) {
                const fromRect = fromEl.getBoundingClientRect();
                const toRect = toEl.getBoundingClientRect();

                return [
                    endpoint(containerRect, from),
                    nearestBoundaryPoint(toRect, fromRect, containerRect),
                ];
            }

            return [endpoint(containerRect, from), endpoint(containerRect, to)];
        }

        function draw() {
            if (isBuilder || !svg) return;
            const defs = svg.querySelector('defs');
            const isMobile = window.matchMedia('(max-width: 767px)').matches;

            if (defs) {
                svg.replaceChildren(defs);
            }

            const stageRect = stage.getBoundingClientRect();
            svg.setAttribute('viewBox', `0 0 ${stageRect.width} ${stageRect.height}`);

            const activeLinks = isMobile ? mobileLinks : links;

            activeLinks.forEach(([from, to, route]) => {
                const start = endpoint(stageRect, from);
                const end = endpoint(stageRect, to);
                if (!start || !end) return;
                const pathEnd = route === 'straight-vertical' ? [start[0], end[1]] : end;

                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', route === 'straight-vertical'
                    ? straightVerticalPath(start, pathEnd)
                    : isMobile && Math.abs(end[0] - start[0]) < 2
                        ? `M ${start[0]} ${start[1]} V ${end[1]}`
                        : pathBetween(start, pathEnd, from.side, to.side));
                path.setAttribute('stroke', '#d7d7d7');
                path.setAttribute('stroke-dasharray', '8 8');
                path.setAttribute('stroke-width', '1');
                path.setAttribute('fill', 'none');
                svg.appendChild(path);

                [
                    [start, from],
                    [pathEnd, to],
                ].forEach(([coords, definition]) => {
                    if (!shouldRenderDot(definition)) return;
                    svg.appendChild(createDot(coords[0], coords[1], 'url(#featureRowsDot)', dotStyleFor(definition)));
                });
            });
        }

        function drawRowConnector(config) {
            const rowConnectors = block.querySelector(config.selector);
            if (!rowConnectors) return;

            const defs = rowConnectors.querySelector('defs');

            if (defs) {
                rowConnectors.replaceChildren(defs);
            }

            const rowRect = rowConnectors.getBoundingClientRect();
            rowConnectors.setAttribute('viewBox', `0 0 ${rowRect.width} ${rowRect.height}`);
            const dotFill = `url(#${rowConnectors.dataset.dotGradient || 'featureRowsDot'})`;

            (config.dots || []).forEach((dot) => {
                const coords = endpoint(rowRect, dot);
                if (!coords) return;

                rowConnectors.appendChild(createDot(coords[0], coords[1], dotFill, dotStyleFor(dot)));
            });

            config.links.forEach(([from, to, route]) => {
                const [start, end] = linkedEndpoints(rowRect, from, to);
                if (!start || !end) return;

                rowConnectors.appendChild(createSvgElement('path', {
                    d: route === 'horizontal-vertical'
                        ? horizontalVerticalPath(start, end)
                        : route === 'vertical-horizontal'
                            ? verticalHorizontalPath(start, end)
                        : route === 'arc-above'
                            ? arcAbovePath(start, end)
                            : route === 'arc-right'
                                ? arcRightPath(start, end)
                                : pathBetween(start, end, from.side, to.side),
                    stroke: '#B9B9B9',
                    'stroke-dasharray': '8 8',
                    'stroke-linecap': 'round',
                    fill: 'none',
                }));

                [
                    [start, from],
                    [end, to],
                ].forEach(([[cx, cy], definition]) => {
                    if (!shouldRenderDot(definition)) return;

                    rowConnectors.appendChild(createDot(cx, cy, dotFill, dotStyleFor(definition)));
                });
            });
        }

        function drawRowConnectors() {
            const isMobile = window.matchMedia('(max-width: 767px)').matches;
            const configs = isBuilder
                ? (isMobile ? mobileBuilderRowConnectorConfigs : builderRowConnectorConfigs)
                : (isMobile ? mobileRowConnectorConfigs : rowConnectorConfigs);
            configs.forEach(drawRowConnector);
        }

        const backgroundRows = isBuilder
            ? []
            : Array.from(block.querySelectorAll(
                '.feature-rows__row--conversational, .feature-rows__row--employees, .feature-rows__row--automation'
            ));
        let backgroundFrame = null;

        function updateActiveBackgroundRow() {
            if (!backgroundRows.length) return;

            const viewportCenter = window.innerHeight / 2;
            let activeRow = backgroundRows[0];
            let activeDistance = Number.POSITIVE_INFINITY;

            backgroundRows.forEach((row) => {
                const rect = row.getBoundingClientRect();
                const rowCenter = rect.top + rect.height / 2;
                const distance = Math.abs(rowCenter - viewportCenter);
                const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

                if (isVisible && distance < activeDistance) {
                    activeDistance = distance;
                    activeRow = row;
                }
            });

            backgroundRows.forEach((row) => {
                row.classList.toggle('is-bg-active', row === activeRow);
            });
        }

        function scheduleActiveBackgroundRow() {
            if (backgroundFrame !== null) return;

            backgroundFrame = window.requestAnimationFrame(() => {
                backgroundFrame = null;
                updateActiveBackgroundRow();
            });
        }

        drawRowConnectors();
        draw();
        updateActiveBackgroundRow();
        window.addEventListener('scroll', scheduleActiveBackgroundRow, { passive: true });
        window.addEventListener('resize', () => {
            drawRowConnectors();
            draw();
            scheduleActiveBackgroundRow();
        });
        window.addEventListener('load', () => {
            drawRowConnectors();
            draw();
            scheduleActiveBackgroundRow();
        });
    });
})();
