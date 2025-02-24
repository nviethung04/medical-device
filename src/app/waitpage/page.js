"use client";
import { useRouter } from "next/navigation";
import { Container, Paper, Typography, Button, Box } from "@mui/material";

const WaitPage = () => {
  const router = useRouter();

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        height: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        background: "linear-gradient(135deg, #4a90e2, #1453a1)" 
      }}
    >
      <Paper 
        elevation={6} 
        sx={{ 
          padding: 4, 
          textAlign: "center", 
          borderRadius: 3 
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          Chào mừng!
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          Bạn đã đăng nhập thành công.
        </Typography>

        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={() => router.push("/")}
          >
            Bảng điều khiển
          </Button>
          <Button 
            variant="contained" 
            color="success" 
            fullWidth 
            onClick={() => router.push("/products")}
          >
            Danh sách sản phẩm
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default WaitPage;
