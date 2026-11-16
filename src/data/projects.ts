import type { PortfolioProject } from './types.ts'

/**
 * Case studies.
 *
 * Facts below were taken from the project source code (module/page structure,
 * dependencies and configuration). Nothing confidential — company names,
 * addresses, credentials or infrastructure details — is published.
 *
 * - `verified: true`  → you confirmed you built it; features come from the code.
 * - `verified: false` → shows a "Draft case study" notice until confirmed.
 * - `status`          → confirm deployment status for each project.
 * - `publish: false`  → hides a project everywhere.
 */
export const projects: PortfolioProject[] = [
  {
    slug: 'hris',
    kind: 'HR Platform',
    thumbnail: {
      src: '/thumbnail/hris-thumbnail.png',
    },
    title: 'Human Resource Information System',
    shortTitle: 'HRIS',
    category: 'Enterprise Systems · HR Technology',
    tags: ['enterprise-systems', 'backend-apis'],
    summary:
      'A human-resources platform covering the employee lifecycle — records, attendance, leave, evaluations, training and clinic — inside the Unified Portal.',
    challenge:
      'HR work spans dozens of connected processes. The HRIS brings records, attendance, leave routing and evaluations into one permission-aware system with a full activity trail.',
    status: 'internal',
    featured: true,
    publish: true,
    verified: true,
    visibility: 'private',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Laravel 12', 'Laravel Sanctum', 'Laravel Reverb', 'PostgreSQL'],
    technologiesVerified: true,
    overview:
      'An HR information system built as a module of the Unified Portal. It manages employee 201 files and the organizational structure, and runs day-to-day HR operations — from attendance and leave to evaluations, training, infractions and clinic records.',
    intendedUsers:
      'HR staff, department and farm heads who approve requests, top management, clinic staff, and employees using self-service.',
    problem:
      'HR processes — hiring, attendance, leave approvals, evaluations, clinic visits — touch every employee and many approvers. Spread across paper forms and spreadsheets, they are slow to route, hard to audit and difficult to report on.',
    role: ['Built the HRIS, including its React interface and Laravel REST API.'],
    solution:
      'One module with clearly separated areas — records and organization setup, time and attendance, leave with configurable routing, performance and development, clinic, and reporting — each gated by page-level access control.',
    modules: [
      {
        title: 'Employee records & 201 files',
        description: 'Employee lists, 201 file management, hiring, profile management, separation and data migration.',
      },
      {
        title: 'Organization setup',
        description: 'Companies, divisions, sections, farm sites, job structures and module leaders.',
      },
      {
        title: 'Attendance & biometrics',
        description: 'Attendance boards, biometric device setup, schedule changes and regularization.',
      },
      {
        title: 'Leave management',
        description: 'Leave filing with configurable types, terms and routing, a leave calendar and approval queues.',
      },
      {
        title: 'Performance & development',
        description: 'Evaluation templates and evaluations, training setup and records, infraction management.',
      },
      {
        title: 'Clinic',
        description: 'Clinic employee records, clinic inventory and return-to-work tracking.',
      },
      {
        title: 'Reports & engagement',
        description: 'Headcount and turnover reports, employee reports, announcements and surveys.',
      },
      {
        title: 'Access & audit',
        description: 'Administrator-managed page access and activity logs across the module.',
      },
    ],
    architecture: [
      { layer: 'Client', title: 'React module', detail: 'Vite, Tailwind CSS and TanStack Query' },
      { layer: 'API', title: 'Laravel 12', detail: 'REST endpoints for records, attendance and leave' },
      { layer: 'Auth', title: 'Laravel Sanctum', detail: 'Token auth plus page-level access' },
      { layer: 'Real-time', title: 'Laravel Reverb', detail: 'Live updates through Laravel Echo' },
      { layer: 'Data', title: 'PostgreSQL', detail: 'Relational HR and organization model' },
    ],
    challenges: [
      'Routing leave requests to the right approvers across companies, divisions, sections and farm sites.',
      'Integrating biometric attendance devices and reconciling logs with schedules, schedule changes and regularizations.',
      'Keeping a very large module navigable, with every page gated by permissions.',
    ],
    security: [
      'Token-based authentication with Laravel Sanctum.',
      'Page-level access control managed by administrators.',
      'Activity logs that record actions taken in the module.',
    ],
    outcomes: [
      'Employee records, attendance and leave managed in one system.',
      'Approvals routed and tracked digitally instead of on paper.',
      'Headcount, turnover and employee reports available on demand.',
    ],
    outcomesAreMeasured: false,
  },
  {
    slug: 'cictd-helpdesk',
    kind: 'IT Service Desk',
    thumbnail: {
      src: '/thumbnail/cictd-helpdesk-thumbnail.png',
    },
    title: 'CICTD Helpdesk',
    category: 'IT Service Management',
    tags: ['enterprise-systems', 'tools'],
    summary:
      'An IT service-management platform for requests, approvals, asset accountability and GPS fleet monitoring.',
    challenge:
      'IT work involves requests, approvals, assets and vendors that are easy to lose track of. The Helpdesk gives every request a type, an approval path, an assignee and a status.',
    status: 'internal',
    featured: true,
    publish: true,
    verified: true,
    visibility: 'private',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Laravel API', 'Laravel Reverb'],
    technologiesVerified: true,
    overview:
      'A request-management platform for the IT department. Staff submit requests by type, approvers review them, technicians work their assigned queues, and administrators manage service options, vendors, asset accountability and GPS-tracked vehicles.',
    intendedUsers: 'Employees submitting requests, approvers, IT technicians and helpdesk administrators.',
    problem:
      'When IT requests arrive by phone, chat or walk-up, it is hard to see what is outstanding, who approved it and who is responsible. Assets issued to employees and vehicles in the field add more to keep track of.',
    role: ['Built the Helpdesk module of the Unified Portal.'],
    solution:
      'Structured intake by request type, configurable approvers, dedicated queues for administrators and technicians, asset accountability with employee confirmations, and GPS monitoring for vehicles — in one module.',
    modules: [
      { title: 'Request intake', description: 'New requests by type, service options and specification advice.' },
      { title: 'Approvals', description: 'Approver setup, alignment and an approval inbox.' },
      { title: 'Work queues', description: 'Admin queue, assigned requests, a full request list and projects.' },
      { title: 'Self-service', description: 'My requests and my profile for every employee.' },
      { title: 'Asset accountability', description: 'Issued assets per employee, with handover confirmations.' },
      { title: 'Vendors & service fees', description: 'Vendor records and service fee setup.' },
      { title: 'GPS monitoring', description: 'GPS devices, vehicles, live monitoring and GPS reports.' },
      { title: 'Access & menus', description: 'Per-user access management and menu setup.' },
    ],
    architecture: [
      { layer: 'Client', title: 'React module', detail: 'Requester, approver, technician and admin views' },
      { layer: 'API', title: 'Laravel API', detail: 'Requests, approvals, assets and GPS data' },
      { layer: 'Real-time', title: 'Laravel Reverb', detail: 'Live updates through Laravel Echo' },
      { layer: 'Data', title: '[To verify]', detail: 'Requests, approvals, assets and vehicles' },
    ],
    challenges: [
      'Approval paths that vary by request type without becoming hard to maintain.',
      'Tracking asset accountability so that every handover is confirmed by the receiving employee.',
      'Bringing live GPS data and request work into one coherent interface.',
    ],
    security: [
      'Access and menu visibility managed per user.',
      'Approval steps recorded before work proceeds.',
      'Asset handovers confirmed by the receiving employee.',
    ],
    outcomes: [
      'Every request has a type, an approver, an owner and a status.',
      'Issued assets and their holders visible in one place.',
      'Vehicle locations monitored alongside IT operations.',
    ],
    outcomesAreMeasured: false,
  },
  {
    slug: 'it-core',
    kind: 'IT Operations Console',
    thumbnail: {
      src: '/thumbnail/cictd-core-thumbnail.png',
    },
    title: 'IT Core',
    category: 'IT Operations · Monitoring',
    tags: ['enterprise-systems', 'tools', 'hardware'],
    summary:
      'An IT operations console (CICTD Core) for inventory, consumables and live device, host, router and sensor monitoring.',
    challenge:
      'An IT department needs its equipment, stock and network health in one view. IT Core combines inventory management with live monitoring of routers, hosts and sensors.',
    status: 'internal',
    featured: true,
    publish: true,
    verified: true,
    visibility: 'private',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Laravel API', 'Laravel Reverb'],
    technologiesVerified: true,
    overview:
      'The IT team’s operations module in the Unified Portal. It tracks IT inventory and consumable stock, and monitors device status, hosts, routers and sensors, with reports for each.',
    intendedUsers: 'IT staff and the administrators responsible for equipment and network health.',
    problem:
      'Equipment records, consumable stock and network monitoring usually live in separate spreadsheets and tools, making it hard to answer simple questions: what do we have, what is running out, and what is down?',
    role: ['Built the IT Core module of the Unified Portal.'],
    solution:
      'One console with inventory and item setup, consumable stock with transactions and reports, and monitoring views for device status, hosts, routers and sensors.',
    modules: [
      { title: 'Inventory & items', description: 'Inventory, item setup and management, records and setup cards.' },
      { title: 'Consumables', description: 'Consumable inventory with stock transactions and reports.' },
      { title: 'Device status', description: 'Status overview of monitored devices.' },
      { title: 'Host & router monitoring', description: 'Monitoring views for hosts and network routers.' },
      { title: 'Sensors', description: 'Sensor list, sensor detail and sensor reports.' },
      { title: 'Page access', description: 'Administrator-managed access to each page.' },
    ],
    architecture: [
      { layer: 'Client', title: 'React module', detail: 'Inventory and monitoring dashboards' },
      { layer: 'API', title: 'Laravel API', detail: 'Inventory, stock and monitoring endpoints' },
      { layer: 'Real-time', title: 'Laravel Reverb', detail: 'Live updates through Laravel Echo' },
      { layer: 'Data', title: '[To verify]', detail: 'Items, stock transactions and sensor data' },
    ],
    challenges: [
      'Presenting live monitoring data so problems stand out at a glance.',
      'Modeling stock movements as transactions so consumable balances stay accurate.',
      'Serving both asset records and operational monitoring from one coherent module.',
    ],
    security: ['Page-level access for inventory and monitoring views.', 'Stock movements recorded as transactions.'],
    outcomes: [
      'Inventory, consumables and monitoring in a single console.',
      'Consumable usage visible through stock reports.',
    ],
    outcomesAreMeasured: false,
  },
  {
    slug: 'porktrack',
    kind: 'Production Tracker',
    thumbnail: {
      src: '/thumbnail/porktrack-thumbnail.png',
    },
    title: 'PorkTrack',
    category: 'Production Operations · Hardware Integration',
    tags: ['enterprise-systems', 'hardware'],
    summary:
      'A farm-to-sales operations system for pork production — farm, processing, chilling, storage and sales — with live weighing-scale integration.',
    challenge:
      'Product moves through many stages and every weight matters. PorkTrack tracks each stage and reads weighing scales in real time, producing barcodes, documents and reports along the way.',
    status: 'to-verify',
    featured: true,
    publish: true,
    verified: true,
    visibility: 'private',
    technologies: ['PHP', 'MySQL', 'Ratchet WebSockets', 'Serial scale integration', 'Dompdf', 'mPDF', 'PhpSpreadsheet', 'Barcode generation'],
    technologiesVerified: true,
    overview:
      'An operations platform that follows product across farm, plant processing, chilling, cold storage and sales. Weighing scales stream live readings into the browser, and the system produces barcodes, printable documents and spreadsheet reports.',
    intendedUsers: 'Farm and plant staff, storage and sales teams, and top management.',
    problem:
      'Product changes form at every stage of production, and weights drive inventory, pricing and records. Handwritten weighing logs and paper documents make accurate, timely numbers hard to keep.',
    role: ['Built PorkTrack, including the live scale integration, documents and reporting.'],
    solution:
      'Stage-specific modules for farm, plant processing, chilling, storage and sales, a top-management view, and a WebSocket bridge that streams scale readings straight to the browser.',
    modules: [
      { title: 'Farm', description: 'Farm-stage records and transactions.' },
      { title: 'Plant processing', description: 'Processing-stage operations and records.' },
      { title: 'Chilling', description: 'Chilled product handling and requests.' },
      { title: 'Cold storage', description: 'Storage inventory, movements and reports.' },
      { title: 'Sales & dispatch', description: 'Orders, approvals, stock requests, dispatch and delivery receipts.' },
      { title: 'Top management', description: 'An overview for management across stages.' },
      { title: 'Live scale integration', description: 'Scale weights read over a serial port and pushed live to browsers.' },
      { title: 'Barcodes, documents & reports', description: 'Product barcodes, PDF documents and Excel exports.' },
    ],
    architecture: [
      { layer: 'Hardware', title: 'Weighing scale', detail: 'Read over a serial (COM) port' },
      { layer: 'Real-time', title: 'Ratchet WebSockets', detail: 'Streams live weights to the browser' },
      { layer: 'App', title: 'PHP web application', detail: 'Farm, plant, storage and sales modules' },
      { layer: 'Data', title: 'MySQL', detail: 'Production, inventory and sales records' },
      { layer: 'Output', title: 'Documents', detail: 'Dompdf / mPDF, PhpSpreadsheet, barcodes' },
    ],
    challenges: [
      'Reading serial scale data reliably and pushing it live to several browsers at once.',
      'Modeling product as it changes form across farm, processing, chilling and storage.',
      'Generating print-ready documents — dispatch papers and delivery receipts — and product barcodes.',
    ],
    security: ['Tracking of failed sign-in attempts.', 'An approval step for orders before dispatch.'],
    outcomes: [
      'Weights captured directly from scales instead of handwritten logs.',
      'Product tracked across every production stage.',
      'Printable documents and Excel reports generated from system data.',
    ],
    outcomesAreMeasured: false,
  },
  {
    slug: 'id-generator',
    kind: 'ID Card Printing',
    thumbnail: {
      src: '/thumbnail/IDGENERATOR.png',
    },
    title: 'ID Generator',
    category: 'Enterprise Utilities',
    tags: ['tools'],
    summary: 'An ID card generation and printing tool with company branding, multiple ID types and a full print history.',
    challenge:
      'Producing consistent ID cards across companies is repetitive and error-prone. The ID Generator standardizes layouts per company and records every print.',
    status: 'internal',
    featured: true,
    publish: true,
    verified: true,
    visibility: 'private',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Laravel API'],
    technologiesVerified: true,
    overview:
      'A Unified Portal module for generating and printing identification cards. Company settings control branding and layout, additional ID types are supported, and every print job is logged.',
    intendedUsers: 'HR and administrative staff who issue IDs.',
    problem:
      'ID cards designed by hand drift in layout and branding, and reprints are hard to trace. Organizations with several companies multiply the problem.',
    role: ['Built the ID Generator module of the Unified Portal.'],
    solution:
      'Template-driven card layouts configured per company, support for other ID types beyond the standard card, and a print history for every job.',
    modules: [
      { title: 'ID printing', description: 'Generate and print ID cards from templates.' },
      { title: 'Other ID types', description: 'Additional ID formats beyond the standard card.' },
      { title: 'Company settings', description: 'Branding and layout settings per company.' },
      { title: 'Print history', description: 'A record of every print job.' },
    ],
    architecture: [
      { layer: 'Client', title: 'React module', detail: 'Card templates and print workflow' },
      { layer: 'Layout', title: 'Card layout engine', detail: 'Template-driven, print-accurate rendering' },
      { layer: 'API', title: 'Laravel API', detail: 'Company settings and print history' },
    ],
    challenges: [
      'Producing print-accurate card layouts from the browser.',
      'Supporting different branding for several companies from one tool.',
      'Keeping reprints traceable.',
    ],
    security: ['Print history as an audit trail for issued IDs.'],
    outcomes: ['Consistent, branded ID cards across companies.', 'A traceable record of every card printed.'],
    outcomesAreMeasured: false,
  },
  {
    slug: 'truck-scale',
    kind: 'Weighbridge System',
    thumbnail: {
      src: '/thumbnail/truck-scale-thumbnail.png',
      caption: 'Truck Scale System dashboard concept with demo data',
    },
    title: 'Truck Scale System',
    shortTitle: 'Truck Scale',
    category: 'Desktop Application · Hardware Integration',
    tags: ['hardware', 'tools'],
    summary: 'A Windows desktop truck scale (weighbridge) system for recording vehicle weights, built with C#, Windows Forms and MySQL.',
    challenge:
      'Weighbridge data has to be captured accurately and stored reliably. This desktop application records vehicle weights into a MySQL database.',
    status: 'to-verify',
    featured: true,
    publish: true,
    verified: false,
    visibility: 'private',
    technologies: ['C#', 'Windows Forms', 'MySQL'],
    technologiesVerified: true,
    overview:
      'A truck scale system built as a Windows desktop application with C# and Windows Forms, storing weighing records in MySQL. The full case study (workflow and integration details) is being written.',
    architecture: [
      { layer: 'Client', title: 'C# · Windows Forms', detail: 'Windows desktop application at the weighbridge' },
      { layer: 'Hardware', title: 'Truck scale', detail: 'Vehicle weights recorded by the system' },
      { layer: 'Data', title: 'MySQL', detail: 'Weighing records and transactions' },
    ],
  },
  {
    slug: 'official-business-management-system',
    kind: 'Trip Approvals',
    thumbnail: {
      src: '/thumbnail/obms-thumbnail.png',
    },
    title: 'Official Business Management System',
    shortTitle: 'OBMS',
    category: 'Workflow Automation · Location-Enabled',
    tags: ['enterprise-systems', 'tools'],
    summary: 'Official business trip management with live route maps, multi-step approvals, exit passes and reports.',
    challenge:
      'Approving official business needs trustworthy evidence. OBMS manages each trip from request to return, with live maps for reviewers and printable exit passes.',
    status: 'internal',
    featured: true,
    publish: true,
    verified: true,
    visibility: 'private',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Leaflet', 'Mapbox GL', 'Laravel API', 'Laravel Reverb'],
    technologiesVerified: true,
    overview:
      'A Unified Portal module for creating official business trips, following them on live maps, routing them through approval and producing exit passes and reports.',
    intendedUsers: 'Employees travelling on official business, their approvers and administrators.',
    problem:
      'Official business is often documented on paper after the fact, which makes it slow to approve and hard to verify. Reviewers need dependable evidence without the process becoming a burden for employees.',
    role: ['Built the OBMS module of the Unified Portal.'],
    solution:
      'Employees create and manage trips from a mobile-friendly interface; reviewers see live trip positions and route previews before approving; the system prints exit passes and produces reports.',
    modules: [
      { title: 'Trip requests', description: 'Create trips and edit requests before approval.' },
      { title: 'My trips & trip detail', description: 'Each employee’s trips with full detail.' },
      { title: 'Live maps', description: 'Live trip maps and route previews with Leaflet and Mapbox GL.' },
      { title: 'Approvals', description: 'An approval queue and detailed approval review.' },
      { title: 'Exit passes', description: 'Printable exit passes generated by the system.' },
      { title: 'Reports', description: 'Trip reports with drill-down detail.' },
      { title: 'Administration', description: 'Settings, alignment, access and menu setup.' },
    ],
    architecture: [
      { layer: 'Client', title: 'React module', detail: 'Mobile-friendly trip and review interfaces' },
      { layer: 'Maps', title: 'Leaflet · Mapbox GL', detail: 'Live trip positions and route previews' },
      { layer: 'API', title: 'Laravel API', detail: 'Trips, approvals and reports' },
      { layer: 'Real-time', title: 'Laravel Reverb', detail: 'Live updates through Laravel Echo' },
    ],
    challenges: [
      'Rendering live trip positions and routes clearly for reviewers.',
      'Multi-step approvals that stay understandable for employees and approvers alike.',
      'Capturing location only as much as the process needs.',
    ],
    security: ['Approval review before trips are finalized.', 'Access and menu visibility managed per user.'],
    outcomes: [
      'Trips documented as they happen rather than after the fact.',
      'Reviewers approve with live location context in front of them.',
    ],
    outcomesAreMeasured: false,
  },
  {
    slug: 'unified-enterprise-portal',
    kind: 'Single-Login Platform',
    title: 'Unified Enterprise Portal',
    category: 'Enterprise Web Platform',
    tags: ['enterprise-systems'],
    summary:
      'The single-login platform that hosts HRIS, Helpdesk, IT Core, ID Generator and OBMS — with shared access control and real-time features.',
    challenge:
      'Separate internal systems mean separate logins and inconsistent experiences. The portal puts every system behind one login, one access model and one design language.',
    status: 'internal',
    featured: false,
    publish: false, // Hidden from the site; set to true to show it again.
    verified: false,
    visibility: 'private',
    technologies: ['React 19', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Laravel Reverb', 'Capacitor (Android)', 'Vitest', 'Playwright'],
    technologiesVerified: true,
    overview:
      'A multi-system enterprise portal with one login and shared access control. It launches each business application, manages who can reach which pages, and provides platform-wide features like real-time presence and notifications. It is also packaged as an Android app with Capacitor.',
    intendedUsers: 'Every employee, plus administrators who manage application and page access.',
    problem:
      'As organizations add internal applications, each arrives with its own sign-in, navigation and account handling — slowing people down and making access harder to govern.',
    role: ['[Confirm your responsibilities on the platform itself]'],
    solution:
      'An application catalog behind a single sign-in, page-level permissions shared by every module, and a common component library so each system looks and behaves consistently.',
    modules: [
      { title: 'Single sign-in & app launcher', description: 'One login and an application catalog for every system.' },
      { title: 'Application & page access', description: 'Administrator-managed access to apps and individual pages.' },
      { title: 'Account security', description: 'Forced password changes, inactive-account handling and login logs.' },
      { title: 'Act-as sessions', description: 'Controlled sessions that let administrators troubleshoot as a user.' },
      { title: 'Real-time presence & notifications', description: 'Live presence and desktop notifications via Laravel Reverb.' },
      { title: 'Theming & announcements', description: 'Theme studio, seasonal themes and announcement slideshows.' },
    ],
    architecture: [
      { layer: 'Client', title: 'React 19 SPA', detail: 'Vite, Tailwind CSS, TanStack Query' },
      { layer: 'Mobile', title: 'Capacitor', detail: 'Android packaging of the same app' },
      { layer: 'API', title: 'Laravel API', detail: 'Auth, access control and application catalog' },
      { layer: 'Real-time', title: 'Laravel Reverb', detail: 'Presence and notifications via Echo' },
    ],
    challenges: [
      'An access model that every module shares without coupling them together.',
      'Keeping navigation and interaction patterns consistent across many modules.',
      'Delivering real-time presence and notifications across the whole platform.',
    ],
    security: [
      'Page-level permissions enforced through protected routes.',
      'Forced password changes, inactive-account handling and login logs.',
    ],
    outcomes: ['One entry point for every internal system.', 'A consistent UI foundation shared by all modules.'],
    outcomesAreMeasured: false,
  },
  {
    slug: 'payease-payroll-platform',
    kind: 'Payroll Backend',
    title: 'Payease Payroll Platform',
    category: 'Payroll · Backend Systems',
    tags: ['backend-apis'],
    summary:
      'A payroll initiative focused on maintainable backend architecture, careful domain modeling and dependable data processing.',
    challenge:
      'Payroll leaves no room for ambiguity. Payease is being designed around a modular API, explicit domain rules and transaction-safe processing.',
    status: 'in-development',
    featured: false,
    publish: false, // Hidden from the site; set to true to show it again.
    verified: false,
    visibility: 'private',
    technologies: ['Laravel', 'PHP', 'MySQL'],
    technologiesVerified: false,
    overview:
      'A payroll system initiative that emphasizes a modular backend architecture capable of processing payroll data reliably and remaining maintainable as rules change.',
    intendedUsers: 'Payroll and finance teams.',
    problem:
      'Payroll combines strict correctness requirements with rules that change over time. Systems that are not modeled carefully become difficult to audit, slow under volume and risky to modify.',
    role: ['[Confirm your responsibilities]'],
    solution:
      'A modular API organized around clear payroll entities, with validation at every boundary and processing designed to be safe, repeatable and auditable.',
    modules: [
      { title: 'Modular API architecture', description: 'Domain modules with clear boundaries and responsibilities.' },
      { title: 'Payroll entities & validation', description: 'Explicit models and validation rules for payroll data.' },
      { title: 'Auditability', description: 'Changes and processing runs that can be traced and explained.' },
    ],
    architecture: [
      { layer: 'API', title: 'Laravel', detail: 'Domain-organized modules and validation' },
      { layer: 'Processing', title: 'Batch-aware services', detail: 'Repeatable, transaction-safe payroll runs' },
      { layer: 'Data', title: 'MySQL', detail: 'Payroll entities with audit history' },
    ],
    challenges: [
      'Domain modeling that keeps payroll rules explicit rather than scattered through code.',
      'Transaction safety, so a failed run never leaves data half-processed.',
      'Performance-aware design for processing larger data volumes.',
    ],
    security: ['Sensitive compensation data restricted to authorized roles.', 'An audit trail for changes that affect pay.'],
    outcomes: ['Planned: a maintainable payroll backend foundation designed for auditability.'],
    outcomesAreMeasured: false,
  },
  {
    // Hidden until confirmed suitable to publish.
    slug: 'biometric-log-collection',
    title: 'Biometric Log Collection Utility',
    category: 'Enterprise Utilities',
    tags: ['tools'],
    summary: '[Describe the utility once confirmed suitable to publish]',
    challenge: '[Challenge → solution statement]',
    status: 'to-verify',
    featured: false,
    publish: false,
    verified: false,
    visibility: 'private',
    technologies: [],
    technologiesVerified: false,
    overview: '[Overview]',
  },
]
