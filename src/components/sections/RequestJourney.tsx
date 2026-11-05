import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

import { Icon } from '@/components/ui/Icon';
import {
  journeyLayers,
  journeyPlatform,
  journeyScenarios,
  type JourneyLayerId,
  type JourneyScenario,
} from '@/data/requestJourney';
import { skillGroups } from '@/data/skills';
import { cn } from '@/lib/cn';
import { prefersReducedMotion } from '@/lib/motion';
import type { IconName } from '@/types/portfolio';

import styles from './RequestJourney.module.css';

type Stop = 'actor' | JourneyLayerId;
type Panel = JourneyLayerId | 'platform';

const ROUTE: Stop[] = ['actor', 'interface', 'services', 'data', 'services', 'interface', 'actor'];
const TURN = 3;
const LAST = ROUTE.length - 1;
const STEP_MS = 1250;
const HOLD_MS = 3200;

const LAYER_ICONS: Record<JourneyLayerId, IconName> = {
  interface: 'code',
  services: 'server',
  data: 'database',
};

interface LogLine {
  key: string;
  tag: string;
  text: string;
  detail?: string;
  tone: 'out' | 'step' | 'back';
  at: number;
}

function logFor(scenario: JourneyScenario): LogLine[] {
  return [
    { key: 'req', tag: 'request', text: scenario.request, tone: 'out', at: 0 },
    ...journeyLayers.map((layer, index) => ({
      key: layer.id,
      tag: layer.id,
      text: scenario.steps[layer.id].text,
      detail: scenario.steps[layer.id].tech,
      tone: 'step' as const,
      at: index + 1,
    })),
    { key: 'res', tag: 'response', text: scenario.response, tone: 'back', at: LAST },
  ];
}

