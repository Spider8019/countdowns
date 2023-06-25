import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { store } from './store'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Auth0Provider
    domain="dev-j5c8r52qumbdfppi.us.auth0.com"
    clientId="6qGQZX4agBwNwN9VAD3dB7PdIZYdbVhu"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    audience="this api is created first time for testing purposse"
    scope="openid profile email"
  >
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </Auth0Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
