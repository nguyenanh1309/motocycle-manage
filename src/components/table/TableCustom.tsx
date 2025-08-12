import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { Column } from "@/types/tableType";
import themeConfig from "@/config";
import { useEffect, useState } from "react";
import Icon from "../bases/Icon";
import { Box, Button, Typography, Popover, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

type Props = {
  isPagination: boolean;
  page: number;
  setPage: (value: number) => void;
  limit: number;
  setLimit: (value: number) => void;
  columns: Column[];
  rows: any;
};

export default function TableCustom({
  isPagination,
  page,
  setPage,
  limit,
  setLimit,
  columns,
  rows,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns.map(col => col.field));
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'column-select-popover' : undefined;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedIds = rows.map((row: any) => row.id);
      setSelectedIds(newSelectedIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    setSelectedIds(newSelectedIds);
  };

  const handleColumnToggle = (field: string) => {
    setVisibleColumns(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const handleColumnSelectClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColumnSelectClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(selectedIds);
  }, [selectedIds]);

  return (
    <Paper sx={{ maxWidth: "100%", overflow: "hidden", position: "relative" }}>
      <TableContainer sx={{ minHeight: "calc(100vh - 300px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.filter(column => visibleColumns.includes(column.field)).map((column) => (
                <TableCell
                  key={column.field}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    paddingInline: 1,
                    color: themeConfig.mainColor,
                    fontWeight: "bold",
                  }}
                >
                  {column.type === "checkbox" ? (
                    <Checkbox
                      checked={selectedIds.length === rows.length}
                      indeterminate={
                        selectedIds.length > 0 &&
                        selectedIds.length < rows.length
                      }
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 20,
                        },
                      }}
                      onChange={handleSelectAll}
                    />
                  ) : (
                    column.headerName
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * limit, page * limit + limit).map((row: any) => {
              const isSelected = selectedIds.indexOf(row.id) !== -1;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  selected={isSelected}
                >
                  {columns.filter(column => visibleColumns.includes(column.field)).map((column) => {
                    const value = row[column.field as keyof typeof row];
                    return (
                      <TableCell
                        key={column.field}
                        align={column.align}
                        sx={{ paddingInline: 1 }}
                      >
                        {column.type === "checkbox" ? (
                          <Checkbox
                            checked={isSelected}
                            onClick={() => handleSelectOne(row.id)}
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 20,
                              },
                            }}
                          />
                        ) : column.renderCell ? (
                          column.renderCell(row)
                        ) : column.format && typeof value === "number" ? (
                          column.format(value)
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        aria-describedby={id}
        onClick={handleColumnSelectClick}
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          zIndex: 10,
          display: "flex",
          gap: 1,
          textTransform: "none",
          color: themeConfig.textColor4,
        }}
      >
        <Icon icon="fluent:column-triple-edit-20-regular" fontSize={18} />
        <Typography variant="subtitle2">Cột hiển thị</Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleColumnSelectClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          {columns.filter(column => column.field !== 'id').map((column) => (
            <ListItem key={column.field} sx={{ paddingBlock: "4px", "&:hover": { backgroundColor: themeConfig.bgColor1, cursor: "pointer" } }} onClick={() => handleColumnToggle(column.field)}>
              <ListItemIcon sx={{ minWidth: "32px" }}>
                <Checkbox
                  edge="start"
                  checked={visibleColumns.includes(column.field)}
                  tabIndex={-1}
                  disableRipple
                  size="small"
                />
              </ListItemIcon>
              <ListItemText color={themeConfig.textColor4} primary={column.headerName} />
            </ListItem>
          ))}
        </List>
      </Popover>
      {isPagination ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        <Box sx={{ height: '52px' }}>
          <Typography>Không có dữ liệu</Typography>
        </Box>
      )}
    </Paper>
  );
}