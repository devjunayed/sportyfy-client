/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from "antd";

const CustomPagination = ({ current, total, pageSize, onChange }: any) => {
  return (
    <Pagination
      current={current}
      
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      showSizeChanger={false}
    />
  );
};

export default CustomPagination;
