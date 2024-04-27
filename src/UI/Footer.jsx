import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Icon } from "@mui/material";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t, i18n } = useTranslation();
  return (
    <footer className="flex flex-col justify-center bg-teal-300 py-3 text-center align-middle dark:bg-slate-950 sm:flex-row">
      <div className="text-stone-50">
        <FacebookRoundedIcon color="inherit" className="mx- cursor-pointer" />
        <XIcon color="inherit" className="mx-1 cursor-pointer" />
        <InstagramIcon color="inherit" className="mx-1 cursor-pointer" />
      </div>
      <p className="mx-3 text-slate-50">{`${t("@Copyrights 2024")}: Mustafa Ahmed`}</p>
    </footer>
  );
}

export default Footer;
