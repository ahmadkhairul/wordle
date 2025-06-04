'use client'

type ModalProps = {
  show: boolean,
  setShow: (show: boolean) => void,
  children: React.ReactNode
}

export function Modal({
  show,
  setShow,
  children
}: ModalProps) {

  return (
    <div className={`z-10 w-screen h-screen flex items-center justify-center fixed top-0 left-0 bg-black bg-opacity-50 ${!show && 'hidden'}`}>
      <div className="max-w-xl">
        <button
          className="absolute top-4 right-4 text-white text-lg"
          onClick={() => setShow(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}