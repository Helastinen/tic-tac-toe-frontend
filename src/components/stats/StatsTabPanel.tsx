import { StatsTabPanelProps } from "../../types/types.js";

const StatsTabPanel = ({ children, value, index }: StatsTabPanelProps) => {
  return (
    <div
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && children}
    </div>
  );
};

export default StatsTabPanel;