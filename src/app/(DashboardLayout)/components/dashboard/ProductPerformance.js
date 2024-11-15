import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
    CircularProgress,
    Link,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
  import SendRequest from '@/utils/SendRequest';
  import { convertDate, formatCurrency } from '@/utils/Main';
  import { CATEGORY_LIST } from '@/app/constants/ProductConstants';
  
  const ProductPerformance = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
  
    // Fetch dữ liệu từ API
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await SendRequest('GET', '/api/maintenances');
        if (res.payload) {
            let _data = res.payload;
            // lấy 5 sản phẩm gần đây
            _data = _data.slice(0, 10);
            setData(_data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    
  
    return (
      <DashboardCard title="Lịch trình bảo trì"
        action={
            <Link to="/maintenances">
                <Button variant="contained" color="primary" size="small">
                    Xem tất cả
                </Button>
            </Link>
        }
      >
        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
              <CircularProgress />
            </Box>
          ) : (
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: 'nowrap',
                mt: 2,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Tên sản phẩm
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Danh mục
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Số lượng
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Giá
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Trạng thái bảo trì
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={500}>
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={400}>
                        {CATEGORY_LIST.find((category) => category.value === item.category)?.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{item.quantity}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">{formatCurrency(item.price)} VND</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.maintenanced ? 'Đã bảo trì' : 'Chưa bảo trì'}
                        color={item.maintenanced ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </DashboardCard>
    );
  };
  
  export default ProductPerformance;
  