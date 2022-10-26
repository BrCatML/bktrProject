import Steps from "antd/es/steps"
import Collapse from 'antd/es/collapse';
import React, { useEffect, useState } from "react"

interface Props {
  open?: boolean;
  facts: string[];
  onToggle: (open: boolean) => void;
}

export const RecentFacts = (props: Props) => {
  const [mm,useMm] = useState<string[]>([])

  useEffect(() => {
    let mm : string[] = []

    props.facts.map((v) => mm.push(v))
    for (let ii = props.facts.length - 1; ++ii < 5 ; ) mm.push('waiting...')
    useMm(mm)
  },[props.facts])

  return (
    <Collapse defaultActiveKey={props.open? ['1'] : undefined} >
      <Collapse.Panel header="Recent Facts" key="1">
        <Steps 
          progressDot
          current={props.facts.length }
          direction="vertical"
        >
          {mm.map((v,i) => (
            <Steps.Step 
              key={i}
              description={v? v : '?'}
            />  
          ))}

        </Steps>
      </Collapse.Panel>
    </Collapse>
  )
};
