import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/AppRouter.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster/>
    </Provider>
  </StrictMode>,
)
