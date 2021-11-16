import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { Months } from '../../types';

type PropType = {
  className?: string;
  canSelect?: boolean;
  month: string;
  setMonth?: React.Dispatch<React.SetStateAction<string>>;
};

const SectionTitleBar: React.FC<PropType> = ({
  canSelect = false,
  month,
  setMonth = () => {},
  className = '',
}) => {
  // const [month, setMonth] = useState(Months[currentMonth]);
  const handleMonthChange = (e: SelectChangeEvent<string>) => {
    setMonth(e.target.value);
  };

  const renderMonthOptions = () => {
    return Array.from({ length: 12 }).map((_, k) => (
      <MenuItem key={Months[k]} value={Months[k]}>
        {Months[k]}
      </MenuItem>
    ));
  };

  return (
    <h3 className="title">
      {canSelect ? (
        <Select value={month} onChange={handleMonthChange}>
          {renderMonthOptions()}
        </Select>
      ) : (
        <span>{month}</span>
      )}
      大事记
    </h3>
  );
};

export default SectionTitleBar;
