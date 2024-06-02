import React from 'react'
import s from './card.module.css'

const Card = ({ setId, setOpenModal, openModal, ...item}) => {
    const handleOpenModal = () => {
        setOpenModal(true)
        setId(item.id - 1)
    }
    
  return (
    <>
        <div className={s.card}>
            <div className={s.card_img}>
                <img src={require('../../assets/' + item.img + '.png')} alt={item.name} />
            </div>
            <div className={s.card_info}>
                <h3>{item.name}</h3>
                <div className={s.card__more_info}>
                    <div className={s.card__short_info}>
                        <p>Тип: <span>{item.type}</span></p>
                        <p>Страна: <span>{item.country}</span></p>
                    </div>
                    <div className={s.card__info_btn}>
                        <button onClick={handleOpenModal}>Подробнее</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card