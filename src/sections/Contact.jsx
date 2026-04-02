import { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView } from 'framer-motion';
import emailjs from 'emailjs-com';
import toast, { Toaster } from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [controls, inView]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        publicKey
      );

      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Try again later.');
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="flex min-h-[70vh] items-center justify-center py-24"
    >
      <Toaster position="top-right" />
      <div className="w-full max-w-2xl rounded-3xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
        <h2 className="text-4xl font-bold text-center text-black dark:text-white mb-4">
          Get in <span className="text-blue-600 dark:text-blue-400">Touch</span>
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-center text-black dark:text-gray-300">
          Have an idea, a role, or a problem to solve? Send a message and I’ll get back to you as soon as I can.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6" ref={ref}>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <textarea
              name="message"
              placeholder="Type your message..."
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white shadow-inner min-h-[140px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div
            className="w-full"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loader border-white"></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </section>
  );
}
