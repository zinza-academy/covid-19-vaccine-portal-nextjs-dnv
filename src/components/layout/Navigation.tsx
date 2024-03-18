'use client';
import {
  ArrowForward,
  KeyboardArrowDown,
  KeyboardArrowUp,
  PeopleAlt
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link href="/">Trang chủ</Link>
          </ListItemButton>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link href="/portal/vaccine-registration">Đăng ký tiêm</Link>
          </ListItemButton>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Typography onClick={handleClick}>
              Tra cứu
              {open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </Typography>
          </ListItemButton>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link href="/">Tài liệu</Link>
          </ListItemButton>
        </ListItem>
      </List>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        sx={{
          marginTop: '22px',
          top: '-3px',
          left: '-124px'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <div className="bg-purple-100 rounded-lg p-2">
            <PeopleAlt className="text-purple-900" />
          </div>
          <div className="block mx-4">
            <Typography variant="body1" component="h2">
              Tra cứu chứng nhận tiêm
            </Typography>
            <Typography variant="body2">
              Cập nhật nhanh và chính xác nhất
            </Typography>
          </div>
          <ArrowForward className="text-purple-900" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div className="bg-blue-100 rounded-lg p-2">
            <PeopleAlt className="text-blue-600" />
          </div>
          <div className="block mx-4">
            <Typography variant="body1">Tra cứu kết quả đăng ký</Typography>
            <Typography variant="body2">
              Cập nhật nhanh và chính xác nhất
            </Typography>
          </div>
          <ArrowForward className="text-blue-600" />
        </MenuItem>
      </Menu>
    </>
  );
}
