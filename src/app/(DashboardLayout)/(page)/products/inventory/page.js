import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { Button } from "@mui/material";

const InventoryPage = () => {
  return (
    <PageContainer title="Quản lý kho" description="Quản lý kho">
      <DashboardCard
        title="Quản lý kho"
        action={
          <Button variant="contained" color="primary">
            Nhập/xuất
          </Button>
        }
      > </DashboardCard>
    </PageContainer>
  );
}

export default InventoryPage;