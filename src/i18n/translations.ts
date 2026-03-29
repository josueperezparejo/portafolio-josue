// ---------------------------------------------------------------------------
// All portfolio content in English and Spanish.
// Technical proper nouns (NestJS, AWS, etc.) stay in English in both langs.
// ---------------------------------------------------------------------------

export type Lang = 'en' | 'es'

export const translations = {
  en: {
    nav: {
      links: [
        { label: 'About',      href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Stack',      href: '#stack' },
        { label: 'Certs',      href: '#certifications' },
      ],
      contact: 'Connect',
      toggleLang: 'ES',
    },

    hero: {
      badge:       'Open to collaborate',
      greeting:    "Hi, I'm",
      subtitle:    'Full-Stack Developer | Cloud Developer (AWS)',
      roles: [
        'Full-Stack Developer',
        'Cloud Developer (AWS)',
        'Problem Solver',
        'Passionate About Tech & Innovation',
        'NestJS · TypeScript · Next.js',
      ],
      description:
        'Full-Stack Software Engineer with experience building and delivering web applications end to end, from UI development to backend APIs and cloud deployments. I design scalable, secure, and cost-efficient architectures.',
      cta1:   'View my experience',
      cta2:   'Get in touch',
      scroll: 'Scroll',
      tags: ['Bogota, Colombia', 'AWS Cloud', 'Full-Stack', 'Innovation'],
    },

    about: {
      label: 'About me',
      h1:    'A bit more about',
      h2:    'who I am',
      bio1:
        "Full-Stack Software Engineer with experience building and delivering web applications end to end, from UI development to backend APIs and cloud deployments. I've worked with React/Next.js and TypeScript on the front end, and Node.js/Express with PostgreSQL/SQL (as well as GraphQL and WebSockets when needed) on the back end.",
      bio2:
        'I also focus on AWS cloud solutions, designing scalable, secure, and cost-efficient architectures. I enjoy collaborating with cross-functional teams, writing clean and maintainable code, and shipping features that improve performance, reliability, and the user experience.',
      quote:
        "I pay attention to the small details — the ones most people skip over. I believe that's where the real quality lives, whether it's in code, communication, or how you treat the people you work with.",
      highlights: [
        { title: 'Full-Stack Developer',  desc: 'From UI to backend APIs and cloud deployments — end to end experience' },
        { title: 'Cloud — AWS',           desc: 'EC2, S3, IAM, RDS, Lambda, Serverless, CI/CD pipelines' },
        { title: 'AI & System Design',    desc: 'Clean architecture, scalable and cost-efficient solutions' },
        { title: 'Team Leadership',       desc: 'Cross-functional collaboration, writing clean and maintainable code' },
        { title: 'Quality First',         desc: 'SOLID, DRY, unit testing with Jest, Cypress, Playwright' },
        { title: 'Innovation',            desc: 'Shipping features that improve performance, reliability, and UX' },
      ],
    },

    experience: {
      label: 'Experience',
      h1:    "Where I've",
      h2:    'worked',
      jobs: [
        {
          title:    'Full-Stack Developer | Cloud Solutions Architect (AWS)',
          company:  'Terrawind Global Protection',
          period:   '2025 — 2026',
          location: 'Colombia',
          bullets: [
            'Continued delivering scalable AWS cloud solutions and backend services for ongoing projects.',
            'Built and maintained APIs with Node.js, Express, and PostgreSQL, collaborating with cross-functional teams.',
            'Worked with partner companies, including Arkho (AWS Partner), collaborating on cloud solutions and API development.',
          ],
          tags: ['AWS', 'Node.js', 'Express', 'PostgreSQL', 'Cloud Architecture'],
        },
        {
          title:    'Full-Stack Developer | Cloud Solutions Architect (AWS)',
          company:  'Mainsoft',
          period:   '2025 — 2026',
          location: 'Colombia',
          bullets: [
            'Worked as a consultant for Terrawind, delivering cloud-native AWS solutions for enterprise clients.',
            'Designed scalable and secure architectures aligned with business and operational requirements.',
            'Led end-to-end delivery (requirements, architecture, implementation), optimizing performance and cost.',
          ],
          tags: ['AWS', 'Cloud-Native', 'Architecture', 'Consulting', 'Enterprise'],
        },
        {
          title:    'Front-End Developer',
          company:  'MUTA',
          period:   '2024 — 2025',
          location: 'Colombia',
          bullets: [
            'Built scalable and responsive user interfaces using Next.js, React, TypeScript, and Tailwind CSS, integrating APIs with React Query and managing state with Redux Toolkit.',
            'Translated Figma designs into clean, reusable components, improving maintainability by applying SOLID, DRY, and Clean Architecture principles, and adding unit tests with Jest.',
          ],
          tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Jest'],
        },
        {
          title:    'Back-End Developer',
          company:  'Horus Smart Energy',
          period:   '2024',
          location: 'Barranquilla, Colombia',
          bullets: [
            'Developed and maintained REST and GraphQL APIs for an IoT platform using Node.js, Express, and PostgreSQL, implementing new features and enhancing business logic with a focus on performance and scalability.',
            'Worked with AWS services and backend best practices (clean code, testing, and monitoring) to ensure reliable production deployments and strong collaboration with front-end and product teams.',
          ],
          tags: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Docker', 'AWS', 'IoT'],
        },
        {
          title:    'Front-End Developer',
          company:  'Vini App S.A.S.',
          period:   '2023',
          location: 'Barranquilla, Colombia',
          bullets: [
            'Implemented new features and pages based on Figma design specifications, ensuring responsive layouts and consistent UI behavior across devices.',
            'Managed tasks independently, from requirements through QA, delivering improvements efficiently with a proactive and autonomous approach.',
          ],
          tags: ['React', 'Figma', 'E-commerce', 'UX/UI', 'Responsive'],
        },
        {
          title:    'Front-End Developer',
          company:  'Genomax Nexus Information Technologies S.A.S.',
          period:   '2022',
          location: 'Barranquilla, Colombia',
          bullets: [
            'Collaborated with a development team to build user interfaces using HTML, CSS, and JavaScript, transforming concepts into production-ready screens.',
            'Improved performance, usability, and cross-browser compatibility, contributing to a smoother and more maintainable front-end experience.',
          ],
          tags: ['HTML', 'CSS', 'JavaScript', 'Performance', 'Cross-browser'],
        },
        {
          title:      'Aeronautical Firefighter — Military Service',
          company:    'Colombian Air Force (CACOM 3)',
          period:     'Apr 2017 — Apr 2018',
          location:   'Colombia',
          bullets: [
            'Served as an aeronautical firefighter. Responsibilities included flight assistance, ground coordination, fuel supply operations, and emergency response.',
            'Also supported operations at Ernesto Cortissoz International Airport in Barranquilla.',
          ],
          tags:       ['Leadership', 'Pressure', 'Operations', 'Safety'],
          isMilitary: true,
        },
      ],
    },

    techstack: {
      label:       'Technical Skills',
      h1:          'What I',
      h2:          'work with',
      description: 'Technologies I use across frontend, backend, cloud, and DevOps — from development to production.',
      categories: [
        {
          name: 'Frontend',
          items: [
            { name: 'React',           detail: 'Hooks, context, React Query, custom hooks' },
            { name: 'Next.js',         detail: 'SSR, SSG, App Router, API routes' },
            { name: 'TypeScript',      detail: 'Strict mode, decorators, generics' },
            { name: 'JavaScript',      detail: 'ES6+ / ES2022+' },
            { name: 'HTML5 / CSS3',    detail: 'Semantic markup, animations, responsive' },
            { name: 'Tailwind CSS',    detail: 'Utility-first, component patterns' },
            { name: 'Redux Toolkit',   detail: 'State management, RTK Query' },
            { name: 'Vite.js',         detail: 'Fast dev server, optimized builds' },
          ],
        },
        {
          name: 'Backend',
          items: [
            { name: 'Node.js / Express', detail: 'REST APIs, middleware, streaming' },
            { name: 'NestJS',            detail: 'Modules, guards, pipes, DI' },
            { name: 'REST APIs',         detail: 'Resource design, versioning, best practices' },
            { name: 'GraphQL',           detail: 'Apollo Server, resolvers, subscriptions' },
            { name: 'WebSockets',        detail: 'Real-time features via Socket.io' },
            { name: 'Microservices',     detail: 'Event-driven, message queues' },
          ],
        },
        {
          name: 'Mobile',
          items: [
            { name: 'React Native',   detail: 'Cross-platform iOS & Android' },
            { name: 'Expo',           detail: 'Managed workflow, OTA updates' },
            { name: 'Android Studio', detail: 'Native Android development' },
          ],
        },
        {
          name: 'Databases',
          items: [
            { name: 'PostgreSQL', detail: 'Relations, indexes, transactions, views' },
            { name: 'SQL',        detail: 'Complex queries, stored procedures' },
            { name: 'MySQL',      detail: 'Stored procedures, replication' },
            { name: 'MongoDB',    detail: 'Aggregation pipelines, Mongoose' },
            { name: 'DynamoDB',   detail: 'Single-table design, on-demand scaling' },
            { name: 'Redis',      detail: 'Caching, pub/sub, sessions' },
            { name: 'Supabase',   detail: 'Auth, storage, realtime' },
            { name: 'Firebase',   detail: 'Firestore, Auth, Cloud Functions' },
          ],
        },
        {
          name: 'Cloud & DevOps',
          items: [
            { name: 'EC2',            detail: 'Compute instances, auto-scaling' },
            { name: 'S3',             detail: 'Object storage, static assets, uploads' },
            { name: 'IAM',            detail: 'Identity management, policies, roles' },
            { name: 'RDS',            detail: 'Managed relational databases' },
            { name: 'Lambda',         detail: 'Serverless functions, event-driven' },
            { name: 'Serverless',     detail: 'Cost-efficient, auto-scaling architecture' },
            { name: 'Docker',         detail: 'Multi-stage builds, Compose' },
            { name: 'CI/CD Pipelines',detail: 'GitHub Actions, automated deployments' },
          ],
        },
        {
          name: 'Testing',
          items: [
            { name: 'Jest',           detail: 'Unit tests, mocking, coverage' },
            { name: 'Cypress',        detail: 'E2E testing, component testing' },
            { name: 'Playwright',     detail: 'Cross-browser E2E automation' },
            { name: 'React Testing',  detail: 'Testing Library, component tests' },
          ],
        },
        {
          name: 'Tools',
          items: [
            { name: 'Git / GitHub',         detail: 'Branching strategies, conventional commits' },
            { name: 'Clean Architecture',   detail: 'SOLID, DRY, DDD, layered structure' },
            { name: 'Figma',                detail: 'Design handoff, prototyping' },
            { name: 'Agile / Scrum',        detail: 'Sprints, ceremonies, retros' },
            { name: 'TypeORM',              detail: 'Entities, migrations, relations' },
            { name: 'Prisma',               detail: 'Schema-first, type-safe queries' },
          ],
        },
      ],
    },

    certifications: {
      label:       'Certifications & Skills',
      h1:          'Always',
      h2:          'learning',
      certsTitle:  'Certifications & Training',
      skillsTitle: 'Key Skills',
      inProgress:  'In Progress',
      certs: [
        { name: 'AWS Certified Cloud Practitioner',                                       source: 'AWS Skill Builder', inProgress: true },
        { name: 'Cloud Practitioner Essentials',                                          source: 'AWS Skill Builder' },
        { name: 'Cloud Quest: Cloud Practitioner',                                        source: 'AWS Skill Builder' },
        { name: 'Claude Code in Action',                                                  source: 'Anthropic' },
        { name: 'Backend: Node.js, SQL/PostgreSQL, PHP & MySQL',                          source: 'Udemy' },
        { name: 'Frontend: JavaScript (ES7+), React (Hooks/MERN), Next.js, React Testing',source: 'Udemy' },
        { name: 'Mobile: React Native (iOS/Android)',                                     source: 'Udemy' },
      ],
      skills: [
        'Amazon Web Services (AWS)', 'TypeScript', 'NestJS', 'Next.js',
        'React / React Native', 'Node.js / Express', 'GraphQL', 'WebSockets',
        'PostgreSQL / SQL', 'DynamoDB / NoSQL', 'Docker', 'Serverless',
        'CI/CD Pipelines', 'Git / GitHub', 'Tailwind CSS', 'Jest / Cypress / Playwright',
        'Artificial Intelligence', 'Team Leadership',
      ],
    },

    education: {
      label: 'Education',
      h1:    'Professional',
      h2:    'studies',
      items: [
        { degree: 'Audiovisual Communication',                institution: 'Universidad Autonoma del Caribe',            year: '2022', field: 'Audiovisual Communicator' },
        { degree: 'Multimedia Production Technologist',       institution: 'Servicio Nacional de Aprendizaje SENA',       year: '2021', field: 'Multimedia Production — Audiovisual Communication' },
        { degree: 'Computer Equipment Maintenance Technician',institution: 'Servicio Nacional de Aprendizaje SENA',       year: '2014', field: 'Computer Equipment Maintenance Technician' },
      ],
    },

    connect: {
      label:       'Connect',
      h1:          "Let's",
      h2:          'work together',
      description: 'Always open to interesting projects and collaborations. Feel free to reach out through any of these channels.',
      whatsappMsg: "Hi! I'm reaching out after seeing your portfolio. I'd love to connect and discuss a potential collaboration.",
      emailSubject: 'Contact from portfolio',
      emailBody:    "Hi Josue,\n\nI found your portfolio and wanted to reach out.\n\n",
      form: {
        name:        { label: 'Name',    placeholder: 'John Doe' },
        email:       { label: 'Email',   placeholder: 'john@example.com' },
        subject:     { label: 'Subject', placeholder: 'Project proposal, collaboration...' },
        message:     { label: 'Message', placeholder: 'Tell me about your project or idea...' },
        submit:      'Send message',
        submitting:  'Sending...',
        success: {
          title:   'Message sent!',
          message: "Thanks for reaching out. I'll get back to you soon.",
        },
        errors: {
          nameRequired:    'Name is required.',
          emailRequired:   'Email is required.',
          emailInvalid:    'Enter a valid email address.',
          subjectRequired: 'Subject is required.',
          messageRequired: 'Message is required.',
          messageTooShort: 'Message must be at least 20 characters.',
        },
      },
    },

    footer: {
      built: 'Built with Love ❤️',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SPANISH
  // ─────────────────────────────────────────────────────────────────────────
  es: {
    nav: {
      links: [
        { label: 'Sobre mí',    href: '#about' },
        { label: 'Experiencia', href: '#experience' },
        { label: 'Stack',       href: '#stack' },
        { label: 'Certs',       href: '#certifications' },
      ],
      contact: 'Connect',
      toggleLang: 'EN',
    },

    hero: {
      badge:       'Disponible para colaborar',
      greeting:    'Hola, soy',
      subtitle:    'Desarrollador Full-Stack | Cloud Developer (AWS)',
      roles: [
        'Desarrollador Full-Stack',
        'Cloud Developer (AWS)',
        'Solucionador de Problemas',
        'Apasionado por la Tecnología e Innovación',
        'NestJS · TypeScript · Next.js',
      ],
      description:
        'Ingeniero de Software Full-Stack con experiencia construyendo y entregando aplicaciones web de extremo a extremo, desde el desarrollo de interfaces hasta APIs backend y despliegues en la nube. Diseño arquitecturas escalables, seguras y rentables.',
      cta1:   'Ver mi experiencia',
      cta2:   'Contáctame',
      scroll: 'Desplazar',
      tags: ['Bogotá, Colombia', 'AWS Cloud', 'Full-Stack', 'Innovación'],
    },

    about: {
      label: 'Sobre mí',
      h1:    'Un poco más sobre',
      h2:    'quién soy',
      bio1:
        'Ingeniero de Software Full-Stack con experiencia construyendo y entregando aplicaciones web de extremo a extremo, desde el desarrollo de interfaces hasta APIs backend y despliegues en la nube. He trabajado con React/Next.js y TypeScript en el frontend, y Node.js/Express con PostgreSQL/SQL (así como GraphQL y WebSockets cuando se necesitan) en el backend.',
      bio2:
        'También me enfoco en soluciones cloud con AWS, diseñando arquitecturas escalables, seguras y rentables. Disfruto colaborar con equipos multifuncionales, escribir código limpio y mantenible, y lanzar funcionalidades que mejoran el rendimiento, la fiabilidad y la experiencia de usuario.',
      quote:
        'Presto atención a los pequeños detalles — los que la mayoría pasa por alto. Creo que ahí es donde vive la verdadera calidad, ya sea en el código, en la comunicación o en cómo tratas a las personas con quienes trabajas.',
      highlights: [
        { title: 'Desarrollador Full-Stack', desc: 'Desde la UI hasta APIs backend y despliegues en la nube — experiencia de extremo a extremo' },
        { title: 'Cloud — AWS',              desc: 'EC2, S3, IAM, RDS, Lambda, Serverless, pipelines CI/CD' },
        { title: 'IA & Diseño de Sistemas',  desc: 'Arquitectura limpia, soluciones escalables y rentables' },
        { title: 'Liderazgo de Equipos',     desc: 'Colaboración multifuncional, código limpio y mantenible' },
        { title: 'Calidad Primero',          desc: 'SOLID, DRY, pruebas unitarias con Jest, Cypress, Playwright' },
        { title: 'Innovación',               desc: 'Lanzar funcionalidades que mejoran rendimiento, fiabilidad y UX' },
      ],
    },

    experience: {
      label: 'Experiencia',
      h1:    'Dónde he',
      h2:    'trabajado',
      jobs: [
        {
          title:    'Desarrollador Full-Stack | Arquitecto de Soluciones Cloud (AWS)',
          company:  'Terrawind Global Protection',
          period:   '2025 — 2026',
          location: 'Colombia',
          bullets: [
            'Continué entregando soluciones cloud escalables en AWS y servicios backend para proyectos en curso.',
            'Construí y mantuve APIs con Node.js, Express y PostgreSQL, colaborando con equipos multifuncionales.',
            'Trabajé con empresas asociadas, incluyendo Arkho (AWS Partner), colaborando en soluciones cloud y desarrollo de APIs.',
          ],
          tags: ['AWS', 'Node.js', 'Express', 'PostgreSQL', 'Cloud Architecture'],
        },
        {
          title:    'Desarrollador Full-Stack | Arquitecto de Soluciones Cloud (AWS)',
          company:  'Mainsoft',
          period:   '2025 — 2026',
          location: 'Colombia',
          bullets: [
            'Trabajé como consultor para Terrawind, entregando soluciones cloud-native en AWS para clientes empresariales.',
            'Diseñé arquitecturas escalables y seguras alineadas con los requisitos del negocio y operacionales.',
            'Lideré la entrega de extremo a extremo (requisitos, arquitectura, implementación), optimizando rendimiento y costos.',
          ],
          tags: ['AWS', 'Cloud-Native', 'Architecture', 'Consulting', 'Enterprise'],
        },
        {
          title:    'Desarrollador Front-End',
          company:  'MUTA',
          period:   '2024 — 2025',
          location: 'Colombia',
          bullets: [
            'Construí interfaces de usuario escalables y responsivas usando Next.js, React, TypeScript y Tailwind CSS, integrando APIs con React Query y gestionando el estado con Redux Toolkit.',
            'Traduje diseños de Figma en componentes limpios y reutilizables, mejorando el mantenimiento aplicando principios SOLID, DRY y Clean Architecture, y añadiendo pruebas unitarias con Jest.',
          ],
          tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Jest'],
        },
        {
          title:    'Desarrollador Back-End',
          company:  'Horus Smart Energy',
          period:   '2024',
          location: 'Barranquilla, Colombia',
          bullets: [
            'Desarrollé y mantuve APIs REST y GraphQL para una plataforma IoT usando Node.js, Express y PostgreSQL, implementando nuevas funcionalidades y mejorando la lógica de negocio con enfoque en rendimiento y escalabilidad.',
            'Trabajé con servicios AWS y buenas prácticas de backend (código limpio, testing y monitoreo) para garantizar despliegues confiables en producción y una sólida colaboración con equipos de frontend y producto.',
          ],
          tags: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Docker', 'AWS', 'IoT'],
        },
        {
          title:    'Desarrollador Front-End',
          company:  'Vini App S.A.S.',
          period:   '2023',
          location: 'Barranquilla, Colombia',
          bullets: [
            'Implementé nuevas funcionalidades y páginas basadas en especificaciones de diseño en Figma, asegurando layouts responsivos y comportamiento de UI consistente en todos los dispositivos.',
            'Gestioné tareas de forma independiente, desde los requisitos hasta el QA, entregando mejoras de manera eficiente con un enfoque proactivo y autónomo.',
          ],
          tags: ['React', 'Figma', 'E-commerce', 'UX/UI', 'Responsive'],
        },
        {
          title:    'Desarrollador Front-End',
          company:  'Genomax Nexus Information Technologies S.A.S.',
          period:   '2022',
          location: 'Barranquilla, Colombia',
          bullets: [
            'Colaboré con un equipo de desarrollo para construir interfaces de usuario usando HTML, CSS y JavaScript, transformando conceptos en pantallas listas para producción.',
            'Mejoré el rendimiento, la usabilidad y la compatibilidad entre navegadores, contribuyendo a una experiencia frontend más fluida y mantenible.',
          ],
          tags: ['HTML', 'CSS', 'JavaScript', 'Performance', 'Cross-browser'],
        },
        {
          title:      'Bombero Aeronáutico — Servicio Militar',
          company:    'Fuerza Aérea Colombiana (CACOM 3)',
          period:     'Abr 2017 — Abr 2018',
          location:   'Colombia',
          bullets: [
            'Desempeñé el rol de bombero aeronáutico. Responsabilidades: asistencia en vuelo, coordinación en tierra, operaciones de suministro de combustible y respuesta a emergencias.',
            'También apoyé operaciones en el Aeropuerto Internacional Ernesto Cortissoz en Barranquilla.',
          ],
          tags:       ['Liderazgo', 'Presión', 'Operaciones', 'Seguridad'],
          isMilitary: true,
        },
      ],
    },

    techstack: {
      label:       'Habilidades Técnicas',
      h1:          'Con lo que',
      h2:          'trabajo',
      description: 'Tecnologías que uso en frontend, backend, cloud y DevOps — desde el desarrollo hasta producción.',
      categories: [
        {
          name: 'Frontend',
          items: [
            { name: 'React',           detail: 'Hooks, contexto, React Query, hooks personalizados' },
            { name: 'Next.js',         detail: 'SSR, SSG, App Router, rutas API' },
            { name: 'TypeScript',      detail: 'Modo estricto, decoradores, genéricos' },
            { name: 'JavaScript',      detail: 'ES6+ / ES2022+' },
            { name: 'HTML5 / CSS3',    detail: 'Marcado semántico, animaciones, responsivo' },
            { name: 'Tailwind CSS',    detail: 'Utility-first, patrones de componentes' },
            { name: 'Redux Toolkit',   detail: 'Gestión de estado, RTK Query' },
            { name: 'Vite.js',         detail: 'Servidor de dev rápido, builds optimizados' },
          ],
        },
        {
          name: 'Backend',
          items: [
            { name: 'Node.js / Express', detail: 'APIs REST, middleware, streaming' },
            { name: 'NestJS',            detail: 'Módulos, guards, pipes, inyección de dependencias' },
            { name: 'REST APIs',         detail: 'Diseño de recursos, versionado, buenas prácticas' },
            { name: 'GraphQL',           detail: 'Apollo Server, resolvers, suscripciones' },
            { name: 'WebSockets',        detail: 'Funcionalidades en tiempo real vía Socket.io' },
            { name: 'Microservicios',    detail: 'Event-driven, colas de mensajes' },
          ],
        },
        {
          name: 'Mobile',
          items: [
            { name: 'React Native',   detail: 'Multiplataforma iOS y Android' },
            { name: 'Expo',           detail: 'Managed workflow, actualizaciones OTA' },
            { name: 'Android Studio', detail: 'Desarrollo nativo Android' },
          ],
        },
        {
          name: 'Bases de Datos',
          items: [
            { name: 'PostgreSQL', detail: 'Relaciones, índices, transacciones, vistas' },
            { name: 'SQL',        detail: 'Consultas complejas, procedimientos almacenados' },
            { name: 'MySQL',      detail: 'Procedimientos almacenados, replicación' },
            { name: 'MongoDB',    detail: 'Pipelines de agregación, Mongoose' },
            { name: 'DynamoDB',   detail: 'Diseño single-table, escalado on-demand' },
            { name: 'Redis',      detail: 'Caché, pub/sub, sesiones' },
            { name: 'Supabase',   detail: 'Auth, almacenamiento, tiempo real' },
            { name: 'Firebase',   detail: 'Firestore, Auth, Cloud Functions' },
          ],
        },
        {
          name: 'Cloud & DevOps',
          items: [
            { name: 'EC2',             detail: 'Instancias de cómputo, auto-scaling' },
            { name: 'S3',              detail: 'Almacenamiento de objetos, assets estáticos' },
            { name: 'IAM',             detail: 'Gestión de identidades, políticas, roles' },
            { name: 'RDS',             detail: 'Bases de datos relacionales gestionadas' },
            { name: 'Lambda',          detail: 'Funciones serverless, event-driven' },
            { name: 'Serverless',      detail: 'Arquitectura rentable, auto-escalable' },
            { name: 'Docker',          detail: 'Builds multi-etapa, Compose' },
            { name: 'CI/CD Pipelines', detail: 'GitHub Actions, despliegues automatizados' },
          ],
        },
        {
          name: 'Pruebas',
          items: [
            { name: 'Jest',          detail: 'Pruebas unitarias, mocking, cobertura' },
            { name: 'Cypress',       detail: 'Pruebas E2E, pruebas de componentes' },
            { name: 'Playwright',    detail: 'Automatización E2E multi-navegador' },
            { name: 'React Testing', detail: 'Testing Library, pruebas de componentes' },
          ],
        },
        {
          name: 'Herramientas',
          items: [
            { name: 'Git / GitHub',         detail: 'Estrategias de ramas, commits convencionales' },
            { name: 'Clean Architecture',   detail: 'SOLID, DRY, DDD, estructura en capas' },
            { name: 'Figma',                detail: 'Entrega de diseños, prototipado' },
            { name: 'Agile / Scrum',        detail: 'Sprints, ceremonias, retrospectivas' },
            { name: 'TypeORM',              detail: 'Entidades, migraciones, relaciones' },
            { name: 'Prisma',               detail: 'Schema-first, consultas tipadas' },
          ],
        },
      ],
    },

    certifications: {
      label:       'Certificaciones y Habilidades',
      h1:          'Siempre',
      h2:          'aprendiendo',
      certsTitle:  'Certificaciones y Formación',
      skillsTitle: 'Habilidades Clave',
      inProgress:  'En Progreso',
      certs: [
        { name: 'AWS Certified Cloud Practitioner',                                        source: 'AWS Skill Builder', inProgress: true },
        { name: 'Cloud Practitioner Essentials',                                           source: 'AWS Skill Builder' },
        { name: 'Cloud Quest: Cloud Practitioner',                                         source: 'AWS Skill Builder' },
        { name: 'Claude Code en Acción',                                                   source: 'Anthropic' },
        { name: 'Backend: Node.js, SQL/PostgreSQL, PHP y MySQL',                           source: 'Udemy' },
        { name: 'Frontend: JavaScript (ES7+), React (Hooks/MERN), Next.js, React Testing', source: 'Udemy' },
        { name: 'Mobile: React Native (iOS/Android)',                                      source: 'Udemy' },
      ],
      skills: [
        'Amazon Web Services (AWS)', 'TypeScript', 'NestJS', 'Next.js',
        'React / React Native', 'Node.js / Express', 'GraphQL', 'WebSockets',
        'PostgreSQL / SQL', 'DynamoDB / NoSQL', 'Docker', 'Serverless',
        'Pipelines CI/CD', 'Git / GitHub', 'Tailwind CSS', 'Jest / Cypress / Playwright',
        'Inteligencia Artificial', 'Liderazgo de Equipos',
      ],
    },

    education: {
      label: 'Educación',
      h1:    'Estudios',
      h2:    'profesionales',
      items: [
        { degree: 'Comunicación Audiovisual',                     institution: 'Universidad Autónoma del Caribe',       year: '2022', field: 'Comunicador Audiovisual' },
        { degree: 'Tecnólogo en Producción Multimedia',           institution: 'Servicio Nacional de Aprendizaje SENA', year: '2021', field: 'Producción de Multimedia — Comunicación Audiovisual' },
        { degree: 'Técnico en Mantenimiento de Equipos de Cómputo', institution: 'Servicio Nacional de Aprendizaje SENA', year: '2014', field: 'Técnico en Mantenimiento de Equipos de Cómputo' },
      ],
    },

    connect: {
      label:       'Conectar',
      h1:          'Trabajemos',
      h2:          'juntos',
      description: 'Siempre abierto a proyectos interesantes y colaboraciones. No dudes en contactarme por cualquiera de estos canales.',
      whatsappMsg: '¡Hola Josue! He visto tu portafolio y me gustaría conversar sobre una posible colaboración.',
      emailSubject: 'Contacto desde tu portafolio',
      emailBody:    'Hola Josue,\n\nEncontré tu portafolio y quería escribirte.\n\n',
      form: {
        name:        { label: 'Nombre',  placeholder: 'Juan García' },
        email:       { label: 'Correo',  placeholder: 'juan@ejemplo.com' },
        subject:     { label: 'Asunto',  placeholder: 'Propuesta de proyecto, colaboración...' },
        message:     { label: 'Mensaje', placeholder: 'Cuéntame sobre tu proyecto o idea...' },
        submit:      'Enviar mensaje',
        submitting:  'Enviando...',
        success: {
          title:   '¡Mensaje enviado!',
          message: 'Gracias por escribirme. Te responderé pronto.',
        },
        errors: {
          nameRequired:    'El nombre es requerido.',
          emailRequired:   'El correo es requerido.',
          emailInvalid:    'Ingresa un correo válido.',
          subjectRequired: 'El asunto es requerido.',
          messageRequired: 'El mensaje es requerido.',
          messageTooShort: 'El mensaje debe tener al menos 20 caracteres.',
        },
      },
    },

    footer: {
      built: 'Hecho con Amor ❤️',
    },
  },
} as const

export type Translations = typeof translations.en
