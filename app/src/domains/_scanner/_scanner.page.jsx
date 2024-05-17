//Library
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Box } from "@mui/material";
//Hooks
import L from "./logic";
import useCustomNavigate from "../../common/hooks/useCustomNavigate";
//Constant
import constant from "../../constants/constant";
import testSet from "../../constants/json.server";
//Repository
import scannerRepo from "./repositories/scanner.repository";
//TestSet
import ScannerTemplate from "./_scanner.template";

export default function Scanner() {
  const navigate = useCustomNavigate();

  const [phrases, setPhrases] = React.useState(constant.Phrases);
  const [state, setState] = React.useState(true);
  const [title, setTitle] = React.useState(constant.Title.loading);
  const [content, setContent] = React.useState({
    text: phrases[0],
    count: 0,
  });
  const [data, setData] = React.useState([]);

  const mutateOCR = useMutation({
    mutationFn: scannerRepo.ocr,
  });

  React.useEffect(() => {
    async function asyncData() {
      const imageToBase64 = await L().takePhoto();

      // if (imageToBase64 === "error") return navigate.goHome();

      setState(false);
      await mutateOCR
        .mutateAsync(imageToBase64)
        .then((result) => {
          setData(result.data.medicine_list);
          setTitle(constant.Title.find);
        })
        .catch((error) => {
          setTimeout(async () => {
            // return navigate.goHome();

            //test
            setData(testSet.mutateOCRSet);
            //test
            setTitle(constant.Title.find);
          }, 2100);
        });
    }
    asyncData();
  }, []);

  React.useEffect(() => {
    let intervalId;
    if (!state) {
      intervalId = setInterval(() => {
        setContent((prevText) => {
          const cleanText = phrases[content.count];
          const dotCount = prevText.text.length - cleanText.length;
          if (dotCount < 3) {
            const text = cleanText + ".".repeat(dotCount + 1);
            return { text: text, count: content.count };
          } else {
            const nextIndex = (content.count + 1) % phrases.length;
            return { text: phrases[nextIndex], count: nextIndex };
          }
        });
      }, 550);
    } else clearInterval(intervalId);
    return () => clearInterval(intervalId);
  }, [state, content.count]);

  if (state) return <Box sx={{ height: "100vh", background: "black" }} />;
  return (
    <ScannerTemplate
      set={{ title, content, data, setPhrases, setTitle, setContent }}
    />
  );
}
