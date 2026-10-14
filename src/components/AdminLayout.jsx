import { Outlet } from 'react-router'
import './AdminLayout.css'
import SideNav from './SideNav'
import BottomNav from './BottomNav'

// Lo que comparten todas las pantallas de la gestión
function AdminLayout() {
  return (
    <div className="admin">
      <SideNav />
      <div className="admin__main">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}

export default AdminLayout