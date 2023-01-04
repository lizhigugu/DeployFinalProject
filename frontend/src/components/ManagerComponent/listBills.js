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
const ListBills = ({items}) => {
    return(
        <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>訂單編號</TableCell>
              <TableCell align="right">取件人姓名</TableCell>
              <TableCell align="right">取件人手機</TableCell>
              <TableCell align="right">取件門市</TableCell>
              <TableCell align="right">訂單金額</TableCell>
              <TableCell align="right">包材</TableCell>
              <TableCell align="right">商品</TableCell>
              <TableCell align="right">備註（匯款）</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((product, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.billId}
                </TableCell>
                <TableCell align="right">{product.receiver}</TableCell>
                <TableCell align="right">{product.phone}</TableCell>
                <TableCell align="right">{product.address.substring(0,6)}</TableCell>
                <TableCell align="right">{product.package}</TableCell>
                <TableCell align="right">{product.total}</TableCell>
                <TableCell align="right">
                    {product.items.map((value, index)=>(
                        <p key={index}>{value.name+"\t"+value.number+"\t"+value.option+"\t"+value.note}</p>
                    ))}
                </TableCell>
                <TableCell align="right">{product.caption}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default ListBills;