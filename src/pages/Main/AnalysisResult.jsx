import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { showToast } from "../../components/Utils/sweetToast";
import Swal from "sweetalert2";

const AnalysisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;

  // ✅ extract jobTitle
  const jobTitle = result?.jobTitle || "Unknown Job";

  const rankings = Array.isArray(result?.rankings) ? result.rankings : [];

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleCandidate = (candidate) => {
    setSelectedCandidates((prev) => {
      if (prev.some((c) => c.rank === candidate.rank)) {
        return prev.filter((c) => c.rank !== candidate.rank);
      } else {
        return [...prev, candidate];
      }
    });
  };

  const sendEmails = async () => {
    if (selectedCandidates.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No candidates selected",
        text: "Please select at least one candidate before sending emails.",
        confirmButtonText: "OK",
      });
      return;
    }
    console.log(selectedCandidates);
    setLoading(true);
    try {
      const response = await axiosInstance.post("/webhook-test/send-email", {
        jobTitle: result?.jobTitle || "Unknown Job",
        candidates: selectedCandidates,
      });

      showToast(
        "success",
        `Emails sent to ${selectedCandidates.length} candidate(s)`
      );
      // redirect after toast (wait for toast timer ~3s)
      setTimeout(() => {
        navigate("/resume-analyzer");
        setSelectedCandidates([]); // clear after redirect
      }, 3000);
    } catch (error) {
      showToast("error", "Error sending emails: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-800">
        Resume Shortlisting Results
      </h1>

      {/* ✅ Show job title here */}
      <h2 className="text-xl font-semibold text-gray-700">
        Job Title: {jobTitle}
      </h2>

      {rankings.length === 0 ? (
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No candidates matched this job.
          </h2>
        </div>
      ) : (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {rankings.map((r) => (
            <div
              key={r.rank}
              className="p-4 border rounded-lg flex justify-between items-center bg-gray-50 shadow-sm"
            >
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={selectedCandidates.some((c) => c.rank === r.rank)}
                  onChange={() => toggleCandidate(r)}
                  className="mt-1"
                />
                <div>
                  <p className="font-semibold text-lg">
                    Top {r.rank}: {r.name}
                  </p>
                  <p className="text-sm text-gray-600">{r.reason}</p>
                  <p className="text-sm text-gray-500">📧 {r.email}</p>
                </div>
              </div>
              <span className="inline-block bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md">
                {r.score}/100
              </span>
            </div>
          ))}
        </motion.div>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate("/resume-analyzer")}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
        >
          Analyze Another Resume
        </button>

        {rankings.length > 0 && (
          <button
            onClick={sendEmails}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AnalysisResult;
