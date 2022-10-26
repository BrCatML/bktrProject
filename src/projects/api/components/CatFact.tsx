interface Props {
    fact: string;
    busy?: boolean;
    onClickNext: () => void;
}

import Card from 'antd/es/card'
import React from 'react';
import SyncOutlined from "@ant-design/icons/SyncOutlined"
  
export const CatFact = (props: Props) => {
  return (
    <Card 
      title="Cat Fact" 
      bordered={false}
      actions={[<SyncOutlined disabled={props.busy} onClick={props.onClickNext} />]}
    >
      { props.busy ? <div style={{textAlign: "center", color: 'grey'}}>Loading...</div> :  props.fact}
    </Card>
  )
};
  