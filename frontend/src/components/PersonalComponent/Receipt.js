//react import

//mui import
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//functional component
const Receipt = ({item}) => {
    //set state

    //function define

    //return
    return(
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>商品名稱</TableCell>
            <TableCell align="right">選項</TableCell>
            <TableCell align="right">備註</TableCell>
            <TableCell align="right">數量</TableCell>
            <TableCell align="right">type</TableCell>
            <TableCell align="right">單價</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.map((product, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.option}</TableCell>
              <TableCell align="right">{product.note}</TableCell>
              <TableCell align="right">{product.number}</TableCell>
              <TableCell align="right">{product.product_type}</TableCell>
              <TableCell align="right">{product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

//export
export default Receipt;
