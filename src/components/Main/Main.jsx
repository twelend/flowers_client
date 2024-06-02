import React, { useEffect, useState } from 'react'
import s from './main.module.css'
import axios from 'axios'
import Card from '../Cards/Card'
import Modal from '../Modal/Modal'


const Main = () => {
  const PORT = 4040
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [getMoreItems, setGetMoreItems] = useState(false)
  const [showButton, setShowButton] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const filteredData = data.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      item.type.toLowerCase().includes(search.toLowerCase()) || 
      item.room_type.toLowerCase().includes(search.toLowerCase()) ||
      item.country.toLowerCase().includes(search.toLowerCase()) ||
      item.season.toLowerCase().includes(search.toLowerCase()) ||
      item.sort_provider.toLowerCase().includes(search.toLowerCase())
    );
    setShowButton(filteredData.length > 4);
  }, [data, getMoreItems, search]);

  useEffect(() => {
    axios.get(`http://localhost:${PORT}/api/get`)
      .then(res => res.data ? setData(res.data) : console.warn('Invalid response'))
      .catch(err => console.error(err));
  }, []);

  // const [country, setCountry] = useState('')
  // const [type, setType] = useState('')
  // const [room, setRoom] = useState('')

  // useEffect(() => {
  //   axios.get(`http://localhost:${PORT}/api/getByCountry`, { type })
  //     .then(res => res.data ? setData(res.data) : console.warn('Invalid response'))
  //     .catch(err => console.error(err));
  // }, [type]);

  return (
    <>
        <main id='search' className={s.main}>
          <div className={s.main_container}>
            <div className={s.main_title_mobile}>
              <h3>Популярные запросы</h3>
            </div>
            <div className={s.main_title_desktop}>
              <h3>Найти цветы</h3>
            </div>


            <div className={s.main_requests}>
              <div className={s.request_item}>
                <button title='Садовые' value={'Садовые'} onClick={(e) => setSearch(e.target.value)}>Садовые</button>
              </div>
              <div className={s.request_item}>
                <button title='Открытый грунт' value={'Открытый грунт'} onClick={(e) => setSearch(e.target.value)}>Открытый грунт</button>
              </div>
              <div className={s.request_item}>
                <button title='Июнь' value={'Июнь'} onClick={(e) => setSearch(e.target.value)}>Июнь</button>
              </div>
              <div className={s.request_item}>
                <button title='Май' value={'Май'} onClick={(e) => setSearch(e.target.value)}>Май</button>
              </div>
            </div>

            {/* <div className={s.main_filter}>
              <div className={s.filter_item}>
                <h3>Страна выращивания</h3>
                <select onChange={(e) => setCountry(e.target.value)} name="country" id="country" className={s.filter}>
                  <option value="#" selected disabled>Выберите Страну</option>
                  <option value="Северная африка">Северная Африка</option>
                  <option value="Колумбия">Колумбия</option>
                  <option value="Южная Америка">Южная Америка</option>
                  <option value="Индия">Индия</option>
                  <option value="Африка">Африка</option>
                  <option value="Китай">Китай</option>
                  <option value="Мексика">Мексика</option>
                </select>
              </div>
              
              <div className={s.filter_item}>
                <h3>Тип Цветка</h3>
                <select onClick={(e) => setType(e.target.value)} name="type" id="type" className={s.filter}>
                  <option value="#" selected disabled>Выберите тип</option>
                  <option value="Садовые">Садовые</option>
                  <option value="Комнатный">Комнатный</option>
                </select>
              </div>

              <div className={s.filter_item}>
                <h3>Место выращивания</h3>
                <select onChange={(e) => setRoom(e.target.value)} name="type" id="type" className={s.filter}>
                  <option value="#" selected disabled>Выберите место</option>
                  <option value="оранжерея">Оранжерея</option>
                  <option value="теплица">Теплица</option>
                  <option value="Открытый грунт">Открытый Грунт</option>
                </select>
              </div>
            </div> */}

            <div className={s.main_search}>
              <input type="text" placeholder="Поиск" value={search  || ''} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className={s.main__card_container}>
              <div className={s.main__card_list}>
                {
                  !getMoreItems ? data.filter(item => 
                    item.name.toLowerCase().includes(search.toLowerCase()) || 
                    item.type.toLowerCase().includes(search.toLowerCase()) || 
                    item.room_type.toLowerCase().includes(search.toLowerCase()) ||
                    item.country.toLowerCase().includes(search.toLowerCase()) ||
                    item.season.toLowerCase().includes(search.toLowerCase()) ||
                    item.sort_provider.toLowerCase().includes(search.toLowerCase())
                  ).slice(0, 4).map((item, key) => <Card setId={setId} setOpenModal={setOpenModal} openModal={openModal} {...item} key={key} />)
                  : data.filter(item => 
                    item.name.toLowerCase().includes(search.toLowerCase()) || 
                    item.type.toLowerCase().includes(search.toLowerCase()) || 
                    item.room_type.toLowerCase().includes(search.toLowerCase()) ||
                    item.country.toLowerCase().includes(search.toLowerCase()) ||
                    item.season.toLowerCase().includes(search.toLowerCase()) ||
                    item.sort_provider.toLowerCase().includes(search.toLowerCase())
                  ).map((item, key) => <Card setId={setId} setOpenModal={setOpenModal} openModal={openModal} {...item} key={key} />)
                }
              </div>
            </div>
            

            {showButton && (
              <div className={getMoreItems ? s.hidden : s.main__more_btn}>
                <button onClick={() => setGetMoreItems(!getMoreItems)}>Показать еще</button>
              </div>
            )}
          </div>
          {openModal && <Modal id={id} data={data} openModal={openModal} setOpenModal={setOpenModal} />}
        </main>
    </>
  )
}

export default Main