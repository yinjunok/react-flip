import { FC, useState } from 'react'
import clsx from 'clsx'
import useFlip from './hooks/useFlip'
import './App.css'

const Card: FC<{ onRemove: () => void }> = ({ onRemove }) => {
  const flipRef = useFlip<HTMLDivElement>()

  return (
    <div
      className={clsx('flip')}
      ref={flipRef}
    >
      <button onClick={() => onRemove()}>删除</button>
    </div>
  )
}

const Scale: FC = () => {
  const [big, setBig] = useState(false)
  const flipRef = useFlip<HTMLDivElement>()
  const btnRef = useFlip<HTMLButtonElement>()

  return (
    <>
      <div ref={flipRef} className={clsx('scale', {'big': big})} />
      <button ref={btnRef} onClick={() => setBig(!big)}>切换</button>
    </>
  )
}

const Box: FC<{ layoutId: string, className: string }> = ({ layoutId, className }) => {
  const leftRef = useFlip<HTMLDivElement>(layoutId)

  return (
    <div ref={leftRef} className={className} />
  )
}

const FloatBox = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      {
        visible ? (
          <Box className='left-box' layoutId='float-box' />
        ) : (
          <Box  className='right-box' layoutId='float-box' />
        )
      }
      <button onClick={() => setVisible(!visible)}>切换位置</button>
    </>
  )
}

function App() {
  const [list, setList] = useState([1, 2, 3, 4, 5])
  const btnRef = useFlip<HTMLButtonElement>()

  return (
    <>
      <div className='container'>
        {
          list.map(l => (
            <Card key={l} onRemove={() => setList(state => state.filter(s => s !== l))} />
          ))
        }
      </div>
      <button ref={btnRef} onClick={() => setList(state => [Math.random(), ...state])}>添加</button>

      <Scale />
      <FloatBox />
    </>
  )
}

export default App
