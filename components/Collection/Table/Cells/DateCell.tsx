import { formatDate } from "@utils";

const DateCell = ({ value }: any) => (
  <div>
    <span>{formatDate(value)}</span>
  </div>
);

export default DateCell;
