import { ListItem, ListItemText, useTheme } from '@mui/material';
import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  icon?: JSX.Element;
  label: string;
  end?: boolean;
}

export default function SidebarItem({ to, icon, label, end }: Props) {
  const theme = useTheme();

  return (
    <ListItem>
      <NavLink
        to={to}
        end={end}
        style={({ isActive }) => ({
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '10px 16px',
          width: '100%',
          textDecoration: 'none',
          borderRadius: '6px',
          color: isActive ? 'white' : '#444',
          backgroundColor: isActive ? theme.palette.primary.light : 'transparent',
          fontWeight: isActive ? '600' : '400'
        })}>
        {icon}
        <ListItemText primary={label} />
      </NavLink>
    </ListItem>
  );
}
