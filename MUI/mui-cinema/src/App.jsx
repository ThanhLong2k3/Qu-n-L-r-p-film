import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PublicRoutes from "./routes/PublicRoutes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoginRoutes from './routes/LoginRoutes';

// Tạo một instance của QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PublicRoutes />
      <LoginRoutes />
    </QueryClientProvider>
  );
}

export default App;
