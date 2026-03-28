import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../hooks/useScrollReveal'

type Category = {
  name: string
  items: { name: string; detail: string }[]
}

const categories: Category[] = [
  {
    name: 'Languages',
    items: [
      { name: 'TypeScript', detail: 'Strict mode, decorators, generics' },
      { name: 'JavaScript', detail: 'ES2022+' },
      { name: 'Python', detail: 'Scripting, Lambda, automation' },
      { name: 'C# / .NET', detail: 'ASP.NET Core APIs' },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'NestJS', detail: 'Modules, guards, pipes, DI' },
      { name: 'Node.js / Express', detail: 'Middleware, streaming' },
      { name: 'Bun', detail: 'Fast JS runtime' },
      { name: 'Deno', detail: 'Secure runtime, built-in TS' },
      { name: 'REST API', detail: 'Resource design, versioning' },
      { name: 'GraphQL', detail: 'Apollo Server, subscriptions' },
      { name: 'WebSockets', detail: 'Real-time via Socket.io' },
      { name: 'Microservices', detail: 'Event-driven, message queues' },
    ],
  },
  {
    name: 'Frontend',
    items: [
      { name: 'React', detail: 'Hooks, context, custom hooks' },
      { name: 'Next.js', detail: 'SSR, SSG, App Router' },
      { name: 'Vite.js', detail: 'Fast dev server, optimized builds' },
      { name: 'Tailwind CSS', detail: 'Utility-first CSS' },
    ],
  },
  {
    name: 'Mobile',
    items: [
      { name: 'React Native', detail: 'Cross-platform iOS & Android' },
      { name: 'Expo', detail: 'Managed workflow, OTA updates' },
    ],
  },
  {
    name: 'Databases',
    items: [
      { name: 'PostgreSQL', detail: 'Relations, indexes, transactions' },
      { name: 'MySQL', detail: 'Stored procedures, replication' },
      { name: 'MongoDB', detail: 'Aggregation pipelines' },
      { name: 'Redis', detail: 'Caching, pub/sub, sessions' },
      { name: 'DynamoDB', detail: 'Single-table design' },
      { name: 'Supabase', detail: 'Auth, storage, realtime' },
      { name: 'Firebase', detail: 'Firestore, Auth, Functions' },
    ],
  },
  {
    name: 'Cloud — AWS',
    items: [
      { name: 'Compute', detail: 'EC2 · Lambda · ECS · Fargate' },
      { name: 'Storage', detail: 'S3 · RDS · EBS · Glacier' },
      { name: 'Networking', detail: 'VPC · Route 53 · CloudFront' },
      { name: 'Auth & Security', detail: 'IAM · Cognito · KMS · WAF' },
      { name: 'Messaging', detail: 'SQS · SNS · EventBridge' },
      { name: 'Monitoring', detail: 'CloudWatch · X-Ray · CloudTrail' },
      { name: 'IaC & DevOps', detail: 'CDK · CloudFormation · CodePipeline' },
    ],
  },
  {
    name: 'DevOps',
    items: [
      { name: 'Docker', detail: 'Multi-stage builds, Compose' },
      { name: 'GitHub Actions', detail: 'CI/CD pipelines' },
      { name: 'TypeORM', detail: 'Entities, migrations, relations' },
      { name: 'Prisma', detail: 'Schema-first, type-safe queries' },
    ],
  },
  {
    name: 'Tools',
    items: [
      { name: 'Git', detail: 'Branching strategies, conventional commits' },
      { name: 'Clean Architecture', detail: 'SOLID, DDD, layered structure' },
      { name: 'Agile / Scrum', detail: 'Sprints, ceremonies, retros' },
      { name: 'Figma', detail: 'Design handoff, prototyping' },
      { name: 'Jira', detail: 'Sprint planning, issue tracking' },
      { name: 'Notion', detail: 'Documentation, wikis' },
    ],
  },
]

export default function TechStack() {
  const [active, setActive] = useState(0)

  return (
    <section id="stack" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            Tech Stack
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            What I{' '}
            <span className="bg-gradient-to-r from-accent to-gradient-end bg-clip-text text-transparent">
              work with
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-text-muted max-w-xl mx-auto">
            A snapshot of the tools and technologies across my career — not exhaustive, but representative.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActive(i)}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                  active === i
                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                    : 'text-text-muted hover:text-text bg-bg-card/50 hover:bg-bg-card border border-border'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
              >
                {categories[active].items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="group relative p-4 rounded-xl border border-border bg-bg-card/30 hover:bg-bg-card-hover hover:border-border-hover transition-all duration-300 cursor-default"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-gradient-end/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <h4 className="font-medium text-text text-sm">{item.name}</h4>
                      <p className="text-xs text-text-muted mt-1">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
