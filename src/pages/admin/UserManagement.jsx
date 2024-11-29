import { useFetchData } from "6pp";
import { Avatar, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/Shared/Table";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/Features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
    //If you do not use params the link of the avatar will show and not the image
    //params cpnvert the url into the image so now we cam access each object using params
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];

const UserManagement = () => {
  const [rows, setRows] = useState([]);

  const { isLoading, data, error } = useFetchData(
    `${server}/api/v1/admin/users`,
    "user-stats"
  );
  const dashboardData = data?.finalUsers;
  useErrors([{ isError: error, error: error }]);

  useEffect(() => {
    if (data) {
      setRows(
        dashboardData?.map((i) => ({
          ...i,
          friends: i.friends.length,
          id: i._id,
          avatar: transformImage(i.avatar, 50),
        }))
      );
    }
  }, [data]);
  return isLoading ? (
    <Skeleton />
  ) : (
    <AdminLayout>
      <Table heading={"All Users"} columns={columns} rows={rows}></Table>
    </AdminLayout>
  );
};

export default UserManagement;
