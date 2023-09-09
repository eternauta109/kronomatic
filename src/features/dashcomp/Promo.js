import React, { useState } from "react";
import {
  Paper,
  Button,
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import PromoModal from "./PromoModal";

import usePromoStore from "../.././store/PromoDataContext";

const columns = [
  {
    id: "id",
    label: "id",
    minWidth: 50,
  },
  {
    id: "date",
    label: "Data",
    minWidth: 170,
    format: (value) => value.toLocaleString("it-IT"),
  },
  { id: "film", label: "Film", minWidth: 100 },
  {
    id: "gadget",
    label: "Gadget",
    minWidth: 170,
    align: "right",
  },
  {
    id: "modalita",
    label: "Modalità",
    minWidth: 170,
    align: "right",
  },
  {
    id: "where",
    label: "dove si trova",
    minWidth: 170,
    align: "right",
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { addPromo, promoInitiative } = usePromoStore();
  const [openNewPromo, setOpenNewPeomo] = useState(false);

  const handleOpenNewPromo = () => setOpenNewPeomo(true);
  const handleCloseNewPromo = () => setOpenNewPeomo(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h4">Promo e iniziative</Typography>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ textAlign: "right", mb: 1 }}>
          <Button variant="contained" onClick={handleOpenNewPromo}>
            Add a promo
          </Button>
        </Box>
      </Grid>
      <Paper sx={{ width: "100%", overflow: "hidden", p: 1 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, key) => (
                  <TableCell
                    key={key}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {promoInitiative
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, key) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={promoInitiative.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <PromoModal open={openNewPromo} handleClose={handleCloseNewPromo} />
      </Paper>
    </Grid>
  );
}
