import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function ToggleLanguage() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const languageElement = useRef();
  function handleExpand() {
    setOpen(!open);
  }
  function toggleLanguage() {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");

    document.body.classList.toggle("changeDirection");
  }

  const divStyle = {
    transform: open
      ? `translateX(${languageElement?.current?.offsetWidth + 10}px)`
      : "none",
    transition: "transform 0.3s ease",
    direction: "ltr",
  };

  return (
    <div
      className={`fixed -translate-x-[${languageElement?.current?.offsetWidth + 10}px] right-0 top-1/2 z-50 flex items-center justify-center gap-2 bg-teal-400 px-2 py-1`}
      style={divStyle}
    >
      <div
        className={`${!open && "rotate-180 transform"} cursor-pointer  `}
        onClick={handleExpand}
      >
        <ArrowBackIosNewIcon />
      </div>
      <div
        className={`cursor-pointer bg-teal-500 p-[2px]`}
        onClick={toggleLanguage}
        ref={languageElement}
      >
        {i18n.language === "en" ? "AR" : "EN"}
      </div>
    </div>
  );
}

export default ToggleLanguage;