export function RequestJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const busRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Partial<Record<Stop, HTMLElement | null>>>({});

  const [still] = useState(prefersReducedMotion);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState(still ? LAST : 0);
  const [visible, setVisible] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [offsets, setOffsets] = useState<Partial<Record<Stop, number>>>({});

  const scenario = journeyScenarios[scenarioIndex] ?? journeyScenarios[0]!;
  const running = visible && panel === null && !still;
  const stop = ROUTE[step] ?? 'actor';
  const returning = step > TURN;
  const done = step === LAST;
  const shownStep = still ? LAST : step;
  const log = logFor(scenario);
  const current = log.reduce((latest, line) => (line.at <= shownStep ? line.key : latest), 'req');

  const reached = (id: Stop) => still || ROUTE.slice(0, step + 1).includes(id);

  const measure = useCallback(() => {
    const bus = busRef.current;
    if (!bus) return;
    const base = bus.getBoundingClientRect().left;
    const next: Partial<Record<Stop, number>> = {};

    (Object.keys(nodeRefs.current) as Stop[]).forEach((key) => {
      const box = nodeRefs.current[key]?.getBoundingClientRect();
      if (box) next[key] = box.left - base + box.width / 2;
    });

    setOffsets(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const root = rootRef.current;
    if (!root) return;
    const sizing = new ResizeObserver(measure);
    sizing.observe(root);
    return () => sizing.disconnect();
  }, [measure]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), {
      threshold: 0.3,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;

    const timer = window.setTimeout(
      () => {
        if (done) {
          setScenarioIndex((index) => (index + 1) % journeyScenarios.length);
          setStep(0);
        } else {
          setStep((current) => current + 1);
        }
      },
      done ? HOLD_MS : STEP_MS,
    );

    return () => window.clearTimeout(timer);
  }, [running, step, done]);

  const pickScenario = (index: number) => {
    setScenarioIndex(index);
    setStep(still ? LAST : 0);
    setPanel(null);
  };

  const togglePanel = (id: Panel) => setPanel((current) => (current === id ? null : id));

  const packetX = offsets[stop];
  const packetStyle = { '--packet-x': `${packetX ?? 0}px` } as CSSProperties;

  const panelGroup = panel
    ? skillGroups.find(
        (group) =>
          group.id ===
          (panel === 'platform'
            ? journeyPlatform.skillGroup
            : journeyLayers.find((layer) => layer.id === panel)?.skillGroup),
      )
    : undefined;

  return (
    <div ref={rootRef} className={styles.root}>
      <span className={styles.glow} aria-hidden="true" />

      <header className={styles.head}>
        <div className={styles.headText}>
          <p className={styles.eyebrow}>
            <span className={styles.live} aria-hidden="true" />
            One request, end to end
          </p>
          <p className={styles.scenario} key={scenario.id}>
            <span className={styles.project}>{scenario.project}</span>
            {scenario.actor}
          </p>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Request scenarios">
          {journeyScenarios.map((entry, index) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={index === scenarioIndex}
              className={cn(styles.tab, index === scenarioIndex && styles.tabActive)}
              onClick={() => pickScenario(index)}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.stage}>
        <div
          className={styles.bus}
          ref={busRef}
          aria-hidden="true"
          style={
            {
              '--lane-start': offsets.actor === undefined ? undefined : `${offsets.actor}px`,
              '--lane-end': offsets.data === undefined ? undefined : `${offsets.data}px`,
            } as CSSProperties
          }
        >
          <span className={styles.lane} />
          <span className={cn(styles.lane, styles.laneBack)} />
          {packetX !== undefined && !still ? <span className={styles.laneFill} style={packetStyle} /> : null}
          {packetX !== undefined && !still ? (
            <span className={cn(styles.packet, returning && styles.packetBack)} style={packetStyle} />
          ) : null}
        </div>

        <ol className={styles.nodes}>
          <li
            ref={(node) => {
              nodeRefs.current.actor = node;
            }}
            className={cn(styles.node, styles.actor, (stop === 'actor' || still) && styles.here)}
          >
            <span className={styles.badge} aria-hidden="true">
              <span className={styles.actorDot} />
            </span>
            <span className={styles.nodeLabel}>Client</span>
            <code className={styles.nodeMeta}>{done ? 'response in' : 'request out'}</code>
            <span className={styles.nodeStep} key={scenario.id}>
              <span className={styles.stepTech}>{scenario.project}</span>
              <span className={styles.stepText}>{scenario.actor}</span>
            </span>
          </li>

          {journeyLayers.map((layer) => (
            <li
              key={layer.id}
              ref={(node) => {
                nodeRefs.current[layer.id] = node;
              }}
              className={cn(
                styles.node,
                reached(layer.id) && styles.lit,
                stop === layer.id && !still && styles.here,
                panel === layer.id && styles.open,
              )}
            >
              <button
                type="button"
                className={styles.nodeButton}
                onClick={() => togglePanel(layer.id)}
                aria-expanded={panel === layer.id}
                aria-label={`${layer.label}: ${layer.tech}. Show skills`}
              >
                <span className={styles.badge} aria-hidden="true">
                  <Icon name={LAYER_ICONS[layer.id]} size={20} />
                </span>
                <span className={styles.nodeLabel}>{layer.label}</span>
                <code className={styles.nodeMeta}>{layer.tech}</code>
                {reached(layer.id) ? (
                  <span className={styles.nodeStep} key={scenario.id}>
                    <span className={styles.stepTech}>{scenario.steps[layer.id].tech}</span>
                    <span className={styles.stepText}>{scenario.steps[layer.id].text}</span>
                  </span>
                ) : (
                  <span className={cn(styles.nodeStep, styles.waiting)}>
                    <span className={styles.stepTech}>waiting</span>
                    <span className={styles.placeholder} />
                    <span className={cn(styles.placeholder, styles.placeholderShort)} />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ol>

        <button
          type="button"
          className={cn(styles.platform, panel === 'platform' && styles.open)}
          onClick={() => togglePanel('platform')}
          aria-expanded={panel === 'platform'}
        >
          <Icon name="cloud" size={16} aria-hidden="true" />
          <span className={styles.platformLabel}>{journeyPlatform.label}</span>
          <code className={styles.platformTech}>{journeyPlatform.tech}</code>
          <span className={styles.platformNote}>everything above runs here</span>
        </button>
      </div>

      {panel && panelGroup ? (
        <div className={styles.console} key={panel}>
          <div className={styles.consoleBar}>
            <span>{panelGroup.title}</span>
            <button type="button" className={styles.close} onClick={() => setPanel(null)}>
              Close
            </button>
          </div>
          <p className={styles.panelText}>{panelGroup.description}</p>
          <ul className={styles.chips}>
            {panelGroup.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.console} aria-live="off">
          <div className={styles.consoleBar}>
            <span>trace · {scenario.project.toLowerCase()}</span>
            <span className={styles.consoleState}>
              hop {Math.min(shownStep + 1, ROUTE.length)}/{ROUTE.length} ·{' '}
              {done || still ? 'complete' : returning ? 'returning' : 'in flight'}
            </span>
          </div>
          <ol className={styles.log}>
            {log.map((line) => {
              const pending = line.at > shownStep;
              return (
                <li
                  key={`${scenario.id}-${line.key}-${pending}`}
                  className={cn(
                    styles.line,
                    styles[line.tone],
                    pending && styles.pending,
                    !pending && line.key === current && !still && styles.current,
                  )}
                >
                  <span className={styles.tag}>{line.tag}</span>
                  {pending ? (
                    <span className={styles.placeholder} aria-hidden="true" />
                  ) : (
                    <span className={styles.text}>
                      {line.text}
                      {line.detail ? <span className={styles.detail}>{line.detail}</span> : null}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
