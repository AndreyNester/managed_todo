import { FormProps } from "antd";
import { FieldType } from "../types";

export const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};