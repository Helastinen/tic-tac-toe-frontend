import { Divider } from "@mui/material";

const SectionDivider = ({ mt=2, mb=2 }: { mt: number, mb:number }) => {
  return (
    <Divider
      variant="middle"
      sx={{
        margin: `${mt}rem 1rem ${mb}rem 1rem`,
        border: "1px solid",
        borderColor: "divider"
      }} />
  );
};

export default SectionDivider;