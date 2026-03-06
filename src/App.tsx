import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { UseCases } from './pages/UseCases';
import { UseCaseDetail } from './pages/UseCaseDetail';
import { NewUseCase } from './pages/NewUseCase';
import { POCs } from './pages/POCs';
import { Capabilities } from './pages/Capabilities';
import { Assets } from './pages/Assets';
import { Search } from './pages/Search';
import { SalesSolutions } from './pages/SalesSolutions';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="use-cases" element={<UseCases />} />
            <Route path="use-cases/:id" element={<UseCaseDetail />} />
            <Route path="use-cases/new" element={<NewUseCase />} />
            <Route path="pocs" element={<POCs />} />
            <Route path="capabilities" element={<Capabilities />} />
            <Route path="assets" element={<Assets />} />
            <Route path="search" element={<Search />} />
            <Route path="sales" element={<SalesSolutions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
