import { format, parseISO } from 'date-fns';

const Date = ({ dateString }) => {
  console.log(`dateString:`, dateString);
  const date = parseISO(dateString);
  console.log(`date:`, date);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
};

export default Date;
