import { tableDataType } from "../types";
import { nameLog, isErrorTypeContent } from "../index";
import FileTextFilled from "@ant-design/icons/FileTextFilled";
import { infoContent } from "./InfoContent";
import React from "react";

export const namePreviewImg: string = "detection.jpeg";

interface componentContentProps {
  content: string[];
  itemData: tableDataType;
}

const ComponentContent = (props: componentContentProps): JSX.Element => {
  let contentUrl: string = props.content.includes(namePreviewImg)
    ? namePreviewImg
    : "";

  if (contentUrl != namePreviewImg && props.content.length) {
    if (!props.content.includes(nameLog)) {
      contentUrl = props.content[0];
    } else {
      contentUrl = nameLog;
      props.content.map((value: string) => {
        !isErrorTypeContent(value) ? (contentUrl = value) : "";
      });
    }
  }

  return (
    <div
      style={{ width: "100%", textAlign: "center" }}
      onClick={() => infoContent(props.itemData)}
    >
      {contentUrl == "" ? (
        <p>Files not found.</p>
      ) : isErrorTypeContent(contentUrl) ? (
        <FileTextFilled style={{ fontSize: 50 }} />
      ) : (
        <img
          height={50}
          src={`/api/${props.itemData.path}/${contentUrl}`}
          title={contentUrl}
        />
      )}
    </div>
  );
};

export default ComponentContent;
