import React, { useEffect, useState } from 'react'
import s from './modal.module.css'

const Modal = ({ id, data, openModal, setOpenModal }) => {
  const [visable, setVisable] = useState(false)

  useEffect(() => {
    let timeoutId
    if ( openModal ){ 
      timeoutId = setTimeout(() => {
        setVisable(true)
      }, 200)
    }
    else {
      setVisable(false)
    }
    return () => clearTimeout(timeoutId)
  }, [openModal])
  return (
    <>
      <div className={`${s.modal} ${visable ? s.active : ''}`}>
        <div className={s.modal_container}>
          <div className={s.modal_header}>
            <div onClick={() => setOpenModal(false)} className={s.close}></div>
          </div>
          <h2>{data[id].type}</h2>
          <div className={s.modal_body}>
            <img src={require(`../../assets/${data[id].img}.png`)} alt={data[id].name} />
            <h3>{data[id].name}</h3>
            <p>Тип комнаты: <span>{data[id].room_type}</span></p>
            <p>Сезон цветения: <span>{data[id].season}</span></p>
            <p>Страна производства: <span>{data[id].country}</span></p>
            <hr />
            <h4>Описание</h4>
            <p>{data[id].characteristics} <br /> <b>Основным поставщиком является {data[id].sort_provider}</b></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal