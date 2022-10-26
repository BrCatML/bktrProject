import React from "react";
import Card from 'antd/es/card'
import SyncOutlined from "@ant-design/icons/SyncOutlined"

interface Props {
    activity: string;
    type?: string;
    busy?: boolean;
    onClickNext: () => void;
}
  
export const Activity = (props: Props) => {

return (
    <Card 
      title={props.type? props.type : 'Activity'} 
      bordered={false}
      actions={[<SyncOutlined disabled={props.busy} onClick={props.onClickNext} />]}
    >
      { props.busy ? <div style={{textAlign: "center", color: 'grey'}}>Loading...</div> : props.activity}
    </Card>
  )
};
  