import { useEffect } from "react";
import careerAssistantIllustration from "../../assets/career_assistant.svg";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react"; // icon

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const LandingPage = () => {
  useEffect(() => {
    document.title = "Career Tools – AI Resume Analyzer & Career Assistant Bot";
  }, []);

  return (
    <>
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 md:gap-12 px-8 py-20 bg-blue-50">
        {/* Image */}
        <motion.div
          className="flex-1 max-w-md md:max-w-lg lg:max-w-xl mx-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={careerAssistantIllustration}
            alt="Career Tools Illustration"
            className="w-full drop-shadow-md"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="flex-1 text-center md:text-left max-w-xl"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-extrabold mb-4 text-gray-900"
            variants={fadeInUp}
          >
            AI tools to supercharge your job hunt
          </motion.h2>

          <motion.p className="text-lg text-gray-700 mb-8" variants={fadeInUp}>
            <strong>A 2-in-1 career platform powered by React and n8n —</strong>{" "}
            use the{" "}
            <a
              href="/resume-analyzer"
              className="font-medium text-blue-600 hover:underline"
            >
              Resume Analyzer
            </a>{" "}
            to evaluate and rank resumes like a recruiter, or chat with the{" "}
            <a
              href="/career-chatbot"
              className="font-medium text-blue-600 hover:underline"
            >
              Career Assistant Bot
            </a>{" "}
            for smart, AI-driven job advice.
          </motion.p>
        </motion.div>
      </section>

      {/* Floating Chat Button */}
      <motion.button
        onClick={() => (window.location.href = "/career-chatbot")}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with Career Assistant Bot"
      >
        <MessageCircle size={28} />
      </motion.button>
    </>
  );
};

export default LandingPage;
