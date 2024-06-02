import { FormProps } from "antd"
import { FieldType } from "../types"

export const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values)
}
