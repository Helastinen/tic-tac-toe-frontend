import { CustomTabPanelProps } from "../../types/types.js";

const CustomTabPanel = ({ children, value, index }: CustomTabPanelProps) => {
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

export default CustomTabPanel;