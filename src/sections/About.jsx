// import { Bot, Code2, LayoutPanelTop, Sparkles } from 'lucide-react';
// // eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';

// export default function About() {
//   return (
//     <section id="about" className="px-4 py-20 text-gray-800 dark:text-white">
//       <div className="mx-auto max-w-7xl">
//         <motion.h2
//           className="text-center text-4xl font-extrabold"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           About <span className="text-blue-500">Me</span>
//         </motion.h2>

//         <p className="mx-auto mt-4 max-w-2xl text-center text-base text-gray-600 dark:text-gray-300">
//           I combine backend engineering with thoughtful UI/UX. My goal is simple: ship interfaces that feel
//           effortless and systems that stay reliable as your product grows.
//         </p>

//         <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm sm:p-10">
//           <div className="flex w-full flex-col items-center gap-12 lg:flex-row">
//             <motion.div
//               className="flex h-64 w-64 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-purple-700 shadow-2xl"
//               initial={{ opacity: 0, x: -40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.7 }}
//               viewport={{ once: false, amount: 0.3 }}
//             >
//               <img src="/Nikcartoonimg.png" alt="Nikhil Mali" className="h-full w-full object-contain" />
//             </motion.div>

//             <motion.div
//               className="w-full max-w-xl text-center"
//               initial={{ opacity: 0, x: 40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.7, delay: 0.2 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="mb-4 text-2xl font-bold">Hi, I'm Nikhil Mali 👋</h3>

//               <p className="mb-4 text-base leading-relaxed">
//                 I’m a <strong>Full Stack Developer</strong> focused on building end-to-end products—from REST APIs and
//                 dashboards to responsive interfaces that look great on every screen size.
//               </p>

//               <p className="mb-4 text-base leading-relaxed">
//                 On the backend, I work with <strong>Python</strong> and modern API practices to design services that are
//                 clean, secure, and easy to maintain. On the frontend, I bring those capabilities to life using{' '}
//                 <strong>React</strong>, component-driven UI, and smooth animations with <strong>Framer Motion</strong>.
//               </p>

//               <p className="mb-6 text-base text-gray-200/90">
//                 I enjoy experimenting with <strong>AI agents</strong> and practical automation workflows—because great
//                 software should save time and reduce repetitive work, not just be “cool”.
//               </p>

//               <div className="grid gap-3 sm:grid-cols-2">
//                 {[
//                   { icon: <LayoutPanelTop size={18} />, title: 'UI/UX', desc: 'Readable layouts + micro-interactions' },
//                   { icon: <Code2 size={18} />, title: 'Engineering', desc: 'APIs, dashboards, maintainable code' },
//                   { icon: <Bot size={18} />, title: 'Automation', desc: 'Agent ideas turned into workflows' },
//                   { icon: <Sparkles size={18} />, title: 'Polish', desc: 'Consistency, spacing, and performance' },
//                 ].map((item) => (
//                   <div
//                     key={item.title}
//                     className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-left"
//                   >
//                     <div className="mt-0.5 text-blue-300">{item.icon}</div>
//                     <div>
//                       <div className="text-sm font-bold text-white">{item.title}</div>
//                       <div className="text-sm text-gray-300">{item.desc}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           <motion.div
//             className="mt-10 grid gap-4 text-center sm:grid-cols-3 lg:grid-cols-5"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             {[
//               'REST APIs',
//               'React',
//               'Tailwind CSS',
//               'Node.js',
//               'PostgreSQL',
//               'Git & GitHub',
//               'Framer Motion',
//               'AI Agents',
//               'Performance',
//             ].map((tech) => (
//               <div
//                 key={tech}
//                 className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 shadow-sm"
//               >
//                 {tech}
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
