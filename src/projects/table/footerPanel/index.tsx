import Button from "antd/es/button";
import Divider from "antd/es/divider";
import PageHeader from "antd/es/page-header";
import Statistic from "antd/es/statistic";
import React from "react";
import { countEvaluationType } from "../types";

interface itogsProps {
  evaluation: countEvaluationType;
  all: number;
  downloadStatictic: () => void;
  getSelectedContents: () => void;
}

const FooterPanel = (props: itogsProps): JSX.Element => {
  return (
    <PageHeader
      title={
        <Button
          disabled
          title="В разработке"
          type="primary"
          onClick={props.getSelectedContents}
        >
          Скачать выбранные артефакты
        </Button>
      }
      extra={[
        <Statistic key="1" title="TP" value={props.evaluation.TP} />,
        <Divider key="2" type="vertical" />,
        <Statistic key="3" title="TN" value={props.evaluation.TN} />,
        <Divider key="4" type="vertical" />,
        <Statistic key="5" title="Всего" value={props.all} />,
        <Divider key="6" type="vertical" />,
        <Button key="7" onClick={props.downloadStatictic}>
          Скачать статистику
        </Button>,
      ]}
    />
  );
};

export default FooterPanel;
