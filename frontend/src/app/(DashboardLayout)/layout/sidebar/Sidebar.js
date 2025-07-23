'use client';

import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '../shared/logo/Logo';
import Menuitems from './MenuItems';

const drawerWidth = 270;
const collapsedWidth = 80;

const MSidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  // Auto close mobile sidebar on route change
  useEffect(() => {
    if (isMobileSidebarOpen && onSidebarClose) {
      onSidebarClose();
    }
  }, [pathname, isMobileSidebarOpen, onSidebarClose]);

  const handleCollapseToggle = () => {
    if (lgUp) {
      setCollapsed(!collapsed);
      setExpandedItems({}); // Reset expanded items when collapsing
    }
  };

  const handleItemExpand = (itemId) => {
    if (!collapsed) {
      setExpandedItems(prev => ({
        ...prev,
        [itemId]: !prev[itemId]
      }));
    }
  };

  const isItemActive = (item) => {
    if (item.href) {
      return pathname === item.href;
    }
    if (item.children) {
      return item.children.some(child => pathname === child.href);
    }
    return false;
  };

  const renderMenuItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isItemActive(item);
    const isExpanded = expandedItems[item.id];

    if (item.type === 'divider') {
      return (
        <Divider
          key={item.id}
          sx={{
            my: 1,
            mx: collapsed ? 1 : 2,
            opacity: collapsed ? 0.3 : 1
          }}
        />
      );
    }

    if (item.type === 'subheader') {
      if (collapsed) return null;
      return (
        <Typography
          key={item.id}
          variant="caption"
          sx={{
            px: 3,
            py: 1,
            color: 'text.secondary',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}
        >
          {item.subheader}
        </Typography>
      );
    }

    const listItemContent = (
      <ListItemButton
        onClick={() => {
          if (hasChildren) {
            handleItemExpand(item.id);
          } else if (!lgUp && onSidebarClose) {
            onSidebarClose();
          }
        }}
        sx={{
          borderRadius: collapsed ? '50%' : '8px',
          mx: collapsed ? 'auto' : 1,
          my: 0.5,
          width: collapsed ? '48px' : 'auto',
          height: collapsed ? '48px' : 'auto',
          minHeight: '48px',
          backgroundColor: isActive ? 'primary.main' : 'transparent',
          color: isActive ? 'primary.contrastText' : 'text.primary',
          '&:hover': {
            backgroundColor: isActive ? 'primary.dark' : 'action.hover',
          },
          pl: collapsed ? 0 : level > 0 ? 4 : 2,
          justifyContent: collapsed ? 'center' : 'flex-start',
          flexDirection: collapsed ? 'column' : 'row',
          gap: collapsed ? 0.5 : 0
        }}
      >
        <ListItemIcon
          sx={{
            color: 'inherit',
            minWidth: collapsed ? 'auto' : '40px',
            justifyContent: 'center',
            fontSize: collapsed ? '1.2rem' : '1.5rem'
          }}
        >
          {item.icon}
        </ListItemIcon>

        {!collapsed && (
          <>
            <ListItemText
              primary={item.title}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 400,
                  whiteSpace: 'nowrap'
                }
              }}
            />
            {hasChildren && (
              isExpanded ? <ExpandLess /> : <ExpandMore />
            )}
          </>
        )}

        {collapsed && item.title && (
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.65rem',
              textAlign: 'center',
              lineHeight: 1,
              mt: 0.5
            }}
          >
            {item.title.slice(0, 4)}
          </Typography>
        )}
      </ListItemButton>
    );

    const listItem = item.href ? (
      <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
        {listItemContent}
      </Link>
    ) : (
      listItemContent
    );

    return (
      <React.Fragment>
        <ListItem disablePadding>
          {listItem}
        </ListItem>

        {hasChildren && !collapsed && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List disablePadding>
              {item.children.map((child) => (
                <React.Fragment key={child.id}>
                  {renderMenuItem(child, level + 1)}
                </React.Fragment>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#eff2f7",
      borderRadius: "15px"
    }
  };

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
          minHeight: '64px',
          px: 1
        }}
      >
        <Logo collapsed={collapsed} />

        {lgUp && (
          <IconButton
            onClick={handleCollapseToggle}
            sx={{
              mr: collapsed ? 0 : 1,
              ml: collapsed ? 'auto' : 0,
              width: 40,
              height: 40
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        )}

        {!lgUp && onSidebarClose && (
          <IconButton
            onClick={onSidebarClose}
            sx={{ mr: 1 }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Menu Items */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          py: 1,
          ...scrollbarStyles
        }}
      >
        <List disablePadding>
          {Menuitems.map((item) => (
            <React.Fragment key={item.id}>
              {renderMenuItem(item)}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Box
        sx={{
          width: collapsed ? collapsedWidth : drawerWidth,
          flexShrink: 0
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: "border-box",
              width: collapsed ? collapsedWidth : drawerWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              borderRight: '1px solid',
              borderColor: 'divider',
              ...scrollbarStyles
            }
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          width: drawerWidth,
          ...scrollbarStyles
        }
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default MSidebar;
