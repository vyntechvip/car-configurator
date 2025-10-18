import './globals.css'

export const metadata = {
  title: 'Car Color Customizer',
  description: 'Simple 3D car color customizer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}