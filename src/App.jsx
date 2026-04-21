export default function App() {
  return (
    <div dangerouslySetInnerHTML={{ __html: document.documentElement.innerHTML }} />
  )
}