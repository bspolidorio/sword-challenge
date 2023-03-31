import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button } from "@mui/material";

const options = [
  { label: "Sort by stars", id: "stars" },
  { label: "Sort by forks", id: "forks" },
  { label: "Sort by updated", id: "updated" },
];

interface SortDropdownProps {
  sortedBy?: string;
  handleSort: (sortBy: string) => void;
}

const SortDropdown = ({ sortedBy, handleSort }: SortDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(
    options.findIndex((result) => result.id === sortedBy) || 0
  );
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    handleSort(options[index].id);
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        className="!text-white"
        onClick={handleClickListItem}
      >
        <ChevronRightIcon
          className={`h-6 w-6 cursor-pointer transition hover:scale-125 ${
            open && "rotate-90"
          }`}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.id}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SortDropdown;
