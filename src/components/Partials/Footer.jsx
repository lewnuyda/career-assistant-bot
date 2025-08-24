import TitleText from "../UI/TitleText";

const Footer = () => {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-gray-300 py-6 text-center md:justify-between bg-gray-100 text-gray-700">
      <TitleText
        variant="small"
        color="blue-gray"
        className="mx-auto font-normal"
      >
        Career tools to help you land your dream job —{" "}
        <a
          href="/resume-analyzer"
          className="text-blue-600 hover:text-blue-700 hover:bg-gray-200 px-1 rounded transition-colors"
        >
          Resume Analyzer
        </a>{" "}
        &{" "}
        <a
          href="/career-chatbot"
          className="text-blue-600 hover:text-blue-700 hover:bg-gray-200 px-1 rounded transition-colors"
        >
          Career Assistant Bot
        </a>
      </TitleText>
      <TitleText
        variant="small"
        color="blue-gray"
        className="mx-auto font-normal text-gray-600"
      >
        &copy; {new Date().getFullYear()} Material Tailwind
      </TitleText>
    </footer>
  );
};

export default Footer;
