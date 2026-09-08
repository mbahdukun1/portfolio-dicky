import type { CaseStudy } from '@/types/portfolio';

const base = '/projects/wo';

export const workOrderCase: CaseStudy = {
  slug: 'work-order',
  title: 'Work Order — Fleet Maintenance App',
  context: 'Inline Technology',
  period: '2026',
  role: 'Mobile engineer',
  platform: 'Mobile app behind single sign-on',
  lede: 'A maintenance app for the people holding the spanner: raise a work order against a broken unit, then walk it through nine fixed steps from breakdown to ready-for-use, with the clock running.',

  overview: [
    'Work Order is the app a workshop uses to keep heavy units moving. A truck comes off the road, someone raises a work order against it, and from that moment the repair is a tracked object rather than a conversation — who is on it, which step it has reached, how long it has been running, and what comes next.',
    'The thing that makes it work is that the process is not freeform. Every repair follows the same nine steps, in the same order: breakdown, service request, inspection, inspection report, parts order, parts supply, repair, ground test, ready for use. The app does not let a mechanic invent a sequence, and it does not ask them to remember one.',
    'That rigidity is the feature. A workshop where every job is tracked differently is a workshop where nobody can answer “where is that unit?” — and the answer is usually waiting on a part nobody ordered. Fixing the sequence turns that question into a glance.',
  ],

  flow: [
    {
      title: 'Sign in through SSO',
      detail:
        'A single sign-on against the company account, shared with the other Inline products, so a mechanic carries one login rather than one per tool.',
    },
    {
      title: 'Land on the worker dashboard',
      detail:
        'Your name, your online status, one primary action — create a work order — and your jobs split into On Progress and Finish, searchable by WO number.',
    },
    {
      title: 'Raise a work order',
      detail:
        'Pick the unit, pick the driver, describe the problem. The form shows the nine steps that will follow before you commit, so nobody submits without knowing what they have started.',
    },
    {
      title: 'It waits as Open',
      detail:
        'A new order sits at step 1 of 9 with no mechanic assigned — the card says “Belum ada mekanik” plainly rather than leaving the field blank.',
    },
    {
      title: 'Someone starts it',
      detail:
        'Pressing START claims the job, stamps the mechanic onto it, and begins a running timer shown on the card itself.',
    },
    {
      title: 'It moves through the steps',
      detail:
        'Each card shows where the job is (1 of 9 — unit breakdown) and what comes next, so the handover between mechanics needs no explanation.',
    },
    {
      title: 'Waiting is a state, not a gap',
      detail:
        'A job blocked on parts is marked Waiting rather than silently stalling in progress — the difference between “being worked on” and “stuck” is visible on the list.',
    },
    {
      title: 'Finish it',
      detail:
        'FINISH closes the job into the Finish tab with the mechanic who completed it and the date, and the unit is ready for use.',
    },
  ],

  chapters: [
    {
      id: 'sso',
      heading: 'One login for the workshop',
      body: [
        'The app opens on single sign-on rather than its own account system. A mechanic who already has a company account should not need a second one to log a repair, and a workshop that has to manage a separate user list will eventually stop managing it.',
        'The login screen also carries the app version and environment in plain sight. On an internal tool distributed by hand, knowing which build a device is running is the first question support asks — putting it on the login screen saves the round trip.',
      ],
      shots: ['login'],
    },
    {
      id: 'dashboard',
      heading: 'A dashboard that shows the job, not a report',
      body: [
        'The worker dashboard is built around one question: what am I doing next. It greets the mechanic by name, marks them Online, and puts a single primary button — create a work order — above everything else. Under it, the jobs split into On Progress and Finish, with a search on WO number for when you arrive knowing the number.',
        'Each card carries the unit code, the WO number, the date, the reported problem, and the step it has reached. Crucially it also names the next step: “Step Selanjutnya: Permintaan aktifitas service”. A mechanic picking up someone else’s job does not have to ask what was about to happen.',
        'The status vocabulary is small and honest — Open, On Progress, Waiting, Finish — and the action on the card changes to match: START on an open job, FINISH on one that is running. There is no menu to hunt through for the thing you obviously want to do.',
      ],
      shots: ['dashboard-open', 'dashboard-running', 'dashboard-finished'],
    },
    {
      id: 'steps',
      heading: 'Nine steps, in that order',
      body: [
        'Creating a work order takes three inputs — unit, driver, problem — and then shows the whole route the job will take before it is submitted: unit breakdown, service request, inspection activity, inspection report readiness, parts ordering, parts supply, unit repair, ground test, and ready-for-use.',
        'Showing the steps up front is a small thing that changes behaviour. The person raising the order sees that ordering parts is step 5, not something that happens by magic, and the mechanic picking it up inherits a plan rather than a complaint.',
        'The timer is the other half of it. A running job shows its elapsed time on the card, which turns “this has been in the workshop a while” from an impression into a number — and makes the difference between On Progress and Waiting worth recording accurately.',
      ],
      shots: ['create-work-order'],
    },
    {
      id: 'profile',
      heading: 'Who did what',
      body: [
        'Every work order carries the mechanic who started it and the one who finished it, and the profile ties that back to a real employee record: employee id, company, department, site, and role. On a shared workshop device that attribution is the whole audit trail.',
        'Roles matter here too. An Admin WO can raise and reassign orders; a mechanic works the ones assigned to them. The app is small, but it still knows who is allowed to do what.',
      ],
      shots: ['profile'],
    },
  ],

  gallery: [
    {
      id: 'login',
      src: `${base}/login.jpeg`,
      title: 'Single sign-on',
      caption: 'One company login shared with the other Inline products, with build and environment shown.',
    },
    {
      id: 'dashboard-open',
      src: `${base}/dashboard-open.jpeg`,
      title: 'Open work orders',
      caption: 'Step 1 of 9, no mechanic assigned yet, and a START button to claim the job.',
    },
    {
      id: 'dashboard-running',
      src: `${base}/dashboard-running.jpeg`,
      title: 'In progress',
      caption: 'A running timer, the mechanic on the job, and the next step named — plus a Waiting job below it.',
    },
    {
      id: 'dashboard-finished',
      src: `${base}/dashboard-finished.jpeg`,
      title: 'Finished',
      caption: 'Closed jobs with the mechanic who completed them and the date.',
    },
    {
      id: 'create-work-order',
      src: `${base}/create-work-order.jpeg`,
      title: 'Create a work order',
      caption: 'Unit, driver, problem — and the nine steps the job will follow, shown before submitting.',
    },
    {
      id: 'profile',
      src: `${base}/profile.jpeg`,
      title: 'Profile',
      caption: 'Role and employment record behind every action. Contact details blurred for this write-up.',
    },
  ],

  outcomes: [
    'Every repair follows the same nine steps, so “where is that unit?” is a glance instead of a phone call.',
    'Running time is recorded on the card, and blocked jobs are marked Waiting rather than quietly stalling.',
    'Each job carries the mechanic who started and finished it, tied to a real employee record.',
  ],
};
