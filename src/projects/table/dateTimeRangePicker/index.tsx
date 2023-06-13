import { Space } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import DatePicker from "antd/es/date-picker";
import moment from "moment";
import React from "react";
const { RangePicker } = DatePicker;

interface DateTimeRangePickerProp {
  defaultDateRange: [moment.Moment, moment.Moment];
  currentDateRange: number[];
  loading: boolean;
  onChange: (dates: number[]) => void;
}

const DateTimeRangePicker = (props: DateTimeRangePickerProp): JSX.Element => {
  const onChange: RangePickerProps["onChange"] = (dates) => {
    props.onChange(
      dates && dates[0] && dates[1]
        ? [dates[0].toDate().getTime(), dates[1].toDate().getTime()]
        : [0, 0]
    );
  };
  return props.loading ? (
    <></>
  ) : (
    <Space direction="vertical" size={12} style={{ marginLeft: "20px" }}>
      <RangePicker
        ranges={{
          "Default range": props.defaultDateRange,
        }}
        showTime
        format="DD.MM.YYYY HH:mm:ss"
        onChange={onChange}
        allowClear={false}
        disabledDate={(currentDate: moment.Moment) => {
          return (
            currentDate < moment(props.defaultDateRange[0]) ||
            currentDate > moment(props.defaultDateRange[1])
          );
        }}
        defaultValue={[
          moment(props.currentDateRange[0]),
          moment(props.currentDateRange[1]),
        ]}
      />
    </Space>
  );
};

export default DateTimeRangePicker;
