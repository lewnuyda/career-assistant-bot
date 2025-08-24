import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";

import TextInput from "../../components/UI/TextInput";
import TitleText from "../../components/UI/TitleText";
import FileInput from "../../components/UI/FileInput";

import SelectInput from "../../components/UI/SelectInput";
import FormWrapper from "../../components/UI/FormWrapper";
import AppButton from "../../components/UI/AppButton";
import axiosInstance from "../../api/axiosInstance";
import { supabase } from "../../api/supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Add at the top
import ReactMarkdown from "react-markdown";

// Validation schema
// Validation schema for multiple files
const validationSchema = yup.object().shape({
  resumes: yup
    .mixed()
    .required("At least one resume is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      return (
        value &&
        Array.from(value).every((file) => file.type === "application/pdf")
      );
    }),
  job: yup.string().required("Please select a job"),
});

const ResumeAnalyzer = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);
  const [jobOptions, setJobOptions] = useState([]);
  const [jobDescription, setJobDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Resume Analyzer";
  }, []);

  // ✅ Fetch from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("id, name")
        .order("id", { ascending: true });
      const formattedOptions =
        data?.map((item) => ({
          value: item.id,
          label: item.name,
        })) || [];

      setJobOptions(formattedOptions);
    };

    fetchJobs();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Array.from(data.resumes).forEach((file, index) => {
        formData.append(`resume_${index}`, file);
      });

      formData.append("jobOptions", data.job);

      const response = await axiosInstance.post(
        "/webhook-test/submit-resume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const resultData = response.data; // Already an object { rankings: [...] }

      navigate("/result", { state: { result: resultData } });
    } catch (error) {
      console.error("Error uploading to n8n:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <svg
              className="animate-spin h-16 w-16 text-blue-700 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <motion.p
              className="text-xl text-blue-800 font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Analyzing resume...
            </motion.p>
          </motion.div>
        </div>
      )}

      <FormWrapper
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col text-gray-700 bg-white shadow-md w-[40rem] rounded-xl bg-clip-border"
      >
        {/* Header */}
        <div className="flex items-center gap-4 my-6 ml-6">
          <img
            className="h-16 w-16 object-cover object-center rounded-full"
            src="https://picsum.photos/100"
            alt="Logo"
          />
          <div>
            <TitleText
              variant="h4"
              color="blue-gray"
              className="font-semibold text-blue-gray-900"
            >
              Resume Analyzer
            </TitleText>
            <TitleText
              variant="small"
              color="blue-gray"
              className="text-blue-gray-700"
            >
              Match your resume with a job description
            </TitleText>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4 p-6">
          <Controller
            name="resumes"
            control={control}
            render={({ field }) => (
              <FileInput
                label="Upload Resumes (PDF/DOCX)"
                accept=".pdf"
                multiple={true} // <-- enable multiple file selection
                error={errors.resumes?.message}
                onChange={(e) => field.onChange(Array.from(e.target.files))}
              />
            )}
          />

          {jobOptions.length > 0 ? (
            <Controller
              name="job"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <SelectInput
                  label="Select Job"
                  options={jobOptions}
                  name={field.name}
                  value={field.value}
                  onChange={async (selectedValue) => {
                    field.onChange(selectedValue);

                    // Fetch the job description
                    const { data, error } = await supabase
                      .from("jobs")
                      .select("description")
                      .eq("id", selectedValue)
                      .single();

                    if (data) {
                      setJobDescription(data.description);
                    } else {
                      setJobDescription("No job description found.");
                    }
                  }}
                  error={!!errors.job}
                  errorMessage={errors.job?.message}
                  className="w-full"
                />
              )}
            />
          ) : (
            <p className="text-sm text-gray-500">Loading topics...</p>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Job Description
            </label>
            <div className="prose prose-sm text-gray-800 max-w-none [&_h4]:font-bold [&_h4]:text-gray-900">
              <ReactMarkdown>{jobDescription}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-6 pt-0">
          <AppButton
            className="bg-blue-800 hover:bg-blue-900 text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </AppButton>
        </div>
      </FormWrapper>
    </div>
  );
};

export default ResumeAnalyzer;
