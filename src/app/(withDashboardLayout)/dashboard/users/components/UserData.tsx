"use client";
import { TUser } from "@/types";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import UpdateUserModal from "./UpdateUserModal";
import { useState } from "react";
const UserData = ({ data }: { data: TUser[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "bloodType", headerName: "Blood type", flex: 1 },
    { field: "phoneNumber", headerName: "Mobile", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <>
              <IconButton onClick={() => setIsModalOpen(true)} aria-label='edit'>
                <EditIcon />
              </IconButton>
            </>
            <UpdateUserModal open={isModalOpen} setOpen={setIsModalOpen} id={row?.id} />
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <DataGrid rows={data} columns={columns} hideFooter />
    </Box>
  );
};

export default UserData;
