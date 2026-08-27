import { ReactFlowProvider } from '@xyflow/react'
import Board from './Board'

export default function App() {
  return (
    <ReactFlowProvider>
      <Board />
    </ReactFlowProvider>
  )
}
