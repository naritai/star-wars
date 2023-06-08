import cls from "./ErrorPage.module.scss";
import { classNames } from "shared/lib/classNames";
import { ReportOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { ERROR_TEXTS } from "shared/constants";

interface ErrorPageProps {
  className?: string;
}

const centered = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

export function ErrorPage({ className }: ErrorPageProps): JSX.Element {
  return (
    <section className={classNames(cls.errorpage, {}, [className])}>
      <Box component="span" sx={{ display: "flex" }}>
        <ReportOutlined sx={{ fontSize: 70 }} color="error" />
        <Typography variant="h2" color="error">
          Oops!
        </Typography>
      </Box>

      <Box sx={centered}>
        <Typography variant="h4" color="error">
          {ERROR_TEXTS.GENERAL_ERROR}
        </Typography>
        <Typography color="error" variant="h6" sx={{ flexGrow: 1 }}>
          🪄🪄🪄
          {
            <Link to="/" reloadDocument={true} className={classNames(cls.link)}>
              main page
            </Link>
          }
          🪄🪄🪄
        </Typography>
      </Box>
    </section>
  );
}
