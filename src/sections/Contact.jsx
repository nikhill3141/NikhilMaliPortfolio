import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView } from 'framer-motion';
import emailjs from 'emailjs-com';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Send } from 'lucide-react';

function SectionHeading({ subHeading, heading }) {
  return (
    <div>
      <p className="text-sm text-secondary">{subHeading}</p>
      <h2 className="text-2xl font-bold">{heading}</h2>
    </div>
  );
}

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
    <section id="contact" className="sleek-section">
      <Toaster position="top-right" />
      <SectionHeading subHeading="Contact" heading="Get in touch" />

      <div className="sleek-card mt-8 border-dashed p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-secondary">
            Have an idea, a role, or a product problem to solve? Send a message and I will
            reply as soon as I can.
          </p>
          <a href="mailto:nikhilmali3141@gmail.com" className="sleek-button shrink-0">
            <Mail size={16} />
            Email
          </a>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-secondary focus:border-[var(--foreground)]"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-secondary focus:border-[var(--foreground)]"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.4, delay: 0.16 }}
          >
            <textarea
              name="message"
              placeholder="Type your message..."
              value={form.message}
              onChange={handleChange}
              className="min-h-[140px] w-full resize-y rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-secondary focus:border-[var(--foreground)]"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="sleek-button w-full"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.4, delay: 0.24 }}
          >
            {loading ? (
              <>
                <span className="loader" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
