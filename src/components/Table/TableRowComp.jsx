import React from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { CustomModal } from "../Modal/CustomModal";
const TableRowComp = ({ data, index, setDataValue, dataValue }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <TableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {/* {new Date(data.date).toLocaleDateString()} */}
          {data.date}
        </TableCell>
        <TableCell align="right">{data.month}</TableCell>
        <TableCell align="right">{data.year}</TableCell>
        <TableCell align="right">{data.transaction_type}</TableCell>
        <TableCell align="right">{data.from_account}</TableCell>
        <TableCell align="right">{data.to_account}</TableCell>
        <TableCell align="right">
          {data.currency}
          {data.amount.toLocaleString("en-IN")}
        </TableCell>
        <TableCell align="right">{data.notes.substr(0, 15)}{data.notes.length > 15 ? "..." : ""}</TableCell>
        <TableCell align="right">
          {data.fileBase64 ? <img
            src={data.fileBase64}
            alt="Did not select"
            width={75}
            height={75}
          /> : "No Image Selected"}

        </TableCell>
        <TableCell align="right">
          <Button style={{ color: "white" }}><Link to={`/transaction/${data.id}`}><RemoveRedEyeOutlined /></Link></Button> &nbsp; |
          &nbsp; <Button><Link to={`/edit/${data.id}`}> <EditIcon /></Link></Button> &nbsp; <Button onClick={handleOpen}>Delete</Button>


        </TableCell>
        <CustomModal open={open} setOpen={setOpen} handleClose={handleClose} id={data.id} setDataValue={setDataValue} dataValue={setDataValue} />
      </TableRow>
    </>

  );
};

export default TableRowComp;